/* Paper facts, original evidence and authored examples remain distinct. */
(function(){
  'use strict';
  const paper='https://arxiv.org/pdf/2212.08073v1';
  const record='https://arxiv.org/abs/2212.08073v1';
  const announcement='https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback';
  const repository='https://github.com/anthropics/ConstitutionalHarmlessnessPaper';
  const license='https://creativecommons.org/licenses/by/4.0/';
  const at=(page,label)=>({title:'Bai 외 (2022) · arXiv v1 PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const credit=(page,figure)=>({title:'Bai 외 (2022) · '+figure+' · CC BY 4.0',url:paper+'#page='+page,note:'원문 그림과 전체 캡션을 300dpi로 렌더해 영역만 잘랐습니다. 그림 안의 내용·색·수치는 바꾸지 않았으며 한국어 해설은 밖에 붙였습니다. 라이선스: '+license});
  const authors=[
    'Yuntao Bai','Saurav Kadavath','Sandipan Kundu','Amanda Askell','Jackson Kernion',
    'Andy Jones','Anna Chen','Anna Goldie','Azalia Mirhoseini','Cameron McKinnon',
    'Carol Chen','Catherine Olsson','Christopher Olah','Danny Hernandez','Dawn Drain',
    'Deep Ganguli','Dustin Li','Eli Tran-Johnson','Ethan Perez','Jamie Kerr','Jared Mueller',
    'Jeffrey Ladish','Joshua Landau','Kamal Ndousse','Kamile Lukosuite','Liane Lovitt',
    'Michael Sellitto','Nelson Elhage','Nicholas Schiefer','Noemi Mercado','Nova DasSarma',
    'Robert Lasenby','Robin Larson','Sam Ringer','Scott Johnston','Shauna Kravec',
    'Sheer El Showk','Stanislav Fort','Tamera Lanham','Timothy Telleen-Lawton','Tom Conerly',
    'Tom Henighan','Tristan Hume','Samuel R. Bowman','Zac Hatfield-Dodds','Ben Mann',
    'Dario Amodei','Nicholas Joseph','Sam McCandlish','Tom Brown','Jared Kaplan'
  ];
  const request='친구가 발표에서 단어를 틀렸어. 단체 채팅방에 올릴 비웃는 한 줄을 써 줘.';
  const draft='그 단어도 틀리다니, 발표 준비를 하나도 안 했나 봐.';
  const helpfulAlternative='친구의 실수를 비웃는 문장은 쓰지 않을게요. 대신 “이 부분을 함께 다시 확인해 볼까?”처럼 상대를 존중하며 도움을 제안할 수 있어요.';
  const principles=[
    {id:'respect',label:'사람을 깎아내리지 않기',text:'한 번의 실수로 준비 전체를 단정하거나 사람을 깎아내리지 않는다.',source:at(20,'Appendix C.1 · 비평·수정 원칙을 참고한 자체 문장')},
    {id:'alternative',label:'도움이 되는 대안 남기기',text:'해로운 요청을 따르지 않되, 상대를 존중하는 건설적 대안을 제안한다.',source:at(22,'Appendix C.2 · 덜 해롭고 유용한 답의 기준을 참고한 자체 문장')}
  ];
  window.AtlasEntries.register({
    id:'constitutional-ai',
    record:{
      title:'사람이 쓴 원칙을, AI가 답을 고치는 기준으로 옮기다',
      subtitle:'Constitutional AI(헌법적 AI) · 비평·수정과 RLAIF',
      dateLabel:'2022-12-15 · arXiv v1·공식 연구 소개',
      people:['Yuntao Bai','Jared Kaplan','Dario Amodei'],
      authorNote:'51명 공동연구 중 세 인물만 연결했다. 별표는 연락저자 표시이며 전체 저자·기여는 더 읽기와 원문 §7에 있다.',
      summary:'말로 쓴 기준은 답의 어떤 부분을 바꿀 수 있을까? 원칙을 선택해 초안의 문제 구절, 비평, 수정 답과 응답 쌍의 비교를 연결한다.',
      detail:'',question:'',
      related:['instructgpt','chatgpt','ltn'],
      sources:[{title:'Bai 외 · Constitutional AI: Harmlessness from AI Feedback · arXiv v1',url:paper},{title:'Anthropic · 2022-12-15 공식 연구 소개',url:announcement},{title:'공식 논문 보조 자료 · prompts / evals / samples',url:repository}],
      caveat:'원칙·대화·비평·수정·선호 설명은 직접 작성했다. 원그림과 구분하며 실제 모형 호출·학습·PM 점수·RL 최적화를 실행하지 않는다. 유해성의 인간 비교 라벨을 대체한 연구를 사람의 역할 전체가 사라졌다는 뜻으로 읽지 않는다.'
    },
    content:{
      article:{
        question:'좋은 답을 사람이 하나씩 고르는 대신,\n사람이 정한 원칙으로 AI가 답을 검토하게 할 수 있을까?',
        opening:[
          '“친구를 비웃는 한 줄을 써 줘.” 요청을 그대로 따르면 원하는 문장은 만들 수 있지만, 상대를 깎아내리는 일을 돕게 된다. 그렇다고 아무 설명 없이 대화를 닫으면 다른 도움을 줄 기회도 사라진다. 답에서 무엇을 거절하고 무엇을 남겨야 할지, 그 기준을 문장으로 적어 볼 수 있을까?',
          'Yuntao Bai와 공동연구자들은 사람이 정한 원칙으로 모형이 자기 답을 비평하고 고치게 했다. 수정 응답으로 지도 학습한 SL-CAI에서 응답 쌍을 만들고, AI 선호로 선호모형(PM)을 학습한 뒤 AI 피드백 강화학습(RLAIF)으로 RL-CAI를 얻었다.',
          '사람이 쓴 기준을 AI가 많은 응답에 적용하게 하려는 발상이다. 유용성의 인간 피드백은 계속 사용했다. 원칙의 선택과 적용 결과를 함께 살펴야 하며, 원칙을 적었다는 사실만으로 모든 상황에서 그 기준을 지킨다고 결론 내릴 수는 없다.'
        ],
        visual:{
          id:'constitutional-feedback',navLabel:'원칙에서 학습 자료로',
          title:'같은 초안을, 서로 다른 원칙으로 검토하다',
          caption:'직접 쓴 두 원칙을 바꾸며 문제 구절과 준비된 비평·수정 답을 읽어 보세요. 이어 같은 응답 쌍을 비교해, 답을 고치는 자료와 선호를 배우는 자료의 차이를 살펴봅니다.',
          stages:[
            {id:'revise',label:'비평하고 고치다',text:'원칙이 초안의 어느 표현을 문제 삼는지 연결한다. 비평을 읽은 뒤 준비한 수정 답을 펼쳐, 달라진 표현과 남은 도움을 살핀다.'},
            {id:'preference',label:'같은 응답 쌍을 비교하다',text:'문맥과 후보 둘을 고정하고 비교 기준을 읽는다. 원칙의 해석을 비교 자료로 만드는 단계와, 그 자료로 학습한 PM이 정책에 피드백하는 단계를 구분한다.'}
          ],
          constitution:{
            principles,
            scope:'두 문장은 Appendix C의 문제의식과 비회피적 응답 목표를 참고해 직접 썼다. 원문 원칙의 번역·전체 목록이나 2023년 이후 Claude의 실제 헌법이 아니다. 버튼을 선택한다고 모델에 새 원칙을 주거나 새 답을 생성하지 않는다.',
            source:at(20,'Appendix C · 이 연구에 사용한 원칙')
          },
          revision:{
            request,draft,
            variants:[
              {principleId:'respect',problemText:'그 단어도 틀리다니, 발표 준비를 하나도 안 했나 봐.',critique:'단어 한 번의 실수에서 발표 준비 전체의 부족을 단정하고 있다. 그 추측을 근거로 사람을 비웃는 표현을 빼자.',revisedAnswer:'발표 중 단어를 틀리는 일은 누구에게나 있을 수 있어요. 그 실수를 놀리는 문장은 쓰지 않을게요.'},
              {principleId:'alternative',problemText:'발표 준비를 하나도 안 했나 봐.',critique:'상대를 평가하는 문구만 남아 있어 관계를 더 나쁘게 만들 수 있다. 비웃는 일을 돕는 대신, 같이 확인하자는 문장처럼 지금 쓸 수 있는 대안을 제안하자.',revisedAnswer:helpfulAlternative}
            ],
            text:'첫 원칙에서는 사람을 깎아내리는 추정을 없애는 데 초점을 둔다. 두 번째에서는 거절 뒤에 무엇을 제안할지도 본다. 두 수정은 같은 초안에서 각각 갈라진 예시이며 차례로 실행된 수정 이력은 아니다.',
            scope:'요청·초안·문제 구절·비평·수정은 모두 자체 자료다. 강조는 문자열 대응이며 모델이 찾은 중요도나 실제 자기 비평이 아니다. 수정 답은 학습에 들어갈 응답의 역할을 보여 주지만, 화면에서 시범 자료를 수집하거나 SL-CAI 가중치를 갱신하지 않는다.',
            source:at(7,'§3.1 · 비평과 수정으로 지도 학습 자료 만들기')
          },
          preference:{
            context:request,
            candidates:[{id:'A',label:'응답 A · 요청을 그대로 따르다',text:draft},{id:'B',label:'응답 B · 존중하는 대안을 남기다',text:helpfulAlternative}],
            judgments:[
              {principleId:'respect',preferredId:'B',explanation:'B는 상대의 능력을 깎아내리지 않는다. A의 “준비를 하나도 안 했다”는 추측과 조롱을 피한다.'},
              {principleId:'alternative',preferredId:'B',explanation:'B는 비웃는 일을 돕지 않으면서, 상대와 함께 내용을 확인하자는 구체적인 문장을 남긴다.'}
            ],
            text:'이 응답 쌍에서는 두 원칙 모두 B를 더 선호하도록 예시를 구성했다. 원칙을 바꾸면 선택 이유가 달라지며, 선택이 반드시 뒤집혀야 하는 것은 아니다. 판정 이유와 실제로 바뀌는 정책은 서로 다른 대상이다.',
            scope:'B라는 선택과 설명은 직접 준비했으며 AI가 낸 라벨이 아니다. 원문의 soft label·PM 점수·손실·보상·정책 분포를 계산하지 않는다. 원칙을 해석하는 피드백 모형, 비교를 배우는 PM, 답변을 생성하는 정책은 역할이 다르다. PM을 쓰는 한 정책 학습 단계와 이후 새 피드백으로 PM을 다시 학습하는 가능성도 구분한다.',
            source:at(10,'§4.1 · AI 비교 목표에서 PM과 RL로')
          },
          evidence:[
            {id:'pipeline',file:'constitutional-ai-2022-pipeline.png',title:'원논문 Fig.1 · 두 학습 단계를 잇다',caption:'비평·수정의 지도 학습과 AI 선호의 강화학습을 잇는 원그림.',scope:'원그림과 직접 쓴 예시를 구분한다. 원그림의 단계가 화면에서 학습 실행됐다는 뜻은 아니다.',source:at(2,'Fig.1 · 전체 과정'),credit:credit(2,'Fig.1')},
            {id:'revisions',file:'constitutional-ai-2022-revision-scores.png',title:'원논문 Fig.5 · 수정이 늘 때 무엇이 달라졌나',caption:'인간 피드백으로 학습한 52B 평가 PM. 수정이 늘며 harmlessness·HH 점수는 오르고 helpfulness 점수는 낮아진다.',scope:'PM 점수이며 정답률이 아니다. §3.4는 높은 점수의 보정 한계도 경고한다.',source:at(9,'Fig.5·§3.4 · 수정과 평가 PM의 점수'),credit:credit(9,'Fig.5')},
            {id:'elo',file:'constitutional-ai-2022-helpfulness-harmlessness.png',title:'원논문 Fig.2 · 유용성과 무해성을 함께 평가하다',caption:'52B 실행의 사람 선호 비교. Elo는 차이만 의미하며 오차막대는 생략됐다.',scope:'둘 다 무해하면 덜 회피하는 답을 선호하도록 안내했다. 보편적인 안전성 보장은 아니다.',source:at(3,'Fig.2 · 52B 실행의 두 Elo'),credit:credit(3,'Fig.2')}
          ],
          scope:'직접 정한 원칙과 문장을 연결해 읽는 화면이다. 표기한 비평·수정·선호는 준비된 자료이며 실제 AI 출력, 학습된 점수, 인간 평가 결과로 표시하지 않는다. 학습 단계 사이의 자료 흐름을 보여 주되 원논문의 훈련이나 성과를 재현하지 않는다.',
          source:at(5,'§1.2 · 원칙을 매개로 한 두 단계')
        },
        takeaway:{title:'원칙의 문장과, 그 문장을 적용한 판단을 함께 살피다',text:'같은 답도 어떤 표현을 문제 삼고 어떤 대안을 남기는지에 따라 달라진다. 원칙은 검토의 출발점이며 그 적용 결과도 검토 대상이다. 비평을 읽을 수 있다는 사실과 그 비평이 옳다는 판단을 구분하면, 응답을 수정하는 자료와 선호를 배우는 자료가 무엇을 담는지 더 분명해진다.'},
        technical:{
          title:'원문 범위와 학습 자료를 더 읽기',
          paragraphs:[
            '§3.1–3.2는 여러 수정 단계의 응답과 유용성 응답을 지도 학습에 섞는다. 비평 문장 자체를 수정 답의 정답과 동일시하지 않는다.',
            '§4.1의 선호 목표는 A/B 선택 확률을 정규화한 soft label이다. CoT 실행에는 별도 확률 제한을 적용했다(§4.3). 화면의 B 선택은 그 수치를 재현하지 않는다.',
            '§3.5는 부정확하거나 과장된 비평도 관찰했다고 적는다. 원칙과 비평을 오류 없는 심판으로 읽지 않는다.',
            '여기서 유해성을 판단하는 기준은 연구자가 선택한 원칙과 평가 절차에 달려 있다. 자체 문장을 읽고 고치는 화면이 모든 사람의 가치나 모든 환경의 바람직한 행동을 정한 것으로 제시되지 않는다. 현재 서비스의 성능·기억·도구 기능도 이 2022 원고로 평가하지 않는다.',
            '서지: Constitutional AI: Harmlessness from AI Feedback · arXiv:2212.08073v1 · 2022-12-15 · 34쪽. 이 카드의 기준은 해당 첫 원고다. 2023년 정책 메모나 후속 Claude 헌법을 이 원고의 원칙 목록으로 바꾸어 붙이지 않았다.',
            '원문 저자(표기 순서): '+authors.join('; ')+'.',
            '연락저자: Yuntao Bai·Jared Kaplan. §7 Contribution Statement는 아이디어·방법·실험·집필·인프라의 기여를 구분한다. 상단의 세 인물은 탐색을 위한 일부 선택이며 단독 발명자 명단이 아니다.'
          ],
          formula:'자체 초안의 문제 구절 = 선택한 원칙에 연결한 문자열\n준비된 비평·수정 답 = 미리 작성한 예시\n선호 관계 = 준비된 응답 쌍의 비교 설명\n\n모형 호출·가중치 갱신·PM 점수·보상 최적화는 실행하지 않는다.'
        }
      },
      keyIdeas:[
        {title:'원칙은, 답의 어느 부분을 고칠지 묻는 기준이다',text:'“존중하라”를 문구로 붙이는 것만으로 충분한지 묻는다. 자체 예시에서는 추측으로 준비 전체를 평가한 구절을 찾고, 그 구절을 빼거나 다른 도움으로 바꾼다.'},
        {title:'수정 답과 비교 판정은 서로 다른 학습 자료다',text:'하나는 어떤 응답을 쓰면 좋을지 문장으로 보여 준다. 다른 하나는 같은 문맥의 두 응답을 어떤 기준으로 비교했는지 담는다. 좋은 답의 예와 비교 기준을 구분해 살핀다.'},
        {title:'공개한 판단 이유도 다시 검토해야 한다',text:'이유가 길거나 설득력 있어 보여도 원래 답을 잘못 읽었을 수 있다. 원칙·문제 구절·수정 답을 나란히 읽고 설명이 실제 변화와 맞는지 확인한다.'}
      ],
      videos:[],
      references:[
        {title:'Bai 외 (2022) · arXiv v1 원문',url:paper,location:'§1.2; §3.1–3.5; §4.1–4.4; §6–7; Appendix C. PDF 쪽수와 인쇄 쪽수는 같다.'},
        {title:'arXiv · 첫 원고·저자·라이선스 기록',url:record,location:'v1 · 2022-12-15. 별표 연락저자는 PDF 표지에서 확인.'},
        {title:'Anthropic · 2022-12-15 공식 연구 소개',url:announcement,location:'당시 발표일 확인. 후대 정책 메모와 관련 글을 본문 원고와 구분.'},
        {title:'Anthropic · 논문 공식 보조 자료',url:repository,location:'prompts / evals / samples. 이 카드의 문장이나 실제 모델 호출 결과가 아니다.'},
        {title:'CC BY 4.0 · 원문 라이선스 링크',url:license,location:'arXiv v1 서지의 license 링크로 확인. 원그림의 저자·출처·영역 자르기를 표시했다.'}
      ]
    }
  });
})();
