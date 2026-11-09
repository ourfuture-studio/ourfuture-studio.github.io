/* The two-stage 2018 method, not later GPT few-shot prompting.
 * Chosen logits expose the objective only; no model weights are loaded. */
(function(){
  'use strict';
  const paper='https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf';
  const announcement='https://openai.com/index/language-unsupervised/';
  const at=(page,label)=>({title:'Radford 외 (2018) · PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const task=(id,label,fields,output,explanation)=>({id,kind:id,label,fields,output,explanation,scope:'직접 준비한 한국어 입력입니다. 원래 데이터셋의 표본이나 GPT-1의 판정 결과가 아닙니다. 분절과 출력 종류를 설명하기 위한 구성이며 실제 BPE·추론을 실행하지 않습니다.',source:at(4,'§3.3 · Fig.1 · 과제별 입력 변환')});
  window.AtlasEntries.register({
    id:'gpt1',
    record:{
      title:'글에서 배운 언어 경험을, 새로운 과제로 옮기다',
      summary:'알렉 래드퍼드와 공동연구자들은 다음 말을 예측하며 배운 언어모형을 출발점으로 삼았다. 과제마다 구조를 크게 바꾸는 대신 입력을 토큰의 흐름으로 구성하고, 정답 라벨로 기존 모형과 새 출력층을 함께 미세조정했다.',
      detail:'',question:'',
      sources:[{title:'Improving Language Understanding by Generative Pre-Training · 2018 원고',url:paper},{title:'2018-06-11 · 공식 연구 발표',url:announcement}],
      caveat:'GPT-1은 이 2018년 연구를 구분하는 후대 식별명이다. 원고는 사전학습 뒤 과제별로 가중치를 바꾸는 미세조정을 다룬다. 아래 입력·logit 수치는 직접 정했으며 원래 모형의 학습·정답 판정이 아니다. 기존 decoder도 조정하는 방법과 고정 표현의 분류층만 학습하는 방법을 구분한다.'
    },
    content:{
      article:{
        question:'다음 말을 예측하며 배운 경험을,\n다른 언어 과제를 푸는 출발점으로 쓸 수 있을까?',
        opening:[
          '영화평을 긍정·부정으로 분류하려면 그 정답을 붙인 예가 필요하다. 두 문장의 관계를 판단하려면 또 다른 정답 자료가 필요하다. 그에 비해 별도 과제 라벨을 붙이지 않은 이야기와 글은 많다. 그런 글에서 배운 언어의 패턴을, 과제마다 처음부터 다시 배우는 대신 가져다 쓸 수 있을까?',
          '알렉 래드퍼드(Alec Radford), Karthik Narasimhan, Tim Salimans, Ilya Sutskever는 먼저 앞선 말에서 다음 말을 예측하는 언어모형을 학습했다. 정답 라벨이 없다는 말은 학습 신호가 없다는 뜻이 아니다. 글에 실제로 이어지는 다음 토큰이 목표가 된다. 이 예측의 오차로 단어와 문맥을 표현하는 Transformer decoder의 가중치를 조정한다.',
          '그다음 각 과제는 같은 사전학습 가중치를 출발점으로 가져간다. 문장 분류, 두 문장의 관계, 보기 중 답 고르기를 하나의 토큰 흐름으로 구성하고, 마지막 표현에 과제 출력층을 붙인다. 정답 라벨의 오차로 새 출력층과 기존 decoder를 함께 바꾼다. 과제마다 별도로 미세조정하므로, 하나의 고정된 모형에 예시만 입력해 여러 과제를 처리하는 구성과는 다르다.'
        ],
        visual:{
          id:'language-to-task',navLabel:'언어 경험을 과제로',
          title:'같은 사전학습 가중치에서, 다른 과제의 학습을 시작하다',
          caption:'먼저 글 자체가 다음 말의 정답을 주는 모습을 살펴보세요. 이어서 네 과제의 입력을 같은 decoder가 읽을 수 있는 순서로 바꾸고, 어떤 파라미터를 추가하고 조정하는지 비교합니다. 원문의 구조도와 실험 그림도 함께 읽습니다.',
          stages:[
            {id:'experience',label:'글에서 경험을 쌓다',text:'앞선 토큰만 읽고 다음 실제 토큰을 맞힌다. 매번 사람이 문장에 별도 과제 라벨을 달지 않아도, 이어지는 글이 예측의 목표를 제공한다. 그 오차로 언어모형의 가중치를 학습한다.'},
            {id:'transfer',label:'과제로 옮겨 배우다',text:'같은 사전학습 초기값을 과제마다 가져가 입력을 한 흐름으로 구성한다. 과제 출력층을 추가하고, 정답 라벨로 기존 decoder와 새 파라미터를 함께 미세조정한다.'},
            {id:'evidence',label:'원문에서 확인하다',text:'Fig.1의 모형·학습 목표·네 입력 변환을 보고, Fig.2에서 사전학습 표현의 전이와 별도 zero-shot 관찰을 구분해 읽는다. 아래 작은 계산의 결과와 원문 실험을 합치지 않는다.'}
          ],
          experience:{
            tokens:['The','cat','sat','on','the','mat','.'],translation:'고양이가 매트 위에 앉았다. 직접 정한 일곱 토큰의 문장을 사용한다.',
            scope:'실제로 이어지는 토큰을 목표로 삼는 관계를 보여 주는 자체 문장입니다. 원래 BooksCorpus 문장·BPE 분절·학습된 다음 토큰 확률을 표시하지 않습니다. 각 보기의 정답은 글에서 주어지며 모형이 맞혔다고 표시하는 결과가 아닙니다.',
            source:at(3,'§3.1 · 식 (1)–(2) · 언어모형 사전학습')
          },
          transfer:{
            markers:{start:'〈Start〉',delimiter:'〈Delim〉',extract:'〈Extract〉'},
            tasks:[
              task('classification','문장 분류',{text:['이','영화는','다시','보고','싶다','.']},'긍정 / 부정 등 정해 둔 라벨로 분류','문장과 끝의 Extract 위치를 읽어 그 마지막 표현으로 라벨을 예측한다. 언어모형의 다음 단어 어휘 분포와 과제 라벨의 분포는 출력 공간이 다르다.'),
              task('entailment','문장 사이의 관계',{premise:['고양이가','소파에서','잔다','.'],hypothesis:['고양이가','쉬고','있다','.']},'함의 / 중립 / 모순 등의 관계 라벨','전제와 가설을 구분 토큰으로 나누되 한 시퀀스로 읽는다. 읽는 망을 새 과제 전용 구조로 크게 바꾸는 대신, 입력의 순서와 경계를 알려 준다.'),
              task('similarity','두 문장의 유사도',{first:['비가','내린다','.'],second:['비가','온다','.']},'두 문장의 의미 유사성 또는 같은 뜻 여부','A 다음 B, B 다음 A의 두 입력을 각각 같은 decoder로 처리한다. 두 마지막 표현을 원소별로 더한 다음 선형 출력층에 넣는다. 두 확률을 평균하는 연산이 아니다.'),
              task('choice','보기 중 답 고르기',{context:['민수는','먼','길을','걸었다','.'],question:['그는','무엇을','했을까','?'],answers:[{id:'rest',label:'보기 1',tokens:['벤치에서','쉬었다','.']},{id:'run',label:'보기 2',tokens:['계속','달렸다','.']}]},'보기마다 점수를 구해 선택지 사이에서 정규화','본문과 질문 뒤에 구분 토큰과 후보 답을 붙인다. 후보별 시퀀스를 각각 처리한 점수를 선택지 간 softmax로 비교한다. 이 짧은 입력에서 어느 보기가 정답인지는 모형의 실제 추론으로 제시하지 않는다.')
            ],
            loss:{
              taskLabels:['긍정','부정'],taskLogits:[1.2,-.4],targetIndex:0,
              lmVocabulary:['다시','보고','싶다'],lmLogits:[[.6,-.2,.1],[.2,.7,-.1]],lmTargets:[0,1],
              lambdaValues:[0,.5,1],initialLambda:.5,
              scope:'한 분류 예시의 두 라벨 logit와 두 LM 위치의 세 후보 logit를 직접 정했습니다. 과제 NLL 하나와 LM 토큰 NLL 두 개의 합을 사용합니다. 원문 식 (5)의 최대화 목표에 음수를 붙여 최소화할 손실로 표시합니다. λ를 바꾸면 합산 기준도 달라지므로 총손실만으로 λ 사이의 모형 성능을 비교하지 않습니다. 표시한 미분은 logit에서의 국소 학습 신호이며 실제 decoder 파라미터 갱신을 실행하지 않습니다.',
              source:at(3,'§3.2 · 식 (3)–(5) · 보조 언어모형 목표')
            },
            scope:'과제마다 동일한 사전학습 가중치에서 별도로 미세조정합니다. 같은 가중치를 고정한 채 위 네 과제를 동시에 수행했다는 뜻이 아닙니다. Start·Delim·Extract는 원문 그림의 역할을 나타내는 자체 표시이며 실제 tokenizer의 token ID가 아닙니다. 기존 decoder θ, 새 과제 출력층 Wy, 새 구분 토큰의 임베딩을 조정하는 연결을 보여 주며 전체 훈련을 실행하지 않습니다.',
            source:at(4,'Fig.1 · 네 입력 변환과 같은 decoder의 전이')
          },
          evidence:[
            {
              id:'architecture',file:'gpt1-2018-architecture-tasks.png',title:'원문의 구조와 네 과제의 입력 변환',
              caption:'Fig.1의 왼쪽은 12개 Transformer decoder block과 언어 예측·과제 분류 출력이다. 오른쪽은 문장 분류, 전제·가설, 두 순서의 문장 유사도, 선택지별 입력을 보여 준다. 과제마다 전용 망을 크게 새로 만드는 대신, 구조화된 입력을 하나의 토큰 흐름으로 바꾸는 발상이다.',
              scope:'유사도 두 줄은 같은 파라미터를 사용하고 표현을 더한 뒤 과제 출력을 계산합니다. 객관식의 여러 줄은 서로 다른 보기이며 같은 모형으로 점수를 구합니다. 그림 전체의 과제들은 각각 별도로 미세조정합니다. 학습된 위치 임베딩을 사용한 2018년 모형이며, 앞 Transformer 카드의 사인·코사인 위치 계산을 그대로 실행한 그림이 아닙니다.',
              source:at(4,'Fig.1 · 모델과 과제별 입력 변환'),
              credit:{title:'Radford·Narasimhan·Salimans·Sutskever (2018) · Fig.1',url:paper+'#page=4',note:'공식 PDF의 두 부분을 함께 직접 렌더했습니다. 원래 라벨·박스·화살표를 보존하고 한국어 설명을 밖에 붙였습니다. 별도의 그림 재사용 허가나 CC 라이선스를 확인했다는 뜻은 아닙니다.'}
            },
            {
              id:'transfer',file:'gpt1-2018-transfer-zero-shot.png',title:'얼마나 전이했는가와, 사전학습 중 나타난 별도 관찰',
              caption:'Fig.2 왼쪽은 전이하는 층 수를 바꾸며 RACE와 MultiNLI의 학습·개발 성능을 비교한다. 오른쪽은 사전학습 갱신 수에 따른 네 과제의 zero-shot 휴리스틱을 Transformer와 LSTM에서 관찰한다. 두 패널은 서로 다른 실험을 담는다.',
              scope:'왼쪽은 두 y축의 척도가 달라 RACE와 MultiNLI의 곡선 높이를 직접 비교하지 않습니다. x축의 끝점을 특정 embedding·block 조합으로 임의 해석하지 않습니다. 오른쪽 y축은 상대 정규화 성능이며 그대로 정답률이 아닙니다. 수동 휴리스틱의 선택된 관찰을 모든 과제의 무학습 수행이나 후대 GPT-3의 문맥 내 학습으로 바꾸어 읽지 않습니다.',
              source:at(7,'Fig.2 · 전이 깊이와 zero-shot 관찰'),
              credit:{title:'Radford 외 (2018) · Fig.2',url:paper+'#page=7',note:'원문 그래프의 두 패널·축·범례를 보존해 렌더했습니다. 좌표를 다시 추정하거나 위의 자체 logit 계산 결과로 대체하지 않았습니다.'}
            }
          ],
          scope:'직접 정한 문장·입력 변환·logit 손실 계산과 원문의 그림을 구분합니다. 원래 GPT-1 가중치·BooksCorpus 훈련·과제 미세조정·벤치마크 평가를 이 화면에서 실행하지 않습니다.',
          source:at(2,'두 단계 학습과 전이의 연구 질문')
        },
        takeaway:{title:'언어를 배우는 경험을, 과제를 배울 초기값으로 삼다',text:'먼저 글 자체에서 다음 토큰을 예측하며 가중치를 학습하고, 그 가중치에서 각 과제의 지도 학습을 시작한다. 과제를 바꿀 때 입력의 구조와 출력층을 조정하면서 기존 표현도 함께 바꾼다. 생성적 사전학습과 판별적 미세조정을 연결한 접근이다.'},
        technical:{
          title:'사전학습·미세조정의 목표, 입력과 실험 범위를 더 읽기',
          paragraphs:[
            '공식 12쪽 원고의 제목은 Improving Language Understanding by Generative Pre-Training이며 날짜가 인쇄돼 있지 않고 Preprint·Work in progress라고 적혀 있다. 연결된 공식 발표는 2018-06-11이다. GPT-1은 이후 GPT 계열과 구분하기 위한 식별명이며 원제에 들어 있는 명칭으로 서술하지 않는다. 네 공동저자는 Radford·Narasimhan·Salimans·Sutskever 순이다.',
            '§3.1의 L1은 앞선 최대 k개 토큰을 조건으로 실제 다음 토큰의 로그 확률을 합해 최대화한다. 사람의 과제별 라벨이 없어도 관측된 다음 토큰이 학습 목표를 제공한다. 오늘날 자기지도 학습으로 설명할 수 있는 구조지만, 원문은 unsupervised pre-training이라는 용어를 쓴다. 화면은 직접 정한 일곱 토큰의 접두사와 다음 목표의 관계만 보여 주고, 학습한 어휘 확률을 만들어 내지 않는다.',
            '원문의 모형은 앞선 위치만 참고하는 12개 decoder block, 은닉 768성분, 12개 Head, FFN 안쪽 3,072성분을 사용한다. 학습된 위치 임베딩을 쓴다. 2017년 번역 Transformer의 인코더–디코더 전체나 사인·코사인 위치 표현을 그대로 복사한 설정이 아니다. 언어모형의 출력에서는 임베딩 행렬의 전치를 사용하는 식 (2)를 확인할 수 있다.',
            '사전학습 자료는 7,000권이 넘는 미출판 책을 포함한 BooksCorpus다. 원문은 byte pair encoding의 40,000 merges를 적는다. 이를 정확히 40,000개의 전체 어휘라고 바꾸지 않는다. 길이 512 토큰의 연속 구간으로 학습했으며, 화면의 띄어쓰기·문장부호 분절은 원래 BPE를 실행한 결과가 아니다.',
            '§3.2는 사전학습 모형을 통과한 마지막 표현에 선형 출력층 Wy와 softmax를 추가해 과제 라벨을 예측한다. 추가되는 파라미터가 Wy와 새 구분 토큰 임베딩이라는 서술은 기존 decoder를 고정한다는 뜻이 아니다. 과제의 오차가 사전학습 파라미터에도 전달되어 함께 조정된다. 고정 특징에서 분류층만 학습하는 선형 프로빙과 구분한다.',
            '원문 식 (5)는 최대화하는 L3=L2+λL1(C)이고 §4.1의 λ는 0.5다. 보조 LM 목표는 미세조정할 과제 자료 C의 텍스트에서 계산한다. 별도의 사전학습 책 전체를 매번 다시 읽는 항으로 표시하지 않는다. 화면은 부호를 바꾼 과제 NLL+λ·LM NLL을 최소화하는 방식으로 표시한다. 정답·어휘 후보를 직접 정한 logit의 계산이며 원모형의 예측이 아니다.',
            '화면의 LM NLL은 두 위치 손실의 합이고 과제 손실은 한 분류 예시다. 길이와 합산 범위가 달라지면 수치 크기도 달라진다. λ 선택은 다른 가중 목적을 정의하므로 손실 숫자만으로 더 좋은 모형을 결정할 수 없다. logit에 대한 미분 p−y와 λ(p−y)를 계산하더라도 전체 decoder의 기울기나 파라미터 갱신을 실행했다는 뜻은 아니다.',
            '보조 목표가 모든 과제에서 항상 개선을 보장하지는 않는다. 원문 Table 5에서 여덟 과제의 서로 다른 지표를 평균한 값은 전체 모형 74.7, auxiliary LM을 뺀 경우 75.0이다. 이를 하나의 공통 정답률이라고 부르지 않는다. 같은 표의 사전학습을 뺀 조건과도 구분해 읽어야 한다. 원문이 보고한 전체 효과와 개별 구성요소의 효과를 하나로 합치지 않는다.',
            'Fig.1의 Start·Delim·Extract와 §3.3의 시작·종료 표기는 입력 경계와 마지막 표현을 지정하는 역할을 한다. 끝의 Extract 표현은 앞선 입력 전체를 읽을 수 있고 과제 출력층으로 간다. 마지막 실제 내용 단어를 정답 라벨로 읽거나, 미래의 정답 토큰을 decoder 입력에 넣는 설명과 다르다.',
            '유사도는 A–B와 B–A를 각각 처리한 두 마지막 표현을 원소별로 더한 다음 선형 층으로 보낸다. 두 softmax 확률의 평균이 아니다. 질문·객관식은 본문 z와 질문 q를 연결하고 구분 토큰 뒤에 각 후보 답 a_k를 붙인다. 각 후보의 점수를 선택지 간 softmax로 정규화한다. 이 분포는 어휘 전체에 대한 다음 토큰 확률과 다르다.',
            '각 과제는 같은 사전학습 모형에서 따로 미세조정한다. 화면에서 과제를 바꾸는 것은 하나의 고정 모형이 정답을 즉시 추론하는 동작을 실행한 것이 아니다. GPT-3 카드에서 다룰 가중치를 바꾸지 않는 문맥 속 예시 제공과 이 2018년 미세조정을 나누어 읽는다.',
            'Fig.2 왼쪽의 RACE·MultiNLI 전이 실험은 얼마나 깊은 표현을 가져가는지를 비교한다. 두 y축의 범위와 학습·개발 곡선을 함께 읽는다. 오른쪽은 사전학습 중 수동 휴리스틱으로 관찰한 네 zero-shot 과제의 상대 성능이다. 저자는 이 관찰이 사전학습 전이에 대한 한 가지 단서를 준다고 해석하지만, 지식·문맥 처리 중 무엇이 개선을 일으키는지 완전히 구분해 검증한 결론으로 확대하지 않는다.',
            '공식 발표는 사전학습과 지도 학습을 결합한 이전 연구, Semi-supervised Sequence Learning과 ULMFiT 등의 연관성을 명시한다. Transformer를 사용하고 더 넓은 과제로 전이를 평가한 이 연구를, 사전학습이나 전이 학습 전체의 최초 발명으로 소개하지 않는다. 원문은 12개 평가 과제 중 9개에서 당시 비교 결과를 갱신했다고 보고하며, 모든 과제와 환경에서의 일반 지능을 검증한 것은 아니다.',
            '공개된 당시 코드 저장소는 특정 ROCStories 결과의 실행을 안내한다. 저장소 README가 적은 여러 번 실행의 중앙값과 원고의 단일 결과를 조용히 같은 수치로 합치지 않는다. 이 카드에서는 코드 문서를 확인했지만 가중치를 내려받거나 원래 실험을 실행하지 않았다.'
          ],
          formula:'원문은 로그 확률을 최대화:\nL₁ = Σᵢ log P(uᵢ | 앞선 토큰; θ)\nL₂ = Σ(x,y) log P(y | x; θ, Wy)\nL₃ = L₂ + λL₁(C)\n\n화면은 같은 부호를 바꾼 손실을 최소화:\nNLL_task = −log P(정답 라벨)\nNLL_LM = Σ위치 −log P(실제 다음 토큰)\nJ = NLL_task + λ NLL_LM\n국소 미분: ∂J/∂task_logit = p−y\n∂J/∂LM_logit = λ(p−y)'
        }
      },
      keyIdeas:[
        {title:'글 자체가 예측의 정답을 제공한다',text:'사람이 모든 문장에 감정·관계 라벨을 붙이지 않아도 실제 다음 토큰이 관측된다. 그다음을 맞히는 일을 반복하며 문맥을 표현하는 가중치를 먼저 학습한다. 라벨이 없다는 말과 목표가 없다는 말을 구분한다.'},
        {title:'기존 경험을 버리지 않고, 새 과제의 출발점으로 가져간다',text:'과제마다 무작위 상태에서 망 전체를 새로 배우는 대신 사전학습 가중치에서 시작한다. 새 라벨의 오차로 이미 배운 표현도 조정한다. 사전학습과 미세조정은 입력에 예시를 덧붙이는 한 번의 추론이 아니라 서로 다른 학습 단계다.'},
        {title:'과제의 구조를, 같은 모형이 읽을 토큰 순서로 바꾼다',text:'전제·가설이나 본문·질문·보기를 서로 구분해 하나의 흐름으로 만든다. 같은 decoder 구조를 재사용하면서 마지막 표현을 과제 출력층으로 보낸다. 유사도 두 순서의 표현 결합과 보기별 점수 비교는 서로 다른 방식이다.'},
        {title:'언어를 예측하는 능력과 과제를 푸는 능력의 연결을 실험한다',text:'다음 토큰 예측을 잘 배우는 일이 다른 과제에도 도움이 되는지는 별도 평가가 필요하다. 원문은 과제별 성능과 사전학습·전이 깊이 등의 조건을 비교했다. 글을 많이 읽었다는 사실만으로 모든 지식이나 추론 능력을 얻었다고 가정하지 않는다.'}
      ],
      videos:[{title:'Stanford CS224N (2019) · Modeling contexts of use: Contextual Representations and Pretraining',url:'https://www.youtube.com/watch?v=S-CspeZ8FHc',channel:'Stanford CS224N · 2019 공식 과정',note:'공식 일정의 2월 19일 강의와 개별 영상 연결을 확인했다. 문맥 표현·사전학습의 후대 배경 강의이며 GPT-1 원저자 발표나 원논문 전용 해설로 표시하지 않는다. GPT-1의 개별 설명 구간·현재 영상 재생·전체 시청은 확인하지 않았다.',sourceUrl:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html'}],
      references:[
        {title:'Radford·Narasimhan·Salimans·Sutskever · Improving Language Understanding by Generative Pre-Training',url:paper,location:'공식 12쪽 원고. pp.1–2: 연구 질문·두 단계 학습·관련 연구. p.3 §3.1–3.2, 식 (1)–(5): LM·과제·결합 목표. p.4 Fig.1·§3.3: 네 입력 변환. pp.4–5 §4.1: 구조·자료·λ 설정. p.7 Fig.2: 전이 깊이와 zero-shot 관찰. p.8 Table 5: 구성요소 비교. 관련 지면을 렌더해 대조했다.'},
        {title:'OpenAI · Improving language understanding with unsupervised learning · 2018-06-11',url:announcement,location:'공식 발표 날짜, 두 단계 학습, ULMFiT·이전 사전학습 연구와의 연결, Drawbacks·Future의 한계와 남은 원인 분석을 확인했다. 본문의 당시 연구 설명을 사용하며 페이지의 현재 제품 안내를 2018년 기록과 섞지 않는다.'},
        {title:'OpenAI · finetune-transformer-lm · 당시 공식 코드',url:'https://github.com/openai/finetune-transformer-lm',location:'코드와 README의 ROCStories 실행 범위·모형 설정·반복 결과 표기를 확인했다. 현재 저장소 상태와 원고의 2018년 실험을 구분하며 가중치 다운로드·실행·재현을 수행한 것은 아니다.'},
        {title:'Stanford CS224N 2019 · 공식 일정',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html',location:'Feb 19 Modeling contexts of use: Contextual Representations and Pretraining와 연결된 개별 YouTube 영상 ID를 확인했다. GPT-1의 상세 구간을 확인한 것은 아니므로 사전학습의 후대 배경 강의로만 제공한다.'}
      ]
    }
  });
})();
