function [dataCube, patternimg] = reconstructCube(img, height, width, blksize, m, hdr_fname)
    
    nCols = width/blksize;
    nRows = height/blksize;
    nBands = blksize^2;
    
    % 2D spatial data decompression
    % Pattern image
    temp = reshape(img(:,m), nCols*nBands, nRows); 
    temp = temp';
    for i = 1: blksize
        patternimg(i:blksize:height, 1:width) = temp(:,1 + width *(i-1):width * i);
    end
    
    % Demosaicing and reconstructed HIS data cube
    dataCube = zeros(nRows, nCols, nBands);
    for i = 1: blksize       % blkrow
        for j = 1: blksize   % blkcol
            band = blksize*(i-1) + j;
            dataCube(:,:, band) = patternimg(i:5:end,j:5:end);
            % 写单波段文件
            % filePath = strcat(hdr_fname(end-5:end), '\singleBands\MS_band', num2str(band));
            % if ~exist(filePath,'dir')
            %     mkdir(filePath);
            % end
            % filename = strcat(filePath, "\MS_B", num2str(band), '_', hdr_fname(end-5:end), '_', num2str(m), '.tif');
            % writeTIFF(single(dataCube(:, :, band)), filename)
        end
    end

end
