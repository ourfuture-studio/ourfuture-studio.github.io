/* Robinson1965: machine-oriented inference, preserved seminar views and computed original Example2. */
(function(){
  'use strict';
  const paper='https://web.stanford.edu/class/linguist289/robinson65.pdf';
  const doi='https://doi.org/10.1145/321250.321253';
  const bibliography='https://projects.csail.mit.edu/jacm/References/robinson1965:23.html';
  const source=(page,title)=>({title:'Robinson (1965) · '+title,url:paper+'#page='+page});
  const constant=value=>({type:'constant',value}),variable=value=>({type:'variable',value});
  const fn=(value,...args)=>({type:'function',value,args});
  const literal=(predicate,negative,...args)=>({predicate,negative,args});
  const clause=(id,...literals)=>({id,literals});
  const a=constant('atlas'),b=constant('other'),x=variable('x'),y=variable('y');
  const rule=clause('rule',literal('Seminar',true,a),literal('HasAITopic',true,a),literal('Recommend',false,a));
  const firstOrderRule=clause('rule-variable',literal('Seminar',true,x),literal('HasAITopic',true,x),literal('Recommend',false,x));
  window.AtlasEntries.register({
    id:'resolution',
    record:{
      title:'Resolution · 논리의 추론을, 기계가 계산할 한 단계로',
      subtitle:'A Machine-Oriented Logic Based on the Resolution Principle',
      dateLabel:'1965 · Journal of the ACM 논문 출판',
      people:['J. Alan Robinson'],
      authorNote:'J. A. Robinson의 1965년 논문. Journal of the ACM 12(1), 23–41. 논문은 기계가 처리할 추론 원리와 그 이론을 제시하고, 효율적인 증명 탐색의 조건을 별도로 논의한다.',
      summary:'지식을 절로 표현하고, 필요한 변수 치환과 논리적 추론을 한 과정으로 계산해 모순에 이르는 증명을 찾도록 했다.',
      detail:'',question:'',related:['logic-theorist','advice-taker','prolog','knowledge-representation','alphaproof'],
      sources:[{title:'Robinson · Resolution 원논문 · 1965',url:paper},{title:'Journal of the ACM · DOI 10.1145/321250.321253',url:doi}],
      caveat:'기존 단일 리터럴 쌍·유한 세미나 보기와, 원문 Example2의 선택 부분집합·고정 세 단계 계산을 구분한다. 새 보기는 원문 부모 절 경로를 계산·검사하며 일반적인 자동 증명 탐색 전체를 구현하지 않는다. 세미나 전제는 자체 사례이고 후속 단계의 세부 단일자는 새 계산이다.'
    },
    content:{
      article:{
        question:'기계가 알고 있는 지식으로,\n결론의 근거를 스스로 찾게 하려면?',
        opening:[
          '사람은 알고 있는 사실과 일반적인 규칙을 연결해 새로운 결론을 얻는다. 이때 같은 규칙도 어느 대상에 적용할지, 어떤 식들이 서로 이어지는지 찾아야 한다. 기계가 이런 추론을 하게 만들려면 지식을 어떤 형태로 적고, 무엇을 계산하도록 해야 할까?',
          'Robinson은 컴퓨터가 수행할 추론의 단위를 다시 설계하려 했다. 사람이 한눈에 납득하기 쉬운 작은 단계만 고집하기보다, 기계가 필요한 처리를 계산하고 그 적용이 올바른지 확인할 수 있는 원리를 만들려 했다. 1965년 논문은 항을 변수에 넣는 치환과 그 결과의 논리적 분석을 resolution이라는 한 과정으로 결합한다.',
          '지식은 절로 표현한다. 절 하나는 여러 조건식인 리터럴을 “또는”으로 묶고, 절 집합은 그 절들을 함께 요구한다. 서로 반대되는 식을 연결하려면 변수의 자리가 같은 항을 가리키도록 맞아야 한다. 모든 대입 결과를 먼저 펼쳐 놓는 대신, 추론에 필요한 치환을 그 자리에서 계산하고 남은 절 전체에도 일관되게 적용하는 것이 핵심이다.',
          '증명할 결론의 반대를 전제에 더해 볼 수도 있다. 이것들이 함께 성립할 수 없다는 모순을 찾으면, 원래 전제에서 결론이 따라온다는 근거를 얻는다. 어떤 리터럴도 남지 않은 빈 절 □가 이 반박의 끝이다. 원래 지식 자체가 이미 충돌하는 경우도 따로 살펴, 무엇 때문에 모순에 도달했는지 구분해야 한다.',
          '원논문의 대수 사례는 C₁–C₆의 절에서 C₇·C₈·C₉를 도출한다. 첫 단계에서는 C₁의 두 음성 리터럴을 C₃의 양성 리터럴과 동시에 맞춘다. 같은 치환을 나머지 식에 적용하면 C₇이 되고, 이를 다음 부모 절로 사용해 끝내 □를 얻는다. 추론 한 단계 안에 여러 식의 대응과 치환 계산을 묶는 발상을 원문 자체의 사례에서 볼 수 있다.',
          '아래의 기존 세미나 사례에서는 사실·추천 규칙·목표의 반대를 바꾸며 반박과 단일화를 살펴본다. 새 원문 보기에서는 실제 C₁–C₉와 선택한 리터럴·변수 구분·단일자·남은 절을 단계별로 연결한다. 한 쌍만 선택한 별도 결과도 비교해, 원문의 첫 계산에서 왜 여러 리터럴을 함께 다뤘는지 확인할 수 있다.'
        ],
        visual:{
          id:'resolution-original-proof',navLabel:'추론·치환·원문 증명',
          title:'필요한 식을 맞추고, 남은 절에서 증명을 잇다',
          caption:'기존 세미나 반박·단일화 보기와 원문 Example2의 증명을 연결합니다. 원문 보기에서는 C₁–C₉의 부모 절과 선택 부분집합을 실제로 계산하고 결과를 확인합니다.',
          stages:[
            {id:'refute',label:'목표의 반대를 더하다',text:'알려진 사실과 규칙을 절로 적고, 증명하려는 목표의 부정을 더한다. 어떤 전제를 함께 요구하는지부터 확인한다.'},
            {id:'unify',label:'필요한 치환을 찾다',text:'서로 반대되는 리터럴의 항들을 맞춘다. 치환은 지운 자리뿐 아니라 남아 있는 절 전체에 적용된다.'},
            {id:'derive',label:'모순까지 이어 가다',text:'부모 절과 제거한 리터럴, 남은 새 절을 한 단계씩 잇는다. 빈 절이 생기는 경우와 아직 목표가 따라오지 않는 경우를 비교한다.'}
          ],
          premises:[
            {id:'seminar',label:'지식 세미나 A는 세미나다',clause:clause('seminar',literal('Seminar',false,a))},
            {id:'topic',label:'지식 세미나 A는 AI 주제를 다룬다',clause:clause('topic',literal('HasAITopic',false,a))},
            {id:'rule',label:'세미나이고 AI 주제를 다루면 추천한다',clause:rule,firstOrderClause:firstOrderRule}
          ],
          goal:literal('Recommend',false,a),goalText:'지식 세미나 A를 추천한다',
          initial:{enabled:['seminar','topic','rule'],negateGoal:true},
          legend:[
            {symbol:'atlas',text:'직접 만든 사례의 지식 세미나 A'},
            {symbol:'Seminar(s)',text:'s는 세미나다'},
            {symbol:'HasAITopic(s)',text:'s는 AI 주제를 다룬다'},
            {symbol:'Recommend(s)',text:'명시한 규칙에서 s를 추천 대상으로 분류한다'},
            {symbol:'¬ · ∨ · □',text:'부정 · 또는 · 어떤 리터럴도 남지 않은 빈 절'}
          ],
          unificationCases:[
            {
              id:'rule-fact',label:'규칙과 사실을 연결',left:firstOrderRule,
              right:clause('fact-seminar',literal('Seminar',false,a)),leftPivot:0,rightPivot:0,
              explanation:'¬Seminar(x)와 Seminar(atlas)의 부호는 반대다. x를 atlas로 맞추면 두 리터럴을 제거할 수 있다. 같은 x가 남은 HasAITopic과 Recommend에도 있으므로 그 자리까지 함께 바뀐다.'
            },
            {
              id:'constants',label:'상수 이름이 다른 경우',
              left:clause('constant-left',literal('P',false,a)),right:clause('constant-right',literal('P',true,b)),leftPivot:0,rightPivot:0,
              explanation:'atlas와 other는 변수로 바꿀 자리가 없는 서로 다른 상수 기호다. 이 치환 계산으로 두 항을 같은 식으로 만들 수 없다. 상수 이름만 보고 현실의 대상이 반드시 다르다고 추론하는 뜻은 아니다.'
            },
            {
              id:'repeated-variable',label:'같은 변수는 같은 항으로',
              left:clause('repeat-left',literal('Related',false,x,x)),right:clause('repeat-right',literal('Related',true,a,b)),leftPivot:0,rightPivot:0,
              explanation:'Related(x,x)의 두 x는 같은 변수다. 첫 자리에서 x를 atlas로 정했다면 둘째 자리도 atlas여야 한다. 두 자리를 atlas와 other로 따로 채우는 치환은 허용되지 않는다.'
            },
            {
              id:'occurs-check',label:'자기 자신을 포함하는 항',
              left:clause('occurs-left',literal('P',false,x,fn('f',x))),right:clause('occurs-right',literal('P',true,fn('f',y),y)),leftPivot:0,rightPivot:0,
              explanation:'서로 다른 절의 변수들을 구분한 뒤에도 두 자리의 요구를 함께 풀면 변수가 자기 자신을 포함하는 함수 항과 같아져야 한다. 유한한 항의 치환에서는 이 순환을 허용하지 않는다. 원문의 occurs check가 필요한 자리다.'
            }
          ],
          evidence:[
            {
              id:'clause-and-refutation',title:'원문의 표현 · 절과 반박',
              formula:'절 C = {L₁, L₂, …}  ↔  L₁ ∨ L₂ ∨ …\n절 집합 S = {C₁, C₂, …}  ↔  C₁ ∧ C₂ ∧ …\n\nK ∧ ¬G가 성립할 수 없음  →  K에서 G가 따라옴\n□ : 빈 절 · 참으로 만들 리터럴이 없음',
              caption:'§§2.10·2.18의 절과 충족 가능성, §6의 반박 정의를 연결한 자체 도식이다. 절 안에서는 “또는”, 여러 절을 함께 둘 때는 “그리고”로 읽는다. 빈 절 □와 아무 절도 없는 집합 ∅를 구분한다.',
              source:source(3,'§2.10 절 · §2.18 충족 가능성 · §6 반박')
            },
            {
              id:'unification-resolution',title:'치환과 추론을 한 단계로',
              formula:'{¬Seminar(x), ¬HasAITopic(x), Recommend(x)}\n{Seminar(atlas)}\n\nθ = {x ↦ atlas}\n\n남는 절: {¬HasAITopic(atlas), Recommend(atlas)}',
              caption:'§5의 치환·단일화·resolvent 정의를 직접 만든 세미나 사례로 표현했다. 치환 θ는 남은 리터럴 전체에도 적용한다. 원문은 리터럴 부분집합을 함께 단일화하는 더 일반적인 규칙을 정의한다.',
              source:source(9,'§§5.4·5.7–5.11 치환·단일화·resolvent')
            }
          ],
          originalImage:{
            src:'robinson-1965-refutation-example.png',
            title:'원논문 §6 Example 2 · C₉가 빈 절이 되는 반박',
            alt:'Robinson1965 인쇄36쪽 Example2의 전제절 C1부터 C6과 도출절 C7·C8·C9. 마지막 C9는 빈 절이다.',
            caption:'원문의 대수 문제에서 가져온 절과 반박의 실제 표기다. C₁–C₆에 결론의 부정이 포함되고, C₇·C₈을 거쳐 C₉=□를 얻는다. 원문 뒤의 설명은 C₇이 C₁·C₃에서, C₈이 C₆·C₇에서, □가 C₄·C₈에서 도출된다고 밝힌다. 이 그림의 원문 사례와 위의 자체 세미나 사례는 서로 다른 전제다.',
            credit:'J. A. Robinson, Journal of the ACM 12(1), 1965, 인쇄 p.36 / PDF p.14, §6 Example 2. 원문 수식과 표제를 보존한 발췌이며 한국어 설명은 밖에 붙였다. 원문에 그림 번호는 없다.',
            source:source(14,'§6 Example 2 · 원문 절과 반박 표기')
          },
          source:source(1,'초록·§1 기계를 위한 추론 원리'),
          scope:'기존 보기는 직접 정한 세미나의 지식과 목표를 다룬다. 치환 보기는 두 절에서 리터럴 하나씩을 선택하고, 세미나 증명은 atlas 한 대상의 유한한 절과 가능한 해석을 비교한다. 새 원문 보기는 Example2의 선택 부분집합과 세 부모 쌍을 직접 계산한다. 고정된 원문 증명 확인과 일반적인 자동 증명 탐색을 구분한다.'
        },
        takeaway:{
          title:'모순을 찾는 것은, 어떤 결론이 전제에서 따라오는지 확인하는 길이다',
          text:'목표를 부정한 절이 알려진 지식과 양립할 수 없으면 목표는 그 지식의 논리적 귀결이다. 단일화는 필요한 치환을 찾고, resolution은 그 치환 아래 새 절을 만든다. 어떤 전제와 추론을 사용했는지 남기면 빈 절에 이른 이유도 다시 확인할 수 있다.'
        },
        technical:{
          title:'원논문의 정의와 이 보기의 범위를 더 읽기',
          paragraphs:[
            '기계가 다룰 추론의 단위: 초록과 §1(pp.23–24)은 항을 변수에 대입하는 과정과 그 결과를 명제 수준에서 분석하는 과정을 하나의 resolution 과정으로 결합한다. 한 번의 추론 적용에 필요한 정보 처리를 알고리즘으로 수행하도록 구성한 발상이다. 이 화면의 짧은 예시가 원논문의 계산 효율을 측정한 실험은 아니다.',
            '전제를 절로 옮기기: 자체 추천 규칙은 ∀x((Seminar(x) ∧ HasAITopic(x)) → Recommend(x))다. 함의를 없애면 ¬Seminar(x) ∨ ¬HasAITopic(x) ∨ Recommend(x)가 된다. 원논문의 절에서는 변수의 전칭 양화를 생략해 적는다. 전체 증명 보기는 이 규칙의 x를 atlas로 채운 한 사례를 사용한다. 임의 문장을 정규화하거나 스콜렘화하는 변환기를 실행하지 않는다.',
            '지식과 목표의 부정, 반박(Refutation): K가 알려진 지식이고 G가 목표라면 K ⊨ G와 K ∧ ¬G의 충족 불가능성은 연결된다. 원래 K 자체가 이미 충돌하면 어떤 목표의 부정을 더해도 모순이 있으므로, 목표에 관한 새 지식을 얻었다는 설명과 구분해야 한다. 화면은 원래 전제의 일관성과 목표의 부정을 더한 집합의 상태를 나누어 다룬다.',
            '빈 절과 빈 집합: §2.10에서 절은 유한한 리터럴의 집합이며 빈 절도 허용한다. 빈 절 □는 참으로 만들 수 없다. 반면 요구할 절이 하나도 없는 집합 ∅는 충족 가능하다. 둘은 “아무것도 없다”는 같은 상태가 아니다. □가 도출됐다는 것은 함께 참이어야 할 절들이 양립할 수 없다는 뜻이다.',
            '단일화(Unification)와 가장 일반적인 치환: §5.7–5.9는 여러 식을 같은 식으로 만드는 치환과 가장 일반적인 단일자(Most General Unifier, MGU)를 다룬다. x를 atlas로 바꿀 필요가 있는 자리에서는 그 치환을 구하되, 불필요하게 다른 변수의 값까지 고정하지 않는다. 한 변수의 모든 출현을 일관되게 바꾸며, 치환을 제거된 리터럴 외의 나머지 절에도 적용한다.',
            '서로 다른 절의 변수: §5.4의 표준화는 두 절에서 우연히 같은 이름을 쓴 변수를 구분한다. 예를 들어 서로 다른 절에 쓴 P(x)와 ¬P(f(x))의 두 x는 처음부터 한 변수라고 가정하지 않는다. 이를 구분하면 한쪽 변수를 다른 쪽 함수 항에 맞출 수 있다. 같은 절 안에서 반복한 x는 계속 같은 변수다.',
            '유한한 항과 occurs check: §5.8의 단일화 알고리즘은 변수를 어떤 항에 치환할 때 그 항 안에 바로 그 변수가 들어 있지 않은지 확인한다. x=f(x) 같은 요구를 유한한 항의 해로 받아들이지 않는다. 이 검사는 변수 이름을 절마다 먼저 구분한 뒤 이루어져야 한다. 등식 자체의 추론, 무한한 순환 항이나 모든 논리 언어의 단일화는 이 보기의 범위가 아니다.',
            '이항 보기와 원문의 일반 규칙: 이 카드의 치환 보기는 각 부모 절에서 반대 부호의 리터럴 하나씩을 선택한다. 원문의 §5.10–5.11은 부모 절의 리터럴 부분집합을 단일화해 제거하는 일반적인 resolvent를 정의한다. 같은 부호의 여러 리터럴을 단일화해 묶는 factoring과 관련된 처리가 이 일반 규칙 안에 포함된다. 이 화면의 이항 연산만으로 원논문 전체의 완전성을 구현했다고 서술하지 않는다.',
            '완전성과 탐색의 종료: §4의 Resolution Theorem과 §6은 충족 불가능한 유한 절 집합에 반박이 존재함을 다룬다. 실제 절차가 그 반박에 도달하려면 필요한 추론을 빠뜨리지 않는 탐색이 필요하다. 충족 가능한 일반 일차 논리 문제에서 탐색이 언제나 끝나는 것은 아니며, 잠시 빈 절을 찾지 못한 것만으로 목표가 거짓이라고 판단할 수 없다. §7은 효율적인 탐색 원리를 별도로 논의한다.',
            '이 화면에서 확인하는 결과: 전체 증명 보기는 atlas에 대해 정한 유한한 원자식과 절을 사용한다. 이 범위에서 절을 닫아 가는 계산과 가능한 참·거짓 배정을 비교한다. 목표가 따라오지 않는 경우에는 전제를 만족하면서 목표가 거짓인 배정을 보여 줄 수 있다. 그 배정은 원래의 모든 일차 논리 문장을 해석하는 범용 모형 생성기의 출력이 아니다.',
            '원문의 세 추론을 계산하기: §6 Example2의 C₇은 C₁·C₃에서, C₈은 C₆·C₇에서, 빈 절 C₉는 C₄·C₈에서 도출된다. 새 보기는 앞에서 실제 계산한 절을 다음 단계의 부모로 넘긴다. C₁에서는 첫째·셋째 음성 리터럴 두 개를 선택해 C₃의 양성 리터럴과 함께 단일화한다. 한 쌍만 제거하면 리터럴 세 개가 남아 원문 C₇과 다른 절이 된다. 이 비교의 차이를 식의 거짓이나 추론의 무효와 동일시하지 않는다.',
            '원문의 표기와 새 계산: 첫 단계의 변수 구분과 단일자는 인쇄 p.36의 Commentary에 직접 제시된다. C₈·C₉ 단계의 세부 단일자는 명시된 부모 절에서 새로 계산한다. 계산 결과와 원문 결과는 절 전체의 일대일 변수 이름 바꾸기인 알파동치로 대조한다. 서로 다른 변수를 하나로 합쳐서 같다고 판정하지 않는다. 원문에 있는 C₂·C₅는 이 세 단계 경로에서 사용하지 않는다. 새 보기는 주어진 경로의 추론을 확인하며 다른 경로를 자동 탐색하거나 모든 일차 논리 문제의 종료를 보장하지 않는다.',
            '원문 사례를 읽는 범위: 인쇄 p.36의 Example 2는 결합 법칙과 좌·우 방정식의 해를 가진 대수 구조에 관한 문제에서 결론을 부정한 절들을 만들고 빈 절까지 도출한다. 여기의 원문 발췌에는 그 전제절·도출절을 그대로 보존했다. 위의 추천 규칙은 그 대수 문제를 번역한 것이 아니라, 같은 반박의 구조를 보여 주기 위해 직접 작성한 사례다.'
          ],
          formula:'직접 정한 지식 K\nSeminar(atlas)\nHasAITopic(atlas)\n¬Seminar(atlas) ∨ ¬HasAITopic(atlas) ∨ Recommend(atlas)\n\n목표 G: Recommend(atlas)\n목표의 부정: ¬Recommend(atlas)\n\n규칙 + Seminar(atlas)\n  → ¬HasAITopic(atlas) ∨ Recommend(atlas)\n위 절 + HasAITopic(atlas)\n  → Recommend(atlas)\n위 절 + ¬Recommend(atlas)\n  → □\n\n□ : 충족할 수 없는 빈 절\n∅ : 요구하는 절이 없는, 충족 가능한 절 집합'
        }
      },
      keyIdeas:[
        {title:'목표의 반대를 더해 증명을 찾는다',text:'알려진 지식과 목표의 부정을 동시에 만족할 수 없음을 보이면, 그 지식에서 목표가 따라온다는 결론을 얻는다.'},
        {title:'추론의 한 단계 안에서, 필요한 치환을 함께 계산한다',text:'대상을 일일이 대입한 모든 식을 먼저 나열하는 대신, 반대되는 리터럴이 맞물리는 치환을 구해 새 절을 만든다.'},
        {title:'부모 절과 치환을 남겨 결론을 검사한다',text:'어느 전제에서 어떤 리터럴을 제거하고 무엇을 남겼는지 기록한다. 빈 절에 이른 증명과 아직 결론이 따라오지 않는 경우를 구분한다.'}
      ],
      videos:[],
      references:[
        {title:'Robinson · A Machine-Oriented Logic Based on the Resolution Principle · 1965',url:paper,location:'전체19쪽, 인쇄 pp.23–41. 표제·저자·학술지 정보는 PDF p.1 / 인쇄 p.23.'},
        {title:'Robinson · 치환과 논리적 분석을 결합한 발상',url:paper+'#page=1',location:'초록·§1, 인쇄 pp.23–24 / PDF pp.1–2. 기계를 위한 추론 원리의 목적.'},
        {title:'Robinson · 절과 충족 가능성',url:paper+'#page=3',location:'§2.10 인쇄 p.25 / PDF p.3의 절·빈 절 정의. §2.18 인쇄 p.26 / PDF p.4의 빈 절과 빈 절 집합의 구분.'},
        {title:'Robinson · 치환·변수 표준화·단일화',url:paper+'#page=8',location:'§§5.1–5.9, 인쇄 pp.30–33 / PDF pp.8–11. §5.4 표준화, §5.8 occurs check, §5.9 MGU.'},
        {title:'Robinson · 원문의 일반 resolvent 정의',url:paper+'#page=11',location:'§§5.10–5.11, 인쇄 p.33 / PDF p.11. 리터럴 부분집합·변수 표준화·가장 일반적인 단일자를 사용한 정의.'},
        {title:'Robinson · 완전성과 반박',url:paper+'#page=8',location:'§4 Resolution Theorem, 인쇄 p.30 / PDF p.8. §6 반박 정의와 예시, 인쇄 pp.35–36 / PDF pp.13–14.'},
        {title:'Robinson · 원문 Example 2의 절과 빈 절',url:paper+'#page=14',location:'§6 Example 2, 인쇄 p.36 / PDF p.14. 원문 전제 C1–C6, 도출 C7·C8·C9, 이어지는 Commentary의 부모 절 설명.'},
        {title:'Robinson · 탐색과 종료의 범위',url:paper+'#page=15',location:'§7, 인쇄 pp.37–41 / PDF pp.15–19. 단순한 원리의 반복 구현과 효율적인 탐색을 구분.'},
        {title:'Journal of the ACM · DOI와 출판 기록',url:doi,location:'DOI 10.1145/321250.321253. JACM12(1), January1965, pp.23–41. 출판사 본문 접근과 Stanford 원문 열람 경로를 구분한다.'},
        {title:'MIT CSAIL · Journal of the ACM Bibliography',url:bibliography,location:'J.A.Robinson, 논문 제목·Journal of the ACM12(1):23–41·January1965 서지 대조.'}
      ]
    }
  });
})();
