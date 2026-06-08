students = {'佐藤': {'math':100, 'english':40, 'japanese':65}, '丸山': {'math':64, 'english':98, 'japanese':79}, '三村': {'math':48, 'english':87, 'japanese':92}, '古川': {'math':83, 'english':81, 'japanese':74}}

while True:
    name = input('生徒名を入力してください->')
    if name in students:
        print(students[name])
        break
    else:
        print('存在しません')
