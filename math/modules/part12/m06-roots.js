const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();

export default {
  id: 'M06', title: '√a와 x²=a의 답은 왜 다를까?', part: 2,
  lessonIds: ['AIM-P02-L03', 'AIM-P02-L04'],
  question: '√9는 3인데, x²=9의 해에는 왜 −3도 들어갈까요?',
  prerequisite: '양수와 음수를 제곱해 본 뒤 시작하세요.',
  controls: [{ id: 'a', label: '제곱한 뒤의 값 a', min: -4, max: 16, step: 1, value: 9 }],
  presets: [
    { id: 'basic', label: '기본: a=9', values: { a: 9 } },
    { id: 'zero', label: '경계: a=0', values: { a: 0 } },
    { id: 'negative', label: '경계: a가 음수', values: { a: -1 } },
    { id: 'irrational', label: '비교: a=2', values: { a: 2 } },
  ],
  explain: ['√a는 제곱해서 a가 되는 수 중 0 이상인 값을 하나 고르는 기호예요.', 'x²=a는 그 등식을 만족하는 모든 실수 x를 묻는 방정식이에요.', '그래프 y=x²와 y=a의 교점을 보면 해의 개수를 셀 수 있어요.'],
  tryThis: ['a=9에서 두 교점의 x좌표를 예상하세요.', 'a=0으로 바꿔 ±0이 서로 다른 해인지 생각하세요.', 'a를 음수로 바꾸고 실수의 제곱이 음수가 될 수 있는지 확인하세요.'],
  compute(values = {}) {
    const a = pick(values.a, 9, -4, 16), valid = a >= 0;
    const root = valid ? Math.sqrt(a) : null;
    const roots = valid ? a === 0 ? [0] : [-root, root] : [];
    const xs = Array.from({ length: 101 }, (_, i) => -5 + i / 10);
    return {
      formulaTex: String.raw`\begin{gathered}a\ge0:\ \sqrt a\ge0,\quad (\sqrt a)^2=a\\x^2=a\Longleftrightarrow x=\pm\sqrt a\end{gathered}`,
      calculationTex: valid ? Number.isInteger(root) ? String.raw`\begin{gathered}\sqrt{${fmt(a)}}=${fmt(root)}\\x^2=${fmt(a)}\Longrightarrow x=${a === 0 ? '0' : String.raw`\pm ${fmt(root)}`}\end{gathered}` : String.raw`\begin{gathered}\sqrt{${fmt(a)}}\approx ${fmt(root)}\\x^2=${fmt(a)}\Longrightarrow x=\pm\sqrt{${fmt(a)}}\approx\pm ${fmt(root)}\end{gathered}` : String.raw`a=${fmt(a)}<0:\quad\text{실수 해 없음}`,
      prediction: { prompt: '주제곱근 √a의 값을 예상하세요.', answer: valid ? root : '실수에서 정의되지 않음', tolerance: 0.000001 },
      formulaText: valid ? `√(${fmt(a)}) ${Number.isInteger(root) ? '=' : '≈'} ${fmt(root)}; x²=${fmt(a)}의 실수 해: ${a === 0 ? '0 (하나)' : Number.isInteger(root) ? roots.map(fmt).join(', ') : `−√${fmt(a)}, √${fmt(a)} (약 ${roots.map(fmt).join(', ')})`}` : `a=${fmt(a)} < 0: √a는 실수에서 정의되지 않고, x²=a의 실수 해도 없어요.`,
      metrics: [{ label: '주제곱근 √a', value: valid ? root : '실수에서 정의되지 않음' }, { label: '방정식의 실수 해', value: valid ? Number.isInteger(root) ? roots.map(fmt).join(', ') : `−√${fmt(a)}, √${fmt(a)} (약 ${roots.map(fmt).join(', ')})` : '없음' }, { label: '서로 다른 실수 해의 개수', value: roots.length }],
      steps: valid ? [`0 이상의 수 중 제곱해서 ${fmt(a)}가 되는 값은 √${fmt(a)}이에요.`, a === 0 ? '0과 −0은 같은 수이므로 방정식의 해는 0 하나예요.' : `√${fmt(a)}와 −√${fmt(a)}는 둘 다 제곱하면 ${fmt(a)}가 돼요.`, '근호 √는 주제곱근 하나를 뜻하고, 방정식은 가능한 해 전체를 찾는다는 차이가 있어요.', Number.isInteger(root) ? '지금 값은 정수로 정확하게 표현할 수 있어요.' : `화면의 소수 ${fmt(root)}는 소수점 아래 6자리까지 반올림한 근삿값이에요.`] : ['모든 실수의 제곱은 0 이상이에요.', `그러므로 x²가 ${fmt(a)}가 되는 실수 x는 없어요.`, '이 체험은 실수 범위만 다룹니다.'],
      conditions: ['√a를 실수로 계산하려면 a≥0이어야 합니다.', 'a>0이면 x²=a의 서로 다른 실수 해는 두 개, a=0이면 한 개입니다.', '√(x²)=|x|이며, 음수 x까지 포함하면 항상 x와 같은 것은 아닙니다.', '비정수 제곱근은 반올림한 소수로 표시합니다.'],
      warning: valid ? null : 'a<0이므로 실수 범위에서 제곱근을 구할 수 없습니다. 그래프에도 교점이 없습니다.',
      plot: { type: 'cartesian', xRange: [-5, 5], yRange: [-5, 26], curves: [{ label: 'y=x²', color: '#245f93', points: xs.map(x => [x, x * x]) }, { label: `y=a=${fmt(a)}`, color: '#7a1f2e', points: [[-5, a], [5, a]] }], points: roots.map((x, i) => ({ label: `해 x${Number.isInteger(root) ? '=' : '≈'}${fmt(x)}`, x, y: a, color: i === 0 && x < 0 ? '#7a1f2e' : '#19735b' })) },
      target: { prompt: '√9와 x²=9의 해를 각각 적어 보세요.', expected: '√9=3; 방정식의 해는 −3과 3' },
    };
  },
};
