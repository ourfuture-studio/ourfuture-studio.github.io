const controls = [{ id: 'degrees', label: '각도 θ (도)', min: -360, max: 360, step: 15, value: 30 }];
const read = v => { const n = Number(v?.degrees ?? 30); return Number.isFinite(n) ? -360 + Math.round((Math.max(-360, Math.min(360, n)) + 360) / 15) * 15 : 30; };
const clean = n => Math.abs(n) < 1e-12 ? 0 : n;
const fmt = n => String(Number(clean(n).toFixed(6)));
const relation = n => Number(fmt(n)) === n ? '=' : '≈';

export default {
  id: 'M10', title: '단위원에서 각도·라디안·삼각비 연결하기', part: 3,
  lessonIds: ['AIM-P03-L04', 'AIM-P03-L05'],
  question: '90°에서는 sin과 cos를 읽을 수 있는데 tan은 왜 정해지지 않을까요?',
  prerequisite: '반지름이 1인 원에서 오른쪽 방향이 0°, 반시계 방향이 양의 각도입니다.', controls,
  presets: [
    { id: 'default', label: 'sin 30° = 1/2', values: { degrees: 30 } },
    { id: 'quarter', label: '90°: tan 미정의', values: { degrees: 90 } },
    { id: 'third', label: '180°: 음의 x축', values: { degrees: 180 } },
    { id: 'negative', label: '-45°: 시계 방향', values: { degrees: -45 } }
  ],
  explain: '단위원의 점 좌표는 (cos θ, sin θ)입니다. 라디안은 같은 각도를 반지름으로 나눈 호의 길이로 나타낸 단위입니다.',
  tryThis: '30°에서 점의 높이를 예상하세요. 60°, 90°로 옮기며 좌표를 비교하고, 90°에서는 tan의 분모를 확인하세요.',
  compute(values = {}) {
    const degrees = read(values), radians = degrees * Math.PI / 180;
    const cosine = clean(Math.cos(radians)), sine = clean(Math.sin(radians));
    const undefinedTan = Math.abs(cosine) < 1e-12;
    const tangent = undefinedTan ? null : sine / cosine;
    const circle = Array.from({ length: 181 }, (_, i) => [Math.cos(2 * Math.PI * i / 180), Math.sin(2 * Math.PI * i / 180)]);
    return {
      formulaTex: "\\begin{gathered}\\theta_{\\mathrm{rad}}=\\theta_{\\mathrm{deg}}\\frac{\\pi}{180}\\\\(x,y)=(\\cos\\theta,\\sin\\theta)\\\\\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}\\quad(\\cos\\theta\\ne0)\\end{gathered}",
      formulaText: `θ=${fmt(degrees)}°=(${fmt(degrees)}/180)π rad≈${fmt(radians)} rad; 점≈(${fmt(cosine)}, ${fmt(sine)}); tan θ${tangent === null ? '는 미정의' : `${relation(tangent)}${fmt(tangent)}`}`,
      calculationTex: `\\begin{gathered}\\theta=${fmt(degrees)}^\\circ=\\frac{${fmt(degrees)}}{180}\\pi\\;\\mathrm{rad}\\\\(\\cos\\theta,\\sin\\theta)\\approx(${fmt(cosine)},${fmt(sine)})\\end{gathered}`,
      metrics: [{ label: '도', value: `${fmt(degrees)}°` }, { label: '라디안', value: `${fmt(degrees / 180)}π ≈ ${fmt(radians)}` }, { label: 'cos θ = 가로 좌표', value: fmt(cosine) }, { label: 'sin θ = 세로 좌표', value: fmt(sine) }, { label: 'tan θ', value: tangent === null ? '미정의: cos θ=0' : fmt(tangent) }],
      steps: [`${fmt(degrees)}×π÷180 ${relation(radians)} ${fmt(radians)} rad`, `가로 좌표는 cos θ${relation(cosine)}${fmt(cosine)}, 세로 좌표는 sin θ${relation(sine)}${fmt(sine)}`, undefinedTan ? 'tan θ의 분모 cos θ가 0이므로 나눗셈을 하지 않습니다.' : `tan θ = sin θ ÷ cos θ ${relation(tangent)} ${fmt(tangent)}. 계산에는 반올림 전 값을 사용합니다.`],
      conditions: ['삼각함수의 계산에는 라디안을 사용합니다.', 'tan θ는 θ=π/2+kπ (정수 k)에서 정의되지 않습니다.', '음의 각도는 시계 방향입니다. 한 바퀴(360°=2π)를 더하면 단위원의 같은 점에 도착합니다.', '부동소수점 계산에서 절댓값이 10⁻¹² 미만인 sin·cos 잔여값은 0으로 표시합니다.'],
      warning: undefinedTan ? '이 각도에서 tan은 매우 큰 수가 아니라 미정의입니다.' : null,
      plot: { type: 'cartesian', aspect: 'equal', xRange: [-1.4, 1.4], yRange: [-1.4, 1.4], curves: [{ label: '단위원 (반지름 1)', color: '#94a3b8', points: circle }, { label: '반지름', color: '#2563eb', points: [[0, 0], [cosine, sine]] }, { label: 'cos θ', color: '#16a34a', points: [[0, 0], [cosine, 0]] }, { label: 'sin θ', color: '#ea580c', points: [[cosine, 0], [cosine, sine]] }], points: [{ label: '(cos θ, sin θ)', x: cosine, y: sine, color: '#7c3aed' }] },
      data: { degrees, radians, cosine, sine, tangent },
      target: { prompt: 'θ=90°에서 점의 좌표와 tan θ는?', expected: '(0, 1), tan θ는 미정의' }
    };
  }
};
