from scipy import stats

before = [7, 9, 6, 8, 10]
after = [8, 12, 8, 9, 12]
print([name for name in dir(stats) if name.startswith('ttest')])
help(stats.ttest_rel)
result = stats.ttest_rel(after, before, alternative='greater')
print(result.statistic, result.pvalue)
