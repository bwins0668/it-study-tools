import re

result = re.sub(r'[0-9]', '*', 'ab123cd456efg')
print(result)
