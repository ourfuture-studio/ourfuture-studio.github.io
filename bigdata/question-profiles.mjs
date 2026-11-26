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
 "1-02": [
  1,
  1
 ],
 "1-03": [
  1,
  1
 ],
 "1-04": [
  1,
  2
 ],
 "1-05": [
  2,
  1
 ],
 "1-06": [
  1,
  1
 ],
 "1-07": [
  1,
  3
 ],
 "1-09": [
  2,
  1
 ],
 "1-10": [
  2,
  2
 ],
 "1-12": [
  1,
  2
 ],
 "1-13": [
  1,
  2
 ],
 "1-16": [
  1,
  3
 ],
 "1-17": [
  1,
  2
 ],
 "1-18": [
  1,
  1
 ],
 "1-19": [
  2,
  3
 ],
 "1-20": [
  2,
  3
 ],
 "1-21": [
  1,
  1
 ],
 "1-22": [
  3,
  3
 ],
 "1-24": [
  1,
  1
 ],
 "1-26": [
  1,
  1
 ],
 "1-27": [
  1,
  2
 ],
 "1-28": [
  1,
  2
 ],
 "1-29": [
  1,
  2
 ],
 "2-01": [
  2,
  3
 ],
 "2-02": [
  2,
  3
 ],
 "2-03": [
  2,
  3
 ],
 "2-04": [
  1,
  2
 ],
 "2-05": [
  1,
  2
 ],
 "2-07": [
  1,
  3
 ],
 "2-08": [
  2,
  3
 ],
 "2-12": [
  1,
  1
 ],
 "2-13": [
  1,
  2
 ],
 "2-14": [
  1,
  1
 ],
 "2-15": [
  1,
  2
 ],
 "2-16": [
  1,
  1
 ],
 "2-17": [
  1,
  1
 ],
 "2-19": [
  1,
  2
 ],
 "2-21": [
  1,
  3
 ],
 "2-22": [
  2,
  3
 ],
 "2-23": [
  2,
  2
 ],
 "2-24": [
  2,
  3
 ],
 "2-25": [
  2,
  2
 ],
 "2-26": [
  1,
  3
 ],
 "2-28": [
  3,
  3
 ],
 "2-31": [
  1,
  2
 ],
 "2-32": [
  2,
  3
 ],
 "2-33": [
  2,
  3
 ],
 "2-34": [
  2,
  2
 ],
 "2-35": [
  3,
  2
 ],
 "2-36": [
  2,
  3
 ],
 "2-37": [
  1,
  1
 ],
 "2-38": [
  2,
  3
 ],
 "3-01": [
  2,
  3
 ],
 "3-03": [
  2,
  2
 ],
 "3-05": [
  2,
  2
 ],
 "3-06": [
  2,
  3
 ],
 "3-07": [
  1,
  1
 ],
 "3-08": [
  2,
  2
 ],
 "3-09": [
  3,
  2
 ],
 "3-10": [
  2,
  3
 ],
 "3-11": [
  1,
  2
 ],
 "3-12": [
  3,
  3
 ],
 "3-13": [
  2,
  2
 ],
 "3-14": [
  1,
  2
 ],
 "3-15": [
  2,
  2
 ],
 "3-16": [
  3,
  3
 ],
 "3-20": [
  3,
  3
 ],
 "3-21": [
  2,
  2
 ],
 "3-22": [
  1,
  1
 ],
 "3-23": [
  2,
  2
 ],
 "3-24": [
  2,
  2
 ],
 "3-25": [
  3,
  3
 ],
 "3-27": [
  2,
  3
 ],
 "3-28": [
  3,
  3
 ],
 "3-29": [
  2,
  2
 ],
 "3-30": [
  2,
  1
 ],
 "3-31": [
  1,
  2
 ],
 "3-32": [
  2,
  3
 ],
 "3-33": [
  2,
  2
 ],
 "3-34": [
  1,
  2
 ],
 "3-35": [
  2,
  2
 ],
 "3-36": [
  1,
  1
 ],
 "3-37": [
  2,
  2
 ],
 "3-38": [
  1,
  2
 ],
 "4-01": [
  3,
  3
 ],
 "4-02": [
  3,
  3
 ],
 "4-03": [
  1,
  2
 ],
 "4-04": [
  2,
  3
 ],
 "4-06": [
  2,
  3
 ],
 "4-07": [
  3,
  3
 ],
 "4-08": [
  2,
  2
 ],
 "4-14": [
  1,
  2
 ],
 "4-15": [
  3,
  3
 ],
 "4-16": [
  2,
  3
 ],
 "4-20": [
  1,
  2
 ],
 "4-21": [
  2,
  3
 ],
 "4-23": [
  2,
  2
 ],
 "4-25": [
  2,
  3
 ],
 "4-27": [
  1,
  1
 ],
 "4-28": [
  1,
  2
 ],
 "4-29": [
  2,
  3
 ],
 "4-30": [
  1,
  2
 ],
 "4-31": [
  3,
  3
 ],
 "4-32": [
  2,
  3
 ],
 "4-33": [
  2,
  3
 ],
 "4-34": [
  2,
  2
 ],
 "4-35": [
  2,
  3
 ],
 "4-36": [
  2,
  2
 ],
 "4-37": [
  1,
  2
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
