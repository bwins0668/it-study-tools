hour = int(input('今何時ですか？->'))

if 6 <= hour <= 10:
    print('おはようございます')
elif 11 <= hour <= 15:
    print('こんにちは')
elif 16 <= hour <= 23 or 0 <= hour <= 5:
    print('こんばんは')
elif hour < 0 or hour >= 24:
    print('0から23までの数字を入力してください')
