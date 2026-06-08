f = open('writesample2.txt', 'w', encoding='utf-8')
txt = ['abc', 'def', 'efg']
f.writelines(txt)
f.close()
