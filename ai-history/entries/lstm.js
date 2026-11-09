/* 1997 original memory cell. This article and its sources can be edited
 * independently from visuals/lstm-memory.js and the shared reading layout. */
window.AtlasEntries.register({
  id:'lstm',
  record:{
    title:'필요한 정보를 남기고, 나중에 꺼내 쓰게 하다',
    summary:'시간을 잇는 상태 통로와 쓰기·읽기 게이트를 나누어, 긴 간격 뒤의 정답에서도 앞선 정보를 활용하는 방법을 학습하려 했다.',
    detail:'',question:'',
    sources:[
      {title:'Hochreiter·Schmidhuber (1997) · 대학 보관 출판본',url:'https://web.stanford.edu/class/psych209/Readings/HochreiterSchmidthuber97LSTM.pdf'},
      {title:'Long Short-Term Memory · 출판 서지',url:'https://doi.org/10.1162/neco.1997.9.8.1735'}
    ],
    caveat:'1997년의 두 게이트와 기억 셀을 다룬다. 화면의 쓰기 후보와 게이트값은 직접 정했으며, 학습된 가중치나 원논문의 학습 실험을 재현한 결과가 아니다. CEC 내부 경로와 전체 망의 미분을 구분한다.'
  },
  content:{
    article:{
      question:'나중에 필요할 정보를,\n지금부터 남겨 둘 수 있을까?',
      opening:[
        '처음에 나온 단서가 한참 뒤의 답을 바꾼다고 해 보자. 그 사이에는 답과 관계없는 입력도 계속 들어온다. 필요한 정보를 남기는 일, 새 입력의 간섭을 막는 일, 알맞은 순간에 그 정보를 사용하는 일을 함께 배워야 한다.',
        '순환 신경망은 앞선 활동을 다음 순간으로 전달할 수 있다. 어려움은 뒤늦게 나온 정답에서 오래전 입력의 기여를 배우는 데 있었다. 오차 신호가 여러 시간 단계의 연결과 미분을 거치며 매우 작아지거나 커지면, 앞선 연결을 조정하기 어려워진다.',
        'Hochreiter와 Schmidhuber는 상태를 이어 가는 통로와 그 통로에 접근하는 기능을 나누었다. 입력 게이트는 무엇을 상태에 쓸지, 출력 게이트는 저장된 내용을 언제 다른 계산에 드러낼지를 조절한다. 오차가 오래 돌아갈 내부 경로를 마련하고, 게이트가 열릴 시점도 학습하게 하려는 발상이다.'
      ],
      visual:{
        id:'gated-memory',navLabel:'기억과 학습의 통로',
        title:'기억은 남기고, 쓰고 읽는 순간은 고른다',
        caption:'신호를 기록한 순간부터 무관한 입력을 지나 다시 읽는 순간까지 따라가 보세요. 내부에 남은 상태와 지금 외부로 내보내는 출력, 그리고 오차가 돌아갈 경로를 나누어 봅니다.',
        stages:[
          {id:'remember',label:'기억 남기기',text:'정보를 이어 가는 상태 통로를 두고, 입력 게이트로 새 쓰기를 조절한다. 무관한 입력의 쓰기를 허용하면 보관한 상태가 어떻게 달라지는지 비교해 보세요.'},
          {id:'read',label:'필요할 때 읽기',text:'출력 게이트는 남아 있는 상태를 다른 계산에 드러낼 정도를 조절한다. 읽기를 막아도 내부 상태가 사라지는 것은 아닙니다.'},
          {id:'credit',label:'배울 신호 남기기',text:'나중의 정답에서 앞선 기록을 배우려면 오차가 돌아갈 길도 필요하다. CEC 내부 자기연결의 경로와, 단계마다 미분이 곱해지는 경로의 한 예를 비교합니다.'}
        ],
        scope:'쓰기 후보와 게이트값을 직접 정해 상태를 추적합니다. 0·1 게이트는 전달 차이를 보여 주는 설정이며, 실제 게이트의 열림 정도는 학습된 연결에서 sigmoid의 연속값으로 계산합니다. 원래 가중치나 학습 성능을 재현한 화면은 아닙니다.',
        source:{title:'Hochreiter·Schmidhuber (1997) · 인쇄 pp.1742–1745·Fig.1, Appendix A.1 참조',url:'https://web.stanford.edu/class/psych209/Readings/HochreiterSchmidthuber97LSTM.pdf#page=10'}
      },
      takeaway:{title:'오래 남길 통로와, 그 통로를 쓸 시점을 함께',text:'상태를 이어 가는 내부 경로를 마련하고, 무엇을 쓰고 언제 읽을지는 게이트의 학습으로 조절한다. 앞선 정보가 뒤의 판단에 쓰이도록 기억과 학습의 시간 간격을 연결한 것이 이 논문의 핵심이다.'},
      technical:{
        title:'1997년 셀·함수·시간 간격과 화면의 범위 더 읽기',
        paragraphs:[
          '기준은 Neural Computation 9(8), 1735–1780의 출판본이다. 대학 보관 PDF는 46쪽이며 Fig.1은 PDF 10쪽, 인쇄 1744쪽이다. 자체 쪽수 1–32를 쓰는 저자 원고와 쪽수를 혼용하지 않는다.',
          'Fig.1의 상태는 이전 상태에 입력 게이트와 변환된 셀 입력의 곱을 더한다. 출력은 상태를 h로 변환한 값에 출력 게이트를 곱한다. 자기연결의 가중치 1.0은 한 시간 단계의 지연을 가진다. 입력·게이트·셀을 잇는 망의 연결값을 학습하는 과정과, 한 입력 줄에서 변하는 활성 상태를 구분한다.',
          'Appendix A.1의 실험 함수는 gate(x)=σ(x), h(x)=2σ(x)−1=tanh(x/2), g(x)=4σ(x)−2=2tanh(x/2)다. 화면의 쓰기 후보 z는 g를 이미 거친 값으로 직접 정한다. 원시 입력을 그대로 셀 입력으로 간주하지 않으며, 출력에는 원문의 h를 적용한다. 따라서 상태 0.8을 읽을 때 h(0.8)은 약 0.380이다.',
          '화면에서는 처음에 후보 0.8을 쓰고, 사이의 후보는 +0.6과 −0.4를 번갈아 제시한다. 입력 게이트를 닫으면 이 후보들이 상태를 바꾸지 않는다. 무관한 입력도 쓰도록 바꾸면 값이 누적된다. 마지막 출력 게이트를 닫아도 상태는 남고 외부 출력만 0이 된다. 이 설정의 게이트 동작을 학습한 것은 아니다.',
          '오차 경로의 비교는 한 단계의 미분을 0.5로 정한 경로의 곱과, CEC 내부 자기연결 경로의 곱을 보여 준다. 모든 순환망의 미분이 0.5라는 뜻도, 전체 LSTM의 기울기가 항상 1이라는 뜻도 아니다. 게이트·비선형 함수·다른 연결을 통과하는 미분과 내부 보존 경로를 구분해야 한다.',
          '원문의 Adding 과제는 실수와 표시값의 쌍을 순서대로 제시한다. 앞부분의 두 수 X₁·X₂를 표시하고, 끝에서 목표 0.5+(X₁+X₂)/4를 요구한다. 길이는 최소 T부터 T+T/10 사이에서 고른다. Table 7의 T=1000 조건은 최소 지연 500을 포함한다. 화면의 한 신호 보관은 이 과제를 학습해 푼 결과가 아니다.',
          '1997년 Fig.1에는 입력 게이트와 출력 게이트가 있다. 이후의 망각 게이트를 넣은 도식을 원래 그림과 섞지 않는다. Gers·Schmidhuber·Cummins의 후속 연구는 상태를 적절히 재설정하는 적응 게이트를 다루며, 1999년 기술보고서와 2000년 학술지 출판을 구분한다.',
          '원문은 여러 기억 셀이 게이트를 공유하는 기억 블록도 설명한다. 여기서는 한 셀을 따라간다. 인공 순차 과제의 결과를 모든 실제 시계열에서 무제한으로 기억한다는 주장으로 일반화하지 않는다.'
        ],
        formula:'sₜ = sₜ₋₁ + iₜ zₜ       zₜ = g(netₜ)\nyₜ = oₜ h(sₜ)\nh(s) = 2σ(s) − 1 = tanh(s/2)\nCEC 내부 자기연결 경로: 1 × 1 × … × 1'
      }
    },
    keyIdeas:[
      {title:'기록하고 지키는 요구를, 같은 연결이 함께 떠안았다',text:'정보를 쓰는 연결은 필요한 입력을 받아들이면서 뒤따르는 무관한 입력은 막아야 했다. 출력 연결도 필요한 때에는 기억을 사용하고 다른 때에는 주변 계산을 방해하지 않아야 했다. 두 게이트는 이런 접근의 조절을 상태 보존 통로에서 나누어 맡는다.'},
      {title:'나중의 정답에서, 앞선 기록의 책임을 배우려 했다',text:'긴 간격의 문제는 보관한 값이 남아 있는가와 함께, 앞선 연결을 어떻게 바꿀지 배울 수 있는가의 문제다. CEC는 내부의 선형 상태와 고정된 자기연결로 오차가 지나갈 경로를 마련한다. 게이트는 그 경로로의 접근을 조절한다.'},
      {title:'두 숫자를 표시하고, 끝에서만 채점했다',text:'원문의 Adding 과제에서는 앞쪽에 표시된 두 실수의 정보를 긴 입력 줄 끝까지 사용해야 한다. 중간에는 무관한 수들이 들어오고 정답의 오차는 마지막에만 주어진다. 무엇을 남길지와 뒤늦은 오차로 그 선택을 배우는 능력을 함께 시험하는 인공 과제였다.'},
      {title:'기억한 값과, 기억하는 법은 다르다',text:'그 입력 줄에서 보관되는 값은 빠르게 변하는 활성 상태다. 가중치는 여러 학습 예를 거치며 어떤 정보에 반응하고 언제 쓰고 읽을지를 정하는 연결이다. 원문 도입은 활성에 담긴 기억과 천천히 변하는 가중치의 역할을 이렇게 구분한다.'}
    ],
    videos:[{title:'MIT 6.S191 (2024) · Deep Sequence Modeling',url:'https://www.youtube.com/watch?v=dqoEU9Ac3ek',channel:'MIT 6.S191',note:'순환망과 후대의 시퀀스 모형을 함께 다루는 배경 강의. 1997년 원저자 발표와 구분한다. 공식 일정의 연결을 확인했으며 현재 재생·전체 시청은 검사하지 않았다.',sourceUrl:'https://introtodeeplearning.com/2024/'}],
    references:[
      {title:'Hochreiter·Schmidhuber (1997) · Long Short-Term Memory · 대학 보관 출판본',url:'https://web.stanford.edu/class/psych209/Readings/HochreiterSchmidthuber97LSTM.pdf',location:'인쇄 1735–1736: 활성 기억과 가중치·긴 간격의 문제. 1742: §3.2.2 CEC. 1743–1746: 쓰기·읽기의 충돌과 게이트, Fig.1·상태식. 1760–1761: Adding 과제와 Table 7. 1769: h/g 함수 식 A.2–A.3. 해당 지면을 렌더링해 대조. PDF 10쪽이 인쇄 1744쪽이다.'},
      {title:'Long Short-Term Memory · 출판 서지',url:'https://doi.org/10.1162/neco.1997.9.8.1735',location:'Neural Computation 9(8), 1735–1780, 1997. 두 공동저자와 출판 연도 기준. 페이지 표기는 위 46쪽 출판본에 맞춘다.'},
      {title:'Gers·Schmidhuber·Cummins (2000) · Learning to Forget: Continual Prediction with LSTM',url:'https://pubmed.ncbi.nlm.nih.gov/11032042/',location:'후속 연구의 공식 초록에서 적응적인 망각 게이트와 상태 재설정 목적을 확인. 1997년 원구조의 일부로 합치지 않는다. 이 항목은 초록·서지 범위이며 전문을 검증한 것은 아니다.'},
      {title:'Schmidhuber (2003) · 저자 LSTM 튜토리얼',url:'https://people.idsia.ch/~juergen/lstm/',location:'original cell, current standard, no forget gates와 with forget gates를 나누는 저자 자료. 1997년 논문의 직접 근거와 후대 설명 자료를 구분한다.'},
      {title:'MIT · Introduction to Deep Learning 2024 공식 일정',url:'https://introtodeeplearning.com/2024/',location:'Lecture 2 Deep Sequence Modeling의 공식 영상 연결과 YouTube ID dqoEU9Ac3ek 대조. 특정 분·초의 내용, 전체 시청·현재 재생 여부는 확인하지 않았다.'}
    ]
  }
});
