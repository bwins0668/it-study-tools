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

    def get_total_score(self):
        return self.math + self.english + self.japanese

    def get_average_score(self):
        return self.get_total_score() / 3


name1 = input('生徒名を入力してください->')
math1 = int(input('数学の点数を入力してください->'))
eng1 = int(input('英語の点数を入力してください->'))
jpn1 = int(input('国語の点数を入力してください->'))
print()

student1 = Student(name1, math1, eng1, jpn1)

student1.show_detail()
total1 = student1.get_total_score()
ave1 = student1.get_average_score()
print('合計点:', total1)
print('平均点:', ave1)
