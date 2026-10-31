export const KINDS=new Set(['single-choice','multiple-choice','short-answer','numeric']);
const safeId=x=>typeof x==='string'&&/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/.test(x)&&!['constructor','prototype','__proto__'].includes(x);
export function validateQuestion(q,topics){
 if(!q||!safeId(q.id)||!Number.isSafeInteger(q.revision)||q.revision<1||!KINDS.has(q.kind))throw Error('문항 ID·개정·유형을 확인하세요.');
 if(!Array.isArray(q.topicIds)||!q.topicIds.length||q.topicIds.some(x=>!topics.has(x)))throw Error('연결 이론을 확인하세요.');
 if(typeof q.stem!=='string'||!q.stem.trim()||typeof q.givens!=='string'||typeof q.solution!=='string'||!q.solution.trim())throw Error('문제 조건·발문·풀이가 필요합니다.');
 if(q.kind.endsWith('choice')){
  if(!Array.isArray(q.choices)||q.choices.length<2||q.choices.some(c=>!safeId(c.id)||typeof c.text!=='string'||!c.text.trim()||typeof c.explanation!=='string'||!c.explanation.trim())||new Set(q.choices.map(c=>c.id)).size!==q.choices.length)throw Error('보기와 각 이유를 확인하세요.');
  const ids=q.kind==='single-choice'?[q.correctChoiceId]:q.correctChoiceIds;
  if(!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length||ids.some(id=>!q.choices.some(c=>c.id===id)))throw Error('정답 보기 ID를 확인하세요.');
 }else if(q.kind==='short-answer'){
  if(!Array.isArray(q.acceptedAnswers)||!q.acceptedAnswers.length||q.acceptedAnswers.some(a=>typeof a!=='string'||!a.trim()))throw Error('허용 답안을 확인하세요.');
 }else if(!q.correctAnswer||!Number.isFinite(q.correctAnswer.value)||!Number.isFinite(q.correctAnswer.absoluteTolerance??0)||(q.correctAnswer.absoluteTolerance??0)<0||!Number.isFinite(q.correctAnswer.relativeTolerance??0)||(q.correctAnswer.relativeTolerance??0)<0)throw Error('숫자 정답과 허용 오차를 확인하세요.');
 return q;
}
export function grade(q,answer){
 if(q.kind==='single-choice')return typeof answer==='string'&&answer===q.correctChoiceId;
 if(q.kind==='multiple-choice')return Array.isArray(answer)&&new Set(answer).size===answer.length&&answer.length===q.correctChoiceIds.length&&answer.every(x=>q.correctChoiceIds.includes(x));
 if(q.kind==='short-answer'){
  if(typeof answer!=='string')return false;
  const normal=x=>{let s=x.trim();if(q.normalization?.collapseWhitespace)s=s.replace(/\s+/g,' ');if(q.normalization?.caseInsensitive)s=s.toLowerCase();return s};
  return q.acceptedAnswers.some(x=>normal(x)===normal(answer));
 }
 if(typeof answer!=='number'||!Number.isFinite(answer))return false;
 return Math.abs(answer-q.correctAnswer.value)<=Math.max(q.correctAnswer.absoluteTolerance??0,(q.correctAnswer.relativeTolerance??0)*Math.abs(q.correctAnswer.value));
}
export function isAnswered(q,answer){return q.kind==='multiple-choice'?Array.isArray(answer)&&answer.length>0:q.kind==='numeric'?typeof answer==='number'&&Number.isFinite(answer):typeof answer==='string'&&answer.trim().length>0}
export function answerLabel(q){return q.kind==='single-choice'?q.choices.find(c=>c.id===q.correctChoiceId).text:q.kind==='multiple-choice'?q.choices.filter(c=>q.correctChoiceIds.includes(c.id)).map(c=>c.text).join(' / '):q.kind==='short-answer'?q.acceptedAnswers.join(' / '):String(q.correctAnswer.value)+(q.unit?' '+q.unit:'')}
export function filterIndex(index,{subject,topic,origin,year,query}={}){return index.filter(q=>q.status==='verified'&&(!subject||String(q.subject)===String(subject))&&(!topic||q.topicIds.includes(topic))&&(!origin||q.origin===origin)&&(!year||String(q.sourceExamYear)===String(year))&&(!query||`${q.id} ${q.title} ${q.tags?.join(' ')??''}`.toLowerCase().includes(query.toLowerCase())))}
