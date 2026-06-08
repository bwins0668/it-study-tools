def calc2(x, y):
    if y != 0:
        return x / y
    else:
        raise Exception('ゼロで割り算してはいけません')


try:
    calc2(3,0)
except Exception as e:
    print(e)
