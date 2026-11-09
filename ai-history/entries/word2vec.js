/* Two 2013 papers, one shared article. Demonstration parameters are separate
 * from the original learned-vector evidence in the source Figure 2. */
(function(){
  'use strict';
  const initial='https://arxiv.org/pdf/1301.3781v3';
  const followup='https://proceedings.neurips.cc/paper_files/paper/2013/file/9aa42b31882ec039965f3c4923ce901b-Paper.pdf';
  const early=(page,label)=>({title:'Mikolov·Chen·Corrado·Dean (2013) · 초기 원고 PDF p.'+page+' · '+label,url:initial+'#page='+page});
  const later=(page,label)=>({title:'Mikolov 외 (2013) · 후속 논문 PDF p.'+page+' · '+label,url:followup+'#page='+page});
  window.AtlasEntries.register({
    id:'word2vec',
    record:{
      title:'주변 말을 예측하며, 단어의 표현을 배우다',
      summary:'단어마다 뜻을 숫자로 직접 적어 주는 대신, 주변 단어를 예측하는 데 쓰일 벡터를 함께 학습한다. 같은 단어의 표현을 여러 문맥에서 공유하며 언어의 반복되는 관계를 포착하려 했다.',
      detail:'',question:'',
      sources:[{title:'Efficient Estimation of Word Representations in Vector Space · 2013 초기 원고 v3',url:initial},{title:'Distributed Representations of Words and Phrases and their Compositionality · NIPS 2013',url:followup}],
      caveat:'두 문헌의 참여자 합집합이 위 인물 목록이다. 초기 원고는 네 공동저자, 후속 논문은 Sutskever를 포함한 다섯 공동저자다. 화면의 두 성분 벡터·일곱 단어·한 번의 갱신은 직접 정한 설정이다. 원문 PCA 그림과 평가 문항을 이 작은 계산의 학습 결과로 해석하지 않는다.'
    },
    content:{
      article:{
        question:'주변 말을 예측하게 하면,\n단어 사이의 관계도 배울 수 있을까?',
        opening:[
          '고양이와 강아지는 서로 다른 글자다. 단어를 사전의 번호로만 표시하면 두 번호 사이에는 어떤 역할이 비슷한지 담기지 않는다. 그런데 많은 문장에서 두 단어는 비슷한 자리에 들어가고 비슷한 주변 말과 함께 쓰일 수 있다. 이런 사용의 반복을, 기계가 활용할 표현으로 바꿀 수 있을까?',
          'Word2Vec은 문맥을 예측하는 일을 단어 표현을 배우는 과제로 삼았다. 단어마다 조정할 수 있는 숫자 묶음인 벡터를 두고, 같은 단어가 등장할 때 그 표현을 다시 사용한다. 주변에서 어떤 말이 나오는지 맞히려다 보면, 그 예측에 유용하도록 단어의 벡터도 바뀐다. 의미의 각 성분을 사람이 미리 이름 붙이지 않는 접근이다.',
          '초기 논문은 CBOW와 Skip-gram이라는 계산이 간결한 두 모형을 제시해 큰 말뭉치에서 벡터를 학습하려 했다. CBOW는 주변 말에서 중심 말을, Skip-gram은 중심 말에서 주변 말을 예측한다. AlexNet에서 본 표현 학습의 질문을 언어에서도 만나지만, 여기서는 깊은 시각망을 그대로 옮기지 않고 예측 과제와 공유 표현을 효율적으로 구성했다.'
        ],
        visual:{
          id:'context-representation',navLabel:'문맥에서 표현으로',
          title:'예측할 말을 고르면, 배울 표현도 정해진다',
          caption:'중심 단어와 문맥 폭을 바꾸며 두 모형의 예측 방향을 비교해 보세요. 이어서 한 번의 예측이 직접 정한 벡터 값을 어떻게 바꾸는지 살펴보고, 원논문에서 실제로 관찰한 단어 관계와 구분해 읽습니다.',
          stages:[
            {id:'context',label:'문맥에서 단서를 얻다',text:'같은 단어의 표현을 여러 위치에서 공유한다. 어떤 말을 입력으로 쓰고 무엇을 예측 대상으로 삼을지는 CBOW와 Skip-gram에서 서로 다르다.'},
            {id:'update',label:'예측이 표현을 바꾸다',text:'정답 단어를 더 잘 예측하도록 입력 표현과 출력 쪽 연결을 함께 조정한다. 여기서는 직접 정한 작은 행렬의 한 번의 갱신을 추적한다.'},
            {id:'relations',label:'관계를 읽어 보다',text:'학습된 벡터에 어떤 관계가 나타났는지는 실제 결과와 평가 조건에서 확인해야 한다. 아래 원문 그림은 앞의 두 성분 계산에서 만들어진 결과가 아니다.'}
          ],
          modes:[
            {id:'cbow',label:'CBOW',title:'주변 말을 모아, 가운데 말을 예측하다',text:'선택한 문맥 단어의 입력 벡터를 평균해 중심 단어를 예측한다. 문맥 안의 순서는 평균에 남지 않으며 같은 단어가 두 번 있으면 두 위치가 모두 기여한다.',source:early(4,'§3.1, Fig.1은 p.5')},
            {id:'skipgram',label:'Skip-gram',title:'가운데 말에서, 가까운 말을 예측하다',text:'중심 단어의 입력 벡터로 문맥 단어를 예측한다. 창 안의 각 단어가 학습 대상이 된다. 아래에서는 한 번에 한 대상을 골라 같은 중심 표현이 어떻게 쓰이는지 살펴본다.',source:early(4,'§3.2, Fig.1은 p.5')}
          ],
          example:{
            vocabulary:['the','cat','sat','on','mat','dog','rug'],
            sentences:[
              {id:'cat',label:'고양이의 문장',translation:'고양이가 매트 위에 앉았다. 직접 정한 영어 문장을 단어 단위로 나눴다.',tokens:['the','cat','sat','on','the','mat']},
              {id:'dog',label:'강아지의 문장',translation:'강아지가 양탄자 위에 앉았다. 같은 자리에 다른 단어가 들어간 문장이다.',tokens:['the','dog','sat','on','the','rug']}
            ],
            initialCenter:1,initialRadius:2,initialMode:'skipgram',radii:[1,2],
            inputVectors:[[.2,-.1],[.1,.3],[-.2,.1],[.05,-.25],[.3,.05],[-.1,.25],[.25,-.15]],
            outputVectors:[[.3,.2],[-.4,.1],[.2,-.3],[.1,.4],[-.3,-.2],[.4,.05],[-.1,.3]],
            learningRate:.5,
            scope:'두 문장·일곱 단어·두 성분의 시작 벡터·학습률 0.5를 직접 정했습니다. 후속 논문 식 (2)의 전체 softmax에 한 번의 SGD 갱신을 적용합니다. 원래 학습된 벡터나 말뭉치 실험, 초기 논문의 Huffman 트리 계산을 재현하지 않습니다. 성분 1·2에 뜻을 미리 배정하지 않습니다.',
            source:later(3,'기본 softmax 식 (2)')
          },
          evidence:{
            file:'word2vec-capitals-pca.png',
            title:'나라와 수도의 관계가, 학습된 표현에서 나타나다',
            caption:'후속 논문 Fig.2의 원그림이다. 1,000차원 Skip-gram 벡터를 PCA로 두 차원에 투영했다. 나라에서 수도로 이어지는 방향에 반복되는 구조가 보인다. 이 관계를 정답으로 직접 가르친 대신 주변 말의 예측에서 배운 표현을 관찰한 것이다.',
            scope:'원문이 고른 나라·수도 사례의 투영입니다. 두 축은 임의로 이름 붙인 의미 축이 아니며 원래 1,000차원의 모든 거리·관계를 보존하지 않습니다. 앞 화면의 두 성분 벡터에서 얻은 지도나, 모든 유추가 맞는다는 증거로 해석하지 않습니다.',
            source:later(4,'Fig.2 · 1,000차원에서 2차원 PCA'),
            credit:{title:'Mikolov·Sutskever·Chen·Corrado·Dean (2013) · 원문 Fig.2',url:followup+'#page=4',note:'PDF의 그림 영역을 직접 렌더했습니다. 좌표·축·라벨은 원문 그대로이며 한국어 설명을 별도로 붙였습니다.'},
            questionCases:[
              {id:'capital',label:'수도와 나라',a:'Athens',b:'Greece',c:'Oslo',answer:'Norway',text:'첫 수도·나라의 관계가 다른 수도·나라에도 나타나는지 검사하는 유형이다.',source:early(6,'Table 1 · Common capital city')},
              {id:'comparative',label:'비교급',a:'great',b:'greater',c:'tough',answer:'tougher',text:'한 형용사에서 비교급으로 가는 변화가 다른 단어에서도 나타나는지 검사한다.',source:early(6,'Table 1 · Comparative')},
              {id:'plural',label:'복수형',a:'mouse',b:'mice',c:'dollar',answer:'dollars',text:'단수에서 복수로 가는 관계를 검사한다. 단어 형태의 변화도 벡터 평가에 포함했다.',source:early(6,'Table 1 · Plural nouns')}
            ],
            questionScope:'원문 Table 1의 평가 문항과 미리 정한 정답입니다. 이 화면에서 단어 벡터를 새로 검색해 맞힌 답이 아닙니다. 원래 평가는 v(b)−v(a)+v(c)에 가까운 후보를 코사인으로 찾고 질의의 세 단어를 제외하며, 지정한 단어와 정확히 같을 때만 맞았다고 셉니다.'
          },
          publications:[
            {id:'initial',year:'2013',title:'초기 원고 · 두 예측 방향',authors:['Tomas Mikolov','Kai Chen','Greg Corrado','Jeffrey Dean'],detail:'CBOW·Skip-gram과 큰 규모의 단어 표현 학습을 제안했다. 1월 최초 제출과 이 카드에서 검토한 9월 v3를 구분한다. 초기 실험 설명은 hierarchical softmax를 사용한다.',source:early(1,'서지, §3는 pp.4–5')},
            {id:'followup',year:'2013',title:'NIPS 후속 논문 · 학습과 구의 확장',authors:['Tomas Mikolov','Ilya Sutskever','Kai Chen','Greg Corrado','Jeffrey Dean'],detail:'Negative sampling, 빈번한 단어의 subsampling, 구를 하나의 토큰으로 배우는 방법을 다룬다. Sutskever는 이 후속 논문의 공동저자다.',source:later(1,'서지와 초록, §2·4')}
          ],
          scope:'Fig.1의 예측 방향을 참고한 자체 도식, 직접 정한 작은 벡터의 갱신, 원문의 학습 결과 그림을 나누어 표시합니다. 단어 유형마다 표현을 공유하는 고전적인 모형이며 문맥마다 새 표현을 만드는 Transformer 그림이 아닙니다.',
          source:early(5,'Fig.1 · CBOW와 Skip-gram')
        },
        takeaway:{title:'뜻의 좌표를 적어 주기보다, 쓸모 있는 표현을 배우게 하다',text:'많은 문맥에서 예측에 쓸 같은 단어 표현을 공유하고, 그 예측의 오차로 벡터를 바꾼다. 이렇게 학습한 표현에서 언어의 관계를 읽으려 했다. 그 관계가 얼마나 성립하는지는 별도의 평가와 사용 조건에서 확인한다.'},
        technical:{
          title:'평균·두 벡터 표·예측 목표와 평가 범위를 더 읽기',
          paragraphs:[
            '초기 원고는 2013년 1월 16일에 처음 제출됐고, 이 카드에서 확인한 PDF는 9월 7일의 arXiv v3다. 네 공동저자는 Mikolov·Chen·Corrado·Dean이다. 같은 해 NIPS 후속 논문은 Mikolov·Sutskever·Chen·Corrado·Dean의 다섯 공동저자다. 위 인물 목록은 두 문헌 참여자의 합집합이며 어느 한 논문의 저자 순서가 아니다.',
            '초기 원고 §3는 비선형 은닉층의 계산 부담을 줄인 log-linear 모형을 설명한다. CBOW는 앞뒤 문맥의 단어 벡터를 평균하며 위치별로 같은 투영 파라미터를 공유한다. 본문 §3.1(p.4)은 평균이라고 쓰고 Fig.1(p.5)의 가운데 상자에는 SUM이라고 표시한다. 수치 계산에서는 본문의 평균을 따른다. 문맥의 순서와 반복 횟수는 다르며, 같은 단어의 두 출현은 평균에 두 번 들어간다.',
            '초기 Fig.1은 앞뒤 두 단어를 그리지만 이것이 모든 실험의 창 크기는 아니다. Skip-gram §3.2는 최대 범위 C에서 실제 범위를 무작위로 골라 먼 단어를 상대적으로 덜 사용한다. 화면에서 직접 고르는 고정 폭은 이 표집 절차를 실행한 것이 아니다. CBOW가 미래쪽 단어도 사용할 수 있다는 점을 순방향 문장 생성과 구분한다.',
            '후속 논문 식 (2)의 기본 softmax는 단어마다 입력 벡터 v와 출력 벡터 v′를 둔다. 입력을 읽을 때와 출력 후보와 비교할 때 쓰는 파라미터 표가 다르다. 같은 중심 단어와 같은 가중치의 Skip-gram은 어느 문맥 위치를 정답으로 고르더라도 같은 예측 분포를 낸다. 정답의 표시와 손실·기울기가 달라진다.',
            '화면의 작은 전체 softmax는 s_j=u_j·h, p_j=exp(s_j)/Σexp(s_k), L=−log p_target을 계산한다. Skip-gram의 h는 선택한 중심의 입력 벡터이고 CBOW는 선택 문맥의 입력 벡터 평균이다. 두 파라미터 표의 기울기는 모두 갱신 전 값에서 구한 뒤 동시에 SGD를 적용한다. 중복 문맥의 입력 기울기는 출현 횟수만큼 더한다. 이 선택한 설정의 손실 변화가 임의의 학습률에서 항상 감소한다는 보장은 아니다.',
            '초기 실험의 hierarchical softmax는 Huffman 트리를 사용한다. 후속 §2.1에서는 출력 벡터가 어휘의 각 단어가 아니라 트리 내부 노드에 대응한다고 구분한다. 이 트리는 효율적인 코드 경로이며 WordNet의 의미 계층과 같지 않다. 화면의 단어별 출력 표를 모든 Word2Vec 구현의 동일한 파라미터 구조로 읽지 않는다.',
            'Negative sampling은 후속 §2.2에서 관측된 문맥과 잡음 분포에서 뽑은 예를 구분하는 목적을 사용한다. 전체 softmax의 정규화된 문맥 단어 확률과 같은 값을 계산하는 기법으로 표시하지 않는다. 빈번한 단어의 subsampling과 구 검출·학습도 후속 내용이다. 후속 논문은 Air와 Canada를 더한다고 항공사 이름 Air Canada의 의미가 쉽게 나오는 것은 아니라는 예에서 구를 하나의 토큰으로 배우는 필요성을 설명한다.',
            '초기 Table 1(p.6)은 평가용 단어 쌍의 예시다. §4.1의 정답 기준은 코사인으로 가장 가까운 후보가 지정한 단어와 정확히 같은가이며 동의어도 오답이 될 수 있다. 후속 Fig.2는 1,000차원 벡터를 두 축으로 투영한 선택 사례다. 문항의 정답, 원문이 학습한 좌표, 이 화면의 직접 정한 두 성분 값을 서로 바꾸어 해석하지 않는다.',
            '단어의 쓰임이 비슷하면 표현에 관련성이 나타날 수 있지만 관련성이 같은 뜻을 보장하지는 않는다. 후대의 Nguyen·Schulte im Walde·Vu (2016)는 동의어와 반대말이 비슷한 문맥에 나타나는 문제를 다룬다. 이 항목은 그 논문의 초록·서론에서 확인한 한계 설명이며 전체 실험을 검토한 것은 아니다.',
            '고전적인 단어 벡터는 단어 유형마다 공유한 표현을 둔다. 같은 표기의 단어가 문장마다 다른 뜻을 가져도 그 입력 표의 행은 같다. 원문의 관계 평가 결과를 모든 문맥의 의미 이해나 논리적 사실의 증명으로 확대하지 않는다. 이 카드에서는 원래 대규모 말뭉치의 학습이나 유추 벤치마크를 다시 실행하지 않았다.'
          ],
          formula:'CBOW: h = (1/n) Σ v(context_i)\nSkip-gram 한 쌍: h = v(center)\np(j | h) = exp(u_j · h) / Σ_k exp(u_k · h)\nL = −log p(target | h)\nSGD: θ_new = θ_old − η ∇L(θ_old)'
        }
      },
      keyIdeas:[
        {title:'사전 번호에, 서로 비교할 표현을 더하다',text:'서로 다른 번호만으로는 단어의 쓰임 사이 관계를 표현하기 어렵다. 학습할 벡터를 두면 한 단어를 여러 성분으로 나타내고 다른 단어와 비교할 수 있다. 단어 벡터 자체는 앞선 연구에도 있었으며, Word2Vec은 이를 큰 말뭉치에서 효율적으로 학습하는 모형을 제안했다.'},
        {title:'하나의 단어가 여러 문맥에서 같은 표현을 쓴다',text:'문장마다 새 숫자를 따로 만들면 서로 다른 사용 경험이 이어지지 않는다. 같은 단어의 입력 표를 공유하면 한 문맥에서 얻은 학습 신호가 다른 문맥에 쓰일 표현도 바꾼다. 예측이 단어 표현을 쌓아 가는 연결이다.'},
        {title:'의미를 항목별로 가르치지 않아도, 관계가 나타날 수 있다',text:'학습 목표는 주변 단어의 예측이다. 국가와 수도의 관계나 형태 변화의 정답을 모두 벡터의 축 이름으로 적어 주지 않는다. 원문은 학습한 표현에서 일부 관계가 반복되는 모습을 보이고 유추 문항으로 평가했다. 어떤 관계가 얼마나 나타나는지는 모형·자료·평가에 따라 달라진다.'},
        {title:'Air와 Canada, 그리고 Air Canada',text:'나라 이름과 공기의 의미를 결합한다고 항공사 이름의 쓰임이 그대로 설명되지는 않는다. 후속 논문은 이런 구를 말뭉치에서 찾고 하나의 토큰으로 학습하는 방법을 다룬다. 단어의 조합과 구 자체의 사용 경험을 함께 생각하게 하는 예다.'}
      ],
      videos:[{title:'Stanford CS224N (2017) · Word Vector Representations: word2vec',url:'https://www.youtube.com/watch?v=ERibwqs9p38',channel:'Stanford University School of Engineering',note:'공식 2017 일정의 강의 제목과 공식 채널의 영상 메타데이터를 대조했다. 2013년 원저자 발표와 구분하는 후대 강의다. 일정에 개별 영상 ID가 연결돼 있다는 뜻은 아니며, 현재 재생·전체 시청은 검사하지 않았다.',sourceUrl:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1174/syllabus.html'}],
      references:[
        {title:'Mikolov·Chen·Corrado·Dean · Efficient Estimation of Word Representations in Vector Space · 2013 v3',url:initial,location:'12쪽 PDF의 p.1: 저자·동기. p.3: 학습과 Huffman hierarchical softmax. p.4 §3.1–3.2: CBOW 평균·Skip-gram. p.5 Fig.1: 예측 방향. p.6 Table 1·§4.1: 평가 유형·정답 기준. 해당 지면을 렌더링해 대조했다. 최초 제출은 2013-01-16, 검토한 v3는 2013-09-07이다.'},
        {title:'Mikolov·Sutskever·Chen·Corrado·Dean · Distributed Representations of Words and Phrases and their Compositionality · NIPS 2013',url:followup,location:'9쪽 공식 PDF의 p.2: Skip-gram 목표와 Fig.1. p.3 식 (2): 기본 softmax와 입력·출력 벡터, §2.1: 트리 내부 출력. pp.3–5: negative sampling·subsampling. p.4 Fig.2: 1,000차원 벡터의 2D PCA. pp.5–7: 구 검출·학습과 평가 조건. 해당 지면을 렌더링해 대조했다.'},
        {title:'초기 원고 · 버전과 서지',url:'https://arxiv.org/abs/1301.3781v3',location:'최초 제출일·v3 개정일과 네 공동저자 목록을 확인했다. 후속 NIPS 논문의 다섯 공동저자 목록과 구분한다.'},
        {title:'Nguyen·Schulte im Walde·Vu (2016) · Integrating Distributional Lexical Contrast into Word Embeddings for Antonym-Synonym Distinction',url:'https://aclanthology.org/P16-2074/',location:'인쇄 p.454 서론과 초록에서 동의어·반대말이 비슷한 문맥에 나타나는 한계를 확인했다. 후대의 제한 설명 자료이며 전체 방법·실험을 이 카드에서 검증한 것은 아니다.'},
        {title:'Stanford CS224N 2017 · 공식 일정',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1174/syllabus.html',location:'Jan 12 Word Vector Representations: word2vec의 제목·일정을 확인했다. 공식 과정의 영상 목록과 개별 영상 oEmbed 메타데이터를 함께 대조했다. 이 일정 페이지 자체에서 개별 watch ID를 확인했다고 쓰지 않는다.'}
      ]
    }
  });
})();
