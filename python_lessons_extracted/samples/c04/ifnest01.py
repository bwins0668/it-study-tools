str1 = input('「abc」と入力してください->')
if str1 == 'abc':
    print('abcが正しく入力されました')
    str2 = input('「123」と入力してください->')
    if str2 == '123':
        print('123が正しく入力されました')
        print('ifブロック2が終わります')
    print('ifブロック1が終わります')
print('終了します')
