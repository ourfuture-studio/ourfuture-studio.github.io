self.onmessage = event => {
  const n = event.data;
  if (!Number.isInteger(n) || n < 1 || n > 1000000) throw new RangeError("입력 범위 오류");
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  self.postMessage(sum);
};
