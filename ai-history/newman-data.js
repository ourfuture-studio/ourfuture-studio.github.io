/* Max Newman: lecture context, original retrospective sources and Turing's model. */
(function(){
  'use strict';
  const turing='https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf',kings='https://www.kings.cam.ac.uk/alan-mathison-turing-1912-54',memoir='https://turingarchive.kings.cam.ac.uk/biographical-and-personal-documents-amta/amt-a-36';
  const content={article:{
    question:'어떤 논리식이 주어져도,\n규칙만 따라 답을 낼 수 있을까?',
    opening:[
      '수학자는 문장마다 증명을 찾는다. 그런데 일차 술어논리의 논리식을 입력하면 정해진 규칙을 따라 움직여, 그 식이 논리적으로 타당한지 항상 판정하는 하나의 절차가 있을까? 결정문제의 핵심은 임의의 입력에서도 끝나고 정확한 답을 내는 일반적인 방법의 존재였다.',
      '킹스칼리지의 아카이브 전시는 튜링이 1935년 봄 뉴먼의 Part III 기초수학 강의를 들었다고 기록한다. 뉴먼은 강의에서 힐베르트의 결정문제를 소개했고, 튜링이 기계적 절차의 가능성을 연구하도록 격려했다. 1935–1936년의 연구 지도와 초고에 대한 피드백도 이 맥락에서 읽을 수 있다.',
      '튜링이 붙잡아야 했던 것은 “기계적”이라는 말의 정확한 뜻이었다. 그는 종이에 계산하는 사람이 한 번에 구별하는 기호와 상태, 한 번의 행동을 분석해 계산을 수행하는 추상 기계를 적었다. 질문을 소개하고 연구를 격려한 뉴먼의 역할과, 모형을 전개한 튜링의 기여가 이어지는 지점이다.',
      '강의의 날짜와 영향은 소장기관의 역사 설명을, 계산 모형은 튜링의 1936년 원논문을, 그 연구에 대한 뉴먼 자신의 설명은 1955년 회고 원본을 따른다. 아래에서는 결정문제가 요구한 조건을 먼저 보고, 작은 세계의 실제 논리 계산과 원논문에 있는 기계의 예를 구분해 살펴본다.'
    ],
    visual:{id:'newman-decision-question',navLabel:'질문에서 계산 모형으로',title:'“기계적인 방법”이라는 말을, 정확한 대상으로',caption:'논리식의 범위와 답을 내는 절차의 조건을 함께 봅니다. 화살표가 있는 작은 세계에서는 실제로 답을 계산하고, 이어서 튜링 원문의 기계가 정해진 규칙으로 기호를 쓰는 과정을 따라갑니다.',source:{title:'Turing · §3 Example I, 인쇄 p.233',url:turing+'#page=4'}},
    takeaway:{title:'뉴먼이 소개한 질문은, 계산 자체를 분석하는 출발점이 됐다',text:'결정문제를 다루려면 어떤 방법을 기계적인 절차로 인정할지부터 정확하게 정해야 했다. 뉴먼의 강의와 피드백, 튜링의 독자적인 모형과 논증을 함께 읽으면 연구 질문이 새로운 수학적 대상으로 이어지는 과정을 볼 수 있다.'},
    technical:{title:'강의의 기록·논리식의 범위·원문의 기계 더 읽기',paragraphs:[
      '1935년 강의 자체의 녹취나 원고는 이번 검토에서 확인하지 못했다. 강의 날짜와 튜링에게 준 영향은 King’s College의 The Entscheidungsproblem 전시 설명과 맨체스터대학교의 기관 기록에 근거한다. 화면의 문구를 당시 강의의 직접 인용이나 칠판 복원으로 표시하지 않는다.',
      '뉴먼의 1955년 Alan Mathison Turing, 1912–1954 회고 원본은 King’s College AMT/A/36에 있다. 인쇄 256쪽(PDF6)의 Mathematical logic 부분은 일반 결정 절차의 문제와 기계적 절차를 정확하게 정의하려 한 튜링의 접근을 설명한다. 이 글은 후대의 당사자 회고이며 1935년 강의 필기록과 자료의 성격이 다르다.',
      '특정한 해석·세계에서 식이 참인지, 모든 해석에서 논리적으로 타당한지, 주어진 증명체계에서 증명 가능한지를 구분한다. 작은 세계의 화면은 대상 2개와 이항관계 R 하나만 다룬다. 네 관계값의 16개 조합을 실제로 검사하지만, 임의의 논리식에 대한 일반 결정 절차를 구현한 것은 아니다.',
      '∀x∃yR(x,y)는 x마다 다른 y를 골라도 된다. ∃y∀xR(x,y)는 같은 y 하나가 모든 x에 대해 조건을 만족해야 한다. a와 b가 각각 자기 자신만 향하면 첫 식은 참이고 두 번째 식은 거짓이다. 이 세계는 두 식의 의미 차이와 첫 식에서 두 번째 식으로 가는 함의의 반례를 보여 준다. 반례를 하나 찾는 일과, 모든 임의의 입력을 정확하게 판정하는 일반 방법의 존재를 같은 문제로 다루지 않는다.',
      '튜링 원논문 §1 인쇄 230–232쪽은 테이프·기호·상태와 자동 기계를, §9 인쇄 249–251쪽은 종이에 계산하는 사람의 행동을 분석한다. 화면의 테이프 예제는 §3 Example I 인쇄 233쪽의 네 상태 b,c,e,f를 현대 라틴 문자로 적어 재구성한다. 원문 상태 글꼴은 프락투어다.',
      '네 규칙의 읽는 조건은 모두 None, 즉 빈칸이다. b는 0을 쓰고 오른쪽으로 이동해 c, c는 쓰기 없이 오른쪽으로 이동해 e, e는 1을 쓰고 오른쪽으로 이동해 f, f는 쓰기 없이 오른쪽으로 이동해 b로 간다. 빈 테이프에서 시작하면 0과 1 사이에 빈칸이 남고, 쓰인 숫자만 읽으면 0101…이 된다. 이것은 원문의 구체적인 기계 예제이며 뉴먼의 강의 실연으로 귀속하지 않는다.',
      '§11 인쇄 259쪽은 주어진 공식이 일차 술어논리의 해당 계산법 K에서 증명 가능한지 판정하는 일반적인 기계의 부재를 논의한다. 괴델의 불완전성과 같은 문장으로 뭉뚱그리지 않는다. 화면에서 유한한 수의 모형이나 기계 동작을 검사하는 것은 원논문의 불가능성 증명을 재현한 것이 아니다.',
      '튜링 논문은 1936년 접수·발표와 출판사 서지의 1937년을 구분한다. 이 인물 기록의 1935년은 뉴먼의 강의 맥락에 붙인 연도이며, 그해에 튜링 논문이 출판됐다는 뜻이 아니다.',
      '뉴먼의 연구 지도·영향과 처치의 프린스턴 박사 지도를 구분한다. 뉴먼과 튜링의 전쟁 중 활동을 같은 암호해독 프로젝트로 합치거나, 뉴먼에게 맨체스터 컴퓨터의 모든 하드웨어 설계를 귀속하지 않는다. 이 카드는 해당 관계와 기록의 범위를 확인했으며 계산불가능성 정리 전체를 독립적으로 다시 증명하지 않았다.'
    ],formula:'각 x마다 어떤 y: ∀x∃y R(x,y)\n모든 x에 대해 같은 y: ∃y∀x R(x,y)\n반례: R(a,a)=참, R(b,b)=참, R(a,b)=R(b,a)=거짓\n원문 Example I: b → c → e → f → b (모두 빈칸을 읽는 조건)'}
  },keyIdeas:[
    {title:'입력 하나의 풀이에서, 모든 입력을 다루는 절차로',text:'결정문제는 정해진 형식의 논리식을 어떤 것이든 받아 답을 내는 일반적인 방법을 묻는다. 절차가 규칙적이라는 조건에 더해 항상 끝나고 정확한 답을 내는 조건을 함께 요구한다.'},
    {title:'“기계적”이라는 말도 수학의 대상이 되어야 했다',text:'일반적인 방법이 없음을 논하려면 무엇을 방법으로 인정하는지 정확해야 한다. 뉴먼은 회고에서 이 정의의 필요성을 설명했고, 튜링은 사람의 계산 행위를 분석해 기호·상태·행동으로 계산을 표현했다.'},
    {title:'질문을 전한 사람과, 새로운 모형을 만든 사람',text:'뉴먼의 강의와 격려는 튜링의 문제의식과 연구 진행에 연결된다. 튜링은 자신의 기계 모형과 논증을 전개했다. 두 사람의 관계를 영향과 연구 피드백으로 읽고, 처치의 박사 지도와 구분한다.'}
  ],videos:[],references:[
    {title:'King’s College Cambridge · Alan Mathison Turing',url:kings,location:'The Entscheidungsproblem 절. 1935년 봄 Part III 기초수학 강의, 결정문제 소개와 1935–1936년 뉴먼의 지도. 기관 아카이브 전시 설명을 확인했으며 당시 강의 원고를 직접 읽은 것은 아니다.'},
    {title:'M. H. A. Newman (1955) · Alan Mathison Turing · AMT/A/36 원본',url:memoir,location:'인쇄 p.256(PDF6) Mathematical logic의 결정 절차·기계적 과정 설명과 p.258(PDF8)의 계산 표현 논의. 소장기관의 원본 스캔을 대조했다. 1935년 강의의 직접 인용으로 사용하지 않는다.'},
    {title:'Turing · On Computable Numbers · 원논문',url:turing,location:'§1 pp.230–232, §3 Example I p.233, §9 pp.249–251, §11 p.259. 연결한 PDF 첫 쪽이 인쇄 230쪽이다. 테이프 예제의 네 행과 기호·상태·행동을 원문 수식과 대조했다.'},
    {title:'University of Manchester · Digital 60: Max Newman',url:'https://curation.cs.manchester.ac.uk/digital60/www.digital60.org/about/biographies/maxnewman/index.html',location:'강의와 튜링 초고, 전쟁 중 역할, 맨체스터의 연구 환경과 튜링 영입. 기관의 역사 설명과 하드웨어 설계 기여에 대한 주의를 함께 확인했다.'},
    {title:'Princeton University Library · Alan Turing and Princeton',url:'https://manuscripts.blogs.princeton.edu/2015/01/29/alan-m-turing-and-princeton/',location:'1936–1938년 처치의 지도와 1938년 박사 학위. 뉴먼의 앞선 연구 지도·영향과 구분하기 위한 근거.'}
  ]};
  const profile={id:'max-newman',name:'Max H. A. Newman',nameKo:'맥스 뉴먼',aliases:['Max Newman','Maxwell Herman Alexander Newman','뉴먼','맥스뉴먼'],tagline:'결정문제의 강의에서, 기계적 계산의 질문으로',roles:['기초수학 · 계산의 역사','튜링 연구의 격려와 피드백'],tags:['foundations'],intro:'1935년 결정문제를 소개한 강의와 튜링의 연구를 격려한 관계를 읽는다. 강의 맥락은 소장기관의 역사 기록, 후대 설명은 뉴먼 자신의 회고, 구체적인 계산 모형은 튜링 원논문을 따라 구분해 살펴본다.',works:[{id:'newman-decision-1935',year:1935,dateLabel:'1935년 봄 강의 · 관련 원자료 1936년 논문·1955년 회고',title:'판정을 기계적인 절차로 할 수 있을까?',summary:'기초수학 강의에서 결정문제를 소개하고 튜링의 연구를 격려했다. 어떤 절차를 기계적이라고 할 수 있는지 정확하게 다루는 질문이 튜링의 계산 모형과 이어지는 과정을 읽는다.',type:'강의·연구맥락',track:'foundations',people:['Max H. A. Newman'],sources:[{title:'1935년 강의의 맥락 · King’s College 아카이브',url:kings},{title:'뉴먼 자신의 1955년 회고 원본',url:memoir},{title:'튜링의 계산 모형 · 원논문',url:turing}],caveat:'1935년 강의 자체의 원고·녹취는 이번 검토에서 확인하지 못했다. 강의 영향은 기관의 역사 기록, 회고는 1955년 원본, 기계 모형은 튜링 원논문을 따른다. 작은 세계의 계산과 테이프 예제를 일반 결정 절차의 구현으로 제시하지 않는다.',content}]};
  window.ATLAS_NEWMAN_PROFILE=profile;window.ATLAS_PEOPLE_PROFILES.push(profile);
})();
