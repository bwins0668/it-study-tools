import glob
import os

pstr = r'C:ﾂ･zero-pythonﾂ･c12ﾂ･sub01ﾂ･**ﾂ･*.txt'
winstr = pstr.replace(r'ﾂ･', os.sep)
flst = glob.glob(winstr,  recursive=True)
print(flst)
