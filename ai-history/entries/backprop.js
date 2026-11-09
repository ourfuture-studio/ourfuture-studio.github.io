/* One article: learning what hidden units represent, not just an update rule.
 * Published Fig.1 parameters and the interactive diagram live in visuals/. */
window.AtlasEntries.register({
  id:'backprop',
  record:{
    title:'판단에 쓸 특징까지, 경험에서 배우게 하다',
    summary:'출력의 정답에서 얻은 학습 신호로 연결을 조정해, 중간층이 과제에 필요한 표현을 형성하게 했다.',
    detail:'',question:'',
    caveat:'1986년 Rumelhart·Hinton·Williams의 공동 논문이다. 화면은 Fig.1의 발표된 연결값으로 반응을 계산하며, 당시 학습 과정 전체나 생물학적 뇌 학습을 재현하지 않는다.'
  },
  content:{
    article:{
      question:'정답만 알려 주면,\n판단에 쓸 특징도 배울 수 있을까?',
      opening:[
        '여섯 칸의 무늬가 좌우 대칭인지 판단한다고 해 보자. 어느 한 칸이 켜져 있다는 사실만으로는 답을 알 수 없다. 여러 칸의 관계를 보는 중간 판단이 필요하다. 그 중간층은 무엇을 보도록 만들어야 할까?',
        '루멜하트·힌턴·윌리엄스는 최종 출력의 오차에서 각 연결의 변화가 미칠 영향을 계산하고 연결값을 조정했다. 중간층의 정답을 별도로 주지 않아도, 학습 과정에서 그 단위가 언제 반응하고 무엇을 표현할지가 형성되게 하려는 발상이다.'
      ],
      visual:{
        id:'learning-hidden-representation',navLabel:'판단 기준을 배우다',
        title:'중간층에 무엇을 보라고 가르쳤을까?',
        caption:'입력 칸을 눌러 무늬를 바꿔 보세요. 논문에 제시된 학습 후 연결에서, 두 중간 단위와 최종 출력이 어떻게 반응하는지 계산합니다.',
        stages:[
          {id:'perception',label:'무늬와 판단',text:'여섯 입력의 신호가 두 중간 단위를 거쳐 출력으로 이어진다. 여러 칸의 관계가 판단에 쓰인다.'},
          {id:'feedback',label:'오차 되짚기',text:'학습에서는 출력과 정답의 차이에서 출발해 각 연결을 바꾸면 오차가 어떻게 달라질지 계산한다. 그 신호가 중간층의 연결 조정에도 쓰인다.'},
          {id:'representation',label:'중간 표현',text:'발표된 망의 두 중간 단위는 전체 무늬의 불균형에 서로 반대 방향으로 반응한다. 학습이 과제에 쓸 내부 표현을 만든 사례다.'}
        ],
        scope:'논문 Fig.1의 학습 후 연결값으로 반응을 계산합니다. 새로 학습시키는 화면은 아닙니다.',
        source:{title:'Rumelhart·Hinton·Williams (1986) · Fig.1과 식 (1)–(7), pp.533–535 참조',url:'https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf#page=2'}
      },
      takeaway:{title:'무엇을 보고 판단할지도 학습의 대상이 됐다',text:'출력에서 요구한 과제를 풀도록 연결을 바꾸면서, 입력을 다시 표현하는 중간층도 함께 형성한다. 내부 표현을 학습한다는 것이 이 논문의 중심 질문이다.'},
      technical:{
        title:'연결값·역전파·원문 실험의 범위 더 읽기',
        paragraphs:[
          'Fig.1의 구조는 이진 입력 6개→중간 단위 2개→출력 1개다. 그림의 위→아래 입력 순서를 화면의 왼쪽→오른쪽으로 옮겼다. 연결 수와 수치는 원문을 대조하고 배치는 새로 그렸다.',
          '표시한 반응은 식 (1)·(2)의 가중합과 sigmoid로 계산한다. 논문 그림의 반올림된 가중치·편향을 사용한다. 반응값은 확률이나 확신도가 아니다. 대칭 무늬에서도 중간 반응은 약 0.250이고 출력은 약 0.881로, 정확히 0 또는 1이 되지는 않는다.',
          '왼쪽 중간 단위의 가중치는 [14.2, −3.6, 7.2, −7.2, 3.6, −14.2], 오른쪽은 [−14.2, 3.6, −7.1, 7.1, −3.6, 14.2]다. 두 편향은 −1.1, 출력 가중치는 [−8.8, −8.8], 출력 편향은 6.4다. 각 중간 단위가 전체 입력을 받으며, 거울 쌍 하나씩을 따로 맡는 구조가 아니다.',
          '학습의 기준은 식 (3)의 제곱 오차다. 식 (4)–(7)은 출력에서 앞선 층으로 미분을 전하고, 식 (8)·(9)는 가중치 갱신을 다룬다. 그림의 역방향 강조는 이 계산의 방향을 나타낸다. 토글로 무늬를 바꾸어도 발표 가중치는 바뀌지 않는다.',
          'Fig.1은 가능한 입력 64개 전체로 학습한 사례다. 화면에서 무늬를 바꾸는 것은 이 망의 계산을 살피는 일이며, 미학습 입력의 일반화 시험이나 학습 과정 재현이 아니다.',
          '원문 p.535는 국소 최솟값으로 인한 한계를, p.536은 당시 절차와 뇌 학습의 차이를 명시한다. p.535에서 Parker와 LeCun의 독립적인 변형 발견도 인정한다. 1985년 기술보고서와 1986년 Nature 논문을 구분하고 단독 최초 발명으로 서술하지 않는다.'
        ],
        formula:'신호를 보낼 때:  입력 → 중간 표현 → 출력\n학습 신호 계산:  출력 오차 → 중간층 → 앞선 연결\n식 (6):  ∂E/∂wⱼᵢ = (∂E/∂xⱼ) yᵢ\nx: 합친 입력 · y: 반응값 · w: 연결값 · E: 오차'
      }
    },
    keyIdeas:[
      {title:'끝의 오차가 앞선 연결의 학습 신호가 된다',text:'한 중간 단위가 여러 뒤쪽 단위에 연결되어 있으면, 각 경로가 오차에 미치는 영향을 모은다. 이 과정을 앞선 층으로 반복해, 입력 가까이에 있는 연결에도 조정에 쓸 신호를 전달한다.'},
      {title:'다른 이름 속에서도 관계의 구조를 찾았다',text:'논문의 가족나무 사례에서는 이름과 관계로 사람을 찾도록 학습한 뒤, 중간 표현에 세대와 가족의 분기 같은 구조가 나타났다. 이름별 입력에 드러나 있지 않던 관계가 학습된 연결에 반영된 것이다.'}
    ],
    videos:[{title:'Lecture 12A: Neural Nets',url:'https://www.youtube.com/watch?v=uXt8qF2Zzfo',channel:'MIT OpenCourseWare',note:'Patrick Winston의 신경망·역전파 배경 강의. 원논문 저자의 발표와는 별개인 후대의 강의다.',sourceUrl:'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/resources/lecture-12a-neural-nets/'}],
    references:[
      {title:'Rumelhart·Hinton·Williams · Learning representations by back-propagating errors',url:'https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf',location:'Nature 323, 533–536 (1986). p.533 내부 표현의 질문·식 (1)(2), p.534 Fig.1·식 (3)–(6), p.535 식 (7)–(9)·Fig.2–4 논의·한계·독립적 발견, p.536 첫 문단의 생물학적 구분. 네 쪽의 해당 본문·도판을 지면으로 확인. 첫쪽 상단과 마지막쪽의 다음 논문은 제외.'},
      {title:'Hinton · Backpropagation Learning 논문 목록',url:'https://www.cs.toronto.edu/~hinton/backprop.html',location:'공동저자, 1986 Nature 논문과 별도 PDP 장의 서지 확인. Nature 논문의 저자 보관본과 함께 읽는다.'},
      {title:'MIT OCW · Lecture 12A: Neural Nets',url:'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/resources/lecture-12a-neural-nets/',location:'공식 강의 설명의 신경망·역전파 범위, Winston, YouTube 연결 ID 확인. 재생·전체 시청은 검사하지 않았다.'}
    ]
  }
});
