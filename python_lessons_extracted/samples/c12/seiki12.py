import re

f = open('test-result.txt', encoding='utf-8')
student = f.readline()  # ファイルの1行目を読み込む
math = []   # 空のリストを作成
while student != '':
    mo = re.search(r'数学:([0-9]+)点', student)  # 読み込んだ行から数学の点数をタプルで取得
    math += list(mo.groups())  # タプルをリストにしてmathリストにの末尾に追加
    student = f.readline()
f.close()
print(math)
