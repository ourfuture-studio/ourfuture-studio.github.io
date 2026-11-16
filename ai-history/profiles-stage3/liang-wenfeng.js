/* Founder biography and two shared team-research records; no sole-inventor claim. */
(function(){
  'use strict';
  const ids=['deepseek-v3','deepseek-r1'];
  const records=ids.map(id=>(window.TIMELINE_DATA||[]).find(row=>row.id===id));
  if(records.some(row=>!row?.content?.article))throw new Error('Liang Wenfeng profile requires both DeepSeek source articles.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const shared=record=>({id:record.id,eventId:record.id,year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'팀 공동연구 기술 보고서',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content});
  const person={
    id:'liang-wenfeng',name:'Liang Wenfeng',nameKo:'량원펑',aliases:['Wenfeng Liang','梁文锋','梁文鋒','리앙원펑','양문봉'],tags:['neural'],roles:['DeepSeek 창업','V3·R1 팀 연구의 공동 기여'],
    tagline:'큰 모델을 실행하는 방법에서, 풀이 행동을 배우는 방법까지',
    intro:'량원펑은 DeepSeek의 창업자다. 저장대학교 정보·전자공학 분야에서 학사와 석사를 마쳤고, 대학의 공식 소개는 대학원 시기의 기계시각 연구 배경을 전한다. 인물 소개에서는 회사를 세운 역할과 모델 연구의 공동 기여를 구분한다. 2024년 DeepSeek-V3 보고서는 그의 이름을 Research & Engineering 기여 목록에, 2025년 최초 R1 보고서는 Contributors에 기재한다. V3는 문맥 저장과 토큰별 계산을 설계하는 문제를, R1은 그 기초 모델 위에서 확인 가능한 보상으로 추론을 더 학습하는 문제를 다룬다. 아래 두 기록은 DeepSeek-AI 팀의 원문을 공유한다. 특정 구성요소의 세부 발명을 그에게만 귀속하거나, 창업자라는 이유로 모든 공동연구자의 기여를 대체하지 않는다.',
    works:records.map(shared)
  };
  if(profiles.some(row=>row.id===person.id))throw new Error('Duplicate Liang Wenfeng profile.');
  profiles.push(person);
})();
