/** Reading connections only. Does not read, migrate or write learner progress. */
const descriptive = {
  '2-25':3, '2-26':4, '2-08':4, '4-31':5,
  '2-23':6, '2-01':6, '2-28':7, '4-33':7,
};
const inferential = {
  '2-31':1, '2-32':1, '2-37':1,
  '2-36':2, '2-02':4, '2-38':5,
  '3-03':7, '3-22':7, '4-01':7, '4-02':7,
  '4-14':8, '4-15':8,
};
export function statisticsDestination(code, prefix='') {
  if (Object.hasOwn(descriptive,code)) return {href:`${prefix}statistics/descriptive.html#section-${descriptive[code]}`,label:'기술통계(Descriptive Statistics) 흐름으로 읽기'};
  if (Object.hasOwn(inferential,code)) return {href:`${prefix}statistics/inferential.html#section-${inferential[code]}`,label:'추론통계(Inferential Statistics) 흐름으로 읽기'};
  return null;
}
export function statisticsLink(code,prefix='') {
  const target=statisticsDestination(code,prefix);
  return target?`<a class="statistics-reading-link" href="${target.href}">${target.label} ↗</a>`:'';
}
