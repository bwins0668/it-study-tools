from datetime import datetime

str1 = input('YYYY/MM/DDの型式で日付を入力して下さい->')

dt = datetime.strptime(str1, '%Y/%m/%d')
print(dt)
print(type(dt))
