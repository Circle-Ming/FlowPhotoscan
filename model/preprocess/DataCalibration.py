import scipy.io as scio
import os
import numpy as np
import scipy
import tifffile as tiff
import cv2
from constant import *

filename = '0207-1.raw'

cmData = 'CorrectionMatrix25-' + waveRange + '.mat'
correctionMatrix = scio.loadmat(cmData)

def readXimeaRaw(fname, w, h):
    index = fname.find('.')
    hdr_fname = fname[:index]
    hdrfid = open(hdr_fname + '.hdr', 'r')
    tlines = hdrfid.readlines()
    for tline in tlines:
        if 'Frames' in tline:
            index = tline.find('=')
            second = tline[index:]
            _, frame = second.split(maxsplit=1)
            frame_array = np.fromstring(frame, sep=' ')
            frames = frame_array.tolist()
    hdrfid.close()

    imgData = np.fromfile(fname, dtype='uint16')
    # 利用numpy中array的reshape函数将读取到的数据进行重新排列。
    imgData = imgData.reshape(w*h, frames)
    return imgData, frames, hdr_fname

def reconstructCube(image, height, width, blksize, m):
    nCols = width/blksize
    nRows = height/blksize
    nBands = blksize*blksize

    tmp = np.reshape(image[:, m], (nCols*nBands, nRows))
    temp = tmp.T

    patternimg = np.zeros((height, width))
    for i in range(blksize):
        patternimg[i:height:blksize, 0:width] = temp[:, width*i:width*(i+1)]

    dataCube = np.zeros((nRows, nCols, nBands))
    for i in range(blksize):
        for j in range(blksize):
            dataCube[:, :, i*blksize + j] = patternimg[i:height:5, j:width:5]
    return dataCube, patternimg

def devignetting(dCube, nRows, nCols, nBands, mid):
    xm = round(nCols/2)
    ym = round(nRows/2)
    responseCorrect = np.zeros((np.size(np.arange(ym - mid, ym + mid)) + 1, np.size(np.arange(xm - mid, xm + mid)) + 1))
    
    for iBands in range(nBands):
        denoiseCube = dCube[:, :, iBands]
        responseCorrect = denoiseCube[ym-mid-1:ym+mid, xm-mid-1:xm+mid]
        rC = np.mean(responseCorrect)
        ndMatrix = rC / denoiseCube
        ndMatrix[~np.isfinite(ndMatrix)] = 0
        vignettingCube[:, :, iBands] = scipy.signal.medfilt2d(denoiseCube)
    return vignettingCube

def writeTIFF(data, filename):
    tif = tiff.imwrite(filename, data, photometric='miniblack')

# print(correctionMatrix['correction'])
img, nframe, hdr_fname = readXimeaRaw(filename, width, height)
if not os.path.exists(hdr_fname):
    os.mkdir(hdr_fname)

"""
Unpack the raw data and preprocessing (devegnetting/denosing and spectral correction)
"""
for iframe in range(nframe):
    dataCube, spatialImg = reconstructCube(img, height, width, blksize, iframe)
    vignettingCube = devignetting(dataCube, nRows, nCols, nBands, mid)

    for i in range(nRows):
        for j in range(nCols):
            temp1 = vignettingCube[i, j, :]
            correctedCube = correctionMatrix['correction'] * temp1[0,:].T
            correctedCube[np.where(correctedCube < 0)] = 0

"""
Write Image
"""
    dataName = ['calibratedCube', 'dataCube', 'vignettingCube', 'spatialImg']
    for w in range(len(dataName)):
        filePath = hdr_fname + '/' + dataName[w]
        if not os.path.exists(filePath):
            os.mkdir(filePath)
        filename = filePath + '/' + hdr_fname[len(hdr_fname) - 6, len(hdr_fname)] + '_' + dataName[w] + '_' + str(iframe) + '.tif'
        wimage = eval(dataName[w])
        writeTIFF(wimage, filename)