/* Initial R1 report: January 2025 v1, distinct from later Nature/v2 text. */
(function(){
  'use strict';
  const paper='https://arxiv.org/pdf/2501.12948v1';
  const html='https://arxiv.org/html/2501.12948v1';
  const repo='https://github.com/deepseek-ai/DeepSeek-R1';
  const math='https://arxiv.org/pdf/2402.03300v1#page=13';
  const source={title:'DeepSeek-R1 · 2025년 1월 최초 보고서 v1',url:paper};
  const mathSource={title:'DeepSeekMath · 2024년 GRPO 선행 원논문 Figure 4',url:math};
  const content={
    article:{
      question:'풀이의 모든 중간 단계를 사람이 쓰지 않아도,\n정답을 확인하는 보상으로 추론을 더 배울 수 있을까?',
      opening:[
        '수학 문제의 답을 쓸 줄 아는 것과, 어려운 문제에서 풀이를 전개하고 다시 점검하는 능력은 같은 질문이 아니다. DeepSeek-R1 연구는 이미 사전학습한 언어모델이 여러 답변을 시도하게 하고, 확인 가능한 결과에 보상을 주어 그 행동을 더 학습시키려 했다.',
        '출발 실험인 R1-Zero는 DeepSeek-V3-Base에 추론 시범을 먼저 지도 미세조정하지 않고 강화학습을 적용했다. 사람의 지식이나 학습 자료 없이 출발했다는 뜻은 아니다. 이미 학습한 기초 모델, 사람이 구성한 문제·채점 규칙·출력 형식 위에서 이루어진 실험이다.',
        'GRPO는 같은 질문에서 나온 답변 묶음을 비교해, 묶음 안에서 상대적으로 보상이 높은 답변의 생성 확률을 높이는 쪽으로 학습한다. R1-Zero에서는 긴 풀이와 재검토 양상이 관찰됐지만, 읽기 어려움과 언어 혼합도 남았다. 최종 R1은 읽을 만한 초기 풀이 시범, 추론 강화학습, 선별 자료를 이용한 지도학습, 여러 상황의 강화학습을 결합했다.',
        '더 작은 모델로 옮기는 증류는 또 다른 경로다. R1이 만든 풀이 자료로 Qwen2.5·Llama 계열을 지도 미세조정한다. 큰 R1에 적용한 강화학습을 그대로 작은 모델마다 실행했다는 뜻이 아니다. 이 카드는 2025년 1월 첫 보고서의 세 경로를 구분해 읽는다.'
      ],
      visual:{
        id:'frontier-model-reading',modelKey:'deepseek-r1',navLabel:'답변 묶음·보상·학습 경로 읽기',
        title:'R1의 GRPO를, 앞선 DeepSeekMath 원도판과 연결해서 읽기',
        caption:'표시하는 PPO/GRPO 비교 원도판은 R1 자체의 그림이 아니라, R1이 인용한 2024년 DeepSeekMath Figure 4(PDF p.13)다. R1 v1의 §2.2.1·식(1)–(3)과 §2.3–2.4로 연결해 그 활용과 학습 경로를 읽는다.',
        reading:{
          intro:'먼저 2024년 선행 도판에서 질문 하나가 여러 답변과 보상으로 갈라지는 GRPO 경로를 찾는다. 이어 R1 보고서로 돌아와 어떤 보상을 썼는지, Zero·최종 R1·증류 모델의 학습이 어떻게 다른지 살펴본다. 이 화면에서 답변 생성이나 보상 최적화를 실행하지 않는다.',
          stages:[
            {id:'grpo',title:'01 같은 질문의 답변 묶음을 비교',figureLabel:'DeepSeekMath(2024) Figure 4 → R1 v1 §2.2.1',idea:'GRPO는 별도 가치모형의 예측 대신 같은 질문에서 표본 추출한 답변들의 상대적 보상을 학습 기준으로 삼는다.',points:['선행 도판의 PPO 경로와 GRPO 경로에서 가치모형의 차이를 찾는다.','보상은 여전히 필요하다. 가치모형을 없앴다는 말은 정답 확인과 채점도 없앴다는 말이 아니다.','R1의 수학·코드처럼 확인 가능한 문제에서는 정답·실행 결과와 형식에 관한 규칙 기반 보상을 사용한다.'],source:mathSource,limit:'이 도판은 GRPO의 선행 설명이다. DeepSeekMath의 데이터·모델·모든 보상 구성을 R1에 그대로 적용했다는 뜻은 아니다. R1의 구체적인 보상 근거는 v1 §2.2.2다.'},
            {id:'zero',title:'02 R1-Zero: 초기 추론 시범 없이 RL을 시험',figureLabel:'R1 v1 §2.2 · R1-Zero',idea:'이미 언어를 배운 V3-Base가 확인 가능한 보상을 받으며 풀이를 시도하게 하고, 어떤 행동이 나타나는지 관찰했다.',points:['없앤 것은 RL 이전의 추론 시범 SFT 단계다. 사전학습한 모델은 유지한다.','보고서는 더 긴 풀이와 재검토 사례를 관찰했다고 기술한다.','언어 혼합과 읽기 어려움은 최종 R1의 추가 학습을 설계하는 문제로 남았다.'],source,limit:'길어진 풀이가 항상 정답이거나 사람의 사고 과정을 그대로 드러낸다는 증거는 아니다. 관찰된 사례를 모든 영역의 추론 능력으로 확대하지 않는다.'},
            {id:'r1',title:'03 최종 R1: 시범과 보상을 여러 단계로',figureLabel:'R1 v1 §2.3.1–2.3.4 · 네 단계',idea:'읽을 만한 풀이로 출발점을 만들고, 보상으로 추론을 개선한 뒤, 선별한 자료와 여러 상황의 피드백으로 응답 범위를 넓힌다.',points:['초기 풀이 자료의 지도 미세조정 → 추론 중심 강화학습.','풀이를 선별하고 일반 응답 자료를 더한 지도 미세조정 → 여러 상황의 강화학습.','최종 단계는 확인 가능한 추론 보상과 일반 응답의 선호 평가를 구분해서 사용한다.'],source,limit:'R1-Zero의 “초기 SFT 없음”을 최종 R1에도 적용하지 않는다. 모든 네 단계가 GRPO 원도판 안에 그려져 있는 것도 아니다.'},
            {id:'distill',title:'04 증류: 생성한 풀이를 다른 기반 모델에 전달',figureLabel:'R1 v1 §2.4 · Distillation',idea:'큰 모델이 생성한 자료로 더 작은 언어모델을 지도 미세조정하여 풀이 양식을 전달한다.',points:['공식 공개 목록은 Qwen2.5·Qwen2.5-Math와 Llama 기반을 구분한다.','기반 모델의 선행 학습과 R1 생성 자료를 이용한 추가 학습은 서로 다른 기여다.','Qwen 기반을 이용했다는 사실은 두 회사의 특정 인물들이 공동저자였다는 근거가 아니다.'],source:{title:'DeepSeek-R1 · 공식 저장소의 Distill 기반 모델 표',url:repo},limit:'여기서 설명하는 초기 증류는 Qwen3 기반이 아니다. 생성 자료에 의한 지도학습을 작은 모델의 동일한 RL 실행이나 큰 모델 가중치의 복사로 표현하지 않는다.'}
          ],
          comparisons:[
            {id:'paths',title:'Zero·R1·Distill은 같은 학습 이력이 아니다',description:'어떤 모델에서 시작했고 어떤 신호로 학습했는지 나란히 읽는다.',rows:[{label:'R1-Zero',value:'V3-Base → 초기 추론 시범 SFT 없이 강화학습'},{label:'DeepSeek-R1',value:'초기 시범 SFT → 추론 RL → 선별 자료 SFT → 여러 상황 RL'},{label:'R1-Distill',value:'Qwen2.5·Llama 기반 → R1 생성 자료로 지도 미세조정'}],source},
            {id:'signals',title:'정답 채점·선호 평가·가치모형의 차이',description:'세 평가를 모두 “AI가 스스로 판단한다”라는 말로 묶으면 학습의 근거가 사라진다.',rows:[{label:'규칙 기반 보상',value:'확인 가능한 답·실행 결과·형식에 점수를 부여'},{label:'일반 응답 평가',value:'사람의 선호와 관련된 보상모형 등을 활용'},{label:'GRPO의 기준',value:'같은 질문의 답변 묶음에서 상대 보상을 계산 · 별도 가치모형은 생략'}],source},
            {id:'versions',title:'이 카드가 다루는 공개 시점',description:'처음 보고된 설계와 나중에 출판된 보고서를 섞지 않는다.',rows:[{label:'현재 본문 기준',value:'arXiv:2501.12948v1 · 2025-01-22'},{label:'표시 원도판',value:'DeepSeekMath v1 · 2024년 Figure 4'},{label:'별도 자료',value:'후속 Nature 판과 2026년 arXiv v2의 세부 사항은 이 카드의 실험 설정으로 사용하지 않음'}],source}
          ],
          related:[{id:'deepseek-v3',type:'event',label:'DeepSeek-V3 · 추론 학습의 기초 모델'},{id:'instructgpt',type:'event',label:'InstructGPT · 시범과 보상으로 응답을 조정'}]
        }
      },
      takeaway:{title:'정답 신호에서 풀이 행동을 배우되, 출발점과 평가 기준을 남긴다',text:'R1의 질문은 완성된 풀이를 모두 모방시키는 것에 그치지 않고, 여러 시도의 결과를 확인하며 풀이 행동을 학습할 수 있는가였다. 최종 시스템은 보상만으로 설명되지 않는다. 기초 모델, 초기 시범, 선별 자료와 일반 응답 학습이 함께 들어간다.'},
      technical:{
        title:'최초 보고서의 학습 신호와 증류를 더 읽기',
        paragraphs:[
          '기준은 arXiv:2501.12948v1(2025-01-22)이다. 후속 Nature 출판본이나 2026년 v2의 세부 설정을 첫 판의 사실로 합치지 않는다. 기초 아키텍처는 DeepSeek-V3-Base이며 R1을 새로운 독립 Transformer 구조의 제안으로 표시하지 않는다.',
          '§2.2.1의 GRPO는 질문마다 여러 답변을 표본 추출하고, 보상의 그룹 평균·표준편차로 상대적인 이점을 계산한다. 전체 최적화에는 정책 확률 비율의 클리핑과 기준 정책에 대한 KL 항도 있다. 아래 상대 보상 식 하나가 전체 학습 알고리즘은 아니다.',
          '§2.2.2의 R1-Zero 보상은 확인 가능한 답·코드 실행 결과 등 정확성 보상과 지정된 사고 과정 표지에 관한 형식 보상을 구분한다. 답의 최종 결과가 맞는지 확인하는 신호가 모든 중간 문장이 논리적으로 옳음을 보증하지는 않는다.',
          '§2.3.1의 초기 자료는 긴 풀이 예시, 모델의 생성, 읽을 수 있는 R1-Zero 결과, 사람의 후처리를 활용해 수집한다. §2.3.2는 추론 중심 RL에 언어 일관성 보상을 더한다. 읽기 선호를 맞추는 선택과 정확성의 교환도 원문이 논의한다.',
          '§2.3.3에서는 추론 결과를 선별하고 비추론 자료를 더해, V3-Base를 새 SFT 자료로 학습한다. 단지 앞선 RL 체크포인트에 같은 자료를 계속 덧붙였다는 도식과 구분해야 한다. §2.3.4의 마지막 RL은 일반적인 도움·안전 관련 응답까지 다룬다.',
          '§2.4의 증류 모델은 R1 생성 자료를 사용한 지도 미세조정이다. 공식 저장소의 기반 모델 표는 Qwen2.5-Math·Qwen2.5·Llama-3.1·Llama-3.3을 구분한다. 이 기술적 의존 관계만으로 Qwen의 특정 연구자와 량원펑 사이에 공동연구 선을 추가하지 않는다.',
          '긴 풀이·재검토의 관찰과 일반 지능의 입증은 구분한다. 보고서는 읽기·언어 혼합 문제와 실패한 시도도 기술한다. 이 화면은 새 모델의 답변 정확도, 실제 사고 과정, 강화학습 재현을 검증한 결과를 제공하지 않는다.'
        ],
        formula:'R1 v1 식(3) · 그룹 상대 보상의 핵심\nAᵢ = [rᵢ − mean(r₁,…,rG)] / std(r₁,…,rG)\n같은 질문에서 표본 추출한 답변 묶음 안의 비교\n\n전체 GRPO 목표는 이 식뿐 아니라\n정책 비율의 클리핑과 기준 정책에 대한 KL 항을 포함\n\nR1-Zero: 사전학습된 기반은 있음 / 초기 추론 SFT는 없음\n최종 R1: 초기 SFT와 후속 SFT·RL을 함께 사용\n증류: 생성 자료로 다른 기반 모델을 지도 미세조정'
      }
    },
    keyIdeas:[
      {title:'풀이를 모두 적어 주는 대신, 결과를 확인하는 신호를 쓴다',text:'확인 가능한 문제에서 여러 답변의 보상을 비교해 생성 정책을 학습한다. 채점할 수 있는 범위가 이 접근의 조건이며 결과 보상이 풀이의 모든 문장을 증명하지는 않는다.'},
      {title:'사전학습과 추론 중심 사후학습은 다른 기여다',text:'R1-Zero도 이미 언어를 학습한 V3-Base에서 시작한다. 초기 SFT를 생략한 실험을 지식·데이터·사람의 설계가 전혀 없는 학습으로 설명하지 않는다.'},
      {title:'더 작은 모델로의 전달은 자료를 통한 별도 학습이다',text:'증류 모델은 R1이 만든 풀이 자료와 기존 Qwen·Llama 기반을 결합한다. 큰 R1의 구조·가중치·강화학습 이력을 그대로 복제한 모델이 아니다.'}
    ],
    videos:[],
    references:[
      {title:'DeepSeek-AI · DeepSeek-R1 · 최초 보고서 v1',url:paper,location:'2025-01-22 첫 판. §2.2.1 식(1)–(3)·§2.2.2의 GRPO와 보상, §2.3.1–2.3.4의 네 단계, §2.4의 증류, Appendix A의 팀 기여 목록을 기준으로 한다. R1 v1 자체에 PPO/GRPO 구조도가 있다고 표시하지 않는다.'},
      {title:'DeepSeek-R1 · 첫 판 HTML 본문',url:html,location:'§2.3.3의 새 자료를 통한 V3-Base SFT와 §2.4의 지도학습 증류를 구분했다. Appendix A Core Contributors에 Daya Guo·Zhihong Shao, Contributors에 Wenfeng Liang이 명시된다. 인물 연결은 전체 기여 목록의 일부다.'},
      {title:'Shao 외 · DeepSeekMath · GRPO의 선행 원논문',url:math,location:'2024년 arXiv:2402.03300v1, §4.1·Figure 4(PDF p.13). PPO/GRPO의 가치모형과 그룹 보상 비교도다. R1이 인용한 방법의 앞선 원자료로 표시하며, R1 자체의 학습 전체 도식이나 R1의 동일한 실험 설정이라고 주장하지 않는다.'},
      {title:'DeepSeek-R1 · 공식 공개 저장소',url:repo,location:'Introduction·Model Summary·Distill Models 표의 Zero/최종 R1/증류 구분, Qwen2.5와 Llama 기반 모델의 정확한 이름을 대조한다. 현재 설치·추론 안내를 직접 실행한 결과로 제시하지 않는다.'}
    ]
  };
  const record={id:'deepseek-r1',year:2025,dateLabel:'2025-01-22 · 최초 보고서 v1',track:'neural',title:'여러 풀이의 결과를 확인하며, 추론을 더 배우다',subtitle:'DeepSeek-R1 · R1-Zero · GRPO · Distillation',people:['Liang Wenfeng','Daya Guo','Zhihong Shao'],authorNote:'DeepSeek-AI 팀의 공동연구다. v1 Appendix A는 Daya Guo·Zhihong Shao를 core contributors, Wenfeng Liang을 contributors에 기재한다. 연결한 세 이름은 전체 저자 명단이 아니며 창업자 한 사람의 발명으로 표시하지 않는다.',summary:'사전학습된 V3-Base 위에서 여러 답변의 보상을 비교해 추론 행동을 학습했다. 초기 SFT가 없는 R1-Zero, 네 단계의 최종 R1, Qwen·Llama 기반 지도학습 증류를 구분한다.',detail:'2025년 1월 첫 보고서의 GRPO·보상·cold start·선별 자료 SFT·후속 RL과 증류를 읽는다. GRPO 원도판은 2024년 DeepSeekMath Figure 4라는 출처와 시점을 유지한다.',question:content.article.question,visual:'probability',sources:[source,mathSource,{title:'DeepSeek-R1 · 공식 저장소',url:repo}],caveat:'2025년 1월 최초 보고서 v1에 한정한다. GRPO 비교 그림은 R1이 인용한 2024년 DeepSeekMath 원도판이다. R1-Zero의 초기 SFT 생략을 사전학습·사람의 설계 부재로 해석하지 않는다. 출력된 풀이가 실제 내부 사고의 충실한 기록이거나 항상 옳다는 증거는 아니다. 실제 생성·학습·성능 실험을 실행하지 않는다.',related:['deepseek-v3','instructgpt'],content};
  if((window.TIMELINE_DATA||[]).some(row=>row.id===record.id))throw new Error('Duplicate DeepSeek-R1 timeline record.');
  (window.TIMELINE_DATA=window.TIMELINE_DATA||[]).push(record);
  window.AtlasEntries.register({id:record.id,record:{...record},content});
  window.AtlasDeepSeekR1Entry=record;
})();
