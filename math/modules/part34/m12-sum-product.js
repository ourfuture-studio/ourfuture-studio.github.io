const controls = [
  { id: 'a0', label: '첫 항 a₀', min: -3, max: 3, step: 1, value: 1 },
  { id: 'd', label: '한 칸마다 더할 수 d', min: -2, max: 2, step: 1, value: 1 },
  { id: 'start', label: '시작 첨자 m', min: 0, max: 8, step: 1, value: 0 },
  { id: 'end', label: '마지막 첨자 n (포함)', min: -1, max: 8, step: 1, value: 3 }
];
const read = (v, k) => { const c = controls.find(q => q.id === k), n = Number(v?.[k] ?? c.value); return Number.isFinite(n) ? Math.round(Math.max(c.min, Math.min(c.max, n))) : c.value; };
const fmt = n => String(Math.abs(n) < 1e-12 ? 0 : Number(n.toFixed(6)));

export default {
  id: 'M12', title: '첨자 범위를 바꾸며 총합·총곱 쌓기', part: 3,
  lessonIds: ['AIM-P03-L06', 'AIM-P03-L07'],
  question: '더하거나 곱할 항이 하나도 없으면 시작값은 무엇이어야 할까요?',
  prerequisite: 'aᵢ의 i는 몇 번째 항인지 가리키는 첨자입니다. 여기서는 aᵢ=a₀+d×i입니다.', controls,
  presets: [
    { id: 'default', label: '1, 2, 3, 4를 더하고 곱하기', values: { a0: 1, d: 1, start: 0, end: 3 } },
    { id: 'empty', label: '빈 범위: 시작 3, 끝 2', values: { a0: 1, d: 1, start: 3, end: 2 } },
    { id: 'zero-factor', label: '0이 곱에 포함됨', values: { a0: 0, d: 1, start: 0, end: 3 } },
    { id: 'negative-factors', label: '곱은 양수여도 개별 로그 불가', values: { a0: -2, d: 1, start: 0, end: 1 } }
  ],
  explain: '각 항을 먼저 만든 뒤 범위 양 끝을 포함해 더하거나 곱합니다. 그래프는 항의 값과 그때까지의 부분합을 보여 줍니다.',
  tryThis: '끝 첨자를 한 칸 늘렸을 때 새로 들어올 항을 예상하세요. 빈 범위, 0인 항, 음수인 항도 차례로 확인하세요.',
  compute(values = {}) {
    const a0 = read(values, 'a0'), d = read(values, 'd'), start = read(values, 'start'), end = read(values, 'end');
    const indices = end < start ? [] : Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const terms = indices.map(i => a0 + d * i);
    let sum = 0, product = 1;
    const partialSums = terms.map((a, i) => { sum += a; product *= a; return [indices[i], sum]; });
    const logAllowed = terms.every(a => a > 0), logProduct = product > 0 ? Math.log(product) : null;
    const sumLogs = logAllowed ? terms.reduce((s, a) => s + Math.log(a), 0) : null;
    const count = terms.length, ys = [0, ...terms, ...partialSums.map(p => p[1])];
    const ymin = Math.min(...ys), ymax = Math.max(...ys), pad = Math.max(1, (ymax - ymin) * 0.1);
    return {
      formulaTex: "\\begin{gathered}a_i=a_0+di\\\\S=\\sum_{i=m}^{n}a_i,\\qquad P=\\prod_{i=m}^{n}a_i\\\\P>0\\Rightarrow\\ln P\\in\\mathbb R\\\\a_i>0\\;\\forall i\\Rightarrow\\ln P=\\sum_{i=m}^{n}\\ln a_i\\end{gathered}",
      formulaText: count ? `i=${start},…,${end}; 항=[${terms.map(fmt).join(', ')}]; S=${fmt(sum)}, P=${fmt(product)}` : `i=${start},…,${end}: 항이 없음; 빈합 S=0, 빈곱 P=1`,
      calculationTex: `\\begin{gathered}\\sum_{i=${start}}^{${end}}(${a0}+(${d})i)=${fmt(sum)}\\\\\\prod_{i=${start}}^{${end}}(${a0}+(${d})i)=${fmt(product)}\\end{gathered}`,
      metrics: [{ label: '포함한 항 수', value: count }, { label: '총합 Σ', value: fmt(sum) }, { label: '총곱 Π', value: fmt(product) }, { label: 'ln(총곱): P>0일 때', value: logProduct === null ? '미정의: 총곱 P가 0 이하' : fmt(logProduct) }, { label: '개별 ln의 합: 각 항>0일 때', value: sumLogs === null ? '미정의: 0 또는 음수인 항 포함' : fmt(sumLogs) }],
      steps: [`범위는 시작 ${start}부터 끝 ${end}까지 양 끝을 포함합니다. 항 수는 ${count}개입니다.`, count ? `aᵢ=${a0}+(${d})×i로 항을 만들면 ${terms.map(fmt).join(', ')}입니다.` : '빈 범위는 다른 수를 더해도 바뀌지 않는 0, 곱해도 바뀌지 않는 1에서 시작합니다.', count ? `합: ${terms.map(t => `(${fmt(t)})`).join(' + ')} = ${fmt(sum)}` : '빈합은 0입니다.', count ? `곱: ${terms.map(t => `(${fmt(t)})`).join(' × ')} = ${fmt(product)}` : '빈곱은 1입니다.', logAllowed ? `모든 항이 양수이므로 ln P와 개별 ln의 합이 모두 정의됩니다. 반올림 전 값을 계산하면 ln P≈${fmt(logProduct)}, Σ ln aᵢ≈${fmt(sumLogs)}입니다.` : logProduct !== null ? `총곱 P=${fmt(product)}>0이므로 ln P≈${fmt(logProduct)}는 정의됩니다. 하지만 음수인 개별 항의 실수 로그가 없어 개별 ln의 합으로 나눌 수 없습니다.` : `총곱 P=${fmt(product)}가 0 이하이므로 ln P가 실수에서 정의되지 않습니다. 0 또는 음수인 개별 항의 로그도 계산하지 않습니다.`],
      conditions: ['첨자 m,n은 정수이며 양 끝을 포함합니다. 이 체험은 m≥0입니다.', 'n<m이면 항이 없는 범위로 정하고 빈합 0, 빈곱 1을 사용합니다.', '그래프의 점은 정수 첨자에 해당합니다. 정수가 아닌 첨자의 항이나 부분합을 정의하지 않습니다.', '총곱 P의 실수 로그 ln P는 P>0이면 정의됩니다.', '실수 로그 분해 ln(Πaᵢ)=Σln(aᵢ)는 모든 포함된 항이 양수일 때 사용합니다.', '음수 두 개의 곱이 양수라면 총곱의 로그는 정의되어도 개별 실수 로그의 합으로 나눌 수 없습니다.', '계산은 반올림 전 값으로 수행하고 결과만 소수 여섯 자리까지 표시합니다.'],
      warning: logAllowed ? null : logProduct !== null ? '총곱의 로그는 정의되지만, 음수인 항이 있어 개별 로그의 합으로 분해할 수 없습니다.' : '총곱이 0 이하라 그 실수 로그가 정의되지 않습니다. 개별 로그의 합도 계산하지 않습니다.',
      plot: { type: 'cartesian', xRange: [-0.5, 8.5], yRange: [ymin - pad, ymax + pad], message: count ? '항과 부분합은 정수 첨자의 점으로 표시합니다. 총곱은 계산 패널에서 확인하세요.' : '범위에 항이 없어 점을 표시하지 않습니다. 빈합은 0, 빈곱은 1입니다.', curves: [{ label: '항 aᵢ', color: '#2563eb', connect: false, markers: true, points: indices.map((i, k) => [i, terms[k]]) }, { label: 'i까지의 부분합', color: '#ea580c', connect: false, markers: true, points: partialSums }], points: indices.map((i, k) => ({ label: `a${i}=${fmt(terms[k])}`, x: i, y: terms[k], color: '#2563eb' })) },
      data: { a0, d, start, end, indices, terms, count, sum, product, logAllowed, logProduct, sumLogs },
      target: { prompt: '기본 범위에서 끝 첨자를 4로 늘리면?', expected: '항 5가 추가됩니다. 총합 15, 총곱 120입니다.' }
    };
  }
};
