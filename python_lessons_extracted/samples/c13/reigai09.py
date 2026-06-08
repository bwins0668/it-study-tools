try:
    a = int(input('整数を入力してください->'))
    result = 100 / a
except ValueError as ve:
    print('整数を入力しないといけません')
    print(ve)
except ZeroDivisionError as zde:
    print('0で割り算してはいけません')
    print(zde)
else:
    print(result)
finally:
    print('プログラムが終わりました')
