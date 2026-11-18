/* One shared, dated Google research record, with original equations rather than an invented plate. */
(function(){
 'use strict';const id='distillation-2015',pdf='https://arxiv.org/pdf/1503.02531v1',abs='https://arxiv.org/abs/1503.02531',at=(page,title)=>({title:'Hinton·Vinyals·Dean (2015 v1) · '+title,url:pdf+'#page='+page});
 const content={article:{
  question:'모델의 연결값을 그대로 복사하지 않고,\n배운 판단 방식을 더 간단한 모델에 옮길 수 있을까?',
  opening:[
   '학습할 때에는 많은 계산으로 자료의 규칙을 찾을 수 있어도, 많은 사용자에게 답할 때에는 지연과 자원이 문제가 된다. 여러 모델의 예측을 모으면 더 나은 판단을 얻기도 하지만 매번 모두 실행하기는 비싸다. Hinton·Vinyals·Dean은 지식을 배우는 구조와 실제로 사용하는 구조가 꼭 같아야 하는지 물었다.',
   '지식을 특정 연결값의 묶음으로만 보면 다른 크기의 모델로 옮기기 어렵다. 이 논문은 입력에 어떤 출력 분포를 내는지도 배운 지식의 표현으로 보았다. 큰 모델이나 앙상블이 만든 분포를 목표로 삼아 다른 모델을 학습한다. 교사의 가중치를 그대로 복사하거나, 두 모델이 같은 내부 구조를 가져야 하는 방식은 아니다.',
   '정답이2라는 표지만 주면3과7은 모두 오답이다. 그러나 어떤2는3을, 다른2는7을 조금 더 닮을 수 있다. 원문은 정답 이외의 작은 확률들에도 이런 구분이 담길 수 있다고 설명한다. 가장 큰 확률의 이름만 남기면 사라지는 정보를 학생 모델의 학습 신호로 사용하려 했다.',
   '온도T를 높인 softmax는 교사의 분포를 부드럽게 만든다. 학생도 같은 온도에서 그 분포를 맞히고, 정답이 있으면 온도1의 정답 학습을 함께 할 수 있다. 학습을 마친 학생은 온도1로 사용한다. 목표는 온도를 높여 정답을 더 잘 맞히게 하는 마법이 아니라, 교사가 배운 구분을 다른 모델의 연결값에 옮기는 것이다.'
  ],
  visual:{id:'distillation-2015-learning',navLabel:'정답 너머의 분포를 옮기다',title:'정답 표지와 교사 분포가, 학생의 연결을 다르게 바꾸다',caption:'원문 Eq.1·2와 §2의 두 목적을 직접 정한 두 입력·세 범주로 계산합니다. 온도·목표를 바꾸고 학생만 한 번 학습시켜, 정답이 아닌 두 범주의 상대적 차이를 확인합니다.',source:at(3,'§2 · 두 학습 목적과 Eq.2'),scope:'입력 그림·두 특징값·교사 logits·학생 초기값은 직접 정했습니다. 그림을 인식해 값을 얻지 않으며 MNIST·Google 음성 모델을 실행하지 않습니다. 작은 선형 학생의 실제 손실·기울기·연결 갱신을 계산하고, 실제 배포 성능이나 논문 실험과 구분합니다.'},
  takeaway:{title:'정답의 이름뿐 아니라, 입력에 대한 판단 분포를 전달하다',text:'교사는 고정한 채 학생의 연결값을 배운다. 온도는 확률과 학습 신호의 형태를 바꾸며, 학생이 교사를 얼마나 따라갈지는 용량·자료·목표의 조건에 달려 있다. 높은 온도나 낮은 화면 손실이 실제 일반화 성능을 보장하지 않는다.'},
  technical:{title:'온도·기울기·원논문의 실험을 구분해 읽기',paragraphs:[
   '판본과 공동연구: arXiv v1 첫 제출은2015-03-09이고 서지에는 NIPS2014 Deep Learning Workshop을 표시한다. PDF1쪽은 세 저자의 Google Inc. 소속과 Hinton의 Toronto·CIFAR 추가 소속, Hinton·Vinyals의 동등 기여를 명시한다. 원문은 Caruana 등의2006년 model compression을 선행연구로 설명하므로 이 카드가 모델 압축의 시작을 단독 발명으로 표기하지 않는다.',
   '분포와 목표: PDF2쪽 Eq.1은 logits를T로 나눈 softmax다. PDF3쪽 §2는 교사의 soft target과 학생의 같은 온도 분포 사이 cross-entropy, 그리고 같은 학생 logits를 온도1로 사용한 정답 cross-entropy를 함께 다룬다. 아래 α는 두 목적의 비중을 나타내려고 붙인 표기이며 원문에 고정된 보편 최적값은 아니다.',
   '기울기와T²: Eq.2의 soft-target 기울기는 (qᵢ−pᵢ)/T다. 원문은 높은 온도에서 작아지는 학습 신호의 상대적 크기를 보정하려고 soft 목표에T²를 곱하도록 설명한다. 화면은 T² 포함/생략을 실제 수치로 비교한다. 온도 변경으로 생긴 서로 다른 손실 값을 모델 성능의 우열로 비교하지 않는다.',
   'logit 맞추기와의 관계: §2.1 Eq.3–4는 온도가 logits 크기에 비해 높고 각 입력의 logits 평균을0으로 맞춘 조건에서 제곱오차와의 관계를 유도한다. 모든 온도에서 두 목적이 같다고 말하지 않는다. 화면은 이 근사식 대신 정확한 softmax 기울기를 계산한다.',
   '실험 범위: §3의 MNIST와 §4의 음성 모델은 서로 다른 실험이다. Table1의 음성 사례는 같은 크기의 구성원10개를 하나로 옮긴 것으로, 모든 증류에서 학생의 개별 층 수까지 줄였다는 뜻은 아니다. §8은 specialists의 지식을 단일 망으로 다시 증류한 결과는 아직 보이지 못했다고 명시한다. 아래 자체 도식은 그 전체 전문 모델 체계를 재현하지 않는다.'
  ],formula:'pᵀ = softmax(v / T) · 고정 교사\nqᵀ = softmax(z / T) · 학생\ny = 정답 one-hot\nL = α T² CE(pᵀ,qᵀ) + (1−α) CE(y,q¹)\n∂L/∂zᵢ = α T(qᵀᵢ−pᵀᵢ) + (1−α)(q¹ᵢ−yᵢ)\n\n화면의 학생: z = Wx + b\nW ← W − η(∂L/∂z)xᵀ, b ← b − η∂L/∂z\n추론에서는 T=1. 교사는 업데이트하지 않습니다.'}
 },keyIdeas:[{title:'연결의 복사보다 입력–출력 관계의 전달',text:'서로 다른 구조도 교사의 출력 분포를 학습 목표로 삼을 수 있다.'},{title:'오답 사이의 상대적 확률도 정보',text:'정답 하나로 압축하면 지워지는 구분을 soft target에 담는다.'},{title:'학습 온도와 사용 온도를 나누다',text:'같은 높은 온도에서 분포를 맞힌 뒤 학생은 온도1로 사용한다.'}],videos:[],references:[
  {title:'2015 v1 원논문 · 전체 본문',url:pdf,location:'PDF1–2쪽 §1의 학습/배포 동기·출력 분포·선행 압축 연구, PDF2쪽 Eq.1, PDF3쪽 §2·Eq.2–4, PDF4–5쪽 §4·Table1, PDF8쪽 §8의 specialist 증류 한계.'},
  {title:'arXiv 서지·제출 이력',url:abs,location:'2015-03-09 v1. 저자 Geoffrey Hinton·Oriol Vinyals·Jeff Dean. Comments의 NIPS2014 Deep Learning Workshop 표기와 arXiv 공개 연도를 구분한다.'}
 ]};
 const record={id,year:2015,track:'neural',title:'교사의 확률에 담긴 구분을 학생 모델로 옮기다',subtitle:'Distilling the Knowledge in a Neural Network · Knowledge Distillation',dateLabel:'2015.03.09 · arXiv v1',people:['Geoffrey Hinton','Oriol Vinyals','Jeffrey Dean'],authorNote:'Hinton·Vinyals·Dean의 공동 논문이다. 원문은 Dean을 Jeff Dean으로 표기하며 기존 Jeffrey Dean 인물 식별자에 연결한다. 세 저자는 당시 Google Inc. 소속이고 Hinton·Vinyals는 동등 기여를 표시한다.',summary:'큰 모델이나 앙상블의 부드러운 출력 분포를 학생의 학습 목표로 사용해, 정답 이외 범주의 상대적 구분도 전달하려 했다.',detail:'원문 Eq.1·2, 온도T와T² 보정, 정답 목표와 교사 목표, 학생 연결의 실제 갱신을 별도로 읽는다.',question:content.article.question,visual:'network',sources:[at(1,'공동저자·당시 소속과 연구 동기'),at(3,'온도·두 목표·기울기')],related:['backprop','seq2seq','deepseek-r1'],caveat:'2015 v1의 분류 확률 전달을 설명한다. 화면의 임의 수치와 학생 학습은 실제 교사 모델·MNIST·음성 실험의 재현이 아니며, 후속 언어모델 증류의 모든 절차가 이 식과 같다는 뜻도 아니다.',content};
 if((window.TIMELINE_DATA||[]).some(e=>e.id===id))throw Error('Duplicate Distillation2015 record.');window.TIMELINE_DATA.push(record);window.AtlasEntries.register({id,record:{...record},content});window.ATLAS_DISTILLATION_2015=record;
})();
