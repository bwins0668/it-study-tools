class Student:
    def __init__(self, in_name, in_math, in_eng, in_jpn):
        self.name = in_name
        self.math = in_math
        self.english = in_eng
        self.japanese = in_jpn

    def show_detail(self):
        print('生徒名:', self.name)
        print('数学:', self.math)
        print('英語:', self.english)
        print('国語:', self.japanese)


name1 = input('生徒名を入力してください->')
math1 = int(input('数学の点数を入力してください->'))
eng1 = int(input('英語の点数を入力してください->'))
jpn1 = int(input('国語の点数を入力してください->'))
print()
name2 = input('生徒名を入力してください->')
math2 = int(input('数学の点数を入力してください->'))
eng2 = int(input('英語の点数を入力してください->'))
jpn2 = int(input('国語の点数を入力してください->'))
print()

student1 = Student(name1, math1, eng1, jpn1)
student2 = Student(name2, math2, eng2, jpn2)

print('＜生徒1＞')
student1.show_detail()
print('＜生徒2＞')
student2.show_detail()
