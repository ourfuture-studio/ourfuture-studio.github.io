/* Source-based reading diagrams and authored, staged dialogue. No AI is executed. */
(function(){
  'use strict';
  const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
  const pdf='https://www.csee.umbc.edu/courses/471/papers/turing_computing_machinery_and_intelligence.pdf';
  const source=(title,page,location)=>({title,url:pdf+'#page='+page,location});
  const sources=freeze({
    question:source('Turing (1950) · 질문의 대체',2,'§1 · 인쇄 p.433/PDF p.2. 생각의 일상적 정의를 먼저 확정하는 대신 질문을 모방 게임으로 바꿈.'),
    original:source('Turing (1950) · 원형 게임과 A의 교체',2,'§1 · 인쇄 pp.433–434/PDF pp.2–3. A남자·B여자·C심문자에서 시작해 A를 기계로 바꾸는 질문. 두 구성을 구분.'),
    channel:source('Turing (1950) · 글로 주고받는 조건',3,'§1–2 · 인쇄 pp.434–435/PDF pp.3–4. 타자·전신으로 주고받고 외모·촉각·목소리의 단서를 제외.'),
    machine:source('Turing (1950) · 당시 장치와 가능성의 질문',4,'§3 · 인쇄 pp.435–436/PDF pp.4–5. 당시 모든 컴퓨터의 성공을 보고하는 실험과 가능한 장치를 묻는 질문을 구분.'),
    section5:source('Turing (1950) · §5 말미의 형식',11,'§5 말미 · 인쇄 p.442/PDF p.11. A역할의 컴퓨터와 B역할의 사람(man)을 명시. §1 원형의 성별 구별 게임과 구분.'),
    consciousness:source('Turing (1950) · 의식에 관한 반론',14,'§6 (4) · 인쇄 pp.445–447/PDF pp.14–16. 관찰된 답변과 내부 경험에 관한 주장을 같은 것으로 합치지 않음.'),
    learning:source('Turing (1950) · 초기 상태·교육·경험',24,'§7 · 인쇄 pp.455–456/PDF pp.24–25. 성인 능력의 프로그램과 아동 프로그램·교육 과정의 대안, 초기 상태·교육·다른 경험의 구분.'),
    feedback:source('Turing (1950) · 피드백과 언어 지시',26,'§7 · 인쇄 p.457/PDF p.26. 보상·벌 신호는 교육의 일부이며 감정을 전제하지 않음. 언어 명령을 전할 별도 통신 채널을 제안.')
  });
  const r=(id,label,input,role,output,sourceIds)=>({id,label,input,role,output,sourceIds});
  const views=freeze([
    {id:'game',label:'01 질문을 모방 게임으로 바꾸기',title:'“생각한다”의 정의에서, 질문하고 답을 읽는 조건으로',intro:'1950년 원문의 세 구성을 차례로 비교합니다. A·B의 논문상 역할과 심문자가 보는 X·Y 표지는 다른 층위입니다.',initial:'replace-question',nodes:[
      r('replace-question','질문의 형식을 바꾸다','기계와 생각이라는 말의 뜻','논문은 정의에 먼저 합의하려는 문제를, 정해진 통신 조건에서 질문과 답변을 비교하는 문제로 옮긴다.','무엇을 관찰할지 정한 질문',['question']),
      r('original-game','§1의 세 사람 게임','A남자·B여자·C심문자','처음의 게임은 성별을 구별하는 설정이다. A는 잘못 식별하도록, B는 심문자를 돕도록 행동한다. 이 원형을 곧바로 사람·기계 판별과 같다고 표시하지 않는다.','원형의 역할과 구별 과제',['original']),
      r('replace-a','A를 기계로 바꾸기','원형에서 A역할을 교체','§1은 A를 기계로 바꾸면 심문자의 잘못된 식별이 어떻게 달라질지를 묻는다. 여기서 B는 앞선 원형의 여자 역할을 유지한다.','원형에 이어 제기한 대체 질문',['original']),
      r('section5-human','§5 말미의 사람 B','A는 컴퓨터·B는 사람(man)','논문 후반에는 적절한 프로그램·기억 용량·속도를 갖춘 컴퓨터가 A역할을 맡고 B는 사람이 맡는 형식을 적는다. §1의 출발 설정과 구분해 읽는다.','같은 글 안에서 구분할 형식',['section5']),
      r('text-channel','몸 대신 글로 통신하다','C가 받는 X·Y의 답변','심문자가 상대의 모습·촉감·목소리에 기대지 않도록 글로 통신한다. 상대의 논문상 역할을 가리고 답변을 읽는 조건이 관찰 대상을 바꾼다.','질문과 문자 답변의 통신 경로',['channel']),
      r('question-scope','가능성과 관찰을 구분하다','정해진 질문과 답변','당시 모든 컴퓨터가 잘했다고 보고하는 실험은 아니다. 가능한 장치와 프로그램을 묻는 논의이며, 이 카드도 답변의 관찰과 의식에 관한 결론을 합치지 않는다.','근거가 말해 주는 범위',['machine','consciousness'])
    ]},
    {id:'dialogue',label:'02 답변으로 판단하기',title:'상대를 볼 수 없다면, 답변의 무엇을 근거로 삼을까?',intro:'아래는 직접 작성한 고정 대화입니다. 실제 사람이나 AI의 출력, 원문 대화의 복사 또는 실험 결과가 아닙니다.',initial:'ask',nodes:[
      r('ask','무엇을 물을지 고르다','계산·이유·일상 맥락','질문이 달라지면 드러나는 능력과 빈틈도 달라진다. 이 화면에서는 세 가지 질문을 직접 정해 관찰의 출발점을 비교한다.','이번에 관찰할 답변의 조건',['channel']),
      r('reply-x','X의 답변을 읽다','배역을 감춘 한 응답','답변에 어떤 설명과 전제가 있는지 읽는다. 문장의 말투 하나로 내부 구조나 출처를 확정하는 규칙은 제공하지 않는다.','아직 제한된 관찰',['channel','consciousness']),
      r('reply-y','같은 질문의 Y 답변','같은 조건의 또 다른 응답','두 답변이 어떤 정보를 사용하고 무엇을 생략했는지 비교할 수 있다. 이 사례의 문장은 모두 작성자가 미리 썼다.','비교해 읽을 두 응답',['channel']),
      r('judgment','판단 또는 유보를 남기다','지금까지 본 두 답변','X·Y 중 어느 배역을 기계로 볼지 선택하거나 판단을 유보한다. 선택을 저장하는 기능이지 기계의 지능이나 의식을 측정하는 점수가 아니다.','지금 관찰에서 내린 판단',['question','consciousness']),
      r('reveal','직접 정한 배역을 공개하다','판단 후 별도 공개','공개되는 것은 이 화면을 위해 붙인 기계·사람이라는 배역이다. 문장은 모두 같은 작성자가 만든 고정 자료라 실제 출처를 맞히는 실험이 아니다.','문장·배역·실제 출처의 구별',['channel','machine']),
      r('evidence-limit','답변 이상의 결론은 남겨 두다','정해진 입력과 짧은 관찰','짧은 대화에서의 식별, 다른 과제의 능력과 내부 경험은 서로 다른 주장이다. 이 화면은 합격·실패나 의식의 유무를 판정하지 않는다.','관찰 조건에 맞춘 해석',['consciousness','machine'])
    ]},
    {id:'learning',label:'03 성인 프로그램에서 배우는 기계로',title:'성인의 능력을 모두 적는 대신, 배울 수 있는 시작점을 만든다면?',intro:'§7은 기계를 판단하는 질문에서 기계를 어떻게 만들지의 문제로 넘어갑니다. 구조·교육·경험과 통신의 역할을 나누어 보세요.',initial:'child-structure',nodes:[
      r('adult-program','성인 능력을 직접 프로그램하다','완성된 성인의 여러 능력','필요한 능력을 처음부터 모두 프로그램에 넣으려는 부담을 생각한다. 논문은 더 빠른 길을 찾으며 아동 프로그램이라는 대안을 제기한다.','만드는 문제의 다른 출발점',['learning']),
      r('child-structure','아동 프로그램의 초기 구조','처음에 주는 기계의 구조','간단한 초기 구조를 만들고 교육해 보며 어떤 구조가 잘 배우는지 바꿔 보는 문제다. 완전히 구조 없는 백지나 현대 신경망의 특정 구조로 정하지 않는다.','교육과 함께 검토할 초기 프로그램',['learning']),
      r('education','교육 과정을 따로 설계하다','가르치는 절차와 주고받는 신호','아동 프로그램을 만드는 일과 교육 과정을 찾는 일을 나누되 서로 연결된 문제로 다룬다. 성인의 답변을 모두 미리 나열하는 대신 배울 경로를 설계한다.','행동을 형성하는 가르침',['learning']),
      r('experience','교육 밖의 경험도 구분하다','초기 상태·교육·다른 경험','논문은 성인의 상태에 이르는 요인을 세 부분으로 나눈다. 무엇을 처음부터 넣고 어떤 경험에서 변화하게 할지를 구분하는 질문이다.','시간을 거쳐 형성되는 능력',['learning']),
      r('reward-punishment','보상·벌 신호는 일부다','행동 뒤에 주는 피드백','반복될 행동의 경향을 바꾸는 신호를 논의하지만 감정이 있다고 전제하지 않는다. 이 신호만으로 모든 교육 정보를 전할 수 있다는 주장도 아니다.','피드백의 역할과 정보의 한계',['feedback']),
      r('language-instructions','언어로도 지시를 전하다','보상·벌 외의 통신 채널','별도의 채널로 언어 명령을 전하고 그 명령을 따르도록 배우게 할 가능성을 제안한다. 이 그림은 실제 학습 알고리즘이나 최신 LLM 학습을 재현하지 않는다.','가르침과 명령 전달의 연결',['feedback'])
    ]}
  ]);
  const variants=freeze([
    {id:'original',label:'§1 원형 · 세 사람',a:'A · 남자',b:'B · 여자',question:'C는 누가 남자이고 누가 여자인지 식별한다.',note:'A는 오인하도록, B는 C를 돕도록 행동하는 원형의 역할입니다.',sourceIds:['original']},
    {id:'replace-a',label:'§1 · A를 기계로',a:'A · 기계',b:'B · 여자',question:'A를 기계로 바꾸면, 원형과 비교해 잘못된 식별은 어떻게 달라질까?',note:'§1이 앞선 게임에 이어 제기한 질문입니다. B의 원래 역할을 유지해 표시합니다.',sourceIds:['original']},
    {id:'section5',label:'§5 말미 · B는 사람',a:'A · 컴퓨터',b:'B · 사람(man)',question:'적절한 프로그램을 준 컴퓨터가 A역할을 잘 수행할 수 있을까?',note:'인쇄 p.442의 별도 형식입니다. §1의 첫 설정과 한 도식으로 합치지 않습니다.',sourceIds:['section5']}
  ]);
  const topics=freeze([
    {id:'arithmetic',label:'계산 방법',question:'18×7은 얼마인가요?',followUpQuestion:'어떻게 구했고, 다른 방법으로 확인할 수 있을까요?'},
    {id:'reason',label:'이유를 묻기',question:'“도서관은 조용하니 언제나 공부가 잘된다”는 말에 동의하나요?',followUpQuestion:'그 주장을 확인하려면 어떤 조건을 더 물어보겠어요?'},
    {id:'context',label:'일상 맥락',question:'친구가 “오늘은 그냥 집에 있을래”라고 했어요. 어떻게 답할까요?',followUpQuestion:'친구가 “지금은 혼자 쉬고 싶어”라고 다시 말하면 어떻게 답할까요?'}
  ]);
  // These are wholly authored texts and assigned roles, never model/person outputs.
  // The public projection below omits unrevealed replies and all assigned roles.
  const scripts={
    arithmetic:{x:['126입니다.','20×7인 140에서 2×7인 14를 빼면 126이에요. 10×7과 8×7을 더해도 70+56=126으로 확인할 수 있어요.'],y:['126이에요.','18을 10과 8로 나누면 70과 56이 나와요. 두 값을 더해 126을 구하고, 7×(20−2)로도 확인하겠어요.'],machine:'X'},
    reason:{x:['언제나 그렇다고 하기에는 조건을 더 알아야 할 것 같아요.','조용해도 졸리거나 집중하기 어려울 수 있어요. 어떤 공부를 할 때, 누구에게 도움이 되었는지 먼저 묻겠어요.'],y:['도움이 될 수는 있지만 누구에게나 같지는 않겠어요.','공부의 종류와 사람에 따라 다를 수 있겠네요. 다른 장소와 실제로 비교해 보았는지도 물어보겠어요.'],machine:'Y'},
    context:{x:['쉬고 싶은 건지 마음에 걸리는 일이 있는지 먼저 물어볼 것 같아요.','혼자 쉬고 싶다는 말을 존중하겠어요. 나중에 이야기하고 싶거나 도움이 필요하면 연락해도 좋다고 말하겠어요.'],y:['알겠어, 쉬어도 괜찮아. 필요한 게 있으면 알려 달라고 답할 것 같아요.','지금은 연락을 줄이고 쉬게 두겠어요. 다음에 편할 때 이야기하자고 답하겠어요.'],machine:'X'}
  };
  const getView=id=>{const v=views.find(v=>v.id===id);if(!v)throw new RangeError('알려진 보기를 선택하세요.');return v;};
  const select=(viewId,id)=>{const n=getView(viewId).nodes.find(n=>n.id===id);if(!n)throw new RangeError('현재 보기의 항목을 선택하세요.');return n;};
  const getVariant=id=>{const v=variants.find(v=>v.id===id);if(!v)throw new RangeError('알려진 게임 구성을 선택하세요.');return v;};
  const getTopic=id=>{const t=topics.find(t=>t.id===id);if(!t)throw new RangeError('알려진 질문을 선택하세요.');return t;};
  function initialDialogue(caseId='arithmetic'){getTopic(caseId);return freeze({caseId,round:1,replies:0,judgment:null,revealed:false});}
  function readDialogue(state){if(!state||typeof state!=='object'||Array.isArray(state))throw new TypeError('대화 상태가 필요합니다.');getTopic(state.caseId);if(![1,2].includes(state.round)||![0,1,2].includes(state.replies)||![null,'X','Y','hold'].includes(state.judgment)||typeof state.revealed!=='boolean'||(state.judgment!==null&&state.replies!==2)||(state.revealed&&state.judgment===null))throw new TypeError('대화 공개 순서를 지켜야 합니다.');return {caseId:state.caseId,round:state.round,replies:state.replies,judgment:state.judgment,revealed:state.revealed};}
  function transition(state,action){const s=readDialogue(state);if(action==='reset')return initialDialogue(s.caseId);if(action==='follow-up'&&s.round===1&&s.replies===2&&!s.revealed)return freeze({...s,round:2,replies:0,judgment:null,revealed:false});if(action==='show-x'&&s.replies===0)return freeze({...s,replies:1});if(action==='show-y'&&s.replies===1)return freeze({...s,replies:2});if(['judge-X','judge-Y','hold'].includes(action)&&s.replies===2&&!s.revealed)return freeze({...s,judgment:action==='hold'?'hold':action.slice(6)});if(action==='reveal'&&s.replies===2&&s.judgment!==null&&!s.revealed)return freeze({...s,revealed:true});throw new RangeError('아직 할 수 없는 대화 동작입니다.');}
  function publicDialogue(state){const s=readDialogue(state),t=getTopic(s.caseId),script=scripts[s.caseId],i=s.round-1,result={...s,phase:s.revealed?'revealed':s.judgment!==null?'judged':s.replies===2?'both':s.replies===1?'x':'question',question:s.round===1?t.question:t.followUpQuestion,replyX:s.replies>=1?script.x[i]:null,replyY:s.replies>=2?script.y[i]:null,judgmentLabel:s.judgment===null?null:s.judgment==='hold'?'판단 유보':s.judgment+'가 기계라는 판단',canReveal:s.replies===2&&s.judgment!==null&&!s.revealed,canFollowUp:s.round===1&&s.replies===2&&!s.revealed,authored:true};if(s.round===2)result.previousRound={question:t.question,replyX:script.x[0],replyY:script.y[0]};if(s.revealed)result.assignedRoles={X:script.machine==='X'?'기계':'사람',Y:script.machine==='Y'?'기계':'사람'};return freeze(result);}
  const learningModes=freeze([
    {id:'adult',label:'성인 능력을 처음부터 직접 설계',title:'성인 능력 전체 → 프로그램에 직접 적기',steps:['목표로 삼은 성인의 능력','필요한 행동을 프로그램으로 설계','질문과 답변의 조건에서 관찰'],sourceIds:['learning']},
    {id:'child',label:'초기 구조를 교육하고 경험시키기',title:'초기 구조 + 교육 + 경험 → 형성되는 능력',steps:['아동 프로그램의 초기 구조','교육 과정과 다른 경험','배운 행동을 관찰하고 구조·교육을 다시 검토'],sourceIds:['learning','feedback']}
  ]);
  const getLearningMode=id=>{const m=learningModes.find(m=>m.id===id);if(!m)throw new RangeError('알려진 학습 구상을 선택하세요.');return m;};
  const bridges=freeze([
    {id:'turing1936',personId:'alan-turing',workId:'turing-computable-numbers',label:'1936 · 계산 절차를 정의한 기계'},
    {id:'turing1948',personId:'alan-turing',workId:'turing-intelligent-machinery',label:'1948 · 비조직 기계와 학습 구상'}
  ]);
  window.AtlasTuringImitationGame=freeze({sources,views,nodes:views.flatMap(v=>v.nodes),variants,topics,learningModes,bridges,getView,select,getVariant,getTopic,getLearningMode,initialDialogue,transition,publicDialogue});
})();
