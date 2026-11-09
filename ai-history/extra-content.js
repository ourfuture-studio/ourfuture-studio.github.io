/* Additional curated works. Educational examples are original explanations,
 * not historical quotations, experimental results, or reproductions. */
window.ATLAS_EXTRA_CONTENT={
  'turing-computable-numbers':{
    keyIdeas:[{title:'계산을 규칙으로 적는다',text:'테이프의 기호, 현재 상태, 읽고 쓰는 동작을 유한한 규칙표로 나타낸다. 복잡한 계산도 한 단계씩 기호를 바꾸는 과정으로 분석한다.'},{title:'기계의 설명도 입력이 된다',text:'규칙표를 기호열로 부호화하면 다른 기계가 그 설명을 읽고 동작을 모사할 수 있다. 이것이 보편 기계의 핵심이다.'}],
    theory:{text:'계산 절차를 정확히 적을 수 있다는 사실과 모든 수학적 판정 문제를 계산할 수 있다는 주장은 다르다. 논문은 기계의 기술과 계산 가능한 수를 분석하고, 결정 문제에 해결 절차가 없음을 논한다.'},
    example:{title:'규칙표를 읽는 작은 기계',text:'다음은 원문의 부호화법을 그대로 옮긴 예가 아니라, 보편 기계의 발상을 설명하는 예다.',steps:['프로그램 A를 “빈칸을 읽으면 1을 쓰고 멈춘다”라는 규칙표로 적는다.','기계 U에는 A의 규칙표와 빈 테이프의 설명을 함께 준다.','U는 A를 물리적으로 새로 만드는 대신 A의 한 단계를 읽고 모사한다.']},
    story:{kind:'연구 맥락',title:'논문 첫 장에 남은 두 날짜',text:'원문 첫 장에는 1936년 5월 28일 접수와 11월 12일 발표가 적혀 있다. 권호의 발행 연도와 연구가 제출된 시점을 구분해 읽을 수 있는 사례다.',source:{title:'Turing 원문 첫 장 · MIT 보관본',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf'}},
    videos:[],references:[{title:'On Computable Numbers · 원문',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf',location:'§§1–2 기계의 정의 · §6 보편 기계 · §§8, 11 판정의 한계. 원문 해당 절 확인.'}]
  },
  'turing-ace-proposal':{
    keyIdeas:[{title:'계산기보다 프로그램 가능한 장치',text:'ACE 제안은 여러 계산을 수행할 수 있도록 전자계산기의 구성과 명령을 설계하는 기록이다.'},{title:'설계와 구현의 시점을 구분',text:'1945년 작성된 제안, 1946년 제출, 이후 Pilot ACE의 동작은 서로 다른 사건이다.'}],
    example:{title:'장치를 바꾸는 대신 명령을 바꾼다',text:'동일한 계산 장치에 덧셈 절차와 반복 절차를 다르게 주면 다른 작업을 수행하게 만들 수 있다. 이 예시는 저장된 명령의 역할을 설명하며 ACE의 세부 명령 집합이나 성능을 재현하지 않는다.'},
    story:{kind:'기관의 공식 회고',title:'보고서와 나중의 컴퓨터',text:'NPL은 튜링의 ACE 보고서와 후속 Pilot ACE의 역사를 구분해 소개한다. 초기에 작성한 설계 제안을 완성된 컴퓨터의 사진과 같은 날짜로 읽지 않도록 주의한다.',source:{title:'NPL · Alan Turing과 ACE',url:'https://www.npl.co.uk/about-us/history/famous/alan-turing'}},
    videos:[],references:[{title:'Proposed Electronic Calculator · 출판사 기록',url:'https://academic.oup.com/book/32836/chapter-abstract/275289623',location:'서지·장 소개 및 NPL 회고 확인. 보고서 전체 회로·명령표의 본문 검증은 수행하지 않음.'}]
  },
  'turing-intelligent-machinery':{
    keyIdeas:[{title:'처음부터 완성된 지능을 넣어야 할까',text:'튜링은 기계의 구조를 만들고 교육과 변경을 통해 행동을 형성하는 방향을 검토했다.'},{title:'비조직 기계',text:'신경세포의 연결에서 착안한 unorganised machines를 논의했다. 현대의 역전파나 Transformer와 같은 알고리즘이라는 뜻은 아니다.'}],
    example:{title:'규칙을 직접 적기와 행동을 바꾸기',text:'미로의 모든 경로를 미리 적어 주는 방식과, 시도한 경로의 결과에 따라 다음 선택을 바꾸게 하는 방식을 비교해 보자. 보고서의 교육 발상을 이해하기 위한 대비이며 특정 학습 알고리즘의 재현은 아니다.'},
    story:{kind:'자료의 출판 맥락',title:'1948년에 작성됐지만 당시에는 미출판',text:'NPL 보고서의 작성 시점과 훗날 재수록된 출판 시점이 다르다. 아카이브의 초고와 후속 강연도 별개의 자료로 구분한다.',source:{title:'NPL · Intelligent Machinery 안내',url:'https://www.npl.co.uk/about-us/history/famous/alan-turing'}},
    videos:[],references:[{title:'Intelligent Machinery 초고 · AMT/C/11',url:'https://turingarchive.kings.cam.ac.uk/unpublished-manuscripts-and-drafts-amtc/amt-c-11',location:'공식 아카이브 설명·NPL 소개 확인. 초고 전체의 회로와 기계 유형별 성질은 여기서 재검증하지 않음.'}]
  },
  'turing-computing-machinery-intelligence':{
    keyIdeas:[{title:'질문을 관찰 가능한 행동으로 바꾼다',text:'“생각”의 정의에 바로 합의하려 하기보다, 모방 게임의 질문·답변과 판별을 통해 문제를 다룬다.'},{title:'논문의 끝에는 학습하는 기계가 있다',text:'제7절에서는 성인의 능력을 모두 직접 프로그램하기보다 아동 기계와 교육 과정을 고려한다. 대화 판별만이 논문의 전부는 아니다.'}],
    example:{title:'무엇을 측정했는지 먼저 적기',text:'가상의 평가자가 문자 대화만 보고 기계인지 판단하게 해 보자. 판별 성공률은 이 조건에서의 대화 행동에 관한 측정이다. 그 값만으로 의식의 존재나 모든 과제의 지능을 결론 낼 수는 없다.'},
    story:{kind:'원문 읽기 포인트',title:'유명한 첫 질문에서 마지막 절까지',text:'첫 절의 모방 게임과 제7절의 학습 기계를 함께 읽으면, 평가 문제와 기계를 만드는 문제를 나누어 볼 수 있다.',source:{title:'Turing 1950 · 원문 전사본',url:'https://www.psy.miami.edu/_assets/pdf/rpo-articles/turing-1950.pdf'}},
    videos:[],references:[{title:'Computing Machinery and Intelligence',url:'https://www.psy.miami.edu/_assets/pdf/rpo-articles/turing-1950.pdf',location:'§1 The Imitation Game · §7 Learning Machines. 본문 확인. 보관본 첫 장의 권호 표기는 출판사 서지와 대조할 것.'}]
  },
  'turing-morphogenesis':{
    keyIdeas:[{title:'반응과 확산을 함께 본다',text:'화학 물질이 서로 반응하고 공간으로 퍼지는 모형을 세운다. 확산을 넣었을 때 균일한 상태가 불안정해지는 조건을 분석한다.'},{title:'작은 차이에서 공간 무늬로',text:'적절한 조건에서는 작은 교란이 자라며 공간적 구조를 만들 수 있다. 모든 생물 무늬가 이 모형 하나로 설명된다는 뜻은 아니다.'}],
    theory:{text:'아래는 반응-확산 모형의 현대적인 표기다. 원문의 기호를 그대로 옮긴 식이 아니다.',formula:'∂u/∂t = f(u,v) + Dᵤ∇²u\n∂v/∂t = g(u,v) + Dᵥ∇²v'},
    example:{title:'같은 색으로 채운 고리에 작은 차이를 주면',text:'고리의 각 위치에 두 물질의 농도를 두고 반응과 확산을 반복한다고 상상하자. 안정성 조건에 따라 차이가 사라지거나 주기적 무늬로 자랄 수 있다. 실제 계산이나 생물학 실험 결과를 표시한 예시는 아니다.'},
    videos:[],references:[{title:'The Chemical Basis of Morphogenesis · 원문',url:'https://www.damtp.cam.ac.uk/user/gold/pdfs/teaching/old_literature/Turing1952.pdf',location:'요약·§1 및 반응-확산 모형의 안정성 논의. 원문 확인. AI 논문이 아닌 생물학적 수학 모형으로 분류.'}]
  },
  'mccarthy-lisp-1960':{
    keyIdeas:[{title:'프로그램이 기호식도 다룬다',text:'수치뿐 아니라 중첩된 기호식과 리스트를 계산 대상으로 삼는다. S-expression과 그 위의 함수를 정의한다.'},{title:'작은 정의로 큰 계산을 표현',text:'재귀적으로 함수를 정의하고, 표현된 함수를 해석하는 apply를 설명한다.'}],
    example:{title:'리스트의 첫 원소와 나머지',text:'교육용 리스트 (AI HISTORY ATLAS)를 생각해 보자. 첫 원소를 꺼내면 AI, 나머지는 (HISTORY ATLAS)다. 같은 연산을 반복하면 기호의 나열을 규칙적으로 처리할 수 있다. 구체적 Lisp 방언의 실행 예는 아니다.'},
    story:{kind:'저자의 설명',title:'상식 추론을 실험하기 위한 언어',text:'논문의 서론은 LISP를 Advice Taker 실험을 돕기 위해 개발한 시스템으로 소개한다. 언어의 발명과 완성된 상식 추론기의 구현을 구분해서 볼 지점이다.',source:{title:'McCarthy · Introduction',url:'https://www-formal.stanford.edu/jmc/recursive/node1.html'}},
    videos:[],references:[{title:'Recursive Functions of Symbolic Expressions',url:'https://www-formal.stanford.edu/jmc/recursive.html',location:'서론 및 S-expressions/S-functions 설명. 저자 공개 HTML 확인.'}]
  },
  'mccarthy-hayes-1969':{
    keyIdeas:[{title:'행동 뒤의 상태를 표현한다',text:'상황과 행동의 결과를 형식적으로 적으면, 어떤 전략이 목표에 도달하는지 추론할 수 있다.'},{title:'바뀌지 않는 사실도 필요하다',text:'행동 하나가 바꾸지 않는 사실을 매번 적으면 기술이 커진다. 이것이 논문에서 논의하는 프레임 문제다.'}],
    example:{title:'컵을 옮겨도 조명의 상태는?',text:'컵을 책상에서 선반으로 옮겼다는 사실만 적었다고 하자. 조명의 켜짐 상태는 유지되는가? 직관적으로 당연한 이 관계를 형식 체계에서는 어떤 규칙으로 보존할지 명시해야 한다.'},
    story:{kind:'원문의 예시',title:'전화번호를 찾아도 전화기는 남아 있다',text:'저자들은 전화번호부에서 번호를 찾은 뒤에도 그 사람이 전화를 가지고 있다는 가정이 필요했던 예를 들어, 변화하지 않는 사실을 기술하는 부담을 설명한다.',source:{title:'원문 · The Frame Problem',url:'https://www-formal.stanford.edu/jmc/mcchay69/node17.html'}},
    videos:[],references:[{title:'Some Philosophical Problems… · The Frame Problem',url:'https://www-formal.stanford.edu/jmc/mcchay69/node17.html',location:'프레임 문제 절 본문 확인. 모든 프레임 문제의 해결을 보고한 논문은 아님.'}]
  },
  'minsky-steps-1961':{
    keyIdeas:[{title:'답을 검사할 수 있어도 찾기는 어렵다',text:'가능한 답을 모두 시도하는 탐색은 원리상 단순해도 계산량이 커진다. 문제의 구조와 경험으로 탐색을 줄이는 방법을 검토한다.'},{title:'한 기법보다 여러 문제의 관계',text:'탐색·패턴인식·학습·계획·귀납을 나누고 서로 어떻게 연결되는지 설명한 종설이다.'}],
    example:{title:'미로를 전부 탐색할까, 방향을 안내할까',text:'모든 갈림길을 같은 순서로 시도하는 방법과 목표에 가까워 보이는 갈림길부터 시도하는 방법을 비교하자. 안내 기준이 나쁘면 오히려 우회할 수 있다. 탐색 횟수 감소가 항상 보장되는 것은 아니다.'},
    videos:[],references:[{title:'Steps Toward Artificial Intelligence · 원문',url:'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/steps.html',location:'Summary · Introduction · I. The Problem of Search. 본문 확인. 1960 접수와 1961 출판을 구분.'}]
  },
  'minsky-symbolic-connectionist-1990':{
    keyIdeas:[{title:'표현 방식마다 잘 다루는 문제가 다르다',text:'Minsky는 기호와 연결주의를 양자택일로 보는 관점을 비판한다. 서로 다른 표현과 절차를 함께 사용하는 방향을 논한다.'},{title:'연구 관점과 성능 증거는 다르다',text:'결합을 옹호하는 논설이다. 결합 모형 하나의 정확도나 일반적 우월성을 입증한 실험 보고로 소개하지 않는다.'}],
    example:{title:'글자를 읽고 규칙을 적용하는 두 단계',text:'신경망이 문서에서 날짜 후보를 읽고, 기호 규칙이 달력에 가능한 날짜인지 점검하는 시스템을 상상하자. 두 단계의 연결을 설명하기 위한 새 예시이며 Minsky가 구현한 시스템은 아니다.'},
    videos:[],references:[{title:'Symbolic vs. Connectionist · 저자 원문',url:'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/SymbolicVs.Connectionist.html',location:'기호·연결주의 대립과 여러 표현의 결합을 논의하는 본문. 특정 성능 수치를 가져오지 않음.'}]
  },
  'hinton-deep-belief-2006':{
    keyIdeas:[{title:'한 층씩 초기화를 만든다',text:'깊은 생성 모형을 한꺼번에 학습하는 어려움에 대응해, 층별로 탐욕적으로 학습한 결과를 다음 층의 입력 표현으로 사용한다.'},{title:'초기화 뒤에는 전체 조정',text:'빠른 층별 절차와 이후의 wake-sleep 계열 미세 조정은 서로 다른 단계다. 최상위 두 층은 무방향 연관 기억을 이룬다.'}],
    example:{title:'숫자 그림의 여러 표현',text:'픽셀에서 첫 잠재표현을 얻고 그 표현을 다시 상위 층이 모델링한다고 생각하자. 층을 쌓는 순서와 전체를 함께 조정하는 단계를 나눠 보면 학습 절차를 이해하기 쉽다. 특정 뉴런의 의미를 사람이 미리 정해 주는 예는 아니다.'},
    videos:[],references:[{title:'A Fast Learning Algorithm for Deep Belief Nets',url:'https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf',location:'p.1 초록·Introduction · Figure 1 모형 구성. 저자 원고 본문 확인.'}]
  },
  'hinton-deep-learning-review-2015':{
    keyIdeas:[{title:'표현도 데이터에서 학습한다',text:'사람이 특징을 모두 설계하는 대신 여러 층의 변환으로 과제에 필요한 표현을 학습하는 접근을 정리한다.'},{title:'여러 모형을 연결해 읽는 종설',text:'역전파, 합성곱망, 순환망 등의 관계와 사용 영역을 설명한다. 세 저자가 그해 모든 방법을 새로 발명한 논문이 아니다.'}],
    example:{title:'픽셀에서 과제에 필요한 표현까지',text:'이미지의 작은 경계 패턴에서 더 큰 형태로 표현이 변하는 과정을 상상하자. 이는 이해를 돕는 설명이며 실제 모든 층과 뉴런이 사람의 개념에 일대일로 대응한다는 뜻은 아니다.'},
    videos:[],references:[{title:'Deep Learning · LeCun, Bengio, Hinton',url:'https://www.cs.utoronto.ca/~hinton/absps/NatureDeepReview.pdf',location:'p.436 도입부·표현 학습 설명 및 Figure 1. 저자 공개 Nature 본문 확인.'}]
  },
  'lecun-handwritten-1989':{
    keyIdeas:[{title:'입력은 분리·정규화된 숫자 이미지',text:'논문은 우편번호의 손글씨 숫자를 인식하는 과제를 다룬다. 임의 문서 전체를 그대로 이해하는 범용 모형은 아니다.'},{title:'과제에 맞는 구조를 둔다',text:'적은 전처리와 함께, 과제에 맞게 강하게 제약한 신경망 구조를 사용했다고 초록에 설명한다.'}],
    example:{title:'숫자 인식과 문서 이해의 차이',text:'잘라 놓은 숫자 8을 분류하는 일과, 봉투 전체에서 주소를 찾고 읽는 일은 다르다. 분류기에 주는 입력의 전처리·분리 조건을 확인해야 성능이 의미하는 범위를 알 수 있다.'},
    videos:[],references:[{title:'Handwritten Digit Recognition with a Back-Propagation Network',url:'https://proceedings.neurips.cc/paper/1989/hash/53c3bce66e43be4f209556518c2fcb54-Abstract.html',location:'공식 학회 서지·초록 확인. 세부 구조·실험표는 이번 확장에서 본문 재검증하지 않음.'}]
  },
  'garcez-cognitive-reasoning-2008':{
    keyIdeas:[{title:'학습과 추론을 함께 다룬다',text:'경험으로 배우는 신경망과 논리적 표현의 연결을 정리한 공동저서다.'},{title:'하나의 명제 논리에 머무르지 않는다',text:'출판사 소개와 목차에는 양상·시간·인식 논리 등 여러 논리 표현을 신경 모형과 연결하는 내용이 포함된다.'}],
    example:{title:'지금 참인 사실과 나중에도 참일 사실',text:'“문이 열려 있다”와 “스위치를 누르면 다음 단계에 문이 열린다”는 서로 다른 형태의 지식이다. 사실과 시간 관계를 어떻게 표현할지 비교하기 위한 예이며 책의 구현 결과가 아니다.'},
    videos:[],references:[{title:'Neural-Symbolic Cognitive Reasoning · 출판사 소개·목차',url:'https://link.springer.com/book/10.1007/978-3-540-73246-4',location:'서지·About this book·목차 확인. 2008 초판 발행/©2009 구분. 책 전체 본문이나 결과를 검증하지 않음.'}]
  }
};
