from answer9_2.studentclass import Student
from answer9_2.searchmethod import search_student

name1 = input('生徒名を入力してください->')
stu = search_student(name1)
if stu is not None:
    stu.show_detail()
else:
    print('存在しません')
