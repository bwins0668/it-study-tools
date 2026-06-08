def print_score(x, y, z):
    score_sum = x + y + z
    print('合計値:', score_sum)
    print('平均値:', score_sum / 3)


in_x = int(input('整数1を入力してください->'))
in_y = int(input('整数2を入力してください->'))
in_z = int(input('整数3を入力してください->'))
print_score(in_x, in_y, in_z)
