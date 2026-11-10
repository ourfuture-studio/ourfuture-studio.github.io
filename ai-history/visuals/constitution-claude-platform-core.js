/* A source-bound map of Constitutional AI, Claude, and the organization around them. */
(function () {
  'use strict';
  const freeze = value => {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  };
  const sources = {
    paper: {title:'Bai 외 (2022) · Constitutional AI 원논문',url:'https://arxiv.org/pdf/2212.08073v1',location:'Fig.1, §1.2, §3.1–3.2, §4.1–4.2. 비평·수정과 SL, AI 무해성 선호와 인간 유용성 선호를 결합한 PM·RL. Fig.1에서 생략된 인간 유용성 자료는 본문에 근거해 별도 표시'},
    contribution: {title:'Bai 외 (2022) · 연구 기여문',url:'https://arxiv.org/html/2212.08073v1#S7',location:'§7 Contribution Statement. Bai·Kaplan의 실험·아이디어·집필, Amodei·McCandlish의 RL 인프라 개발 리드 등 역할을 구분'},
    founding: {title:'Anthropic · 2021년 조직과 초기 자금 발표',url:'https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems',location:'2021-05-28. 당시 Dario CEO·Daniela President와 연구 조직의 출발을 소개한 회사 발표'},
    launch: {title:'Anthropic · Introducing Claude',url:'https://www.anthropic.com/news/introducing-claude',location:'2023-03-14. 도움이 되고 정직하며 해를 줄이는 AI 연구를 Claude 대화 화면·API로 연결한 초기 제품 발표'},
    oldConstitution: {title:'Anthropic · Claude’s Constitution (2023)',url:'https://www.anthropic.com/news/claudes-constitution',location:'2023-05-09 원문. 2022 연구와 구별한 당시 Claude의 원칙 공개·한 원칙을 선택하는 비평/비교의 설명. 이후 상단 업데이트 날짜와 원문 시점을 구분'},
    newConstitution: {title:'Anthropic · Claude’s new constitution',url:'https://www.anthropic.com/news/claude-new-constitution',location:'2026-01-22 게시. What is Claude’s Constitution? / Our new approach. 원칙의 이유·맥락, 여러 학습 단계와 합성 자료의 이용; 이상과 실제 행동의 차이도 명시'},
    constitution: {title:'Anthropic · Claude’s Constitution 전체 문서',url:'https://www.anthropic.com/constitution',location:'현행 문서 조회 2026-11-11. 서문·접근법·기여문: Amanda Askell 주저자, 여러 사람과 Claude 모델의 기여. 의도한 가치와 행동이 항상 구현된다는 보장이 아님'},
    leadership: {title:'Anthropic · Leadership',url:'https://www.anthropic.com/company/leadership',location:'현행 공식 소개 조회 2026-11-11. Dario·Daniela의 공동설립과 회사 역할; Jared Kaplan의 공동설립·과학 역할. 2021년 기록의 직함과 구분'},
    aws: {title:'Anthropic · AWS Trainium 협력 발표',url:'https://www.anthropic.com/news/anthropic-amazon-trainium',location:'2024-11-22. AWS를 primary cloud/training partner로 발표; Trainium·Neuron 협업과 Bedrock의 Claude 제공. 소수지분 투자·계산·서비스의 역할을 구분'},
    google: {title:'Anthropic · Google Cloud TPU 이용 확대 발표',url:'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services',location:'2025-10-23. Google TPU·Amazon Trainium·NVIDIA GPU의 세 플랫폼을 명시. 이용 확대 계획과 당시의 기반 설명을 현재 가동 수치로 옮기지 않음'},
    api: {title:'Claude Platform · API overview',url:'https://platform.claude.com/docs/en/api/overview',location:'현행 공식 문서 조회 2026-11-11. Claude 모델에 대한 프로그램 인터페이스. 모델 학습의 과정과 모델을 이용하는 API 요청을 구분'}
  };
  const n=(id,label,short,icon,type,input,role,output,sourceIds)=>({id,label,short,icon,type,input,role,output,sourceIds});
  const nodes = [
    n('human-principles','사람이 정한 원칙','원하는 행동의 기준을 적기','document','사람이 선택하는 감독의 기준','해를 줄이며 도움을 주기 위해 정한 자연어 원칙','어떤 행동을 바라는지 짧은 원칙으로 명시하고, 비평과 응답 비교에 그 기준을 제공한다. 2022 연구에서는 원칙을 선택해 사용하며 원칙 전체를 매번 동시에 적용하는 고정 논리 검사기로 제시하지 않았다.','모델에 제공할 비평·비교의 기준',['paper','oldConstitution']),
    n('critiques','응답을 비평하기','초기 응답을 원칙에 비추어 보기','search','SL 단계 · 학습 자료를 만들기','도움 중심으로 학습한 초기 모델의 응답과 선택한 원칙','모델이 자신의 초기 응답에서 원칙에 어긋나는 부분을 짚도록 한다. 이때 쓰는 질문과 비평 지시는 학습 자료를 만드는 과정의 입력이며, 서비스의 모든 답변에서 같은 절차가 실행된다는 설명이 아니다.','수정에 이용할 비평',['paper']),
    n('revisions','응답을 수정하기','비평을 바탕으로 더 나은 사례 만들기','edit','SL 단계 · 수정된 응답','초기 응답·비평·수정 지시','원칙에 맞게 고친 응답을 생성한다. 이 과정으로 얻은 문장이 다음 지도학습의 자료가 된다. 문장 하나를 고친 것과 모델의 가중치를 실제로 학습시킨 것을 구분한다.','지도학습에 사용할 수정 응답',['paper']),
    n('supervised-update','수정 사례로 지도학습','반복할 행동을 가중치에 반영','model','SL 단계 · 모델을 학습하기','수정된 응답과 유용성을 유지하기 위한 자료','원논문은 사전학습 언어모델을 수정 응답과 유용성 자료로 미세조정했다. 새 질문에서도 그런 행동을 하도록 가중치를 배우는 과정이며, 수정 글을 문맥에 넣는 것에서 끝나는 과정이 아니다.','SL-CAI 모델',['paper']),
    n('ai-comparison','AI가 응답쌍 비교','원칙에 더 맞는 쪽의 선호 만들기','compare','RL 단계 · 무해성 선호 자료','SL-CAI가 만든 두 응답과 비교할 원칙','피드백 모델에 두 응답 중 원칙에 더 맞는 쪽을 비교하게 한다. 원논문의 AI 피드백은 무해성 선호를 만든다. 아래 사례의 선택 설명은 이 역할을 보여 주기 위해 직접 작성한 것이며 실제 모델의 판단은 아니다.','AI가 만든 무해성 선호 자료',['paper']),
    n('human-helpfulness','인간의 유용성 판단','도움이 되는 정도의 피드백은 유지','people','RL 단계 · 인간 피드백도 남아 있다','사람이 비교한 유용성 선호 자료','원논문은 무해성 비교를 AI 피드백으로 바꾸면서도 유용성에 관한 인간 피드백을 사용했다. 원칙을 쓰면 인간의 판단과 자료가 모두 사라진다는 뜻이 아니다.','사람이 만든 유용성 선호 자료',['paper']),
    n('preference-model','선호모형을 학습','두 종류의 선호를 보상 신호로','score','RL 단계 · 선호를 학습한 모델','AI의 무해성 선호와 인간의 유용성 선호','이 자료로 선호모형(PM)을 학습하고, 정책이 만든 응답에 보상 신호를 제공하도록 한다. 원칙에 관한 모델의 해석이 신호에 들어가므로 논리적으로 옳음을 판정하는 증명기와는 다른 역할이다.','강화학습에서 사용할 보상 신호',['paper']),
    n('reinforcement-update','보상으로 행동을 조정','SL-CAI에서 RL-CAI로','model','RL 단계 · 가중치 갱신','SL-CAI 초기 정책과 선호모형의 보상','선호모형의 보상을 이용해 정책을 강화학습한다. 원칙에 더 맞는 응답을 만드는 행동을 가중치에 반영하려는 발상이다. 이 화면에서는 실제 최적화나 Claude 학습을 실행하지 않는다.','RL-CAI 모델',['paper']),
    n('constitution-goals','원칙과 이유의 문서','어떤 판단을 바라는지 설명하기','document','2026년 문서의 역할','Anthropic이 Claude에 바라는 가치·행동과 그 이유','2026년 발표는 독립된 원칙 목록에서 이유와 맥락을 설명하는 문서로 접근이 바뀌었다고 밝힌다. 새로운 상황에서 판단을 일반화하도록 의도를 전달하려는 회사의 접근이며, 문서만으로 그 행동이 보장되는 것은 아니다.','학습과 자료 제작에 이용할 의도',['newConstitution','constitution']),
    n('synthetic-data','모델로 학습 자료 만들기','이해·대화·응답·비교 사례로','data','원칙을 학습 신호로 옮기는 경로','원칙 문서와 그 문서가 관련되는 상황','2026년 발표는 Claude가 문서 이해, 관련 대화, 가치에 맞는 응답과 응답 순위 등 여러 합성 학습 자료를 만드는 데 쓰인다고 설명한다. 원칙의 글을 그대로 읽는 일과 그 글에서 학습할 사례를 만드는 일을 잇는 지점이다.','향후 모델 학습에 이용할 자료',['newConstitution']),
    n('prepared-claude','학습된 Claude 모델','배운 행동을 새 문맥에 적용','model','학습 결과와 서비스의 접점','학습으로 조정한 모델','Constitutional AI는 Claude를 만든 연구 흐름 중 하나다. 2023년 제품 발표와 이후의 헌법 문서는 시점과 범위가 다르다. 2022년 실험의 전체 설정을 현재 Claude의 내부 설계도라고 제시하지 않는다.','질문에 응답할 때 이용하는 모델',['launch','newConstitution']),
    n('request-context','이번 요청의 문맥','질문·지시·대화를 전달하기','text','서비스에서 달라지는 입력','사용자의 질문과 응용 프로그램이 제공한 문맥','서비스는 모델에 입력을 제공하고 응답을 받는다. 입력 문맥을 바꾸는 일은 이 그림에서 설명하는 학습 자료 제작이나 가중치 갱신과 구분된다. 도구와 제품별 설정 전체를 초기 Claude의 기능으로 소급하지 않는다.','응답에서 참고할 입력',['api','launch']),
    n('claude-response','대화·API의 응답','사람과 프로그램이 이용하는 접점','app','제품으로 이어지는 경로','학습된 모델과 현재 요청','2023년 Claude 발표는 대화 화면과 API 접근을 함께 소개했다. 사람은 대화를 하고 개발자는 응용 프로그램에 모델을 연결한다. 준비된 모델을 사용하는 응답 경로와 모델을 새로 학습하는 경로를 나누어 읽는다.','사용자나 응용 프로그램에 전달되는 출력',['launch','api']),
    n('evaluation-disclosure','의도와 실제 행동의 확인','문서와 평가 결과를 함께 읽기','search','의도와 관찰의 경계','바라는 행동의 문서와 모델의 실제 행동','2026년 발표는 헌법의 이상과 실제 출력이 어긋날 수 있으며 시스템카드 등으로 그 차이를 공개하겠다고 설명한다. 의도한 목표를 적은 문서와 평가로 확인한 결과는 같은 종류의 근거가 아니다.','모델을 검토할 때 확인할 공개 정보',['newConstitution','constitution']),
    n('dario','다리오 아모데이','회사 역할과 RL 인프라의 연구 기여','person','인물의 기업·연구 역할','Anthropic 공동설립·경영과 논문의 기여문','2021년 회사 발표는 Dario를 CEO로 소개한다. 2022년 논문은 Sam McCandlish와 함께 RL 인프라 개발을 이끈 역할을 명시한다. 헌법의 모든 문구·모델·실험을 혼자 만든 것으로 합치지 않는다.','기존 인물 카드의 연구·기업 기록',['founding','leadership','contribution']),
    n('daniela','다니엘라 아모데이','공동설립과 회사 운영의 역할','person','공동설립·조직 운영','Anthropic의 공동설립과 회사 운영','2021년 발표는 Daniela를 President로 소개하며 현행 공식 소개는 공동설립 역할을 확인해 준다. 연구 논문의 모델 기여와 회사 운영은 관련되지만 같은 역할은 아니다. 인물 카드가 없는 항목은 공식 소개로 연결한다.','공식 회사 소개에서 읽을 조직 역할',['founding','leadership']),
    n('anthropic','Anthropic','연구·학습 기반·제품을 잇는 조직','company','회사의 역할','연구자·학습 시스템·제품과 협력사','Anthropic은 Constitutional AI 연구와 Claude 제품을 공개했다. 연구 기여, 원칙을 정하는 일, 계산 기반과 서비스를 운영하는 일을 여러 사람과 팀이 맡는다.','Claude 연구와 서비스의 조직',['founding','launch','contribution']),
    n('amanda','아만다 아스켈','2026년 헌법 문서의 주저자','person','문서와 성격 연구의 기여','여러 참여자가 만든 Claude의 헌법 문서','현행 헌법의 기여문은 Amanda Askell을 주저자로 명시하고 여러 사람과 Claude 모델의 기여를 함께 적는다. 이 연결은 문서 집필의 역할이며 Claude 모델 전체의 단독 발명자라는 뜻이 아니다.','헌법 문서에서 확인할 집필 기여',['constitution','contribution']),
    n('claude-company','Claude','연구팀의 모델과 대화·API 제품','model','연구 결과를 제공하는 제품','학습된 모델과 서비스를 만드는 팀','2023년 공개한 Claude와 이후의 원칙 문서를 시간에 따라 읽는다. 제품의 제공과 문서의 집필, 모델 연구와 평가를 각각의 출처에서 확인한다.','대화와 응용 프로그램에서 이용할 모델',['launch','newConstitution']),
    n('aws','Amazon · AWS','학습 기반과 클라우드 제공의 협력','cloud','날짜가 있는 기업·계산 관계','Trainium·Neuron·클라우드와 서비스 기반','2024년 발표는 AWS를 주요 클라우드·학습 파트너로 소개하고 Trainium·Neuron 협업 및 Bedrock을 통한 Claude 제공을 설명했다. 투자, 학습 기반과 서비스 제공의 역할을 개인의 모델 발명과 구분한다.','2024년 발표로 확인한 기반과 제공 경로',['aws']),
    n('google-cloud','Google Cloud','TPU 이용 확대의 기업 관계','cloud','날짜가 있는 계산 기반의 관계','Google Cloud의 TPU와 서비스','2025년 10월 발표는 Google Cloud 기술 이용을 확대할 계획을 밝혔다. 계획한 용량을 현재 가동 규모로 바꾸지 않고, 클라우드·칩 이용 관계로 연결한다.','2025년 발표에서 확인할 계산 기반',['google']),
    n('nvidia','NVIDIA','세 계산 플랫폼 중 GPU 이용','company','계산 플랫폼의 연결','NVIDIA GPU의 계산 기반','2025년 Google Cloud 발표는 Anthropic의 계산 전략에 Google TPU·Amazon Trainium·NVIDIA GPU를 함께 명시했다. 이 근거에서 확인할 범위는 GPU 이용이다. 젠슨 황의 기존 CUDA 카드에서 계산 기반의 아이디어를 이어 읽을 수 있다.','기업·인프라 탭의 NVIDIA·CUDA 기록',['google'])
  ];
  const e=(id,from,to,label,kind,sourceIds)=>({id,from,to,label,kind,sourceIds});
  const edges=[
    e('principles-critique','human-principles','critiques','비평의 기준','principle',['paper']),
    e('critique-revise','critiques','revisions','비평을 참고','training',['paper']),
    e('revisions-sl','revisions','supervised-update','수정된 응답으로 학습','training',['paper']),
    e('sl-compare','supervised-update','ai-comparison','학습된 모델의 응답쌍','training',['paper']),
    e('principles-compare','human-principles','ai-comparison','비교의 기준','principle',['paper']),
    e('ai-pm','ai-comparison','preference-model','AI의 무해성 선호','training',['paper']),
    e('human-pm','human-helpfulness','preference-model','인간의 유용성 선호','human',['paper']),
    e('pm-rl','preference-model','reinforcement-update','보상 신호','training',['paper']),
    e('sl-rl','supervised-update','reinforcement-update','초기 정책','training',['paper']),
    e('goals-data','constitution-goals','synthetic-data','의도에 맞는 자료 만들기','concept',['newConstitution']),
    e('data-claude','synthetic-data','prepared-claude','학습에 이용할 자료','concept',['newConstitution']),
    e('model-response','prepared-claude','claude-response','학습된 모델 이용','concept',['launch','api']),
    e('context-response','request-context','claude-response','이번 입력의 문맥','concept',['api']),
    e('model-evaluation','prepared-claude','evaluation-disclosure','행동과 목표의 차이 확인','disclosure',['newConstitution']),
    e('dario-anthropic','dario','anthropic','공동설립·경영','organization',['founding','leadership']),
    e('daniela-anthropic','daniela','anthropic','공동설립·운영','organization',['founding','leadership']),
    e('anthropic-claude','anthropic','claude-company','모델 개발·제품 제공','organization',['launch']),
    e('amanda-constitution','amanda','claude-company','2026년 헌법 문서 집필','contribution',['constitution']),
    e('aws-anthropic','aws','anthropic','2024년 학습·클라우드 협력','dated',['aws']),
    e('google-anthropic','google-cloud','anthropic','2025년 TPU 이용 확대 발표','dated',['google']),
    e('nvidia-anthropic','nvidia','anthropic','2025년 GPU 이용 명시','dated',['google'])
  ];
  const views=[
    {id:'cai',label:'01 원칙으로 학습 신호 만들기',title:'판단의 기준을 적고, 그 기준으로 만든 사례와 선호를 배우다',intro:'2022년 원논문의 Fig.1과 본문을 연결합니다. 위쪽은 비평·수정 사례로 지도학습하는 단계, 아래쪽은 AI와 사람의 선호를 보상 신호로 바꾸어 강화학습하는 단계입니다.',initial:'human-principles',nodeIds:['human-principles','critiques','revisions','supervised-update','ai-comparison','human-helpfulness','preference-model','reinforcement-update'],edgeIds:['principles-critique','critique-revise','revisions-sl','sl-compare','principles-compare','ai-pm','human-pm','pm-rl','sl-rl'],height:500,positions:{'human-principles':[80,200],critiques:[285,90],revisions:[485,90],'supervised-update':[725,90],'ai-comparison':[285,315],'human-helpfulness':[485,420],'preference-model':[485,315],'reinforcement-update':[725,315]},scope:'원논문 Fig.1의 흐름을 다시 그린 개념도이며 §1.2·§4.1의 인간 유용성 피드백을 별도 가지로 표시했습니다. 아래 비평·수정·비교는 직접 작성한 사례입니다. 실제 모델 생성·선호 점수·가중치 갱신을 실행하지 않습니다.'},
    {id:'claude',label:'02 Claude의 학습과 서비스로',title:'원칙의 문서에서 학습 자료로, 배운 행동에서 새로운 응답으로',intro:'2023년 Claude 공개와 2026년 새 헌법 설명을 날짜별로 구분해 연결합니다. 학습에 쓰는 자료, 서비스 요청의 문맥, 실제 행동을 확인할 평가는 서로 다른 역할입니다.',initial:'synthetic-data',nodeIds:['constitution-goals','synthetic-data','prepared-claude','request-context','claude-response','evaluation-disclosure'],edgeIds:['goals-data','data-claude','model-response','context-response','model-evaluation'],height:370,positions:{'constitution-goals':[100,80],'synthetic-data':[355,80],'prepared-claude':[610,80],'request-context':[355,265],'claude-response':[835,80],'evaluation-disclosure':[610,265]},scope:'2022년 실험을 현재 Claude의 전체 학습 설계도로 제시하지 않습니다. 2026년 문서는 의도와 접근을 설명하며 행동의 보장은 아닙니다. 요청 문맥을 전달하는 일과 모델을 학습하는 일을 구분합니다.'},
    {id:'connections',label:'03 인물·기업·계산 기반 연결',title:'연구를 만드는 사람, 원칙을 쓰는 사람, 모델을 운영하는 기반',intro:'조직 역할은 실선, 날짜가 있는 계산 기반의 관계는 점선으로 연결합니다. 문서 집필과 모델 개발을 구분하며 기존 인물 카드는 각각의 연구·기업 맥락으로 이어집니다.',initial:'anthropic',nodeIds:['dario','daniela','anthropic','amanda','claude-company','aws','google-cloud','nvidia'],edgeIds:['dario-anthropic','daniela-anthropic','anthropic-claude','amanda-constitution','aws-anthropic','google-anthropic','nvidia-anthropic'],height:440,positions:{dario:[90,70],daniela:[90,330],anthropic:[315,180],amanda:[790,345],'claude-company':[790,180],aws:[550,65],'google-cloud':[550,345],nvidia:[315,345]},scope:'회사·문서·계산 기반의 관계를 개인 간 지도 관계나 공동 모델 발명으로 바꾸지 않습니다. 다니엘라·아만다는 공식 소개로, 기존 연구 인물은 전체 인물로, 다리오·젠슨 황은 기업·인프라 탭으로 연결합니다.'}
  ];
  const milestones=[
    {date:'2022.12.15',title:'Constitutional AI 연구',text:'비평·수정의 지도학습과 선호모형을 이용한 RLAIF',sourceId:'paper'},
    {date:'2023.03.14',title:'Claude 제품 공개',text:'연구의 흐름을 대화 화면과 API로 제공',sourceId:'launch'},
    {date:'2026.01.22',title:'이유와 맥락을 설명하는 헌법',text:'새 문서와 여러 종류의 합성 학습 자료를 설명',sourceId:'newConstitution'}
  ];
  const exampleBase={request:'“동료가 보고서 자료를 아직 안 줬어. 오늘 끝내려면 뭐라고 보내?”',draft:'“그 사람은 게으르네. 무조건 오늘 6시까지 보낼 거야. 단체방에 이름을 올려 압박해.”'};
  const principles={
    honesty:{id:'honesty',label:'확인한 사실과 추측 구분',criterion:'상대의 사정이나 자료 전달 시간을 확인하지 않고 단정하지 않는다.',critique:'응답은 동료의 성격과 오늘 6시라는 시간을 근거 없이 단정한다. 확인한 사실인 ‘자료가 아직 오지 않았다’와 앞으로 물어볼 내용을 나누어야 한다.',revision:'“자료가 아직 도착하지 않아 보고서를 마무리하기 어렵습니다. 오늘 마감에 맞추려면 언제 전달 가능한지 알려주실 수 있을까요?”처럼 현재 상황과 확인할 일정을 구체적으로 물어보세요.',alternative:'“그 사람은 분명 일부러 늦추고 있어. 6시까지 준다고 생각하고 진행해.”',comparison:'수정한 쪽은 모르는 동기·시간을 확실한 사실처럼 말하지 않고 확인할 질문을 제안한다. 이 이유 때문에 여기서는 수정한 응답을 선호하는 비교 설명을 직접 작성했다.'},
    respect:{id:'respect',label:'상대를 존중하며 표현',criterion:'사람을 평가하거나 모욕하기보다 필요한 행동과 상황을 구체적으로 말한다.',critique:'‘게으르다’는 사람에 대한 비난으로 대화를 시작한다. 자료가 필요한 이유와 요청할 행동을 설명하면 상대를 모욕하지 않으면서도 일을 진행할 수 있다.',revision:'“보고서 마감 때문에 자료가 필요합니다. 아직 받지 못한 항목을 확인하고, 전달 가능한 시간을 함께 정할 수 있을까요?”처럼 비난 대신 필요한 행동을 요청해 보세요.',alternative:'“왜 이렇게 게을러요? 남들 일까지 막으니 당장 보내세요.”',comparison:'수정한 쪽은 상대를 비하하는 말을 줄이면서 무엇이 필요한지 전달한다. 여기의 비교는 존중이라는 기준을 적용한 자체 사례이며 실제 AI의 선호 판단이 아니다.'},
    reduceHarm:{id:'reduceHarm',label:'해를 줄이면서 도움 제공',criterion:'불필요한 피해를 만들 행동 대신 문제를 풀 수 있는 구체적인 대안을 제시한다.',critique:'단체방에서 이름을 올려 압박하라는 제안은 공개적인 망신과 갈등을 만들 수 있다. 필요한 자료·마감·대안을 개인적으로 확인하는 경로를 제안할 수 있다.',revision:'먼저 개인 메시지로 필요한 항목과 마감을 알려 주세요. 전달이 어렵다면 대체 자료나 일정 조정을 상의하고, 계속 막힐 경우에는 사람을 비난하기보다 진행 상황을 담당자와 공유해 보세요.',alternative:'“단체방에서 이름을 공개하고 모두가 보는 앞에서 몰아붙이세요.”',comparison:'수정한 쪽은 공개적 망신을 권하기보다 자료 확보와 일정 조정을 도울 대안을 제안한다. 이 화면은 원칙을 학습 신호로 옮기는 역할을 설명하며 특정 행동의 결과를 실험한 것은 아니다.'}
  };
  const byId=new Map(nodes.map(item=>[item.id,item]));
  const edgeById=new Map(edges.map(item=>[item.id,item]));
  for(const item of [...nodes,...edges])if(!item.sourceIds.length||item.sourceIds.some(id=>!sources[id]))throw new TypeError('Every claim needs an official source.');
  if(byId.size!==nodes.length||edgeById.size!==edges.length)throw new TypeError('IDs must be unique.');
  for(const item of edges)if(!byId.has(item.from)||!byId.has(item.to)||item.from===item.to)throw new TypeError('Connections need distinct, valid endpoints.');
  for(const view of views)if(!view.nodeIds.includes(view.initial)||view.nodeIds.some(id=>!byId.has(id)||!view.positions[id])||view.edgeIds.some(id=>!edgeById.has(id)||![edgeById.get(id).from,edgeById.get(id).to].every(n=>view.nodeIds.includes(n))))throw new TypeError('Views need visible sourced roles.');
  function getView(id){const view=views.find(v=>v.id===id);if(!view)throw new RangeError('Unknown constitution view.');return freeze({...view,nodes:view.nodeIds.map(id=>byId.get(id)),edges:view.edgeIds.map(id=>edgeById.get(id))});}
  function select(viewId,nodeId){const view=getView(viewId),index=view.nodeIds.indexOf(nodeId);if(index<0)throw new RangeError('Choose a visible role.');return freeze({viewId,index,node:view.nodes[index],connections:view.edges.filter(e=>e.from===nodeId||e.to===nodeId),hasPrevious:index>0,hasNext:index<view.nodes.length-1});}
  function step(viewId,nodeId,direction){if(direction!==1&&direction!==-1)throw new RangeError('Step one role at a time.');const current=select(viewId,nodeId),view=getView(viewId);return select(viewId,view.nodeIds[Math.max(0,Math.min(view.nodeIds.length-1,current.index+direction))]);}
  function example(id){if(!Object.hasOwn(principles,id))throw new RangeError('Unknown authored principle.');return freeze({...exampleBase,...principles[id],executesModel:false,weightsUpdated:false,scope:'기준·비평·수정·비교를 직접 작성한 사례입니다. 원논문의 문구·실험 응답이나 실제 Claude의 출력·선호 점수가 아니며, 원칙의 문서에서 학습할 사례를 만드는 관계를 설명합니다.'});}
  window.AtlasConstitutionClaudePlatform=freeze({sources,nodes,edges,views,milestones,principleIds:Object.keys(principles),getView,select,step,example});
})();
