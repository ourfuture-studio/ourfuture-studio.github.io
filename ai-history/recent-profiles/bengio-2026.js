/* Append one dated, sourced record; the four earlier Bengio works remain untouched. */
(function(){
 'use strict';
 const profile=(window.ATLAS_PEOPLE_PROFILES||[]).find(p=>p.id==='yoshua-bengio');if(!profile)throw Error('Load the existing Bengio profile before its recent record.');
 const overview='https://lawzero.org/sites/default/files/publications/81/safetyargumentblogpost_2.pdf',formal='https://lawzero.org/sites/default/files/publications/99/safety-honesty-disinterested-ai-predictor_4.pdf';
 const work={id:'bengio-scientist-ai-2026',year:2026,dateLabel:'2026-05·06 · 설계 설명과 안전 논증 PDF',title:'LawZero · Scientist AI: 지능의 예측과 목표 추구를 나누려 하다',summary:'관측과 발화를 구분해 확률적으로 세계를 모델링하고, 가설을 제안하는 과정·확률 평가·배포 전 검사를 나누려는 설계와 조건부 안전 논증이다.',type:'설계 제안·이론 논문',track:'neural',people:['Yoshua Bengio','Oliver Richardson','Damiano Fornasiere','Gaël Gendron','Iulian Serban'],authorNote:'설계 설명은 Fornasiere·Richardson·Gendron·Serban·Bengio의 공동 글이고, 안전 논증은 Bengio·Richardson 등을 포함한16명의 공동 연구다. 벤지오 한 사람의 단독 구현으로 읽지 않는다.',sources:[{title:'LawZero · The Scientist AI · 설계 설명 원문',url:overview},{title:'Bengio 외 · Safety from Honesty in a Disinterested AI Predictor',url:formal},{title:'LawZero · 공식 연구 목록과 공개일',url:'https://lawzero.org/en/research'}],caveat:'제안된 설계와 가정 아래의 안전 논증이다. 완성된 시스템의 일반 안전성이나 원문의 모든 가정이 실증됐다는 보고가 아니다. 화면의 두 가설·확률표·위험 사건·문턱은 직접 정했으며 실제 신경망 학습·안전 정리를 실행하지 않는다.',related:['instructgpt','constitutional-ai'],content:{article:{
  question:'세계가 어떻게 될지 아는 지능과,\n세계를 원하는 쪽으로 바꾸는 목표를 나눌 수 있을까?',
  opening:[
   '단어의 표현과 다음 단어의 확률을 함께 배우던 연구에서, 벤지오는 이제 무엇을 예측하게 학습할지 묻는다. 어떤 답이 사람의 승인을 얻었는지에 보상하면, 세계를 설명하는 일과 사람이 원하는 반응을 이끌어 내는 일이 학습 안에서 섞일 수 있다는 문제의식이다. 2025년에 설립된 LawZero에서 이 질문을 Scientist AI의 설계로 이어 갔다.',
   '핵심 발상은 많은 것을 이해하는 능력과 자신의 목표를 위해 행동을 고르는 성향을 구분하는 것이다. 관측 자료에 조건을 둔 확률을 추정하게 하고, 가설을 제안하는 생성기와 그 가설을 평가하는 추정기를 나눈다. 여기서 생성기는 GAN처럼 가짜 자료로 판별자를 속이는 역할이 아니라, 질문과 관련된 가설·추론 단계를 제안하는 역할이다.',
   '그 출발점은 기록의 맥락이다. 조명이 깜빡였다는 직접 측정과 누군가 그렇게 말했다는 기록은 같은 관측이 아니다. 원문은 출처와 시점을 붙여 발화와 세계에 관한 변수를 구분하고, 무엇이 사실일지 확률로 묻게 한다. 어떤 문장을 사실 형식으로 적었다고 그 문장의 참이 이미 확인됐다는 뜻도 아니다.',
   '확률 예측이 중립적이어도 그것을 공개하는 행위는 영향을 줄 수 있다. 원문은 추정기의 학습에서 배포 결과의 좋고 나쁨을 보상 신호로 쓰지 않으려 하고, 배포 단계에서는 공개와 보류의 영향을 별도로 비교한다. 아래에서는 가상 조명 자료에서 이 두 역할이 어떻게 나뉘는지 계산해 본다.'
  ],
  visual:{id:'bengio-scientist-2026',navLabel:'예측과 공개를 나누어 보기',title:'관측에서 확률로, 확률에서 배포 검사로',caption:'원문 도식과 제안된 검사 정의를 참고한 재구성이다. 직접 정한 두 가설과 확률표에서 기록의 맥락·사전확률·공개 상황·검사 문턱을 바꾸며 계산과 근거를 단계별로 읽는다.'},
  takeaway:{title:'무엇이 일어날지 예측하는 기준과, 어떤 결과를 바라느냐는 기준을 나눈다',text:'Scientist AI의 목표는 높은 지능을 포기하는 것이 아니라, 확률 예측이 선호하는 결과를 만들기 위한 수단이 되지 않게 설계하는 것이다. 생성기가 제안한 설명을 추정기가 평가하고, 공개의 영향은 명시된 배포 기준에서 검사한다. 그 분리가 실제 학습과 배포에서 유지되는지는 별도로 검증해야 한다.'},
  technical:{title:'원문의 설계·조건부 논증과 이 보기의 계산 범위',paragraphs:[
   '연대: 2025년 LawZero 설립 뒤 공식 연구 목록에는 설계 글의 공개일이2026-02-05로 표시되어 있다. 이번에 읽은 첨부 설계 PDF 첫 장은2026-05-22, 안전 논증 PDF 첫 장은2026-06-30이며 후자의 공식 웹 공개 표시는2026-07-02다. 웹의 최초 공개 표시와 현재 첨부 PDF의 표기 날짜를 구분한다.',
   '원문에서 맥락화(contextualization)는 대부분의 일반 자료를 출처·시점이 있는 발화로 다루고, 직접 측정·실행된 계산·증명·잠재 가설 등의 세계 변수를 구분하는 요구 사항이다.2026년 안전 논증은 이 파이프라인의 완성 알고리즘을 제시하지 않는다(PDF4). 이 보기의 사전에 정한 선택 메뉴가 자연어 파서를 구현한 것은 아니다.',
   '가상 계산은 두 회로 가설의 사전확률과 직접 정한 관측 가능성으로 Bayes 규칙을 정확 합산한다. 원문의 Explainer가 제안한 잠재 문장에 대한 Monte Carlo 평균이나 학습된 신경 Predictor를 실행하지 않는다. 다른 가설이 빠졌거나 확률표가 틀리면 계산이 정확해도 예측은 현실과 달라질 수 있다.',
   '원문의 배포 검사는 공개와 보류를 인과적 개입으로 비교한 위험의 양의 로그오즈 차이 Δ를 정의하며, Δ≥α이면 예측 대신 noprediction을 반환한다(정의5.7–5.9, PDF25–26). 화면은 출력값과 무관한 작은 고정 조건부 확률표를 사용하며, 원문의 일반 인과모형·performative prediction 고정점·안전 정리를 재현하지 않는다.',
   '결과 보상 체크는 설계 조건을 벗어나는 학습 경로를 표시한다. 이 화면은 학습하지 않으므로 체크를 바꿔도 고정 표에서 계산한 예측 확률은 같다. 실제 학습에서도 두 방법이 같은 예측을 낸다는 주장이 아니다. 배포의 보류 역시 언제나 무해하다고 가정할 수 없으며 원문도 보류 기본 행동이 위험한 상황의 별도 분석을 요구한다.',
   '안전 논증은 자료·학습 과정·의미의 대응과 위험한 예측기 집합의 희소성 등에 관한 가정 아래 결과를 도출한다. 실제로 해석 가능한 세계모형·중립성·정확성·일반 안전성이 모두 확보됐다는 실험 결과로 읽지 않는다. 신경망과 명시적 검사 규칙을 함께 쓰지만 고전 기호 논리 증명기를 구현한 것으로 분류하지 않는다.'
  ],formula:'고정 가상 모형\nP(가설 | 기록) ∝ P(기록 | 가설) P(가설)\nP(소등 | 기록) = Σ가설 P(소등 | 가설) P(가설 | 기록)\n\nΔ = max(0, logit P(혼잡 | 공개) − logit P(혼잡 | 보류))\nlogit(p) = ln(p/(1−p))\nΔ ≥ α → 보류 / Δ < α → 설정한 가상 검사 통과'}
 },keyIdeas:[{title:'말한 사실과 세계의 사실을 구분한다',text:'발화에는 누가 언제 무엇을 말했다는 관측이 있다. 그 주장의 참은 별도 변수로 남기고, 직접 측정과 같은 정보로 합치지 않는다.'},{title:'가설을 만드는 자유와 평가의 기준을 나눈다',text:'생성기가 설명 후보를 제안하고 추정기가 조건부 확률을 평가한다. 제안의 설득력과 믿어도 되는 정도를 같은 점수로 취급하지 않으려는 구조다.'},{title:'중립적 학습과 영향에 민감한 배포는 다른 역할이다',text:'예측의 배포 결과가 추정기의 학습 보상이 되는 경로를 끊으려 하면서도, 공개 전에는 그 영향의 위험을 명시적으로 검사한다.'}],videos:[],references:[
  {title:'The Scientist AI: Safe by Design, by Not Desiring · 현재 설계 PDF',url:overview,location:'첫 장2026-05-22. PDF4 Fig.1 맥락화, PDF5 생성기·추정기, PDF6 Fig.2와 배포 구상, PDF7 미완료 연구의 범위. Fig.2를 출처 도판으로 발췌했다.'},
  {title:'Safety from Honesty in a Disinterested AI Predictor · 원문',url:formal,location:'첫 장2026-06-30. PDF3–5 설계와 한계, PDF4 맥락화 요구사항·두 예측 경로, PDF25–26 정의5.7–5.9 배포 검사, PDF29–30 구체 설계·검증 범위.'},
  {title:'LawZero · 설계 설명의 공식 공개 페이지',url:'https://lawzero.org/en/publication/scientist-ai-safe-design-not-desiring',location:'웹 공개 표시2026-02-05. 생성기·추정기·맥락화·결과 불변성의 제안. 첨부 PDF의 표기 날짜와 구분한다.'},
  {title:'LawZero · 안전 논증의 공식 공개 페이지',url:'https://lawzero.org/en/publication/safety-honesty-disinterested-ai-predictor',location:'웹 공개 표시2026-07-02.16명 공동저자와 고정 자료에 조건을 둔 중립적 예측의 설계·조건부 논증.'},
  {title:'LawZero · Yoshua Bengio 공식 소개',url:'https://lawzero.org/en/team/yoshua-bengio',location:'2026-11-15 확인. Co-President & Scientific Director,2025년 LawZero 설립,2023년 이후 AI 위험 연구로의 방향 전환.'}
 ]}};
 if(profile.works.some(w=>w.id===work.id))throw Error('Duplicate recent Bengio record.');
 profile.intro+=' 2023년 이후에는 AI의 위험과 안전한 설계로 연구의 중심을 넓혔고,2025년 설립된 LawZero에서 Scientist AI를 연구한다. 세계를 확률적으로 이해하는 능력과 자신의 목표를 위해 세계에 개입하는 성향을 구분하려는2026년 설계·안전 논증을 기존 언어모델 연구와 이어 읽는다.';
 profile.roles=[...(profile.roles||[]),'LawZero · 비행위자적 예측과 AI 안전 설계'];profile.works.push(work);profile.works.sort((a,b)=>a.year-b.year);
 window.AtlasBengioScientist2026Entry=work;
})();
