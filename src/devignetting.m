function vignettingCube = devignetting(dataCube, nRows, nCols, nBands, mid)

    xm = round(nCols/2); ym = round(nRows/2);        % Center of the spatial resolution(approx. 409x217 pixels (5x5 pattern))
    responseCorrect = zeros(size(ym - mid:ym + mid, 2), size(xm - mid:xm + mid, 2));   
    
    for iBands = 1: nBands
        
        % Band specific flat field correction
        denoiseCube = dataCube(:,:,iBands); 
        responseCorrect = denoiseCube(ym - mid:ym + mid, xm - mid:xm + mid);
        responseCorrect = mean(mean(responseCorrect));
        ndMatrix = responseCorrect ./ denoiseCube;        
        %ndMatrix = responseCorrect ./ (exposureTime * denoiseCube);   
       
        % Remove Inf pixels caused due to zeros in the vignetting image
        ndMatrix(~isfinite(ndMatrix)) = 0;
                
        % Remove outliers separately for every band
%         vignettingCube(:,:,iBands) = medfilt2(ndMatrix);
        vignettingCube(:,:,iBands) = medfilt2(denoiseCube);
                       
        % ====== rescale to display
        % xmin = min(ndMatrix);
        % xmax = max(ndMatrix);
        % scaledNDMatrix = (ndMatrix - xmin)./(xmax - xmin) ;
        % % make Nan values 0
        % scaledNDMatrix(isnan(scaledNDMatrix))=0;
        % vignettingCube(:,:,iBands) = im2uint8(scaledNDMatrix);
        
    end
end

