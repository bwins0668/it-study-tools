import os
import glob

pstr = r'C:ﾂ･zero-pythonﾂ･c12ﾂ･*ﾂ･*.txt'
winstr = pstr.replace(r'ﾂ･', os.sep)
flst = glob.glob(winstr)
print(flst)
