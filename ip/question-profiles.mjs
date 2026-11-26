/** Editorial concept/trap assessment, 2026-11-21. Not observed error rates or exam frequency. */
export const CONCEPT_LEVELS=Object.freeze([
 {value:1,label:'한 걸음',description:'한 가지 개념을 표나 상황에 바로 적용해요.'},
 {value:2,label:'두세 걸음',description:'둘 이상의 조건이나 개념을 연결해요.'},
 {value:3,label:'깊이 탐색',description:'여러 연산·관계·실행 단계를 끝까지 추적해요.'},
]);
export const TRAP_LEVELS=Object.freeze([
 {value:1,label:'정면 승부',description:'주어진 규칙을 차분히 적용하는 연습이에요.'},
 {value:2,label:'갈림길',description:'닮은 개념이나 보기의 차이를 구별해요.'},
 {value:3,label:'반전 주의',description:'익숙한 규칙을 그대로 적용하면 놓치기 쉬운 조건이 있어요.'},
]);

const assessment={
 "IP27-Q1-001": [
  1,
  1
 ],
 "IP27-Q1-002": [
  1,
  2
 ],
 "IP27-Q1-003": [
  2,
  3
 ],
 "IP27-Q1-004": [
  1,
  2
 ],
 "IP27-Q1-005": [
  2,
  2
 ],
 "IP27-Q1-006": [
  1,
  2
 ],
 "IP27-Q1-007": [
  2,
  3
 ],
 "IP27-Q1-008": [
  1,
  1
 ],
 "IP27-Q1-009": [
  1,
  1
 ],
 "IP27-Q1-010": [
  2,
  2
 ],
 "IP27-Q1-011": [
  1,
  2
 ],
 "IP27-Q1-012": [
  1,
  3
 ],
 "IP27-Q1-013": [
  2,
  2
 ],
 "IP27-Q1-014": [
  1,
  1
 ],
 "IP27-Q1-015": [
  1,
  1
 ],
 "IP27-Q1-016": [
  1,
  3
 ],
 "IP27-Q1-017": [
  1,
  2
 ],
 "IP27-Q1-018": [
  2,
  2
 ],
 "IP27-Q1-019": [
  1,
  1
 ],
 "IP27-Q1-020": [
  2,
  3
 ],
 "IP27-Q1-021": [
  2,
  2
 ],
 "IP27-Q1-022": [
  1,
  2
 ],
 "IP27-Q1-023": [
  1,
  1
 ],
 "IP27-Q1-024": [
  2,
  3
 ],
 "IP27-Q1-025": [
  1,
  2
 ],
 "IP27-Q1-026": [
  2,
  3
 ],
 "IP27-Q1-027": [
  3,
  3
 ],
 "IP27-Q1-028": [
  1,
  3
 ],
 "IP27-Q1-029": [
  1,
  2
 ],
 "IP27-Q1-030": [
  1,
  2
 ],
 "IP27-Q1-031": [
  2,
  3
 ],
 "IP27-Q1-032": [
  3,
  2
 ],
 "IP27-Q1-033": [
  3,
  2
 ],
 "IP27-Q1-034": [
  2,
  3
 ],
 "IP27-Q1-035": [
  2,
  2
 ],
 "IP27-Q2-001": [
  1,
  2
 ],
 "IP27-Q2-002": [
  1,
  2
 ],
 "IP27-Q2-003": [
  2,
  3
 ],
 "IP27-Q2-004": [
  1,
  2
 ],
 "IP27-Q2-005": [
  2,
  3
 ],
 "IP27-Q2-006": [
  3,
  2
 ],
 "IP27-Q2-007": [
  3,
  3
 ],
 "IP27-Q2-008": [
  1,
  1
 ],
 "IP27-Q2-009": [
  1,
  1
 ],
 "IP27-Q2-010": [
  1,
  2
 ],
 "IP27-Q2-011": [
  3,
  3
 ],
 "IP27-Q2-012": [
  2,
  3
 ],
 "IP27-Q2-013": [
  2,
  1
 ],
 "IP27-Q2-014": [
  3,
  3
 ],
 "IP27-Q2-015": [
  1,
  2
 ],
 "IP27-Q2-016": [
  2,
  3
 ],
 "IP27-Q2-017": [
  2,
  2
 ],
 "IP27-Q2-018": [
  2,
  2
 ],
 "IP27-Q2-019": [
  2,
  3
 ],
 "IP27-Q2-020": [
  2,
  2
 ],
 "IP27-Q2-021": [
  2,
  3
 ],
 "IP27-Q2-022": [
  2,
  2
 ],
 "IP27-Q2-023": [
  3,
  2
 ],
 "IP27-Q2-024": [
  3,
  2
 ],
 "IP27-Q2-025": [
  1,
  2
 ],
 "IP27-Q2-026": [
  2,
  3
 ],
 "IP27-Q2-027": [
  3,
  3
 ],
 "IP27-Q2-028": [
  2,
  3
 ],
 "IP27-Q2-029": [
  1,
  3
 ],
 "IP27-Q3-001": [
  2,
  3
 ],
 "IP27-Q3-002": [
  1,
  3
 ],
 "IP27-Q3-003": [
  1,
  2
 ],
 "IP27-Q3-004": [
  2,
  3
 ],
 "IP27-Q3-005": [
  2,
  1
 ],
 "IP27-Q3-006": [
  1,
  3
 ],
 "IP27-Q3-007": [
  1,
  2
 ],
 "IP27-Q3-008": [
  3,
  3
 ],
 "IP27-Q3-009": [
  2,
  3
 ],
 "IP27-Q3-010": [
  2,
  2
 ],
 "IP27-Q3-011": [
  1,
  2
 ],
 "IP27-Q3-012": [
  1,
  3
 ],
 "IP27-Q3-013": [
  2,
  3
 ],
 "IP27-Q3-014": [
  1,
  2
 ],
 "IP27-Q3-015": [
  1,
  1
 ],
 "IP27-Q3-016": [
  2,
  2
 ],
 "IP27-Q3-017": [
  1,
  3
 ],
 "IP27-Q3-018": [
  2,
  2
 ],
 "IP27-Q3-019": [
  1,
  2
 ],
 "IP27-Q3-020": [
  3,
  2
 ],
 "IP27-Q3-021": [
  2,
  3
 ],
 "IP27-Q3-022": [
  2,
  2
 ],
 "IP27-Q3-023": [
  3,
  2
 ],
 "IP27-Q3-024": [
  2,
  2
 ],
 "IP27-Q3-025": [
  3,
  3
 ],
 "IP27-Q3-026": [
  2,
  3
 ],
 "IP27-Q3-027": [
  2,
  3
 ],
 "IP27-Q3-028": [
  1,
  1
 ],
 "IP27-Q3-029": [
  3,
  3
 ],
 "IP27-Q3-030": [
  2,
  3
 ],
 "IP27-Q3-031": [
  1,
  3
 ],
 "IP27-Q3-032": [
  2,
  2
 ],
 "IP27-Q3-033": [
  1,
  2
 ],
 "IP27-Q3-034": [
  2,
  3
 ],
 "IP27-Q4-001": [
  1,
  2
 ],
 "IP27-Q4-002": [
  1,
  2
 ],
 "IP27-Q4-003": [
  1,
  1
 ],
 "IP27-Q4-004": [
  2,
  2
 ],
 "IP27-Q4-005": [
  1,
  3
 ],
 "IP27-Q4-006": [
  1,
  2
 ],
 "IP27-Q4-007": [
  2,
  3
 ],
 "IP27-Q4-008": [
  2,
  3
 ],
 "IP27-Q4-009": [
  2,
  3
 ],
 "IP27-Q4-010": [
  2,
  2
 ],
 "IP27-Q4-011": [
  2,
  2
 ],
 "IP27-Q4-012": [
  2,
  2
 ],
 "IP27-Q4-013": [
  2,
  3
 ],
 "IP27-Q4-014": [
  1,
  1
 ],
 "IP27-Q4-015": [
  2,
  3
 ],
 "IP27-Q4-016": [
  3,
  2
 ],
 "IP27-Q4-017": [
  3,
  3
 ],
 "IP27-Q4-018": [
  2,
  3
 ],
 "IP27-Q4-019": [
  1,
  2
 ],
 "IP27-Q4-020": [
  2,
  3
 ],
 "IP27-Q4-021": [
  2,
  2
 ],
 "IP27-Q4-022": [
  2,
  2
 ],
 "IP27-Q1-G009": [
  1,
  2
 ],
 "IP27-Q1-G010": [
  2,
  2
 ],
 "IP27-Q1-G029": [
  1,
  1
 ],
 "IP27-Q2-G010": [
  2,
  3
 ],
 "IP27-Q2-G021": [
  1,
  2
 ],
 "IP27-Q3-G026": [
  1,
  2
 ],
 "IP27-Q3-G028": [
  1,
  2
 ],
 "IP27-Q4-G003": [
  1,
  2
 ],
 "IP27-Q3-C101": [
  2,
  3
 ],
 "IP27-Q3-C102": [
  2,
  3
 ],
 "IP27-Q3-C103": [
  2,
  3
 ],
 "IP27-Q3-C104": [
  3,
  3
 ],
 "IP27-Q3-J101": [
  3,
  3
 ],
 "IP27-Q3-J102": [
  3,
  3
 ],
 "IP27-Q3-J103": [
  2,
  3
 ],
 "IP27-Q3-J104": [
  3,
  3
 ],
 "IP27-Q3-P101": [
  3,
  3
 ],
 "IP27-Q3-P102": [
  2,
  2
 ],
 "IP27-Q3-P103": [
  3,
  3
 ],
 "IP27-Q3-P104": [
  2,
  3
 ]
};
export const QUESTION_PROFILES=Object.freeze(Object.fromEntries(Object.entries(assessment).map(([id,[concept,trap]])=>[id,Object.freeze({concept,trap,examFrequency:null})])));
export const CHALLENGES=Object.freeze([
 {id:'warmup',title:'워밍업',subtitle:'차분하게 한 개념부터',concept:'1',trap:'1',description:'한 가지 규칙을 직접 적용하며 감각을 깨워요.'},
 {id:'detective',title:'함정 탐정',subtitle:'간단해 보여도 한 번 더',concept:'all',trap:'3',description:'개념이 쉬워도 답이 바뀌는 조건을 찾아요.'},
 {id:'connect',title:'연결 도전',subtitle:'생각의 고리를 끝까지',concept:'3',trap:'all',description:'중간 결과와 여러 규칙을 연결해 풀어요.'},
]);
export function questionProfile(code){
 const profile=QUESTION_PROFILES[code];
 if(!Object.hasOwn(QUESTION_PROFILES,code))throw new Error('문제의 학습 특성 분류가 필요합니다: '+code);
 return profile;
}
export const normalizeProfileLevel=value=>['1','2','3'].includes(String(value))?String(value):'all';
export function matchesProfile(code,{concept='all',trap='all'}={}){
 const profile=questionProfile(code);
 return (normalizeProfileLevel(concept)==='all'||String(profile.concept)===String(concept))&&(normalizeProfileLevel(trap)==='all'||String(profile.trap)===String(trap));
}
