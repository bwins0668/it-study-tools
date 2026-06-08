from datetime import datetime
s = '2000年3月3日'
dt = datetime.strptime(s, '%Y年%m月%d日')
print(dt)
