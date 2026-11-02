/** Normal-mean inference, known population SD. Pure functions are also used by QA. */
const SQRT2 = Math.sqrt(2);
const SQRT2PI = Math.sqrt(2 * Math.PI);
const poly = (x, a) => a.reduce((y, c) => y * x + c, 0);
const poly1 = (x, a) => a.reduce((y, c) => y * x + c, 1);
// Cephes rational approximation to erfc, Stephen L. Moshier (1984–1992).
// Coefficients verified against SciPy XSF, distributed under its BSD license:
// https://github.com/scipy/xsf/blob/main/include/xsf/cephes/ndtr.h
function erfcPositive(x) {
  if (x < 1) {
    const z = x * x;
    const t = [9.60497373987051638749, 90.0260197203842689217, 2232.00534594684319226, 7003.32514112805075473, 55592.3013010394962768];
    const u = [33.5617141647503099647, 521.357949780152679795, 4594.32382970980127987, 22629.0000613890934246, 49267.3942608635921086];
    return 1 - x * poly(z, t) / poly1(z, u);
  }
  if (x > 27.3) return 0;
  const p = [2.46196981473530512524e-10, .564189564831068821977, 7.46321056442269912687, 48.6371970985681366614, 196.520832956077098242, 526.445194995477358631, 934.52852717195760754, 1027.55188689515710272, 557.535335369399327526];
  const q = [13.2281951154744992508, 86.7072140885989742329, 354.937778887819891062, 975.708501743205489753, 1823.90916687909736289, 2246.33760818710981792, 1656.66309194161350182, 557.535340817727675546];
  const r = [.564189583547755073984, 1.27536670759978104416, 5.01905042251180477414, 6.16021097993053585195, 7.40974269950448939160, 2.97886665372100240670];
  const s = [2.26052863220117276590, 9.39603524938001434673, 12.0489539808096656605, 17.0814450747565897222, 9.60896809063285878198, 3.36907645100081516050];
  return Math.exp(-x * x) * (x < 8 ? poly(x, p) / poly1(x, q) : poly(x, r) / poly1(x, s));
}
export const normalPDF = x => Math.exp(-x * x / 2) / SQRT2PI;
export function normalSF(x) {
  if (Number.isNaN(x)) return NaN;
  return x >= 0 ? .5 * erfcPositive(x / SQRT2) : 1 - .5 * erfcPositive(-x / SQRT2);
}
export const normalCDF = x => normalSF(-x);
export function normalQuantile(p) {
  if (p === 0) return -Infinity;
  if (p === 1) return Infinity;
  if (!(p > 0 && p < 1)) return NaN;
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.3577518672690, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572, 1];
  const c = [-.007784894002430293, -.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [.007784695709041462, .3224671290700398, 2.445134137142996, 3.754408661907416, 1];
  let x;
  if (p < .02425) { const q = Math.sqrt(-2 * Math.log(p)); x = poly(q, c) / poly(q, d); }
  else if (p > .97575) { const q = Math.sqrt(-2 * Math.log1p(-p)); x = -poly(q, c) / poly(q, d); }
  else { const q = p - .5, r = q * q; x = q * poly(r, a) / poly(r, b); }
  // A Newton correction using the small tail avoids cancellation for p near 1.
  const error = x < 0 ? normalCDF(x) - p : (1 - p) - normalSF(x);
  return x - error / normalPDF(x);
}
function checkMeanModel({ mean = 0, n, sigma }) {
  if (!Number.isFinite(mean) || !Number.isInteger(n) || n < 1 || !Number.isFinite(sigma) || sigma <= 0) throw new RangeError('Finite mean, positive sigma and integer n ≥ 1 required.');
}
export function confidenceInterval({ mean, n, sigma, confidence }) {
  checkMeanModel({ mean, n, sigma });
  if (!(confidence > 0 && confidence < 1)) throw new RangeError('Confidence must be between zero and one.');
  const se = sigma / Math.sqrt(n), critical = normalQuantile((1 + confidence) / 2), margin = critical * se;
  return { mean, n, sigma, confidence, se, critical, margin, lower: mean - margin, upper: mean + margin, width: 2 * margin };
}
export function hypothesisTest({ mean, n, sigma, mu0, alpha, alternative }) {
  checkMeanModel({ mean, n, sigma });
  if (!Number.isFinite(mu0) || !(alpha > 0 && alpha < 1) || !['two-sided', 'greater', 'less'].includes(alternative)) throw new RangeError('Invalid test configuration.');
  const se = sigma / Math.sqrt(n), z = (mean - mu0) / se;
  const p = alternative === 'two-sided' ? Math.min(1, 2 * normalSF(Math.abs(z))) : alternative === 'greater' ? normalSF(z) : normalCDF(z);
  const critical = normalQuantile(1 - alpha / (alternative === 'two-sided' ? 2 : 1));
  return { z, p, se, alpha, alternative, critical, lowerCritical: alternative === 'greater' ? null : -critical, upperCritical: alternative === 'less' ? null : critical, reject: p <= alpha };
}
function generator(seed) {
  let a = seed >>> 0;
  return () => { a += 0x6D2B79F5; let t = Math.imul(a ^ (a >>> 15), 1 | a); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function repeatedIntervals({ n, sigma, confidence, trueMean = 100, count = 60, seed = 20261102 }) {
  checkMeanModel({ mean: trueMean, n, sigma });
  if (!Number.isInteger(count) || count < 1 || count > 1000) throw new RangeError('Count must be from 1 to 1000.');
  const random = generator(seed), se = sigma / Math.sqrt(n);
  return Array.from({ length: count }, (_, index) => {
    const mean = trueMean + se * normalQuantile(Math.max(Number.EPSILON, Math.min(1 - Number.EPSILON, random())));
    const ci = confidenceInterval({ mean, n, sigma, confidence });
    return { ...ci, index, contains: ci.lower <= trueMean && trueMean <= ci.upper };
  });
}

const fmt = (x, digits = 3) => Number(x).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
const probability = p => p === 0 ? '≈ 0 (수치 정밀도 미만)' : p < .0001 ? p.toExponential(3) : p.toFixed(5);
const esc = s => String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num = x => Number(x).toFixed(2);
function svgFrame(svg, title, description, content, height = 280) {
  svg.setAttribute('viewBox', `0 0 640 ${height}`);
  svg.innerHTML = `<title>${esc(title)}</title><desc>${esc(description)}</desc>${content}`;
}
function curveGeometry() {
  const x = z => 42 + (z + 4.5) / 9 * 556;
  const y = density => 202 - density / .4 * 150;
  const area = (lo, hi) => {
    lo = Math.max(-4.5, lo); hi = Math.min(4.5, hi);
    if (!(lo < hi)) return '';
    const steps = Math.max(3, Math.ceil((hi - lo) * 35));
    const points = Array.from({ length: steps + 1 }, (_, i) => { const z = lo + (hi - lo) * i / steps; return `${num(x(z))},${num(y(normalPDF(z)))}`; });
    return `M${num(x(lo))},202 L${points.join(' L')} L${num(x(hi))},202 Z`;
  };
  const curve = Array.from({ length: 241 }, (_, i) => { const z = -4.5 + i * 9 / 240; return `${i ? 'L' : 'M'}${num(x(z))},${num(y(normalPDF(z)))}`; }).join(' ');
  const axis = `<line x1="42" x2="598" y1="202" y2="202" class="ig-axis-line"/>${[-4,-2,0,2,4].map(z => `<line x1="${x(z)}" x2="${x(z)}" y1="202" y2="210" class="ig-axis-line"/><text x="${x(z)}" y="239" text-anchor="middle" class="ig-tick">${z}</text>`).join('')}<text x="320" y="273" text-anchor="middle" class="ig-axis-title">z · 표준화된 값 (Standardized Value)</text>`;
  return { x, y, area, curve, axis };
}
function drawTest(svg, test, kind) {
  const g = curveGeometry(), areas = [], thresholds = [];
  const pPlot = kind === 'p';
  if (pPlot) {
    if (test.alternative === 'two-sided') areas.push([-Infinity, -Math.abs(test.z)], [Math.abs(test.z), Infinity]);
    else if (test.alternative === 'greater') areas.push([test.z, Infinity]);
    else areas.push([-Infinity, test.z]);
  } else {
    if (test.lowerCritical !== null) { areas.push([-Infinity, test.lowerCritical]); thresholds.push(test.lowerCritical); }
    if (test.upperCritical !== null) { areas.push([test.upperCritical, Infinity]); thresholds.push(test.upperCritical); }
  }
  const observed = Math.max(-4.5, Math.min(4.5, test.z));
  const outside = Math.abs(test.z) > 4.5;
  const shade = areas.map(([lo, hi]) => `<path d="${g.area(lo, hi)}" class="${pPlot ? 'ig-p-area' : 'ig-reject-area'}"/>`).join('');
  const cuts = thresholds.map(c => `<line x1="${g.x(c)}" x2="${g.x(c)}" y1="${g.y(normalPDF(c))}" y2="202" class="ig-critical"/><text x="${g.x(c)}" y="${Math.max(64,g.y(normalPDF(c))-16)}" text-anchor="middle" class="ig-critical-label">${c > 0 ? '+' : '−'}${fmt(Math.abs(c),3)}</text>`).join('');
  const marker = `<line x1="${g.x(observed)}" x2="${g.x(observed)}" y1="36" y2="202" class="ig-observed"/><circle cx="${g.x(observed)}" cy="202" r="5" fill="#234f88"/><text x="${g.x(observed)}" y="24" text-anchor="${observed > 3 ? 'end' : observed < -3 ? 'start' : 'middle'}" class="ig-marker-label">${outside ? (test.z > 0 ? '→ ' : '← ') : ''}z = ${fmt(test.z, 2)}</text>`;
  const title = pPlot ? '관측 결과로 계산한 p값 면적' : '미리 정한 유의수준과 기각역';
  svgFrame(svg, title, `${title}. 파란 선은 검정통계량 ${test.z}. ${pPlot ? `초록 면적의 전체 확률은 ${test.p}` : `주황 기각역의 전체 확률은 ${test.alpha}`}.${outside ? ' 검정통계량이 표시 범위 밖에 있어 가장자리 화살표로 표시했습니다.' : ''}`, `${shade}<path d="${g.curve}" class="ig-density"/>${cuts}${marker}${g.axis}`);
}
function drawInterval(svg, ci) {
  const trueMean = 100, extent = Math.max(12, Math.abs(ci.mean - trueMean) + ci.margin + 2), left = trueMean - extent, right = trueMean + extent;
  const x = v => 55 + (v - left) / (right - left) * 530;
  const ticks = [left, trueMean, right];
  svgFrame(svg, '현재 표본의 양측 신뢰구간', `표본평균 ${ci.mean}, 신뢰구간 하한 ${ci.lower}, 상한 ${ci.upper}. 교육용 모집단의 고정된 모평균은 100.`, `<rect x="${x(ci.lower)}" y="91" width="${x(ci.upper)-x(ci.lower)}" height="40" rx="6" class="ig-ci-band"/><line x1="${x(trueMean)}" x2="${x(trueMean)}" y1="43" y2="176" class="ig-true"/><text x="${x(trueMean)}" y="28" text-anchor="middle" class="ig-marker-label">고정된 μ = 100</text><line x1="${x(ci.lower)}" x2="${x(ci.upper)}" y1="111" y2="111" class="ig-interval"/><line x1="${x(ci.lower)}" x2="${x(ci.lower)}" y1="93" y2="129" class="ig-interval"/><line x1="${x(ci.upper)}" x2="${x(ci.upper)}" y1="93" y2="129" class="ig-interval"/><circle cx="${x(ci.mean)}" cy="111" r="7" fill="#234f88"/><text x="${x(ci.mean)}" y="79" text-anchor="middle" class="ig-marker-label">x̄ = ${fmt(ci.mean,2)}</text><text x="${x(ci.lower)}" y="158" text-anchor="middle" class="ig-tick">${fmt(ci.lower,2)}</text><text x="${x(ci.upper)}" y="${x(ci.upper)-x(ci.lower)<130 ? 180 : 158}" text-anchor="middle" class="ig-tick">${fmt(ci.upper,2)}</text><line x1="55" x2="585" y1="190" y2="190" class="ig-axis-line"/>${ticks.map(v=>`<text x="${x(v)}" y="221" text-anchor="middle" class="ig-tick">${fmt(v,1)}</text>`).join('')}<text x="320" y="257" text-anchor="middle" class="ig-axis-title">평균의 값 (Mean Value)</text>`);
}
function drawRepeated(svg, intervals) {
  const trueMean = 100, extent = Math.max(12, Math.max(...intervals.flatMap(ci=>[Math.abs(ci.lower-trueMean),Math.abs(ci.upper-trueMean)]))*1.08);
  const x = v => 65 + (v - (trueMean-extent)) / (2*extent) * 510;
  const height = 570, y = i => 48 + i * 7.7;
  const covered = intervals.filter(ci=>ci.contains).length;
  const items = intervals.map(ci=>`<g class="${ci.contains ? 'ig-covered' : 'ig-missed'}"><line x1="${x(ci.lower)}" x2="${x(ci.upper)}" y1="${y(ci.index)}" y2="${y(ci.index)}"/><circle cx="${x(ci.mean)}" cy="${y(ci.index)}" r="2.4"/></g>`).join('');
  svgFrame(svg, '반복표집한 60개 신뢰구간', `고정된 모평균 100을 포함하는 신뢰구간은 60개 중 ${covered}개입니다. 포함하지 않는 구간은 주황 점선이며 표본평균을 빈 원으로 표시했습니다.`, `<line x1="${x(trueMean)}" x2="${x(trueMean)}" y1="32" y2="${y(59)+12}" class="ig-true"/><text x="${x(trueMean)}" y="22" text-anchor="middle" class="ig-marker-label">μ = 100</text>${items}<line x1="65" x2="575" y1="529" y2="529" class="ig-axis-line"/>${[-1,0,1].map(t=>`<text x="${x(trueMean+t*extent)}" y="558" text-anchor="middle" class="ig-tick">${fmt(trueMean+t*extent,2)}</text>`).join('')}`, height);
}

function mount() {
  const root = document.querySelector('[data-inference-lab]');
  if (!root) return;
  const state = { mean:105, n:36, sigma:12, confidence:.95, mu0:100, alpha:.05, alternative:'two-sided' };
  // Keep controls beside the graph they change; shared values stay synchronized.
  const original = root.querySelector('.ig-controls-grid');
  const ciControls = document.createElement('div'); ciControls.className = 'ig-local-controls';
  const testControls = document.createElement('div'); testControls.className = 'ig-local-controls';
  const shared = document.createElement('details'); shared.className = 'ig-shared-controls';
  const sharedSummary = document.createElement('summary'); sharedSummary.textContent = '표본 조건 바꾸기 (x̄ · n · σ)';
  const sharedGroup = document.createElement('div'); sharedGroup.className = 'ig-shared-group';
  shared.append(sharedSummary,sharedGroup); testControls.append(shared);
  const narrow = window.matchMedia('(max-width:700px)');
  shared.open = !narrow.matches;
  narrow.addEventListener('change', () => { shared.open = !narrow.matches; });
  const originalControls = [...original.children];
  originalControls.slice(0,4).forEach(control => ciControls.append(control));
  originalControls.slice(0,3).forEach(control => {
    const copy = control.cloneNode(true);
    copy.querySelectorAll('[id]').forEach(el => { el.id += '-test'; });
    copy.querySelectorAll('label[for]').forEach(el => { el.htmlFor += '-test'; });
    sharedGroup.append(copy);
  });
  originalControls.slice(4).forEach(control => testControls.append(control));
  original.remove();
  const ciLayout = root.querySelector('.ig-ci-layout');
  const ciWorkbench = document.createElement('div'); ciWorkbench.className = 'ig-workbench';
  ciLayout.replaceWith(ciWorkbench); ciWorkbench.append(ciControls, ciLayout);
  const testStage = document.createElement('div'); testStage.className = 'ig-test-stage';
  const testWorkbench = document.createElement('div'); testWorkbench.className = 'ig-workbench';
  root.querySelector('.ig-hypotheses').before(testWorkbench);
  testWorkbench.append(testControls,testStage);
  ['.ig-hypotheses','.ig-test-metrics','.ig-test-charts','#ig-graph-outside','.ig-decision'].forEach(selector => testStage.append(root.querySelector(selector)));
  const syncControls = (name, active = null) => {
    root.querySelectorAll(`[data-number="${name}"],[data-range="${name}"]`).forEach(el => { if (el !== active) el.value = state[name]; });
  };
  const out = (id, text) => { root.querySelector(`#${id}`).textContent = text; };
  const readState = () => {
    for (const name of Object.keys(state)) {
      const el = root.querySelector(`[data-number="${name}"]`);
      if (el && el.value !== '' && el.checkValidity()) state[name] = +el.value;
    }
    state.alternative = root.querySelector('#ig-alternative').value;
  };
  const render = () => {
    const ci = confidenceInterval(state), test = hypothesisTest(state), repeat = repeatedIntervals(state);
    out('ig-se', fmt(ci.se)); out('ig-ci-result', `[${fmt(ci.lower)}, ${fmt(ci.upper)}]`);
    out('ig-ci-width', fmt(ci.width)); out('ig-ci-critical', fmt(ci.critical));
    out('ig-z-result', fmt(test.z)); out('ig-p-result', probability(test.p));
    out('ig-alpha-result', probability(test.alpha));
    out('ig-test-decision', test.reject ? '귀무가설 기각 (Reject H₀)' : '귀무가설 기각하지 못함 (Fail to Reject H₀)');
    out('ig-comparison', `p = ${probability(test.p)} ${test.reject ? '≤' : '>'} α = ${probability(test.alpha)}`);
    const nullDirection = state.alternative === 'greater' ? '≤' : state.alternative === 'less' ? '≥' : '=';
    out('ig-null', `H₀: μ ${nullDirection} ${fmt(state.mu0)}`);
    const direction = state.alternative === 'greater' ? '>' : state.alternative === 'less' ? '<' : '≠';
    out('ig-alternative-text', `H₁: μ ${direction} ${fmt(state.mu0)}`);
    out('ig-critical-text', state.alternative === 'two-sided' ? `z ≤ −${fmt(test.critical)} 또는 z ≥ ${fmt(test.critical)}` : state.alternative === 'greater' ? `z ≥ ${fmt(test.critical)}` : `z ≤ −${fmt(test.critical)}`);
    out('ig-reject-area-text', state.alternative === 'two-sided' ? `양쪽 꼬리에 각각 α/2 = ${probability(state.alpha/2)}. 합계는 α = ${probability(state.alpha)}.` : `${state.alternative === 'greater' ? '오른쪽' : '왼쪽'} 꼬리 전체가 α = ${probability(state.alpha)}.`);
    out('ig-p-area-text', state.alternative === 'two-sided' ? `|Z| ≥ |${fmt(test.z)}|인 양쪽 면적의 합입니다.` : state.alternative === 'greater' ? `Z ≥ ${fmt(test.z)}인 오른쪽 면적입니다.` : `Z ≤ ${fmt(test.z)}인 왼쪽 면적입니다.`);
    out('ig-ci-note', `${fmt(state.confidence*100,1)}% 신뢰구간의 폭은 ${fmt(ci.width)}입니다. x̄를 바꾸면 중심이 이동하고, n을 늘리면 폭이 줄며, σ 또는 신뢰수준을 높이면 폭이 커집니다.`);
    out('ig-coverage', `${repeat.filter(ci=>ci.contains).length} / 60`);
    out('ig-repeat-note', `같은 규칙으로 만든 60개 구간 중 ${repeat.filter(ci=>ci.contains).length}개가 고정된 μ = 100을 포함했습니다. 이 한 묶음의 비율이 정확히 ${fmt(state.confidence*100,1)}%일 필요는 없습니다.`);
    const equivalent = confidenceInterval({ ...state, confidence: 1-state.alpha });
    out('ig-equivalence', state.alternative === 'two-sided' ? `현재 α = ${fmt(state.alpha)}와 대응하는 ${fmt((1-state.alpha)*100,1)}% 양측 신뢰구간은 [${fmt(equivalent.lower)}, ${fmt(equivalent.upper)}]입니다. μ₀ = ${fmt(state.mu0)}${test.reject ? '은 이 구간 밖에 있어 양측검정에서도 기각합니다.' : '은 이 구간 안에 있어 양측검정에서도 기각하지 못합니다.'}` : '단측검정은 단측 신뢰한계(One-sided Confidence Bound)와 대응합니다. 위의 양측 신뢰구간을 그대로 단측검정의 기각 기준으로 쓰지 마세요.');
    drawInterval(root.querySelector('#ig-ci-chart'), ci);
    drawRepeated(root.querySelector('#ig-repeat-chart'), repeat);
    drawTest(root.querySelector('#ig-alpha-chart'), test, 'alpha');
    drawTest(root.querySelector('#ig-p-chart'), test, 'p');
    root.querySelector('#ig-graph-outside').hidden = Math.abs(test.z) <= 4.5;
    root.querySelector('#ig-graph-outside').textContent = `검정통계량 z = ${fmt(test.z)}은 가로축 범위 −4.5~4.5 밖에 있습니다. 파란 화살표가 방향을 표시하며, p값과 판단은 실제 값으로 계산했습니다.`;
  };
  root.querySelectorAll('[data-number]').forEach(input => input.addEventListener('input', () => {
    if (!input.checkValidity() || input.value === '') return;
    const name = input.dataset.number; state[name] = +input.value;
    syncControls(name,input);
    render();
  }));
  root.querySelectorAll('[data-range]').forEach(input => input.addEventListener('input', () => {
    const name = input.dataset.range; state[name] = +input.value;
    syncControls(name);
    render();
  }));
  root.querySelector('#ig-alternative').addEventListener('change', () => { readState(); render(); });
  root.querySelector('#ig-sync').addEventListener('click', () => {
    state.confidence = +(1-state.alpha).toFixed(4);
    for (const el of root.querySelectorAll('[data-number="confidence"],[data-range="confidence"]')) el.value = state.confidence;
    render();
  });
  root.querySelector('#ig-reset').addEventListener('click', () => {
    Object.assign(state,{mean:105,n:36,sigma:12,confidence:.95,mu0:100,alpha:.05,alternative:'two-sided'});
    for (const name of Object.keys(state)) for(const el of root.querySelectorAll(`[data-number="${name}"],[data-range="${name}"]`)) el.value=state[name];
    root.querySelector('#ig-alternative').value=state.alternative;
    render();
  });
  render();
  root.querySelector('#ig-status').textContent = '그래프가 준비됐습니다. 값을 바꾸면 즉시 다시 계산합니다.';
}
if (typeof document !== 'undefined') mount();
