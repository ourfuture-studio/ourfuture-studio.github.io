const pick = (v, fallback, min, max) => Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Number(v))) : fallback;
const fmt = n => Number(n.toFixed(6)).toString();
const relation = n => Number(fmt(n)) === n ? '=' : '≈';
const texRelation = n => Number(fmt(n)) === n ? '=' : String.raw`\approx`;

export default {
  id: 'M07', title: '같은 양 대신 같은 비율로 변해요', part: 2,
  lessonIds: ['AIM-P02-L05'],
  question: 'x가 1 늘 때 더해지는 양과 곱해지는 비율 중 무엇이 일정할까요?',
  prerequisite: 'aⁿ이 같은 수를 반복해 곱하는 뜻임을 알고 시작하세요.',
  controls: [
    { id: 'base', label: '밑 b (0과 1은 조건 확인용)', min: 0, max: 4, step: 0.25, value: 2 },
    { id: 'x', label: '입력 x', min: -3, max: 3, step: 0.25, value: 2 },
    { id: 'scale', label: '시작 배율 k (양수)', min: 1, max: 3, step: 0.5, value: 1 },
  ],
  presets: [
    { id: 'growth', label: '기본: 두 배씩 증가', values: { base: 2, x: 2, scale: 1 } },
    { id: 'decay', label: '비교: 절반씩 감소', values: { base: 0.5, x: 2, scale: 1 } },
    { id: 'one', label: '경계: 밑이 1', values: { base: 1, x: 2, scale: 1 } },
    { id: 'zero', label: '경계: 밑이 0', values: { base: 0, x: -1, scale: 1 } },
  ],
  explain: ['y=k·bˣ에서는 x가 1 늘 때 출력에 b를 곱해요.', 'b>1이면 증가하고, 0<b<1이면 감소해요.', 'k>0이고 b>0인 이 예시에서는 출력이 항상 양수예요.'],
  tryThis: ['b=2에서 x=2와 x=3의 출력을 예상하세요.', 'b=0.5로 바꿔 x가 늘 때 출력의 방향을 확인하세요.', 'b=1 또는 0에서 지수함수의 정의 조건을 읽으세요.'],
  compute(values = {}) {
    const base = Math.round(pick(values.base, 2, 0, 4) * 4) / 4, x = pick(values.x, 2, -3, 3), scale = pick(values.scale, 1, 1, 3);
    const positive = base > 0, exponential = positive && base !== 1;
    const output = positive ? scale * Math.pow(base, x) : null;
    const next = positive ? scale * Math.pow(base, x + 1) : null;
    const samples = positive ? Array.from({ length: 121 }, (_, i) => { const t = -3 + i / 20; return [t, scale * Math.pow(base, t)]; }) : [];
    const ceiling = Math.max(2, ...samples.map(p => p[1]), positive ? next : 0);
    const kind = !positive ? '정의 조건을 만족하지 않음' : base === 1 ? '상수함수' : base > 1 ? '지수 증가' : '지수 감소';
    return {
      formulaTex: String.raw`\begin{gathered}y(x)=kb^x\\k>0,\ b>0,\ b\ne1\\\frac{y(x+1)}{y(x)}=b\end{gathered}`,
      calculationTex: positive ? String.raw`\begin{gathered}y(${fmt(x)})=${fmt(scale)}\cdot ${fmt(base)}^{${fmt(x)}}${texRelation(output)}${fmt(output)}\\y(${fmt(x + 1)})${texRelation(next)}${fmt(next)}\end{gathered}` : String.raw`b=0:\quad\text{지수함수의 밑 조건을 만족하지 않음}`,
      prediction: { prompt: '선택한 x에서의 출력 y를 예상하세요.', answer: positive ? output : '이 체험에서 계산하지 않음', tolerance: 0.000001 },
      formulaText: positive ? `y(${fmt(x)}) = ${fmt(scale)} × ${fmt(base)}^(${fmt(x)}) ${relation(output)} ${fmt(output)}; y(${fmt(x + 1)}) ${relation(next)} ${fmt(next)}` : `b=0은 실수 전체 x에서 지수함수를 정의하는 밑의 조건 b>0을 만족하지 않아요.`,
      metrics: [{ label: '함수의 종류', value: kind }, { label: '출력 y(x)', value: positive ? output : '이 체험에서 계산하지 않음' }, { label: '입력 1 증가 후 y(x+1)', value: positive ? next : '이 체험에서 계산하지 않음' }, { label: '출력의 비율 y(x+1)/y(x)', value: positive ? base : '계산하지 않음' }],
      steps: positive ? [`밑 ${fmt(base)}를 입력 ${fmt(x)}만큼 거듭제곱하고 ${fmt(scale)}를 곱해요. 화면 결과는 ${fmt(output)}이며 필요한 경우 반올림합니다.`, `입력을 1 늘린 ${fmt(x + 1)}에서도 같은 방법으로 계산해요. 화면 결과는 ${fmt(next)}예요.`, `정확한 두 출력의 비율은 밑 ${fmt(base)}와 같아요. 반올림한 소수끼리 나누면 작은 오차가 생길 수 있어요.`, base === 1 ? '1ˣ=1이므로 x를 바꿔도 출력은 k로 일정해요. 일반적인 지수함수 정의에서 b=1을 제외하는 이유예요.' : base > 1 ? 'x가 늘수록 같은 비율을 곱하면서 출력이 커져요.' : 'x가 늘수록 1보다 작은 같은 비율을 곱하면서 출력이 작아져요.'] : ['실수 전체 입력을 다루기 위해 밑은 양수로 정해요.', '밑 0은 음의 지수에서 역수 계산이 불가능하고, 0⁰도 이 수업에서는 정의하지 않아요.', '0보다 큰 밑을 선택해 계산을 시작하세요.'],
      conditions: ['지수함수는 b>0, b≠1로 정의합니다.', '이 체험은 k>0으로 고정해 증가·감소 방향을 설명합니다.', 'b=1에서는 계산 자체는 가능하지만 결과가 상수함수이므로 지수함수에서 제외합니다.', '곡선은 −3≤x≤3 구간입니다. 붉은 점 y(x+1)은 x+1≤4에서 함께 표시합니다.'],
      warning: exponential ? null : positive ? 'b=1이면 1ˣ은 계산되지만 상수함수입니다. 이 수업의 지수함수 정의에서는 제외해요.' : 'b=0은 지수함수의 밑으로 사용할 수 없습니다. 일부 정수 지수의 계산 가능 여부와 함수 정의는 구분해요.',
      plot: { type: 'cartesian', xRange: [-3, 4], yRange: [0, ceiling * 1.12], curves: positive ? [{ label: 'y=k·bˣ', color: '#245f93', points: samples }] : [], points: positive ? [{ label: `현재 y${relation(output)}${fmt(output)}`, x, y: output, color: '#245f93' }, { label: `입력 +1, y${relation(next)}${fmt(next)}`, x: x + 1, y: next, color: '#7a1f2e' }] : [] },
      target: positive ? { prompt: 'x가 1 늘면 출력에 무엇을 곱하나요?', expected: `밑 b=${fmt(base)}` } : { prompt: '밑 0으로는 왜 실수 전체의 지수함수를 정의할 수 없을까요?', expected: '음의 지수에서 0으로 나누게 되고, 0⁰도 이 수업에서는 정의하지 않으므로 실수 전체 입력을 다룰 수 없어요. 밑은 b>0, b≠1로 정합니다.' },
    };
  },
};
