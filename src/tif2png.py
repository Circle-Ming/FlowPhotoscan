import os
import cv2
path = os.getcwd()

tif_list = [x for x in os.listdir(path) if x.endswith(".tif")] #找到当前路径下的所有.tif
jpg_list = [x for x in os.listdir(path) if x.endswith(".jpg")] #找到当前路径下的所有.tif

if not os.path.exists('./png'):
    os.mkdir('./png')
count = 0
for num, i in enumerate(tif_list):
    img = cv2.imread(i,-1) #这里选择-1， 不进行转化
    cv2.imwrite('./png/' + i.split('.')[0]+".png", img)

for num, j in enumerate(jpg_list):
    img = cv2.imread(j,-1) #这里选择-1， 不进行转化
    cv2.imwrite('./png/' + i.split('.')[0]+".png", img)
