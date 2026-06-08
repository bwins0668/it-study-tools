f = open('sample.txt', encoding='utf-8')

line = f.readline()  # 1行目を読み込む

count = 1

while line != '':  # ファイルの最後になるまで

    print(str(count) + '行目:', line, end='')

    line = f.readline()  # 次の行を読み込む

    count += 1



f.close()
