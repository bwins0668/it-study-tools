from datetime import datetime
dt = datetime(2000, 3, 3, 10, 30)
st = dt.strftime('%Y/%m/%d %p%I:%M')
print(st)
