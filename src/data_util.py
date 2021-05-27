import matlab
import matlab.engine
import json
import os
import cv2

eng = matlab.engine.start_matlab()
print('Begin to load the raw file：) maybe 1 min left before processing')
ospath = os.getcwd()
# data = {'filename':'E:\UAV\\raw\\0929-1.raw'}
# if not os.path.exists('./middle'):
#     os.mkdir('./middle')

# with open('./middle/1.json', 'w') as f:
#     json.dump(data, f)

with open('./middle/1.json', 'r', encoding='utf-8') as f:
    data_ = json.load(f)


filepath = data_['filename'].split('\\')[-1]
nRows = eng.ximeaDataCalibration(data_['filename'])

print('Now we will transform some tif files into rgb ones!!')
path = ospath + '\\raw\\' + filepath.split('.')[0] + '\spatialImg\\'
if not os.path.exists(path + 'rgb\\'):
    os.mkdir(path + 'rgb\\')
tif_list = [x for x in os.listdir(path) if x.endswith(".tif")] #找到当前路径下的所有.tif
for num, i in enumerate(tif_list):
    this_file_path = '.\\raw\\' + filepath.split('.')[0] + '\spatialImg\\'
    img = cv2.imread(this_file_path + i,-1) #这里选择-1， 不进行转化
    cv2.imwrite(this_file_path + 'rgb\\' + i.split('_')[-1].split('.')[0]+".jpg", img)

print("Done with the raw file processing")
