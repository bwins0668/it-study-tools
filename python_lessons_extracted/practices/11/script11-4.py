from studentclass import Student

f = open('students.txt', encoding='utf-8')
l1 = f.readline()
l2 = f.readline()
l3 = f.readline()

sline = l3.split(',')
stu = Student(sline[0], int(sline[1]), int(sline[2]), int(sline[3]))
stu.show_detail()
f.close()
