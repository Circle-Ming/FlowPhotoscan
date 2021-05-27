import scipy.io as scio
import os
import numpy as np
import scipy
import scipy.signal
import tifffile as tiff
from libtiff import TIFF
from PIL import Image
from constant import *

filename = '0929-1.raw'

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
    imgData = imgData.reshape(w*h, int(frames[0]))
    return imgData, frames, hdr_fname

def reconstructCube(image, height, width, blksize, m):
    nCols = int(width/blksize)
    nRows = int(height/blksize)
    nBands = int(blksize*blksize)
    tmp = np.reshape(image[:, m], (nCols*nBands, nRows))
    temp = tmp.T

    patternimg = np.zeros((height, width))
    for i in range(blksize):
        patternimg[i:height:blksize, 0:width] = temp[:, width*i:width*(i+1)]

    # dataCube = np.zeros((nRows, nCols, nBands))
    # for i in range(blksize):
    #     for j in range(blksize):
    #         dataCube[:, :, i*blksize + j] = patternimg[i:height:5, j:width:5]
    # return dataCube, patternimg
    return patternimg

# def devignetting(dCube, nRows, nCols, nBands, mid):
#     xm = round(nCols/2)
#     ym = round(nRows/2)
#     responseCorrect = np.zeros((np.size(np.arange(ym - mid, ym + mid)) + 1, np.size(np.arange(xm - mid, xm + mid)) + 1))
#     vignettingCube = np.zeros((nRows, nCols, nBands))
#     for iBands in range(nBands):
#         denoiseCube = dCube[:, :, iBands]
#         responseCorrect = denoiseCube[ym-mid-1:ym+mid, xm-mid-1:xm+mid]
#         rC = np.mean(responseCorrect)
#         ndMatrix = rC / denoiseCube
#         ndMatrix[~np.isfinite(ndMatrix)] = 0
        
#         vignettingCube[:, :, iBands] = scipy.signal.medfilt2d(denoiseCube)
#     # print(vignettingCube)
#     return vignettingCube

def writeTIFF(data, filename):
    tiff.imwrite(filename, data)
    # tif = TIFF.open(filename=filename, mode='w')
    # tif.write_image(data)

# print(correctionMatrix['correction'])
img, nframe, hdr_fname = readXimeaRaw(filename, width, height)
if not os.path.exists(hdr_fname):
    os.mkdir(hdr_fname)

"""
Unpack the raw data and preprocessing (devegnetting/denosing and spectral correction)
"""
for iframe in range(int(nframe[0])):
    # dataCube, spatialImg = reconstructCube(img, height, width, blksize, iframe)
    patternImg = reconstructCube(img, height, width, blksize, iframe)
    # vignettingCube = devignetting(dataCube, nRows, nCols, nBands, mid)
    # calibratedCube = np.zeros((nRows, nCols, nBands))
    
    # for i in range(nRows):
    #     for j in range(nCols):
    #         temp1 = vignettingCube[i, j, :]
    #         temp1 = temp1.reshape(temp1.shape[0], 1)
    #         correctedCube = np.dot(correctionMatrix['correction'], temp1)
    #         correctedCube = correctedCube.reshape(-1, correctedCube.shape[0])
    #         # print(correctedCube)
    #         correctedCube[np.where(correctedCube < 0)] = 0
    #         calibratedCube[i, j, :] = correctedCube
    # dataName = ['calibratedCube', 'dataCube', 'vignettingCube', 'spatialImg']

    # for w in range(len(dataName)):
    #     filePath = hdr_fname + '/' + dataName[w]
    #     if not os.path.exists(filePath):
    #         os.mkdir(filePath)
    #     filename = filePath + '/' + str(iframe+1) + '.tif'
    #     print(filePath, filename)
    #     wimage = eval(dataName[w])
        # writeTIFF(wimage, filename)

    filePath = hdr_fname + '/patternImg'
    if not os.path.exists(filePath):
        os.mkdir(filePath)
    filename = filePath + '/' + str(iframe+1) + '.tif'
    print(filePath, filename)
    wimage = patternImg
    writeTIFF(wimage, filename)