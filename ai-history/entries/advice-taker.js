/* John McCarthy: one independently editable article. The original airport
 * equations and argument are reconstructed by visuals/advice-taker.js. */
window.AtlasEntries.register({
  id:'advice-taker',
  record:{
    title:'알려준 지식에서, 다음 생각을 이끌어내다',
    summary:'상황과 목표를 기호로 표현하고, 알고 있는 지식에서 행동에 필요한 결론을 추론하는 Advice Taker를 구상했다.',
    detail:'',question:'',
    caveat:'1958년 발표·1959년 출판된 프로그램의 제안이다. 지식 선택과 추론 탐색은 미완성이며, 완성된 상식 지능이나 실제 공항 이동을 입증한 결과가 아니다.'
  },
  content:{
    article:{
      question:'알려준 사실 너머의 결론을,\n기계가 스스로 생각해 낼 수 있을까?',
      opening:[
        '“공항에 가고 싶다.” 사람은 이 말에 자신이 있는 곳, 차가 있는 곳, 이동하는 방법을 연결한다. 목표 하나를 듣고도 그 목표를 이루려면 먼저 무엇을 해야 할지 생각한다.',
        '매카시는 이 능력을 지식의 표현과 추론에서 찾았다. 세상에 관해 아는 것과 원하는 것을 기호로 적고, 그 문장들과 기존 지식에서 새로운 결론을 이끌어내게 하려 했다. Advice Taker는 조언을 받으면 그 내용을 바탕으로 행동을 바꿀 수 있는 프로그램의 구상이었다.'
      ],
      visual:{
        id:'advice-to-action',navLabel:'지식에서 행동으로',
        title:'공항에 가려면, 지금 무엇을 해야 할까?',
        caption:'원문의 공항 사례를 따라, 장소에 관한 사실이 계획과 첫 행동으로 이어지는 과정을 살펴보세요.',
        premiseLabel:'차의 위치 정보 포함',
        premiseNote:'차가 없다는 뜻이 아니라, 그 위치를 알려 주지 않은 상태입니다.',
        stages:[
          {id:'knowledge',label:'상황을 기호로',text:'“나는 책상에 있다”와 “공항에 가고 싶다”를 서로 다른 문장으로 적는다. 지금 참인 사실과 이루려는 목표를 구분한다.'},
          {id:'plan',label:'가능한 계획',text:'집 안에서는 걸을 수 있고 지역 안에서는 운전할 수 있다는 규칙을 위치 정보와 결합한다. 차까지 걷고 공항까지 운전하는 계획을 잇는다.'},
          {id:'action',label:'다음 행동',text:'계획이 목표로 이어지고 현재 그 첫 조건이 성립하면, “차로 걸어가라”는 명령을 얻는다. 이 명령을 실행하는 일이 뒤따라야 한다.'}
        ],
        source:{title:'McCarthy (1959) · §2, 식 (1)–(17)·추론목록, pp.6–8을 바탕으로 재구성',url:'https://www-formal.stanford.edu/jmc/mcc59.pdf#page=6'}
      },
      takeaway:{title:'지식은 판단의 재료가 되고, 추론은 다음 행동으로 이어진다',text:'한 번 알려 준 지식이 다른 사실·목표와 결합해 새로운 판단에 쓰이도록 한다. 그 지식에서 무엇이 따라 나오는지 기계 스스로 구하게 하려는 발상이다.'},
      technical:{
        title:'원문의 기호·추론·제안의 범위 더 읽기',
        paragraphs:[
          '원문에는 공항 사례를 그린 별도 도판 대신 전제식과 추론목록이 있다. 화면의 장소도와 흐름도는 이를 새로 구성한 그림이다. county는 집과 공항을 포함하는 지역으로 표시했다.',
          'at는 이 예시에서 장소와 하위 장소의 관계를 나타낸다. 저자는 논문 뒤 토론에서 일상언어의 “근처에 있다” 전체를 형식화한 것이 아니라고 설명한다. 원문 식 (6)은 이 관계의 추이성을 가정한다.',
          '식 (9)·(10)은 걷기·운전의 가능 조건, (13)은 행동 후의 위치, (15)·(16)은 행동과 계획의 연결, (17)은 목표를 향한 첫 행동의 지시를 다룬다. canachult는 특정 조건에서 행동이 궁극적으로 어떤 상태를 가져올 수 있음을, prog는 행동의 순서를 표현한다.',
          '추론목록의 마지막은 do(go(desk,car,walking))이다. at(I,airport)를 현재 사실로 얻는 것이 아니다. 원문의 결합 계획 식은 지면에서 닫는 기호가 어긋나 있으므로, 화면에는 그 식을 그대로 옮기지 않고 걷기→운전의 순서를 표시했다.',
          '차의 위치를 가리는 조작은 화면에 추가했다. 정해진 추론 연결에서 필요한 전제가 빠지면 어떤 결론까지 이어지는지 보여 준다. 일반 정리증명기, 전체 17개 식의 자동 유도, 자연어 이해, 실제 이동을 구현한 것은 아니다. 전제가 없다는 이유로 그 문장의 부정을 결론 내리지 않는다.',
          '§1에서 지식과 조언을 진술로 알려 행동을 바꾸는 목표를 제시했지만, 경험에서 스스로 배우는 완성된 체계를 보고한 것은 아니다. §2는 관련 전제를 모으는 방법과 추론을 진행하는 방법에 완전한 답을 주지 못했다고 명시한다.',
          '1960년 Lisp 논문의 서론은 제안된 Advice Taker의 실험을 돕기 위해 기호식을 다루는 시스템을 개발했다고 설명한다. Lisp의 구현과 Advice Taker 구상의 완성은 구분해서 읽는다.'
        ],
        formula:'현재 위치:  at(I, desk)\n목표:       want(at(I, airport))\n첫 행동:    do(go(desk, car, walking))'
      }
    },
    keyIdeas:[
      {title:'배우게 하려면, 먼저 알려 줄 수 있어야 한다',text:'매카시는 추상적 개념을 발견하려면 그 개념을 표현할 수 있어야 한다고 보았다. 우선 상황과 지식을 문장으로 알려 주어 행동을 개선하고, 이후 경험에서 배우는 방법도 표현하려 했다. 추상적 지식을 다룰 수 있는 언어가 지능 구현의 토대가 된다는 관점이다.'},
      {title:'무엇을 꺼내 생각할지 고르는 데도 지능이 필요하다',text:'논문은 지능의 관건을 관련 전제들을 선택하는 절차에 두었다. 기억하는 모든 사실을 한꺼번에 추론에 넣으면 계산이 너무 오래 걸린다. 목표와 관련된 지식을 찾아 묶고, 그 안에서 결론을 얻는 일을 함께 설계해야 했다.'},
      {title:'발표 뒤에는, 이 “상식”의 빈틈을 묻는 토론이 이어졌다',text:'논문에 실린 토론에서 바르힐렐은 필요한 사실의 선택과 시간·거리 같은 누락된 조건을 지적했다. 매카시는 실제 여행 문제를 해결한 결과가 아니라 필요한 추론을 생각하기 위한 예시라고 답했다. 원리의 제안과 현실에서 믿고 쓸 수 있는 판단 사이의 간격이 토론에 그대로 남아 있다.'}
    ],
    videos:[],
    references:[
      {title:'McCarthy · Programs with Common Sense',url:'https://www-formal.stanford.edu/jmc/mcc59.pdf',location:'저자 보관 PDF의 쪽수 기준. §1 pp.1–4 지식·조언·학습의 동기; §2 pp.5–10 지식표현·전제선택·공항 예시. pp.6–8의 식과 추론목록을 본문·지면으로 대조.'},
      {title:'§1 · Introduction',url:'https://www-formal.stanford.edu/jmc/mcc59/node1.html',location:'기존 지식에서 결론을 얻는 상식의 정의, 추상 개념의 표현, 선언문으로 행동을 개선하려는 목표. 본문 확인.'},
      {title:'§2 · The Construction of the Advice Taker',url:'https://www-formal.stanford.edu/jmc/mcc59/node2.html',location:'항목 3의 관련 전제 선택, 공항 예시와 식 (1)–(17), 추론 후 미해결 휴리스틱 논의. 본문 확인. 그림은 이 사례의 자체 재구성.'},
      {title:'Discussion of the Paper · Bar-Hillel과 McCarthy의 논의',url:'https://www-formal.stanford.edu/jmc/mcc59/node4.html',location:'바르힐렐의 전제·시간 조건 비판과 끝부분 저자 답변: at의 뜻, 예시의 목적, 도착 사실과 행동 지시의 구분. 본문 확인.'},
      {title:'저자의 논문 소개 · 발표 시점',url:'https://www-formal.stanford.edu/jmc/mcc59.html',location:'1958년 12월 Teddington 발표 확인. 본문 PDF의 1959년 표기와 구분. 후대 웹페이지의 갱신일을 연구 연도로 사용하지 않음.'},
      {title:'McCarthy (1960) · Lisp 논문 서론',url:'https://www-formal.stanford.edu/jmc/recursive/node1.html',location:'첫 두 문단: 제안된 Advice Taker 실험을 돕기 위한 Lisp의 개발 목적. 1960년 후속 자료이며 1958년의 성과로 합치지 않음.'}
    ]
  }
});
