/* Sourced researcher biographies; shared team articles retain their canonical routes. */
(function(){
 'use strict';
 const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
 const ids=['deepseek-v3','deepseek-r1'],records=ids.map(id=>(window.TIMELINE_DATA||[]).find(e=>e.id===id));
 if(records.some(e=>!e?.content?.article))throw Error('DeepSeek researcher profiles require the V3 and R1 source articles.');
 const shared=e=>({id:e.id,eventId:e.id,year:e.year,dateLabel:e.dateLabel,title:e.subtitle,summary:e.summary,type:'팀 공동연구·기술 보고서',track:e.track,people:e.people,authorNote:e.authorNote,sources:e.sources,caveat:e.caveat,content:e.content});
 for(const person of [
  {id:'daya-guo',name:'Daya Guo',nameKo:'다야 궈',aliases:['Guo Daya','郭达雅','궈다야'],tags:['neural'],roles:['코드 지능·언어모델 추론 연구','2025년 R1 v1 · Core Contributor'],tagline:'코드와 언어를 다루는 모델에서, 풀이를 배우는 모델로',intro:'문장을 자연스럽게 잇는 모델이 프로그램을 이해하고, 여러 단계의 문제도 풀게 하려면 무엇을 더 배워야 할까? 다야 궈는 자연어처리와 코드 지능을 연구했다. 중산대학교에서 컴퓨터과학을 공부하고 Microsoft Research Asia와의 공동 박사과정을 마쳤다. 코드의 구조를 표현하고 생성하는 연구에서 출발해, DeepSeek에서는 코드 지능과 언어모델의 추론을 다뤘다. 2024년 V3 보고서에는 연구·엔지니어링 기여자로, 2025년 1월 최초 R1 보고서에는 핵심 기여자로 기재된다. V3가 토큰을 처리할 연결과 문맥 표현을 설계한다면, R1은 확인 가능한 답의 보상을 이용해 풀이 행동을 더 학습한다. 아래 기록은 팀의 논문과 원도판을 공유하며, 공동 기여 명단에 없는 개인별 발명 분담을 덧붙이지 않는다.',works:records.map(shared)},
  {id:'damai-dai',name:'Damai Dai',nameKo:'다마이 다이',aliases:['Dai Damai','代达劢','다이다마이'],tags:['neural'],roles:['DeepSeekMoE · 공동저자','2024년 V3 · 연구·엔지니어링 공동 기여'],tagline:'많은 연결을 갖되, 매 토큰에는 필요한 일부를 쓰다',intro:'언어모델의 연결을 늘리면서도, 매 단어가 그 연결을 전부 통과하지 않게 할 수 있을까? 다마이 다이는 베이징대학교와 DeepSeek-AI 소속으로 2024년 DeepSeekMoE 논문에 참여했다. 이 연구는 전문가를 더 작은 신경망 부분으로 나누고, 공통으로 쓰는 전문가와 토큰에 따라 선택하는 전문가를 구분했다. 공유할 지식을 여러 곳에 중복해 배우는 부담을 줄이고, 현재 입력에 맞는 연결의 조합을 사용하려는 발상이다. 이어 V3에서는 이 전문가 구조가 문맥을 압축하는 MLA·추가 토큰 예측과 함께 더 큰 모델의 설계로 이어진다. 2024년 V3 보고서에는 연구·엔지니어링 기여자로, 2025년 최초 R1 보고서에는 기여자로 기재된다. 아래 두 연구는 팀의 공동 성과로 읽으며, MoE·V3·R1 전체를 한 사람의 단독 발명으로 묶지 않는다.',works:records.map(shared)}
 ]){if(profiles.some(p=>p.id===person.id))throw Error('Duplicate DeepSeek researcher profile: '+person.id);profiles.push(person);}
})();
