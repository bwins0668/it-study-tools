from datetime import datetime

str1 = input('YYYY/MM/DDの型式で日付を入力して下さい->')

dt = datetime.strptime(str1, '%Y/%m/%d')
ori = datetime(2020, 7, 24)
tdelta = ori - dt

print('東京オリンピック開会式まで', tdelta.days, '日です')
