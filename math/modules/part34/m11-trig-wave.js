const controls = [
  { id: 'A', label: '진폭 계수 A', min: -3, max: 3, step: 0.5, value: 2 },
  { id: 'B', label: '각주파수 계수 B', min: -3, max: 3, step: 0.5, value: 1 },
  { id: 'C', label: '위상 C (라디안)', min: -Math.PI, max: Math.PI, step: Math.PI / 4, value: 0 },
  { id: 'D', label: '세로 이동 D', min: -3, max: 3, step: 0.5, value: 0 }
];
const read = (v, k) => { const c = controls.find(q => q.id === k), n = Number(v?.[k] ?? c.value); return Number.isFinite(n) ? c.min + Math.round((Math.max(c.min, Math.min(c.max, n)) - c.min) / c.step) * c.step : c.value; };
const fmt = n => String(Math.abs(n) < 1e-12 ? 0 : Number(n.toFixed(6)));
const relation = n => Number(fmt(n)) === n ? '=' : '≈';
const texRelation = n => Number(fmt(n)) === n ? '=' : '\\approx';

export default {
  id: 'M11', title: '사인파의 높이·간격·이동 바꾸기', part: 3,
  lessonIds: ['AIM-P03-L05'],
  question: 'A를 0으로 바꾸면 “한 번 반복되는 가장 짧은 간격”을 찾을 수 있을까요?',
  prerequisite: 'sin x는 -1과 1 사이를 반복하며 x는 라디안입니다.', controls,
  presets: [
    { id: 'default', label: '기본: 2 sin x', values: { A: 2, B: 1, C: 0, D: 0 } },
    { id: 'double-frequency', label: 'B=2: 주기는 절반', values: { A: 2, B: 2, C: 0, D: 0 } },
    { id: 'zero-amplitude', label: 'A=0: 상수함수', values: { A: 0, B: 1, C: 0, D: 1 } },
    { id: 'zero-frequency', label: 'B=0: 상수함수', values: { A: 2, B: 0, C: Math.PI / 2, D: 1 } },
    { id: 'negative', label: 'A<0, B<0 비교', values: { A: -2, B: -1, C: 0, D: 0 } }
  ],
  explain: 'A는 파형의 세로 크기와 뒤집힘, B는 반복 간격과 가로 방향, C는 위상, D는 중심선의 높이를 바꿉니다.',
  tryThis: 'B를 두 배로 하면 주기가 어떻게 될지 예상하세요. 바꾼 뒤 수치와 그래프를 확인하고 A=0, B=0 예외를 비교하세요.',
  compute(values = {}) {
    const A = read(values, 'A'), B = read(values, 'B'), C = read(values, 'C'), D = read(values, 'D');
    const constant = A === 0 || B === 0, period = constant ? null : 2 * Math.PI / Math.abs(B);
    const amplitude = constant ? 0 : Math.abs(A), center = constant ? A * Math.sin(C) + D : D;
    const f = x => A * Math.sin(B * x + C) + D;
    const points = Array.from({ length: 401 }, (_, i) => { const x = -2 * Math.PI + 4 * Math.PI * i / 400; return [x, f(x)]; });
    const halfPiValue = f(Math.PI / 2), bound = Math.max(4, Math.abs(D) + Math.abs(A) + 1);
    return {
      formulaTex: "\\begin{gathered}f(x)=A\\sin(Bx+C)+D\\\\AB\\ne0\\Rightarrow\\left(\\mathrm{amplitude}=|A|,\\;T_{\\min}=\\frac{2\\pi}{|B|}\\right)\\end{gathered}",
      formulaText: `f(x)=(${fmt(A)}) sin((${fmt(B)})x+(${fmt(C / Math.PI)})π)+(${fmt(D)}); f(π/2)${relation(halfPiValue)}${fmt(halfPiValue)}`,
      calculationTex: `\\begin{gathered}f(\\pi/2)=(${fmt(A)})\\sin\\left((${fmt(B)})\\frac{\\pi}{2}+(${fmt(C / Math.PI)})\\pi\\right)+(${fmt(D)})\\\\${texRelation(halfPiValue)}${fmt(halfPiValue)}\\end{gathered}`,
      metrics: [{ label: '함수 종류', value: constant ? '상수함수' : '사인파' }, { label: '실제 그래프 진폭 (최대−최소)/2', value: fmt(amplitude) }, { label: '계수의 절댓값 |A|', value: fmt(Math.abs(A)) }, { label: '최소 양의 주기', value: period === null ? '없음: 모든 양수가 주기' : `${fmt(period)} rad` }, { label: '중심선의 높이', value: fmt(center) }, { label: 'f(π/2)', value: fmt(halfPiValue) }],
      steps: [`x=π/2일 때 내부 각도 Bx+C = (${fmt(B / 2 + C / Math.PI)})π rad ≈ ${fmt(B * Math.PI / 2 + C)} rad`, `사인값에 A를 곱하고 D를 더합니다. f(π/2)${relation(halfPiValue)}${fmt(halfPiValue)}`, constant ? `입력 x와 무관한 상수함수이며 출력의 소수 표시는 ${fmt(center)}입니다. 실제 진폭은 0입니다.` : `A≠0, B≠0이므로 진폭은 |${fmt(A)}|=${fmt(amplitude)}, 최소 양의 주기는 2π/|${fmt(B)}|≈${fmt(period)}`, constant ? '상수함수는 모든 양의 이동량이 주기라 가장 작은 양의 주기가 없습니다.' : `D=${fmt(D)}가 중심선입니다. C는 위상을 바꾸고 최소 주기는 바꾸지 않습니다.`],
      conditions: ['x와 C는 라디안입니다. C는 π/4 간격으로 고릅니다.', 'A와 B가 모두 0이 아닐 때 진폭 |A|, 최소 양의 주기 2π/|B|를 적용합니다.', 'A=0 또는 B=0이면 상수함수입니다. 이때 실제 진폭은 0이며 최소 양의 주기가 없습니다.', '표시 그래프는 x∈[−2π, 2π]입니다.', '사인값·주기 등의 소수 표시는 소수 여섯 자리까지 반올림한 근삿값일 수 있습니다.'],
      warning: constant ? '상수함수에서는 |A|를 그래프 진폭이라고 해석하거나 2π/|B|를 최소 주기라고 쓰지 않습니다.' : null,
      plot: { type: 'cartesian', xRange: [-2 * Math.PI, 2 * Math.PI], yRange: [-bound, bound], curves: [{ label: 'f(x)', color: '#2563eb', points }, { label: '중심선', color: '#94a3b8', points: [[-2 * Math.PI, center], [2 * Math.PI, center]] }], points: [{ label: 'x=π/2', x: Math.PI / 2, y: halfPiValue, color: '#ea580c' }] },
      data: { A, B, C, D, amplitude, center, period, halfPiValue, constant },
      target: { prompt: '기본 예제에서 B만 2로 바꾸면 최소 주기는?', expected: '2π에서 π로 줄어듭니다.' }
    };
  }
};
