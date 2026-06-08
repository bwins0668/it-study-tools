import random

dice1 = random.randint(1, 6)
print('サイコロ1', dice1)
dice2 = random.randint(1, 6)
print('サイコロ2', dice2)
dice3 = random.randint(1, 6)
print('サイコロ3', dice3)

if (dice1 + dice2 + dice3) % 2 == 0:
    print('合計は偶数です')
else:
    print('合計は奇数です')
