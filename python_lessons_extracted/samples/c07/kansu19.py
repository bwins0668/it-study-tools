def cook(name='カレー', count=1):
    print('料理をはじめます')
    return str(count) + '人分の' + name + 'を作りました'



msg = cook('カレー', 3)
print('受け取ったメッセージを表示します')
print(msg)
