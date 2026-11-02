/**
 * Pure central Student t, chi-square and F distribution functions.
 * Density definitions: NIST/SEMATECH e-Handbook, sections 1.3.6.6.4–6.
 * https://www.itl.nist.gov/div898/handbook/eda/section3/eda3664.htm
 * https://www.itl.nist.gov/div898/handbook/eda/section3/eda3665.htm
 * https://www.itl.nist.gov/div898/handbook/eda/section3/eda3666.htm
 * Incomplete beta/gamma definitions and continued fractions:
 * https://dlmf.nist.gov/8.17 and https://dlmf.nist.gov/8.9
 *
 * Formulas are evaluated in log space; the smaller tail is evaluated directly
 * rather than obtained by subtracting a nearly-one cumulative probability.
 * No browser state, randomness, external imports or network access is used.
 */

const LOG2 = Math.log(2);
const LOG_SQRT_2PI = .5 * Math.log(2 * Math.PI);
const EPS = 2e-14;
const TINY = 1e-300;
const LIMIT = 10000;
const clampProbability = x => Math.max(0, Math.min(1, x));
const nonzero = x => Math.abs(x) < TINY ? (x < 0 ? -TINY : TINY) : x;

function checkDf(...values) {
  if (values.some(x => !Number.isFinite(x) || x <= 0)) throw new RangeError('Degrees of freedom must be finite and positive.');
}

/** Natural logarithm of Γ(z), for positive real z (Lanczos, g = 7). */
export function logGamma(z) {
  checkDf(z);
  if (z < .5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  const c = [676.5203681218851, -1259.1392167224028, 771.3234287776531,
    -176.6150291621406, 12.507343278686905, -.13857109526572012,
    9.984369578019572e-6, 1.5056327351493116e-7];
  const w = z - 1;
  let sum = .99999999999980993;
  for (let i = 0; i < c.length; i++) sum += c[i] / (w + i + 1);
  const t = w + 7.5;
  return LOG_SQRT_2PI + (w + .5) * Math.log(t) - t + Math.log(sum);
}

const logBeta = (a, b) => logGamma(a) + logGamma(b) - logGamma(a + b);

// Even and odd partial numerators of the incomplete beta continued fraction.
// Modified Lentz evaluation avoids direct division by an almost-zero value.
function betaFraction(a, b, x) {
  const sum = a + b, plus = a + 1, minus = a - 1;
  let c = 1, d = 1 / nonzero(1 - sum * x / plus), result = d;
  for (let m = 1; m <= LIMIT; m++) {
    const twice = 2 * m;
    let coefficient = m * (b - m) * x / ((minus + twice) * (a + twice));
    d = 1 / nonzero(1 + coefficient * d);
    c = nonzero(1 + coefficient / c);
    result *= d * c;
    coefficient = -(a + m) * (sum + m) * x / ((a + twice) * (plus + twice));
    d = 1 / nonzero(1 + coefficient * d);
    c = nonzero(1 + coefficient / c);
    const delta = d * c;
    result *= delta;
    if (Math.abs(delta - 1) <= EPS) return result;
  }
  throw new RangeError('Incomplete beta continued fraction did not converge.');
}

function betaDirect(x, a, b) {
  return Math.exp(a * Math.log(x) + b * Math.log1p(-x) - logBeta(a, b)) * betaFraction(a, b, x) / a;
}

function betaLowerPair(x, complement, a, b) {
  if (x <= 0) return 0;
  if (x >= 1 && complement <= 0) return 1;
  if (x <= (a + 1) / (a + b + 2)) return clampProbability(betaDirect(x, a, b));
  return clampProbability(1 - betaDirect(complement, b, a));
}

const betaLower = (x, a, b) => betaLowerPair(x, 1 - x, a, b);

function gammaSeries(a, x) {
  let term = 1 / a, sum = term;
  for (let n = 1; n <= LIMIT; n++) {
    term *= x / (a + n);
    sum += term;
    if (Math.abs(term) <= Math.abs(sum) * EPS) return clampProbability(Math.exp(a * Math.log(x) - x - logGamma(a)) * sum);
  }
  throw new RangeError('Incomplete gamma series did not converge.');
}

function gammaUpperFraction(a, x) {
  let b = x + 1 - a, c = 1 / TINY, d = 1 / nonzero(b), result = d;
  for (let n = 1; n <= LIMIT; n++) {
    const coefficient = -n * (n - a);
    b += 2;
    d = 1 / nonzero(coefficient * d + b);
    c = nonzero(b + coefficient / c);
    const delta = d * c;
    result *= delta;
    if (Math.abs(delta - 1) <= EPS) return clampProbability(Math.exp(a * Math.log(x) - x - logGamma(a)) * result);
  }
  throw new RangeError('Incomplete gamma continued fraction did not converge.');
}

function gammaLower(a, x) {
  if (x <= 0) return 0;
  if (x === Infinity) return 1;
  return x < a + 1 ? gammaSeries(a, x) : clampProbability(1 - gammaUpperFraction(a, x));
}

function gammaUpper(a, x) {
  if (x <= 0) return 1;
  if (x === Infinity) return 0;
  return x >= a + 1 ? gammaUpperFraction(a, x) : clampProbability(1 - gammaSeries(a, x));
}

export function tPDF(x, df) {
  checkDf(df);
  if (Number.isNaN(x)) return NaN;
  if (!Number.isFinite(x)) return 0;
  return Math.exp(logGamma((df + 1) / 2) - logGamma(df / 2) - .5 * Math.log(df * Math.PI)
    - (df + 1) / 2 * Math.log1p(x * x / df));
}

export function tSF(x, df) {
  checkDf(df);
  if (Number.isNaN(x)) return NaN;
  if (x === Infinity) return 0;
  if (x === -Infinity) return 1;
  if (x === 0) return .5;
  if (Math.abs(x) < 1) {
    const square = x * x;
    const central = .5 * betaLower(square / (df + square), .5, df / 2);
    return x > 0 ? .5 - central : .5 + central;
  }
  const tail = .5 * betaLower(df / (df + x * x), df / 2, .5);
  return x > 0 ? tail : 1 - tail;
}

export function tCDF(x, df) {
  return tSF(-x, df);
}

export function chiSquarePDF(x, df) {
  checkDf(df);
  if (Number.isNaN(x)) return NaN;
  if (x < 0 || x === Infinity) return 0;
  if (x === 0) return df < 2 ? Infinity : df === 2 ? .5 : 0;
  const half = df / 2;
  return Math.exp((half - 1) * Math.log(x) - x / 2 - half * LOG2 - logGamma(half));
}

export function chiSquareCDF(x, df) {
  checkDf(df);
  return Number.isNaN(x) ? NaN : gammaLower(df / 2, x / 2);
}

export function chiSquareSF(x, df) {
  checkDf(df);
  return Number.isNaN(x) ? NaN : gammaUpper(df / 2, x / 2);
}

export function fPDF(x, df1, df2) {
  checkDf(df1, df2);
  if (Number.isNaN(x)) return NaN;
  if (x < 0 || x === Infinity) return 0;
  if (x === 0) return df1 < 2 ? Infinity : df1 === 2 ? 1 : 0;
  const a = df1 / 2, b = df2 / 2, ratio = df1 / df2;
  return Math.exp(a * Math.log(ratio) + (a - 1) * Math.log(x) - logBeta(a, b)
    - (a + b) * Math.log1p(ratio * x));
}

export function fCDF(x, df1, df2) {
  checkDf(df1, df2);
  if (Number.isNaN(x)) return NaN;
  if (x <= 0) return 0;
  if (x === Infinity) return 1;
  const ratio = df1 / df2 * x;
  // Supply both beta arguments directly. Subtracting either from one loses
  // digits for extreme F values, especially when the df are fractional.
  return betaLowerPair(ratio === Infinity ? 1 : ratio / (1 + ratio), 1 / (1 + ratio), df1 / 2, df2 / 2);
}

export function fSF(x, df1, df2) {
  checkDf(df1, df2);
  if (Number.isNaN(x)) return NaN;
  if (x <= 0) return 1;
  if (x === Infinity) return 0;
  const ratio = df1 / df2 * x;
  return betaLowerPair(1 / (1 + ratio), ratio === Infinity ? 1 : ratio / (1 + ratio), df2 / 2, df1 / 2);
}

function checkProbability(p) {
  if (!Number.isFinite(p) || p < 0 || p > 1) throw new RangeError('Cumulative probability must be between zero and one.');
}

// Bracket and bisect on the smaller probability tail. Relative x convergence
// is essential for tiny lower chi-square quantiles (e.g. df = .5).
function bisectPositive(beforeTarget, initial) {
  let low = 0, high = Math.max(1, initial);
  for (let n = 0; beforeTarget(high); n++) {
    low = high;
    high *= 2;
    if (!Number.isFinite(high)) return Infinity;
    if (n > 1024) throw new RangeError('Quantile bracket not found.');
  }
  for (let n = 0; n < 256; n++) {
    const mid = low + (high - low) / 2;
    if (mid === low || mid === high) break;
    if (beforeTarget(mid)) low = mid;
    else high = mid;
    if (high - low <= 4 * Number.EPSILON * Math.max(Math.abs(low), Math.abs(high), Number.MIN_VALUE)) break;
  }
  return low + (high - low) / 2;
}

function positiveQuantile(p, cdf, sf, initial) {
  if (p === 0) return 0;
  if (p === 1) return Infinity;
  const upperTail = p > .5, target = upperTail ? 1 - p : p;
  return bisectPositive(x => upperTail ? sf(x) > target : cdf(x) < target, initial);
}

export function tQuantile(p, df) {
  checkDf(df); checkProbability(p);
  if (p === 0) return -Infinity;
  if (p === 1) return Infinity;
  if (p === .5) return 0;
  // For positive t, P(T > t) is at most .5. Invert this tail directly.
  const target = p < .5 ? p : 1 - p;
  const magnitude = bisectPositive(x => tSF(x, df) > target, 1);
  return p < .5 ? -magnitude : magnitude;
}

export function chiSquareQuantile(p, df) {
  checkDf(df); checkProbability(p);
  return positiveQuantile(p, x => chiSquareCDF(x, df), x => chiSquareSF(x, df), df);
}

export function fQuantile(p, df1, df2) {
  checkDf(df1, df2); checkProbability(p);
  return positiveQuantile(p, x => fCDF(x, df1, df2), x => fSF(x, df1, df2), 1);
}
