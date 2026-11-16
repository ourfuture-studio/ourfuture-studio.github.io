/* Historical Qwen research role, kept distinct from any unverified current appointment. */
(function(){
 'use strict';
 const record=(window.TIMELINE_DATA||[]).find(e=>e.id==='qwen3');if(!record?.content?.article)throw Error('Load the Qwen3 research record before its person card.');
 const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
 const person={id:'junyang-lin',name:'Junyang Lin',nameKo:'린쥔양',aliases:['Lin Junyang','린준양','린 쥔양','林俊旸'],tags:['neural'],roles:['2023년 공식 행사 소개 · 당시 Qwen 팀 리더','Qwen3 기술 보고서 · 공동연구'],tagline:'긴 추론과 빠른 응답을, 같은 모델의 능력으로',intro:'언어뿐 아니라 이미지와 음성을 함께 다루는 모델을 만들려면, 어떤 표현과 학습 경험을 공유해야 할까? 린쥔양은 자연어처리·멀티모달 표현과 대규모 사전학습을 연구했고, 2023년 HKUST 공식 강연 소개에서는 Alibaba의 staff engineer이자 당시 Qwen 팀 리더로 소개됐다. 2025년 Qwen3 기술 보고서에는 An Yang·Binyuan Hui·Jingren Zhou 등을 포함한 팀과 공동저자로 참여했다. 이 기록에서는 한 모델이 길게 추론하는 응답과 곧바로 답하는 응답을 함께 익히게 한 학습 경로를 읽는다. 팀의 모델 전체를 한 사람의 단독 발명으로 해석하지 않으며, 과거 행사에 적힌 역할을 현재 직함으로 확대하지 않는다.',works:[{id:record.id,eventId:record.id,year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'팀 공동연구·기술 보고서',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content}]};
 if(profiles.some(p=>p.id===person.id))throw Error('Duplicate Junyang Lin profile.');profiles.push(person);
})();
