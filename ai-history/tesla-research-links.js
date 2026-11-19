/* Existing person card, shared team studies, and dated corporate-role evidence. */
(function(){
  'use strict';
  const profiles=window.ATLAS_PEOPLE_PROFILES,rows=window.ATLAS_PERSON_BACKGROUNDS;
  const person=profiles?.find(p=>p.id==='elon-musk'),background=rows?.find(r=>r.personId===person?.id);
  const works=[window.AtlasTeslaFSD?.work,window.AtlasTeslaOptimus?.work];
  if(!person||!background||works.some(w=>!w?.content?.article))throw Error('Tesla studies and the existing Musk/background records are required.');
  const source={id:'musk-tesla-2026-role',title:'Tesla · 2025 Form 10-K/A · 2026-04-30 인물 소개',url:'https://ir.tesla.com/_flysystem/s3/sec/000110465926053166/tm2611837d1_10ka-gen.pdf#page=5',scope:'인쇄1쪽/PDF5, Item10. Tesla CEO는2008-10부터, 이사회는2004-04부터로 기재한다. 이 경영 기록을 모델의 개별 설계·구현 기여로 바꾸지 않는다.'};
  const currentRole={id:'musk-tesla-q3-2026-role',title:'Tesla · 2026 Q3 Form 10-Q · Exhibit 31.1',url:'https://www.sec.gov/Archives/edgar/data/1318605/000162828026066775/tsla-2026x09x30xex311.htm',scope:'2026-10-21 서명란에 Elon Musk·Chief Executive Officer를 명시한다. 경영진의 공시 확인 역할이며 모델 개발의 개인별 기여를 증명하지 않는다.'};
  person.tagline='Tesla·xAI의 AI 제품과 계산 기반에 관한 기업 기록';
  person.intro='Tesla의 FSD·Optimus와 xAI의 Grok·Colossus를 기업별·연도별로 읽는다. 머스크의 경영·조직 역할과 각 연구·개발팀이 구현한 방법을 구분한다. Tesla의 차량·로봇 기술과 xAI의 언어모형을 같은 시스템으로 다루거나 두 회사 사이의 데이터 공유를 추정하지 않는다.';
  person.tags=[...new Set([...(person.tags||[]),'industry'])];
  person.roles=[...new Set([...(person.roles||[]),'Tesla · FSD·Optimus의 기업 개발 기록'])];
  for(const work of works){
    if(person.works.some(w=>w.id===work.id))throw Error('Duplicate Tesla study on Musk profile: '+work.id);
    person.works.push(work);
  }
  if(!background.sources.some(s=>s.id===source.id))background.sources.push(source);
  if(!background.sources.some(s=>s.id===currentRole.id))background.sources.push(currentRole);
  const place=background.researchPlaces.find(p=>p.institutionId==='tesla');
  if(place){place.period='2008-10부터 CEO · 2026-10-21 공시에서도 확인';place.note='2026년 공시는 Tesla CEO·이사회 경력을 설명한다. FSD·Optimus의 모델 구조를 혼자 발명하거나 구현했다는 근거가 아니다.';place.sourceIds=[...new Set([...(place.sourceIds||[]),source.id,currentRole.id])];}
  const records=[...(window.TIMELINE_DATA||[]),...profiles.flatMap(p=>p.works||[])];
  for(const [from,to] of [[works[0].id,works[1].id],[works[1].id,works[0].id]])for(const w of records.filter(w=>w.id===from))w.related=[...new Set([...(w.related||[]),to])];
  window.AtlasTeslaLinks=Object.freeze({muskId:person.id,workIds:Object.freeze(works.map(w=>w.id)),roleSource:source.url});
})();
