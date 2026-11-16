/* A sourced person-work record. The original equations are mounted by the shared paper panel. */
(function(){
 'use strict';
 const paper='https://people.cs.umass.edu/~barto/courses/cs687/williams92simple.pdf';
 const publisher='https://link.springer.com/article/10.1007/BF00992696';
 const backprop='https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf';
 const r1='https://arxiv.org/pdf/2501.12948v1';
 const reference=(title,url,location)=>({title,url,location});
 const sources={
  update:reference('Williams (1992) · Bernoulli-logistic 단위의 REINFORCE 갱신',paper+'#page=7','대학 보관 저자 형식 PDF 7쪽 · 식(7)–(9). 화면은 입력 xⱼ=1인 한 단위의 연결값 θ로 구체화한다.'),
  baseline:reference('Williams (1992) · 보상의 기준선과 현재 선택의 독립 조건',paper+'#page=7','PDF 5쪽 §4의 일반 조건, 7쪽 식(9)–(10). 원문의 이동 평균은 과거 보상을 이용한다.'),
  expectation:reference('Williams (1992) · 기대 보상과 평균 갱신의 관계',paper+'#page=5','PDF 5쪽 §3·§4 Theorem 1. 같은 학습률을 사용할 때 기대 갱신과 기대 보상 기울기의 관계를 제시한다.'),
  backprop:reference('Rumelhart·Hinton·Williams (1986) · 역전파 공동논문',backprop,'출력 오차를 연결값의 기울기로 전달해 중간 표현을 학습하는 절차. 보상 신호를 정답 출력과 같은 것으로 놓지 않는다.'),
  r1:reference('DeepSeek-R1 · 2025년 1월 최초 보고서 v1',r1+'#page=5','PDF 5쪽 §2.2.1 식(1)–(3), 6쪽 §2.2.2. GRPO의 묶음별 상대 보상·클리핑·KL 항과 R1-Zero의 보상 구성을 구분한다.')
 };
 const content={article:{
  question:'어떤 행동이 정답인지 알려 주지 않아도,\n선택 뒤의 보상으로 다음 선택을 배울 수 있을까?',
  opening:[
   '정답 행동을 하나씩 보여 주기 어려운 문제에서도, 기계가 한 선택의 결과를 좋고 나쁨으로 평가할 수는 있다. 어느 버튼을 눌러야 하는지는 알려 주지 않지만, 누른 뒤 얻은 점수는 알려 주는 상황이다. 이 점수만으로 다음에는 무엇을 더 선택할지 배울 수 있을까?',
   '윌리엄스는 1992년 REINFORCE에서 확률적으로 출력을 고르는 신경 단위를 다뤘다. 연결값은 어느 출력을 더 자주 고를지에 영향을 준다. 한 번 선택하고 보상을 받으면, 그 선택의 로그 확률이 연결값에 얼마나 민감했는지를 보상 신호와 곱해 연결값을 바꾼다. 환경이 왜 그 보상을 주었는지를 미분하거나, 선택하지 않은 모든 행동의 정답을 받는 방식은 아니다.',
   '중요한 연결은 “보상 × 선택의 흔적”이다. 선택이 나오기 쉬워지는 방향을 나타내는 기울기에 보상에서 기준선을 뺀 값을 곱한다. 기준보다 나은 결과라면 그 선택의 확률을 높이는 쪽으로, 기준보다 낮다면 낮추는 쪽으로 조정한다. 보상이 양수라도 기준보다 낮을 수 있다. 무엇을 좋은 결과로 볼지는 보상의 절대 부호만으로 정해지지 않는다.',
   '개별 경험의 결과가 들쭉날쭉해도, 원논문은 정해진 조건에서 평균 갱신이 기대 보상을 높이는 기울기와 어떤 관계를 갖는지 보였다. 모든 한 번의 갱신이 성능을 올린다거나, 어떤 환경에서도 가장 좋은 정책에 도달한다는 보장은 아니다. 확률적인 선택과 스칼라 평가를 학습 신호로 연결한 아이디어가 핵심이다.',
   '아래에서는 이 발상을 두 행동 A·B를 고르는 한 단위로 읽는다. 보상 A=1, B=3과 두 행동의 확률은 직접 정한 사례다. A를 선택한 경험과 B를 선택한 경험을 눌러 비교하고, 두 가능성을 확률로 합친 평균 갱신도 확인할 수 있다. 버튼으로 고른 경험과 무작위로 수집한 표본 실험, 원논문의 결과를 구분한다.'
  ],
  visual:{id:'reinforce-reward-learning',navLabel:'보상에서 선택의 학습 신호로',title:'선택 뒤의 평가를, 다음 선택의 확률로 잇다',caption:'먼저 원문의 일반 갱신식과 로그 확률 기울기를 읽고, 두 행동 사례에서 보상·기준선·선택 확률이 어떤 방향의 갱신을 만드는지 살펴보세요.',source:sources.update,reading:{sources}},
  takeaway:{title:'정답 행동 대신, 경험의 평가로 선택하는 방식을 바꾼다',text:'REINFORCE는 확률적으로 나온 선택의 로그 확률 기울기에 보상 신호를 연결한다. 어떤 행동이 정답인지 직접 주지 않는 상황에서도, 기대 보상을 학습의 대상으로 삼으려는 선택이다.'},
  technical:{title:'원문 수식·기준선·기대값·후속 연구의 차이 더 읽기',paragraphs:[
   '대학에 보관된 저자 형식 PDF는 27쪽이며 자체 쪽수가 1–27로 매겨져 있다. 출판사 서지의 Machine Learning 8, pp.229–256과 쪽수를 일대일로 치환하지 않는다. 이 카드의 PDF 쪽수는 실제 표시한 보관본의 쪽수다.',
   'PDF 5쪽 §4는 Δwᵢⱼ=αᵢⱼ(r−bᵢⱼ)eᵢⱼ와 eᵢⱼ=∂ln gᵢ/∂wᵢⱼ를 정의한다. gᵢ는 해당 단위가 실제 출력을 낼 확률 또는 확률밀도를 나타낸다. 여기의 characteristic eligibility는 보상을 그 연결에 어떤 부호와 크기로 연결할지 나타내는 로그 미분이다.',
   '같은 쪽의 기준선 조건은 W와 단위 입력 xⁱ가 주어졌을 때 bᵢⱼ가 현재 출력 yᵢ와 조건부 독립이어야 한다는 것이다. 원문 PDF 7쪽 식(9)–(10)은 현재 출력이나 현재 보상으로 계산하지 않는, 과거 보상의 이동 평균을 한 예로 제시한다. 화면의 b=E[r]는 두 보상을 모두 정해 놓은 직접 사례에서 계산한 기준선이며, 원문의 온라인 추정기를 재현한 것이 아니다. 각 갱신을 계산할 때 그 기준선 값은 고정한다.',
   'PDF 4쪽 식(3)의 logistic 함수와 7쪽 식(7)을 입력 xⱼ=1인 한 단위로 좁히면 p=σ(θ), e=a−p가 된다. a=0을 A, a=1을 B로 표시하므로, 화면의 갱신은 θ′=θ+α(r−b)(a−p)다. A의 확률은 1−p, B의 확률은 p다. θ가 줄면 A의 선택 확률이 늘어난다는 점도 함께 읽어야 한다.',
   'PDF 5쪽 §3은 즉시 보상 문제의 기대 보상 E[r|W]를 목적함수로 삼고 입력·환경 분포에 대한 정상성 등 가정을 밝힌다. §4 Theorem 1은 허용된 조건에서 기대 갱신과 기대 보상 기울기의 내적이 음수가 아니며, 모든 연결에 같은 학습률 α를 쓰면 E[ΔW|W]=α∇E[r|W]가 됨을 제시한다. 한 경험의 유한한 갱신이 실제 보상을 반드시 높인다는 명제와 다르다.',
   '직접 정한 두 행동 사례에서는 E[r]=(1−p)r_A+pr_B이고, 두 행동의 갱신 방향을 확률로 합하면 E[(r−b)(a−p)]=p(1−p)(r_B−r_A)다. 행동과 독립인 기준선은 이 평균을 바꾸지 않지만 개별 갱신의 분포와 분산은 바꾼다. 기대 보상 자체를 기준선으로 쓴다고 해서 언제나 최소 분산이 되는 것은 아니다.',
   'PDF 7쪽 말미 §5부터는 시간에 걸친 신용 할당이 필요한 episodic 문제로 확장한다. 즉시 보상의 한 단위 사례만으로 긴 행동열의 정답이나 지연 보상 문제 전체가 해결됐다고 말하지 않는다. 이 화면은 원논문의 실험 성능이나 실제 에이전트 학습을 재실행하지 않는다.',
   '역전파는 미분을 앞선 연결로 전달하는 계산 방법이고, REINFORCE는 확률적 선택과 보상에서 갱신 신호를 구성한다. 여러 층의 정책 신경망이라면 로그 확률의 기울기를 계산하는 데 역전파를 사용할 수 있다. 두 개념을 서로 대체하는 진영으로 나누지 않는다.',
   'DeepSeek-R1 v1은 같은 질문의 여러 답변에서 상대 보상을 구하는 GRPO를 사용한다. 보고서 식(1)–(3)의 그룹별 정규화, 확률비 클리핑과 KL 항을 이 화면의 한 단위 갱신식과 동일시하지 않는다. 두 카드를 잇는 링크는 학습 신호를 비교하는 읽기 경로이며, 윌리엄스와 DeepSeek 연구자 사이의 개인적 지도·공동연구 관계를 뜻하지 않는다.'
  ],formula:'원문 일반형: Δwᵢⱼ = αᵢⱼ(r − bᵢⱼ)eᵢⱼ\neᵢⱼ = ∂ log gᵢ / ∂wᵢⱼ\n두 행동 사례: p(B)=σ(θ), a∈{0,1}, score=a−p\nθ′ = θ + α(r−b)(a−p)\nE[r]=(1−p)r_A+pr_B\nE[score × (r−b)] = p(1−p)(r_B−r_A)'}},
  keyIdeas:[
   {title:'정답 행동의 지시 대신, 선택 결과의 평가에서',text:'어떤 행동을 해야 하는지 직접 가르치는 대신, 확률적으로 선택한 행동과 그 결과의 보상을 연결한다.'},
   {title:'선택의 로그 확률 기울기를 보상과 곱한다',text:'보상 함수 자체를 미분할 수 없어도, 자신이 그 선택을 낼 확률이 연결값에 얼마나 민감한지는 계산할 수 있다.'},
   {title:'평균의 학습 방향과 한 경험의 결과를 구분한다',text:'개별 갱신에는 변동이 있다. 기대 보상·평균 갱신의 관계와 기준선의 조건을 함께 읽는다.'}
  ],
  videos:[],references:[
   reference('Ronald J. Williams · Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning',paper,'1992년 논문의 대학 보관 저자 형식 본문·지면 확인. PDF 4쪽 식(3), 5쪽 §§3–4·Theorem 1·번호 없는 일반 갱신식, 7쪽 식(7)–(10)·§5 도입. 보관본 자체 쪽수이며 학술지 pp.229–256과 직접 대응시키지 않는다.'),
   reference('Machine Learning · 출판사 서지와 DOI',publisher,'1992년 5월, Volume 8, pp.229–256, 단독저자 Ronald J. Williams, DOI 10.1007/BF00992696. 출판사 서지와 대학 보관 본문의 역할을 구분한다.'),
   sources.backprop,
   sources.r1
  ]
 };
 window.ATLAS_WILLIAMS_REINFORCE_WORK={id:'williams-reinforce-1992',year:1992,dateLabel:'1992 · Machine Learning 8, pp.229–256',title:'REINFORCE · 보상으로 행동 선택의 확률을 배우다',summary:'정답 행동을 직접 알려 주는 대신, 선택의 로그 확률 기울기와 보상 신호를 연결해 기대 보상을 학습하려 했다.',type:'학술논문',track:'neural',people:['Ronald J. Williams'],authorNote:'Ronald J. Williams의 1992년 단독저자 논문이다. 확률적 출력과 보상에서 학습 신호를 구성하는 연구로, 1986년 역전파 공동논문과 구분한다.',sources:[reference('Williams (1992) · 대학 보관 원문',paper),reference('Machine Learning · DOI와 출판 서지',publisher)],caveat:'원문 수식과 직접 정한 두 행동 사례를 구분한다. 수동으로 고른 경험은 실제 정책의 무작위 표본 수집 실험이 아니며, 웹 화면은 1992년 논문이나 DeepSeek-R1의 모델·성과를 재현하지 않는다.',related:['backprop','deepseek-r1'],content};
})();
