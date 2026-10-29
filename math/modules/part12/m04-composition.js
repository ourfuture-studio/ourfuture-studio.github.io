const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();

export default {
  id: 'M04', title: '함수 두 개를 통과하는 순서', part: 1,
  lessonIds: ['AIM-P01-L07', 'AIM-P01-L08'],
  question: '곱하고 더하는 기계를 두 번 통과할 때 순서를 바꾸면 결과도 바뀔까요?',
  prerequisite: 'f(x)=ax+b에 숫자를 대입해 본 뒤 시작하세요.',
  controls: [
    { id: 'a', label: 'f의 곱하는 수 a', min: -3, max: 3, step: 1, value: 2 },
    { id: 'b', label: 'f의 더하는 수 b', min: -3, max: 3, step: 1, value: 1 },
    { id: 'c', label: 'g의 곱하는 수 c', min: -3, max: 3, step: 0.5, value: 1 },
    { id: 'd', label: 'g의 더하는 수 d', min: -3, max: 3, step: 1, value: 3 },
    { id: 'x', label: '처음 입력 x', min: -3, max: 3, step: 0.5, value: 2 },
  ],
  presets: [
    { id: 'basic', label: '기본: 순서에 따라 달라짐', values: { a: 2, b: 1, c: 1, d: 3, x: 2 } },
    { id: 'same', label: '비교: 더하기끼리는 같은 결과', values: { a: 1, b: 1, c: 1, d: 3, x: 2 } },
    { id: 'zero', label: '경계: f가 상수함수', values: { a: 0, b: 1, c: 2, d: 3, x: 2 } },
    { id: 'inverse', label: '되돌리기: f=2x+2, g=x/2−1', values: { a: 2, b: 2, c: 0.5, d: -1, x: 2 } },
  ],
  explain: ['f(g(x))는 g부터 계산한 다음, 그 출력을 f의 입력으로 넣어요.', '두 순서가 같은 경우도 있지만, 항상 같지는 않아요.', '실수 전체에서 ax+b는 a≠0일 때 (y−b)/a로 되돌릴 수 있어요.'],
  tryThis: ['기본 예시에서 g를 먼저 적용한 값을 예상하세요.', 'x를 움직이며 두 그래프 간격을 살펴보세요.', 'a=0이면 왜 f의 입력을 복구할 수 없는지 설명해 보세요.'],
  compute(values = {}) {
    const a = pick(values.a, 2, -3, 3), b = pick(values.b, 1, -3, 3);
    const c = pick(values.c, 1, -3, 3), d = pick(values.d, 3, -3, 3), x = pick(values.x, 2, -3, 3);
    const f = t => a * t + b, g = t => c * t + d;
    const fg = f(g(x)), gf = g(f(x));
    const xs = Array.from({ length: 61 }, (_, i) => -3 + i / 10);
    const ys = xs.flatMap(t => [f(g(t)), g(f(t))]);
    const lo = Math.min(-1, ...ys), hi = Math.max(1, ...ys), pad = (hi - lo) * 0.1;
    const equal = Math.abs(a * d + b - (c * b + d)) < 1e-10;
    return {
      formulaTex: String.raw`\begin{gathered}f(x)=ax+b,\quad g(x)=cx+d\\(f\circ g)(x)=a(cx+d)+b\\(g\circ f)(x)=c(ax+b)+d\end{gathered}`,
      calculationTex: String.raw`\begin{aligned}g(${fmt(x)})&=(${fmt(c)})(${fmt(x)})+(${fmt(d)})=${fmt(g(x))}\\f(g(${fmt(x)}))&=(${fmt(a)})(${fmt(g(x))})+(${fmt(b)})=${fmt(fg)}\\f(${fmt(x)})&=(${fmt(a)})(${fmt(x)})+(${fmt(b)})=${fmt(f(x))}\\g(f(${fmt(x)}))&=(${fmt(c)})(${fmt(f(x))})+(${fmt(d)})=${fmt(gf)}\end{aligned}`,
      prediction: { prompt: 'g를 먼저, f를 나중에 적용한 출력을 예상하세요.', answer: fg, tolerance: 0.000001 },
      formulaText: `g(${fmt(x)})=${fmt(g(x))} → f(g(${fmt(x)}))=${fmt(fg)}; f(${fmt(x)})=${fmt(f(x))} → g(f(${fmt(x)}))=${fmt(gf)}`,
      metrics: [{ label: 'g → f의 출력', value: fg }, { label: 'f → g의 출력', value: gf }, { label: '두 출력의 차이 (g→f)−(f→g)', value: fg - gf }, { label: '모든 x에서 두 합성이 같은가?', value: equal ? '예' : '아니요' }],
      steps: [`f(x)=(${fmt(a)})x+(${fmt(b)}), g(x)=(${fmt(c)})x+(${fmt(d)})로 정했어요.`, `g부터: (${fmt(c)}) × (${fmt(x)}) + (${fmt(d)}) = ${fmt(g(x))}; 그 값을 f에 넣으면 ${fmt(fg)}예요.`, `f부터: (${fmt(a)}) × (${fmt(x)}) + (${fmt(b)}) = ${fmt(f(x))}; 그 값을 g에 넣으면 ${fmt(gf)}예요.`, `두 합성의 x 계수는 모두 ac=${fmt(a * c)}이고, 상수항은 ${fmt(a * d + b)}와 ${fmt(c * b + d)}예요.`, a !== 0 ? `f는 a≠0이므로 y에서 ${fmt(b)}를 빼고 ${fmt(a)}로 나눠 입력을 되돌릴 수 있어요.` : 'f는 모든 입력을 같은 값으로 보내므로 역함수가 없어요.'],
      conditions: ['입력과 출력은 실수 전체로 정합니다.', '오른쪽 안의 함수부터 계산합니다.', 'f∘g와 g∘f가 모든 x에서 같으려면 ad+b=cb+d여야 합니다.', 'f와 g가 서로 역함수인지 보려면 두 합성이 모두 x인지 확인해야 합니다.'],
      warning: a === 0 || c === 0 ? '계수가 0인 함수는 상수함수예요. 이 함수만으로는 원래 입력을 복구할 수 없어요.' : null,
      plot: { type: 'cartesian', message: equal ? '두 합성의 결과가 모든 실수 x에서 같습니다. 두 그래프가 완전히 겹칩니다.' : '같은 x에서 두 출력의 높이를 비교하세요. 먼저 통과하는 함수에 따라 중간값과 출력이 달라집니다.', xRange: [-3, 3], yRange: [lo - pad, hi + pad], curves: [{ label: 'g → f: f(g(x))', color: '#245f93', points: xs.map(t => [t, f(g(t))]) }, { label: 'f → g: g(f(x))', color: '#7a1f2e', points: xs.map(t => [t, g(f(t))]) }], points: [{ label: `g→f: ${fmt(fg)}`, x, y: fg, color: '#245f93' }, { label: `f→g: ${fmt(gf)}`, x, y: gf, color: '#7a1f2e' }] },
      target: { prompt: 'f(g(x))에서 먼저 계산하는 함수는 무엇일까요?', expected: 'g' },
    };
  },
};
