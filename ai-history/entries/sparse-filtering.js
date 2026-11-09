/* Ngiam, Koh, Chen, Bhaskar and Ng: feature-distribution learning, NIPS2011. */
(function(){
  'use strict';
  const paper='https://proceedings.neurips.cc/paper/2011/file/192fc044e74dffea144f9ac5dc9f3395-Paper.pdf',author='https://cs.stanford.edu/~jngiam/papers/NgiamKohChenBhaskarNg2011.pdf',page='https://papers.nips.cc/paper_files/paper/2011/hash/192fc044e74dffea144f9ac5dc9f3395-Abstract.html',at=(p,title)=>({title:'Ngiam 외 (2011) · '+title,url:author+'#page='+p});
  window.AtlasEntries.register({id:'sparse-filtering',record:{
    title:'모든 것을 되그리기보다, 무엇에 반응할지 배우다',subtitle:'Sparse Filtering · 특징의 분포에서 표현을 설계하다',dateLabel:'2011 · NIPS 24 논문',
    people:['Jiquan Ngiam','Pang Wei Koh','Zhenghao Chen','Sonia Bhaskar','Andrew Y. Ng'],
    authorNote:'원논문 표제 순서는 Jiquan Ngiam·Pang Wei Koh·Zhenghao Chen·Sonia Bhaskar·Andrew Y. Ng이다. NIPS2011의 공동 연구이며, 한 사람의 단독 발명으로 적지 않는다.',
    summary:'한 입력에는 적은 특징이 주로 반응하되, 여러 입력 전체에서는 다양한 특징이 쓰이도록 했다. 특징별·입력별 정규화를 결합한 희소성 목적을 통해, 정답 이름 없이 반응을 만드는 연결을 배운다.',detail:'',question:'',related:['lenet','alexnet','neural-language-model'],
    sources:[{title:'NIPS2011 · Sparse Filtering · 공식 논문',url:paper},{title:'저자 공개 원문 · Stanford',url:author},{title:'NIPS2011 · 공식 서지',url:page}],
    caveat:'반응의 희소성과 균형을 목표로 삼은 비지도 특징학습이다. 아래의 두 특징·여섯 입력은 직접 정한 값이며, 원문의 이미지·음성 실험이나 인식 성능을 재현한 것이 아니다.'
  },content:{article:{
    question:'무엇인지 이름을 알려 주지 않아도,\n필요할 때 반응하는 특징을 배울 수 있을까?',
    opening:[
      '어떤 장면을 본다고 해서 모든 특징이 똑같이 켜질 필요는 없다. 지금 들어온 입력을 설명하는 소수의 특징이 주로 반응하고, 다른 입력에서는 다른 특징이 쓰인다면 무엇이 다른지 구분할 단서가 생긴다. 이 생각은 신경 부호의 희소성에 관한 연구와도 연결된다.',
      'Ngiam과 공동연구자들은 입력을 다시 만드는 오차나 데이터의 확률분포 대신, 특징들이 입력 전체에 걸쳐 만드는 반응표에 목적을 두었다. 한 열은 하나의 입력을 표현하는 여러 특징이고, 한 행은 하나의 특징이 여러 입력에서 보이는 반응이다. 열에는 선택성을, 행에는 특정 특징의 독점을 막는 균형을 요구했다.',
      '방법의 핵심은 정규화와 희소성의 결합이다. 먼저 특징마다 전체 반응의 길이를 맞추고, 이어 각 입력의 특징 벡터 길이를 맞춘다. 그 상태에서 성분의 절댓값 합을 줄이면, 모든 반응을 작게 만들기만 하는 대신 일부 특징에 반응을 모으는 방향으로 연결 W를 바꾸게 된다. 아래의 반응표와 단위원을 연결해 이 목적을 읽는다.'
    ],
    visual:{id:'sparse-filtering-activations',navLabel:'반응표에서 표현으로',title:'한 입력에는 선택적으로, 전체 입력에서는 여러 특징이 쓰이도록',caption:'원논문 §3–4와 Fig.1을 바탕으로, 두 특징과 여섯 입력에 직접 정한 값을 넣어 계산합니다. 반응표의 행·열 정규화와 단위원 위 위치를 같은 계산으로 연결합니다.',
      stages:[
        {id:'respond',label:'반응을 모아 보다',text:'입력과 W의 방향을 고르고, 어떤 특징이 어떤 입력에 크게 반응하는지 행과 열로 읽는다.'},
        {id:'balance',label:'특징의 독점을 줄이다',text:'같은 특징의 여러 반응을 묶어 길이를 맞춘다. 첫 특징의 배율을 바꿔 정규화 전후의 차이를 비교한다.'},
        {id:'compete',label:'선택적으로 반응하다',text:'한 입력의 특징 벡터 길이를 맞춘 뒤 L1 합을 본다. 단위원에서 반응이 한쪽으로 모일 때 목적값이 어떻게 달라지는지 살핀다.'}
      ],
      example:{X:[[1,.8,.1,.1,.6,.7],[.1,.2,1,.8,.7,.6]],samples:['입력 1','입력 2','입력 3','입력 4','입력 5','입력 6'],features:['특징 1','특징 2'],
        presets:[
          {id:'mixed',label:'비슷하게 넓게 반응',W:[[.8,.6],[.6,.8]],explanation:'두 특징이 비슷한 방향을 봅니다. 같은 입력에 둘 다 크게 반응하기 쉬우며, 열 정규화 뒤에도 반응이 고르게 남는지 살핍니다.'},
          {id:'separate',label:'서로 다른 방향에 반응',W:[[1,.1],[.1,1]],explanation:'두 특징이 서로 다른 입력 성분 쪽을 봅니다. 어떤 입력에서는 한 특징이 주로 반응하고, 중간의 입력에서는 두 특징이 함께 반응합니다.'},
          {id:'identical',label:'두 특징이 같은 방향',W:[[1,.2],[1,.2]],explanation:'두 특징의 방향을 같게 두었습니다. 행의 크기를 맞춰도 반응 패턴 자체가 같으면 모든 입력에서 둘이 같은 비율로 반응합니다. 이런 대칭점에서는 한 번의 기울기 갱신도 변화를 만들지 못할 수 있습니다.'}
        ],initialPreset:'mixed',gains:[.25,1,4],initialGain:1,
        scope:'두 입력 성분·두 특징·여섯 입력 및 시작 W를 직접 정했다. §5의 soft-absolute 활성과 ε=10⁻⁸을 사용한다. 두 정규화와 목적값을 정확히 계산하고, 그 기울기로 W를 제한된 탐색 안에서 한 번 갱신한다. 원문 L-BFGS·영상 패치·음성 데이터 학습은 실행하지 않는다.'
      },
      originalImage:{src:'ngiam-2011-competition.png',title:'원논문 Fig.1 · 정규화와 경쟁의 기하',alt:'Sparse Filtering2011 Fig1의 두 도식. 왼쪽은 정규화한 두 특징의 벡터와 L1등고선, 오른쪽은 한 특징의 증가가 다른 정규화 성분을 줄이는 경쟁을 나타낸다.',caption:'Fig.1의 도식 부분만 발췌했다. 왼쪽은 같은 길이에서 축에 가까운 벡터가 더 작은 L1 합을 갖는 이유를, 오른쪽은 정규화가 만드는 특징 간 경쟁을 보여 준다. 원문의 긴 영어 캡션은 제외하고 뜻을 한국어로 적었다.',credit:'Ngiam·Koh·Chen·Bhaskar·Ng (2011), Sparse Filtering, 저자 공개 PDF p.4, Fig.1 도식 발췌. 원문 축·점·화살표·수학 표기는 보존했다.',source:at(4,'Fig.1 · 정규화와 특징 간 경쟁')},
      source:at(3,'§4 · 행·열 정규화와 희소성 목적'),scope:'성분을 바로 잘라내는 선택기가 아니라 W가 만드는 반응의 목적함수다. soft-absolute 반응은 양수이므로 여기서 희소성은 작은 값으로의 집중을 뜻하며 정확한 0을 보장하지 않는다. 예측 성능이나 생물학적 뇌 회로를 재현했다고 해석하지 않는다.'
    },
    takeaway:{title:'무엇을 복원할까에서, 어떤 반응을 만들까로 질문을 옮겼다',text:'특징마다 전체 반응을 맞추고 입력마다 선택적으로 반응하도록 목적을 정하면, 정답을 주지 않아도 표현을 만드는 W를 조정할 수 있다. 그 표현이 특정 분류나 다른 입력에 유용한지는 학습 목적과 구분한 평가가 필요하다.'},
    technical:{title:'원논문의 목적함수와 이 계산의 범위',paragraphs:[
      '연구 질문: §1–2(PDF pp.1–2)는 여러 비지도 특징학습법의 구현·하이퍼파라미터 부담을 동기로 제시한다. 데이터분포를 명시적으로 모델링하는 대신 특징분포의 몇 가지 성질에 목적을 둔다. 이 선택이 모든 자료에서 가장 좋은 표현을 보장한다는 주장은 아니다.',
      '세 성질: §3(PDF pp.2–3)의 population sparsity는 한 입력에서 적은 특징이 주로 반응하는 성질, lifetime sparsity는 한 특징이 적은 입력에서 주로 반응하는 성질이다. high dispersal은 특징마다 평균 제곱 반응이 비슷하도록 하는 균형이다. 두 종류의 희소성을 같은 개념으로 합치지 않는다.',
      '행과 열: 행은 특징 j, 열은 입력 i이다. §4 식 (1)(PDF p.3)은 각 행을 그 행의 L2 길이로 나눈 뒤 각 열을 그 열의 L2 길이로 나누고 L1 합을 최소화한다. 화면의 반응표·기하·목적값은 모두 같은 행·열 배열에서 계산한다.',
      '활성 함수: §4의 도입은 선형 특징을 사용해 목적을 설명하고, §5(PDF p.5)의 실험은 sqrt(ε+(wⱼᵀx⁽ⁱ⁾)²), ε=10⁻⁸인 soft-absolute를 사용한다. 이 계산도 후자를 사용한다. 절댓값을 매끄럽게 한 활성 함수이며 정답 분류기의 확률은 아니다.',
      '균형이 성립하는 위치: 행 정규화 직후 각 행의 제곱합은 1이고, M개의 입력에 대한 평균 제곱은 1/M이다. p.4 §4.2의 기대값 표기는 이러한 정규화 관례와 함께 읽어야 한다. 뒤따르는 열 정규화가 끝난 후에도 모든 행의 제곱합이 정확히 1이라고 표시하지 않는다.',
      '경쟁과 전체 축소: 열 벡터를 길이 1로 고정하면 모든 성분을 함께 작게 만드는 것만으로 L1 목적을 줄일 수 없다. 비음수 두 성분에서는 L1 합이 1 이상 √2 이하이고, 축 가까이 갈수록 작아진다. soft-absolute의 양의 ε 때문에 이 사례의 유한한 W에서는 축 위의 정확한 0까지 도달하지 않을 수 있다.',
      '배율에 관한 경계: 양의 행 배율은 이상적인 행 정규화에서 사라진다. 그러나 sqrt(z²+ε) 안의 ε는 고정되어 있어 아주 작은 z에서는 완전한 배율 불변이 아니다. 첫 특징의 배율 선택은 이 효과를 계산으로 비교하기 위한 것이며 새 논문 하이퍼파라미터를 주장하는 것이 아니다.',
      '학습의 연결: 여기서는 열 정규화→행 정규화→soft-absolute→Wx를 거꾸로 미분한다. 한 입력의 반응이 행의 길이를 통해 다른 입력의 정규화 반응과 연결되므로, 각 열을 독립적으로 미분한 것처럼 취급하지 않는다. 두 정규화를 모두 통과한 기울기로 W만 바꾸고 입력 X는 고정한다.',
      '갱신의 범위: 원문 §5는 L-BFGS로 수렴까지 최적화한다. 화면은 기울기 방향과 최대 열여섯 번의 보폭 축소만 사용하며 감소한 후보가 없으면 원래 W를 유지한다. 이는 목적함수의 한 번 계산을 살피는 별도 실행이다. 감소를 찾지 못한 경우도 최적해나 학습 불가능성을 증명하지 않는다.',
      '실험과 인물: 원문은 자연 이미지·STL-10·TIMIT을 다룬다. 표제의 다섯 공동저자를 보존하며 Andrew Ng의 단독 연구로 적지 않는다. Table1의 특징 수라는 하이퍼파라미터 설명을 전체 분류 파이프라인에 튜닝이 없다는 뜻으로 확대하지 않는다. §5.3에서는 SVM과 수용영역 크기 등을 별도로 선택한다.',
      '이후 활용: §4.4(PDF p.5)는 이전 층의 특징을 다음 층 입력으로 쓰는 층별 학습을 설명한다. 여기서는 한 층만 계산한다. §6.1(PDF pp.7–8)의 divisive normalization과 초기 시각처리의 연결은 아이디어의 관계이며, 이 두 특징이 실제 시각피질 뉴런이라는 주장은 아니다.'
    ],formula:'§4 식 (1), §5의 활성 함수\nZ = WX\nFⱼᵢ = sqrt(Zⱼᵢ² + 10⁻⁸)\nrⱼ = sqrt(Σᵢ Fⱼᵢ²), Tⱼᵢ = Fⱼᵢ / rⱼ\nsᵢ = sqrt(Σⱼ Tⱼᵢ²), Aⱼᵢ = Tⱼᵢ / sᵢ\nL = Σᵢ Σⱼ Aⱼᵢ\n\n미분: gTⱼᵢ = (1 − Aⱼᵢ Σₖ Aₖᵢ) / sᵢ\ngFⱼᵢ = (gTⱼᵢ − Tⱼᵢ Σₖ(gTⱼₖ Tⱼₖ)) / rⱼ\ngZⱼᵢ = gFⱼᵢ Zⱼᵢ / Fⱼᵢ\n∂L/∂W = gZ Xᵀ'
    }
  },keyIdeas:[
    {title:'데이터보다 특징의 반응표에 목적을 둔다',text:'원본을 복원하는 항 없이, 여러 입력에서 어떤 특징이 반응하는지 그 분포의 성질로 표현을 배운다.'},
    {title:'행에서는 균형, 열에서는 선택성',text:'특징별 크기를 맞추고 입력별 길이를 고정해, 한 특징의 독점과 모든 반응의 동시 축소를 줄인다.'},
    {title:'정규화가 특징 사이에 경쟁을 만든다',text:'한 성분이 커지면 같은 길이로 맞춘 다른 성분의 비율은 작아진다. L1 목적은 이 경쟁 안에서 반응을 일부 성분에 모으도록 한다.'}
  ],videos:[],references:[
    {title:'NIPS2011 · 공식 논문과 서지',url:page,location:'Sparse Filtering, Advances in Neural Information Processing Systems24. 표제의 저자 순서는 저자 공개 PDF와 대조했다.'},
    {title:'Ngiam 외 · 연구 동기와 특징분포',url:author+'#page=2',location:'§2–3, PDF pp.2–3. 세 성질, 특징 행·입력 열, 초기 시각부호 연구와의 관계.'},
    {title:'Ngiam 외 · 원논문 식 (1)',url:author+'#page=3',location:'§4, PDF p.3. 행 L2 정규화 뒤 열 L2 정규화, L1 목적.'},
    {title:'Ngiam 외 · 원문 Fig.1 도식 발췌',url:author+'#page=4',location:'PDF p.4. 단위원과 L1 등고선, 정규화가 만드는 경쟁. 긴 영어 캡션은 제외했다.'},
    {title:'Ngiam 외 · 실험의 활성 함수와 최적화',url:author+'#page=5',location:'§4.4–5, PDF p.5. 층별 학습, soft-absolute ε=10⁻⁸, L-BFGS.'},
    {title:'Ngiam 외 · 평가 파이프라인과 시각처리의 관계',url:author+'#page=6',location:'§5.3–6.1, PDF pp.6–8. STL-10·TIMIT의 별도 분류 평가, divisive normalization.'},
    {title:'저자 홈페이지 · 원문과 공식 코드 연결',url:'https://cs.stanford.edu/~jngiam/',location:'Sparse Filtering의 NIPS2011 논문·보충자료·MATLAB 코드 링크. 원논문을 최초의 희소 부호 이론으로 주장하지 않는다.'}
  ]}});
})();
