from datetime import date
if date.today() > date(2000, 3, 3):
    print('過去の日付です')
elif date.today() == date(2000, 3, 3):
    print('今日です')
else:
    print('未来の日付です')
