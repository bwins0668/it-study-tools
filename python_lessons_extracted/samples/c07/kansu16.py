def cook(name='カレー', count=1, cold=False):
    temp = '熱々の'
    if cold:
        temp = '冷たい'

    print('料理をはじめます')
    print(str(count) + '人分の' + temp + name + 'を作りました')


cook('ハンバーグ', cold=False, count=2)
