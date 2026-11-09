/* Historical source facts are kept short; all interactive dialogue is authored. */
(function(){
  'use strict';
  const launch='https://openai.com/index/chatgpt/';
  const predecessor='https://openai.com/index/instruction-following/';
  const source=(section,label)=>({title:'OpenAI (2022) · '+label,url:launch});
  const methods=source('methods','Introducing ChatGPT · Methods');
  const turn=(id,role,text)=>({id,role,text});
  const turns=[
    turn('request','user','도서관에서 초등학생 독서 모임을 열어. 금요일 오후 5시, 도서관 1층 모임방에서 만난다는 안내문을 세 문장으로 써 줘.'),
    turn('first-answer','assistant','도서관에서 함께 책을 읽어요. 금요일 오후 5시에 도서관 1층 모임방으로 오세요. 읽고 싶은 책 한 권을 가져오세요.'),
    turn('correction','user','시간은 토요일 오후 3시로 고칠게. 책을 가져오라는 조건은 빼 줘.'),
    turn('acknowledge','assistant','토요일 오후 3시로 고치고, 책을 가져오라는 문장은 빼겠습니다.'),
    turn('length','user','안내문은 두 문장으로 줄여 줘.'),
    turn('confirm','assistant','처음 요청의 대상과 장소를 유지하고, 바뀐 시간과 두 문장 조건을 반영하겠습니다.'),
    turn('followup','user','그 조건으로 안내문을 다시 써 줘.')
  ];
  const preparedReply='초등학생 친구들, 도서관 독서 모임에서 함께 책을 읽어요. 토요일 오후 3시에 도서관 1층 모임방에서 만나요.';
  const trainerDialogue=[
    turn('trainer-user','user','초등학생 독서 모임 안내를 세 문장으로 써 줘. 금요일 오후 5시, 도서관 1층 모임방에서 만나.'),
    turn('trainer-draft','assistant','초등학생 친구들을 독서 모임에 초대해요. 금요일 오후 5시에 만나요. 장소는 도서관 1층 모임방이에요.'),
    turn('trainer-followup','user','시간을 토요일 오후 3시로 고치고, 두 문장으로 줄여 줘.'),
    turn('trainer-assistant','assistant',preparedReply)
  ];
  window.AtlasEntries.register({
    id:'chatgpt',
    record:{
      title:'앞에서 나눈 말까지 읽고, 지금의 요청에 답하게 하다',
      summary:'“그 조건으로 다시 써 줘”를 이해하려면 앞선 요청과 바뀐 조건을 함께 봐야 한다. 한 번의 답에서 대화의 연속으로 관심을 옮겨, 어떤 말이 현재 응답의 문맥이 되는지 살핀다.',
      detail:'',question:'',
      sources:[{title:'OpenAI · Introducing ChatGPT · 2022-11-30',url:launch}],
      caveat:'직접 쓴 대화와 준비한 답으로 입력의 관계를 살피는 화면이다. 실제 ChatGPT 호출·토큰화·추론·모형 학습이나 성능 비교를 실행하지 않는다.'
    },
    content:{
      article:{
        question:'사람은 앞선 말을 줄이고 고쳐 가며 부탁한다.\n그 대화에 맞춰 답하게 하려면 무엇이 필요할까?',
        opening:[
          '“그 조건으로 다시 써 줘.” 이 한 문장에는 장소도 시간도 없다. 앞에서 무엇을 부탁했고 무엇을 고쳤는지에 따라 전혀 다른 안내문이 필요하다. 대화의 마지막 말만 떼어 읽으면, 사용자가 지금 원하는 일을 놓칠 수 있다.',
          'InstructGPT가 요청에 원하는 답을 배우게 했다면, ChatGPT에서는 대화 중 이어질 응답을 시범과 비교의 대상으로 삼았다. 트레이너는 사용자와 도우미 양쪽을 쓰며 모형 제안을 참고했다. 이 시범과 대화 형식으로 바꾼 InstructGPT 자료를 섞어 지도 미세조정했다.',
          '이어 같은 대화의 한 응답 자리에 놓인 대안들을 순위로 비교했다. 그 선호로 보상모형을 배우고, PPO를 사용하는 사람 피드백 강화학습(RLHF)으로 응답 정책을 조정했다. 지금 입력에 앞선 말을 포함하는 일과, 이런 자료로 응답 행동을 학습하는 일을 구분해 살펴보자.'
        ],
        visual:{
          id:'dialogue-feedback',navLabel:'이전 말과 새 요청을 잇다',
          title:'같은 마지막 요청도, 앞선 대화가 있어야 구체적이 된다',
          caption:'마지막 요청을 고정한 채 입력에 포함할 대화를 바꿔 보세요. 준비한 답은 전체 대화를 바탕으로 직접 쓴 자료이며, 어느 모드에서도 모델의 실제 출력으로 계산하지 않습니다.',
          stages:[
            {id:'context',label:'현재 입력을 읽다',text:'“그 조건”이 가리키는 말과 시간의 정정, 새 길이 조건을 찾는다. 대화 포함 범위를 바꾸는 조작은 입력 자료의 비교다.'},
            {id:'demonstration',label:'대화의 시범을 만들다',text:'누가 무슨 말을 하고 어떤 답이 이어져야 하는지, 직접 쓴 두 역할의 시범과 지시형 예시의 변환을 비교한다.'},
            {id:'preference',label:'한 응답 자리에서 비교하다',text:'같은 대화 뒤에 올 후보 하나의 자리를 정하고 답들을 비교한다. 순위는 선호 관계를 뜻하며 사실의 정답 점수는 아니다.'}
          ],
          dialogue:{
            turns,
            references:[
              {id:'time',label:'정정한 시간',mentionTurnId:'followup',mentionText:'그 조건',sourceTurnId:'correction',sourceText:'토요일 오후 3시'},
              {id:'place',label:'유지할 장소',mentionTurnId:'followup',mentionText:'그 조건',sourceTurnId:'request',sourceText:'도서관 1층 모임방'},
              {id:'audience',label:'안내를 읽을 대상',mentionTurnId:'followup',mentionText:'그 조건',sourceTurnId:'request',sourceText:'초등학생'},
              {id:'length',label:'나중에 바꾼 길이',mentionTurnId:'followup',mentionText:'그 조건',sourceTurnId:'length',sourceText:'두 문장'}
            ],
            preparedReply,
            scope:'도서관 일정과 모든 발화는 직접 작성했다. 전체 대화와 마지막 요청만의 차이는 화면에 제공한 정보의 차이다. 마지막 요청 모드에서 모델이 실패했다고 측정하거나, 준비한 답이 모든 조건에서 생성됐다고 표시하지 않는다. 이 대화 목록은 2022 모델의 실제 입력 직렬화·문맥 길이·Attention 비중을 재현하지 않는다.',
            source:source('methods','대화 시범이라는 원문 설정을 참고한 자체 입력 비교')
          },
          demonstration:{
            trainerDialogue,
            suggestionText:'친구들과 함께 읽을 책 이야기를 나누는 모임에 초대합니다.',
            convertedExample:{instruction:'다음 일정을 초등학생에게 두 문장으로 안내해 줘: 토요일 오후 3시, 도서관 1층 모임방에서 여는 독서 모임.',response:preparedReply},
            text:'위 대화는 두 역할을 모두 직접 쓴 시범이다. 옆의 제안문도 별도로 준비했다. 제안에서 무엇을 취하고 고쳐 쓸지는 작성자의 판단이며, 제안을 정답으로 취급하지 않는다.',
            scope:'트레이너 대화·제안문·지시형 예시는 모두 자체 문장이다. 변환 화면은 지시와 답을 사용자/도우미 역할에 배치하는 한 가지 예이며, 실제 InstructGPT 표본이나 원래 변환 코드가 아니다. 실제 시범 자료를 수집하거나 SFT 가중치를 바꾸지 않는다. 원문 방법의 확인된 범위는 아래 접힌 설명에 모았다.',
            source:methods
          },
          preference:{
            contextTurns:turns.map(t=>({...t})),targetMessageId:'reply-to-compare',
            candidates:[
              {id:'A',label:'후보 A',text:preparedReply},
              {id:'B',label:'후보 B',text:'초등학생 친구들, 도서관 독서 모임에서 함께 책을 읽어요. 금요일 오후 5시에 도서관 1층 모임방에서 만나요.'},
              {id:'C',label:'후보 C',text:'초등학생 친구들을 독서 모임에 초대해요. 장소는 도서관 1층 모임방이에요. 시간은 토요일 오후 3시예요. 함께 책 이야기를 나눠요.'}
            ],
            initialRanking:['A','C','B'],
            text:'A는 바뀐 시간과 두 문장을 지킨다. B는 예전 시간을 되살리고, C는 새 시간은 맞지만 네 문장이다. 순서를 바꾸며 무엇을 더 선호하는지 비교해 볼 수 있다.',
            scope:'후보 세 개와 초기 순위는 직접 정했다. 비교 대상 자리는 화면용 ID이며 실제 모델 토큰이 아니다. 순위에서 선호 쌍을 만들 뿐 RM 점수·손실·PPO 최적화·파라미터 갱신을 계산하지 않는다. 엄격한 순위를 쓰는 이 화면을 실제 수집의 후보 수·동점 처리·학습 설정으로 확대하지 않는다.',
            source:methods
          },
          scope:'이 화면은 입력 목록·자체 시범·후보의 순서를 조작한다. 준비한 답을 ChatGPT의 생성 결과로 표시하지 않으며, 현재 제품의 기능이나 2022 모델의 성능을 검증한 실험이 아니다.',
          source:methods
        },
        takeaway:{title:'대화에 남은 조건과, 그 조건에 응답하는 행동을 함께 보다',text:'새 발화는 앞의 요청을 유지하기도 하고 수정하기도 한다. 현재 답에 어떤 말을 포함할지 확인하는 일과, 원하는 응답을 학습할 자료를 만드는 일은 서로 다른 질문이다. 대화를 그 두 층위에서 읽으면 “앞서 말한 것을 안다”는 표현을 더 구체적으로 살필 수 있다.'},
        technical:{
          title:'2022 공식 소개에서 확인한 방법과 한계',
          paragraphs:[
            '2022-11-30 연구 프리뷰로 소개됐다. 원문은 InstructGPT의 형제 모형이며, 2022년 초 훈련을 마친 GPT-3.5 계열 한 모형에서 미세조정했다고 적는다.',
            'Methods는 대안 비교의 대상을 챗봇 대화에서 무작위로 고른 모형 메시지로 설명하며, 이 과정을 여러 번 반복했다고 적는다.',
            'Limitations는 그럴듯한 오답, 표현 민감성, 장황함, 모호한 요청의 추측, 유해·편향 응답을 경고한다. 시연을 일반 성능 평가로 읽지 않는다.',
            '앞의 방법은 학습 자료를 모아 모형을 조정하는 과정이다. 이 화면에서 대화를 더 포함하거나 순위를 바꾸는 조작은 저장된 문장과 비교 관계만 바꾼다. 화면 조작이 모델 학습을 수행하거나 미래 대화까지 영구히 기억시킨다는 의미를 부여하지 않는다.',
            '이 글에서 ChatGPT 고유의 규모·학습 횟수·보상모형 크기·KL 계수까지 확인한 것은 아니다. GPT-3.5 계열이라는 설명만으로 InstructGPT의 특정 체크포인트를 이어 썼다고 단정하거나 논문의 상세 값을 복사하지 않는다. 화면의 사용자/도우미 목록도 내부 토큰 형식의 원자료가 아닌 자체 표현이다.'
          ],
          formula:'화면에 포함한 대화 = 선택한 사용자/도우미 발화 목록\n비교할 응답 자리 = 같은 대화 뒤의 한 자리\n준비한 답 = 전체 예시를 읽고 직접 쓴 별도 문장\n후보 순위 = 직접 선택한 선호 관계\n\n이 목록 조작은 모델의 토큰화·생성·학습 실행이 아니다.'
        }
      },
      keyIdeas:[
        {title:'마지막 문장의 빈자리를, 앞선 말에서 찾는다',text:'“그 조건”은 스스로 시간과 장소를 담지 않는다. 자체 예시에서 어느 발화를 참고해야 하는지 표시하며, 앞의 말을 유지하는 경우와 나중 말로 고치는 경우를 나눈다.'},
        {title:'현재 읽는 대화와, 대화 행동을 배우는 자료를 구분한다',text:'입력에 포함한 말은 지금 답의 조건이다. 시범과 선호 자료는 어떤 응답을 더 원할지 학습시키는 자료다. 같은 문장을 쓰더라도 어느 역할로 사용하는지 확인해야 한다.'},
        {title:'여러 답은, 같은 대화의 같은 자리에서 비교한다',text:'입력까지 함께 바꾸면 차이가 어디에서 왔는지 읽기 어렵다. 여기서는 앞 대화를 고정하고, 오래된 시간·새 시간·문장 수 조건을 후보가 어떻게 반영했는지 비교한다.'}
      ],
      videos:[],
      references:[
        {title:'OpenAI · Introducing ChatGPT · 2022-11-30',url:launch,location:'Methods · Limitations · Author. 당시 본문과 후대 내비게이션을 구분했다.'},
        {title:'OpenAI · Aligning language models to follow instructions · 2022-01-27',url:predecessor,location:'앞선 InstructGPT 기록을 연결하는 배경 자료. 이 카드의 대화·답·순위는 해당 자료의 표본을 복제한 것이 아니다.'}
      ]
    }
  });
})();
