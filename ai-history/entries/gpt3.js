/* Existing event, refined in one independent entry. The four timeline people
 * are a selected subset; all 31 authors are recorded in the technical text. */
(function(){
  'use strict';
  const paper='https://proceedings.neurips.cc/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf';
  const arxiv='https://arxiv.org/pdf/2005.14165v4';
  const supplement='https://proceedings.neurips.cc/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Supplemental.pdf';
  const at=(page,label)=>({title:'Brown 외 (2020) · NeurIPS PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const av=(page,label)=>({title:'Brown 외 (2020) · arXiv v4 PDF p.'+page+' · '+label,url:arxiv+'#page='+page});
  const sp=(page,label)=>({title:'Brown 외 (2020) · 별도 supplement p.'+page+' · '+label,url:supplement+'#page='+page});
  const authored='입력 예시·새 질문·준비한 답은 이 카드에서 직접 정했습니다. 실제 GPT-3 호출·BPE·확률·추론 결과가 아닙니다. K를 바꾸어도 준비한 답을 같은 값으로 보여 주며, 예시 수에 따른 성능 향상을 계산하지 않습니다. 예시에는 정답을 포함하지만 새 질문 뒤에는 출력의 시작 표시까지만 둡니다.';
  window.AtlasEntries.register({
    id:'gpt3',
    record:{
      title:'몇 개의 예시를 읽고, 같은 형식으로 답하게 하다',
      subtitle:'GPT-3 · Language Models are Few-Shot Learners',
      dateLabel:'2020-05-28 · 첫 원고 / 2020 · NeurIPS 출판',
      authorNote:'GPT-3는 31명의 공동연구다. 연표의 Tom B. Brown·Benjamin Mann·Ilya Sutskever·Dario Amodei는 기록을 연결한 일부 참여 인물이다. 전체 저자와 첫 네 저자의 동등 기여 표시는 논문 더 읽기에 적었다.',
      summary:'GPT-3 연구진은 과제 설명과 완성된 입출력 예시를 문맥에 넣고, 같은 모형이 새 입력의 답을 이어 쓰게 했다. 과제별 가중치 갱신 없이 예시를 0개·1개·여러 개 제공하는 조건을 나누어, 모형의 크기와 문맥 정보가 과제 수행에 어떻게 연결되는지 평가했다.',
      detail:'',question:'',
      sources:[{title:'Brown 외 · NeurIPS 2020 출판본',url:paper},{title:'2020-07-22 · arXiv v4 전체 원고',url:arxiv},{title:'NeurIPS 2020 · 별도 보충자료',url:supplement}],
      related:['gpt2','gpt1','bert','maml','constitutional-ai'],
      caveat:'화면의 K=0·1·3은 설명용 도식의 차이를 살펴볼 직접 구성한 입력이다. 실제 벤치마크의 예시 수·프롬프트·평가와 구분한다. 문맥 내 학습은 이 평가에서의 경사 갱신이 아니며, 새 과제를 처음 배운 것인지 익숙한 패턴을 알아본 것인지를 이 화면으로 판정하지 않는다. 그림마다 NeurIPS 출판본과 arXiv v4 판본·쪽수를 표시한다.'
    },
    content:{
      article:{
        question:'예시 몇 개를 읽으면,\n가중치를 바꾸지 않고 새 과제의 형식을 따라 할 수 있을까?',
        opening:[
          '“영어를 프랑스어로 번역하라”는 지시만 줄 수도 있다. “good morning → bonjour”처럼 완성된 예를 보여 줄 수도 있다. 예시가 더해지면 어떤 입력을 어떤 형식의 답으로 바꾸라는지 더 구체적으로 드러난다. 기계도 그 예를 새 학습 자료로 저장해 다시 훈련하는 대신, 지금 읽는 문맥으로 사용할 수 있을까?',
          'Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah를 포함한 31명의 연구진은 GPT-3에서 이 가능성을 체계적으로 비교했다. 과제별 파라미터 갱신 없이, 지시만 주는 zero-shot, 예시 한 개를 더한 one-shot, 여러 예시를 더한 few-shot을 나누었다. 다음 토큰을 예측하는 같은 언어모형이, 앞에 보여 준 과제의 형식에 맞춰 새 입력의 출력을 이어 쓰게 했다.',
          '그 바탕에는 많은 글로 사전학습한 가중치가 있다. 예시를 문맥에 추가하면 그 예시를 참고해 읽는 중의 표현과 다음 토큰 분포가 달라질 수 있다. 하지만 정답의 오차를 역전파해 가중치를 고치는 미세조정은 이 평가에서 수행하지 않는다. 이미 배운 능력을 어떤 과제에 사용할지, 입력의 지시와 예시로 지정하려는 접근이다.',
          '연구진은 작은 모형부터 175B 모형까지 크기를 달리하고, 예시 수를 바꾸며 여러 과제를 평가했다. 큰 모형이 문맥 예시를 더 잘 활용하는 경향을 보였지만, 모든 과제가 같은 수준으로 해결된 것은 아니었다. “문맥 내 학습”이라는 이름도 새 규칙을 처음 배웠는지, 사전학습에서 본 패턴을 알아봤는지에 대한 결론을 미리 담지는 않는다.'
        ],
        visual:{
          id:'examples-in-context',navLabel:'예시를 문맥에 넣다',
          title:'새 입력은 그대로 두고, 앞에 보여 줄 예시만 바꾸다',
          caption:'0개·1개·3개를 선택하면 지시 뒤에 붙는 입출력 예시가 바뀝니다. 새 입력과 가중치는 유지됩니다. 새 입력의 정답은 문맥에 넣지 않고, 별도의 준비한 답으로 확인합니다.',
          stages:[
            {id:'shots',label:'예시 수를 바꾸다',text:'완성된 입출력 예시는 과제의 내용과 답 형식을 보여 주는 문맥이다. 새 입력을 바꾸지 않은 채 K만 늘려, 무엇을 더 읽게 되는지 비교한다. 이 화면은 준비한 답을 사용하며 실제 K별 성능을 만들지 않는다.'},
            {id:'compare',label:'가중치 갱신과 나누다',text:'미세조정은 정답 예시의 오차로 파라미터를 바꾼다. 문맥 내 학습은 사전학습한 가중치를 고정하고, 예시와 새 질문을 함께 읽어 출력을 조건화한다. 읽는 중의 표현 변화와 가중치 갱신은 다르다.'},
            {id:'evidence',label:'원문과 한계를 읽다',text:'원문의 네 설정 도식, 크기·문맥 예시에 따른 성과 관찰, 자릿수가 늘며 어려워지는 산술 결과를 연결한다. 판본마다 그림 번호가 달라 각각의 출처와 지면을 표시한다.'}
          ],
          shotCounts:[0,1,3],initialShots:0,
          tasks:[
            {
              id:'translation',label:'번역 · 같은 형식으로 잇기',instruction:'Translate English to French:',inputLabel:'',outputLabel:'=>',
              demonstrations:[{id:'morning',input:'good morning',output:'bonjour'},{id:'thanks',input:'thank you',output:'merci'},{id:'soon',input:'see you soon',output:'à bientôt'}],
              queryInput:'the red book',preparedAnswer:'le livre rouge',
              explanation:'번역 지시 뒤에 완성된 영어–프랑스어 쌍을 더한다. 새 표현은 그대로 두고, 앞의 예시가 어떤 답을 기대하는지 보여 주게 한다.',
              scope:authored+' arXiv v4 Fig.2.1의 설정 설명용 도식을 참고한 자체 문장이다. 실제 번역 벤치마크는 zero-shot에서 Q: What is the {language} translation of {sentence} A: 형식, one/few-shot에서 문장 = 번역 예시 형식을 사용했다. 이 화면의 모든 K에 같은 지시·화살표를 쓰는 구성과 다르다. 화면의 K3을 그 실험의 K로 쓰지 않는다.',
              source:av(7,'Fig.2.1 · 설정 설명용 번역 도식 / 실제 형식은 supplement G')
            },
            {
              id:'arithmetic',label:'덧셈 · 문답 형식으로 잇기',instruction:'Answer the addition question.',inputLabel:'Q:',outputLabel:'A:',
              demonstrations:[{id:'sum35',input:'What is 12 plus 23?',output:'35'},{id:'sum57',input:'What is 41 plus 16?',output:'57'},{id:'sum62',input:'What is 28 plus 34?',output:'62'}],
              queryInput:'What is 54 plus 17?',preparedAnswer:'71',
              explanation:'완성된 Q:·A: 예시가 덧셈 질문과 짧은 숫자 답의 관계를 보여 준다. 새 질문의 답은 입력에 넣지 않고 A: 뒤에 이어질 자리로 남긴다.',
              scope:authored+' 숫자와 덧셈 정답은 직접 정하고 확인했다. supplement Fig.G.44의 문답 형식을 참고했으며 그 표본을 실행한 결과가 아니다. 원문의 산술 few-shot 조건은 K50이고, 각 과제에서 무작위로 만든 2,000문제를 평가했다. 이 카드의 세 예시·한 새 질문으로 원래 성능이나 산술 학습 알고리즘을 검증하지 않는다.',
              source:sp(26,'Fig.G.44 · 산술 문답 형식 / p.29 Fig.H.4 · few-shot K50')
            }
          ],
          comparison:{
            text:'같은 정답 예시라도 사용하는 위치가 다르다. 가중치를 조정할 학습 자료로 사용할 수도 있고, 현재 답을 조건화할 입력의 앞부분으로 사용할 수도 있다.',
            finetune:{title:'미세조정 · 정답으로 가중치를 바꾸다',text:'사전학습한 가중치에서 시작해 과제의 예시를 반복 학습한다. 예측과 정답의 오차를 역전파하고, 학습률에 따라 파라미터를 갱신한다. 바뀐 가중치로 새 입력을 처리한다.'},
            incontext:{title:'문맥 내 학습 · 가중치를 고정하고 예시를 읽다',text:'사전학습한 가중치를 그대로 두고 지시·예시·새 질문을 한 문맥으로 읽는다. 예시는 현재 표현과 다음 토큰 분포에 영향을 주지만, 평가 과정에서 그 오차로 파라미터를 갱신하지 않는다.'},
            scope:'논문의 FT 도식은 비교를 위한 설명이다. GPT-3의 이 zero/one/few-shot 과제 평가는 과제별 미세조정을 사용하지 않았다. 문맥에 예시를 넣었다는 사실만으로 새 과제를 처음부터 배웠는지, 익숙한 과제나 패턴을 인식했는지 구분하지 않는다. MAML처럼 새 과제의 경사로 초기값을 수정하는 절차와도 다르다.',
            source:av(7,'Fig.2.1 · FT와 zero/one/few-shot 비교 / §2.4')
          },
          evidence:[
            {
              id:'settings',file:'gpt3-2020-learning-settings.png',title:'예시를 입력에 둘 때와, 가중치 갱신에 쓸 때',
              caption:'arXiv v4 Fig.2.1은 zero-shot·one-shot·few-shot을 왼쪽에, 전통적인 미세조정을 오른쪽에 놓는다. 왼쪽 세 설정은 예시를 주는 양이 달라도 경사 갱신을 하지 않는다. 오른쪽은 예시를 학습할 때마다 가중치를 조정한다.',
              scope:'설정의 차이를 설명하는 번역 도식이다. 그림의 짧은 예시 수나 문구가 모든 벤치마크의 실제 프롬프트·K는 아니다. 원문이 전통적 미세조정도 비교 그림에 넣었다는 사실을 GPT-3가 그 평가에서 미세조정했다는 뜻으로 읽지 않는다.',
              source:av(7,'Fig.2.1 · 네 설정의 설명용 도식'),
              credit:{title:'Brown 외 (2020) · arXiv v4 Fig.2.1',url:arxiv+'#page=7',note:'전체 네 설정과 원래 캡션을 공식 원고에서 직접 렌더했습니다. 한국어 설명은 밖에 붙였으며 이 카드의 자체 예시와 원그림을 구분합니다.'}
            },
            {
              id:'scaling',file:'gpt3-2020-context-scaling.png',title:'모형의 크기와 문맥 속 예시를 함께 바꾸어 살피다',
              caption:'NeurIPS 출판본 Fig.1.1은 세 패널을 담는다. 왼쪽은 크기별 SuperGLUE의 0/1/few-shot, 가운데는 175B 모형의 문맥 예시 수 K에 따른 SuperGLUE, 오른쪽은 정확도로 표현한 42개 벤치마크의 집계를 보여 준다. SuperGLUE의 few-shot은 K32다.',
              scope:'SuperGLUE 값은 개발 자료 결과이며 점선의 기존 시스템 결과와 직접 같은 조건으로 비교할 수 없다고 캡션에 명시돼 있다. K32는 각 평가 입력의 문맥에 넣는 예시 수다. 원캡션의 256개는 SuperGLUE 8개 과제에 각32개를 합친 수이며 한 문맥에 256개를 넣었다는 뜻이 아니다. 오른쪽의 집계는 그42개 벤치마크 범위이며 모든 언어 과제나 인간 지능의 공통 점수가 아니다. 예시를 더하면 모든 점에서 반드시 단조 증가한다고 읽지 않는다.',
              source:at(2,'Fig.1.1 · SuperGLUE와 42개 벤치마크의 집계'),
              credit:{title:'Brown 외 (2020) · NeurIPS Fig.1.1',url:paper+'#page=2',note:'세 패널·축·범례·원래 캡션을 보존했습니다. arXiv v4의 Fig.1.1·1.2와 번호를 바꾸어 붙이지 않습니다.'}
            },
            {
              id:'arithmetic',file:'gpt3-2020-arithmetic.png',title:'두 자리 덧셈의 성공이, 모든 산술의 성공은 아니다',
              caption:'arXiv v4 Table 3.9는 GPT-3 175B의 열 가지 산술 조건을 나란히 적는다. 두 자리 덧셈은 0/1/few-shot에서 76.9·99.6·100.0%, 세 자리 덧셈은 34.2·65.5·80.4%, 다섯 자리 덧셈은 0.7·3.5·9.3%다. 문맥 예시의 이점과 문제 길이에 따른 한계가 같은 표에 있다.',
              scope:'원문은 과제마다 무작위로 만든 2,000문제에서 정답과의 정확한 일치를 평가했다. few-shot의 K50은 별도 supplement Fig.H.4에서 확인한다. 이 화면의 K3 결과가 아니며, 두 자리100%를 모든 수·자릿수·계산·추론에서의 보장으로 넓히지 않는다. 2Dx는 두 자리 곱셈, 1DC는 한 자리 수의 복합 연산으로 덧셈과 다른 조건이다.',
              source:av(23,'Table 3.9·§3.9.1 · 175B 산술 평가'),
              credit:{title:'Brown 외 (2020) · arXiv v4 Table 3.9',url:arxiv+'#page=23',note:'세 설정·열 가지 연산 조건·원래 캡션을 보존했습니다. 원문 수치를 이 카드의 자체 덧셈 문제에서 얻은 결과로 대체하지 않았습니다.'}
            }
          ],
          scope:'현재 문맥을 조립하고 예시 수와 새 입력의 경계를 표시합니다. 준비한 답은 펼쳐 읽는 별도 자료이며 실제 GPT-3 가중치·토큰화·확률·생성·경사 갱신·벤치마크를 실행하지 않습니다. 모형을 바꾸지 않고 입력을 바꾸는 구성을 보여 줍니다.',
          source:av(7,'Fig.2.1 · 문맥의 예시와 경사 갱신을 구분')
        },
        takeaway:{title:'경험을 새 가중치로 저장하는 대신, 지금 읽는 예시로 과제를 지정하다',text:'사전학습한 가중치를 고정하고, 지시·완성된 입출력 예시·새 입력을 하나의 문맥으로 읽는다. 예시의 수를 나누어 비교하면서, 큰 언어모형이 이미 배운 능력을 문맥의 요구에 맞춰 사용할 가능성과 그 한계를 함께 살폈다.'},
        technical:{
          title:'예시 수·프롬프트·평가 조건과 판본 차이 더 읽기',
          paragraphs:[
            '첫 arXiv 원고는 2020-05-28에 공개됐고 NeurIPS 2020에 출판됐다. 이 카드는 출판본25쪽·별도 supplement32쪽·arXiv v4(2020-07-22)75쪽을 구분한다. 출판본의 Fig.1.1은 성과 그래프이며, arXiv v4의 Fig.1.1은 언어모형 메타학습 도식이다. 설정 비교 Fig.2.1과 산술 Table3.9는 이 카드에서 arXiv v4를 기준으로 적는다.',
            '전체 공동저자는 Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda Askell, Sandhini Agarwal, Ariel Herbert-Voss, Gretchen Krueger, Tom Henighan, Rewon Child, Aditya Ramesh, Daniel M. Ziegler, Jeffrey Wu, Clemens Winter, Christopher Hesse, Mark Chen, Eric Sigler, Mateusz Litwin, Scott Gray, Benjamin Chess, Jack Clark, Christopher Berner, Sam McCandlish, Alec Radford, Ilya Sutskever, Dario Amodei의31명이다. 첫 네 저자 Brown·Mann·Ryder·Subbiah는 동등 기여로 표시돼 있다. 화면에서 연결한 네 인물은 전체 저자나 기여 순위를 대신하지 않는다.',
            '논문은 in-context learning을 입력 시퀀스 안에서 일어나는 과제 적응 또는 인식으로 설명한다. 이 이름은 사전학습 때 전혀 보지 못한 과제를 새로 배웠다는 판정을 미리 포함하지 않는다. arXiv v4 서론의 각주1도 이 점을 명시한다. 새 규칙의 학습과 익숙한 패턴의 인식을 구분하려면 그에 맞는 독립 실험이 필요하다.',
            'GPT-2 보고서가 말한 zero-shot은 과제별 파라미터·구조 수정 없는 전이였고 번역·질문 응답에 입력 예시를 준 경우도 있었다. GPT-3는 혼동을 피하기 위해 평가 시 주는 시범 예시 수를 zero-shot·one-shot·few-shot으로 더 나누었다. 과거 용어를 오늘의 입력 예시0개 정의로 소급하지 않는다.',
            '§2.4의 few-shot은 보통 K10–100을 문맥 창에 맞춰 사용하며 과제에 따라 다르다. 예시는 가능한 경우 해당 과제의 훈련 자료에서 고르고, 새 평가 입력과 함께 문맥으로 제공한다. 그 훈련 예시를 문맥에 읽히는 것과 그것으로 가중치를 미세조정하는 것은 다르다. 이 화면의 K0·1·3은 원문 설명 도식의 구성을 따라 직접 준비한 예시 수다.',
            '0/1/few-shot에서도 사전학습은 이미 이뤄졌다. zero-shot은 과제와 관련된 글·패턴·언어를 사전학습에서 전혀 보지 않았다는 보장이 아니다. 문맥의 시범 예시를0개 준 조건과, 모형의 전체 학습 경험이 없다는 말을 구분한다. 지시·문서·새 질문도 입력으로 주어질 수 있다.',
            '모형은 자기회귀 Transformer이며 가장 큰 모형은175B, 문맥 길이는2,048토큰이다. 논문은125M부터175B까지 여덟 크기를 비교했다. layer마다 일반 dense attention과 local banded sparse attention을 번갈아 사용한 설정이어서 GPT-2의 모든 세부 구조를 단순히 늘렸다고 설명하지 않는다.',
            '사전학습은300B토큰을 사용했다. 자료는 정제한 Common Crawl, WebText2, Books1, Books2, 영어 Wikipedia를 섞었다. 각 자료의 저장 규모·학습에서 뽑는 비중·반복 횟수는 같은 수가 아니다. 큰 모형이 다양한 언어·과제를 이미 접했을 가능성을 배제하지 않고, 평가 자료 오염을 별도로 점검해야 한다.',
            '이 평가의 가중치 θ는 고정돼도 입력이 달라지면 읽는 중의 표현과 다음 토큰 분포는 달라진다. 예시를 문맥에서 지우면 그 예시를 현재 입력으로 사용할 수 없게 된다. 이 카드에서 예시를 늘리는 조작은 그 내용을 장기 기억의 새 가중치로 저장하는 학습을 실행하는 것이 아니다.',
            '설명용 Fig.2.1의 번역은 지시와 단어=>번역 예시로 네 설정을 비교한다. 실제 번역 평가의 프롬프트는 별도 supplement G의 Fig.G.36·G.38에서 확인한다. zero-shot은 언어를 지정하는 질문 형식, one/few-shot은 문장=번역 예시 형식이다. 이 카드에서는 다른 문구 변화의 영향을 섞지 않고 예시 추가를 보기 위해 지시·구분자·새 입력을 고정했다. 따라서 실제 번역 벤치마크의 프롬프트를 그대로 재현한 화면은 아니다.',
            '모든 과제가 같은 자유 생성 평가를 사용하는 것도 아니다. 논문은 후보 완성문에 언어모형 확률을 부여해 비교하는 과제와 직접 답을 생성하는 과제를 구분한다. 이 카드의 준비한 답은 그 어느 평가를 실행한 결과도 아니다. 예시 수를 바꿔도 같은 답을 표시하는 것은 데이터 설정이며 모형이 모든 조건에서 같은 정답을 냈다는 뜻이 아니다.',
            'NeurIPS Fig.1.1의 왼쪽과 가운데 SuperGLUE는 개발 자료 결과다. 캡션은 기존 시스템의 점선과 직접 같은 조건으로 비교할 수 없다고 밝힌다. few-shot K32는 각 과제의 입력 문맥에 주는32개 예시이며, 여덟 과제에 걸친256개와 한 문맥의 개수를 구분한다. 기존 비교 모형은 미세조정 자료와 사전학습·추가 지도학습 조건도 다르다.',
            '같은 그림 오른쪽은 정확도로 표현한42개 벤치마크를 집계한다. 자료·과제의 범위와 지표 조건을 유지하며 모든 언어 능력의 보편적 점수로 읽지 않는다. 평균 곡선이 나아졌다는 사실이 모든 개별 과제와 모든 K에서 반드시 향상한다는 뜻은 아니다.',
            '산술의 Table3.9는175B 모형에서 조건별 정답 일치를 평가했다. 각 과제에 무작위2,000문제를 만들었고, few-shot K50은 별도 supplement p.29 Fig.H.4 범례로 확인한다. 세 자리 덧셈의 few-shot 값은 Table3.9가80.4%, 앞 p.22 설명문이80.2%로 서로 다르다. 이 카드는 표의80.4%를 쓰며 원실험을 재현해 그 차이를 해결한 것이 아니다. 두 자리 덧셈100.0%와 다섯 자리 덧셈9.3%가 같은 few-shot 행에 있다. 자릿수와 연산을 바꿔도 같은 능력을 보장하는 일반 계산기를 검증한 것은 아니다.',
            '산술의 높은 점수가 단순 문장 암기만으로 설명되는지도 원문은 별도로 살핀다. 평가 문제와 학습 자료의 문자열 중복을 검사하고 오류의 형태를 조사했지만, 그것만으로 완전한 알고리즘 습득이나 모든 오염 가능성 배제를 증명하지는 않는다. 새 숫자를 직접 만든 이 카드의 사례도 모형의 재현 실험을 대신하지 않는다.',
            '§4와 관련 부록은 사전학습 자료와 평가 항목의 중복을 조사하고, 오염이 의심되는 항목을 뺀 조건을 비교한다. 원문은 필터링 과정의 문제와 남은 한계를 적는다. 사전학습 규모가 크다는 이유로 모든 시험 문장을 봤다고 단정하거나, 일부 중복 검사를 했다는 이유로 모든 누수를 배제했다고 단정하지 않는다.',
            '§5는 큰 모형에도 남은 한계를 기록한다. 긴 글의 일관성·상식적 추론·비교적 간단한 질문에서도 실패할 수 있으며, 모든 데이터셋에서 미세조정 방법과 경쟁적인 결과를 얻은 것은 아니다. 문맥 예시 활용이라는 구성의 가능성과 각 과제에서 검증된 성능 범위를 분리해 읽는다.'
          ],
          formula:'사전학습에서 배운 가중치: θ\n현재 입력 문맥:\ncₖ = [과제 지시, (x₁,y₁), …, (xₖ,yₖ), 새 입력 x*]\n\n출력은 같은 언어모형의 조건부 이어쓰기:\nP(y* | cₖ; θ)\n\nzero-shot: K=0 / one-shot: K=1 / few-shot: 여러 예시\n이 평가에서 θ는 고정, 경사 갱신 없음\n입력에 예시가 늘면 문맥과 읽는 중의 표현은 달라질 수 있다.\n\n미세조정은 다른 절차:\nθ′ = θ − η∇θ L(과제 정답 예시; θ)\n\n화면은 cₖ를 조립하고 직접 준비한 답을 별도로 표시한다.\n실제 모형의 확률·새 답 생성·학습은 실행하지 않는다.'
        }
      },
      keyIdeas:[
        {title:'지시뿐 아니라, 완성된 입출력으로 과제를 보여 준다',text:'예시에는 입력과 정답이 함께 있어 원하는 변환과 답 형식을 드러낸다. 새 입력은 같은 문맥의 끝에 놓고, 그 정답은 미리 알려 주지 않는다. 이렇게 과제를 글로 지정한 뒤 같은 언어모형이 답을 이어 쓰게 했다.'},
        {title:'과제 적응이 곧 가중치 갱신이라는 뜻은 아니다',text:'앞서 읽은 예시가 지금의 표현과 출력에 영향을 줄 수 있다. 그래도 정답 오차로 파라미터를 갱신하는 미세조정과는 다른 과정이다. GPT-3 연구의 핵심은 이 둘을 구분하고, 파라미터 고정 상태의 과제 수행을 평가한 데 있다.'},
        {title:'모형의 크기와, 문맥의 예시 수를 나누어 비교한다',text:'사전학습한 모형이 커질수록 예시에서 주는 정보를 더 잘 사용할 수 있는지 살폈다. 크기를 바꾼 조건과 같은175B에서 K를 바꾼 조건은 서로 다른 비교다. 원그림의 두 축을 나누어 읽어야 어느 변화에 관한 관찰인지 알 수 있다.'},
        {title:'몇 예를 따라 할 가능성과, 일반 추론의 완성을 나눈다',text:'적은 문맥 예시로 여러 과제에 적응하는 가능성을 보였지만, 자릿수와 과제가 바뀌면 성능 차이가 컸다. 새로 배운 규칙인지 익숙한 패턴을 알아본 것인지도 별도의 질문으로 남는다. 능력의 이름보다 실제 입력·평가 조건과 실패 범위를 확인한다.'}
      ],
      videos:[{title:'Stanford CS224N (2019) · Natural Language Generation',url:'https://www.youtube.com/watch?v=4uG1NMKNWCU',channel:'Stanford CS224N · 2019 공식 과정',note:'공식 일정의 2월 26일 언어 생성 강의와 연결된 배경 자료다. GPT-3 발표 이전 강의이며 GPT-3 원저자 발표나 전용 해설로 표시하지 않는다. 전체 시청·특정 구간·현재 재생은 확인하지 않았다.',sourceUrl:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html'}],
      references:[
        {title:'Brown 외31명 · Language Models are Few-Shot Learners · NeurIPS 2020 출판본',url:paper,location:'25쪽 출판본. p.2 Fig.1.1: SuperGLUE의 크기·문맥K·42벤치마크 집계. §2: 구조·자료·평가의 zero/one/few-shot. §4–5: 중복 검사와 한계. arXiv 판과 그림 번호·분량을 구분한다.'},
        {title:'Brown 외 · arXiv:2005.14165v4 · 2020-07-22 전체 원고',url:arxiv,location:'실제75쪽. p.3 Fig.1.1·p.4 서론 각주1: 메타학습과 과제 적응/인식 용어. p.7 Fig.2.1: FT와0/1/few-shot의 설정 도식. pp.21–23 §3.9.1·p.23 Table3.9: 산술 조건·결과·분석. 해당 그림과 본문을 직접 렌더해 대조했다.'},
        {title:'NeurIPS 2020 · 별도 보충자료',url:supplement,location:'32쪽 별도 PDF. pp.24–25 Fig.G.36·G.38: 실제 번역 평가 형식. p.26 Fig.G.44: 산술 문답 형식. p.29 Fig.H.4: 산술 few-shot K50. 본문 PDF와 쪽수를 섞지 않는다.'},
        {title:'NeurIPS · 공식 서지와 전체 공동저자',url:'https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html',location:'NeurIPS 2020 출판 기록·31명 저자·본문과 별도 supplement 연결을 확인했다. 연표의 일부 참여 인물 연결을 전체 저자명단으로 오해하지 않도록 구분한다.'},
        {title:'Stanford CS224N 2019 · 언어 생성 배경 강의',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html',location:'Tue Feb26 Natural Language Generation 행의 개별 video 링크를 확인했다. GPT-3 발표 이전의 언어 생성 배경 자료로 사용하며 원논문의 실험 근거로 쓰지 않는다.'},
        {title:'arXiv · 첫 공개와 판본 이력',url:'https://arxiv.org/abs/2005.14165',location:'v1은2020-05-28, v4는2020-07-22. 서지 comments의40+32 표기와 내려받은 v4의 실제75쪽을 구분한다.'}
      ]
    }
  });
})();
