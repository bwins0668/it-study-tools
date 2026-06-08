def calc(x, y):
    try:
        result = x / y
    except:
        print('calc()関数で例外が発生しました')
        raise


try:
    calc(3,0)
except ZeroDivisionError:
    print('ゼロで割り算してはいけません')
