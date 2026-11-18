import pandas as pd

s = pd.Series(['A', 'A', None, 'B'], dtype='object')
help(s.value_counts)
print(s.value_counts())
print(s.value_counts(dropna=False))
