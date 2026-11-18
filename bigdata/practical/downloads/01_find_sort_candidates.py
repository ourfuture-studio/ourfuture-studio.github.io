import pandas as pd

df = pd.DataFrame({'score': [78, 92, 85]})
print(dir(df))
print([name for name in dir(df) if name.startswith('sort')])
