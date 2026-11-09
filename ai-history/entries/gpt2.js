/* Task descriptions and examples are text context, not parameter updates.
 * Continuations below are authored; they are never presented as GPT-2 inference. */
(function(){
  'use strict';
  const paper='https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf';
  const announcement='https://openai.com/index/better-language-models/';
  const at=(page,label)=>({title:'Radford 외 (2019) · PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const segment=(id,label,role,text)=>({id,label,role,text});
  const task=(id,label,segments,continuationTokens,explanation,scope,source)=>({id,label,segments,promptTokens:segments.map(s=>s.text).join('\n').split(/\s+/).filter(Boolean),continuationTokens,explanation,scope,source});
  const authored='입력과 후속 문장은 이 카드에서 직접 준비했습니다. 원문 데이터 표본이나 GPT-2가 생성한 답이 아닙니다. 아래 한 칸씩 보는 단위는 띄어쓰기로 나눈 것이며 실제 byte-level BPE 토큰·확률·검색을 실행하지 않습니다. 줄바꿈은 위 입력 상자에서 보존하고, 아래 순서 보기에서는 단어 단위로 펼칩니다.';
  window.AtlasEntries.register({
    id:'gpt2',
    record:{
      title:'다음 말을 배우는 일이, 여러 과제를 푸는 경험이 될까?',
      summary:'알렉 래드퍼드와 공동연구자들은 다양한 웹 문서의 다음 토큰을 예측하는 언어모형을 키웠다. 요약·번역·질문 응답의 형식을 입력 문맥에 담아, 과제마다 가중치나 구조를 바꾸지 않고 같은 모형이 글을 이어 쓰게 했다.',
      detail:'',question:'',
      sources:[{title:'Language Models are Unsupervised Multitask Learners · 2019 보고서',url:paper},{title:'2019-02-14 · 공식 발표',url:announcement},{title:'OpenAI · GPT-2 당시 공식 코드와 모델 크기 정정',url:'https://github.com/openai/gpt-2'}],
      caveat:'원문의 zero-shot은 과제별 파라미터·구조 변경이 없다는 뜻이다. 번역과 사실 질문 응답에는 문맥 예시를 제공한 조건이 포함된다. 아래 이어쓰기는 직접 준비한 예이며 원래 모형의 생성·확률·벤치마크 재현이 아니다. 사전학습 자료의 과제 예시와 평가 자료 중복 가능성도 구분한다.'
    },
    content:{
      article:{
        question:'다음 말을 예측하며 배운 능력을,\n다시 학습하지 않고 다른 과제에 꺼내 쓸 수 있을까?',
        opening:[
          '긴 글 뒤에 “TL;DR:”이 붙으면 짧은 요약이 이어질 것 같다. “영어 문장 = 프랑스어 문장”이 몇 줄 이어진 뒤 새 영어 문장과 등호가 나오면, 그다음에는 번역이 올 것 같다. 문서와 질문 뒤의 “A:”는 답을 기대하게 한다. 다음 글을 잘 예측하려면 문법뿐 아니라, 지금 어떤 종류의 글이 이어져야 하는지도 파악해야 하지 않을까?',
          '알렉 래드퍼드(Alec Radford), Jeffrey Wu, Rewon Child, David Luan, Dario Amodei, Ilya Sutskever는 이 가능성을 GPT-2로 살폈다. 다양한 웹 문서에서 다음 토큰을 맞히는 일을 학습하면, 그 문서 안에 자연스럽게 들어 있는 번역·요약·질문 응답의 패턴도 배울 수 있다는 생각이다. WebText에서 발견한 실제 번역 표현을 원문 Table 1에 모아 놓았다.',
          'GPT-1은 먼저 언어모형을 학습하고, 각 과제의 정답 자료로 기존 가중치와 새 출력층을 미세조정했다. GPT-2의 이 실험은 사전학습한 가중치를 고정한 채, 과제와 입력을 글의 문맥으로 제시했다. 요약용 새 망이나 번역용 새 출력층을 붙이는 대신, 같은 언어모형이 어휘에서 다음 토큰을 고르는 흐름으로 출력을 이어 갔다.',
          '여기서 “별도 학습 없음”은 아무것도 배우지 않았다는 뜻이 아니다. 큰 웹 자료로 사전학습했고, 평가할 때도 어떤 글을 넣고 어떻게 출력을 고를지 정했다. 원문은 이 전이를 zero-shot이라고 불렀지만 번역처럼 입력 안에 예시 쌍을 넣은 경우도 있다. 연구의 질문은 모든 과제를 이미 해결했는지가 아니라, 다음 토큰 학습에서 생긴 능력을 추가 파라미터 학습 없이 어디까지 꺼내 쓸 수 있는지였다.'
        ],
        visual:{
          id:'text-to-task',navLabel:'이어쓰기로 과제를 풀다',
          title:'입력의 형식을 바꾸고, 같은 언어모형으로 이어 쓰다',
          caption:'요약·번역·문서 독해를 바꾸며 어떤 글이 문맥에 들어가는지 살펴보세요. 준비한 후속 문장을 한 단위씩 펼치면 앞서 붙인 말도 다음 위치의 문맥에 들어갑니다. 가중치는 과제를 바꾸거나 문장을 이어 쓰는 동안 그대로 둡니다.',
          stages:[
            {id:'prompt',label:'글의 형식이 과제를 주다',text:'문서 뒤의 TL;DR:, 번역 예시와 등호, 문서·대화 뒤의 A:가 서로 다른 이어쓰기를 요청하는 문맥이 된다. 과제마다 새 출력층을 붙이지 않고 같은 언어모형을 사용한다.'},
            {id:'compare',label:'학습과 문맥을 구분하다',text:'GPT-1의 지도 미세조정은 정답으로 가중치를 바꾼다. GPT-2의 이 평가는 사전학습한 가중치를 고정하고 입력 문맥을 바꾼다. 문맥에 예시를 넣는 일과 예시로 파라미터를 학습하는 일을 나누어 본다.'},
            {id:'evidence',label:'원문의 관찰을 읽다',text:'여러 과제의 모형 크기별 결과와 TL;DR: 유무에 따른 요약 성능을 연결해 읽는다. 모든 과제가 같은 지표나 같은 성능 수준에 도달한 것은 아니다.'}
          ],
          tasks:[
            task('summary','요약 · TL;DR:',[
              segment('article','요약할 글','source','A town library opened a new reading room on Monday. It has twenty seats and stays open until eight.'),
              segment('hint','짧은 요약을 기대하게 하는 단서','cue','TL;DR:')
            ],['The','library','opened','a','new','reading','room','.'],
            '긴 글 뒤에 TL;DR:를 붙여 짧은 요약을 기대하는 문맥을 만든다. 그다음 말도 같은 언어모형의 어휘에서 이어 간다.',
            authored+' 원문에서는 CNN/Daily Mail 글에서 top-k=2로 100토큰을 생성하고, 그중 첫 세 문장을 요약으로 사용했다. 준비한 문장은 도서관의 새 열람실이라는 요지를 짧게 되풀이하며, 그 생성·샘플링·ROUGE 평가를 실행한 결과가 아니다.',
            at(6,'§3.6 · 요약의 TL;DR: 단서와 출력 선택')),
            task('translation','번역 · 예시와 등호',[
              segment('pair1','문맥에 넣은 번역 예시 1','demonstration','The cat is sleeping. = Le chat dort.'),
              segment('pair2','문맥에 넣은 번역 예시 2','demonstration','The sun is shining. = Le soleil brille.'),
              segment('new','새로 번역할 문장과 이어 쓸 자리','cue','The door is open. =')
            ],['La','porte','est','ouverte','.'],
            '앞의 예시 쌍이 영어와 프랑스어를 잇는 형식을 보여 준다. 새 영어 문장과 등호 뒤도 같은 형식으로 이어 쓰게 하며, 예시로 가중치를 다시 학습하지 않는다.',
            authored+' 원문은 예시 쌍의 문맥 뒤 새 영어 문장과 등호에서 greedy decoding으로 이어 첫 문장을 번역으로 사용했다. 두 예시 쌍과 새 문장은 직접 골랐으며 원문에서 사용한 문장 자체가 아니다. 방향은 영어→프랑스어로 한정해 보여 준다.',
            at(6,'§3.7 · 번역 예시의 문맥과 새 문장 = 형식')),
            task('reading','문서 독해 · 대화와 A:',[
              segment('document','질문에서 참고할 문서','source','Mina planted a tree in the school garden on Friday.'),
              segment('history','앞선 질문과 답','history','Q: Who planted a tree?\nA: Mina.'),
              segment('question','지금 답할 질문과 답의 시작','question','Q: Where did she plant it?\nA:')
            ],['In','the','school','garden','.'],
            '문서와 이전 문답을 함께 읽고 A: 뒤에 답을 잇는다. she와 it이 무엇을 가리키는지도 앞선 글과 대화가 주는 문맥이다.',
            authored+' 원문의 CoQA 평가는 문서·대화 기록·마지막 A:를 조건으로 greedy decoding을 사용했다. 이 짧은 글과 문답은 실제 사건·CoQA 표본이 아닌 직접 구성한 글이다. 문서가 없는 사실 질문 응답(Natural Questions)과는 다른 조건이다. A:는 실제 BPE에서 반드시 한 토큰이라는 뜻이 아니다.',
            at(6,'§3.5 · 문서·대화 기록·A:를 조건으로 한 CoQA 독해'))
          ],
          comparison:{
            text:'정답을 가진 예시를 어디에 사용하는지가 다르다. 학습 자료에 넣어 파라미터를 조정할 수도 있고, 입력의 앞부분에 넣어 다음 출력을 지정하는 문맥으로만 사용할 수도 있다.',
            gpt1:{title:'GPT-1 · 과제 정답으로 미세조정',text:'사전학습 가중치를 출발점으로 삼고, 과제의 정답 오차로 기존 decoder와 새 과제 출력층을 함께 조정한다. 과제마다 별도의 미세조정을 시작한다.'},
            gpt2:{title:'GPT-2 · 사전학습 가중치를 고정한 평가',text:'과제별 파라미터·구조 변경 없이 같은 decoder와 언어모형 어휘 출력을 사용한다. 과제의 단서·본문·예시를 입력 문맥에 주고 그 뒤를 이어 쓴다. 바뀌는 것은 문맥과 읽는 중의 상태이며 학습한 가중치는 그대로다.'},
            scope:'GPT-1 원문에도 별도의 zero-shot 휴리스틱 관찰은 있었다. 이 비교는 GPT-1의 주된 지도 미세조정 절차와 GPT-2 보고서의 과제별 추가 학습 없는 평가를 나란히 보는 것이다. GPT-2가 모든 과제에서 예시 없이 성공했다거나, 미세조정을 할 수 없는 모형이라는 뜻이 아니다. 뒤에 다룰 GPT-3의 명시적인 zero/one/few-shot 비교 실험과도 구분한다.',
            source:at(2,'§1–2 · 파라미터·구조 변경 없는 전이와 p(output | input, task)')
          },
          evidence:[
            {id:'transfer',file:'gpt2-2019-task-transfer.png',title:'모형을 키웠을 때, 서로 다른 과제에서 무엇이 달라졌나',caption:'Fig.1은 네 패널에서 CoQA 독해 F1, WMT-14 프랑스어→영어 번역 BLEU, CNN/Daily Mail 평균 ROUGE, Natural Questions 질문 응답 정확도를 보여 준다. 다음 토큰을 학습한 모형을 별도 과제 미세조정 없이 적용하고, 모형 크기와 함께 각 과제의 지표가 어떻게 움직이는지 관찰했다.',scope:'각 패널의 과제·지표·척도와 입력·출력 선택 조건이 다르다. 요약은 가장 큰 모형의 점수가 직전 모형보다 조금 낮아 모든 과제에서 단조 증가한 것도 아니다. 곡선의 높이를 하나의 공통 정답률로 비교하지 않는다. 1.5B 모형이 모든 과제에서 당시 전문 시스템을 앞섰다는 그림도 아니다. 이 카드의 준비한 이어쓰기 문장에서 측정한 성능이 아니다.',source:at(2,'Fig.1 · 과제별 크기–성능 관찰'),credit:{title:'Radford·Wu·Child·Luan·Amodei·Sutskever (2019) · Fig.1',url:paper+'#page=2',note:'공식 PDF의 원그림을 직접 렌더했습니다. 패널·축·범례를 보존하고 한국어 설명을 그림 밖에 붙였습니다. 원문에 없는 구조도를 원그림으로 추가하지 않았습니다.'}},
            {id:'hint',file:'gpt2-2019-summary-hint.png',title:'같은 언어모형에 TL;DR:를 붙였을 때',caption:'Table 4는 CNN/Daily Mail 요약의 ROUGE F1을 비교한다. GPT-2 TL;DR:의 R-AVG는 21.40, 단서를 뺀 GPT-2 no hint는 15.03이다. 문서 뒤의 짧은 단서가 어떤 이어쓰기를 요구하는지 바꿀 수 있다는 원문의 관찰이다.',scope:'R-AVG 차이는 6.37점으로 본문은 6.4점이라 적는다. 이를 6.4% 정답률 향상으로 바꾸지 않는다. 같은 표의 Random-3은 20.98, Lede-3은 31.55이므로 TL;DR:만으로 전문 요약기 수준의 성능을 얻었다고 말하지 않는다. 결과는 원문에서 정한 생성·문장 선택과 ROUGE 조건에 따른다.',source:at(6,'Table 4·§3.6 · TL;DR: 유무와 요약의 한계'),credit:{title:'Radford 외 (2019) · Table 4',url:paper+'#page=6',note:'표의 비교 행·네 지표·캡션을 보존해 렌더했습니다. 원래 결과를 위의 자체 문장에 적용하거나 모형의 실제 예측 확률로 바꾸지 않았습니다.'}},
          ],
          scope:'직접 준비한 입력·후속 문장을 순서대로 펼치는 화면입니다. GPT-2 가중치·BPE·어휘 확률·greedy 또는 top-k 생성·과제별 평가를 실행하지 않습니다. 가중치가 고정돼도 입력에 따라 중간 표현과 다음 토큰 분포는 달라질 수 있다는 구조를 설명합니다.',
          source:at(2,'§2 · 언어모형과 문맥으로 지정하는 과제')
        },
        takeaway:{title:'과제를 새로 학습시키는 대신, 어떤 글을 이어 쓸지 문맥으로 보여 주다',text:'요약·번역·질문 응답을 별개의 출력 장치로 나누지 않고, 같은 언어모형이 계속할 글의 형식으로 표현했다. 다양한 글에서 다음 토큰을 배운 경험이 과제 수행으로 옮겨 갈 가능성을 보였고, 추가 학습 없이 얻는 성능의 범위와 한계도 드러냈다.'},
        technical:{
          title:'과제별 입력·생성·평가 조건과 학습 자료 더 읽기',
          paragraphs:[
            'Language Models are Unsupervised Multitask Learners는 여섯 공동저자의 2019년 기술 보고서다. 공식 발표는 2019-02-14이며, 여기서는 연결된 24쪽 PDF를 기준으로 그림·표·절 번호를 적었다. 원고의 별표는 Radford·Wu와 Amodei·Sutskever 각각의 동등 기여를 표시한다.',
            '§2는 하나의 과제를 p(output | input), 여러 과제를 p(output | input, task)로 설명한다. 과제를 별도 구조나 학습 알고리즘으로 지정할 수도 있지만, 언어는 과제·입력·출력을 하나의 기호 흐름으로 적는 방법을 제공한다. 다음 토큰 분포를 배우는 모형에서 적절한 앞 문맥을 주면 그 뒤 출력의 조건부 분포를 사용할 수 있다는 발상이다.',
            '이 논리는 모형이 웹 자료를 충분히 학습하면 그 속에 자연스럽게 나타나는 과제까지 익힐 수 있다는 연구 가설로 이어진다. 이상화한 목표의 관계가 유한한 자료·계산에서 모든 과제를 해결한다는 증명은 아니다. 원문은 실제 과제에서 추가 학습 없이 얻은 결과를 평가해 이 가능성을 살핀다.',
            'GPT-2는 사전학습한 Transformer decoder 언어모형이다. 왼쪽 문맥을 조건으로 다음 토큰을 예측하며, 생성한 토큰을 다음 위치의 입력에 포함한다. 과제가 달라져도 언어모형의 어휘 출력층을 그대로 사용한다. 입력에 따라 은닉 표현·다음 토큰 분포가 바뀌는 것과, 학습한 파라미터를 경사하강으로 바꾸는 일을 구분한다.',
            '§2.1의 WebText는 Reddit에서 karma가 3 이상인 바깥 링크를 출발점으로 수집했다. 보고서가 평가에 사용한 예비 버전은 2017년 12월 이후 링크를 제외하고 중복 제거·정제를 거쳐 800만 개가 조금 넘는 문서, 40GB의 텍스트를 담았다. 흔한 평가 자료의 출처라는 이유로 Wikipedia 문서를 제거했다. 이를 인터넷 전체를 균등하게 대표하는 자료라고 해석하지 않는다.',
            '§2.2는 byte 수준에서 동작하도록 BPE를 확장한다. §2.3의 어휘 크기는 50,257개, 문맥 길이는 1,024 토큰이다. 이 화면의 단어 칸은 실제 byte-level BPE를 실행하지 않는다. 보기 단위 1,024개 제한도 모형의 정확한 토큰화·길이 판정을 재현한 것은 아니다.',
            '원문 모형은 layer normalization 위치를 각 하위 블록의 입력으로 옮기고 마지막 self-attention block 뒤에도 layer normalization을 추가한다. 2017년 번역 Transformer나 GPT-1 카드의 구조를 같은 세부 설정으로 복제한 것으로 설명하지 않는다. 본문은 규모와 자료의 변화에 집중하며 이 화면에서 원래 모형 계산을 실행하지 않는다.',
            '보고서는 네 크기의 모형을 비교하고 가장 큰 GPT-2를 약 1.5B 파라미터라고 소개한다. 원문 Table 2의 1542M 등 표기는 당시 수치다. 공식 코드 저장소는 원래 보고서·블로그의 파라미터 수 계산에 오류가 있었다고 정정했으며 공개 모형 이름에는 1558M을 사용한다. 원문의 그래프 축 표기를 조용히 고치거나 단순히 다른 모형이라고 넘기지 않는다.',
            '§3.5의 CoQA는 문서와 그에 대한 대화 기록을 입력하고 마지막 A: 뒤를 greedy decoding으로 이었다. 개발 자료에서 보고한 55 F1은 원문 조건의 독해 지표다. 일반 사실 질문 응답 정답률이나 모든 과제의 평균으로 쓰지 않는다. 사람이 만든 CoQA 훈련 쌍으로 별도 학습하지 않았지만, 평가 입력의 문서·이전 대화는 조건으로 사용한다.',
            '§3.6의 요약은 글 뒤에 TL;DR:를 더하고 top-k=2 무작위 샘플링으로 100토큰을 생성한 다음, 첫 세 문장을 사용했다. greedy decoding과 같은 조건으로 합치지 않는다. Table 4는 TL;DR:와 no hint의 차이를 보여 주지만, 생성문이 원문의 세부 사항을 혼동하는 실패도 본문에서 보고한다. 유창한 요약 모양과 사실 보존은 같은 평가가 아니다.',
            '§3.7의 번역은 문맥 안에 영어 문장 = 프랑스어 문장 형태의 예시 쌍을 넣었다. 새 문장과 등호 뒤에서 greedy decoding으로 생성하고 첫 문장을 사용했다. WMT-14에서 영어→프랑스어는 5 BLEU, 프랑스어→영어는 11.5 BLEU다. 서로 다른 방향의 수치를 평균하거나, 당시 최선의 번역기 성능으로 부르지 않는다.',
            'WebText의 비영어 웹페이지를 필터링했더라도 영어 페이지 안의 다른 언어 표현까지 전부 사라진 것은 아니다. Table 1은 자료 안에 번역 예시가 있었음을 보여 준다. 원문은 언어 탐지기로 프랑스어 약 10MB를 찾았다고 적는다. 전혀 프랑스어를 보지 않고 번역했다는 설명이나, 모든 번역 사례를 완전히 집계했다는 설명과 구분한다.',
            '§3.8의 Natural Questions 사실 질문 응답도 문맥에 예시 문답을 주어 짧은 답 형식을 유도했다. 4.1% exact match와 가장 확신한 1% 질문에서의 63.1% 정확도는 분모가 다르다. Table 5는 높은 모형 확률을 준 30개 생성 답의 선택 사례이며 오답도 포함한다. 모형 확률을 답이 참일 확률로 곧바로 받아들이지 않는다.',
            '원문의 zero-shot은 과제별 파라미터·구조 수정이 없는 전이를 뜻한다. 후대에 입력 예시 수를 나누어 zero-shot·one-shot·few-shot이라고 비교하는 용법과 똑같이 치환하지 않는다. 특히 번역·사실 질문 응답에 예시를 준 조건을 숨긴 채 “예시가 한 개도 없었다”고 요약하면 틀린다. 문서 독해의 대화 기록과 새로운 과제 형식을 설명할 예시 쌍도 역할이 다르다.',
            '§3.1의 8개 중 7개 결과 갱신은 평가한 언어모형 데이터셋에 관한 진술이다. 요약·번역·사실 질문 응답을 포함한 모든 언어 과제 중 7개라는 뜻이 아니다. 과제마다 perplexity·F1·ROUGE·BLEU·exact match 등 지표와 비교 조건이 달라 Fig.1의 높이를 하나의 공통 능력 점수로 읽지 않는다.',
            '§4는 WebText와 평가 자료의 중복을 정규화한 8-gram과 Bloom filter 등으로 조사한다. 중복을 조사했다는 사실이 모든 의미적 유사성·누수를 배제했다는 증거는 아니다. 과제별 추가 미세조정을 하지 않았다는 사실과 사전학습 중 평가 문장·유사한 과제를 전혀 보지 않았다는 주장을 나누어 읽는다.',
            'GPT-1에서도 사전학습 중의 별도 zero-shot 휴리스틱을 관찰한 바 있다. GPT-2는 이 가능성을 더 큰 모형·다양한 웹 자료·여러 과제에서 확장해 평가한 연구다. 자연어로 과제를 지정하거나 사전학습을 옮겨 쓰는 모든 아이디어의 최초 발명이라고 소개하지 않는다. 원문의 장점과 실패 범위를 함께 남겨 둔다.'
          ],
          formula:'언어모형의 다음 토큰 학습:\nlog P(s₁…sₙ; θ) = Σᵢ log P(sᵢ | s₁…sᵢ₋₁; θ)\n\n과제를 담은 입력 문맥 c를 준 뒤:\nP(y₁…yₘ | c; θ) = ∏ⱼ P(yⱼ | c, y₁…yⱼ₋₁; θ)\n\n이 보고서의 과제별 평가:\n사전학습한 θ 고정 / 입력 문맥 c 변경\n새 과제별 출력층·파라미터 업데이트 없음\n문맥에 예시를 넣어도 θ를 그 예시로 학습하는 것은 아니다.\n\n화면의 이어쓰기:\n직접 정한 후속 단어를 순서대로 펼친다.\n위 확률이나 원래 모형의 출력을 계산하지 않는다.'
        }
      },
      keyIdeas:[
        {title:'다음 글을 잘 예측하려면, 글 안의 과제도 알아야 하지 않을까?',text:'웹 문서에는 문법·상식뿐 아니라 질문과 답, 원문과 번역, 긴 글과 요약이 함께 나타난다. 다음 토큰을 예측하는 목표 안에 이런 관계를 학습할 기회가 있다는 것이 출발점이다. Table 1의 번역 표현은 그 생각이 어디에서 왔는지 보여 준다.'},
        {title:'과제를 출력 장치 대신, 입력의 문맥으로 적는다',text:'요약은 TL;DR: 뒤의 글, 번역은 예시와 등호 뒤의 글, 독해는 문서·대화 뒤의 A:로 표현한다. 모든 출력을 같은 어휘의 토큰 흐름으로 이어 가면서 과제별로 가중치·구조를 수정하지 않는 전이를 시험했다.'},
        {title:'모형을 다시 학습시키는 것과, 예시를 읽히는 것은 다르다',text:'미세조정은 정답의 오차로 파라미터를 바꾼다. 문맥의 예시는 현재 출력의 조건이 되며 가중치를 바꾸지 않는다. 이 구분 덕분에 사전학습에서 얻은 능력을 입력만으로 어디까지 끌어낼 수 있는지 살필 수 있다.'},
        {title:'여러 과제를 시도한 가능성과, 잘 풀었다는 결론을 나눈다',text:'언어모형의 규모가 커지며 여러 과제의 결과가 나아졌지만, 요약·번역·사실 질문 응답은 전문 시스템과 차이가 컸다. 글이 자연스러워 보여도 세부 사실을 틀릴 수 있다. 추가 학습 없이 드러난 능력의 폭과 실제 성능의 한계를 함께 평가해야 한다.'}
      ],
      videos:[{title:'Stanford CS224N (2019) · Natural Language Generation',url:'https://www.youtube.com/watch?v=4uG1NMKNWCU',channel:'Stanford CS224N · 2019 공식 과정',note:'공식 일정의 2월 26일 생성 강의와 연결된 영상이다. 언어 생성·출력 선택의 배경 강의로 제공한다. GPT-2 원저자 발표·특정 설명 구간·현재 재생·전체 시청은 확인하지 않았다.',sourceUrl:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html'}],
      references:[
        {title:'Radford·Wu·Child·Luan·Amodei·Sutskever · Language Models are Unsupervised Multitask Learners',url:paper,location:'공식 24쪽 보고서. p.2 §2·Fig.1: 언어모형과 과제 조건화·크기별 관찰. p.3 §2.1·Table 1: WebText와 실제 번역 표현. p.4 §2.2–2.3·Table 2: 토큰화·모형 설정. p.6 §3.5–3.7·Table 4: 독해·요약·번역 입력과 평가. p.7 §3.8·Table 5: 사실 질문 응답. p.8 §4·Table 6: 평가 자료 중복 조사. 해당 지면을 렌더해 대조했다.'},
        {title:'OpenAI · Better language models and their implications · 2019-02-14',url:announcement,location:'공식 발표일·핵심 연구 질문·과제별 미세조정 없는 평가와 당시의 한계 확인. 본문은 최초 발표와 이후 2019년 업데이트를 함께 담으므로 서로 다른 시점의 공개 상태를 섞지 않는다.'},
        {title:'Stanford CS224N 2019 · 공식 일정과 언어 생성 배경 강의',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html',location:'Tue Feb 26 Natural Language Generation 행의 개별 video 링크와 Lecture 15 영상 ID를 확인했다. 원저자 발표나 특정 GPT-2 설명 구간을 확인한 것으로 표시하지 않는다.'},
        {title:'OpenAI · GPT-2 공식 코드·보고서 파라미터 수 정정',url:'https://github.com/openai/gpt-2',location:'원래 보고서·블로그에서 파라미터 수 계산에 오류가 있었다는 README 정정과 공개 모형 이름을 확인했다. 코드·샘플링 예시는 보조 자료로만 쓰며 이 카드에서 원래 가중치·생성·평가를 실행하지 않았다.'}
      ]
    }
  });
})();
