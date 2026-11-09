/* Fixed authored scenes and scores are distinct from learned NS-CL representations. */
(function(){
  'use strict';
  const paper='https://nscl.csail.mit.edu/data/papers/2019ICLR-NSCL.pdf';
  const project='https://nscl.csail.mit.edu/';
  const record='https://arxiv.org/abs/1904.12584';
  const at=(page,label)=>({title:'Mao 외 (2019) · 공식 프로젝트 ICLR PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const credit=(page,figure)=>({title:'Mao 외 (2019) · '+figure+' · 공식 프로젝트 논문',url:paper+'#page='+page,note:'원그림과 전체 캡션을 300dpi로 렌더해 영역만 잘랐습니다. 그림 안의 예시·수치·학습 화살표는 바꾸지 않았으며 한국어 설명은 밖에 붙였습니다.'});
  const objects=[
    {id:'o1',label:'물체 1 · 빨간 큐브',color:'#d76565',shape:'cube',material:'matte',x:0.18,y:0.48,size:0.13},
    {id:'o2',label:'물체 2 · 빨간 구',color:'#d76565',shape:'sphere',material:'matte',x:0.68,y:0.40,size:0.13},
    {id:'o3',label:'물체 3 · 파란 원기둥',color:'#638fd2',shape:'cylinder',material:'matte',x:0.46,y:0.69,size:0.13},
    {id:'o4',label:'물체 4 · 초록 큐브',color:'#68a58b',shape:'cube',material:'matte',x:0.88,y:0.63,size:0.13}
  ];
  window.AtlasEntries.register({
    id:'nscl',
    record:{
      title:'장면의 개념과 질문의 구조를, 답을 구하며 함께 배우다',
      subtitle:'NS-CL / NSCL · 신경·기호 개념 학습기',
      dateLabel:'2019 · ICLR / 2019-04-26 · arXiv v1',
      people:['Jiayuan Mao','Chuang Gan','Pushmeet Kohli','Joshua B. Tenenbaum','Jiajun Wu'],
      authorNote:'원문 공동저자 다섯 명을 표기 순서로 연결했다.',
      summary:'“구의 왼쪽 빨간 물체”를 찾으려면 말의 개념과 질문의 구조가 함께 필요하다. 물체별 개념값과 질문 프로그램을 연결해, 중간 선택이 최종 답으로 이어지는 과정을 살핀다.',
      detail:'',question:'',related:['deepproblog','imagenet','dreamcoder'],
      sources:[{title:'Mao 외 · ICLR 2019 공식 프로젝트 논문',url:paper},{title:'NS-CL · 저자 공식 프로젝트',url:project},{title:'arXiv · 2019-04-26 v1 기록',url:record}],
      caveat:'장면·질문·프로그램·개념값은 직접 작성했다. 연속적인 집합 선택과 질의 계산을 보여 주며 실제 물체 검출·신경망·의미 파서 추론이나 QA 학습 결과는 아니다.'
    },
    content:{
      article:{
        question:'그림에서 “빨강”과 “구”를 배우는 일과,\n“구 왼쪽의 빨간 물체”를 해석하는 일을 함께 익힐 수 있을까?',
        opening:[
          '“구의 왼쪽에 있는 빨간 물체의 모양은?” 이 질문에는 여러 일이 겹쳐 있다. 물체를 나누어 보고, 구와 빨강을 알아보고, 어느 물체를 기준으로 왼쪽을 찾을지 정해야 한다. 단어를 알아도 관계의 기준을 바꾸면 다른 물체를 가리킨다.',
          'Jiayuan Mao와 공동연구자들은 물체 중심 시각 표현과 질문을 프로그램으로 바꾸는 의미 파서 사이에 준기호 실행기를 놓았다. 개념을 물체 특징과 비교하고, 프로그램을 실행해 얻은 답을 질문의 정답과 연결해 시각 개념과 문장 해석을 함께 학습했다.',
          '개념·정답 프로그램의 직접 주석 없이 이미지·질문·정답을 이용했지만 무지도 학습은 아니다. Mask R-CNN은 박스 주석으로 사전학습했고, 시각 특징에는 ImageNet 사전학습을 사용했다. DSL과 개념어 후보도 주어진다.',
          '아래에서는 물체 네 개와 질문 두 개를 직접 구성했다. “구”에 가까운 물체를 기준으로 왼쪽을 찾고, 그중 빨간 정도를 살펴 모양을 묻는다. 최종 답만 보지 말고, 각 단계에서 어느 물체에 얼마나 무게가 남는지 따라가 보자.'
        ],
        visual:{
          id:'scene-program-execution',navLabel:'물체에서 질문의 답으로',
          title:'말의 개념과 관계를, 물체별 선택 값으로 연결하다',
          caption:'직접 그린 장면과 정한 개념값으로 프로그램의 중간 결과를 계산합니다. 막대는 0/1로 잘라 낸 정답 목록이 아니라, 각 물체가 선택되는 연속적인 정도를 보여 줍니다.',
          stages:[
            {id:'execute',label:'질문을 단계로 실행하다',text:'질문에 맞춰 미리 작성한 프로그램을 따라간다. 개념 필터, 기준 물체의 분포, 관계 선택을 거쳐 최종 속성이나 선택량을 읽는다.'},
            {id:'learn',label:'정답이 두 학습 경로를 잇다',text:'질문·정답은 시각 개념과 프로그램 해석에 서로 다른 학습 신호를 준다. 연속적인 시각 실행 경로와 이산적인 프로그램 선택 경로를 구분한다.'}
          ],
          scene:{
            objects,
            scope:'물체의 색·모양·배치는 직접 정한 장면이다. 좌표는 그림을 배치하는 용도이며 관계값을 추론하거나 계산하는 입력으로 사용하지 않는다.',
            source:at(4,'§3.1 · 물체 중심 표현을 참고한 자체 장면')
          },
          model:{
            conceptScores:{
              sphere:[0.06,0.94,0.09,0.04],red:[0.92,0.88,0.08,0.06],
              cube:[0.91,0.04,0.11,0.89],cylinder:[0.05,0.06,0.88,0.07],
              blue:[0.05,0.06,0.90,0.04],green:[0.04,0.04,0.06,0.93]
            },
            relations:{left:[
              [0.01,0.03,0.04,0.02],
              [0.95,0.01,0.88,0.05],
              [0.90,0.08,0.01,0.03],
              [0.97,0.90,0.95,0.01]
            ]},
            attributes:{shape:['cube','sphere','cylinder'],color:['red','blue','green']},
            scope:'값은 전부 직접 정했다. 개념 벡터를 학습하거나 그림에서 특징을 추출해 얻은 점수가 아니다. 관계 행렬은 행이 기준 물체, 열이 선택할 물체다. 속성별 개념 묶음도 직접 지정했다. 원문의 학습 가능한 속성 연관 가중치를 여기서 추정하지 않는다.',
            source:at(17,'Appendix C · 개념값·관계 행렬을 참고한 자체 수치')
          },
          questions:[
            {
              id:'shape-left-of-sphere',label:'관계와 모양을 묻기',text:'구의 왼쪽에 있는 빨간 물체의 모양은?',
              program:[
                {id:'all',op:'scene'},
                {id:'sphere',op:'filter',concept:'sphere'},
                {id:'reference',op:'unique'},
                {id:'left',op:'relate',relation:'left'},
                {id:'red',op:'filter',concept:'red'},
                {id:'target',op:'unique'},
                {id:'shape',op:'query',attribute:'shape'}
              ],
              answerLabel:'그림에 정한 답: 큐브',
              scope:'준비한 한국어 질문과 프로그램의 대응이다. Unique의 분포가 하나의 물체에 가깝더라도, 그것만으로 언어적 지시가 유일하다고 판정하지 않는다.',
              source:at(14,'Appendix A · DSL과 ObjectSet→Object 변환')
            },
            {
              id:'count-red',label:'선택량을 모으기',text:'빨간 물체는 몇 개 있나?',
              program:[{id:'all',op:'scene'},{id:'red',op:'filter',concept:'red'},{id:'count',op:'count'}],
              answerLabel:'그림 설정: 빨간 물체 2개',
              scope:'선택값의 합을 그대로 표시한다. 이 예시의 1.94를 임의로 정수화하거나 실제 검출 정확도로 표시하지 않는다. 그림에 정한 물체 수와 연속 실행값은 구분한다.',
              source:at(18,'Appendix C · Table 9 · Count')
            }
          ],
          initialQuestion:'shape-left-of-sphere',
          learning:{
            text:'정답만 맞았다고 모든 중간 해석이 옳은 것은 아니다. 다른 물체를 골라도 우연히 같은 모양이면 답이 맞을 수 있다. 시각 개념을 어떻게 적용했고 어떤 프로그램을 골랐는지 함께 확인해야 한다.',
            visualRoute:'원문은 미분 가능한 실행 결과로 시각 특징·개념을 학습한다.',
            parserRoute:'파서는 정답 보상과 프로그램 탐색을 이용한다. 우연히 맞는 해석도 남을 수 있다.',
            initialization:'사전학습·DSL·개념어는 출발 조건이다.',
            scope:'앞선 연산값은 고정한 개념값의 실행 결과다. 개념 학습이나 언어 해석의 정확성을 측정한 점수가 아니다.',
            source:at(6,'§3.2 · 시각 학습과 의미 파서의 최적화')
          },
          evidence:[
            {id:'framework',file:'nscl-2019-framework.png',title:'원논문 Fig.2 · 질문의 답이 두 경로를 잇다',caption:'프로그램 후보와 시각 개념의 학습 경로를 보여 준다. 예시의 예측 답과 정답은 다르다.',scope:'방법 도식이며 성공 추론이나 성능 수치가 아니다.',source:at(3,'Fig.2 · 전체 구조와 학습 신호'),credit:credit(3,'Fig.2')},
            {id:'concept-space',file:'nscl-2019-concept-space.png',title:'원논문 Fig.3 · 물체 특징을 개념과 비교하다',caption:'속성별 공간에서 물체 특징과 개념 벡터를 비교한다.',scope:'0.99는 도식의 예시 값이며 일반 정확도가 아니다.',source:at(4,'Fig.3 · 속성 연산자와 개념 공간'),credit:credit(4,'Fig.3')},
            {id:'curriculum',file:'nscl-2019-curriculum-execution.png',title:'원논문 Fig.4 · 쉬운 질문에서 복잡한 조합으로',caption:'A는 학습 순서, B는 프로그램 실행의 예시다.',scope:'원그림의 0.98과 객체 선택은 자체 장면의 계산값이 아니다.',source:at(5,'Fig.4 · curriculum과 실행 흔적'),credit:credit(5,'Fig.4')}
          ],
          scope:'직접 작성한 프로그램에 원문 연산의 수학을 적용한다. 연속 마스크·Unique·관계 가중합·속성 분포·선택량은 계산하지만 물체 검출, 개념·언어 모형의 추론이나 학습은 실행하지 않는다.',
          source:at(18,'Appendix C · Table 9 · 준기호 실행')
        },
        takeaway:{title:'무엇을 봤는지와, 문장을 어떻게 해석했는지 함께 살핀다',text:'답이 달라지는 이유는 색이나 모양을 잘못 읽어서일 수도 있고, 관계의 기준 물체를 잘못 골라서일 수도 있다. 물체별 개념값과 프로그램의 중간 선택을 나란히 읽으면 두 경우를 분리해 질문할 수 있다. 보이는 실행 흔적은 검토의 단서이며 그 해석이 항상 옳다는 증거는 아니다.'},
        technical:{
          title:'연산과 학습 조건을 더 읽기',
          paragraphs:[
            'Filter는 원소별 최솟값, Unique는 logit 뒤 softmax, Relate는 기준 물체 분포와 관계 행렬의 가중합이다. Query는 물체별 속성 개념값을 정규화한 뒤 혼합한다(Appendix C).',
            '의미 파서는 REINFORCE와 정답을 내는 프로그램 탐색을 이용한다. 개념어 후보는 규칙으로 추출하며, CLEVR의 개념어 집합은 알려져 있다(Appendix B·D).',
            '사전학습·주석 범위는 §4·Appendix F.2에서 확인한다. QA 학습과 물체 제안 모형의 출발 조건을 구분한다.',
            '이 예시에서는 물체별 개념값과 속성 묶음을 이미 정했다. 특히 Query의 속성 연관은 해당 묶음에서 1로 고정한 보기다. 원문의 개념 공간·단어 표현·속성 연관을 학습했다고 주장하지 않는다. Count는 연속 선택값의 합으로 읽고 추가 임계값을 넣지 않는다.',
            '서지: The Neuro-Symbolic Concept Learner: Interpreting Scenes, Words, and Sentences From Natural Supervision · ICLR 2019. 원그림은 공식 프로젝트의 28쪽 논문에서 렌더했다. arXiv:1904.12584v1의 등록일은 2019-04-26이며 이 날짜를 최초 공개일이나 ICLR 발표 당일로 바꾸어 쓰지 않는다.',
            '원문 저자: Jiayuan Mao; Chuang Gan; Pushmeet Kohli; Joshua B. Tenenbaum; Jiajun Wu. 원문과 상단 연결 모두 같은 다섯 공동저자 순서를 유지한다.'
          ],
          formula:'이 화면의 고정 점수에 적용하는 연산\nScene: 모든 물체의 선택값을 1로 시작\nFilter: min(이전 선택값, 개념값)\nUnique: softmax(logit(선택값))\nRelate: 기준 물체별 관계 행을 분포로 가중합\nQuery: 물체별 속성 분포를 기준 물체 분포로 혼합\nCount: 선택값의 합\n\n개념값과 관계값은 직접 정한 수치이며 학습 결과가 아니다.'
        }
      },
      keyIdeas:[
        {title:'물체를 나누어 보고, 말의 개념과 연결한다',text:'질문이 장면 전체를 한 덩어리로 가리키지는 않는다. 같은 “구”나 “빨강”을 물체마다 적용하며, 어떤 물체가 다음 연산의 기준이 되는지 살핀다.'},
        {title:'질문의 구조는 실행 순서를 바꾼다',text:'구를 먼저 찾고 왼쪽을 고르는 일과, 빨간 물체를 먼저 기준으로 삼는 일은 다르다. 여기서는 직접 쓴 프로그램의 입력과 출력을 단계별로 확인한다.'},
        {title:'같은 답도 다른 해석에서 나올 수 있다',text:'마지막 모양이 맞아도 잘못 고른 물체가 같은 모양일 수 있다. 정답과 중간 선택을 함께 검토하며 우연히 맞은 해석을 구분한다.'}
      ],
      videos:[],
      references:[
        {title:'Mao 외 · 공식 프로젝트의 ICLR 2019 논문',url:paper,location:'§3.1–3.2, §4, Appendix A–F.2. PDF/인쇄 쪽수 동일. Fig.2 p3, Fig.3 p4, Fig.4 p5.'},
        {title:'NS-CL · 저자 공식 프로젝트',url:project,location:'공동저자·ICLR 2019 Oral·Paper 링크. 이 카드의 원그림은 해당 Paper 링크의 파일을 기준으로 한다.'},
        {title:'arXiv · v1 등록 이력',url:record,location:'2019-04-26 등록. 프로젝트 논문과 별도 파일이며 그림의 실제 출처는 위 프로젝트 PDF다.'}
      ]
    }
  });
})();
