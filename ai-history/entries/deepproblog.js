/* Authored finite calculations are distinct from the paper's neural training. */
(function(){
  'use strict';
  const paper='https://arxiv.org/pdf/1805.10872v2';
  const record='https://arxiv.org/abs/1805.10872';
  const published='https://orca.cardiff.ac.uk/id/eprint/116510/1/manhaeve-nips18.pdf';
  const at=(page,label)=>({title:'Manhaeve 외 (2018) · arXiv v2 PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const credit=(page,label)=>({title:'Manhaeve 외 (2018) · arXiv v2 · '+label,url:paper+'#page='+page,note:'원문과 전체 캡션을 300dpi로 렌더해 영역만 잘랐습니다. 내용·수치·색·화살표는 바꾸지 않았으며 한국어 설명은 이미지 밖에 두었습니다.'});
  window.AtlasEntries.register({
    id:'deepproblog',
    record:{
      title:'확신하지 못한 인식도, 규칙과 함께 추론에 쓰다',
      subtitle:'DeepProbLog · 신경 확률 논리 프로그래밍',
      dateLabel:'2018-05-28 · 첫 원고 / NeurIPS 2018 / 읽은 원고: 2018-12-12 v2',
      people:['Robin Manhaeve','Sebastijan Dumančić','Angelika Kimmig','Thomas Demeester','Luc De Raedt'],
      authorNote:'공동저자 다섯 명을 원문 순서로 연결했다. Thomas Demeester·Luc De Raedt의 별표는 공동 마지막 저자 표시다.',
      summary:'그림을 가장 그럴듯한 숫자 하나로 바꾸고 끝낼까, 여러 가능성을 규칙 안에서 함께 계산할까? 직접 정한 두 분포와 덧셈 규칙으로 두 선택의 차이를 살핀다.',
      detail:'',question:'',related:['prolog','lenet','ltn'],
      sources:[{title:'DeepProbLog · 2018 arXiv v2 본문·부록',url:paper},{title:'Cardiff 저자 소속 기관 저장소 · 출판본',url:published},{title:'arXiv · 첫 원고와 개정 이력',url:record}],
      caveat:'직접 그린 숫자와 정한 분포의 확률·손실을 계산한다. 실제 MNIST 추론·신경망 훈련이나 ProbLog 실행 결과는 아니다.'
    },
    content:{
      article:{
        question:'신경망이 숫자를 확신하지 못할 때,\n그 가능성들을 논리 규칙 안에서 함께 계산할 수 있을까?',
        opening:[
          '손글씨를 읽는 일과 숫자를 더하는 일은 같은 문제가 아니다. 흐릿한 획을 보고 “2일 수도 있고 3일 수도 있다”고 판단해도, 덧셈의 규칙까지 불확실해지는 것은 아니다. 각 그림에서 숫자 하나를 먼저 고르는 대신, 남은 가능성을 규칙과 함께 살려 두면 답이 달라질 수 있을까?',
          'Robin Manhaeve와 공동연구자들은 추론 전체를 신경망 구조로 옮기는 대신, 확률 논리 언어 ProbLog에 신경 술어를 연결했다. 신경망의 출력 확률을 논리 프로그램의 선택 확률로 쓰고, 규칙으로 전체 질의의 확률을 계산한다.',
          '원논문의 MNIST 덧셈은 개별 이미지의 숫자 라벨 대신 두 이미지의 합으로 학습했다. 질의 확률의 오차를 신경망까지 전달해, 합을 맞추는 과정에서 숫자 인식을 배우게 한 것이다.',
          '아래에서는 두 그림의 후보를 2와 3으로 두고, 확률을 직접 정한다. 규칙은 덧셈을 담당하고 확률은 인식의 불확실성을 담는다. “가장 그럴듯한 숫자 둘의 합”과 “가장 그럴듯한 합”이 꼭 같은지 직접 확인해 보자.'
        ],
        visual:{
          id:'neural-probabilistic-logic',navLabel:'인식의 가능성을 논리로 잇다',
          title:'숫자 하나를 먼저 고르기 전에, 네 경우를 함께 보다',
          caption:'직접 그린 숫자와 정한 확률로, 같은 합을 만드는 경우들을 계산합니다. 확률과 합 질의를 바꾸며 결과를 비교해 보세요.',
          stages:[
            {id:'query',label:'합의 확률을 묻다',text:'서로 다른 두 입력의 후보를 조합하고 덧셈 규칙으로 합을 구한다. 선택한 합에 해당하는 경우를 모아 질의 확률을 계산한다.'},
            {id:'learn',label:'합의 정답을 학습 신호로',text:'선택한 합을 정답으로 놓으면 그 합의 확률이 손실에 연결된다. 확률의 변화와 신경망 가중치를 학습하는 과정을 구분해 읽는다.'}
          ],
          digits:[2,3],
          inputs:[{id:'left',label:'왼쪽 그림',illustration:'left'},{id:'right',label:'오른쪽 그림',illustration:'right'}],
          presets:[
            {id:'ambiguous',label:'개별 최댓값과 합이 갈리는 경우',leftProbabilities:[0.6,0.4],rightProbabilities:[0.7,0.3]},
            {id:'clear-two',label:'양쪽 모두 2가 더 그럴듯한 경우',leftProbabilities:[0.9,0.1],rightProbabilities:[0.9,0.1]},
            {id:'clear-three',label:'양쪽 모두 3이 더 그럴듯한 경우',leftProbabilities:[0.2,0.8],rightProbabilities:[0.3,0.7]}
          ],
          initialPreset:'ambiguous',targets:[4,5,6],initialTarget:5,
          rules:{
            neuralPredicate:'nn(m_digit, X, [2,3]) :: digit(X,2); digit(X,3).',
            additionRule:'addition(X,Y,Z) :- digit(X,A), digit(Y,B), Z is A+B.',
            scope:'원래 T1 프로그램의 출력 범위 0~9를 두 후보 2·3으로 바꾼 자체 표기다. 덧셈 규칙은 이미 제공한 지식이다.',
            source:at(12,'Appendix A · Listing 1 · 원래 T1 프로그램')
          },
          example:{
            text:'기본값에서는 각 그림에서 가장 큰 확률을 고르면 2와 2라서 합은 4다. 하지만 합 5에는 2+3과 3+2라는 두 경우가 있다. 두 경우의 확률을 모으면 0.46으로, 합 4의 0.42보다 크다. 인식 결과를 하나로 닫기 전에 가능한 경우를 계산한 차이다.',
            scope:'서로 다른 두 입력의 범주 선택을 독립으로 가정한다. 각 입력은 2·3 중 하나이며 네 조합은 서로 배타적이다. 그래서 조합 안에서는 곱하고 같은 합의 조합끼리는 더한다. 일반 논리 프로그램의 겹치는 증명 확률을 무조건 더해도 된다는 규칙이 아니다.',
            source:at(3,'§3 · 확률 선택과 질의 확률을 참고한 자체 계산')
          },
          learning:{
            text:'선택한 합을 정답으로 놓고 −log P(선택한 합)을 계산한다. 합 5만 주면 2+3과 3+2 중 어느 쪽이 각 그림의 정답인지 하나로 정해지지는 않는다. 합의 정답과 개별 인식의 정답은 서로 다른 정보다.',
            scope:'손실의 softmax logit 미분은 계산하지만 신경망 내부 가중치 θ의 미분·갱신을 실행하지 않는다. 합의 확률이 높아졌다는 사실만으로 각 이미지의 숫자를 올바르게 인식했다고 판단하지 않는다.',
            source:at(6,'§5 · 신경 술어를 경유하는 기울기 전달')
          },
          evidence:[
            {id:'pipeline',file:'deepproblog-2018-learning-pipeline.png',title:'원논문 Fig.2 · 질의의 오차를 신경망까지 보내다',caption:'(a) 학습 흐름, (b) 동전 프로그램, (c) win 질의의 SDD와 기울기다.',scope:'동전 예시 원그림이다. 화면의 숫자 덧셈 결과와 구분한다.',source:at(5,'Fig.2 · Parameter learning in DeepProbLog'),credit:credit(5,'Fig.2')},
            {id:'addition',file:'deepproblog-2018-addition-program.png',title:'원논문 Listing 1 · 읽을 부분과 더할 부분을 나누다',caption:'T1은 0~9 신경 술어와 덧셈 규칙을 연결한다.',scope:'원래 프로그램이다. 화면의 두 후보 표기와 범위를 구분한다.',source:at(12,'Appendix A · Listing 1 · Single-digit MNIST addition'),credit:credit(12,'Listing 1')}
          ],
          scope:'계산 범위는 직접 정한 범주 분포의 네 조합·합 질의·손실과 softmax logit 미분이다. 원문의 SDD 컴파일·신경망 내부 θ 미분·갱신·성능 평가는 실행하지 않는다.',
          source:at(2,'§1 · 신경 술어와 질의에서의 학습')
        },
        takeaway:{title:'인식은 가능성을 주고, 규칙은 그 가능성을 엮는다',text:'어느 숫자가 가장 그럴듯한지 묻는 것과 어느 합이 가장 그럴듯한지 묻는 것은 다르다. 이 화면에서는 서로 다른 두 조합이 같은 합을 만들 수 있었다. 이미 아는 덧셈 규칙을 남겨 두면, 인식의 불확실성을 없애 버리지 않고 최종 질문까지 가져갈 수 있다.'},
        technical:{
          title:'신경 술어와 확률 질의의 범위를 더 읽기',
          paragraphs:[
            '§4–5는 grounding·논리식 변환·SDD 컴파일 후 질의 확률을 계산하고, gradient semiring과 신경망 역전파를 연결한다. 신경망 출력은 정규화한 확률이다.',
            'T1에는 합의 정답과 덧셈 규칙이 주어진다. 개별 숫자 라벨이 없다는 뜻이지, 정답 없는 학습이라는 뜻은 아니다.',
            '일반 프로그램에서는 증명들이 겹칠 수 있다. 이 화면의 상호 배타적인 네 경우를 더하는 계산을, 모든 증명 확률의 단순 합으로 확대하지 않는다. 정의한 프로그램의 확률 질의를 다룬다는 범위와 모든 1차 논리의 무제한 자동 증명·현실 정답 보장은 다르다.',
            '원래 T1의 덧셈 규칙은 제공된 지식이다. 이 화면에서 바꾸는 것은 준비한 분포이며 실제 이미지의 숫자 정답·독립성·훈련 결과를 검증하지 않는다. 손실이나 그 미분을 계산하는 것과 신경망 내부 θ를 갱신한 학습 결과도 구분해야 한다.',
            '서지: DeepProbLog: Neural Probabilistic Logic Programming · NeurIPS 2018 채택. 첫 원고는 arXiv:1805.10872v1(2018-05-28), 직접 읽고 렌더한 자료는 v2(2018-12-12) 14쪽이다. 출판본과 판본·쪽수를 구분하며, 2019 확장 원고 arXiv:1907.08194와 후속 학술지판을 이 판본에 섞지 않았다.',
            '원문 저자: Robin Manhaeve; Sebastijan Dumančić; Angelika Kimmig; Thomas Demeester; Luc De Raedt. 표지의 joint last authors는 마지막 두 저자에 붙은 표기다.'
          ],
          formula:'아래 수치는 직접 정한 기본 분포의 계산이다.\nP(합=4) = 0.6×0.7 = 0.42\nP(합=5) = 0.6×0.3 + 0.4×0.7 = 0.46\nP(합=6) = 0.4×0.3 = 0.12\n\n선택한 합이 5일 때의 손실 = −log(0.46) ≈ 0.7765\n실제 신경망의 출력·학습·시험 결과가 아니다.'
        }
      },
      keyIdeas:[
        {title:'불확실한 인식을, 숫자 하나로 너무 일찍 닫지 않는다',text:'왼쪽과 오른쪽에서 각각 가장 큰 값만 고르면 놓치는 조합이 생긴다. 자체 계산에서는 네 가능성을 보존하고, 최종 합을 만드는 경우를 모은다.'},
        {title:'아는 규칙과, 배워야 할 인식을 구분한다',text:'덧셈은 이미 적어 둔 규칙이다. 그림이 무엇인지에 대한 불확실성은 숫자별 분포에 둔다. 규칙을 적용하는 부분과 이미지에서 확률을 얻는 부분을 같은 대상으로 취급하지 않는다.'},
        {title:'끝의 정답이, 앞의 인식에 학습 신호를 준다',text:'이 화면의 손실은 합을 묻는 자리에서 계산된다. 손실을 줄이려는 신호가 인식까지 이어진다는 발상과, 지금 가중치를 실제로 갱신했다는 결과는 구분한다.'}
      ],
      videos:[],
      references:[
        {title:'Manhaeve 외 · arXiv:1805.10872v2 원문',url:paper,location:'§1·3–6, Fig.2 PDF5, Appendix A Listing 1 PDF12. 이미지의 실제 출처 판본이며 PDF/인쇄 쪽수는 같다.'},
        {title:'arXiv · 첫 원고·v2·채택 이력',url:record,location:'v1 2018-05-28 / v2 2018-12-12. 최신 확장 논문과 다른 레코드.'},
        {title:'Cardiff ORCA · 저자 소속 기관의 Published Version',url:published,location:'기관 저장소의 출판본 참고 링크. 이 카드의 직접 읽기와 원그림 렌더 출처는 위 arXiv v2다.'},
        {title:'2019 확장 원고 · 별도 판본',url:'https://arxiv.org/abs/1907.08194',location:'Neural Probabilistic Logic Programming in DeepProbLog. 이 카드의 원그림 출처가 아니다.'}
      ]
    }
  });
})();
