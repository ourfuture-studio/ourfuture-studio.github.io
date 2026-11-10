/* One independently editable person and article. No new timeline event is implied. */
(function(){
  'use strict';
  const paper='https://www.cis.upenn.edu/~cis5110/Church-UnsolvableProblemElementary-1936.pdf';
  const content={
    article:{
      question:'“정해진 절차로 계산한다”는 말을,\n수학의 언어로 적을 수 있을까?',
      opening:[
        '사람은 종이에 기호를 적고, 규칙을 적용하고, 다음 줄로 넘어가며 계산한다. 그런데 어떤 문제를 계산으로 풀 수 있는지 묻기 위해서는, 먼저 “계산할 수 있다”는 말 자체를 정확하게 정해야 한다. 처치의 출발점은 이 문제였다.',
        '처치는 1930년대에 전개된 λ계산을 바탕으로 1936년 논문에서 실효적 계산가능성의 정의를 제안했다. 함수의 식, 그 함수에 넣는 입력, 식을 바꾸는 규칙으로 계산을 표현한다. 기호가 무엇을 의미하는지 매번 새로 판단하기보다, 정해진 형식에 따라 계산을 이어 갈 수 있게 적으려는 발상이다.',
        '중심 아이디어는 함수를 적용하는 일을 식의 치환으로 다루는 것이다. λx.x는 입력 자리에 무엇을 넣든 그 입력이 남는 함수다. 여기에 a를 넣으면 x를 a로 바꾸어 a를 얻는다. 같은 문법으로 다른 함수를 입력하거나, 수를 함수로 표현하는 계산도 구성할 수 있다.',
        '이 작업은 기계의 생각을 완성한 모형이라기보다, 기계적 절차로 할 수 있는 일의 범위를 묻는 토대다. 처치는 이 정의를 이용해 일반적인 절차로 해결할 수 없는 문제도 제시했다. 아래에서는 원문의 식과 변환 규칙을 현대 표기로 다시 구성해, 실제로 다음 식이 어떻게 나오는지 따라간다.'
      ],
      visual:{id:'church-lambda-calculus',navLabel:'식으로 계산하기',title:'함수의 적용을, 식의 치환으로',caption:'입력 자리와 실제 입력을 구분하고, 변환을 한 단계씩 진행해 보세요. 숫자도 같은 함수의 문법으로 표현한 뒤, 1에서 2로 이어지는 계산을 살펴봅니다.',source:{title:'Church (1936) · §2, 인쇄 pp.346–349',url:paper+'#page=3'}},
      takeaway:{title:'계산의 절차를 정의하면, 계산의 한계도 물을 수 있다',text:'처치는 어떤 결과를 얻었는지만이 아니라, 어떤 형식의 절차로 그 결과를 얻는지를 수학의 대상으로 만들었다. 이 정의를 바탕으로 계산 가능한 함수와 일반적인 판정 절차의 한계를 논의했다.'},
      technical:{title:'원문의 문법·정의 제안·판정 불가능성 더 읽기',paragraphs:[
        '주된 자료는 American Journal of Mathematics 58(2), 345–363의 1936년 논문이다. 연결한 PDF는 첫 쪽이 JSTOR 표지라 PDF 2쪽이 인쇄 345쪽, PDF 3쪽이 인쇄 346쪽이다. 화면의 쪽수는 인쇄 쪽수다.',
        '§2의 원래 표기는 λx[M]과 {F}(A)를 사용한다. λx[M]을 만들 때 x가 M 안에 자유롭게 나타나야 한다는 조건이 있다. 기본 사례는 이 조건을 따르며, 1·2·3을 수 표현으로 쓴다. 입력 변수를 쓰지 않는 함수나 오늘날 흔히 함께 소개하는 0을 원문의 이 문법에 그대로 넣지 않는다.',
        '인쇄 347쪽의 변환에는 변수 이름을 바꾸는 연산, 함수 적용에서 입력 자리를 바꾸는 연산, 그 역방향 연산이 포함된다. 화면은 앞의 두 연산을 현대의 α 변환·β 축약이라는 표기로 나누어 보여 준다. 원문의 λ-변환 가능성 전체는 화면의 한 방향 계산 절차보다 넓다.',
        '식 내부에서 어떤 변수는 λ에 묶이고 어떤 변수는 자유롭게 남는다. 예컨대 (λx.λy.x y) y에서 바깥 입력 y는 자유변수다. 안쪽 λy를 먼저 λy1로 바꾸어, 그 입력이 뜻하지 않게 안쪽 함수에 묶이지 않도록 한다. 이 사례와 수의 후속자 식은 규칙을 보여 주기 위해 직접 구성한 예이며 원문의 사례를 그대로 인용한 것은 아니다.',
        '§2 인쇄 349쪽은 양의 정수를 나타내는 식과 λ-변환을 이용해 함수의 λ정의 가능성을 다룬다. §6의 형식적 결과와 §7의 정의 제안을 구분해야 한다. 형식적으로 정의한 함수 부류 사이의 일치와, 직관적으로 수행 가능한 모든 실효적 절차를 그 정의로 포착한다는 주장은 같은 종류의 명제가 아니다.',
        '§8 인쇄 360쪽의 Theorem XVIII은 임의의 주어진 식이 정규형을 갖는지를 판정하는 재귀적 방법이 없음을 다룬다. 인쇄 363쪽의 Theorem XIX는 두 식의 변환 가능성을 판정하는 일반 문제를 다룬다. 어떤 개별 사례도 풀 수 없다는 뜻이 아니다. 화면의 24단계 한도도 이 일반 결과의 증명이나 개별 식의 비종료 판정이 아니다.',
        '이 논문은 λ정의 가능성과 형식적 동치에 앞선 공동 연구를 명시한다. Church 한 사람에게 Kleene·Rosser 등의 기여까지 귀속하지 않는다. 본 카드는 관련 정의·정리의 서술과 본문을 대조했으며 모든 보조정리의 증명을 독립적으로 다시 검증한 것은 아니다.',
        '별도의 A Note on the Entscheidungsproblem과 그 정정은 1936년 관련 논문이다. 정정 논문은 출판사의 공개 발췌와 서지만 확인했으므로, 본문을 대조한 주된 논문의 λ계산·정의 제안·변환 판정 문제를 이 카드의 중심으로 삼는다.',
        '처치와 튜링의 지도 관계는 Princeton University Library의 기록을 따른다. 튜링은 1936–1938년 처치의 지도로 연구하고 1938년 박사 학위를 받았다. 그 학위논문의 서수논리 연구와, 튜링의 앞선 계산 가능성 논문을 구분한다.'
      ],formula:'추상: λx.M       적용: F A\n(λx.M) N → M[x := N]     자유변수가 붙잡히지 않도록 치환\n1 ≡ λf.λx.f x\n2 ≡ λf.λx.f (f x)\n후속자 ≡ λn.λf.λx.f (n f x)'}
    },
    keyIdeas:[
      {title:'계산을 적을 수 있는 정확한 언어가 필요했다',text:'계산 가능한 문제와 그렇지 않은 문제를 나누려면, 무엇을 계산 절차로 인정할지부터 정해야 한다. 처치는 함수의 형식적 표현과 λ-변환을 실효적 계산가능성의 정의에 연결했다.'},
      {title:'함수도, 입력도 같은 식의 문법으로 다룬다',text:'입력은 미리 정해진 숫자 기호에만 한정되지 않는다. 함수의 식을 다른 함수에 넣어 새로운 식을 구성할 수 있다. 수를 “함수를 몇 번 적용하는가”로 표현하면, 수에 대한 계산도 식의 변환으로 이어진다.'},
      {title:'이름을 바꿀 때도, 입력을 넣을 때도 뜻을 유지해야 한다',text:'변수의 글자만 무작정 바꾸면 입력의 역할이 달라질 수 있다. 어떤 λ에 묶인 자리인지와 자유로운 입력인지를 구분해야 한다. 화면의 이름 바꾸기와 치환은 이 차이를 직접 보여 준다.'},
      {title:'형식적 결과와 계산에 관한 논제를 구분한다',text:'λ정의 가능성과 재귀성처럼 정확하게 정의된 부류의 관계는 수학적 명제로 다룬다. 그 부류가 직관적인 모든 실효적 계산 절차를 포착한다는 제안은 별도로 읽어야 한다. 컴퓨터가 지능이나 생각 전체를 구현했다는 결론을 이 논문에서 끌어내지 않는다.'}
    ],videos:[],references:[
      {title:'Church (1936) · An Unsolvable Problem of Elementary Number Theory · 원문',url:paper,location:'인쇄 pp.346–349 §2 문법·변환·수·λ정의 가능성; pp.355–358 형식적 결과와 정의 제안; pp.360·363 Theorems XVIII·XIX. PDF 표지 한 쪽을 쪽수에 더한다. 관련 본문과 해당 쪽의 수식을 대조했다.'},
      {title:'American Journal of Mathematics · DOI 10.2307/2371045',url:'https://doi.org/10.2307/2371045',location:'58(2), 345–363, 1936. 표제·저자·권호·쪽수 확인.'},
      {title:'Church (1936) · A Note on the Entscheidungsproblem',url:'https://people.csail.mit.edu/brooks/idocs/church_ent.pdf',location:'인쇄 pp.40–41 본문 확인. 별도의 JSL 논문이며, 그 정정을 함께 확인해야 한다. 권호 표기의 March와 접수일 April 15를 실제 출판일 하나로 단정하지 않는다.'},
      {title:'Correction to A Note on the Entscheidungsproblem · 출판사',url:'https://www.cambridge.org/core/journals/journal-of-symbolic-logic/article/abs/correction-to-a-note-on-the-entscheidungsproblem/2B4D555564730677F94BBBDDC0D7DBC3',location:'출판사 공개 발췌·서지 확인. 원문 PDF 전체는 대조하지 못했다. 정정 사항을 독립적으로 재증명했다고 주장하지 않는다.'},
      {title:'Princeton University Library · Alan Turing and Princeton',url:'https://manuscripts.blogs.princeton.edu/2015/01/29/alan-m-turing-and-princeton/',location:'첫 두 문단. Church의 1936–1938년 지도, Turing의 1938년 박사와 1939년 서수논리 논문의 관계를 확인했다.'}
    ]
  };
  const profile={id:'alonzo-church',name:'Alonzo Church',nameKo:'알론조 처치',aliases:['처치','알론조처치','Church','람다 계산','λ계산'],tagline:'계산의 뜻을, 함수와 식의 변환으로',roles:['계산 가능성 · 수리논리','λ계산'],tags:['foundations'],intro:'사람이 규칙에 따라 수행하는 계산을 정확한 수학적 정의로 다루려 했다. 1936년 논문의 함수 표현·변환 규칙·실효적 계산가능성 제안을 중심으로 읽고, 프린스턴에서 튜링을 지도한 관계를 함께 살펴본다.',works:[{id:'church-calculability-1936',year:1936,dateLabel:'1936 · American Journal of Mathematics 58(2), 345–363',title:'계산을 함수의 식과 변환 규칙으로 정의하다',summary:'λ정의 가능한 함수와 재귀적 함수의 관계를 바탕으로 실효적 계산가능성의 정의를 제안하고, 일반적인 절차로 해결할 수 없는 문제를 논의했다.',type:'학술논문',track:'foundations',people:['Alonzo Church'],sources:[{title:'An Unsolvable Problem of Elementary Number Theory · 원논문',url:paper},{title:'논문 서지 · DOI 10.2307/2371045',url:'https://doi.org/10.2307/2371045'}],caveat:'원문의 λ식과 변환 규칙을 현대 표기로 재구성한다. 기본 사례는 1936년의 변수 사용 조건과 양의 정수 표현을 따르며, 직접 입력은 더 넓은 현대 문법을 허용한다. 화면은 원논문의 증명 전체나 지능을 재현하는 실험이 아니다.',content}]};
  window.ATLAS_CHURCH_PROFILE=profile;
  window.ATLAS_PEOPLE_PROFILES.push(profile);
})();
