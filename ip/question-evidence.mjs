import {EVIDENCE} from './question-evidence-data.mjs?v=04d87329667e';

// The learner's record, editorial difficulty and external evidence are separate.
export {EVIDENCE};
export function questionEvidence(id){
 if(!Object.hasOwn(EVIDENCE.questions,id))throw new Error('Unmapped question evidence: '+id);
 const mapping=EVIDENCE.questions[id];
 return {mapping,error:mapping.error?EVIDENCE.errors[mapping.error]:null,frequency:mapping.frequency?EVIDENCE.frequencies[mapping.frequency]:null};
}
export function matchesEvidence(id,{error='all',frequency='all'}={}){
 const e=questionEvidence(id);
 return (error==='all'||error==='linked'&&!!e.error||error==='unknown'&&!e.error)&&
  (frequency==='all'||frequency==='linked'&&!!e.frequency||frequency==='unknown'&&!e.frequency||frequency==='zero'&&e.frequency?.sessionHits===0);
}
export function normalizeEvidenceFilter(value,frequency=false){
 return ['linked','unknown',...(frequency?['zero']:[])].includes(value)?value:'all';
}
const link=(url,title,esc)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(title)} ↗</a>`;
export function evidenceMarkup(id,esc){
 const {mapping,error,frequency}=questionEvidence(id),source=frequency?EVIDENCE.sources[frequency.source]:null;
 const counts=frequency?`${frequency.sessionHits}/${frequency.sessionDenominator}회`:'';
 return `<section class="question-evidence" aria-label="외부 오답 참고와 자료 내 빈도">
  <div class="evidence-heading">외부 근거 <span>관련 유형 참고 · 이 문항의 실측값 아님</span></div>
  <dl class="evidence-stats"><div class="${error?'has-evidence':'evidence-unknown'}"><dt>외부 오답 참고</dt><dd>${error?`관련 문항 <strong>${esc(error.wrongPercent)}%</strong>${error.derived?' <small>환산값</small>':''}`:'연결 근거 미확인'}</dd></div>
  <div class="${frequency?'has-evidence':'evidence-unknown'}"><dt>수집자료 내 빈도</dt><dd>${frequency?`관련 유형군 <strong>${counts}</strong>${frequency.sessionHits===0?' <small>범위 내 미등장</small>':''}`:'집계·연결 미확인'}</dd></div></dl>
  ${frequency?`<p class="evidence-type">${esc(frequency.topic)}${EVIDENCE.course==='bigdata'?' · ML 선별 범위':' · 과거 5과목 자료'}</p>`:''}
  <details class="evidence-details"><summary>출처와 확인 범위</summary><div class="evidence-detail-body">
   <p class="evidence-dates">자료 확인·재집계 ${EVIDENCE.checkedOn}<br>우리 문항과 주제 연결 검토 ${EVIDENCE.mappedOn}</p>
   <div class="evidence-block"><h3>외부 오답 참고</h3>${error?`
    <dl><dt>출처</dt><dd>${link(error.url,error.provider+' · '+error.topic,esc)}${error.statisticsUrl!==error.url?'<br>'+link(error.statisticsUrl,'표시 오답 통계',esc):''}</dd>
    <dt>확인 범위</dt><dd>${esc(error.scope)}</dd>
    <dt>문항 연결 · 편집 판단</dt><dd>${esc(mapping.relation)}</dd></dl>`:`<p>${esc(EVIDENCE.missingError)}</p>`}</div>
   <div class="evidence-block"><h3>수집자료 내 빈도</h3>${frequency?`
    <dl><dt>출처</dt><dd>${link(source.url,source.provider,esc)}</dd>
    <dt>확인 범위</dt><dd>${esc(source.scope)}</dd>
    <dt>집계 단위</dt><dd>관련 유형군 ‘${esc(frequency.topic)}’이 1문항 이상 수록된 회차는 ${counts}, 문항 합계는 ${frequency.itemCount}개입니다. 기존 대표 유형 분류를 사용한 결과이며 모든 유사 문항을 중복 집계한 수가 아닙니다.</dd>
    <dt>문항 연결 · 편집 판단</dt><dd>우리 문항의 관련 주제를 위 유형군에 연결했습니다. 유형군 전체의 횟수이며 이 세부 개념·발문 자체의 횟수가 아닙니다. ${frequency.sessionHits===0?'0회는 이 수집·분류 범위에서 찾지 못했다는 뜻입니다. ':''}전체 시험의 출제 확률이나 다음 시험의 예상 빈도를 뜻하지 않습니다.</dd>
    <dt>회차별 수록 수</dt><dd>${Object.entries(frequency.countsBySession).map(([session,n])=>esc(session)+'회차 '+n+'개').join(' · ')||'해당 유형으로 분류된 수록 문항 없음'}${frequency.sessionHits<frequency.sessionDenominator?' · 나머지 수집 회차 0개':''}</dd></dl>`:`<p>${esc(EVIDENCE.missingFrequency)}</p>`}</div>
   <p class="evidence-limit">우리 창작 문항의 전체 이용자 오답률은 아직 수집하지 않았습니다. 내 풀이 기록은 이 브라우저의 기록이며 외부 통계와 합산하지 않습니다.</p>
  </div></details>
 </section>`;
}
export function evidenceGuide(){
 return `<div class="evidence-guide"><strong>외부 근거는 별도로 읽어요.</strong><p>‘개념·함정’은 문항을 읽고 나눈 편집 가이드입니다. ‘외부 오답 참고’는 다른 플랫폼의 관련 문항 값이고, ‘수집자료 내 빈도’는 복원자료의 관련 유형군이 등장한 회차 수입니다. 서로 다른 값이므로 합산해 난이도를 매기지 않습니다.</p><p>자료 확인·재집계 ${EVIDENCE.checkedOn} · 문항 연결 검토 ${EVIDENCE.mappedOn}. 카드와 문제의 ‘출처와 확인 범위’를 펼치면 출처, 집계 범위, 연결 이유를 따로 볼 수 있습니다. 미확인은 쉬움·저빈도를 뜻하지 않습니다.</p></div>`;
}
