/* Affiliation and coauthorship from the 2015 paper; no inferred birthplace or current role. */
(function(){
 'use strict';
 const paper='https://arxiv.org/pdf/1412.6572v3',profiles=window.ATLAS_PEOPLE_PROFILES,rows=window.ATLAS_PERSON_BACKGROUNDS;
 const owner=profiles.find(p=>p.id==='ian-goodfellow'),work=owner?.works.find(w=>w.id==='goodfellow-adversarial-2015');
 if(!work?.content?.article)throw Error('Google author links require the canonical adversarial-examples article.');
 const people=[
  {id:'jonathon-shlens',name:'Jonathon Shlens',tagline:'정확한 분류 뒤에 남은, 입력 변화의 취약성을 살피다',intro:'2015년 ICLR 논문 Explaining and Harnessing Adversarial Examples는 Shlens를 Goodfellow·Szegedy와 함께 Google Inc. 소속 공동저자로 기록한다. 사람이 비슷하게 보는 두 입력이 모델에는 크게 다른 판단을 만드는 이유를 고차원에서 작은 변화가 합쳐지는 효과로 다룬 연구다. 손실을 키우는 입력 방향을 빠르게 구하고 적대적 학습에도 사용하는 흐름을 아래 공동논문의 시각화에서 살펴본다. 세 저자의 논문 기여를 특정 개인의 단독 발명으로 나누지 않으며, 당시 소속 외에 확인하지 않은 출생·학력·현재 직위는 추가하지 않는다.'},
  {id:'christian-szegedy',name:'Christian Szegedy',tagline:'모델이 알아본다는 말의 조건을, 바뀐 입력에서 묻다',intro:'Szegedy는 Goodfellow·Shlens와 쓴 2015년 ICLR 논문에서 Google Inc. 소속으로 기재된다. 이 논문은 적대적 예제의 원인을 과도한 비선형성만으로 설명하지 않고, 고차원 입력에서 선형적인 변화가 합쳐져 판단을 바꿀 수 있음을 분석했다. 작은 입력 변화가 어디로 향하는지와 그 예제를 학습에 넣는 방법을 구분해 읽을 수 있다. 아래 기록은 세 사람의 공동논문을 공유하며, 논문에 언급된 이전 연구나 후속 연구 전체를 이 한 편의 성과로 합치지 않는다.'}
 ];
 for(const p of people){
  if(profiles.some(old=>old.id===p.id))throw Error('Duplicate Google coauthor: '+p.id);
  profiles.push({...p,nameKo:'',aliases:[],tags:['neural'],roles:['2015 적대적 예제 공동연구','논문 당시 Google Inc.'],works:[{...work,content:work.content}]});
  const peers=[{id:'ian-goodfellow',name:'Ian J. Goodfellow'},...people.filter(q=>q.id!==p.id)];
  rows.push({personId:p.id,background:'2015년 ICLR 공동논문 첫 페이지가 Google Inc., Mountain View, CA 소속을 명시한다. 이 소개는 해당 시점의 연구 참여와 공동저자 관계를 기록한다.',backgroundSourceIds:['fgsm-2015'],education:[],researchPlaces:[{institutionId:'google',name:'Google Inc. · Mountain View',period:'2015 ICLR 논문 당시',note:'첫 페이지의 저자 소속. 전체 고용 기간과 현재 소속을 뜻하지 않는다.',sourceIds:['fgsm-2015']}],connections:peers.map(q=>({personId:q.id,name:q.name,kind:'collaboration',relation:'collaborated-with',label:'2015 적대적 예제 공동논문',description:'Explaining and Harnessing Adversarial Examples의 세 공동저자다. 논문 공동저술을 지도 관계나 개인별 단독 발명의 근거로 바꾸지 않는다.',period:'2015',sourceIds:['fgsm-2015']})),sources:[{id:'fgsm-2015',title:'Goodfellow·Shlens·Szegedy · ICLR2015 원문',url:paper,scope:'PDF1쪽 저자·소속, §§3–4 선형 설명과 FGSM·적대적 학습. 2014년 최초 원고와 2015 ICLR 판본을 구분한다.'}]});
 }
})();
