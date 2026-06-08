try:
    a = int(input('整数を入力してください->'))
    result = 100 / a
except (ValueError, ZeroDivisionError):
    print('入力値に誤りがあります')
else:
    print(result)
