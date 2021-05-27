% clc; clear; warning off
function nRows = ximeaDataCalibration(fname)
%% ==== Select filePath
% fname = 'E:\\UAV\\raw\0929-1.raw';

%% ==== Select correct parameters
exposureTime = 25;
writeFormat = 'TIFF';
% writeFormat = 'ENVI';
waveRange = '600-875';                                                                  % ALternative choice: 600-875/675-975
load CorrectionMatrix25-600-875.mat                                                     % Correction Matrix
% waveRange = '675-975';
% load CorrectionMatrix25-675-975.mat                                                  

%% ==== Load the raw image
nRows = 216; nCols = 409; nBands = 25; offset_r = 3; offset_c = 0; mid = 12;            % Default parameters correspond to Ximea images
width = 2045; height = 1080; blksize = 5;
                                              % Pattern image size
[img, nframe, hdr_fname] = readXimeaRaw(fname, width, height);                          % Load data
if ~exist(hdr_fname,'dir')
    mkdir(hdr_fname);
end

%% ==== Unpack the raw data and preprocessing (devegnetting/denosing and spectral correction)
for iframe = 1: nframe
    [dataCube, spatialImg] = reconstructCube(img, height, width, blksize, iframe, hdr_fname);      % Extract data cube
    vignettingCube = devignetting(dataCube, nRows, nCols, nBands, mid);                 % Devignetting/Flat field correction

    for i = 1: nRows                                                                    % Correcte spectrum utilizing the correction matrix
        for j = 1: nCols                                                                % (this could sort the spectrum by wavelength)
            temp1 = vignettingCube(i,j,:);
            correctedCube = correction * temp1(1,:)';
            correctedCube(find(correctedCube<0)) = 0;
            calibratedCube(i,j,:) = correctedCube;
        end
    end
    
    %%  ==== Write Image (single/float 32)
    dataName = {'calibratedCube';'dataCube';'vignettingCube';'spatialImg'};
    for w = 1: size(dataName, 1)
        filePath = strcat(hdr_fname, '\' , dataName{w,1});
        if ~exist(filePath,'dir')
          mkdir(filePath);
        end
        filename = strcat(filePath, '\' , hdr_fname(end-5:end), '_', dataName{w,1}, '_', num2str(iframe), '.tif');
        wimage = single(eval(dataName{w,1}));  
        writeTIFF(wimage, filename);
    end
    disp(strcat(num2str(iframe), ' TIFF image has been written.'));
end


