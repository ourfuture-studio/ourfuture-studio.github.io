const controls = [
  { id: 'a', label: '첫 식의 x 계수 a', min: -4, max: 4, step: 1, value: 1 },
  { id: 'b', label: '첫 식의 y 계수 b', min: -4, max: 4, step: 1, value: 1 },
  { id: 'r', label: '첫 식의 우변 r', min: -8, max: 8, step: 1, value: 5 },
  { id: 'c', label: '둘째 식의 x 계수 c', min: -4, max: 4, step: 1, value: 1 },
  { id: 'd', label: '둘째 식의 y 계수 d', min: -4, max: 4, step: 1, value: -1 },
  { id: 's', label: '둘째 식의 우변 s', min: -8, max: 8, step: 1, value: 1 }
];
const read = (v, k) => { const q = controls.find(t => t.id === k), n = Number(v?.[k] ?? q.value); return Number.isFinite(n) ? Math.round(Math.max(q.min, Math.min(q.max, n))) : q.value; };
const fmt = n => String(Math.abs(n) < 1e-12 ? 0 : Number(n.toFixed(6)));
const relation = n => Number(fmt(n)) === n ? '=' : '≈';
function clippedLine(a, b, rhs, bound) {
  if (a === 0 && b === 0) return [];
  const candidates = [];
  if (b !== 0) for (const x of [-bound, bound]) { const y = (rhs - a * x) / b; if (Math.abs(y) <= bound + 1e-10) candidates.push([x, y]); }
  if (a !== 0) for (const y of [-bound, bound]) { const x = (rhs - b * y) / a; if (Math.abs(x) <= bound + 1e-10) candidates.push([x, y]); }
  const unique = candidates.filter((p, i) => candidates.findIndex(q => Math.abs(p[0] - q[0]) < 1e-10 && Math.abs(p[1] - q[1]) < 1e-10) === i);
  return unique.slice(0, 2);
}

export default {
  id: 'M15', title: '두 방정식의 해를 교점과 랭크로 확인하기', part: 4,
  lessonIds: ['AIM-P04-L05', 'AIM-P04-L06'],
  question: 'det A=0이면 해가 무조건 없을까요?',
  prerequisite: '두 식을 모두 만족하는 (x,y)가 연립방정식의 해입니다. 각 식의 계수가 모두 0이 아니면 직선으로 그릴 수 있습니다.', controls,
  presets: [
    { id: 'default', label: '유일한 해: (3,2)', values: { a: 1, b: 1, r: 5, c: 1, d: -1, s: 1 } },
    { id: 'infinite', label: '같은 직선: 무한히 많은 해', values: { a: 1, b: 1, r: 2, c: 2, d: 2, s: 4 } },
    { id: 'none', label: '평행한 다른 직선: 해 없음', values: { a: 1, b: 1, r: 2, c: 2, d: 2, s: 5 } },
    { id: 'identity-row', label: '0=0: 첫 식은 항상 참', values: { a: 0, b: 0, r: 0, c: 1, d: 1, s: 2 } },
    { id: 'contradiction-row', label: '0=1: 모순', values: { a: 0, b: 0, r: 1, c: 1, d: 1, s: 2 } },
    { id: 'whole-plane', label: '둘 다 0=0: 모든 점이 해', values: { a: 0, b: 0, r: 0, c: 0, d: 0, s: 0 } }
  ],
  explain: 'det A가 0이 아니면 두 직선은 한 점에서 만납니다. det A=0일 때는 우변까지 비교해야 같은 직선인지, 모순인지 구별할 수 있습니다.',
  tryThis: '기본 해를 두 식에 직접 넣어 확인하세요. 둘째 식의 우변을 움직여 같은 직선과 평행한 직선을 비교하세요. 0=0과 0=1도 확인하세요.',
  compute(values = {}) {
    const a = read(values, 'a'), b = read(values, 'b'), r = read(values, 'r'), c = read(values, 'c'), d = read(values, 'd'), s = read(values, 's');
    const determinant = a * d - b * c;
    const rankA = determinant !== 0 ? 2 : [a, b, c, d].some(t => t !== 0) ? 1 : 0;
    const rankAugmented = [determinant, a * s - r * c, b * s - r * d].some(t => t !== 0) ? 2 : [a, b, r, c, d, s].some(t => t !== 0) ? 1 : 0;
    const kind = rankAugmented > rankA ? 'none' : rankA === 2 ? 'unique' : 'infinite';
    const solution = kind === 'unique' ? [(r * d - b * s) / determinant, (a * s - r * c) / determinant] : null;
    let particular = null;
    if (kind === 'infinite') particular = b !== 0 ? [0, r / b] : a !== 0 ? [r / a, 0] : d !== 0 ? [0, s / d] : c !== 0 ? [s / c, 0] : [0, 0];
    const markedPoint = solution ?? particular;
    const bound = Math.max(6, markedPoint ? Math.max(...markedPoint.map(Math.abs)) + 1 : 0, Math.abs(r) + 1, Math.abs(s) + 1);
    const line1 = clippedLine(a, b, r, bound), line2 = clippedLine(c, d, s, bound);
    const residuals = markedPoint ? [a * markedPoint[0] + b * markedPoint[1] - r, c * markedPoint[0] + d * markedPoint[1] - s] : null;
    const kindText = { unique: '유일한 해', infinite: '무한히 많은 해', none: '해 없음' }[kind];
    const rowInfo = (p, q, rhs, n) => p === 0 && q === 0 ? `${n}번째 식은 0=${rhs}: ${rhs === 0 ? '항상 참이며 직선 하나를 제한하지 않습니다.' : '모순입니다.'}` : `${n}번째 식 ${p}x+(${q})y=${rhs}는 직선입니다.`;
    return {
      formulaTex: "\\begin{gathered}\\begin{cases}ax+by=r\\\\cx+dy=s\\end{cases},\\qquad\\det A=ad-bc\\\\\\det A\\ne0\\Rightarrow(x,y)=\\left(\\frac{rd-bs}{ad-bc},\\frac{as-rc}{ad-bc}\\right)\\end{gathered}",
      formulaText: `${a}x+(${b})y=${r}; ${c}x+(${d})y=${s}; det A=${determinant}; ${kindText}${solution ? ` (${solution.map(fmt).join(',')})` : ''}`,
      calculationTex: `\\begin{gathered}\\begin{cases}(${a})x+(${b})y=${r}\\\\(${c})x+(${d})y=${s}\\end{cases}\\\\\\det A=(${a})(${d})-(${b})(${c})=${determinant}\\end{gathered}`,
      metrics: [{ label: '판정', value: kindText }, { label: 'det A', value: determinant }, { label: '계수행렬 랭크', value: rankA }, { label: '확대행렬 랭크', value: rankAugmented }, { label: kind === 'unique' ? '해 (x,y)' : '표시한 해의 예', value: markedPoint ? `(${markedPoint.map(fmt).join(', ')})` : '없음' }, { label: '역행렬', value: determinant !== 0 ? '존재함' : '없음' }],
      steps: [rowInfo(a, b, r, 1), rowInfo(c, d, s, 2), `det A=${a}×${d}−${b}×${c}=${determinant}`, determinant !== 0 ? `분모가 0이 아니므로 x=(${r * d - b * s})/(${determinant}) ${relation(solution[0])} ${fmt(solution[0])}, y=(${a * s - r * c})/(${determinant}) ${relation(solution[1])} ${fmt(solution[1])}입니다.` : `rank(A)=${rankA}, rank([A|b])=${rankAugmented}. ${kind === 'none' ? '랭크가 달라 모순입니다.' : `랭크가 같고 미지수 수 2보다 작아 자유변수가 ${2 - rankA}개입니다.`}`, markedPoint ? `반올림 전 해를 원래 두 식에 대입한 잔차의 소수 표시는 (${residuals.map(fmt).join(', ')})입니다.` : '동시에 만족하는 점이 없어 해 점을 표시하지 않습니다.'],
      conditions: ['이 체험의 계수와 우변은 정수입니다. 입력값은 정수로 맞춥니다.', 'det A≠0일 때만 역행렬과 위의 분수 공식을 사용합니다.', 'det A=0만으로 해 없음과 무한히 많은 해를 구별할 수 없습니다.', 'rank(A)<rank([A|b])이면 해가 없고, 같은 랭크가 2보다 작으면 해가 무한히 많습니다.', '계수가 모두 0인 식은 직선이 아닙니다. 0=0은 모든 점에서 참, 0=상수≠0은 모든 점에서 거짓입니다.', '두 식이 같으면 직선이 겹쳐 한 색만 보일 수 있습니다. 무한히 많은 해 중 표시한 점은 한 예입니다.', '분수는 정확한 해를 나타내며 소수 좌표는 필요한 경우 소수 여섯 자리까지 반올림합니다. 반올림한 좌표의 대입 잔차는 0이 아닐 수 있습니다.'],
      warning: determinant === 0 ? `역행렬이 없습니다. 우변까지 확인한 결과는 ‘${kindText}’입니다.` : null,
      plot: { type: 'cartesian', aspect: 'equal', xRange: [-bound, bound], yRange: [-bound, bound], region: kind === 'infinite' && rankA === 0 ? 'plane' : null, message: kind === 'infinite' && rankA === 0 ? '두 식이 모두 0=0이므로 표시한 평면의 모든 점이 해입니다. 보라색 점은 그중 한 예입니다.' : kind === 'none' ? ([a, b].every(q => q === 0) && r !== 0 || [c, d].every(q => q === 0) && s !== 0 ? '0이 0 아닌 수와 같아야 하는 모순이 있어 해가 없습니다.' : '서로 평행한 두 직선이 만나지 않아 두 식을 동시에 만족하는 점이 없습니다.') : kind === 'infinite' ? ([a, b].every(q => q === 0) || [c, d].every(q => q === 0) ? '0=0인 식은 제약을 더하지 않습니다. 나머지 직선 위의 모든 점이 해이고 보라색 점은 한 예입니다.' : '두 식의 직선이 겹칩니다. 직선 위의 모든 점이 해이고 보라색 점은 한 예입니다.') : '두 직선의 교점은 두 식을 동시에 만족하는 유일한 해입니다.', curves: [...(line1.length ? [{ label: '첫째 식', color: '#2563eb', points: line1 }] : []), ...(line2.length ? [{ label: '둘째 식', color: '#ea580c', points: line2 }] : [])], points: markedPoint ? [{ label: kind === 'unique' ? '유일한 해' : '해의 한 예', x: markedPoint[0], y: markedPoint[1], color: '#7c3aed' }] : [] },
      data: { matrix: [[a, b], [c, d]], rhs: [r, s], determinant, rankA, rankAugmented, kind, solution, particular, residuals },
      target: { prompt: 'x+y=2, 2x+2y=4에서 둘째 우변만 5로 바꾸면?', expected: '같은 직선이 평행한 다른 직선이 되어 해가 없어집니다.' }
    };
  }
};
