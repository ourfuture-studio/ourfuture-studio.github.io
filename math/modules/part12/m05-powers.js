const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();
const relation = n => Number(fmt(n)) === n ? '=' : '≈';
const texRelation = n => Number(fmt(n)) === n ? '=' : String.raw`\approx`;
const powerPair = (a, n) => a === 0 && n <= 0 ? null : [Math.pow(-a, n) || 0, -Math.pow(a, n) || 0];

export default {
  id: 'M05', title: '괄호 하나가 거듭제곱의 부호를 바꿔요', part: 2,
  lessonIds: ['AIM-P02-L01', 'AIM-P02-L02'],
  question: '(-a)ⁿ과 -aⁿ은 언제 같고 언제 다를까요?',
  prerequisite: '음수의 곱셈을 알고 있으면 시작할 수 있어요.',
  controls: [
    { id: 'a', label: '0 이상의 크기 a', min: 0, max: 4, step: 0.5, value: 2 },
    { id: 'n', label: '정수 지수 n', min: -3, max: 6, step: 1, value: 2 },
  ],
  presets: [
    { id: 'even', label: '기본: 짝수 지수 2', values: { a: 2, n: 2 } },
    { id: 'odd', label: '비교: 홀수 지수 3', values: { a: 2, n: 3 } },
    { id: 'negative', label: '비교: 음의 지수 −2', values: { a: 2, n: -2 } },
    { id: 'zero-zero', label: '경계: 0의 0제곱', values: { a: 0, n: 0 } },
    { id: 'zero-negative', label: '경계: 0의 음의 거듭제곱', values: { a: 0, n: -1 } },
  ],
  explain: ['(-a)ⁿ에서는 괄호 안의 음수 전체가 밑이에요.', '-aⁿ에서는 a를 먼저 거듭제곱한 뒤 맨 앞의 마이너스를 붙여요.', '음의 지수는 역수입니다. 0의 음의 거듭제곱은 0으로 나누게 되므로 정의할 수 없어요.'],
  tryThis: ['a=2에서 n=2와 n=3의 부호를 먼저 예상하세요.', '지수를 −2로 바꿔 역수의 크기를 확인하세요.', 'a=0, n=0 또는 −1일 때 정의 조건을 읽으세요.'],
  compute(values = {}) {
    const a = Math.round(pick(values.a, 2, 0, 4) * 2) / 2, n = Math.round(pick(values.n, 2, -3, 6));
    const pair = powerPair(a, n);
    const first = [], second = [];
    for (let k = -3; k <= 6; k += 1) {
      const p = powerPair(a, k);
      if (p) { first.push([k, p[0]]); second.push([k, p[1]]); }
    }
    const ys = [...first, ...second].map(p => p[1]);
    const lo = Math.min(-1, ...ys), hi = Math.max(1, ...ys), pad = (hi - lo) * 0.1;
    const reason = a === 0 && n === 0 ? '0⁰은 이 기초 실수 거듭제곱 수업에서는 정의하지 않습니다. 문맥에 따라 별도 약속을 쓰기도 해요.' : '0의 음의 거듭제곱은 역수를 만들 때 0으로 나누게 되므로 정의하지 않습니다.';
    return {
      formulaTex: String.raw`\begin{gathered}(-a)^n\quad\text{and}\quad -(a^n)\\a\ge0,\ n\in\mathbb{Z}\\a=0\Longrightarrow n>0\end{gathered}`,
      calculationTex: pair ? String.raw`\begin{gathered}(-${fmt(a)})^{${n}}${texRelation(pair[0])}${fmt(pair[0])}\\-(${fmt(a)}^{${n}})${texRelation(pair[1])}${fmt(pair[1])}\end{gathered}` : String.raw`a=0,\ n=${n}:\quad\text{정의하지 않음}`,
      prediction: { prompt: '괄호가 있는 (−a)ⁿ의 값을 예상하세요.', answer: pair ? pair[0] : '정의하지 않음', tolerance: 0.000001 },
      formulaText: pair ? `(-${fmt(a)})^(${n}) ${relation(pair[0])} ${fmt(pair[0])}; -(${fmt(a)}^(${n})) ${relation(pair[1])} ${fmt(pair[1])}` : `a=0, n=${n}: 두 계산을 이 수업의 실수 범위에서 정의하지 않아요.`,
      metrics: [{ label: '괄호 있음: (−a)ⁿ', value: pair ? pair[0] : '정의하지 않음' }, { label: '괄호 없음: −aⁿ', value: pair ? pair[1] : '정의하지 않음' }, { label: '두 값이 같은가?', value: pair ? pair[0] === pair[1] ? '같음' : '다름' : '비교할 수 없음' }],
      steps: pair ? [`괄호가 있으면 밑은 ${fmt(-a)}이고, 괄호가 없으면 밑은 ${fmt(a)}예요.`, n < 0 ? `n=${n}이므로 각각 ${Math.abs(n)}제곱의 역수를 구해요.` : n === 0 ? '0이 아닌 수의 0제곱은 1이에요.' : `${Math.abs(n)}번 곱하는 계산을 먼저 해요.`, `괄호 있음: ${fmt(pair[0])}; 괄호 없음은 거듭제곱 뒤 부호를 붙여 ${fmt(pair[1])}이에요.`, a === 0 ? '지수가 양수이면 두 값은 모두 0이에요.' : n % 2 === 0 ? '짝수 지수에서는 음수 전체를 거듭제곱한 값이 양수예요.' : '홀수 지수에서는 음수 전체를 거듭제곱한 값도 음수예요.'] : [reason, '정의 조건을 만족하는 경우에만 값을 계산하고 그래프에 점을 표시합니다.'],
      conditions: ['지수 n은 정수입니다.', 'a>0에서는 이 체험의 모든 정수 지수가 가능합니다.', 'a=0일 때는 양의 정수 지수만 계산합니다.', '반복소수 등은 소수점 아래 6자리로 반올림하며 ≈로 표시합니다.', '가로축은 정수 지수 n입니다. 각 정수에서 점만 표시하며 정수 사이의 지수는 이 체험에서 계산하지 않습니다.'],
      warning: pair ? null : reason,
      plot: { type: 'cartesian', message: '가로축은 정수 지수입니다. 정의한 정수 입력마다 점만 그리며 점 사이는 연결하지 않습니다.', xRange: [-3.5, 6.5], yRange: [lo - pad, hi + pad], curves: [{ label: '괄호 있음: (−a)ⁿ (정수 점)', color: '#245f93', connect: false, markers: true, points: first }, { label: '괄호 없음: −aⁿ (정수 점)', color: '#7a1f2e', connect: false, markers: true, points: second }], points: pair ? [{ label: `(−a)ⁿ${relation(pair[0])}${fmt(pair[0])}`, x: n, y: pair[0], color: '#245f93' }, { label: `−aⁿ${relation(pair[1])}${fmt(pair[1])}`, x: n, y: pair[1], color: '#7a1f2e' }] : [] },
      target: { prompt: 'a>0이고 n이 짝수이면 두 값의 부호가 같을까요?', expected: '달라요. (−a)ⁿ은 양수, −aⁿ은 음수예요.' },
    };
  },
};
