/* NIPS 2014 is the primary version. Authored token flows and search numbers
 * are kept separate from the original learned sentence-state projection. */
(function(){
  'use strict';
  const paper='https://proceedings.neurips.cc/paper_files/paper/2014/file/5a18e133cbf9f257297f410bb7eca942-Paper.pdf';
  const version='https://arxiv.org/abs/1409.3215v3';
  const at=(page,label)=>({title:'Sutskever·Vinyals·Le (2014) · NIPS PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const eos='<EOS>';
  window.AtlasEntries.register({
    id:'seq2seq',
    record:{
      title:'문장을 읽은 상태에서, 다른 문장을 만들어 내다',
      summary:'단어의 순서를 따라 문장을 읽어 하나의 상태를 만들고, 그 상태에서 다른 문장의 단어를 차례로 예측한다. 문장을 표현하는 방법과 출력 문장을 만드는 방법을 번역의 목표로 함께 학습하려 했다.',
      detail:'',question:'',
      sources:[{title:'Sequence to Sequence Learning with Neural Networks · NIPS 2014',url:paper},{title:'arXiv v3 · 버전 기록',url:version}],
      caveat:'NIPS 2014의 두 LSTM 구조를 중심으로 읽는다. 문장 예시·검색 확률·다섯 토큰의 대응은 직접 정한 설정이며 실제 번역 모형의 출력이 아니다. Fig.2의 원문 문장 표현은 별도로 표시한다. Attention이나 별도의 BOS를 원래 그림에 덧붙이지 않는다.'
    },
    content:{
      article:{
        question:'한 문장을 읽어 만든 표현에서,\n길이가 다른 문장을 만들 수 있을까?',
        opening:[
          'John respects Mary와 Mary respects John에는 같은 단어가 들어 있지만, 존경하는 사람과 존경받는 사람이 바뀐다. 문장을 단어의 목록으로만 담으면 이런 차이를 놓친다. 번역에서는 단어의 수와 배열도 달라진다. 한 단어를 다른 단어로 바꾸는 표만으로 문장 전체를 옮길 수 있을까?',
          'Sutskever·Vinyals·Le는 입력을 읽는 LSTM인 인코더(Encoder)가 문장을 순서대로 읽어 마지막 상태 v를 만들고, 출력을 만드는 다른 LSTM인 디코더(Decoder)가 그 상태에서 새 문장을 만들도록 했다. 읽는 쪽은 앞서 읽은 내용과 새 단어를 상태에 함께 반영한다. 쓰는 쪽은 그 상태와 앞서 나온 단어들을 바탕으로 다음 단어를 예측한다. 문장 끝을 나타내는 EOS가 나오면 생성을 마치므로 입력과 출력의 길이가 같을 필요가 없다.',
          '사람이 문장마다 뜻의 항목을 적어 주는 대신, 원문과 번역문의 짝을 주고 올바른 번역을 더 잘 예측하도록 두 망을 함께 조정한다. 번역에 쓸 문장 표현과 그 표현을 문장으로 풀어 쓰는 방법을 같은 목표에서 배우려는 발상이다. v는 이 목표로 학습한 상태이며, 문장의 모든 뜻을 완벽하게 보존하는 암호라고 가정하지 않는다.'
        ],
        visual:{
          id:'sentence-to-sentence',navLabel:'문장에서 문장으로',
          title:'읽은 문장을 상태로, 그 상태를 다시 문장으로',
          caption:'읽기와 생성의 연결을 한 장면씩 따라가 보세요. 이어서 다음 단어를 고르는 방법과 입력 순서의 효과를 비교하고, 논문이 실제로 학습한 문장 표현을 살펴봅니다.',
          stages:[
            {id:'represent',label:'문장을 표현하다',text:'서로 다른 파라미터를 가진 두 LSTM을 연결한다. 읽는 쪽의 최종 상태 v가 쓰는 쪽의 시작 상태가 되며, 첫 출력 뒤에는 앞서 나온 말을 다시 입력으로 쓴다.'},
            {id:'generate',label:'다음 말을 고르다',text:'한 번에 문장 전체를 골라 적지 않는다. 지금까지 나온 말에 이어질 후보를 비교하며 완성된 문장을 찾는다. 학습할 때의 정답 접두사와 생성할 때의 자기 접두사를 구분한다.'},
            {id:'reverse',label:'읽는 순서를 바꾸다',text:'원문은 입력 문장만 거꾸로 읽는 실험도 했다. 일부 대응의 시간 간격을 줄일 수 있지만, 모든 간격이나 평균이 함께 줄어드는 것은 아니다.'}
          ],
          examples:[
            {id:'paper',label:'원문 Fig.1의 기호',sourceTokens:['A','B','C'],targetTokens:['W','X','Y','Z'],translation:'길이가 3인 입력에서 길이가 4인 출력을 만드는 원문 기호 흐름.',scope:'Fig.1의 A B C → W X Y Z를 따라 그립니다. 상태 v의 수치는 만들지 않았습니다. 문장 끝 입력에서 첫 W를 예측하는 관계를 전달·첫 예측의 두 장면으로 나눠 볼 뿐, 별도의 물리적 시점을 추가한 것은 아닙니다.',source:at(2,'Fig.1 · 입력 EOS와 첫 W')},
            {id:'phrase',label:'길이가 다른 문장',sourceTokens:['I','am','a','student'],targetTokens:['Je','suis','étudiant'],translation:'나는 학생이다. 영어 네 단어와 프랑스어 세 단어의 대응을 직접 준비했다.',scope:'직접 준비한 문장 쌍입니다. 실제 2014년 모형이 이 문장을 번역한 결과나 학습한 상태 값이 아닙니다. 단어 분할도 이 예시에서 정했습니다.',source:at(3,'§2 · 길이가 다른 시퀀스의 조건부 확률')}
          ],
          eos,
          evidence:{
            file:'seq2seq-sentences-pca.png',
            title:'원문이 학습한 문장 표현',
            caption:'NIPS 논문 Fig.2의 두 패널이다. 영어 문장을 읽은 LSTM의 상태를 PCA로 두 축에 투영했다. 왼쪽은 John과 Mary의 역할 및 동사의 차이, 오른쪽은 능동·수동 등 표현이 다른 문장을 함께 살펴본다. 단어가 같아도 순서가 바뀐 문장을 어떻게 표현했는지 관찰하는 자료다.',
            scope:'원문이 선택한 문장들의 정성적 관찰입니다. 두 축에 의미 이름을 배정하지 않았고, 원래 상태의 모든 차이를 보존하는 지도도 아닙니다. 비슷한 뜻의 문장이 완전히 같은 벡터라는 증거나 모든 문장을 이해한다는 판정으로 확대하지 않습니다. 위에서 직접 준비한 문장 쌍의 실행 결과와 구분합니다.',
            source:at(6,'Fig.2 · §3.8 · 문장 표현의 2D PCA'),
            credit:{title:'Sutskever·Vinyals·Le (2014) · 원문 Fig.2',url:paper+'#page=6',note:'PDF의 두 그림 영역을 직접 렌더했습니다. 원래 좌표·문장 라벨을 보존하고 한국어 설명을 밖에 붙였습니다. 별도의 공개 재사용 허가나 CC 라이선스를 확인했다는 뜻은 아닙니다.'}
          },
          beam:{
            title:'눈앞의 한 단어와, 완성될 문장의 점수',
            text:'폭 1은 매번 가장 높은 후보 하나만 남긴다. 폭 2는 두 후보를 남겨 다음 단계까지 비교한다. 후보 문장의 점수는 그 경로에서 선택한 조건부 확률의 곱이며, 계산에서는 로그 확률을 더한다.',
            sourceTokens:['A','B','C'],referenceTokens:['W','X','Y','Z'],startId:'root',eos,maxSteps:5,widths:[1,2],
            nodes:[
              {id:'root',edges:[{token:'W',probability:.6,nextId:'w'},{token:'V',probability:.4,nextId:'v'}]},
              {id:'w',edges:[{token:'X',probability:.55,nextId:'wx'},{token:eos,probability:.45,nextId:null}]},
              {id:'wx',edges:[{token:'Y',probability:1,nextId:'wxy'}]},
              {id:'wxy',edges:[{token:'Z',probability:1,nextId:'wxyz'}]},
              {id:'wxyz',edges:[{token:eos,probability:1,nextId:null}]},
              {id:'v',edges:[{token:eos,probability:.9,nextId:null},{token:'X',probability:.1,nextId:'vx'}]},
              {id:'vx',edges:[{token:eos,probability:1,nextId:null}]}
            ],
            scope:'후보의 차이를 추적하도록 분기 확률을 직접 정한 나무입니다. 실제 LSTM의 예측이 아닙니다. 폭 1은 W X Y Z EOS=0.33, 폭 2는 V EOS=0.36을 선택합니다. EOS 후보는 완료 목록으로 옮기고 다시 확장하지 않습니다. 이 예의 전역 최고 경로와 폭 2의 결과가 같은 것이며, 빔 검색이 항상 전역 최적을 찾는다는 뜻은 아닙니다.',
            source:at(4,'§3.2 · 왼쪽부터의 근사 빔 검색')
          },
          reversal:{
            title:'짧은 의존을 만들면, 학습할 연결의 거리도 바뀐다',
            text:'첫 입력과 첫 출력이 대응할 때 입력만 뒤집으면 둘 사이의 처리 간격이 가까워진다. 뒤쪽 대응은 더 멀어질 수 있다. 원문은 평균 거리를 바꾸지 않으면서 최소 시간차를 줄이는 점을 설명한다.',
            sourceTokens:['a','b','c','d','e'],targetTokens:['α','β','γ','δ','ε'],
            alignments:Array.from({length:5},(_,i)=>({sourceIndex:i,targetIndex:i,label:['a ↔ α','b ↔ β','c ↔ γ','d ↔ δ','e ↔ ε'][i]})),
            decoderOffset:0,
            scope:'다섯 기호를 같은 순서로 대응시킨 자체 예시입니다. 입력을 시각 0~4에 읽고, 입력 EOS와 첫 출력을 시각 5에 둡니다. 실제 영어·프랑스어 대응, Attention 가중치, 측정한 기울기가 아닙니다.',
            source:at(4,'§3.3 · 입력만 뒤집기와 시간차')
          },
          scope:'Fig.1을 참고한 자체 구조도, 직접 정한 검색 확률·대응 예시, 원문의 학습된 표현 그림을 구분합니다. LSTM의 실제 학습이나 원실험의 번역 추론을 실행한 화면이 아닙니다.',
          source:at(2,'Fig.1 · 두 LSTM의 읽기와 생성')
        },
        takeaway:{title:'문장 표현과 문장 생성의 방법을, 번역의 목표로 함께 배우다',text:'단어의 뜻을 하나씩 치환하는 표를 넘어, 입력의 순서를 읽은 상태에서 출력의 순서를 새로 만든다. 무엇을 상태에 남길지는 번역문을 예측하는 오차를 통해 배운다. 같은 구조가 서로 다른 길이의 시퀀스를 연결할 수 있다는 것이 이 논문을 읽는 중심이다.'},
        technical:{
          title:'상태·다음 단어의 확률·검색과 원문 결과를 더 읽기',
          paragraphs:[
            '이 카드의 주된 기준은 9쪽 NIPS 2014 출판본이다. Fig.1은 p.2, 조건부 확률 식 (1)과 두 LSTM 설명은 p.3 §2에 있다. 원문은 입력을 읽은 마지막 은닉 상태 v로 출력 LSTM의 초기 은닉 상태를 설정한다고 쓴다. 모든 층의 은닉·셀 상태를 어떤 순서로 복사하는지까지 명시했다고 서술하지 않는다. 읽기와 출력에는 서로 다른 LSTM 파라미터를 사용한다.',
            'Fig.1에서는 A B C 다음 입력 EOS가 있는 지점에서 첫 W가 예측된다. 이후 W를 입력하면 X, X를 입력하면 Y, Y를 입력하면 Z, Z를 입력하면 출력 EOS를 예측한다. 별도의 BOS 기호를 새로 그리지 않았다. 시각화의 전달 장면과 첫 예측 장면은 이 관계를 나눠 읽는 장면이며 모형에 새 시간 단계를 추가한 것이 아니다.',
            '학습 목표는 정답 번역의 조건부 로그 확률을 크게 만드는 것이다. 각 위치는 입력의 표현 v와 그보다 앞선 정답 출력 단어들을 조건으로 한다. 생성할 때는 아직 정답의 다음 단어를 알 수 없으므로 자신이 선택해 온 접두사를 조건으로 쓴다. 본문의 식이 설명하는 이 차이를 화면에서 나란히 표시한다. Attention으로 모든 입력 위치를 다시 참조하는 구조를 이 논문의 두 LSTM 그림에 넣지 않는다.',
            '출력은 가능한 모든 문장을 완전 탐색하지 않는다. §3.2의 빔 검색은 현재 살아 있는 접두사의 다음 후보를 펼쳐 누적 로그 확률 상위 B개를 남긴다. 그 안에서 EOS가 붙은 후보는 완료 목록으로 보내고 다시 확장하지 않는다. 화면도 잘린 후보로 빈자리를 채우지 않으며 길이 정규화를 더하지 않는다. 빔 검색은 근사 탐색이므로 폭을 키운다고 전역 최적 문장을 항상 찾는다는 보장은 없다.',
            '직접 정한 확률 나무의 완성 경로는 W EOS=0.27, W X Y Z EOS=0.33, V EOS=0.36, V X EOS=0.04이다. 폭 1은 첫 W를 고른 뒤 0.33 경로를 완성하고, 폭 2는 V도 남겨 0.36의 완료 후보를 찾는다. 이 수치는 실제 LSTM의 예측이나 원문의 번역 성능이 아니다. 같은 조건부 확률을 탐색하는 차이를 보여 주며, 폭 2가 모든 상황에서 정답을 보장한다는 예가 아니다.',
            '입력 순서를 뒤집어 학습하고 시험할 때도 출력 순서는 유지했다. 원문 §2의 a b c는 c b a로 읽고 α β γ는 그대로 출력한다. §3.3은 평균 의존 거리 자체는 바꾸지 않으면서 최소 시간차를 줄이고 짧은 의존을 도입한다는 설명을 제시한다. 모든 대응이 가까워진다는 주장이나, 저자들이 개선 원인을 완전히 규명했다는 서술과 구분한다.',
            '시간차 그림은 입력 N개를 시각 0부터 N−1까지 읽고 입력 EOS와 첫 출력을 시각 N에 두는 별도의 처리 시계다. 출력 j의 시각은 N+j이고 시간차는 출력 시각−해당 입력의 읽기 시각이다. 다섯 쌍의 단조 대응에서 정방향 시간차는 5·5·5·5·5, 반전하면 1·3·5·7·9다. 최소 5→1, 평균 5 유지, 최대 5→9를 직접 계산한다. 이 값은 기울기의 크기나 실제 언어 쌍에서 측정한 평균이 아니다.',
            'p.6 Fig.2와 §3.8은 문장을 읽어 얻은 LSTM 상태를 PCA로 투영한다. John respects Mary와 Mary respects John처럼 단어 순서와 역할이 달라진 문장, 능동·수동 등 표현이 다른 문장을 관찰한다. 선택한 사례의 정성적 구조를 문장 전체의 의미 보존이나 모든 바꿔 말하기의 동등성으로 일반화하지 않는다.',
            '실험은 WMT14 영어→프랑스어 번역으로, 1,200만 문장 쌍과 입력 16만·출력 8만 단어 어휘를 사용했다. 네 층의 LSTM을 실험했으며 층마다 1,000개 메모리 셀을 썼다. 원문의 토큰화·대소문자 구분 BLEU와 이 조건을 함께 읽어야 한다. 화면에서는 원래 자료의 학습·시험을 다시 실행하지 않았다.',
            'p.6 Table 1의 직접 생성 결과는 역순 입력 다섯 모형을 결합한 빔 폭 12에서 BLEU 34.81이다. Table 2의 36.5는 기존 통계적 번역 시스템이 만든 1,000개 후보를 다시 순위 매기는 별도 조건이다. 이를 같은 단일 모형의 직접 생성 점수로 합치지 않는다. §3.3 본문의 25.9→30.6과 Table 1의 단일 모형 26.17→30.59는 원문에 각각 쓰인 값이며 수치 차이의 이유를 추정하지 않는다.',
            'arXiv v3에는 출판본과 다른 파라미터 수 표기 및 8,000차원 문장 상태 설명이 있다. 이 카드에서는 그 수치를 NIPS 출판본의 동일 문구로 옮기지 않았다. Cho 외 (2014)의 RNN Encoder–Decoder도 같은 시기의 관련 연구이며, 이 카드에서 확인한 범위는 공식 초록·서지다. Seq2Seq의 모든 구성을 한 논문이 처음 만들었다고 단정하지 않는다.'
          ],
          formula:'v = Encoder(x₁, …, xₙ, EOS)\nyₘ₊₁ = EOS\np(y₁, …, yₘ₊₁ | x) = ∏(t=1…m+1) p(yₜ | v, y₁, …, yₜ₋₁)\n학습: 정답 접두사로 정답 번역의 로그 확률을 높인다\n생성: 선택한 접두사에서 다음 후보를 찾는다\n검색 점수 = Σₜ log p(yₜ | v, 접두사)'
        }
      },
      keyIdeas:[
        {title:'단어를 모으는 것과, 문장을 읽는 것은 다르다',text:'누가 누구를 존경하는지는 단어의 종류만으로 정해지지 않는다. 읽는 LSTM은 같은 단어라도 앞서 읽은 순서가 다른 상태에서 처리한다. 마지막 상태가 출력 문장을 예측하는 데 유용하도록 학습한다.'},
        {title:'하나의 상태에서, 길이가 다른 출력을 이어 간다',text:'입력의 단어마다 출력 한 단어를 강제로 붙이지 않는다. 입력을 다 읽은 상태에서 첫 단어를 만들고, 앞선 출력에 이어 다음 단어를 예측한다. EOS를 학습 대상으로 두어 출력의 끝도 예측한다.'},
        {title:'읽는 방법과 쓰는 방법을 함께 배운다',text:'문장 표현을 사람이 먼저 완성해 놓고 번역기를 따로 붙이는 구성과 달리, 정답 번역을 예측하는 목표가 읽는 망과 쓰는 망을 함께 바꾼다. 표현의 각 성분에 미리 뜻의 이름을 붙이지 않는다.'},
        {title:'역순 입력은, 학습할 연결의 거리도 바꾼다',text:'입력만 거꾸로 읽으면 앞부분의 대응이 출력 시작과 가까워질 수 있다. 뒤의 대응은 더 멀어질 수 있고 평균 간격은 그대로다. 데이터를 읽는 순서도 학습의 조건이라는 점을 보여 준 실험으로 읽는다.'}
      ],
      videos:[{title:'Stanford CS224N (2019) · Machine Translation, Seq2Seq and Attention',url:'https://www.youtube.com/watch?v=XXtpJxZBa2c',channel:'Stanford CS224N · 2019 공식 과정',note:'공식 2019 일정의 1월 31일 강의에서 이 영상으로 연결되는 것을 확인했다. Attention까지 다루는 후대 강의이며 2014년 원저자 발표와 구분한다. 영상 페이지의 현재 채널 메타데이터·재생·전체 시청은 확인하지 않았다.',sourceUrl:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html'}],
      references:[
        {title:'Sutskever·Vinyals·Le · Sequence to Sequence Learning with Neural Networks · NIPS 2014',url:paper,location:'9쪽 공식 PDF. p.2 Fig.1: 입력 EOS와 첫 출력, 이전 출력의 다음 입력. p.3 §2·식 (1): 최종 상태 v와 조건부 생성, 서로 다른 두 LSTM. p.4 §3.2–3.3: 빔 검색과 역순 입력. pp.5–6: 결과 조건·Table 1–2. p.6 Fig.2·§3.8: 문장 표현 PCA. 해당 지면을 직접 렌더해 대조했다.'},
        {title:'arXiv v3 · 원고와 버전 기록',url:version,location:'최초 제출은 2014-09-10, v3는 2014-12-14다. v3의 384M·8,000차원 설명과 NIPS의 380M 표기 차이를 따로 확인했다. 주된 시각화와 수치 기준은 위 NIPS 출판본이다.'},
        {title:'Cho 외 (2014) · Learning Phrase Representations using RNN Encoder–Decoder for Statistical Machine Translation',url:'https://aclanthology.org/D14-1179/',location:'공식 ACL Anthology의 초록·서지에서 같은 시기의 encoder–decoder와 번역 후보 점수화 맥락을 확인했다. 전체 방법·실험을 이 카드에서 검토한 것은 아니다.'},
        {title:'Stanford CS224N 2019 · 공식 일정',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html',location:'Jan 31 Machine Translation, Seq2Seq and Attention 항목과 연결된 YouTube 영상 ID를 확인했다. 후대의 심화 강의이며 원논문 결과의 근거로 쓰지 않는다.'}
      ]
    }
  });
})();
