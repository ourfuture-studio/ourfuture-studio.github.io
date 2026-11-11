/* Three independently sourced people; new works remain outside the 50-event timeline. */
(function(){
 'use strict';const profiles=window.ATLAS_PEOPLE_PROFILES,fromEvent=id=>{const e=window.TIMELINE_DATA.find(e=>e.id===id);if(!e)throw Error('Missing existing event '+id);return{id,eventId:id,year:e.year,dateLabel:e.dateLabel,title:e.subtitle,summary:e.summary,type:'학술논문',track:e.track,people:e.people,sources:e.sources,caveat:e.caveat,content:e.content};},fromEntry=e=>({...e.record,content:e.content});
 if(!Array.isArray(profiles)||!window.AtlasGravesCTCEntry||!window.AtlasAltmanInfrastructureEntry)throw Error('Load catalog and new sequence/industry entries first');
 const musk=profiles.find(p=>p.id==='elon-musk')?.works.find(w=>w.id==='musk-openai-2015');if(!musk)throw Error('Existing 2015 OpenAI record required');
 const initial={...musk};delete initial.eventId;
 const additions=[{
  id:'sepp-hochreiter',name:'Sepp Hochreiter',nameKo:'제프 호흐라이터',aliases:['Josef Hochreiter','요제프 호흐라이터','호흐라이터','호크라이터','제프 호크라이터'],tagline:'먼 과거의 경험에도 학습 신호가 닿게 하려다',roles:['LSTM 공동저자','긴 시간 의존성과 학습 신호'],tags:['neural'],
  intro:'오래전에 주어진 입력이 지금의 답에 중요해도, 오차를 과거로 되돌리는 과정에서 신호가 너무 작아지면 그 연결을 배우기 어렵다. 호흐라이터는 1991년 디플롬 연구에서 순환망 학습의 문제를 다뤘고, 슈미트후버와 1997년 LSTM을 발표했다. 아래에서는 기억할 내용을 유지하는 연결과 출입을 조절하는 장치가 왜 필요했는지 원논문으로 읽는다.',works:[fromEvent('lstm')]
 },{
  id:'alex-graves',name:'Alex Graves',nameKo:'알렉스 그레이브스',aliases:['Alexander Graves','그레이브스','Graves','CTC'],tagline:'시간의 경계를 그려 주지 않고, 문자열로 배우다',roles:['순환 신경망·음성·필기 인식','CTC 공동저자'],tags:['neural'],
  intro:'소리와 필기는 시간에 따라 길이가 달라지지만 정답은 더 짧은 문자열로 주어진다. 그레이브스는 IDSIA·TUM의 공동연구에서 이 두 길이 사이의 정렬을 하나로 정하지 않고 학습하는 CTC를 연구했다. 이후 토론토 시기의 연구에서는 힌턴·모하메드와의 음성 인식 공동연구도 이어졌다. 신경망이 표현을 만드는 방법과, 그 표현에 문자열 정답을 연결하는 방법을 함께 읽는 인물이다.',works:[fromEntry(window.AtlasGravesCTCEntry)]
 },{
  id:'sam-altman',name:'Sam Altman',nameKo:'샘 올트먼',aliases:['Samuel Altman','올트먼','알트먼','샘 알트먼','Stargate','스타게이트'],tagline:'AI 연구·제품·계산 기반을 조직으로 연결하다',roles:['OpenAI 공동창업·경영','연구·제품·컴퓨팅 기반'],tags:['industry'],
  intro:'새로운 알고리즘 하나의 발명자보다, 연구 조직이 모형을 만들고 이를 제품으로 제공할 자원과 경로를 연결하는 역할로 읽는다. 2015년 공식 발표의 공동의장, 2019년 자본·조직 구조 설명, 2020년 API와 2022년 대화 제품, 2025년 컴퓨팅 기반 발표를 날짜별로 구분한다. 연구자의 기술 기여와 경영·자원 확보의 기여도 나누어 본다.',works:[initial,fromEntry(window.AtlasAltmanInfrastructureEntry)]
 }];
 for(const profile of additions){if(profiles.some(p=>p.id===profile.id))throw Error('Stage2 person already registered '+profile.id);profile.works.sort((a,b)=>a.year-b.year);profiles.push(profile);}
 window.AtlasStage2SequenceProfiles=additions;
})();
