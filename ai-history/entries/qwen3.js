/* Qwen3 is a dated team research record, not a claim about the latest Qwen release. */
(function(){
 'use strict';
 const paper='https://arxiv.org/pdf/2505.09388v1',report='https://arxiv.org/abs/2505.09388v1',blog='https://qwenlm.github.io/blog/qwen3/',repo='https://github.com/QwenLM/Qwen3';
 const source=(page,title)=>({title:'Qwen Team · Qwen3 Technical Report · '+title,url:paper+'#page='+page});
 const content={article:{
  question:'어려운 문제는 더 풀어 보고,\n간단한 질문은 곧바로 답하는 능력을 같은 모델이 배울 수 있을까?',
  opening:[
   '날짜를 묻는 질문과 여러 조건을 따져야 하는 수학 문제에 같은 길이의 답변 과정을 쓸 필요는 없다. Qwen3의 질문은 길게 추론하는 모델과 빠르게 답하는 모델을 따로 배포하는 대신, 한 모델이 두 응답 방식을 함께 익히게 할 수 있는가였다.',
   'Qwen 팀은 먼저 여러 언어와 코드·수학 자료로 기본 언어모델을 학습했다. 그 위에 긴 풀이 사례를 배우는 단계와 검증 가능한 문제의 보상으로 탐색을 개선하는 단계를 두었다. 이어 긴 추론이 있는 자료와 바로 답하는 지시 자료를 함께 학습해, 같은 모델이 요청의 서식에 따라 두 방식으로 응답하도록 했다.',
   '핵심은 같은 모델의 연결값에 추론과 직답의 응답 양식을 함께 익히게 한 것이다. 보고서의 hybrid thinking은 이 두 응답 모드의 통합을 뜻한다. 이 타임라인에서 말하는 신경망·심볼릭 추론기의 결합 연구와는 구분한다. 추론을 얼마나 길게 생성할지도 조절할 수 있지만, 길게 쓴다는 사실만으로 논리와 정답이 보장되지는 않는다.',
   'Qwen3는 하나의 크기나 구조만을 가리키지 않는다. 조밀한 모델과 일부 전문가를 선택하는 MoE 모델을 함께 공개했고, 작은 모델에는 큰 모델의 출력을 전달하는 증류 경로도 사용했다. 원도판에서 위쪽의 대표 모델 학습과 아래쪽의 작은 모델 증류를 나누어 읽어야 한다.'
  ],
  visual:{id:'frontier-model-reading',modelKey:'qwen3',navLabel:'추론과 직답을 함께 배우다',title:'두 응답 방식을, 하나의 모델 안에 익히다',caption:'원보고서의 사후학습 도식을 먼저 읽고, 네 단계의 목적과 사고·직답·추론 예산의 차이를 연결합니다. 모델을 새로 실행하거나 가상의 성능 결과를 만들지 않습니다.',reading:{
   intro:'Figure 1의 위쪽은 대표 모델의 네 단계 사후학습이고, 아래쪽은 큰 모델을 교사로 삼아 작은 모델에 능력을 전달하는 경로다. 두 갈래는 모든 모델이 똑같은 절차를 거쳤다는 뜻이 아니다.',
   stages:[
    {id:'cold-start',title:'긴 풀이의 형태를 익히다',figureLabel:'Stage 1 · Long-CoT Cold Start',idea:'정답이나 테스트로 확인할 수 있는 문제에 긴 풀이 사례를 붙여, 기본 모델이 추론의 응답 형태를 익히게 한다.',points:['부정확한 답·반복·추론과 요약의 불일치를 걸러 낸 자료를 사용한다.','기본 언어 능력을 처음부터 만드는 단계와 사후학습을 구분한다.'],source:source(10,'§4.1 · 긴 추론의 준비 단계'),limit:'풀이 사례를 따라 쓰는 능력과 새로운 문제의 정답 보장은 다르다.'},
    {id:'reasoning-rl',title:'검증 가능한 문제의 보상으로 탐색을 바꾸다',figureLabel:'Stage 2 · Reasoning RL',idea:'답이나 코드 테스트로 평가할 수 있는 문제에서 여러 응답을 생성하고, 보상을 이용해 모델의 연결값을 조정한다.',points:['준비 학습에 쓰지 않은 문제·검증기 쌍을 사용한다.','원보고서는 GRPO를 적용하며 탐색과 활용의 균형도 다룬다.'],source:source(10,'§4.2 · 추론 강화학습'),limit:'보상으로 측정한 과제의 개선을 모든 질문의 신뢰성으로 확대하지 않는다.'},
    {id:'mode-fusion',title:'길게 풀기와 바로 답하기를 같은 모델에 합치다',figureLabel:'Stage 3 · Thinking Mode Fusion',idea:'추론 자료와 직답 자료를 섞은 지도 미세조정으로, 앞에서 만든 추론 모델에 빠른 응답 방식도 함께 익히게 한다.',points:['같은 모델이 채팅 서식에 맞추어 추론 부분과 최종 답을 구성한다.','원도판의 단계는 사람의 의식이나 실제 생각을 측정한 도식이 아니다.'],source:source(11,'§4.3 · 모드 통합과 Table 9'),limit:'모드를 바꾸는 것은 새 모델을 학습하거나 다른 크기의 모델로 교체하는 조작이 아니다.'},
    {id:'general-rl',title:'추론 밖의 응답 조건도 함께 다듬다',figureLabel:'Stage 4 · General RL',idea:'일반 과제의 강화학습으로 지시·서식·선호·도구 사용 등 여러 응답 조건을 다룬다.',points:['규칙으로 계산한 보상과 참조 답을 쓰는 모델 평가, 선호 보상모델을 구분한다.','작은 모델에는 별도의 교사-학생 증류 경로가 이어진다.'],source:source(12,'§4.4–4.5 · 일반 과제와 증류'),limit:'여러 능력 사이의 교환이 있다. 모든 평가 점수가 각 단계마다 올라가는 것은 아니다.'}
   ],
   comparisons:[
    {id:'thinking',title:'추론을 이어 쓴 뒤 답하기',description:'복잡한 문제에서 단계적 추론과 최종 답을 구분해 출력하도록 학습한 경로를 읽는다.',rows:[{label:'선택하는 것',value:'같은 모델의 thinking 응답 서식'},{label:'응답 구성',value:'추론 부분 다음에 최종 답을 잇는다.'},{label:'확인할 점',value:'길고 자연스러운 풀이에도 잘못된 전제나 계산이 남을 수 있다.'}],source:source(11,'§4.3 · Thinking Mode Fusion')},
    {id:'non-thinking',title:'별도 추론 출력을 생략하고 답하기',description:'같은 모델이 직답 자료와 서식도 익히므로, 모든 질문에서 긴 풀이를 먼저 생성할 필요가 없다.',rows:[{label:'선택하는 것',value:'같은 모델의 non-thinking 응답 서식'},{label:'응답 구성',value:'추론 블록이 빈 형식으로 곧바로 답을 잇는다.'},{label:'구분할 점',value:'신경망 계산 자체가 없어지거나 내부 상태를 읽는다는 뜻이 아니다.'}],source:source(11,'Table 9 · 두 모드의 채팅 서식')},
    {id:'budget',title:'추론 길이의 예산을 정하기',description:'추론 토큰 생성이 정한 길이에 도달하면 추론을 끝내고, 그때까지의 내용에서 최종 답을 생성하도록 한다.',rows:[{label:'바꾸는 것',value:'추론을 생성할 토큰 예산'},{label:'연결값',value:'이 요청의 예산 조작으로 연결값을 다시 학습하지 않는다.'},{label:'검토할 점',value:'예산과 성능의 관계는 문제·모델·평가 조건별로 확인한다.'}],source:source(11,'§4.3 · Thinking Budget; §4.7의 평가와 구분')}
   ],
   related:[{id:'transformer',type:'event',label:'Transformer · 문맥을 연결하는 기반 구조'},{id:'instructgpt',type:'event',label:'InstructGPT · 사후학습과 피드백'},{id:'deepseek-r1',type:'event',label:'DeepSeek-R1 · 추론 강화학습과 비교해 읽기'}]
  }},
  takeaway:{title:'응답에 쓸 계산의 형태도 학습과 제어의 대상이다',text:'지능을 하나의 정답률로만 보지 않고, 어떤 문제에서 추론을 이어 가고 어떤 요청에서 바로 답할지도 다룬다. 모드 선택·토큰 예산·학습된 능력은 서로 다른 층위다.'},
  technical:{title:'구조·학습·평가 조건을 더 읽기',paragraphs:[
   '이 기록은 2025년의 첫 Qwen3 공개와 기술 보고서 v1을 기준으로 한다. 공식 공개 글은 2025년 4월 29일, arXiv 제출은 5월 14일이며, 내려받은 v1 PDF 표지는 5월 15일을 표시한다. 2026년 현재의 최신 Qwen 모델이나 팀 직책을 설명하는 기록이 아니다.',
   '§2·Tables 1–2는 조밀한 모델 여섯 개와 MoE 모델 두 개를 구분한다. 기본 구조에는 GQA·SwiGLU·RoPE·RMSNorm이 쓰이고, QKV bias 제거와 QK-Norm을 설명한다. MoE 모델은 전문가 128개 중 토큰마다 8개를 활성화하며 공유 전문가는 두지 않는다. 이 구조 선택과 사고/직답 모드 선택은 같은 개념이 아니다.',
   '§3은 일반 자료, 지식 집약 자료, 긴 문맥 자료를 쓰는 세 단계 사전학습을 설명한다. Figure 1·§4의 사후학습은 이미 만들어진 기본 모델에서 응답 능력과 제어를 다듬는 과정이다. 원도판의 대표 모델 네 단계와 작은 모델의 증류 경로를 합쳐 하나의 공통 실행 순서로 표시하지 않는다.',
   '§4.3·Table 9는 /think·/no_think와 채팅 서식의 관계를 설명한다. 직답 자료에서도 빈 추론 블록을 유지한다. 예산 제어에서는 정한 길이에 도달한 뒤 추론을 마무리하고 최종 답으로 넘어가게 한다. 이는 사용 중인 모델의 가중치를 수정하는 학습이나 의식의 깊이를 측정하는 절차가 아니다.',
   '§4.5의 작은 모델 증류는 교사 출력의 응답을 배우는 단계와, 학생이 생성한 문맥에서 교사 로짓에 맞추는 단계를 구분한다. R1의 공개 증류 모델 가운데 Qwen 기반 모델은 Qwen2.5 계열에서 출발했다. 이 카드의 Qwen3가 당시 R1 증류의 출발 모델이었다고 연결하지 않는다.',
   '§4.7·Table 22는 단계별 평가에서 일부 일반·지시 과제가 좋아지는 한편 어려운 수학·코딩 지표가 낮아진 경우도 보고한다. 보고서의 추론 예산 실험을 모든 개별 문제에서 더 긴 풀이가 더 정확하다는 보장으로 읽지 않는다. 이 화면은 새로운 모델 응답·훈련·성능 실험을 수행하지 않는다.'
  ],formula:'사전학습: 언어와 지식을 담는 기본 모델\n대표 모델의 사후학습: 긴 풀이 준비 → 추론 RL → 사고·직답 통합 → 일반 RL\n작은 모델: 큰 모델의 능력을 전달하는 별도 증류 경로\n\n사용 시 제어: 응답 모드 / 추론 토큰 예산\n이 제어와 모델 연결값을 바꾸는 학습을 구분한다.'}
 },keyIdeas:[
  {title:'응답 양식도 연결값에 익힌다',text:'긴 추론을 낼지 곧바로 답할지의 차이를 별도 시스템 두 개의 배포 문제로만 두지 않고, 같은 모델이 배울 응답 형태로 다루었다.'},
  {title:'MoE 구조와 사고 모드는 서로 다른 선택이다',text:'어떤 전문가를 활성화하는 구조의 계산과, 추론 부분을 얼마나 생성하는지는 구분해야 한다. 조밀한 Qwen3 모델도 사고·직답 모드를 지원한다.'},
  {title:'작은 모델에는 능력을 전달하는 경로를 쓴다',text:'대표 모델이 배운 응답과 분포를 작은 모델의 학습에 이용한다. 원도판의 위쪽 네 단계를 모든 작은 모델이 그대로 반복한다는 뜻은 아니다.'},
  {title:'능력의 교환과 실패를 함께 읽는다',text:'일반 지시를 잘 따르는 능력과 어려운 추론 문제의 성능이 항상 같은 방향으로 바뀌지는 않는다. 서식 준수와 정답의 정확성도 따로 확인해야 한다.'}
 ],videos:[],references:[
  {title:'Qwen Team · Qwen3 Technical Report · v1 PDF',url:paper,location:'PDF 표지 날짜2025-05-15. §2/Tables1–2 PDF3, Figure1 PDF9, §4.1–4.2 PDF10, §4.3·Table9 PDF11, §4.4–4.5 PDF12, §4.7·Table22 PDF21–22, §6 공동저자 PDF22를 읽었다. 원도판은 별도 원자료 패널에서 표시한다.'},
  {title:'arXiv · Qwen3 Technical Report · v1 서지',url:report,location:'첫 제출2025-05-14와 공동저자를 확인했다. PDF 표지 날짜와 공식 모델 공개일은 별도 구분한다.'},
  {title:'Qwen Team · Qwen3: Think Deeper, Act Faster',url:blog,location:'2025-04-29 공식 공개 글. 조밀한/MoE 모델, 사고·직답 통합, 세 단계 사전학습과 네 단계 사후학습 설명을 확인했다.'},
  {title:'QwenLM · Qwen3 공식 저장소',url:repo,location:'공식 프로젝트·공개 모델·사용 서식의 연결을 확인했다. 코드나 모델을 이 사이트에서 실행한 것으로 표시하지 않는다.'},
  {title:'DeepSeek-AI · DeepSeek-R1 공식 저장소',url:'https://github.com/deepseek-ai/DeepSeek-R1',location:'§3 Model Downloads의 Distill Models 표와 §7 License에서 R1의 Qwen 증류 모델이 Qwen2.5 계열 기반임을 확인했다. Qwen3와 R1의 연결은 학습 방법의 비교로 한정한다.'}
 ]};
 const record={id:'qwen3',year:2025,dateLabel:'2025-04-29 공개 · 05-14 arXiv 제출',track:'neural',title:'추론과 직답을, 하나의 모델에 익히다',subtitle:'Qwen3 · Thinking Mode Fusion',people:['Junyang Lin','An Yang','Binyuan Hui','Jingren Zhou'],authorNote:'Qwen Team의 공동연구다. 여기에 연결한 Lin·Yang·Hui·Zhou는 원보고서의 공동저자이며 전체 저자 목록이거나 개인별 단독 기여를 뜻하지 않는다.',summary:'긴 추론과 직접 응답의 자료를 한 모델의 사후학습에 결합하고, 요청의 응답 모드와 추론 예산을 제어하도록 했다.',detail:'원보고서의 사후학습 네 단계와 작은 모델 증류 경로를 나누어 읽는다. 같은 모델의 사고·직답 제어, MoE 전문가 선택, 학습에 의한 연결값 변화는 구분한다.',question:content.article.question,visual:'network',sources:[{title:'Qwen3 Technical Report · v1',url:paper},{title:'Qwen Team · 공식 공개 글',url:blog}],caveat:'2025년 첫 Qwen3 공개와 보고서 v1의 기록이다. Qwen 팀의 공동연구이며 특정 인물의 단독 발명으로 귀속하지 않는다. 원도판·서식·학습 경로를 읽는 화면이고 실제 모델 응답·신경망 학습·성능·지연 실험은 실행하지 않는다. 사고/직답 모드와 구조의 전문가 선택을 구분한다.',related:['transformer','instructgpt','deepseek-r1'],content};
 if((window.TIMELINE_DATA||[]).some(e=>e.id===record.id))throw Error('Duplicate Qwen3 research record.');
 (window.TIMELINE_DATA=window.TIMELINE_DATA||[]).push(record);window.AtlasEntries.register({id:record.id,record:{...record},content});window.AtlasQwen3Entry=record;
})();
