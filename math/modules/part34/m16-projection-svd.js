const controls = [
  { id: 'mode', label: '체험 선택: 0=직교투영, 1=대각 SVD', min: 0, max: 1, step: 1, value: 0 },
  { id: 'vx', label: '입력 v의 x성분', min: -4, max: 4, step: 1, value: 3 },
  { id: 'vy', label: '입력 v의 y성분', min: -4, max: 4, step: 1, value: 2 },
  { id: 'ux', label: '투영 방향 u의 x성분 (체험 0)', min: -4, max: 4, step: 1, value: 1 },
  { id: 'uy', label: '투영 방향 u의 y성분 (체험 0)', min: -4, max: 4, step: 1, value: 0 },
  { id: 's', label: 'diag(-2,s)의 s (체험 1)', min: -2, max: 2, step: 0.5, value: 1 }
];
const read = (v, k) => { const q = controls.find(t => t.id === k), n = Number(v?.[k] ?? q.value); return Number.isFinite(n) ? q.min + Math.round((Math.max(q.min, Math.min(q.max, n)) - q.min) / q.step) * q.step : q.value; };
const fmt = n => String(Math.abs(n) < 1e-12 ? 0 : Number(n.toFixed(6)));
const relation = n => Number(fmt(n)) === n ? '=' : '≈';

export default {
  id: 'M16', title: '직교투영과 대각 SVD를 예제별로 구별하기', part: 4,
  lessonIds: ['AIM-P04-L06', 'AIM-P04-L07', 'AIM-P04-L08'],
  question: '직선에 투영하고 남은 벡터는 어느 방향일까요? SVD 확장에서는 부호와 크기를 구별해요.',
  prerequisite: '체험 0은 벡터를 직선에 투영합니다. 체험 1은 대각행렬의 부호 뒤집힘과 늘어남을 SVD로 나누어 봅니다.', controls,
  presets: [
    { id: 'default', label: '투영: (3,2) → (3,0)', values: { mode: 0, vx: 3, vy: 2, ux: 1, uy: 0, s: 1 } },
    { id: 'diagonal-projection', label: '투영: (3,1) → (2,2)', values: { mode: 0, vx: 3, vy: 1, ux: 1, uy: 1, s: 1 } },
    { id: 'zero-direction', label: '투영 방향이 영벡터', values: { mode: 0, vx: 3, vy: 2, ux: 0, uy: 0, s: 1 } },
    { id: 'svd', label: 'SVD: diag(-2,1)', values: { mode: 1, vx: 1, vy: 1, ux: 1, uy: 0, s: 1 } },
    { id: 'rank-one', label: 'SVD: s=0, 랭크 1', values: { mode: 1, vx: 1, vy: 1, ux: 1, uy: 0, s: 0 } },
    { id: 'negative-eigenvalue', label: 'SVD: s=-1, 특잇값은 양수', values: { mode: 1, vx: 1, vy: 1, ux: 1, uy: 0, s: -1 } }
  ],
  explain: '투영과 SVD는 서로 다른 예제입니다. 선택값 0에서는 잔차의 직교성을, 1에서는 고유값의 부호와 특잇값의 비음수성을 확인하세요.',
  tryThis: '투영점부터 예상하고 v−p가 u에 수직인지 내적으로 확인하세요. 체험 1로 바꾼 뒤 s를 1, 0, −1로 바꾸며 랭크와 특잇값을 비교하세요.',
  compute(values = {}) {
    const mode = Math.round(read(values, 'mode')), vx = read(values, 'vx'), vy = read(values, 'vy'), ux = read(values, 'ux'), uy = read(values, 'uy'), s = read(values, 's');
    if (mode === 1) {
      const singularValues = [2, Math.abs(s)], eigenvalues = [-2, s], rank = s === 0 ? 1 : 2;
      const U = [[-1, 0], [0, s < 0 ? -1 : 1]], Sigma = [[2, 0], [0, Math.abs(s)]], Vt = [[1, 0], [0, 1]];
      const output = [-2 * vx, s * vy], approximation = [[-2, 0], [0, 0]], errorSquared = s * s;
      const circle = Array.from({ length: 181 }, (_, i) => { const t = 2 * Math.PI * i / 180; return [Math.cos(t), Math.sin(t)]; });
      const ellipse = circle.map(([x, y]) => [-2 * x, s * y]);
      const bound = Math.max(3, Math.abs(vx), Math.abs(vy), ...output.map(Math.abs)) + 1;
      return {
        formulaTex: "\\begin{gathered}A=\\operatorname{diag}(-2,s)=U\\Sigma V^{\\mathsf T}\\\\U=\\operatorname{diag}(-1,\\varepsilon_s)\\\\\\Sigma=\\operatorname{diag}(2,|s|),\\quad V=I,\\quad |s|\\le2\\\\\\varepsilon_s=\\begin{cases}-1&s<0\\\\1&s\\ge0\\end{cases}\\end{gathered}",
        formulaText: `A=diag(-2,${fmt(s)}), U=diag(-1,${s < 0 ? -1 : 1}), Σ=diag(2,${fmt(Math.abs(s))}), Vᵀ=I; Av=(${output.map(fmt).join(', ')})`,
        calculationTex: `\\begin{gathered}U\\Sigma V^{\\mathsf T}=\\operatorname{diag}(-1,${s < 0 ? -1 : 1})\\operatorname{diag}(2,${fmt(Math.abs(s))})I\\\\=\\operatorname{diag}(-2,${fmt(s)})\\\\\\|A-A_1\\|_F^2=(${fmt(s)})^2=${fmt(errorSquared)}\\end{gathered}`,
        metrics: [{ label: '현재 체험', value: '1: 대각행렬 SVD' }, { label: '고유값 λ (부호 유지)', value: `−2, ${fmt(s)}` }, { label: '특잇값 σ (내림차순, 비음수)', value: `2, ${fmt(Math.abs(s))}` }, { label: '랭크 = 양의 특잇값 수', value: rank }, { label: '출력 Av', value: `(${output.map(fmt).join(', ')})` }, { label: '랭크 1 근사 오차 ||A−A₁||²F', value: fmt(errorSquared) }],
        steps: ['대각행렬이므로 좌표축 방향이 고유벡터이고 고유값은 대각 원소입니다.', `AᵀA=diag(4,${fmt(s * s)})의 고유값에 제곱근을 취하면 특잇값은 2와 ${fmt(Math.abs(s))}입니다.`, `Σ가 크기를 늘리고 U가 필요한 좌표의 부호를 뒤집습니다. UΣVᵀ=diag(−2,${fmt(s)})를 복원합니다.`, `두 번째 특잇값을 0으로 두면 A₁=diag(−2,0)입니다. 버린 성분의 제곱 오차는 s²=${fmt(errorSquared)}입니다.`, s === 0 ? '원래 행렬부터 랭크 1이라 근사 오차도 0입니다.' : '특잇값은 부호가 있는 고유값과 다른 양입니다. 음의 고유값도 양의 특잇값에 대응할 수 있습니다.'],
        conditions: ['이 SVD 예제는 A=diag(−2,s), −2≤s≤2에만 해당합니다.', '여기서는 2≥|s|라 특잇값을 내림차순으로 표시할 수 있습니다.', '특잇값은 AᵀA의 고유값의 비음수 제곱근이며 음수가 아닙니다.', '일반 행렬의 고유값과 특잇값이 같다고 일반화하지 않습니다. 이 실수 대각행렬에서는 특잇값이 대각 원소 절댓값입니다.', '|s|=2이면 최대 특잇값이 중복됩니다. 제시한 랭크 1 근사도 유효하지만 유일하지 않습니다.', 'u 방향 입력은 체험 1의 SVD 계산에 사용하지 않습니다.'],
        warning: s === 0 ? 's=0: 두 번째 특잇값이 0이므로 랭크가 1이며 역행렬이 없습니다.' : Math.abs(s) === 2 ? '특잇값이 같은 경우 SVD의 방향 선택과 최적 랭크 1 근사는 유일하지 않습니다.' : null,
        plot: { type: 'cartesian', aspect: 'equal', xRange: [-bound, bound], yRange: [-bound, bound], curves: [{ label: '입력 단위원', color: '#94a3b8', points: circle }, { label: 'A로 변환된 단위원', color: '#16a34a', points: ellipse }, { label: '입력 v', color: '#2563eb', arrow: true, points: [[0, 0], [vx, vy]] }, { label: '출력 Av', color: '#ea580c', arrow: true, points: [[0, 0], output] }], points: [{ label: 'v', x: vx, y: vy, color: '#2563eb' }, { label: 'Av', x: output[0], y: output[1], color: '#ea580c' }] },
        data: { mode, s, matrix: [[-2, 0], [0, s]], U, Sigma, Vt, singularValues, eigenvalues, rank, output, approximation, errorSquared },
        target: { prompt: 's=−1일 때 고유값과 특잇값은?', expected: '고유값 −2,−1 / 특잇값 2,1입니다.' }
      };
    }
    const denominator = ux * ux + uy * uy, numerator = vx * ux + vy * uy;
    const coefficient = denominator === 0 ? null : numerator / denominator;
    const projection = coefficient === null ? null : [coefficient * ux, coefficient * uy];
    const residual = projection ? [vx - projection[0], vy - projection[1]] : null;
    const orthogonality = residual ? residual[0] * ux + residual[1] * uy : null;
    const bound = Math.max(5, Math.abs(vx), Math.abs(vy), Math.abs(ux), Math.abs(uy), ...(projection ? projection.map(Math.abs) : [0])) + 1;
    const scale = denominator === 0 ? 0 : bound / Math.max(Math.abs(ux), Math.abs(uy));
    return {
      formulaTex: "\\begin{gathered}\\mathbf p=\\operatorname{proj}_{\\mathbf u}\\mathbf v=\\frac{\\mathbf v\\cdot\\mathbf u}{\\mathbf u\\cdot\\mathbf u}\\mathbf u\\quad(\\mathbf u\\ne\\mathbf0)\\\\\\mathbf r=\\mathbf v-\\mathbf p,\\qquad\\mathbf r\\cdot\\mathbf u=0\\end{gathered}",
      formulaText: `v=(${fmt(vx)},${fmt(vy)}), u=(${fmt(ux)},${fmt(uy)}); p=${projection ? `(${fmt(numerator)}/${fmt(denominator)})u ${projection.every(n => relation(n) === '=') ? '=' : '≈'} (${projection.map(fmt).join(',')})` : '공식 적용 불가: 분모 0'}`,
      calculationTex: projection ? `\\begin{gathered}\\mathbf p=\\frac{${fmt(numerator)}}{${fmt(denominator)}}\\begin{bmatrix}${fmt(ux)}\\\\${fmt(uy)}\\end{bmatrix}\\\\${projection.every(n => relation(n) === '=') ? '=' : '\\approx'}\\begin{bmatrix}${fmt(projection[0])}\\\\${fmt(projection[1])}\\end{bmatrix}\\\\(\\mathbf v-\\mathbf p)\\cdot\\mathbf u=0\\end{gathered}` : '\\begin{gathered}\\mathbf u=\\mathbf0\\Rightarrow\\mathbf u\\cdot\\mathbf u=0\\\\\\text{division formula unavailable}\\end{gathered}',
      metrics: [{ label: '현재 체험', value: '0: 직교투영' }, { label: '분자 v·u', value: fmt(numerator) }, { label: '분모 u·u = ||u||²', value: fmt(denominator) }, { label: '투영점 p', value: projection ? `(${projection.map(fmt).join(', ')})` : '방향 u가 영벡터: 공식 적용 불가' }, { label: '잔차 r=v−p', value: residual ? `(${residual.map(fmt).join(', ')})` : '계산 안 함' }, { label: '직교 확인 r·u', value: orthogonality === null ? '계산 안 함' : fmt(orthogonality) }],
      steps: [`분자 v·u=${fmt(numerator)}, 분모 u·u=${fmt(denominator)}`, projection ? `계수=${fmt(numerator)}/${fmt(denominator)} ${relation(coefficient)} ${fmt(coefficient)}입니다. 이 정확한 분수에 u를 곱합니다. p의 소수 표시는 (${projection.map(fmt).join(', ')})입니다.` : 'u=0이면 투영할 직선 방향이 정해지지 않아 이 공식을 적용하지 않습니다.', residual ? `잔차 v−p의 소수 표시는 (${residual.map(fmt).join(', ')})입니다.` : '분모가 0이므로 나눗셈과 후속 계산을 수행하지 않습니다.', residual ? `정확한 잔차와 u의 내적은 0입니다. 부동소수점 계산 표시도 ${fmt(orthogonality)}입니다. 투영한 점에서 원래 점으로 잇는 선분이 직선에 수직입니다.` : 'u를 영벡터가 아닌 값으로 바꾸면 계산을 다시 볼 수 있습니다.'],
      conditions: ['직선 span(u)에 대한 이 투영 공식은 u≠0일 때 사용합니다.', '잔차 r는 투영 방향 u와 직교합니다. p와 r를 더하면 원래 v입니다.', 'u를 0이 아닌 상수배로 바꿔도 같은 직선이므로 투영점은 같습니다.', 'u=0이면 span(u)는 {0}입니다. 그 집합으로의 투영은 0으로 따로 정의할 수 있지만, 현재 화면의 방향벡터 나눗셈 공식은 적용할 수 없습니다.', 's 입력은 체험 0의 투영 계산에 사용하지 않습니다.', '분수는 정확한 계산식입니다. 소수 벡터는 필요한 경우 소수 여섯 자리까지 반올림하며, 반올림한 벡터의 내적은 0에서 조금 벗어날 수 있습니다.'],
      warning: projection ? null : 'u=0: 직선 방향을 고를 수 없고 분모가 0입니다. u의 성분을 하나 이상 0이 아니게 바꾸세요.',
      plot: { type: 'cartesian', aspect: 'equal', xRange: [-bound, bound], yRange: [-bound, bound], curves: [{ label: '원래 벡터 v', color: '#2563eb', arrow: true, points: [[0, 0], [vx, vy]] }, ...(projection ? [{ label: '투영 직선 span(u)', color: '#94a3b8', points: [[-scale * ux, -scale * uy], [scale * ux, scale * uy]] }, { label: '투영 벡터 p', color: '#16a34a', arrow: true, points: [[0, 0], projection] }, { label: '잔차 r=v−p', color: '#ea580c', arrow: true, points: [projection, [vx, vy]] }] : [])], points: [{ label: 'v', x: vx, y: vy, color: '#2563eb' }, ...(projection ? [{ label: 'p', x: projection[0], y: projection[1], color: '#16a34a' }] : [])] },
      data: { mode, vector: [vx, vy], direction: [ux, uy], numerator, denominator, coefficient, projection, residual, orthogonality },
      target: { prompt: 'v=(3,1), u=(1,1)이면 투영점은?', expected: '(2,2), 잔차는 (1,−1)이고 u와의 내적은 0입니다.' }
    };
  }
};
