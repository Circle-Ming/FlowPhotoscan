import numpy as np
import statistics

import scipy.io as scio
import os
import numpy as np
import scipy


exposureTime = 25
writeFormat = 'TIFF'
waveRange = '600-875'
# waveRange = '675-975'


nRows = 216 
nCols = 409 
nBands = 25
offset_r = 3
offset_c = 0
"""
Default parameters correspond to Ximea images
"""
mid = 12  
width = 2045
height = 1080
blksize = 5
