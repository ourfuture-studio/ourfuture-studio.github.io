const controls = [
  { id: 'a', label: '이차항 계수 a', min: -4, max: 4, step: 0.5, value: 2 },
  { id: 'b', label: '일차항 계수 b', min: -4, max: 4, step: 0.5, value: 3 },
  { id: 'c', label: '상수항 c', min: -4, max: 4, step: 0.5, value: 1 },
  { id: 'x', label: '대입할 입력 x', min: -4, max: 4, step: 0.5, value: 2 }
];
const read = (v, k) => { const c = controls.find(q => q.id === k); const n = Number(v?.[k] ?? c.value); return Number.isFinite(n) ? c.min + Math.round((Math.max(c.min, Math.min(c.max, n)) - c.min) / c.step) * c.step : c.value; };
const fmt = n => String(Math.abs(n) < 1e-12 ? 0 : Number(n.toFixed(6)));
const relation = n => Number(fmt(n)) === n ? '=' : '≈';

export default {
  id: 'M09', title: '계수를 움직여 이차함수와 꼭짓점 보기', part: 3,
  lessonIds: ['AIM-P03-L01', 'AIM-P03-L02', 'AIM-P03-L03'],
  question: 'a를 0으로 바꾸면 꼭짓점 공식도 그대로 사용할 수 있을까요?',
  prerequisite: '함수는 입력 x를 계산 규칙에 넣어 출력 f(x)를 얻는 약속입니다.', controls,
  presets: [
    { id: 'default', label: '원고 예제: 2x²+3x+1', values: { a: 2, b: 3, c: 1, x: 2 } },
    { id: 'vertex', label: '꼭짓점이 (1, 0)', values: { a: 1, b: -2, c: 1, x: 3 } },
    { id: 'linear', label: 'a=0: 일차함수', values: { a: 0, b: 2, c: 1, x: 2 } },
    { id: 'constant', label: 'a=b=0: 상수함수', values: { a: 0, b: 0, c: 3, x: 2 } }
  ],
  explain: '그래프 위의 점은 지금 선택한 입력과 출력입니다. 꼭짓점은 이차함수일 때만 따로 표시합니다.',
  tryThis: '출력을 먼저 예상한 뒤 x를 바꾸세요. 다음에는 a를 0으로 바꾸고 함수 종류와 꼭짓점 표시를 비교하세요.',
  compute(values = {}) {
    const a = read(values, 'a'), b = read(values, 'b'), c = read(values, 'c'), x = read(values, 'x');
    const f = t => a * t * t + b * t + c;
    const y = f(x), quadratic = a !== 0;
    const vertex = quadratic ? [-b / (2 * a), c - b * b / (4 * a)] : null;
    const extent = Math.max(5, vertex ? Math.abs(vertex[0]) + 1 : 0);
    const points = Array.from({ length: 161 }, (_, i) => { const t = -extent + 2 * extent * i / 160; return [t, f(t)]; });
    const ys = [...points.map(p => p[1]), y, 0];
    const ymin = Math.min(...ys), ymax = Math.max(...ys), pad = Math.max(1, (ymax - ymin) * 0.08);
    const kind = quadratic ? '이차함수' : b !== 0 ? '일차함수' : '상수함수';
    return {
      formulaTex: "\\begin{gathered}f(x)=ax^2+bx+c\\\\a\\ne0\\Rightarrow V=\\left(-\\frac{b}{2a},c-\\frac{b^2}{4a}\\right)\\end{gathered}",
      formulaText: `f(${fmt(x)}) = (${fmt(a)})×(${fmt(x)})² + (${fmt(b)})×(${fmt(x)}) + (${fmt(c)}) = ${fmt(y)}`,
      calculationTex: `\\begin{gathered}f(${fmt(x)})=(${fmt(a)})(${fmt(x)})^2+(${fmt(b)})(${fmt(x)})+(${fmt(c)})\\\\=${fmt(y)}\\end{gathered}`,
      metrics: [{ label: '함수 종류', value: kind }, { label: '입력 x', value: fmt(x) }, { label: '출력 f(x)', value: fmt(y) }, { label: '꼭짓점', value: vertex ? `(${fmt(vertex[0])}, ${fmt(vertex[1])})` : '이차함수의 꼭짓점 공식 적용 대상 아님' }],
      steps: [`제곱: (${fmt(x)})² = ${fmt(x * x)}`, `각 항: ${fmt(a * x * x)}, ${fmt(b * x)}, ${fmt(c)}`, `세 항을 더하면 ${fmt(y)}`, quadratic ? `a가 0이 아니므로 꼭짓점 x좌표 = -(${fmt(b)}) ÷ (2×${fmt(a)}) ${relation(vertex[0])} ${fmt(vertex[0])}` : 'a=0이므로 이차항이 사라집니다. 2a로 나누지 않습니다.'],
      conditions: ['계수와 입력은 실수입니다.', 'a≠0일 때만 이차함수이며 꼭짓점 공식을 사용합니다.', 'a=0, b≠0이면 일차함수입니다. a=b=0이면 모든 입력의 출력이 c입니다.', '화면에 보이는 범위는 전체 실수 정의역의 일부입니다.', '꼭짓점 좌표가 반복소수인 경우 소수 여섯 자리까지 반올림합니다.'],
      warning: quadratic ? null : 'a=0: 꼭짓점 공식의 분모가 0이 됩니다. 함수 자체는 계산할 수 있습니다.',
      plot: { type: 'cartesian', xRange: [-extent, extent], yRange: [ymin - pad, ymax + pad], curves: [{ label: 'f(x)', color: '#2563eb', points }], points: [{ label: `입력점 (${fmt(x)}, ${fmt(y)})`, x, y, color: '#ea580c' }, ...(vertex ? [{ label: '꼭짓점', x: vertex[0], y: vertex[1], color: '#7c3aed' }] : [])] },
      data: { a, b, c, x, y, kind, vertex },
      target: { prompt: '기본 예제에서 x=2를 넣으면 얼마인가요?', expected: '2×4+3×2+1=15' }
    };
  }
};
