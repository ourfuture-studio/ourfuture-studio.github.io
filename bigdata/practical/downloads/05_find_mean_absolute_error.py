from sklearn import metrics

print([name for name in dir(metrics) if 'absolute' in name])
help(metrics.mean_absolute_error)
y_true = [3, 5, 7]
y_pred = [4, 5, 5]
print(metrics.mean_absolute_error(y_true, y_pred))
