import pandas as pd

df = pd.DataFrame({'score': [78, 92, 85]})
help(df.sort_values)
sorted_df = df.sort_values(by='score', ascending=False)
print(sorted_df['score'].tolist())
