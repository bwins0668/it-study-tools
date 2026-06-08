f = open('students.txt', encoding='utf-8')
list1 = f.readlines()
print('students.txtの内容をリストに格納します')
print(list1)
f.close()
