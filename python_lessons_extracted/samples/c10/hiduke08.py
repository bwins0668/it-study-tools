from datetime import date, datetime, timedelta
nd = date.today() - timedelta(days=1)   # 3時間前のdateを取得
print(nd)
hd = datetime.now() + timedelta(hours=3)   # 1日後のdatetimeを取得
print(hd)

# 2000/3/10から2000/3/3までの差分
td1 = date(2000, 3, 10) - date(2000, 3, 3)
print(td1.days)  # 2000/3/3から2000/3/10までの日数

# 2000/3/3 10:00から2000/3/3 10:30までの秒数
td2 = datetime(2000, 3, 3, 10, 30) - datetime(2000, 3, 3, 10, 00)
print(td2.seconds)
