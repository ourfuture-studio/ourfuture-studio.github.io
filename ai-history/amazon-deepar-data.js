/* Standalone adapter. Load after person-background-data, before person-background/people/app. */
(function(){
  'use strict';
  const paper='https://arxiv.org/pdf/1704.04110v1';
  const launch='https://aws.amazon.com/blogs/machine-learning/now-available-in-amazon-sagemaker-deepar-algorithm-for-more-accurate-time-series-forecasting/';
  const docs='https://docs.aws.amazon.com/sagemaker/latest/dg/deepar_how-it-works.html';
  const dsstne='https://aws.amazon.com/blogs/big-data/generating-recommendations-at-amazon-scale-with-apache-spark-and-amazon-dsstne/';
  const authors=['Valentin Flunkert','David Salinas','Jan Gasthaus'];
  const content={
    article:{
      question:'이력이 짧은 상품도 다른 상품에서 배울 수 있을까?\n미래를 숫자 하나가 아닌 여러 가능성으로 예측하려면?',
      opening:[
        '새 상품은 판매 이력이 짧다. 그 상품만 따로 보면 주말의 수요나 계절의 변화를 배울 자료가 부족하다. 하지만 비슷한 상품들이 이미 지나온 기록에는 반복되는 모양이 있을 수 있다. DeepAR가 던진 질문은 이런 여러 시계열에서 하나의 예측 모형을 함께 배울 수 있느냐는 것이다.',
        'Flunkert·Salinas·Gasthaus의 2017년 최초 원고는 관련된 시계열들에 하나의 자기회귀 RNN을 공유한다. 각 시계열의 값과 알려진 날짜 정보를 차례로 읽어 내부 상태를 바꾸되, 그 상태를 갱신하는 연결값은 함께 학습한다. “공유한다”는 것은 모든 상품을 같은 값으로 예측하거나 판매량을 합친다는 뜻이 아니다.',
        '출력도 “내일 12개”에서 끝나지 않는다. 신경망의 상태를 다음 값의 확률분포를 정하는 수로 바꾼다. 실수 값에는 가우시안, 판매 개수 같은 계수 값에는 음이항분포를 사용하는 선택을 원고에서 다룬다. 미래가 얼마나 흔들릴지 표현하면, 같은 대표값을 갖더라도 재고를 준비할 판단은 달라질 수 있다.',
        '학습할 때는 이미 관찰한 과거 구간을 잘라 다음 값의 분포를 맞춘다. 다음 시점으로 넘어갈 때 실제 관측값을 넣고, 그 관측값에 높은 가능성을 주도록 오차를 계산한다. 실제 미래를 예측할 때는 그 정답을 알 수 없으므로, 분포에서 뽑은 값을 다음 입력으로 되돌려 보낸다.',
        '이 과정을 여러 번 반복하면 가능한 미래의 경로들이 생긴다. 각 날짜의 분위수뿐 아니라 여러 날의 합도 경로별로 먼저 더해 살펴볼 수 있다. 한 번의 추측을 확정된 미래처럼 늘리는 대신, 앞에서 뽑힌 값이 뒤의 분포에도 영향을 주는 여러 경로를 유지하는 발상이다.',
        '아래 원도판과 네 화면을 연결해 읽어 보자. 공유 연결값과 개별 상태, 분포의 모양, 관측값과 샘플의 교체, 경로와 분위수를 나누었다. 화면의 작은 계산은 직접 정한 가우시안 자기회귀식이며, 논문의 LSTM을 학습하거나 판매 데이터를 재현한 결과는 아니다.'
      ],
      visual:{id:'amazon-deepar-forecast',navLabel:'공유 학습·미래 분포',title:'여러 이력에서 배우고, 여러 미래를 펼치다',caption:'2017 v1 Figure 2와 §§3–3.4를 기준으로 다시 그린 네 관점입니다. 회색 원도판은 논문에서 발췌했고, 아래 색상 그림·수치·샘플은 별도로 구성했습니다.'},
      takeaway:{title:'다른 시계열에서 배운 규칙으로, 한 대상의 여러 미래를 예측한다',text:'공유하는 것은 학습한 연결값이고, 대상마다 달라지는 것은 읽은 이력과 상태다. 분포에서 값을 뽑아 다시 입력하면 미래 전체의 경로를 만들고, 그 경로를 목적에 맞게 요약할 수 있다.'},
      technical:{title:'공유 파라미터·분포·학습과 샘플링의 차이 더 읽기',paragraphs:[
        '판본 기준은 2017-04-13의 arXiv v1이다. 첫 페이지에는 Valentin Flunkert·David Salinas·Jan Gasthaus 세 저자와 앞 두 저자의 동등 기여가 표시되어 있다. 2020 International Journal of Forecasting 판은 David Salinas·Valentin Flunkert·Jan Gasthaus·Tim Januschowski 네 저자다. 2017년 날짜에 저널판의 저자 순서와 목록을 붙이지 않았다.',
        'v1 PDF 3쪽 Figure 2의 inputs → network → likelihood → samples가 이 카드의 중심이다. h는 이전 상태·이전 목표값·해당 시점의 공변량으로 계산한다. Θ는 시계열들을 가로질러 공유하는 파라미터이고, hᵢ,ₜ는 각 시계열과 시점에 따른 상태다. 공유 학습 자체가 시계열들 사이의 모든 동시 상관을 표현하는 다변량 결합분포를 뜻하지는 않는다.',
        '§3.1은 실수의 가우시안 분포와 개수의 음이항분포를 설명한다. 가우시안은 평균 μ와 표준편차 σ를, 논문의 음이항 파라미터화는 평균 μ와 α를 사용하며 분산은 μ+αμ²다. 화면의 분포 조절기는 이 값들을 직접 정하며, 실제 RNN 출력으로 추정하지 않는다.',
        '§3.2 식(2)의 학습 목표는 관측값들의 로그 우도 합을 크게 만드는 것이다. 이전 관측값을 다음 입력에 쓰는 학습과 이전 샘플을 쓰는 예측의 차이를 원문도 논의한다. 이 화면에서는 그 차이를 teacher forcing과 rollout이라는 읽기 표지로 구분했다. 화면의 학습 보기에서 미래로 표시된 값도 실제로는 학습 시점에 관찰 가능한 과거 구간이다.',
        '§3의 ancestral sampling은 샘플 하나를 다음 입력에 넣으며 경로를 만든다. 여러 날짜의 합의 분위수가 필요하면 각 샘플 경로를 먼저 합산한 뒤 분위수를 구한다. 날짜별 90% 분위수를 더한 값은 일반적으로 합의 90% 분위수와 다르다. 화면은 이 두 계산을 실제로 따로 수행한다.',
        '§3.3은 여러 시작점의 창을 뽑아 학습 사례를 만들고, §3.4는 규모가 다른 시계열의 재척도화와 표본 선택을 다룬다. 첫 화면에서 규모를 나누어 그린 선은 패턴 공유를 읽기 위한 것이며 논문의 모든 전처리·가중 표본추출을 구현한 것은 아니다.',
        'AWS의 2018-01-08 출시 글은 S3 데이터 → 관리형 학습 → 모델 → 예측 endpoint의 제품 흐름을 설명한다. 2017 연구 원고와 2018 제품 제공은 다른 사건이다. 현재 AWS 문서의 자동 날짜 특징·지연값 입력·범주 임베딩 등의 세부 기능도 2017 최초 도판과 구분해 읽어야 한다.',
        '현재 문서는 예측 시 필요한 동적 특징이 미래에도 알려져 있어야 한다고 명시한다. 날짜와 계획된 가격은 입력 후보가 될 수 있지만, 아직 관찰하지 못한 실제 미래 수요를 특징에 넣으면 예측 평가가 성립하지 않는다. 검증은 시간상 뒤에 남겨 둔 목표값을 보지 않은 상태에서 수행해야 한다.',
        '색상 화면은 고정식 μₜ=10+0.55(zₜ₋₁−10)+xₜ와 가우시안 샘플링을 사용한다. 0.55와 10은 직접 정했으며 LSTM의 학습된 가중치가 아니다. 표시한 10–90% 범위는 이 가정과 샘플에서 얻은 시점별 구간으로, 모든 시점이 동시에 그 안에 들 확률이나 실제 데이터에서의 보정 성능을 보장하지 않는다. 모델 파라미터의 불확실성도 별도로 추정하지 않는다.'
      ],formula:'공유 파라미터: Θ / 대상별 내부 상태: hᵢ,ₜ\nhᵢ,ₜ = h(hᵢ,ₜ₋₁, zᵢ,ₜ₋₁, xᵢ,ₜ; Θ)\nθᵢ,ₜ = θ(hᵢ,ₜ; Θ) → 다음 값의 분포\n학습: Σᵢ Σₜ log ℓ(zᵢ,ₜ | θᵢ,ₜ)를 최대화\n예측: z̃ᵢ,ₜ ~ ℓ(· | θᵢ,ₜ) → 다음 입력으로\n여러 날의 합: 각 경로를 먼저 더한 뒤 분위수 계산'},
      referencesLabel:'원문과 확인한 위치',evidenceLabel:'원고·제품·가정 더 읽기'
    },
    keyIdeas:[
      {title:'하나의 모형으로 여러 대상의 이력을 배운다',text:'관측값과 상태는 대상마다 다르지만 갱신 규칙의 연결값을 공유한다. 이력이 짧은 대상에도 관련 시계열에서 배운 패턴을 활용하려 했다.'},
      {title:'정답 숫자 하나 대신 다음 값의 분포를 만든다',text:'어떤 값이 얼마나 가능할지 표현한다. 값의 종류에 맞는 분포를 고르는 일이 예측 문제의 일부다.'},
      {title:'뽑은 미래가 다음 미래의 문맥이 된다',text:'관측값을 더는 알 수 없는 구간에서는 샘플을 되돌려 경로를 이어 간다. 여러 경로를 모으면 날짜별 범위와 기간 합의 불확실성을 따로 읽을 수 있다.'}
    ],videos:[],references:[
      {title:'Flunkert·Salinas·Gasthaus · DeepAR (2017 v1)',url:paper,location:'11쪽 원고 중 PDF 1쪽 저자·동등 기여·소속, 3쪽 Figure 2·§3·식(1), 4쪽 §§3.1–3.4·식(2)와 분포·샘플링 설명을 직접 확인. Fig.2를 로컬 발췌.'},
      {title:'arXiv · 제출 이력',url:'https://arxiv.org/abs/1704.04110',location:'v1 2017-04-13, v2 2017-07-05, v3 2019-02-22. 최신 페이지의 저자 순서와 v1 PDF를 구분.'},
      {title:'AWS · 2018 SageMaker DeepAR 출시 해설',url:launch,location:'2018-01-08. Cold start forecasting, Probabilistic forecasts, Getting started와 About the Authors. 세 연구자의 당시 Berlin Core ML 활동과 서비스 흐름.'},
      {title:'AWS · How the DeepAR Algorithm Works',url:docs,location:'2026-11-17 조회. 특징·학습 창·미래에 알려진 공변량·inference. 현재 문서를 2017 기능 목록으로 소급하지 않음.'},
      {title:'AWS · DeepAR 입력과 검증',url:'https://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html',location:'2026-11-17 조회. Input/Output Interface와 Best Practices: 미래 특징 길이, 시간상 뒤의 test 구간, 데이터 조건.'},
      {title:'DeepAR · 2020 저널판 서지',url:'https://doi.org/10.1016/j.ijforecast.2019.07.001',location:'International Journal of Forecasting 36(3), 1181–1191. 저자 네 명과 출판 시점을 출판사 기록에서 확인. 이 카드 도판은 2017 v1을 사용.'}
    ]
  };
  const record={id:'amazon-deepar-2017',year:2017,dateLabel:'2017.04.13 · 최초 원고 v1',track:'neural',title:'여러 이력에서 여러 미래를 배우다',subtitle:'DeepAR · 확률적 시계열 예측',people:authors,summary:'관련된 여러 시계열로 하나의 RNN을 학습하고, 다음 값의 분포에서 샘플을 이어 미래 경로를 만든다.',detail:'각 대상의 이력과 상태는 따로 유지하면서 학습한 연결값을 공유한다. 이미 관찰한 구간에서는 실제 값을, 미래를 펼칠 때는 분포에서 뽑은 값을 다음 입력으로 삼는다.',question:'다른 상품에서 배운 패턴으로, 새 상품의 가능한 미래도 예측할 수 있을까?',visual:'sequence',authorNote:'2017 v1: Flunkert·Salinas 동등 기여, Gasthaus 공동저자. 2020 저널판의 네 저자와 구분.',sources:[{title:'DeepAR · 2017 v1 원문',url:paper},{title:'AWS · 2018 SageMaker 출시',url:launch}],caveat:'공유 RNN과 확률 예측의 아이디어를 원문으로 설명한다. 색상 화면은 직접 정한 가우시안 자기회귀식의 계산이며 LSTM 학습·원논문 실험·실제 판매 예측 결과가 아니다.',related:['lstm','seq2seq'],content};
  const sharedWork=()=>({...record,eventId:record.id,title:record.subtitle,type:'공동연구 논문',content});
  const chungWork={id:'amazon-dsstne-spark-2016',year:2016,dateLabel:'2016.07.09 · 공식 구현 해설',track:'industry',title:'DSSTNE와 Spark · 희소 추천 데이터에서 GPU 작업까지',type:'공식 기술 글',people:['Kiuk Chung'],summary:'Spark의 CPU 데이터 처리와 별도 GPU 학습·예측 작업을 연결해 대규모 추천 모형의 실행을 조직한다.',sources:[{title:'Kiuk Chung · AWS DSSTNE 기술 글',url:dsstne}],caveat:'글 작성자의 당시 역할과 소개한 구성을 다룬다. DSSTNE 전체의 단독 개발자, DeepAR 저자 또는 현재 소속으로 확장하지 않는다.',content:{article:{question:'상품은 많은데 구매 기록은 드문 추천 데이터를,\n어떻게 여러 GPU의 학습으로 이어 갈까?',opening:[
    '추천은 상품의 수만큼 모든 이용자의 평가가 채워져 있는 문제가 아니다. 각 이용자가 본 상품은 전체의 일부다. Chung의 2016년 AWS 글은 이런 희소한 자료와 큰 신경망이 GPU 메모리·시간의 제약에 부딪힌다는 상황에서 시작한다.',
    '글이 제시한 연결은 CPU에서 자료를 만드는 Spark와 GPU에서 학습·예측하는 DSSTNE를 큰 작업 단위로 묶는 것이다. Spark가 자료를 나누어 S3에 저장하고, ECS가 GPU 컨테이너 작업을 실행하며, 결과를 S3로 되돌린다. 데이터 준비와 신경망 실행이 다른 장치에서 이루어져도 하나의 작업 흐름으로 조직하려 했다.',
    '이 기록은 Kiuk Chung이 당시 Amazon Personalization의 Software Development Engineer였다는 공식 소개와 그가 설명한 구성을 담는다. DeepAR의 확률 예측 연구와는 별도 기록이다. 두 연구는 Amazon 회사 연대기에서 함께 탐색하되 실제 공동저술 관계로 만들지 않았다.'
  ],takeaway:{title:'학습 모형을 쓰려면 자료와 계산 장치도 이어져야 한다',text:'추천의 표현과 학습뿐 아니라, 희소 자료의 준비·분산·실행·결과 반환이 실제 시스템의 일부다.'},technical:{title:'2016 공식 구성의 확인 범위',paragraphs:['Architecture overview는 EMR의 Spark와 ECS의 GPU 작업, ECR의 컨테이너, S3의 자료 교환을 구분한다. 신경망 행렬 연산 하나를 Spark 작업으로 노출하는 방식과 달리 학습·예측 자체를 큰 작업으로 다룬다.','이 카드에는 성능 수치나 개인별 개발 기여 비율을 새로 붙이지 않았다. 게시일은 공식 기술 글의 날짜이며 DSSTNE 최초 개발일과 동일시하지 않는다.']},referencesLabel:'공식 원문과 확인 위치'},keyIdeas:[{title:'희소한 자료를 전제로 한다',text:'관찰되지 않은 이용자–상품 조합이 많은 데이터의 성질이 모형과 계산 기반의 선택에 영향을 준다.'},{title:'자료 준비와 GPU 실행을 하나의 흐름으로 조직한다',text:'Spark에서 나눈 자료를 S3로 전달하고, 별도 GPU 작업을 실행한 뒤 결과를 돌려받는다.'}],videos:[],references:[{title:'AWS · Generating Recommendations at Amazon Scale with Apache Spark and Amazon DSSTNE',url:dsstne,location:'2016-07-09, by Kiuk Chung. 본문 첫 소개, Architecture overview, Deep learning with DSSTNE 확인. 글 저자와 전체 시스템의 단독 발명자를 구분.'}]}};
  if(!Array.isArray(window.TIMELINE_DATA)||!Array.isArray(window.ATLAS_PEOPLE_PROFILES)||!Array.isArray(window.ATLAS_PERSON_BACKGROUNDS))throw new Error('Load Amazon research after catalog-setup and person-background-data, before the views.');
  if(window.TIMELINE_DATA.some(e=>e.id===record.id))throw new Error('Duplicate canonical DeepAR event.');
  window.TIMELINE_DATA.push(record);
  const people=[
    {id:'valentin-flunkert',name:authors[0],nameKo:'발렌틴 플룬커트',tagline:'여러 시계열에서 하나의 예측 모형을 배우다',intro:'Flunkert는 DeepAR 2017 v1의 공동저자다. 첫 페이지는 David Salinas와 동등 기여를 표시하고 세 저자의 당시 소속을 Amazon Development Center Germany로 적었다. 2018년 AWS 출시 글은 Berlin Core Machine Learning 그룹에서 여러 예측 문제를 연구한다고 소개한다. 이력의 공백을 생애 추정으로 채우지 않고, 공동논문과 서비스 제공을 서로 다른 기록으로 연결했다.'},
    {id:'david-salinas',name:authors[1],nameKo:'데이비드 살리나스',tagline:'한 숫자 대신, 가능한 미래의 분포를 예측하다',intro:'Salinas는 Flunkert·Gasthaus와 DeepAR를 공동연구했다. 2017 v1은 Flunkert와 Salinas의 동등 기여를 명시한다. 관련 시계열의 패턴을 하나의 RNN에 함께 학습시키고, 상태에서 다음 값의 분포를 만들어 미래 경로를 샘플링하는 연구다. 2018년 AWS 공식 글의 저자로서 SageMaker 제공도 설명했다. 현재 직책이나 출생·학력은 이 자료만으로 추정하지 않았다.'},
    {id:'jan-gasthaus',name:authors[2],nameKo:'얀 가스트하우스',tagline:'예측의 경로와 불확실성을 함께 읽다',intro:'Gasthaus는 DeepAR 2017 v1의 세 공동저자 중 한 명이다. 당시 소속은 Amazon Development Center Germany였고, 2018년 공식 소개는 Berlin Core Machine Learning 그룹의 예측 연구를 기록한다. 이 카드에서는 개별 연구자의 단독 발명으로 분리하지 않고, 세 저자가 공유한 원논문·그림·확률 예측의 아이디어를 연결한다.'}
  ];
  for(const p of people){if(window.ATLAS_PEOPLE_PROFILES.some(x=>x.id===p.id))throw new Error('Duplicate Amazon researcher: '+p.id);window.ATLAS_PEOPLE_PROFILES.push({...p,aliases:[],tags:['neural'],roles:['DeepAR · 2017 공동연구','Amazon Development Center Germany · 원논문 당시'],works:[sharedWork()]});}
  if(window.ATLAS_PEOPLE_PROFILES.some(p=>p.id==='kiuk-chung'))throw new Error('Duplicate Kiuk Chung profile.');
  window.ATLAS_PEOPLE_PROFILES.push({id:'kiuk-chung',name:'Kiuk Chung',nameKo:'',aliases:[],tagline:'희소한 추천 자료에서, 실행 가능한 GPU 작업까지',intro:'2016년 AWS 공식 기술 글은 Kiuk Chung을 Amazon Personalization의 Software Development Engineer로 소개한다. Spark의 CPU 처리와 DSSTNE의 GPU 학습·예측을 연결하는 구성을 설명했다. 이 소개로 확인하는 것은 당시 역할과 글의 저술이며 DeepAR의 공동저자나 DSSTNE 전체의 단독 개발자로 확장하지 않는다.',tags:['industry'],roles:['Amazon Personalization · 2016 당시','DSSTNE·Spark 공식 기술 글 저자'],works:[chungWork]});
  const baseSources=[{id:'deepar-v1',title:'DeepAR · 2017 최초 원고 v1',url:paper,scope:'첫 페이지의 세 저자·동등 기여·Amazon Development Center Germany 소속.'},{id:'aws-launch',title:'AWS · SageMaker DeepAR 출시 글 (2018)',url:launch,scope:'About the Authors의 Berlin Core Machine Learning 그룹과 예측 연구 소개. 현재 소속으로 사용하지 않음.'}];
  for(const p of people){
    if(window.ATLAS_PERSON_BACKGROUNDS.some(x=>x.personId===p.id))throw new Error('Duplicate Amazon researcher background.');
    window.ATLAS_PERSON_BACKGROUNDS.push({personId:p.id,background:p.intro,backgroundSourceIds:['deepar-v1','aws-launch'],education:[],researchPlaces:[{institutionId:'amazon-development-center-germany',name:'Amazon Development Center Germany',period:'2017 v1 당시',place:'독일',note:'DeepAR 원고에 표시된 공동저자 소속.',sourceIds:['deepar-v1']},{institutionId:'amazon-core-ml-berlin',name:'Amazon · Core Machine Learning',period:'2018 공식 출시 글 당시',place:'베를린, 독일',note:'공식 저자 소개는 여러 Amazon 예측 문제를 연구하는 그룹으로 설명한다.',sourceIds:['aws-launch']}],connections:people.filter(x=>x.id!==p.id).map(other=>({personId:other.id,name:other.name,nameKo:other.nameKo,kind:'collaboration',relation:'collaborated-with',label:'DeepAR 공동연구',period:'2017 · 최초 원고 v1',description:'Flunkert·Salinas·Gasthaus가 DeepAR 원고를 함께 저술했다. Flunkert와 Salinas의 동등 기여를 논문이 명시한다.',sourceIds:['deepar-v1']})),sources:baseSources.map(s=>({...s}))});
  }
  window.ATLAS_PERSON_BACKGROUNDS.push({personId:'kiuk-chung',background:'2016년 공식 글에서 Amazon Personalization의 Software Development Engineer로 소개되었다. 희소 추천 데이터의 처리와 분산 GPU 학습·예측을 연결하는 아키텍처를 설명했다.',backgroundSourceIds:['aws-dsstne'],education:[],researchPlaces:[{institutionId:'amazon-personalization',name:'Amazon · Personalization',period:'2016-07-09 공식 글 당시',place:'',note:'당시 직무는 Software Development Engineer. 글에 없는 출신·학력·현재 소속은 추가하지 않았다.',sourceIds:['aws-dsstne']}],connections:[],sources:[{id:'aws-dsstne',title:'AWS · Kiuk Chung의 DSSTNE·Spark 기술 글 (2016)',url:dsstne,scope:'작성자·날짜·당시 직무와 Architecture overview.'}]});
  window.AtlasAmazonResearch=Object.freeze({record,content,chungWork,personIds:Object.freeze([...people.map(p=>p.id),'kiuk-chung'])});
})();
