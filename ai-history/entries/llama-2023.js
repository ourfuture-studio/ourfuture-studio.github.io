/* The first LLaMA, fixed to the February 2023 paper and release conditions. */
(function(){
 'use strict';
 const paper='https://arxiv.org/pdf/2302.13971v1';
 const announcement='https://ai.meta.com/blog/large-language-model-llama-meta-ai/';
 const code='https://github.com/meta-llama/llama/blob/llama_v1/llama/model.py';
 const content={article:{
  question:'언어 능력을 얻으려면,\n모델의 크기를 계속 키워야만 할까?',
  opening:[
   '문장 다음에 올 말을 잘 예측하려면 단어의 순서만 외워서는 부족하다. 누가 무엇을 했는지, 앞에서 설명한 대상이 무엇인지, 질문 다음에는 어떤 답이 이어지는지를 문맥에서 구분해야 한다. LLaMA도 이 문제를 다음 토큰 예측으로 다루는 Transformer 언어모델이다. 문장을 다루는 능력을 규칙 목록에 모두 적는 대신, 많은 글의 예측 오차가 연결값을 바꾸도록 했다.',
   '이 연구가 새로 던진 질문은 능력과 모델 크기의 관계다. 큰 모델은 학습할 연결값이 많지만 답변을 생성할 때마다 그 큰 망의 계산을 거쳐야 한다. 한 번 학습하고 여러 번 사용하는 모델이라면, 학습을 가장 빨리 끝내는 선택과 계속 사용하기 좋은 선택이 같지 않을 수 있다.',
   'Touvron·Lample을 포함한 Meta AI의 공동연구팀은 상대적으로 작은 모델도 더 많은 토큰으로 오래 학습하는 방향을 택했다. 7B·13B에는 1조 토큰, 33B·65B에는 1.4조 토큰을 사용했다. 크기와 학습량을 함께 조절해, 서로 다른 사용 계산 예산에서 쓸 수 있는 언어모델을 만들려 했다. 이는 작은 모델이 언제나 큰 모델보다 낫다는 법칙이 아니라 이 연구의 설계와 평가 결과다.',
   '구조는 기존 Transformer의 축적 위에 놓여 있다. 앞 문맥을 참고하는 인과적 Attention, 층에 들어가기 전의 RMSNorm, 위치를 Q·K에 반영하는 RoPE, 표현을 변환하는 SwiGLU를 연결했다. 다음 토큰을 예측한다는 목표와 이 목표를 큰 규모로 학습할 수 있게 하는 구조의 선택을 함께 읽어야 한다.',
   '아래 원표는 논문에 실제로 실린 모델별 구성이다. 원문에는 전체 층을 그린 아키텍처 도판이 없으므로, 이어지는 블록 그림은 §2.2와 최초 공식 코드의 연결을 대조해 직접 재구성했다. 원표·원곡선과 자체 그림을 구분해 살펴볼 수 있다.'
  ],
  visual:{id:'llama-2023-learning',navLabel:'크기·문맥·층의 연결',title:'작은 망에, 더 많은 글의 규칙성을 익히다',caption:'원표에서 모델 크기를 고른 뒤, 그 모델의 층 구성과 문맥을 참고할 수 있는 범위를 바꿔 보세요. 학습량 보기에는 원논문 Figure 1의 실제 학습 곡선을 함께 두었습니다.'},
  takeaway:{title:'지능을 얻는 방법과, 그 지능을 계속 사용할 비용을 함께 묻다',text:'핵심은 새 층 하나의 발명이 아니다. 문맥을 참고해 다음 토큰을 예측하는 기존 신경망에 더 많은 학습 기회를 주고, 그 능력을 담을 모델의 크기와 사용 부담을 함께 설계하려 한 연구다.'},
  technical:{title:'학습 자료·구조·평가 조건을 더 읽기',paragraphs:[
   '이 기록은 2023-02-24 Meta 발표와 2023-02-27 arXiv v1을 기준으로 한다. 논문 1쪽은 Hugo Touvron·Thibaut Lavril·Gautier Izacard·Edouard Grave·Guillaume Lample에 동등 기여를 표시하며, 전체 공동저자는 14명이다. 인물 연결 두 명은 전체 저자나 단독 기여자를 뜻하지 않는다.',
   '§1은 학습 계산만 최적화하는 문제와 추론 예산까지 고려하는 문제를 구분한다. 같은 목표 성능에서 모델을 반복 사용한다면 작은 모델을 더 오래 학습하는 선택이 유리할 수 있다는 동기다. 이 카드의 모델 버튼은 원문이 실제 학습한 네 설정을 고른다. 중간 크기의 성능·학습 곡선·비용을 보간해 만들지 않는다.',
   '§2.1과 Table 1의 자료는 CommonCrawl 67%, C4 15%, GitHub 4.5%, Wikipedia 4.5%, Books 4.5%, arXiv 2.5%, StackExchange 2%의 샘플링 비율이다. 이는 학습 표본을 뽑는 비율이며 출처별 고유 문서 수의 비율이 아니다. 여러 출처의 정제·중복 제거 과정도 각각 다르다. 논문이 공개 접근 가능 자료라고 기술한 것과 모든 자료의 재사용 권리가 무제한이라는 주장은 구분한다.',
   'Table 2의 파라미터 수는 6.7B·13.0B·32.5B·65.2B이며 7B·13B·33B·65B는 모델 이름이다. 층 수는 32·40·60·80, 표현 차원은 4096·5120·6656·8192, Attention head 수는 32·40·52·64다. 본문의 수치와 모형 선택 화면은 이 표를 그대로 따른다.',
   '§2.2는 각 하위층의 입력에 RMSNorm을 적용하는 pre-normalization, SwiGLU, RoPE를 설명한다. 원래 Transformer의 절대 위치 임베딩을 그대로 더하는 것으로 그리지 않는다. 공식 llama_v1 model.py의 TransformerBlock.forward는 Attention과 FeedForward 각각에 정규화와 잔차 더하기가 있음을 보여 준다. apply_rotary_emb는 Q·K에 위치 회전을 적용한다. 그림의 공유는 모든 위치에 같은 층의 연결값을 쓴다는 뜻이며 서로 다른 층의 연결값이 같다는 뜻은 아니다.',
   '인과 마스크에서는 현재 위치의 출력이 자기 위치까지의 입력을 참고할 수 있다. 그 출력의 정답은 바로 다음 토큰이다. 정답 토큰을 Attention 입력에 미리 보여 주는 그림이 되어서는 안 된다. 원래 코드의 KV 캐시는 이미 계산한 K·V를 재사용하는 장치이며 학습된 지식 전체나 대화의 장기 기억을 뜻하지 않는다.',
   'Figure 1은 학습 토큰 수에 따른 훈련 손실이다. 외부 시험 문제의 정확도나 사람의 지능 점수가 아니다. 크기가 다른 모델의 훈련 손실이 낮아지는 모습을 읽을 수 있지만, 모든 과제의 성능이 같은 비율로 개선된다고 바꾸어 말할 수 없다. §3은 20개 벤치마크의 zero-shot·few-shot 평가를 별도로 보고하고, §3.7은 학습 진행 중의 과제별 변화도 다룬다.',
   '기본 LLaMA와 사람의 지시를 따르도록 추가 학습한 LLaMA-I는 구분한다. §4의 지시 미세조정은 별도 탐색이며, 이 카드의 기본모델을 처음부터 대화 비서로 설명하지 않는다. §5는 편향·유해성·잘못된 정보의 평가를 다룬다. 자연스러운 다음 토큰 예측이 사실 확인이나 안전한 응답을 보장하지 않는다.',
   '최초 공식 발표의 모델 접근은 연구 목적 비상업 라이선스와 신청·승인 절차를 사용했다. 이후 Llama 2·3나 다른 판본의 조건을 2023년 첫 LLaMA에 적용하지 않는다. 원논문 배포 조건, 공식 코드의 라이선스, 모델 가중치의 사용 조건도 서로 다르다.'
  ],formula:'다음 토큰의 학습 목표\nL(θ) = −Σₜ log Pθ(xₜ₊₁ | x₁,…,xₜ)\n\n한 Transformer 블록의 연결 (원코드를 따라 재표기)\nh = x + Attention(RMSNorm(x), RoPE, causal mask)\ny = h + SwiGLU(RMSNorm(h))\n\nAttention은 위치 사이를 연결한다.\nSwiGLU는 각 위치의 표현을 같은 연결값으로 변환한다.\n서로 다른 층은 각자의 연결값을 갖는다.\n\n모델 버튼의 수치는 Table 2에서 읽는다.\n토큰 마스크는 j ≤ i를 실제 계산한다.\n원래 토큰화·Attention 가중치·학습·문장 생성은 실행하지 않는다.'}
 },keyIdeas:[
  {title:'다음 말을 배우는 동안, 문맥을 구별하는 표현을 만든다',text:'같은 단어라도 앞 문장에 따라 다음 말이 달라진다. Attention은 현재 위치가 참고할 앞 위치들을 연결하고, 여러 층은 그 연결에서 얻은 정보를 다시 표현한다. 예측 오차가 이 과정의 연결값을 함께 바꾸므로 사람이 모든 문맥 규칙을 따로 작성할 필요를 줄이려 했다.'},
  {title:'학습을 끝내기 좋은 모델과, 사용하기 좋은 모델은 다를 수 있다',text:'학습은 큰 비용을 한 번 치르지만 응답 서비스는 사용 때마다 계산한다. LLaMA는 그 후자의 부담을 설계 질문에 넣었다. 상대적으로 작은 망도 더 많은 토큰으로 학습하며 능력을 끌어올릴 수 있는지 시험했다.'},
  {title:'구조를 새로 발명하기보다, 검증된 선택을 이어 붙였다',text:'문맥 연결은 Transformer에서, 입력 정규화·게이트를 둔 변환·회전 위치 표현은 앞선 연구에서 가져왔다. 무엇을 원용했는지는 원문 §2.2가 직접 밝힌다. 구조의 계보와 모델 규모의 선택을 나누면 연구의 기여를 정확히 읽을 수 있다.'},
  {title:'원곡선은 무엇이 좋아졌는지도 한정한다',text:'Figure 1의 하강은 학습 문장을 예측하는 손실이 낮아졌다는 기록이다. 기본모델의 사실성·안전성·대화 능력 전체의 증명이 아니다. 개별 과제 평가와 지시 미세조정, 사용 조건은 별도로 확인해야 한다.'}
 ],videos:[],references:[
  {title:'Touvron 외 · LLaMA: Open and Efficient Foundation Language Models · 2023 v1',url:paper,location:'PDF 1쪽 §1과 동등 기여 표시, 2쪽 §2.1·Table 1, 3쪽 §2.2–2.4·Table 2·Figure 1, 4쪽 §3의 평가 설정, 6–7쪽 §3.7, 7쪽 §4, 7–10쪽 §5, 8쪽 Figure 2를 확인했다. Table 2와 Figure 1을 3쪽에서 원래 라벨·숫자·선을 유지해 발췌했다. 전체 층 아키텍처 도판은 없으며 자체 블록 그림과 구분한다.'},
  {title:'Meta · Introducing LLaMA · 2023-02-24',url:announcement,location:'공식 발표일, 네 크기의 기본모델, 다음 단어 예측 설명, 연구 목적 비상업 접근·신청 조건을 확인했다. 이후 판본으로 안내하는 상단 갱신 문구를 첫 공개 조건으로 섞지 않는다.'},
  {title:'Meta · 최초 LLaMA 공식 코드 · llama_v1/model.py',url:code,location:'RMSNorm, apply_rotary_emb, Attention.forward, FeedForward.forward, TransformerBlock.forward, Transformer.forward의 연결 순서를 대조했다. 코드 자체를 복사·실행한 모델 그림이 아니라 논문과 공식 구현을 읽고 직접 그린 재구성이다.'},
  {title:'arXiv · LLaMA v1 서지',url:'https://arxiv.org/abs/2302.13971v1',location:'최초 제출 2023-02-27과 공동저자를 확인했다. 회사의 공개 발표 02-24와 원고 제출일을 별도로 표시한다.'},
  {title:'LLaMA v1 논문 그림 · CC BY 4.0',url:'https://creativecommons.org/licenses/by/4.0/',location:'arXiv v1 서지의 view license가 연결하는 논문 라이선스다. Touvron 외의 Table 2·Figure 1을 원문 PDF 3쪽에서 렌더·발췌했고, 라벨·수치·곡선은 바꾸지 않았다. 논문 이미지의 조건과 모델 가중치 사용 조건은 별개다.'}
 ]};
 const record={id:'llama-2023',year:2023,dateLabel:'2023-02-24 공개 · 02-27 arXiv v1',track:'neural',title:'모델 크기와 학습량을 함께 설계하다',subtitle:'LLaMA · Open and Efficient Foundation Language Models',people:['Hugo Touvron','Guillaume Lample'],authorNote:'Touvron·Lample을 포함한 Meta AI 공동저자 14명의 연구다. 두 인물 연결은 전체 저자 목록이나 두 사람만의 단독 기여를 뜻하지 않는다. v1은 다섯 명에게 동등 기여를 표시한다.',summary:'다음 토큰을 예측하는 Transformer를 더 많은 토큰으로 학습하고, 모델 크기와 반복 사용의 추론 부담을 함께 설계했다.',detail:'원논문 Table 2·Figure 1과 공식 첫 판본 코드를 연결해, 모델별 구성·인과적 문맥·RMSNorm·RoPE·SwiGLU를 살펴본다.',question:content.article.question,visual:'network',sources:[{title:'LLaMA · 2023 v1 PDF',url:paper},{title:'Meta · 최초 공식 발표',url:announcement}],caveat:'첫 LLaMA의 2023년 기록이다. 실제 원표·원곡선과 직접 재구성한 층 그림을 구분한다. 문맥 마스크와 표의 조건을 바꾸는 기능이며 원래 모델의 토큰화·학습·추론·속도·성능 실험을 실행하지 않는다. 최초 연구 목적 비상업 접근 조건을 후속 판본과 섞지 않는다.',related:['transformer','gpt3','instructgpt'],content};
 if((window.TIMELINE_DATA||[]).some(e=>e.id===record.id))throw Error('Duplicate first LLaMA record.');
 (window.TIMELINE_DATA=window.TIMELINE_DATA||[]).push(record);
 window.AtlasEntries.register({id:record.id,record:{...record},content});
 window.AtlasLlama2023Entry=record;
})();
