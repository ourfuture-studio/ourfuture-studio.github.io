const controls = [
  { id: 'a', label: 'A의 1행 1열', min: -4, max: 4, step: 1, value: 1 },
  { id: 'b', label: 'A의 1행 2열', min: -4, max: 4, step: 1, value: 2 },
  { id: 'c', label: 'A의 2행 1열', min: -4, max: 4, step: 1, value: 3 },
  { id: 'd', label: 'A의 2행 2열', min: -4, max: 4, step: 1, value: 4 },
  { id: 'vx', label: '입력 벡터 v의 x성분', min: -4, max: 4, step: 1, value: 2 },
  { id: 'vy', label: '입력 벡터 v의 y성분', min: -4, max: 4, step: 1, value: 1 }
];
const read = (v, k) => { const c = controls.find(q => q.id === k), n = Number(v?.[k] ?? c.value); return Number.isFinite(n) ? c.min + Math.round((Math.max(c.min, Math.min(c.max, n)) - c.min) / c.step) * c.step : c.value; };
const fmt = n => String(Math.abs(n) < 1e-12 ? 0 : Number(n.toFixed(6)));

export default {
  id: 'M14', title: '행렬곱으로 평면과 벡터 변환하기', part: 4,
  lessonIds: ['AIM-P04-L01', 'AIM-P04-L04', 'AIM-P04-L06', 'AIM-P04-L07'],
  question: '행렬의 두 열이 같은 방향이면 정사각형은 어떤 모습으로 바뀔까요?',
  prerequisite: '행렬의 shape는 행 수×열 수입니다. 여기서는 2×2 행렬과 2×1 열벡터를 곱합니다.', controls,
  presets: [
    { id: 'default', label: '원고: Av=(4,10)', values: { a: 1, b: 2, c: 3, d: 4, vx: 2, vy: 1 } },
    { id: 'identity', label: '단위행렬: 입력 유지', values: { a: 1, b: 0, c: 0, d: 1, vx: 2, vy: 1 } },
    { id: 'rank-one', label: '랭크 1: 직선으로 눌림', values: { a: 1, b: 2, c: 1, d: 2, vx: 2, vy: 1 } },
    { id: 'zero', label: '영행렬: 원점으로', values: { a: 0, b: 0, c: 0, d: 0, vx: 2, vy: 1 } }
  ],
  explain: 'Av는 A의 각 행과 v의 내적입니다. 같은 결과를 A의 첫째 열을 v₁배, 둘째 열을 v₂배 하여 더하는 것으로 볼 수 있습니다.',
  tryThis: '첫 행과 v의 내적을 먼저 계산하세요. 단위행렬과 랭크 1 예제로 바꾸고 정사각형이 변하는 모습을 비교하세요.',
  compute(values = {}) {
    const a = read(values, 'a'), b = read(values, 'b'), c = read(values, 'c'), d = read(values, 'd'), vx = read(values, 'vx'), vy = read(values, 'vy');
    const output = [a * vx + b * vy, c * vx + d * vy], determinant = a * d - b * c;
    const rank = determinant !== 0 ? 2 : [a, b, c, d].some(t => t !== 0) ? 1 : 0;
    const square = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]];
    const transformedSquare = square.map(([x, y]) => [a * x + b * y, c * x + d * y]);
    const bound = Math.max(3, ...[vx, vy, ...output, a, b, c, d, a + b, c + d].map(Math.abs)) + 1;
    return {
      formulaTex: "\\begin{gathered}A=\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\\\A\\mathbf v=\\begin{bmatrix}av_1+bv_2\\\\cv_1+dv_2\\end{bmatrix}\\\\=v_1\\begin{bmatrix}a\\\\c\\end{bmatrix}+v_2\\begin{bmatrix}b\\\\d\\end{bmatrix}\\\\\\det A=ad-bc\\end{gathered}",
      formulaText: `A=[[${fmt(a)},${fmt(b)}],[${fmt(c)},${fmt(d)}]], v=(${fmt(vx)},${fmt(vy)}); Av=(${output.map(fmt).join(',')}); det A=${fmt(determinant)}`,
      calculationTex: `\\begin{gathered}A\\mathbf v=\\begin{bmatrix}(${fmt(a)})(${fmt(vx)})+(${fmt(b)})(${fmt(vy)})\\\\(${fmt(c)})(${fmt(vx)})+(${fmt(d)})(${fmt(vy)})\\end{bmatrix}\\\\=\\begin{bmatrix}${fmt(output[0])}\\\\${fmt(output[1])}\\end{bmatrix}\\end{gathered}`,
      metrics: [{ label: '곱셈 shape', value: '(2×2) @ (2×1) → (2×1)' }, { label: '출력 Av', value: `(${output.map(fmt).join(', ')})` }, { label: '행렬식 det A', value: fmt(determinant) }, { label: '랭크', value: rank }, { label: '역행렬', value: determinant === 0 ? '없음' : '존재함' }, { label: '단위 정사각형의 변환 후 넓이', value: fmt(Math.abs(determinant)) }],
      steps: [`첫 행과 v의 내적: (${fmt(a)})×(${fmt(vx)})+(${fmt(b)})×(${fmt(vy)})=${fmt(output[0])}`, `둘째 행과 v의 내적: (${fmt(c)})×(${fmt(vx)})+(${fmt(d)})×(${fmt(vy)})=${fmt(output[1])}`, `열의 선형결합: ${fmt(vx)}×(${fmt(a)},${fmt(c)}) + ${fmt(vy)}×(${fmt(b)},${fmt(d)})`, `행렬식: (${fmt(a)})×(${fmt(d)})−(${fmt(b)})×(${fmt(c)})=${fmt(determinant)}`, `랭크 ${rank}: 출력이 ${rank === 2 ? '평면 전체를 만들 수 있습니다.' : rank === 1 ? '한 직선에 놓입니다.' : '원점 하나입니다.'}`],
      conditions: ['행렬곱 (m×n)@(n×p)는 안쪽 차원 n이 같아야 하며 결과 shape는 m×p입니다.', '행렬곱은 행과 열의 내적입니다. 대응 원소만 곱하는 원소별 곱과 다릅니다.', '이 화면의 A(2×2)와 열벡터 v(2×1)는 같은 shape가 아닙니다. NumPy의 브로드캐스팅 원소별 곱을 Av로 해석하지 않습니다.', '2×2 정사각행렬의 역행렬은 det A≠0일 때만 존재합니다.', '행렬식의 절댓값은 넓이 배율이며 음의 행렬식은 방향 뒤집힘을 나타냅니다.'],
      warning: determinant === 0 ? 'det A=0: 평면이 직선 또는 점으로 눌리며 역행렬이 없습니다.' : null,
      plot: { type: 'cartesian', aspect: 'equal', xRange: [-bound, bound], yRange: [-bound, bound], curves: [{ label: '원래 단위 정사각형', color: '#94a3b8', points: square }, { label: '변환된 단위 정사각형', color: '#16a34a', points: transformedSquare }, { label: '입력 v', color: '#2563eb', arrow: true, points: [[0, 0], [vx, vy]] }, { label: '출력 Av', color: '#ea580c', arrow: true, points: [[0, 0], output] }, { label: 'A의 첫째 열', color: '#7c3aed', arrow: true, points: [[0, 0], [a, c]] }, { label: 'A의 둘째 열', color: '#db2777', arrow: true, points: [[0, 0], [b, d]] }], points: [{ label: 'v', x: vx, y: vy, color: '#2563eb' }, { label: 'Av', x: output[0], y: output[1], color: '#ea580c' }] },
      data: { matrix: [[a, b], [c, d]], vector: [vx, vy], output, determinant, rank, transformedSquare },
      target: { prompt: '기본 A에 v=(2,1)을 곱하면?', expected: '(1×2+2×1, 3×2+4×1)=(4,10)' }
    };
  }
};
