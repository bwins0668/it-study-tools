# 解答例1（delを利用）
scores = [100, 64, 48, 83]
print('削除前', scores)
del scores[0]
print('削除後', scores)


# 解答例2（popを利用）
scores = [100, 64, 48, 83]
print('削除前', scores)
scores.pop(0)
print('削除後', scores)


# 解答例3（スライスを利用）
scores = [100, 64, 48, 83]
print('削除前', scores)
scores2 = scores[1:]
print('削除後', scores2)

