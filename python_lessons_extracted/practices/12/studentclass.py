class Student:
    def __init__(self, in_name, in_math, in_eng, in_jpn):
        self.name = in_name
        self.math  = in_math
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
