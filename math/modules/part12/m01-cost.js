const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();

export default {
  id: 'M01', title: '몇 개를 사면 얼마일까? 변수와 매개변수', part: 1,
  lessonIds: ['AIM-P01-L01', 'AIM-P01-L03', 'AIM-P01-L05', 'AIM-P01-L06'],
  question: '개수 n만 바꿀 때와 단가 a를 바꿀 때, 점과 직선은 각각 어떻게 달라질까요?',
  prerequisite: '곱셈과 덧셈을 할 수 있으면 시작할 수 있어요.',
  controls: [
    { id: 'n', label: '개수 n (개)', min: 0, max: 10, step: 1, value: 3 },
    { id: 'a', label: '단가 a (원/개)', min: 0, max: 3000, step: 100, value: 1000 },
    { id: 'b', label: '기본 비용 b (원)', min: 0, max: 5000, step: 500, value: 2000 },
  ],
  presets: [
    { id: 'basic', label: '기본: 3개 구매', values: { n: 3, a: 1000, b: 2000 } },
    { id: 'zero', label: '경계: 0개 구매', values: { n: 0, a: 1000, b: 2000 } },
    { id: 'fixed', label: '비교: 단가가 0원', values: { n: 5, a: 0, b: 2000 } },
  ],
  explain: ['한 번 정한 가격표에서는 a와 b를 고정하고, 입력 n을 바꿉니다.', '가격표 자체를 바꾸는 a와 b는 매개변수입니다. 고정 여부는 문제에서 맡은 역할로 구분합니다.'],
  tryThis: ['먼저 4개를 살 때의 비용을 예상하세요.', 'n을 3에서 4로 바꾸고, 비용 증가량이 a와 같은지 확인하세요.', 'n=0과 a=0을 차례로 확인하세요.'],
  compute(values = {}) {
    const n = Math.round(pick(values.n, 3, 0, 10));
    const a = pick(values.a, 1000, 0, 3000);
    const b = pick(values.b, 2000, 0, 5000);
    const cost = a * n + b;
    const points = Array.from({ length: 11 }, (_, i) => [i, a * i + b]);
    return {
      formulaTex: 'C(n)=an+b',
      calculationTex: String.raw`C(${n})=${fmt(a)}\cdot ${n}+${fmt(b)}=${fmt(cost)}`,
      prediction: { prompt: '선택한 개수의 총비용을 계산해 보세요.', answer: cost, tolerance: 0.000001, unit: '원' },
      formulaText: `C(${n}) = ${fmt(a)} × ${n} + ${fmt(b)} = ${fmt(cost)}원`,
      metrics: [{ label: '선택한 개수 n', value: n }, { label: '총비용 (원)', value: cost }, { label: '1개 늘릴 때 증가 (원)', value: a }],
      steps: [`입력 n=${n}을 넣어요.`, `개수에 따른 비용: ${fmt(a)} × ${n} = ${fmt(a * n)}원`, `기본 비용 ${fmt(b)}원을 더하면 ${fmt(cost)}원이에요.`, 'n만 바꾸면 같은 가격표의 점이 움직이고, a 또는 b를 바꾸면 가격표 전체가 바뀌어요.'],
      conditions: ['n은 0 이상의 정수이며 이 체험에서는 0~10개입니다.', 'a와 b는 0 이상인 예시 비용입니다.', '실제 입력은 정수 개수이므로 그래프는 각 정수 입력의 점만 표시합니다. 점 사이의 입력은 이 구매 예시에서 허용하지 않습니다.'],
      warning: null,
      plot: { type: 'cartesian', message: '정수 개수마다 점 하나를 표시합니다. 점 사이는 입력으로 허용하지 않습니다.', xRange: [0, 10], yRange: [0, Math.max(1000, a * 10 + b) * 1.1], curves: [{ label: '가격표 C(n) (정수 입력의 점)', color: '#245f93', connect: false, markers: true, points }], points: [{ label: `선택: ${n}개, ${fmt(cost)}원`, x: n, y: cost, color: '#7a1f2e' }] },
      target: { prompt: 'n을 1 늘리면 총비용은 얼마나 늘까요?', expected: `${fmt(a)}원` },
    };
  },
};
