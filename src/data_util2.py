import json
import os
from PIL import Image
import numpy as np
import time
import cv2
 
# data = {'filename':'E:\\UAV\\rgb\\3.png'}
# if not os.path.exists('./middle'):
#     os.mkdir('./middle')
# with open('./middle/2.json', 'w') as f:
#     json.dump(data, f)

with open('./middle/2.json', 'r') as f:
    data_ = json.load(f)

filepath = data_['filename']
# print(filepath)

img = Image.open(filepath)
Img = img.convert('L')
threshold = 215

table = []
for i in range(256):
    if i < threshold:
        table.append(0)
    else:
        table.append(1)

photo = Img.point(table, '1')
Img_L = np.array(photo)
color_0 = np.where(Img_L == 1)[0].shape[0]
pixel_sum = Img_L.shape[0] * Img_L.shape[1]
rate = color_0/pixel_sum
num = str(11.9312 + 1.9005*rate)[:5]
index = filepath.find('rgb')
data_['filename'] = filepath[index+4:-4] + "_" + num + ".png"
with open('./middle/3.json', 'w') as f:
    json.dump(data_, f)

# photo.save("./rgb/"+ filepath[index+4:-4] + "_" + num + ".png")
photo.save("./rgb/"+ filepath[index+4:-4] + ".jpg")
print("Done with the rice ear segmentation and yield prediction")
