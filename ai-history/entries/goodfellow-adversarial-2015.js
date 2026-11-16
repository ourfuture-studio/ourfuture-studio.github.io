/* A dated person-work entry; the source figure is mounted once by the shared article. */
(function(){
 'use strict';
 const paper='https://arxiv.org/pdf/1412.6572v3',gan='https://arxiv.org/pdf/1406.2661';
 const source=(page,title)=>({title:'Goodfellow·Shlens·Szegedy · '+title,url:paper+'#page='+page});
 const reading={
  observations:[
   {id:'original',title:'원래 입력',label:'Figure 1 · 왼쪽 x',idea:'사람이 판다로 보는 사진을, 모델도 처음에는 panda로 분류했다.',detail:'원문 그림은 GoogLeNet이 이 입력에 부여한 panda 확률을 57.7%로 표시한다. 이것은 사람의 확신이나 일반적인 판다 인식 정확도가 아니라, 이 사례에 대한 모델 출력이다.',source:source(3,'Figure 1 · 입력과 예측')},
   {id:'direction',title:'오차를 키우는 방향',label:'Figure 1 · 가운데 sign(∇ₓJ)',idea:'아무 잡음이나 더하는 대신, 현재 분류기의 손실이 커지는 입력 방향을 찾았다.',detail:'가운데 도판은 입력에 대한 손실 기울기의 부호다. ε=.007을 곱해 더한다. 그림에 적힌 nematode·8.2%는 이 방향 도판을 입력했을 때의 예측이며, 목표로 지정한 공격 클래스라는 뜻이 아니다.',source:source(3,'§4 · Fast Gradient Sign Method')},
   {id:'perturbed',title:'작은 변화 뒤의 입력',label:'Figure 1 · 오른쪽 x + η',idea:'눈에는 비슷한 사진이지만, 많은 입력 성분의 변화가 모델의 판단을 함께 밀 수 있다.',detail:'원문 오른쪽은 gibbon·99.3%로 표시된다. ε=.007은 이 그림에서 GoogLeNet의 입력 변환을 거친 좌표계의 조건이다. 모든 이미지·모델에서 같은 크기가 보이지 않거나 같은 오분류를 만든다고 일반화하지 않는다.',source:source(3,'Figure 1 · GoogLeNet / ImageNet')}
  ],
  steps:[
   {id:'loss',title:'바꿀 것은 입력 x',label:'모델을 고정하고 판단의 약한 방향을 묻다',formula:'θ 고정 · x를 바꾸어 J(θ, x, y)를 키우기',idea:'평소의 학습은 연결값 θ를 바꿔 정답의 손실을 줄인다. 적대적 입력을 찾을 때는 현재 모델을 고정하고, 입력을 조금 바꿨을 때 손실이 어느 쪽으로 커지는지 묻는다.',detail:'같은 역전파 계산을 사용해도 미분하는 대상과 목적이 다르다. 이 논문의 FGSM은 특정 오답 이름을 지정하는 대신 정답 y에 대한 손실을 키우는 방향이다.',source:source(3,'§4 · 입력에 대한 손실 기울기')},
   {id:'sign',title:'방향에 변화 한도를 곱하기',label:'Fast Gradient Sign Method · §4의 번호 없는 수식',formula:'η = ε sign(∇ₓJ(θ, x, y))\nx̃ = x + η',idea:'기울기의 각 성분에서 부호를 고르고 ε를 곱한다. 각 입력 성분의 변화 한도를 정한 채, 손실의 선형 근사값을 크게 만드는 빠른 선택이다.',detail:'ε는 이 좌표계에서 한 성분에 허용한 변화의 크기다. 한 번의 선형 근사이므로 일반적인 비선형 신경망의 진짜 최악 입력을 항상 찾는다는 보장은 아니다.',source:source(3,'§4 · FGSM 정의')},
   {id:'sum',title:'작은 성분들이 함께 쌓이기',label:'§3 · 고차원 선형 계산의 설명',formula:'wᵀ(x + η) = wᵀx + wᵀη\nη = ε sign(w) ⇒ wᵀη = ε∥w∥₁',idea:'한 성분의 변화가 작아도, 많은 성분이 가중치와 같은 방향으로 움직이면 합산된 변화는 커질 수 있다. 복잡한 비선형성만 있어야 생기는 현상이 아니라는 것이 논문의 설명이다.',detail:'이 식은 §3의 선형 내적 사례다. 앞의 FGSM 손실 기울기 식과 구분한다. 고차원이라는 사실만으로 모든 입력이 취약하거나 모든 모델이 같은 이유로 실패한다고 단정하지 않는다.',source:source(2,'§3 · 선형 설명의 조건')}
  ],
  comparisons:[
   {id:'training',title:'정답으로 분류기를 배우기',description:'입력과 정답을 보고, 다음에는 더 잘 맞히도록 연결값을 바꾼다.',rows:[{label:'바꾸는 대상',value:'모델의 연결값 θ'},{label:'줄이려는 것',value:'정답 y에 대한 손실 J'},{label:'판단할 점',value:'평소 자료에서의 정확도가 작은 최악 방향 변화에 대한 안정성까지 보장하지는 않는다.'}],source:source(4,'§6 · 표준 학습과 견고성의 구분')},
   {id:'attack',title:'고정된 모델의 약점 찾기',description:'이미 배운 모델을 고정하고, 제한된 입력 변화로 손실을 키우는 방향을 찾는다.',rows:[{label:'바꾸는 대상',value:'입력 x · 현재 연결값 θ는 고정'},{label:'키우려는 것',value:'정답 y에 대한 손실의 선형 근사'},{label:'판단할 점',value:'원문 Figure 1은 GoogLeNet 사례다. 화면에서 판다 이미지를 다시 분류하거나 공격을 실행하지 않는다.'}],source:source(3,'§4 · 빠른 적대적 입력 생성')},
   {id:'robustness',title:'약점을 드러낸 입력으로 다시 배우기',description:'현재 모델에 맞춰 적대적 입력을 만들고, 원래 입력과 함께 학습해 손실을 줄인다.',rows:[{label:'입력 단계',value:'현재 모델의 손실을 키우는 입력을 구성'},{label:'학습 단계',value:'원래 입력과 적대적 입력의 손실을 함께 줄이도록 θ를 조정'},{label:'판단할 점',value:'§6의 MNIST·maxout 실험에서 보인 개선과 모든 공격·환경에 대한 안전 보장은 다르다.'}],source:source(5,'§6 · 적대적 학습 목적과 실험')}
  ],
  related:[{id:'gan',href:'#event=gan',label:'GAN · 생성자와 판별자를 배우는 다른 문제'},{id:'alexnet',href:'#event=alexnet',label:'AlexNet · 특징을 배우는 시각 인식과 비교'},{id:'ian-goodfellow',href:'#person=ian-goodfellow',label:'굿펠로 · 인물과 연구 연대기'}]
 };
 const content={article:{
  question:'사람에게는 같은 사물인데,\n왜 신경망의 판단은 작은 변화에 뒤집힐까?',
  opening:[
   '사물 이름을 잘 맞히는 신경망이, 사람처럼 사물의 의미를 구별하게 된 것일까? 굿펠로·슐렌스·세게디는 눈에 비슷하게 보이는 입력에서도 모델의 답이 크게 달라지는 약점을 분석했다. 정답률과 사람이 기대하는 지각의 안정성이 같은 성질인지 묻는 연구다.',
   '이들의 설명은 “신경망이 너무 복잡해서”라는 말에 머무르지 않는다. 많은 입력 성분에 걸친 작은 변화가 선형 계산에서 같은 방향으로 더해지면 판단을 크게 움직일 수 있다고 보았다. 이 관점에서, 이미 학습한 모델의 연결값 대신 입력에 대한 손실 기울기를 이용해 약한 방향을 빠르게 찾는 FGSM을 제시했다.',
   '약점을 만드는 일은 학습을 고치는 방법으로도 이어졌다. 현재 모델을 흔드는 입력을 구성하고 그것을 원래 입력과 함께 학습하면, 시험에서 만나기 쉬운 사례만 맞히는 것에서 더 나아가려 할 수 있다. 논문의 개선 결과를 모든 모델과 공격에 대한 안전 보장으로 확대하지는 않는다.',
   '아래는 2014년 12월 첫 공개, ICLR 2015 발표 논문의 2015년 3월 arXiv v3를 기준으로 읽는다. Figure 1은 GoogLeNet의 원문 결과이며 AlexNet 실험이나 이 웹 화면의 추론 결과가 아니다.'
  ],
  visual:{id:'goodfellow-adversarial-reading',title:'배운 판단의 약한 방향을, 원문에서 읽기',navLabel:'작은 변화가 판단을 흔드는 이유',caption:'Figure 1의 세 부분, 입력 기울기, 적대적 학습을 나누어 살펴보세요. 원도판의 예측값을 재현하는 모델은 실행하지 않습니다.',reading,source:source(3,'Figure 1 · §§3–6')},
  takeaway:{title:'맞히는 능력과, 무엇을 근거로 맞혔는지는 함께 물어야 한다',text:'적대적 예제는 좋은 정답률만으로 지각의 안정성을 판단하기 어렵다는 질문을 드러낸다. FGSM은 입력에서 손실을 키우는 방향을 찾고, 적대적 학습은 그 약점을 학습 경험에 다시 포함하려는 선택이다.'},
  technical:{title:'선형 설명·FGSM·원실험의 범위 더 읽기',paragraphs:[
   '§3의 wᵀ(x+η)는 선형 내적의 예다. max norm으로 변화의 각 성분을 제한하면 가중치 부호와 맞춘 방향의 영향이 ε∥w∥₁로 합산된다. 이 설명을 모든 신경망의 완전한 이론으로 읽지는 않는다.',
   '§4/PDF3의 FGSM 정의는 번호가 없는 수식이다. η=εsign(∇ₓJ(θ,x,y))에서 θ는 모델 파라미터, x는 입력, y는 정답이다. 입력 변화는 손실의 국소 선형 근사를 크게 하는 선택이며 일반적 비선형 모델의 정확한 전역 최적 공격과 구분한다.',
   'Figure 1의 모델은 ImageNet을 다루는 GoogLeNet이다. 원래 입력의 panda 57.7%, 방향 도판 자체의 nematode 8.2%, 변형한 입력의 gibbon 99.3%를 나란히 놓았다. 가운데 그림의 분류 이름을 공격 목표로 정한 것으로 해석하지 않는다.',
   '같은 그림의 ε=.007은 GoogLeNet의 실수 입력 변환 뒤 조건으로 설명된다. 다른 정규화·입력 범위·모델·사진에 그대로 적용할 보편적 크기가 아니다. 원문에 적힌 confidence는 해당 모델의 출력이며 확률 보정이나 사람의 신뢰를 입증하지 않는다.',
   '§6/PDF5는 원래 입력과 현재 모델로 만든 적대적 입력을 섞은 목적함수를 제시한다. 이 카드에서는 수치 성능을 재실행하지 않았으며 논문의 특정 MNIST·maxout 조건을 일반 배포 환경으로 확대하지 않는다.',
   'GAN은 생성자와 판별자를 함께 학습하는 게임이다. 여기의 입력 공격은 고정된 분류기의 손실을 키우며, 적대적 학습은 그렇게 만든 입력에 대한 분류기의 손실을 줄인다. adversarial이라는 단어를 공유하지만 바꾸는 대상과 목적이 다르다.',
   '이 연구는 세 공동저자의 작업이다. 세게디 등의 앞선 적대적 예제 발견과, 이 논문의 선형 설명·빠른 방법을 구분한다. 화면의 버튼은 원문을 읽을 관점을 바꾸며 실제 이미지 분류·공격·재학습을 실행하지 않는다.'
  ],formula:'선형 예: wᵀ(x + η) = wᵀx + wᵀη\nFGSM: η = ε sign(∇ₓJ(θ,x,y))\n적대적 입력: x̃ = x + η\n공격에서는 θ 고정, 학습에서는 θ 갱신'}},
  keyIdeas:[{title:'정답률에서 지각의 안정성으로 질문을 넓히다',text:'비슷해 보이는 입력에서 판단이 유지되는지, 배운 분류 경계의 약한 방향을 살핀다.'},{title:'기울기를 연결값이 아니라 입력에 적용하다',text:'이미 배운 모델에서 손실을 키우는 입력 방향을 계산해 빠르게 약점을 찾는다.'},{title:'약점을 학습의 경험으로 되돌리다',text:'적대적 입력과 원래 입력을 함께 사용해 분류기의 판단을 다시 조정하려 한다.'}],
  videos:[],references:[{title:'Goodfellow·Shlens·Szegedy · Explaining and Harnessing Adversarial Examples · ICLR 2015',url:paper,location:'v3 본문·도판 직접 확인. PDF2 §3 선형 내적, PDF3 Figure 1·§4 번호 없는 FGSM 수식, PDF4–5 §6 적대적 학습. Figure1 GoogLeNet·ImageNet·ε=.007.'},{title:'arXiv 제출 이력 · 2014 첫 공개와 2015 v3',url:'https://arxiv.org/abs/1412.6572v3',location:'v1 2014-12-20, v3 2015-03-20. 학회 표기는 PDF 표제의 ICLR 2015.'},{title:'Goodfellow 외 · Generative Adversarial Nets · 2014',url:gan,location:'§3의 생성자·판별자 목적과 비교하는 읽기 경로. 이 카드에서 GAN 학습을 새로 실행하지 않는다.'}]
 };
 window.ATLAS_ADVERSARIAL_GOODFELLOW_WORK={id:'goodfellow-adversarial-2015',year:2015,dateLabel:'2014-12 첫 공개 · ICLR 2015 · arXiv v3',title:'적대적 예제 · 작은 입력 변화로 드러난 판단의 약점',summary:'고차원 입력의 작은 변화가 선형 계산에서 함께 쌓일 수 있다는 설명에서, 입력 기울기로 약점을 찾는 FGSM과 적대적 학습을 제시했다.',type:'학술논문',track:'neural',people:['Ian Goodfellow','Jonathon Shlens','Christian Szegedy'],authorNote:'Goodfellow·Shlens·Szegedy의 공동연구. 세게디 등의 앞선 발견과 이 논문의 설명·방법을 구분한다.',sources:[{title:'Explaining and Harnessing Adversarial Examples · arXiv v3',url:paper}],caveat:'원문 Figure1의 결과와 해설이다. 웹 화면에서 실제 분류기·공격·학습을 실행하지 않으며, 제한된 논문 실험을 모든 환경의 견고성으로 일반화하지 않는다.',content};
})();
