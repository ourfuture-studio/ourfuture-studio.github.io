const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();

export default {
  id: 'M03', title: '입력을 제한하면 제곱을 되돌릴 수 있을까?', part: 1,
  lessonIds: ['AIM-P01-L03', 'AIM-P01-L04', 'AIM-P01-L05', 'AIM-P01-L08'],
  question: 'x²에서 서로 다른 두 입력이 같은 출력을 만들까요? 입력을 0 이상으로 제한하면 어떨까요?',
  prerequisite: '좌표 (x,y)는 입력 x와 출력 y를 함께 적는 표시예요.',
  controls: [
    { id: 'mode', label: '정의역 선택 (0: 양수·음수 / 1: 0 이상)', min: 0, max: 1, step: 1, value: 0 },
    { id: 'limit', label: '정의역의 경계값 L', min: 1, max: 4, step: 0.5, value: 3 },
    { id: 'x', label: '살펴볼 입력 x (정의역 밖이면 경계로 조정)', min: -4, max: 4, step: 0.25, value: 2 },
  ],
  presets: [
    { id: 'basic', label: '기본: −2와 2 비교', values: { mode: 0, limit: 3, x: 2 } },
    { id: 'restricted', label: '정의역 제한: 0 이상', values: { mode: 1, limit: 3, x: 2 } },
    { id: 'zero', label: '경계: 입력 0', values: { mode: 1, limit: 3, x: 0 } },
    { id: 'outside', label: '경계: 정의역 밖 입력', values: { mode: 1, limit: 2, x: -2 } },
  ],
  explain: ['정의역은 넣기로 정한 입력 전체, 치역은 그 입력으로 실제 나오는 출력 전체예요.', '이 예시의 공역은 0 이상의 실수로 정합니다. 치역 [0,L²]는 공역의 일부입니다.', '두 입력의 출력이 같으면 두 입력도 같아야 일대일이에요.'],
  tryThis: ['−2와 2를 넣으면 출력이 각각 얼마인지 예상하세요.', '정의역 선택을 1로 바꾸고 음수 입력이 남는지 확인하세요.', '치역을 공역으로 삼으면 0 이상 구간의 제곱함수는 역함수를 가질 수 있어요.'],
  compute(values = {}) {
    const mode = Math.round(pick(values.mode, 0, 0, 1));
    const limit = pick(values.limit, 3, 1, 4);
    const requested = pick(values.x, 2, -4, 4);
    const minX = mode === 1 ? 0 : -limit;
    const x = Math.max(minX, Math.min(limit, requested));
    const adjusted = requested !== x;
    const y = x * x;
    const xs = Array.from({ length: 81 }, (_, i) => minX + (limit - minX) * i / 80);
    const other = mode === 0 && x !== 0;
    return {
      formulaTex: String.raw`\begin{gathered}f(x)=x^2\\D=[-L,L]\ \text{or}\ [0,L]\\f(D)=[0,L^2]\end{gathered}`,
      calculationTex: String.raw`\begin{gathered}D=[${fmt(minX)},${fmt(limit)}]\\f(${fmt(x)})=(${fmt(x)})^2=${fmt(y)}\\f(D)=[0,${fmt(limit * limit)}]\end{gathered}`,
      prediction: { prompt: `정의역 안에서 실제 사용하는 입력 ${fmt(x)}의 출력을 예상하세요.`, answer: y, tolerance: 0.000001 },
      formulaText: `정의역 D=[${fmt(minX)}, ${fmt(limit)}], 치역=[0, ${fmt(limit * limit)}]; f(${fmt(x)}) = (${fmt(x)})² = ${fmt(y)}`,
      metrics: [{ label: '실제 사용한 입력 x', value: x }, { label: '출력 x²', value: y }, { label: '치역', value: `[0, ${fmt(limit * limit)}]` }, { label: '정의역 전체에서 일대일?', value: mode === 1 ? '예' : '아니요' }],
      steps: [`정의역을 [${fmt(minX)}, ${fmt(limit)}]로 정했어요.`, adjusted ? `요청한 ${fmt(requested)}는 정의역 밖이므로 가장 가까운 경계 ${fmt(x)}를 사용했어요.` : `${fmt(x)}는 정한 정의역 안에 있어요.`, `${fmt(x)}를 제곱하면 ${fmt(y)}예요.`, mode === 1 ? '이 정의역에서는 입력이 커질수록 출력이 커져 같은 출력을 만드는 서로 다른 입력이 없어요.' : other ? `${fmt(-x)}도 제곱하면 ${fmt(y)}이므로 서로 다른 두 입력이 같은 출력을 만들어요.` : '지금 선택한 0은 짝이 없지만, 정의역 안의 −1과 1은 같은 출력 1을 만들므로 함수 전체는 일대일이 아니에요.', '역함수를 만들려면 일대일인 정의역으로 제한하고, 공역도 치역 [0,L²]로 맞춰야 해요.'],
      conditions: ['L>0입니다.', '이 체험의 공역은 [0,∞)로 정하고, 치역은 [0,L²]로 계산합니다.', '정의역 밖 입력은 계산에 쓰지 않고 가까운 경계로 조정해 표시합니다.', '한 점에서 입력이 하나처럼 보이는 것과 함수 전체가 일대일인 것은 다릅니다.'],
      warning: adjusted ? `입력 ${fmt(requested)}는 정의역 밖입니다. 계산과 표시에는 ${fmt(x)}를 사용합니다.` : null,
      plot: { type: 'cartesian', xRange: [-limit - 0.5, limit + 0.5], yRange: [-0.5, limit * limit + 1], curves: [{ label: '정의역 안의 y=x²', color: '#245f93', points: xs.map(t => [t, t * t]) }], points: [{ label: `입력 ${fmt(x)}`, x, y, color: '#7a1f2e' }, ...(other ? [{ label: `다른 입력 ${fmt(-x)}, 같은 출력`, x: -x, y, color: '#19735b' }] : [])] },
      target: { prompt: 'D=[−L,L]인 함수는 x=0을 선택해도 일대일일까요?', expected: '아니요. 함수 전체의 서로 다른 입력을 확인해야 합니다.' },
    };
  },
};
