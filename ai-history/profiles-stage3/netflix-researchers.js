/* Author identities are limited to the cited 2018 paper and 2025 official article. */
(function(){
 'use strict';
 const profiles=window.ATLAS_PEOPLE_PROFILES,events=window.TIMELINE_DATA;
 const ids=['netflix-vae-cf-2018','netflix-recommendation-foundation-2025'];
 const records=ids.map(id=>events.find(e=>e.id===id));if(records.some(e=>!e?.content?.article))throw Error('Netflix profiles require both source records.');
 const shared=(e,type)=>({id:e.id,eventId:e.id,year:e.year,dateLabel:e.dateLabel,title:e.subtitle,summary:e.summary,type,track:e.track,people:e.people,authorNote:e.authorNote,sources:e.sources,caveat:e.caveat,content:e.content});
 const people=[
  {id:'dawen-liang',name:'Dawen Liang',nameKo:'다웬 량',tagline:'흩어진 행동에서 선호 표현을 배우다',intro:'2018년 VAE 협업필터링 논문에서 Netflix 소속 공동저자로 기재된다. 이용자의 적은 행동을 여러 사람이 공유하는 인코더·디코더로 표현하는 연구에 참여했다. 2025년 Netflix 추천 기반 모델 공식 글의 Acknowledgements에도 기여자로 기재된다. 두 시점의 기록을 연결하되, 2025년 글의 저자3명과 기여자 명단을 구분한다.',works:[shared(records[0],'공동 논문'),{...shared(records[1],'공식 글 · 기여자 명단'),authorNote:'Dawen Liang은 이 공식 글의 Acknowledgements 기여자 명단에 포함된다. 글의 저자3명 중 한 사람으로 표시하지 않는다.'}]},
  {id:'rahul-g-krishnan',name:'Rahul G. Krishnan',nameKo:'라훌 G. 크리슈난',tagline:'확률 잠재 모형을 희소한 행동 기록에 연결하다',intro:'2018년 VAE 협업필터링 논문의 MIT 소속 공동저자다. 잠재 변수의 분포를 신경망으로 추정하고 관찰한 행동을 복원하는 공동 연구를 살펴본다. 이 소개는 해당 논문에 확인되는 당시 소속과 공동저자 관계를 기록하며 출생지·학력·현재 직위를 추정하지 않는다.',works:[shared(records[0],'공동 논문')]},
  {id:'matthew-d-hoffman',name:'Matthew D. Hoffman',nameKo:'매슈 D. 호프먼',tagline:'공유된 추론 모형으로 이용자의 잠재 분포를 구하다',intro:'2018년 VAE 협업필터링 논문에서 Google AI 소속 공동저자로 기재된다. 이용자별 잠재 변수를 별도로 최적화하는 대신 입력에 따른 분포를 공유 신경망으로 구하는 아이디어를 공동 연구에서 읽는다. 논문의 각 요소를 개인별 단독 발명으로 배분하지 않는다.',works:[shared(records[0],'공동 논문')]},
  {id:'tony-jebara',name:'Tony Jebara',nameKo:'토니 제바라',tagline:'관찰한 행동과 미관찰 항목 사이의 선호를 모델링하다',intro:'2018년 VAE 협업필터링 논문의 Netflix 소속 공동저자다. 다항 우도와 잠재 분포의 정규화를 추천 문제에 맞게 다루는 공동 연구에 참여했다. 아래 카드와 관계도는 논문에 명시된 저자·당시 소속에 근거한다.',works:[shared(records[0],'공동 논문')]},
  {id:'ko-jen-hsiao',name:'Ko-Jen Hsiao',nameKo:'코젠 샤오',tagline:'따로 배운 선호를 공통 표현으로 나누다',intro:'2025년3월21일 Netflix TechBlog의 Foundation Model for Personalized Recommendation을 Yesu Feng·Sudarshan Lamkhede와 함께 작성했다. 추천 모델들이 공통 데이터에서 얻은 표현을 공유하는 구성을 설명한다. 공식 글의 저자라는 사실과 시스템 전체의 발명·기여 범위는 구분한다.',works:[shared(records[1],'공식 기술 글 · 공동저자')]},
  {id:'yesu-feng',name:'Yesu Feng',nameKo:'예수 펑',tagline:'행동의 순서와 예측 시점을 추천 표현에 담다',intro:'2025년 Netflix 추천 기반 모델 공식 기술 글의 공동저자다. 행동을 사건 토큰으로 만들고, 예측 시점에 알 수 있는 요청 정보와 이미 완료된 행동을 함께 읽는 설계를 소개한다. 공개 글에서 확인되지 않은 개인별 담당 모듈이나 학력은 덧붙이지 않는다.',works:[shared(records[1],'공식 기술 글 · 공동저자')]},
  {id:'sudarshan-lamkhede',name:'Sudarshan Lamkhede',nameKo:'수다르샨 람케데',tagline:'배운 표현을 여러 추천 과제로 전달하다',intro:'Ko-Jen Hsiao·Yesu Feng과 함께2025년 Netflix 추천 기반 모델 공식 기술 글을 작성했다. 직접 예측, 임베딩 전달, 미세조정이라는 세 사용 경로와 운영 제약을 설명한다. 소개의 범위는 이 공개 자료의 저자·연구 기록이며 팀의 전체 성과를 개인에게 귀속하지 않는다.',works:[shared(records[1],'공식 기술 글 · 공동저자')]}
 ];
 for(const p of people){if(profiles.some(x=>x.id===p.id))throw Error('Duplicate Netflix person: '+p.id);profiles.push({...p,tags:['neural'],roles:[p.works[0].type],aliases:[]});}
})();
