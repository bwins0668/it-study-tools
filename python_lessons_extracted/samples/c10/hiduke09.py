from datetime import datetime
td = datetime(2000, 3, 3, 10, 30) - datetime(2000, 3, 3, 10, 00)
m = td.seconds // 60
print(m, '分経ちました')
