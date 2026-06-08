num1 = float(input('数値1を入力してください->'))
num2 = float(input('数値2を入力してください->'))

if num1 > num2:
    print('数値1は数値2より大きい')
elif num1 < num2:
    print('数値2が数値1より大きい')
elif num1 == num2:
    print('数値1と数値2は同じ数')
