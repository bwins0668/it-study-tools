try:
    a = int(input('整数を入力してください->'))
except:
    print('整数を入力しないといけません')
else:
    if a > 10 or a <=0 :
        print('aは0より小さい、または10以上です')
    else :
        print('aは0以上10未満です')
