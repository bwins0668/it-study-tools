name = input('生徒名を入力してください->')
math = input('数学の点数を入力してください->')
english = input('英語の点数を入力してください->')
japanese = input('国語の点数を入力してください->')

fw = open('students.txt', 'a', encoding='utf-8')
student = name + ',' + math + ',' + english + ',' + japanese + '\n'
fw.write(student)
fw.close()

print()
print('students.txtの内容')
print()

f = open('students.txt', encoding='utf-8')
str1 = f.read()
print(str1)
f.close()
