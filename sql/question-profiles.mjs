/** Learning-demand assessment, 2026-11-20. Not observed error rates or exam frequency.
 * Concept: direct rule / linked conditions / multi-step reasoning.
 * Trap: direct application / close alternatives / boundary or misleading assumption.
 * Reviewed against each existing question's inputs, choices and explanation.
 * Stable question IDs and grading data are intentionally untouched.
 */
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

// Independent axes: a short, single-concept question can still have a strong trap.
const assessment={
 'S1-TH33-01':[1,1], 'S1-TH33-02':[2,2], 'S1-TH33-03':[1,2],
 'S1-TH34-01':[1,1], 'S1-TH34-02':[1,3], 'S1-TH34-03':[2,1], 'S1-TH34-04':[2,3],
 'S1-TH35-01':[2,2], 'S1-TH35-02':[1,2], 'S1-TH35-03':[2,3], 'S1-TH35-04':[2,3],
 'S1-TH36-01':[1,1], 'S1-TH36-02':[1,2], 'S1-TH36-03':[1,3], 'S1-TH36-04':[2,3],
 'S1-TH37-01':[2,2], 'S1-TH37-02':[2,3], 'S1-TH37-03':[2,2], 'S1-TH37-04':[2,2],
 'S1-TH38-01':[2,2], 'S1-TH38-02':[3,3], 'S1-TH38-03':[2,2], 'S1-TH38-04':[3,2],
 'S1-TH39-01':[1,3], 'S1-TH39-02':[2,1], 'S1-TH39-03':[2,2], 'S1-TH39-04':[2,3],
 'S1-TH40-01':[1,1], 'S1-TH40-02':[1,2], 'S1-TH40-03':[2,3], 'S1-TH40-04':[2,3],
 'E001':[1,2], 'S2-E001-empty-count':[2,3], 'S2-E001-null-count':[1,3], 'S2-E001-zero-count':[2,2],
 'E025':[2,3], 'S2-E025-coalesce-position':[3,3], 'S2-E025-empty-sum':[1,3],
 'E004':[2,2], 'S2-E004-count-null-extension':[2,3], 'S2-E004-empty-right':[1,2],
 'E016':[3,3], 'S2-E016-on-where-no-match':[3,3], 'S2-E016-or-null-repair':[3,3],
 'E019':[2,3], 'S2-E019-false-unknown':[3,3], 'S2-E019-not-exists-null':[2,3],
 'E026':[3,3], 'S2-E026-default-frame':[3,3], 'S2-E026-range-unique':[3,2],
 'E002':[1,3], 'S2-E002-not-equal-null':[1,3], 'S2-E002-zero-not-null':[1,1],
 'E011':[1,2], 'S2-E011-distinct-projection':[1,1], 'S2-E011-distinct-unique-key':[2,3],
 'E005':[1,2], 'S2-E005-union-equal-condition':[2,2], 'S2-E005-union-internal-duplicate':[2,3],
 'E003':[2,2], 'S2-E003-where-before-group':[2,3], 'S2-E003-where-then-having':[3,3],
 'E018':[1,3], 'S2-E018-exists-empty':[1,3], 'S2-E018-exists-missing-correlation':[2,3],
 'E021':[1,2], 'S2-E021-rank-all-peers':[1,2], 'S2-E021-rank-unique-order':[2,3],
 'S2-TH-05-having-removes-global-row':[3,3], 'S2-TH-05-list-versus-aggregate':[2,3],
 'S2-TH-15-not-exists-unmatched':[2,1], 'S2-TH-15-semi-join-multiplicity':[2,3],
 'S2-TH-16-oracle-scalar-multirow':[1,2], 'S2-TH-16-scalar-no-row':[2,3],
 'S2-TH-21-group-columns-order':[1,2], 'S2-TH-21-group-output-order':[2,1],
 'S2-TH-22-cube-extra-subtotal':[3,2], 'S2-TH-22-cube-same-values-different-levels':[3,3], 'S2-TH-22-rollup-levels':[2,2],
 'S2-TH-23-grouping-flag-not-null-test':[3,3], 'S2-TH-23-original-null-versus-total':[2,3],
 'S2-TH-28-partition-membership':[2,1], 'S2-TH-28-partition-versus-group':[2,2],
 'S2-TH-31-lag-lead-boundaries':[1,1], 'S2-TH-31-navigation-order-change':[3,2],
 'S2-TH-32-parent-child-direction':[2,2], 'S2-TH-32-reparent-edge':[2,1], 'S2-TH-32-root-parent-null':[2,3],
 'S2-TH-41-check-known-false':[1,1], 'S2-TH-41-check-plus-not-null':[2,2], 'S2-TH-41-check-unknown':[2,3],
 'S2-TH-42-explicit-null-versus-space':[1,2], 'S2-TH-42-oracle-empty-string-count':[2,3], 'S2-TH-42-space-length':[1,1],
 'S2-TH-43-duplicate-not-null':[1,2], 'S2-TH-43-null-key-constraints':[2,2], 'S2-TH-43-unique-does-not-imply-primary':[2,3],
 'S2-TH-44-delete-all-not-truncate':[2,3], 'S2-TH-44-delete-rollback-restores':[2,1], 'S2-TH-44-oracle-truncate-rollback':[2,3],
 'S2-TH-45-nested-savepoint':[3,3], 'S2-TH-45-oracle-commit-boundary':[3,3], 'S2-TH-45-savepoint-before-both':[2,2],
};
export const QUESTION_PROFILES=Object.freeze(Object.fromEntries(Object.entries(assessment).map(([code,[concept,trap]])=>[code,Object.freeze({concept,trap,examFrequency:null})])));
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
