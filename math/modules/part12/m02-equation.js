const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();
const relation = n => Number(fmt(n)) === n ? '=' : '≈';
const texRelation = n => Number(fmt(n)) === n ? '=' : String.raw`\approx`;

export default {
  id: 'M02', title: '방정식은 양쪽이 같아지는 입력 찾기', part: 1,
  lessonIds: ['AIM-P01-L02', 'AIM-P01-L05'],
  question: 'ax+b=c를 만족하는 x는 어디에 있을까요? a=0이어도 나눌 수 있을까요?',
  prerequisite: '음수의 사칙연산과 좌표의 뜻을 알면 좋아요.',
  controls: [
    { id: 'a', label: 'x 앞의 수 a', min: -4, max: 4, step: 1, value: 2 },
    { id: 'b', label: '더하는 수 b', min: -8, max: 8, step: 1, value: 1 },
    { id: 'c', label: '오른쪽 값 c', min: -8, max: 8, step: 1, value: 7 },
  ],
  presets: [
    { id: 'basic', label: '기본: 해가 하나', values: { a: 2, b: 1, c: 7 } },
    { id: 'none', label: '경계: 해가 없음', values: { a: 0, b: 1, c: 7 } },
    { id: 'all', label: '경계: 모든 실수가 해', values: { a: 0, b: 3, c: 3 } },
    { id: 'negative', label: '비교: 음수 계수', values: { a: -2, b: 1, c: 7 } },
  ],
  explain: ['등호는 양쪽 값이 같다는 뜻이에요.', 'a가 0이면 x의 영향이 사라져요. 이때는 b와 c를 직접 비교해야 해요.'],
  tryThis: ['해를 예상한 뒤 a, b, c를 바꾸세요.', '찾은 x를 원래 식에 넣어 양쪽 값을 확인하세요.', 'a=0에서 해가 없는 경우와 모든 실수가 해인 경우를 비교하세요.'],
  compute(values = {}) {
    const a = Math.round(pick(values.a, 2, -4, 4));
    const b = Math.round(pick(values.b, 1, -8, 8));
    const c = Math.round(pick(values.c, 7, -8, 8));
    const hasUnique = a !== 0;
    const root = hasUnique ? (c - b) / a : null;
    const all = !hasUnique && b === c;
    const status = hasUnique ? '해가 하나' : all ? '모든 실수가 해' : '해가 없음';
    const extent = Math.max(5, hasUnique ? Math.ceil(Math.abs(root)) + 1 : 5);
    const ys = [a * -extent + b, a * extent + b, c];
    const lo = Math.min(...ys, -1), hi = Math.max(...ys, 1), pad = (hi - lo) * 0.12;
    return {
      formulaTex: String.raw`\begin{gathered}ax+b=c\\a\ne0\Longrightarrow x=\frac{c-b}{a}\end{gathered}`,
      calculationTex: hasUnique ? String.raw`\begin{gathered}(${a})x+(${b})=${c}\\x=\frac{${c}-(${b})}{${a}}${texRelation(root)}${fmt(root)}\end{gathered}` : String.raw`0x+(${b})=${c}\quad\Longrightarrow\quad ${b}${all ? '=' : '\\ne'}${c}`,
      prediction: { prompt: hasUnique ? '이 방정식의 해 x를 예상하세요.' : '해가 없을까요, 모든 실수가 해일까요?', answer: hasUnique ? root : status, tolerance: 0.000001 },
      formulaText: hasUnique ? `(${a}) × x + (${b}) = ${c} → x = (${c} − (${b})) ÷ (${a}) ${relation(root)} ${fmt(root)}` : `0 × x + (${b}) = ${c} → ${b} ${all ? '=' : '≠'} ${c} → ${status}`,
      metrics: [{ label: '해의 상태', value: status }, { label: '해 x', value: hasUnique ? root : all ? '모든 실수' : '없음' }, { label: '대입 후 왼쪽 값', value: hasUnique ? a * root + b : b }, { label: '오른쪽 값', value: c }],
      steps: hasUnique ? [`양쪽에서 b=${b}를 빼면 ${a}x=${c - b}이에요.`, `a=${a}는 0이 아니므로 양쪽을 ${a}로 나눠요.`, `정확한 해 x=(${c - b})/(${a})를 대입하면 (${a}) × ((${c - b})/(${a})) + (${b}) = ${c}이에요.`, `왼쪽과 오른쪽이 ${c}로 같으므로 해를 확인했어요. 반올림한 소수를 대입하면 작은 오차가 생길 수 있어요.`] : [`a=0이면 x에 무엇을 넣어도 왼쪽은 ${b}예요.`, all ? 'b=c이므로 모든 실수를 넣어도 등식이 성립해요.' : 'b≠c이므로 등식을 성립시키는 실수 x가 없어요.', '0으로 나누는 단계는 사용할 수 없어요.'],
      conditions: ['x는 실수로 생각합니다.', '해 공식 (c−b)/a는 a≠0에서만 사용할 수 있습니다.', '두 그래프의 교점은 양쪽 값이 같아지는 입력을 나타냅니다.', '반올림한 소수에는 ≈를 쓰고, 정확한 값은 분수식으로 함께 표시합니다.'],
      warning: hasUnique ? null : 'a=0에서는 0으로 나눌 수 없어요. b와 c를 비교해 해를 구분합니다.',
      plot: { type: 'cartesian', message: hasUnique ? '두 그래프의 교점 한 개가 방정식의 해를 나타냅니다.' : all ? '두 그래프가 완전히 겹칩니다. 모든 실수 x에서 양쪽 값이 같으므로 모든 실수가 해입니다.' : '서로 다른 두 수평선은 만나지 않습니다. 양쪽 값이 같아지는 실수 x가 없어 해가 없습니다.', xRange: [-extent, extent], yRange: [lo - pad, hi + pad], curves: [{ label: '왼쪽 y=ax+b', color: '#245f93', points: [[-extent, a * -extent + b], [extent, a * extent + b]] }, { label: '오른쪽 y=c', color: '#7a1f2e', points: [[-extent, c], [extent, c]] }], points: hasUnique ? [{ label: `교점: x${relation(root)}${fmt(root)}`, x: root, y: c, color: '#19735b' }] : [] },
      target: { prompt: 'a=0일 때 먼저 비교해야 할 두 수는 무엇일까요?', expected: 'b와 c' },
    };
  },
};
