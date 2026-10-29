const controls = [
  { id: 'ux', label: 'u의 x성분', min: -8, max: 8, step: 1, value: 1 },
  { id: 'uy', label: 'u의 y성분', min: -8, max: 8, step: 1, value: 2 },
  { id: 'vx', label: 'v의 x성분', min: -8, max: 8, step: 1, value: 3 },
  { id: 'vy', label: 'v의 y성분', min: -8, max: 8, step: 1, value: -1 }
];
const read = (v, k) => { const c = controls.find(q => q.id === k), n = Number(v?.[k] ?? c.value); return Number.isFinite(n) ? c.min + Math.round((Math.max(c.min, Math.min(c.max, n)) - c.min) / c.step) * c.step : c.value; };
const fmt = n => String(Math.abs(n) < 1e-12 ? 0 : Number(n.toFixed(6)));
const relation = n => Number(fmt(n)) === n ? '=' : '≈';

export default {
  id: 'M13', title: '벡터 두 개로 덧셈·내적·거리 비교하기', part: 4,
  lessonIds: ['AIM-P04-L01', 'AIM-P04-L02', 'AIM-P04-L03'],
  question: '길이가 0인 벡터와도 방향의 비슷함을 계산할 수 있을까요?',
  prerequisite: '2차원 벡터는 가로·세로 성분을 순서대로 묶은 값입니다.', controls,
  presets: [
    { id: 'default', label: '원고: u=(1,2), v=(3,-1)', values: { ux: 1, uy: 2, vx: 3, vy: -1 } },
    { id: 'same-direction', label: '같은 방향, 다른 길이', values: { ux: 3, uy: 4, vx: 6, vy: 8 } },
    { id: 'orthogonal', label: '직각: 내적 0', values: { ux: 3, uy: 0, vx: 0, vy: 4 } },
    { id: 'zero', label: '영벡터: 코사인 미정의', values: { ux: 0, uy: 0, vx: 3, vy: 4 } }
  ],
  explain: '덧셈은 성분끼리 더합니다. 내적은 대응 성분의 곱을 더한 수입니다. 코사인 유사도는 내적을 두 벡터의 길이로 나눕니다.',
  tryThis: '기본 예제의 내적을 예상하세요. 같은 방향 예제로 이동해 길이와 코사인을 비교하고 u를 영벡터로 바꾸세요.',
  compute(values = {}) {
    const ux = read(values, 'ux'), uy = read(values, 'uy'), vx = read(values, 'vx'), vy = read(values, 'vy');
    const sum = [ux + vx, uy + vy], dot = ux * vx + uy * vy;
    const normU = Math.hypot(ux, uy), normV = Math.hypot(vx, vy), distance = Math.hypot(ux - vx, uy - vy);
    const cosine = normU === 0 || normV === 0 ? null : Math.max(-1, Math.min(1, dot / (normU * normV)));
    const bound = Math.max(5, ...[ux, uy, vx, vy, ...sum].map(Math.abs)) + 1;
    return {
      formulaTex: "\\begin{gathered}\\mathbf u+\\mathbf v=(u_1+v_1,u_2+v_2)\\\\\\mathbf u\\cdot\\mathbf v=u_1v_1+u_2v_2\\\\\\|\\mathbf u\\|_2=\\sqrt{u_1^2+u_2^2}\\\\\\cos\\theta=\\frac{\\mathbf u\\cdot\\mathbf v}{\\|\\mathbf u\\|_2\\|\\mathbf v\\|_2}\\quad(\\mathbf u\\ne\\mathbf0,\\mathbf v\\ne\\mathbf0)\\end{gathered}",
      formulaText: `u=(${fmt(ux)},${fmt(uy)}), v=(${fmt(vx)},${fmt(vy)}); u·v=(${fmt(ux)})×(${fmt(vx)})+(${fmt(uy)})×(${fmt(vy)})=${fmt(dot)}`,
      calculationTex: `\\begin{gathered}\\mathbf u\\cdot\\mathbf v=(${fmt(ux)})(${fmt(vx)})+(${fmt(uy)})(${fmt(vy)})=${fmt(dot)}\\\\\\|\\mathbf u-\\mathbf v\\|_2=\\sqrt{(${fmt(ux - vx)})^2+(${fmt(uy - vy)})^2}\\approx${fmt(distance)}\\end{gathered}`,
      metrics: [{ label: 'u+v', value: `(${sum.map(fmt).join(', ')})` }, { label: '내적 u·v (스칼라)', value: fmt(dot) }, { label: 'u의 L2 노름', value: fmt(normU) }, { label: 'v의 L2 노름', value: fmt(normV) }, { label: '두 끝점 사이 거리 ||u−v||₂', value: fmt(distance) }, { label: '코사인 유사도', value: cosine === null ? '미정의: 영벡터 포함' : fmt(cosine) }],
      steps: [`성분별 덧셈: (${fmt(ux)}+${fmt(vx)}, ${fmt(uy)}+${fmt(vy)})=(${sum.map(fmt).join(', ')})`, `내적: ${fmt(ux * vx)}+${fmt(uy * vy)}=${fmt(dot)}`, `길이: ||u||₂=√(${fmt(ux * ux + uy * uy)})${relation(normU)}${fmt(normU)}, ||v||₂=√(${fmt(vx * vx + vy * vy)})${relation(normV)}${fmt(normV)}`, `거리: u−v=(${fmt(ux - vx)},${fmt(uy - vy)}), 길이${relation(distance)}${fmt(distance)}`, cosine === null ? '한 벡터의 길이가 0이라 방향이 정해지지 않습니다. 코사인 유사도를 계산하지 않습니다.' : `코사인 유사도 = ${fmt(dot)} ÷ (√${fmt(ux * ux + uy * uy)}×√${fmt(vx * vx + vy * vy)}) ${relation(cosine)} ${fmt(cosine)}`],
      conditions: ['덧셈과 내적은 성분 수가 같은 벡터끼리 계산합니다.', '여기서 노름과 거리는 유클리드(L2) 기준입니다.', '코사인 유사도는 두 벡터가 모두 영벡터가 아닐 때 정의되며 범위는 [−1,1]입니다.', '원점에서 해당 끝점까지의 변위를 벡터로 나타냈습니다. 초록 화살표는 u의 끝에서 v만큼 이동하는 덧셈 과정입니다.', '근호로 쓴 값은 정확한 식이며, 소수는 필요한 경우 소수 여섯 자리까지 반올림합니다.'],
      warning: cosine === null ? '0으로 나눌 수 없으므로 영벡터를 포함한 코사인 유사도는 미정의입니다.' : null,
      plot: { type: 'cartesian', aspect: 'equal', xRange: [-bound, bound], yRange: [-bound, bound], curves: [{ label: 'u', color: '#2563eb', arrow: true, points: [[0, 0], [ux, uy]] }, { label: 'v', color: '#ea580c', arrow: true, points: [[0, 0], [vx, vy]] }, { label: 'u 끝에서 v만큼', color: '#16a34a', arrow: true, points: [[ux, uy], sum] }, { label: 'u+v', color: '#7c3aed', arrow: true, points: [[0, 0], sum] }], points: [{ label: 'u', x: ux, y: uy, color: '#2563eb' }, { label: 'v', x: vx, y: vy, color: '#ea580c' }, { label: 'u+v', x: sum[0], y: sum[1], color: '#7c3aed' }] },
      data: { u: [ux, uy], v: [vx, vy], sum, dot, normU, normV, distance, cosine },
      target: { prompt: 'u=(3,4), v=(6,8)이면 노름과 코사인은?', expected: '노름은 5와 10, 코사인 유사도는 1입니다.' }
    };
  }
};
