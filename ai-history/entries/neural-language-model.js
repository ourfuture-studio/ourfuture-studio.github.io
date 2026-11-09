/* One jointly learned representation/probability model, JMLR2003. */
(function(){
  'use strict';
  const paper='https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf',page='https://www.jmlr.org/papers/v3/bengio03a.html';
  const at=(number,title)=>({title:'Bengio 외 (2003) · '+title,url:paper+'#page='+number});
  window.AtlasEntries.register({
    id:'neural-language-model',
    record:{
      title:'처음 보는 단어 조합도, 공유한 표현으로 예측하다',
      subtitle:'A Neural Probabilistic Language Model · 단어 표현과 확률의 공동 학습',
      dateLabel:'2003-02 · JMLR 논문 출판',
      people:['Yoshua Bengio','Réjean Ducharme','Pascal Vincent','Christian Jauvin'],
      authorNote:'Yoshua Bengio·Réjean Ducharme·Pascal Vincent·Christian Jauvin의 공동 연구. JMLR 3(Feb), 1137–1155, 2003. 논문은 앞선 분산 표현·신경 언어모형 연구와 자신의 접근을 §1.2에서 비교한다.',
      summary:'단어의 연속 벡터와 다음 단어의 확률 함수를 함께 학습해, 한 문맥에서 얻은 경험이 비슷한 단어 조합에도 영향을 주도록 했다.',
      detail:'',question:'',related:['word2vec','lstm','seq2seq','transformer','gpt3'],
      sources:[{title:'JMLR · A Neural Probabilistic Language Model · 공식 논문',url:paper},{title:'JMLR · 공식 서지와 초록',url:page}],
      caveat:'2003년의 고정 길이 문맥 신경 언어모형을 다룬다. 화면의 단어·행렬·한 번의 갱신은 직접 정한 값이며, 원논문의 학습 벡터·말뭉치 실험·성능을 재현한 결과가 아니다.'
    },
    content:{
      article:{
        question:'처음 보는 단어 조합 앞에서도,\n이미 배운 말의 쓰임을 나누어 쓸 수 있을까?',
        opening:[
          '문장에 등장할 수 있는 단어의 조합은 빠르게 늘어난다. 어떤 짧은 표현을 본 적이 있어도, 한 단어가 바뀐 문맥 전체는 처음 만나는 조합일 수 있다. “the cat” 다음에 어떤 말이 올지 배웠다면, 그 경험이 “the dog”를 읽을 때도 도움이 되게 할 수 있을까?',
          'Bengio와 공동연구자들은 단어마다 조정할 수 있는 벡터를 두고, 그 벡터들을 입력으로 다음 단어의 확률을 계산하는 모형을 제시했다. 같은 단어는 어느 문맥에서 만나도 같은 표현 표 C를 사용한다. 단어 표현과 예측 함수를 함께 배우므로, 한 예측의 오차가 다른 문맥에서도 다시 쓰일 매개변수를 바꾼다.',
          '비슷한 벡터를 가진 단어로 문맥이 조금 달라지면, 매끄러운 확률 함수의 출력도 가까워질 수 있다. 이것이 단어 조합을 모두 별도로 외우는 대신 경험을 공유하려는 발상이다. 아래에서는 여덟 단어의 값으로 그 경로를 직접 계산하고, 한 번의 학습이 같은 표현과 예측 함수를 쓰는 다른 문맥까지 어떻게 바꾸는지 살핀다.'
        ],
        visual:{
          id:'neural-language-representation',navLabel:'표현에서 다음 말로',
          title:'같은 표현을 찾고, 같은 예측 함수를 다시 쓰다',
          caption:'논문의 Fig.1과 §2의 식을 바탕으로 구성한 시각화입니다. 이 사례에 직접 정한 단어·벡터·연결 값을 사용하며, 원문 도판은 아래에서 따로 읽습니다.',
          stages:[
            {id:'represent',label:'표현을 나누어 쓰다',text:'문맥의 단어를 고르고, 두 위치가 같은 표현 표 C에서 벡터를 찾는 모습을 살핀다. 좌표의 각 성분에 사람이 뜻을 붙여 놓은 것은 아니다.'},
            {id:'predict',label:'다음 말의 확률로',text:'찾은 벡터를 위치 순서에 맞춰 이어 붙이고, 은닉 표현과 모든 후보의 확률로 바꾼다. 입력·중간값·확률을 연결해 읽는다.'},
            {id:'learn',label:'한 경험이 닿는 곳',text:'정답 단어를 정해 한 번 갱신한다. 입력 단어의 표현과 공통 예측 함수가 함께 바뀌며, 다른 문맥의 출력에도 영향을 줄 수 있다.'}
          ],
          example:{
            vocabulary:['the','a','cat','dog','bird','sleeps','runs','flies'],
            labels:['the · 그','a · 한','cat · 고양이','dog · 강아지','bird · 새','sleeps · 잔다','runs · 달린다','flies · 난다'],
            contexts:[
              {id:'cat',label:'the cat',words:[0,2],translation:'그 고양이는 …'},
              {id:'dog',label:'the dog',words:[0,3],translation:'그 강아지는 …'},
              {id:'bird',label:'the bird',words:[0,4],translation:'그 새는 …'},
              {id:'a-cat',label:'a cat',words:[1,2],translation:'한 고양이는 …'},
              {id:'a-dog',label:'a dog',words:[1,3],translation:'한 강아지는 …'},
              {id:'a-bird',label:'a bird',words:[1,4],translation:'한 새는 …'}
            ],
            initialContext:'cat',initialComparison:'dog',initialTarget:5,targetChoices:[5,6,7],learningRates:[.05,.1,.2],initialRate:.1,
            parameters:{
              C:[[.1,.5],[.12,.45],[.8,.1],[.65,.2],[-.7,.8],[.2,.1],[.3,-.2],[-.5,.6]],
              H:[[1,-.2,.3,.1],[.1,1,-.1,.2],[-.2,.3,.8,-.4]],
              U:[[-.2,0,0],[-.2,0,0],[-.2,0,0],[-.2,0,0],[-.2,0,0],[1.2,-.8,.2],[.8,-.2,.6],[-1.2,1,.1]],
              d:[.05,-.05,0],b:[-1.4,-1.4,-1.4,-1.4,-1.4,.1,0,0]
            },
            scope:'여덟 단어·두 위치·두 성분 벡터·은닉값 세 개의 시작 매개변수를 직접 정했다. 원문 식 (1)에서 W=0인 모형을 사용한다. 한 문맥·정답에 대한 음의 로그우도를 한 번 줄이며 정규화 항은 넣지 않는다. 실제 말뭉치 학습이나 논문의 성능 재현은 수행하지 않는다.'
          },
          originalImage:{
            src:'bengio-2003-architecture.png',title:'원논문 Fig.1 · 같은 표 C를 여러 위치에서 조회한다',
            alt:'Bengio와 공동연구자2003 Fig1. 입력 단어 인덱스가 공유된 C표의 벡터로 연결되고 tanh층과 softmax출력으로 이어진다. 직접 연결은 점선으로 표시된다.',
            caption:'원문 Fig.1의 도식 부분을 발췌했다. 단어 인덱스·공유 표 C·tanh·softmax 구조를 보존하고 캡션의 설명은 한국어로 옮겼다. 점선은 입력 특징에서 출력으로 가는 선택적 직접 연결이다. 위 계산에서는 논문이 허용하는 W=0을 골라 이 연결을 사용하지 않는다.',
            credit:'©2003 Yoshua Bengio, Réjean Ducharme, Pascal Vincent, Christian Jauvin. JMLR 공식 PDF p.6 / 인쇄 p.1142, Fig.1. 원문 도식 부분 발췌, 설명은 한국어로 다시 적어 밖에 표시.',
            source:at(6,'Fig.1 · 공유 표현과 확률 모형')
          },
          source:at(3,'§1.1 분산 표현 · §2 신경 언어모형'),
          scope:'설정한 행렬로 전방 계산·음의 로그우도·미분·한 번의 갱신을 수행한다. 변화량은 이 사례의 실행 결과이며, 원논문의 학습 결과나 문맥 일반화 성능의 검증으로 해석하지 않는다.'
        },
        takeaway:{title:'단어의 표현과 예측하는 방법을, 같은 경험에서 함께 바꾼다',text:'각 문맥이 같은 표 C와 같은 예측 함수를 다시 사용하면 한 예측의 오차가 다른 문맥에서 쓸 계산에도 닿는다. 가까운 표현과 공유된 함수가 처음 보는 조합을 다룰 길을 만든다. 그 변화가 실제 언어 예측을 개선하는지는 별도의 자료와 평가에서 확인해야 한다.'},
        technical:{
          title:'원논문의 식과 이 계산의 전제를 더 읽기',
          paragraphs:[
            '문제와 아이디어: §1.1(PDF pp.3–4 / 인쇄 pp.1139–1140)은 단어마다 분산 벡터를 두고, 그 벡터로 단어열 확률을 표현하며, 표현과 확률 함수의 매개변수를 동시에 배우는 세 요소를 제시한다. 비슷한 역할을 하는 단어의 표현이 가깝고 확률 함수가 매끄러우면, 한 조합에서 배운 정보가 이웃 조합에도 영향을 줄 수 있다는 논리다. 이 주장을 모든 비슷한 단어의 모든 문맥에서 같은 뜻이 된다는 보장으로 읽지 않는다.',
            '고정 길이 문맥: §2(PDF p.5)는 앞선 n−1개 단어로 다음 단어의 조건부 확률을 나타낸다. 여기서는 앞선 두 단어를 사용한다. 현재 문맥의 모든 앞부분을 무제한으로 기억하는 모형이나, Transformer의 자기 어텐션을 이 2003년 구조에 넣지 않는다.',
            '공유 표와 위치: C는 어휘 수×표현 차원의 표다. 같은 단어는 다른 문맥·위치에서도 같은 C행을 찾는다. 찾은 벡터는 위치별로 이어 붙이므로 평균과 달리 순서를 구분한다. 이 계산은 원문 식 (1)의 x 표기를 따라 최근 단어의 벡터부터 잇는다. 화면의 문맥 단어는 읽는 순서로 표시하고, x에서는 최근 단어가 먼저 온다고 따로 적는다.',
            '식 (1)의 대응: y=b+Wx+U tanh(d+Hx)이며, softmax로 어휘 전체의 확률을 구한다. H는 문맥 특징에서 은닉층으로, U는 은닉층에서 각 출력 단어로 연결한다. 논문은 직접 연결이 없으면 W=0으로 둘 수 있다고 명시한다(PDF p.7 / 인쇄 p.1143). 이 사례도 W=0을 사용하므로 H·U 경로만 계산한다.',
            '무엇을 함께 배우는가: 원문 목적은 말뭉치의 평균 로그우도와 정규화 항이다(PDF p.6). 여기서는 한 문맥·정답의 음의 로그우도 −log p(target)를 계산하고 그 기울기로 경사 하강한다. 정규화 항은 0으로 두었다. 원문의 로그우도 경사 상승과 부호를 바꾼 같은 방향의 단일 사례 갱신이다. 이 한 번의 변화로 말뭉치 실험을 대신하지 않는다.',
            '반복 출현의 기울기: 한 단어가 두 입력 위치에 나오면 각 위치의 기울기를 같은 C행에 더한다. 입력에 나타나지 않은 단어의 C행은 이 한 번의 갱신에서 그대로다. 다만 공통 H·U·b·d가 바뀌므로 그 단어가 들어간 다른 문맥의 출력 확률은 바뀔 수 있다. C와 U는 입력·출력 역할이 다른 매개변수이며 같은 행렬로 묶지 않는다.',
            '학습 사례와 비교 문맥: 선택한 문맥·정답만 기울기를 계산하는 데 쓴다. 비교 문맥은 갱신 전후의 같은 매개변수로 평가할 뿐, 두 번째 학습 사례로 더하지 않는다. 한 사례가 다른 문맥에도 영향을 준다는 것은 공유된 경로의 성질을 보여 준다. 실제로 그 문맥의 정답을 더 잘 맞혔다는 뜻은 아니다.',
            '수치와 확률: 계산에서 softmax의 최댓값을 빼고 지수화해 큰 수로 인한 불안정을 줄인다. 손실은 log-sum-exp에서 정답 점수를 빼서 계산한다. 화면에는 여덟 후보 전체를 표시하며 동사 세 개만 다시 정규화하지 않는다. 소수점 반올림으로 표시한 확률 합계와 내부 계산의 합계는 구분한다.',
            '앞선 연구와 이후 연구: §1.2는 신경 확률 모형과 연속 단어 표현의 선행연구를 비교한다. 이 논문을 단어 벡터의 최초 발명으로 단정하지 않는다. 2013년 Word2Vec 카드는 다른 예측 구조와 학습 효율의 질문으로 이어 읽되, CBOW·Skip-gram·negative sampling을 이 모형의 구성 요소로 합치지 않는다.',
            '원문 실험의 경계: 논문은 말뭉치·문맥 길이·모형과 n-gram 결합 등을 달리한 실험을 보고한다. 이 화면은 그 자료·전처리·정규화·학습 횟수를 재현하지 않는다. 원문 성능과 여기에서 직접 정한 행렬의 확률·손실·기울기는 별개의 결과다.'
          ],
          formula:'원논문 §2, 식 (1)\nx = (C(최근 단어), …, C(더 앞선 단어))\na = tanh(d + Hx)\ny = b + Wx + Ua\np(i | context) = exp(yᵢ) / Σⱼ exp(yⱼ)\n\n이 사례: W=0, 정규화 항=0\nloss = −log p(target | context)\nδy = p − onehot(target)\nδa = Uᵀδy\nδz = δa ⊙ (1−a²)\nδx = Hᵀδz\n같은 단어의 C행 기울기 = 그 단어가 나온 위치의 δx 합\nθ_new = θ − learningRate × gradient'
        }
      },
      keyIdeas:[
        {title:'단어를 여러 문맥에서 다시 쓸 표현으로 둔다',text:'단어마다 연속 벡터를 두고 문맥의 각 위치에서 같은 표를 찾는다. 서로 다른 조합이 표현과 매개변수를 공유할 수 있게 한다.'},
        {title:'표현과 다음 말의 확률을 함께 배운다',text:'다음 단어 예측의 오차가 은닉층·출력 연결과 입력 단어의 벡터까지 바꾼다. 표현을 고정해 둔 뒤 별도의 예측기만 배우는 구성이 아니다.'},
        {title:'한 예측 경험이 다른 조합에도 닿는다',text:'공유 매개변수가 바뀌면 학습에 직접 쓰지 않은 문맥의 확률도 달라질 수 있다. 그 변화가 유용한 일반화인지는 자료를 분리한 평가로 확인해야 한다.'}
      ],
      videos:[],
      references:[
        {title:'JMLR · A Neural Probabilistic Language Model · 공식 서지',url:page,location:'네 공동저자, 3(Feb):1137–1155, 2003. PDF 표제에는 Submitted4/02·Published2/03.'},
        {title:'Bengio 외 · 분산 표현으로 차원의 저주를 다루려는 발상',url:paper+'#page=3',location:'§1.1, PDF pp.3–4 / 인쇄 pp.1139–1140. 단어 표현·확률 함수·공동 학습, 이웃 문맥으로 정보가 전달되는 논리.'},
        {title:'Bengio 외 · 신경 언어모형과 공유 표 C',url:paper+'#page=5',location:'§2, PDF pp.5–6 / 인쇄 pp.1141–1142. C와 g의 분해, 유한 문맥의 조건부 확률, Fig.1.'},
        {title:'Bengio 외 · 원문 Fig.1과 학습 목적',url:paper+'#page=6',location:'PDF p.6 / 인쇄 p.1142. 공유 C·tanh·softmax 및 선택적 직접 연결. 캡션 문장은 포함하지 않고 원문 도식 부분만 발췌했다.'},
        {title:'Bengio 외 · 식 (1)과 매개변수 갱신',url:paper+'#page=7',location:'PDF p.7 / 인쇄 p.1143. y=b+Wx+U tanh(d+Hx), W=0 선택, 최근 단어부터 이어 붙인 x, 경사 갱신·입력에 없는 C행의 비갱신.'},
        {title:'Bengio 외 · 앞선 연구와의 관계',url:paper+'#page=4',location:'§1.2, PDF pp.4–5 / 인쇄 pp.1140–1141. 선행 신경 모형·단어 표현과의 관계. 최초 발명으로 단정하지 않음.'},
        {title:'Bengio 외 · softmax 수치 안정화',url:paper+'#page=10',location:'§3, PDF p.10 / 인쇄 p.1146. 지수화 전 출력 점수의 최댓값을 빼는 안정화.'}
      ]
    }
  });
})();
