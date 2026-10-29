const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();
const relation = n => Number(fmt(n)) === n ? '=' : '≈';
const texRelation = n => Number(fmt(n)) === n ? '=' : String.raw`\approx`;

export default {
  id: 'M08', title: '로그는 몇 번 거듭제곱했는지 찾는 질문', part: 2,
  lessonIds: ['AIM-P02-L06', 'AIM-P02-L07', 'AIM-P01-L08'],
  question: '2를 몇 제곱하면 8일까요? 지수함수의 입력과 출력을 바꿔 보세요.',
  prerequisite: 'bˣ=u에서 밑·지수·결과를 구분한 뒤 시작하세요.',
  controls: [
    { id: 'base', label: '로그의 밑 b (0·1은 조건 확인용)', min: 0, max: 4, step: 0.25, value: 2 },
    { id: 'u', label: '진수 u (0 이하는 조건 확인용)', min: -1, max: 8, step: 0.25, value: 8 },
  ],
  presets: [
    { id: 'basic', label: '기본: log₂8', values: { base: 2, u: 8 } },
    { id: 'fraction', label: '비교: log₂(1/2)', values: { base: 2, u: 0.5 } },
    { id: 'decay', label: '비교: 밑이 1/2', values: { base: 0.5, u: 4 } },
    { id: 'zero-input', label: '경계: 진수 0', values: { base: 2, u: 0 } },
    { id: 'one-base', label: '경계: 밑 1', values: { base: 1, u: 8 } },
    { id: 'zero-base', label: '경계: 밑 0', values: { base: 0, u: 8 } },
  ],
  explain: ['log_b u는 b를 몇 제곱해야 u가 되는지를 묻는 기호예요.', 'bˣ=u와 log_b u=x는 같은 관계를 서로 다른 방향으로 읽은 식이에요.', '자연로그 ln u는 밑이 자연상수 e인 로그입니다. 여기서는 조절하기 쉬운 수의 밑을 먼저 다뤄요.'],
  tryThis: ['log₂8의 값을 예상한 뒤 계산을 확인하세요.', '진수를 1, 0.5로 바꾸고 로그값의 부호를 확인하세요.', '진수 0이나 밑 1이 왜 정의되지 않는지 예외 설명을 읽으세요.'],
  compute(values = {}) {
    const base = Math.round(pick(values.base, 2, 0, 4) * 4) / 4, u = Math.round(pick(values.u, 8, -1, 8) * 4) / 4;
    const validBase = base > 0 && base !== 1, valid = validBase && u > 0;
    const value = valid ? Math.log(u) / Math.log(base) : null;
    const xLow = Math.min(-4, valid ? value - 0.5 : -4), xHigh = Math.max(9, valid ? value + 0.5 : 9);
    const yLow = Math.min(-4, valid ? value - 0.5 : -4), yHigh = Math.max(9, valid ? value + 0.5 : 9);
    const logarithm = validBase ? Array.from({ length: 161 }, (_, i) => { const t = 0.0625 + (8 - 0.0625) * i / 160; return [t, Math.log(t) / Math.log(base)]; }).filter(p => p[1] >= yLow && p[1] <= yHigh) : [];
    const exponential = validBase ? Array.from({ length: 161 }, (_, i) => { const t = xLow + (xHigh - xLow) * i / 160; return [t, Math.pow(base, t)]; }).filter(p => Number.isFinite(p[1]) && p[1] >= yLow && p[1] <= yHigh) : [];
    const warning = !validBase ? base === 1 ? '밑 1은 어떤 실수 지수에서도 1만 만들어 입력을 하나로 되돌릴 수 없어요. 로그의 밑에서 제외합니다.' : '로그의 밑은 0보다 커야 해요. 0보다 큰 수 중 1이 아닌 밑을 선택하세요.' : u <= 0 ? '진수는 양수여야 해요. 양의 밑을 실수만큼 거듭제곱하면 0이나 음수가 되지 않아요.' : null;
    return {
      formulaTex: String.raw`\begin{gathered}\log_b u=x\Longleftrightarrow b^x=u\\b>0,\ b\ne1,\ u>0\end{gathered}`,
      calculationTex: valid ? String.raw`\begin{gathered}x=\log_{${fmt(base)}}(${fmt(u)})${texRelation(value)}${fmt(value)}\\${fmt(base)}^x=${fmt(u)}\end{gathered}` : String.raw`\begin{gathered}b=${fmt(base)},\ u=${fmt(u)}\\\text{실수 로그의 정의 조건을 만족하지 않음}\end{gathered}`,
      prediction: { prompt: '선택한 밑을 몇 제곱해야 진수가 되는지 예상하세요.', answer: valid ? value : '실수에서 정의되지 않음', tolerance: 0.000001 },
      formulaText: valid ? `x = log_(${fmt(base)})(${fmt(u)}) ${relation(value)} ${fmt(value)}; 정확한 x를 넣으면 ${fmt(base)}^x = ${fmt(u)}` : `b=${fmt(base)}, u=${fmt(u)}: 로그의 실수 정의 조건을 만족하지 않아요.`,
      metrics: [{ label: '로그값 x', value: valid ? value : '실수에서 정의되지 않음' }, { label: '지수로 되돌린 bˣ', value: valid ? Math.pow(base, value) : '계산하지 않음' }, { label: '로그의 입력 → 출력', value: valid ? `${fmt(u)} → ${fmt(value)}` : '정의 조건 확인' }, { label: '지수의 입력 → 출력', value: valid ? `${fmt(value)} → ${fmt(u)}` : '정의 조건 확인' }],
      steps: valid ? [`${fmt(base)}를 몇 제곱하면 ${fmt(u)}인지 물어요.`, `ln(${fmt(u)}) ÷ ln(${fmt(base)})로 계산한 소수 표시는 ${fmt(value)}예요. 필요한 경우 반올림한 값입니다.`, `정확한 로그값 x를 지수에 넣으면 원래 진수 ${fmt(u)}로 돌아와요. 반올림한 x를 넣으면 작은 오차가 생길 수 있어요.`, `로그 그래프의 점과 지수 그래프의 점은 좌표의 순서가 뒤바뀐 관계예요. 표시 좌표: (${fmt(u)}, ${fmt(value)}) ↔ (${fmt(value)}, ${fmt(u)})`] : [warning, validBase ? '밑의 조건은 맞으므로 다른 양수 진수에 대한 로그 곡선은 표시합니다.' : '정의되지 않는 로그 곡선은 그리지 않습니다.', '밑과 진수의 조건을 먼저 확인한 뒤 계산하세요.'],
      conditions: ['실수 로그의 밑은 b>0이고 b≠1이어야 합니다.', '진수 u는 0보다 커야 합니다.', 'log_b 1=0이며, 로그값은 양수·0·음수 모두 가능합니다.', '지수와 로그는 y=x 직선을 기준으로 좌표를 맞바꾼 그래프입니다.', '곡선은 화면 범위 안의 부분만 표시합니다. 소수는 반올림한 근삿값입니다.'],
      warning,
      plot: { type: 'cartesian', aspect: 'equal', xRange: [xLow, xHigh], yRange: [yLow, yHigh], curves: validBase ? [{ label: '로그 y=log_b x', color: '#245f93', points: logarithm }, { label: '지수 y=bˣ', color: '#7a1f2e', points: exponential }, { label: '좌표를 맞바꾸는 기준 y=x', color: '#7b8089', points: [[Math.max(xLow, yLow), Math.max(xLow, yLow)], [Math.min(xHigh, yHigh), Math.min(xHigh, yHigh)]] }] : [], points: valid ? [{ label: `로그 (${fmt(u)}, ${fmt(value)})`, x: u, y: value, color: '#245f93' }, { label: `지수 (${fmt(value)}, ${fmt(u)})`, x: value, y: u, color: '#7a1f2e' }] : [] },
      target: { prompt: 'log₂8=3을 거듭제곱 식으로 바꿔 보세요.', expected: '2³=8' },
    };
  },
};
