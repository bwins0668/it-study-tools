class Student:
    def __init__(self, in_name, in_math, in_eng, in_jpn):
        self.name = in_name
        self.math = in_math
        self.english = in_eng
        self.japanese = in_jpn

    # 自分の情報を表示するメソッド
    def show_detail(self):
        print('生徒名:', self.name)
        print('数学:', self.math)
        print('英語:', self.english)
        print('国語:', self.japanese)

    # 合計点数を返すメソッド
    def get_total_score(self):
        return self.math + self.english + self.japanese

    # 数学の点数を変更するメソッド
    def set_math(self, new_math):
        self.math = new_math


stu1 = Student('佐藤', 90, 60, 70)
# 自分の情報を表示
stu1.show_detail()
# 空行の表示
print()
# 数学の点数を変更する
stu1.set_math(85)
# もう一度自分の情報を表示
stu1.show_detail()

# 合計点数を取得する
ts1 = stu1.get_total_score()
print('合計点:', ts1)
