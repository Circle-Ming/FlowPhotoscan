function [rawImage, frames, hdr_fname] = readXimeaRaw(fname, width, height)

    % Open the .hdr file
    pos = find('.'== fname);
    hdr_fname = fname(1:pos-1);
    hdrfid = fopen(strcat(hdr_fname,'.hdr'),'r');
    % Check if the header file is correctely open
    if hdrfid == -1
        error('Input header file does not exist');
    end;

    % Obtain the frames info
    while 1
        tline = fgetl(hdrfid);
        if ~ischar(tline), break, end
        if findstr(tline,'Frames');
           [~, second]=strtok(tline,'=');
           [~, frames]=strtok(second);
           frames = str2num(frames);            % frame info
        end
    end
    fid=fopen(fname);
    
    % data and frame decoding
    rawImage=fread(fid,[width*height  frames], 'uint16');
%     rawImage=fread(fid, 'uint8');
%     rawImage=fread(fid, 'uint16');
end

