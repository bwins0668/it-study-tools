def get_total(x, y, z):
    return x + y + z


def get_average(x, y, z):
    return get_total(x, y, z) / 3


in_x = int(input('整数1を入力してください->'))
in_y = int(input('整数2を入力してください->'))
in_z = int(input('整数3を入力してください->'))

total = get_total(in_x, in_y, in_z)
average = get_average(in_x, in_y, in_z)

print('合計値:', total)
print('平均値:', average)
