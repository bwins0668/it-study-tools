class Student:
    def __init__(self, in_name='', in_math=0, in_eng=0, in_jpn=0):
        self.name = in_name
        self.math = in_math
        self.english = in_eng
        self.japanese = in_jpn


stu1 = Student('菴占陸', 90, 60, 70)
print(type(stu1))
