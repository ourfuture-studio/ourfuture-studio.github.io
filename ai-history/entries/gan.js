/* The2014 adversarial estimation idea, with a separately authored finite distribution game. */
(function(){
  'use strict';const pdf='https://arxiv.org/pdf/1406.2661v1',html='https://arxiv.org/html/1406.2661v1',at=(p,t)=>({title:'Goodfellow 외 (2014) · '+t,url:pdf+'#page='+p});
  const parameters=(q,a=[0,0,0])=>({p:[.45,.1,.45],generatorLogits:q.map(Math.log),discriminatorLogits:a});
  window.AtlasEntries.register({id:'gan',record:{title:'정답 그림을 주는 대신, 구별하는 상대를 함께 배우다',subtitle:'Generative Adversarial Nets · GAN',dateLabel:'2014-06 · 첫 공개 / NIPS2014',people:['Ian J. Goodfellow','Jean Pouget-Abadie','Mehdi Mirza','Bing Xu','David Warde-Farley','Sherjil Ozair','Aaron Courville','Yoshua Bengio'],authorNote:'Ian J. Goodfellow를 비롯한 여덟 공동저자의 연구. arXiv1406.2661v1은 2014-06-10 공개되었으며, NIPS2014에 Generative Adversarial Nets라는 제목으로 실렸다. arXiv 서지의 제목은 Generative Adversarial Networks로 표시된다.',summary:'무작위 입력에서 자료를 만드는 생성자와, 실제 자료·생성 자료를 구분하는 판별자를 함께 학습했다. 생성자는 고정된 정답 이미지와 맞추기보다 현재 판별자의 신호로 결과의 분포를 바꾸려 했다.',detail:'',question:'',related:['backprop','dit','sora'],sources:[{title:'GAN · arXiv2014 첫 공개판 원문',url:pdf},{title:'GAN · arXiv 공식 판본 기록',url:'https://arxiv.org/abs/1406.2661v1'},{title:'GAN · NIPS2014 공식 서지',url:'https://papers.nips.cc/paper/2014/hash/f033ed80deb0234979a61f95710dbe25-Abstract.html'}],caveat:'이론의 분포 공간·최적 판별자 가정과 실제 유한 신경망 학습을 구분한다. 아래의 세 구역 게임은 직접 정한 분포를 정확 합산하는 사례이며 원논문의 이미지 생성 실험을 재현하지 않는다.'},content:{article:{
    question:'어떤 그림을 그대로 맞추라고 하지 않고도,\n그럴듯한 결과를 만드는 법을 배울 수 있을까?',
    opening:[
      '생성 모형은 입력의 이름을 맞히는 데서 한 걸음 더 나아가, 자료와 닮은 새 결과를 내려고 한다. 그러나 무작위 입력 z마다 대응하는 정답 그림 한 장이 주어지는 것은 아니다. 서로 다른 그림들이 모두 자연스러울 수 있을 때, 무엇을 오차로 삼아 생성자를 바꿀 수 있을까?',
      'Goodfellow와 공동연구자들은 그 오차를 만드는 상대도 함께 배우게 했다. 생성자 G는 z를 결과로 바꾸고, 판별자 D는 실제 자료와 현재 G가 만든 결과를 구분한다. D는 구분을 더 잘하려 하고 G는 자신의 결과가 실제 자료 쪽으로 판단되도록 바뀐다. 판별자가 배운 차이가 생성자를 가르치는 신호가 되는 발상이다.',
      '목표는 한 장의 겉모습만 닮는 데 그치지 않는다. 실제 자료에서 드문 결과와 흔한 결과의 비율까지 생성 분포가 닮아야 판별할 근거가 사라진다. 아래에서는 실제 자료가 두 쪽에 많이 놓인 세 구역을 두고, 한쪽에 쏠린 생성자와 아직 배우지 않은 판별자를 번갈아 바꾸며 이 관계를 살핀다.'
    ],
    visual:{id:'gan-distribution-game',navLabel:'만드는 분포와 구별하는 상대',title:'지금 다른 점을 배우고, 그 신호로 생성 분포를 바꾸다',caption:'원논문 §3의 두 목적과 §4의 분포 분석을 연결한 별도의 세 구역 게임입니다. 이미지 생성망 대신 구역별 기대값을 정확히 계산하므로 분포·현재 판별자·최적 판별자를 구분해 읽을 수 있습니다.',stages:[
      {id:'generate',label:'여러 결과를 만들다',text:'무작위 입력 하나가 어떤 결과로 바뀌는지 보고, 반복했을 때의 생성 비율 q와 실제 비율 p를 비교한다.'},
      {id:'judge',label:'다른 점을 구별하다',text:'현재 D가 두 출처를 어떻게 구분하는지 본다. 같은 분포에 대한 최적 판별자 D*와 아직 학습 중인 D는 다르다.'},
      {id:'learn',label:'서로의 신호로 바뀌다',text:'상대는 고정하고 D 또는 G를 한 번 바꾼다. 두 역할의 손실과 실제·생성 분포 차이를 함께 확인한다.'}
    ],example:{bins:['왼쪽 구역','가운데 구역','오른쪽 구역'],scenarios:[
      {id:'one-side',label:'왼쪽에 많이 만드는 G',parameters:parameters([.8,.1,.1]),explanation:'실제 자료 p는 왼쪽·오른쪽 구역에 각각 45%지만, 생성자는 왼쪽에 80%를 만듭니다. 양쪽을 구분해 배우면 오른쪽이 부족하다는 신호가 생길 수 있습니다.'},
      {id:'middle',label:'가운데에 많이 만드는 G',parameters:parameters([.15,.7,.15]),explanation:'실제 자료에서 드문 가운데 구역을 생성자가 자주 만듭니다. 한 결과가 그럴듯해 보인다는 판단과, 결과들의 전체 비율을 닮게 하는 목표를 구분합니다.'},
      {id:'matched',label:'실제 비율과 같은 G',parameters:parameters([.45,.1,.45]),explanation:'처음부터 q=p이고 D=0.5입니다. 이 유한한 게임에서는 두 쪽의 기울기가 0인 균형을 확인할 수 있습니다. 다른 시작점의 유한 신경망이 여기에 도달한다는 보장은 아닙니다.'},
      {id:'confident',label:'다르게 구별하기 시작한 D',parameters:parameters([.8,.1,.1],[-1,0,1]),explanation:'생성자가 많이 내는 왼쪽은 낮게, 부족한 오른쪽은 높게 판단하는 D에서 시작합니다. G만 먼저 바꿀 때 어떤 신호를 받는지 두 목적을 비교할 수 있습니다.'}
    ],initialScenario:'one-side',noise:[.05,.25,.5,.75,.95],initialNoise:.75,initialObjective:'non-saturating',scope:'세 구역의 실제 비율 p와 시작 로짓을 직접 정했다. q=softmax(b), Dᵢ=sigmoid(aᵢ)인 유한 분포 게임에서 기대값과 기울기를 정확 합산한다. G의 표본 표시는 역누적확률로 구간을 고르는 도식이며, 그 불연속 선택을 원문의 연속 G(z)처럼 역전파하지 않는다. 원논문 MLP·영상·미니배치 실험은 수행하지 않는다.'},
    originalImage:{src:'goodfellow-2014-distribution-game.png',title:'원논문 Fig.1 · 두 분포와 판별자가 바뀌는 네 장면',alt:'GAN2014 Fig1 도식의 네 패널. 실제분포는 검은 점선, 생성분포는 녹색 실선, 판별자는 파란 파선이며 아래의 z에서 x로 가는 매핑이 함께 표시된다.',caption:'Fig.1의 도식 부분을 발췌했다. 검은 점선은 실제 분포, 녹색 실선은 생성 분포, 파란 파선은 판별자다. 아래 화살표는 z가 G를 통해 x로 바뀌는 연결이다. 네 장면은 판별자를 바꾸고 생성자를 바꾸는 발상을 설명하며, 실제 실험의 수렴 기록이 아니다. 원문의 긴 영어 캡션은 제외했다.',credit:'Goodfellow 외 (2014), arXiv1406.2661v1, PDF p.3, Fig.1 도식 발췌. 선·축·화살표·패널 표기는 보존했다.',source:at(3,'Fig.1 · 판별자와 생성 분포의 변화')},
    source:at(3,'§3 식 (1)과 생성자의 대체 목적'),scope:'구역마다 실제·생성 비중이 같아 D=0.5가 되는 경우와, D가 아직 배우지 않아 0.5인 경우를 구분한다. 이론적 균형이나 손실 감소는 실제 이미지 품질·다양성·학습 안정성의 검증을 대신하지 않는다.'},
    takeaway:{title:'배워야 할 차이를, 함께 배우는 상대가 알려 주게 했다',text:'판별자가 실제 자료와 지금의 생성 결과를 비교해 배운 차이를 생성자의 신호로 쓴다. 생성자가 바뀌면 판별 문제도 달라진다. 이 결합이 생성 모형을 학습하는 길을 열었지만, 유한한 두 신경망이 안정적으로 자료의 모든 모습을 배우는지는 별도로 확인해야 한다.'},
    technical:{title:'원논문의 게임과 이 분포 계산을 더 읽기',paragraphs:[
      '출처와 판본: 여기서는 arXiv1406.2661v1(2014-06-10)의 본문·Fig.1·Algorithm1을 확인했다. NIPS2014 공식 서지와 여덟 저자를 대조했다. 이후 GAN 변형이나 이미지 생성 개선법을 2014년 모형의 구성요소로 넣지 않는다.',
      '생성자의 표현: §3(PDF p.2)는 잡음 z에 사전분포를 두고, 미분 가능한 MLP G(z;θg)가 자료 공간으로 보내도록 한다. G가 내는 표본들이 만드는 분포가 pg다. 원문의 G는 구역 확률 표가 아니며, 화면은 식 (1)의 기대값 관계만 별도의 유한 분포 가족으로 계산한다.',
      '판별자의 의미: D(x;θd)는 x가 생성자보다 자료에서 왔을 가능성을 나타내도록 학습한다. 두 출처를 같은 비중으로 제시하는 목적 아래에서의 판단이다. D(x)를 자료의 확률밀도 pdata(x), 절대적인 진실 확률, 보편적인 미적 품질로 해석하지 않는다.',
      '두 목적: §3 식 (1)(PDF p.3)은 D가 V=EₚlogD+E_qlog(1−D)를 크게, G가 작게 하도록 한다. G를 바꿀 때 실제 자료 항은 G와 무관하다. Algorithm1(PDF p.4)은 D를 k번 갱신한 뒤 G를 한 번 갱신하는 미니배치 절차를 적는다.',
      '대체 생성자 목적: §3(PDF p.3)은 초기 학습에서 log(1−D(G(z)))의 포화가 신호를 약하게 만들 수 있어 logD(G(z))를 크게 하는 대안을 제시한다. 화면에서는 음수인 −E_qlogD를 최소화한다. 두 목적은 같지 않으며, 실제 연속 생성망에서의 초기 기울기 장점을 이 이산 로짓 게임으로 재현했다고 주장하지 않는다.',
      '최적 판별자: Proposition1(PDF p.4)의 D*=p/(p+q)는 G를 고정하고 D가 충분히 자유로울 때의 식이다. p=q>0인 곳에서는 0.5가 되지만, p와 q가 모두 0인 곳은 목적이 D를 정하지 않는다. 계산 API는 이 경우 null로 구분한다. 현재의 유한 D가 매 순간 최적이라는 가정은 하지 않는다.',
      '분포 차이와 균형: §4.1(PDF pp.4–5)은 최적 D를 대입한 값 C(G)=−log4+2JS(p||q)를 제시한다. 따라서 충분히 자유로운 분포 공간의 전역 최적은 p=q다. JS는 두 분포의 차이를 나타내는 별도 지표다. 현재 D의 손실이 낮은지와 실제·생성 분포가 가까운지는 같은 질문이 아니다.',
      '이 계산의 매개변수와 미분: 세 구역에 b·a를 두고 q=softmax(b), D=sigmoid(a)로 계산한다. D손실 −V의 기울기는 (pᵢ+qᵢ)Dᵢ−pᵢ다. G목적이 Σᵢqᵢcᵢ이면 ∂L/∂bᵢ=qᵢ(cᵢ−Σⱼqⱼcⱼ)다. 여기서 minimax는 c=log(1−D), 대체 목적은 c=−logD다. 상대의 로짓은 그 한 번의 미분에서 고정한다.',
      '표본과 정확한 기대값: 화면의 구간 길이는 q이고 z는 해당 구간을 고른다. 한 번의 표본으로 손실을 추정하지 않고 세 구역을 모두 합한다. 불연속 구역 선택을 미분하는 척하지 않으며, 원논문의 연속 표본 경로 기울기와 구별한다. 데이터 X나 신경망을 학습하는 실행은 아니다.',
      '정지와 수치: 선택한 쪽의 로짓을 보폭0.5로 한 번씩 바꾸고 총20번으로 제한한다. softmax는 최댓값을 빼며 logD·log(1−D)는 softplus로 안정적으로 계산한다. 초기 D가 모두0.5이면 G가 받는 구역별 계수가 같아 먼저 G만 바꿔도 분포가 그대로일 수 있다.',
      '한계: §4의 이론은 무한한 모형 용량과 최적 판별자 등 조건 아래의 분포 공간 분석이다. §6(PDF pp.7–8)은 G와 D의 균형과 학습 동기화 문제를 논의한다. 생성 분포가 일부 모습에만 쏠릴 수 있다는 실패 가능성을 실제 수렴 보장으로 덮지 않는다. 이 카드에서는 원문 이미지 생성 결과나 수치를 재현하지 않는다.'
    ],formula:'원논문 §3 식 (1)\nmin_G max_D V = Eₚ logD + E_q log(1−D)\n대체 G 목적: min_G −E_q logD\n\n§4, Proposition1·Theorem1\nD*ᵢ = pᵢ/(pᵢ+qᵢ)　(pᵢ+qᵢ>0)\nmax_D V = −log4 + 2JS(p||q)\n\n화면의 별도 유한 분포 게임\nq = softmax(b), Dᵢ = sigmoid(aᵢ)\nD손실 기울기: (pᵢ+qᵢ)Dᵢ−pᵢ\nG손실 = Σᵢqᵢcᵢ\nG기울기: qᵢ(cᵢ−Σⱼqⱼcⱼ)\n한 번의 갱신에서는 상대 매개변수를 고정한다.'}
  },keyIdeas:[{title:'오차를 만드는 상대도 함께 배운다',text:'판별자가 실제 자료와 현재 생성 결과의 차이를 배우고, 그 차이를 생성자의 학습 신호로 제공한다.'},{title:'한 결과보다 결과들의 분포를 겨눈다',text:'흔한 모습과 드문 모습의 비율까지 맞아야 출처를 구별할 단서가 사라진다. 그럴듯한 한 표본이 모든 다양성을 배웠다는 증거는 아니다.'},{title:'상대를 고정한 갱신을 번갈아 연결한다',text:'D가 바뀌면 G가 받을 신호가 달라지고, G가 바뀌면 D의 구분 문제도 바뀐다. 이론의 균형과 실제 학습 안정성을 구분한다.'}],videos:[],references:[
    {title:'arXiv · 첫 공개판 서지',url:'https://arxiv.org/abs/1406.2661v1',location:'2014-06-10, v1. 여덟 저자. 서지 제목 Networks, PDF 표제 Nets.'},
    {title:'Goodfellow 외 · 적대적 학습의 제안',url:pdf+'#page=1',location:'§1, PDF pp.1–2. 생성 모형·판별 모형과 서론의 위조범·경찰 비유. 개인적 발명 일화로 바꾸지 않았다.'},
    {title:'Goodfellow 외 · 두 목적과 Fig.1',url:pdf+'#page=3',location:'§3, PDF p.3, 식 (1). minimax·대체logD 목적. Fig.1의 도식만 발췌하고 긴 캡션은 제외했다.'},
    {title:'Goodfellow 외 · Algorithm1과 최적 D',url:pdf+'#page=4',location:'PDF p.4. D의k단계·G의1단계, Proposition1과 지지집합의 경계.'},
    {title:'Goodfellow 외 · 분포 공간의 전역 최적',url:pdf+'#page=5',location:'§4.1–4.2, PDF p.5. JS 관계·비매개변수 조건. 유한 신경망 수렴 보장으로 확대하지 않음.'},
    {title:'Goodfellow 외 · 실험과 학습의 한계',url:pdf+'#page=7',location:'§5–6, PDF pp.6–8. 실제 이미지 실험은 화면의 세 구역 게임과 별개다.'}
  ]}});
})();
