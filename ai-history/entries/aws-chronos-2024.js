/* Chronos v1 is a 2024 univariate/token-sampling study; Chronos-2 is a separate report. */
(function(){
 'use strict';const id='aws-chronos-2024',pdf='https://arxiv.org/pdf/2403.07815v1',repo='https://github.com/amazon-science/chronos-forecasting',sha='1224fafa91e1ecd6674f5204066b159e40b5e4a1',code=repo+'/blob/'+sha+'/src/chronos/chronos.py',at=(p,t)=>({title:'Chronos (2024 v1) · '+t,url:pdf+'#page='+p});
 const authors=['Abdul Fatir Ansari','Lorenzo Stella','Caner Turkmen','Xiyuan Zhang','Pedro Mercado','Huibin Shen','Oleksandr Shchur','Syama Sundar Rangapuram','Sebastian Pineda Arango','Shubham Kapoor','Jasper Zschiegner','Danielle C. Maddix','Michael W. Mahoney','Kari Torkkola','Andrew Gordon Wilson','Michael Bohlke-Schneider','Yuyang Wang'];
 const content={article:{
  question:'다른 분야에서 배운 시간의 패턴으로,\n처음 보는 시계열의 미래도 예측할 수 있을까?',
  opening:[
   '상품 수요와 전력 사용량은 단위도 규모도 다르다. 새 데이터가 생길 때마다 예측 모형을 처음부터 학습하는 대신, 여러 분야의 시계열에서 미리 배운 모형에 최근 이력을 주어 바로 예측하게 할 수 있을까? Chronos는 무엇이 시계열만의 설계이고 무엇이 순서에서 패턴을 배우는 공통 문제인지 다시 물었다.',
   '기존 DeepAR는 관련된 여러 시계열에 하나의 RNN을 공유하고 다음 값의 확률분포를 배웠다. Chronos는 학습을 다양한 데이터셋으로 넓히고, 연속적인 수 자체를 유한한 토큰으로 바꾸었다. 값의 규모를 맞추고 구간 번호로 양자화하면, 언어모형의 다음 토큰 예측을 시계열에도 적용할 수 있다는 발상이다.',
   '숫자를 문장으로 적어 이미 학습한 챗봇에게 묻는 방식은 아니다. 원논문은 T5 계열의 구조를 이용하되 시계열 자료로 처음부터 학습한다. 각 토큰은 단어나 작품명이 아니라 정규화한 값이 속한 구간을 뜻한다. 값의 등장 순서는 유지하지만2024 v1은 요일·빈도 같은 별도 시간 특징을 넣지 않는다.',
   '새 이력이 들어오면 과거 토큰을 조건으로 다음 토큰의 분포를 구하고, 그 분포에서 하나를 뽑아 다음 문맥에 붙인다. 이를 여러 번 반복한 뒤 구간의 대표값과 원래 규모로 되돌리면 가능한 미래의 경로들이 된다. 단 하나의 확정값이 아니라 여러 경로를 만들어 예측 분포를 표현하려는 생각이다.',
   '새 데이터에 문맥을 넣는 것과 그 데이터로 연결값을 다시 학습하는 것은 다르다. Chronos의 zero-shot 실험은 평가 데이터셋에 맞춘 추가 학습 없이 적용하는 설정이다. 아래에서는 척도·구간·순서·샘플링을 작은 계산으로 직접 바꾸되, 공개된 Chronos를 불러와 예측한 결과나 논문의 글로벌 실험을 재현한 것으로 표시하지 않는다.'
  ],visual:{id:'aws-chronos-token-forecast',navLabel:'시계열을 값 토큰으로',title:'값의 규모를 맞추고, 시간순 토큰에서 여러 미래를 펼치다',caption:'2024 v1 Figure1과 §§3.1–3.3을 연결합니다. 양자화·문맥 순서·여러 경로를 계산하고, 고정된 연결에 문맥을 주는 경로와 추가 학습 경로를 구분합니다.',source:at(5,'§3.1 · 척도·구간과 정보 손실'),scope:'실제 T5·RNN·Chronos 체크포인트를 실행하지 않습니다. 값·구간 수·다음 토큰의 조건부 식·출력 bias는 직접 정했습니다. 원문의 전처리 정의를 작은 예시에 적용하고, 이후에는 공개한 가상 범주 분포에서 샘플링합니다. 그래프의 범위는 이 가정에서 얻은 값이며 실제 예측 정확도·구간 보정을 입증하지 않습니다.'},
  takeaway:{title:'연속값의 예측을, 순서 있는 범주 분포의 학습으로 바꾸다',text:'정규화는 규모를 연결하고 양자화는 실수를 토큰으로 만든다. 순서는 문맥을 구성하며, 뽑은 다음 토큰은 다음 예측의 조건이 된다. 양자화의 정보 손실과 표현 범위, 학습 데이터와 평가 조건을 함께 확인해야 한다.'},
  technical:{title:'전처리·사전학습·zero-shot의 조건 더 읽기',paragraphs:[
   '판본:2024-03-12 arXiv v1을 기준으로 했다. Ansari·Stella 동등 기여, 세 주요 인물은 Amazon Web Services 소속이다. 전체17명에는 UC San Diego·University of Freiburg 및 Amazon Supply Chain Optimization Technologies 표기도 있다. 이후 TMLR 판본의 저자·소속과 최초 원고를 섞지 않는다.',
   '§3.1, PDF5쪽: 과거 문맥의 관찰값에서 s=mean(|x|)를 구하고 각 값을s로 나눈다. 미래 정답을 척도 계산에 넣지 않는다. 원논문은 균일한 bin 중심·경계, PAD·EOS와 누락값 처리를 설명한다. 아래 5·9·17개 구간과 [−2,2] 범위는 직접 정했으며 실제 어휘·특수 토큰 번호를 복제하지 않는다.',
   '§3.2–3.3, PDF6쪽: 출력은 값 토큰의 범주 분포이며 cross-entropy로 학습한다. 이 손실은 이웃 구간과 먼 구간의 숫자 거리를 직접 알지 못한다. 예측 때 토큰을 자기회귀로 샘플링하고, bin 중심에 과거 문맥의 척도를 곱해 원래 단위로 되돌린다.',
   '사전학습과 평가: §5는 학습에 포함된 데이터셋의15개 평가와 학습에 보지 않은27개 데이터셋의 zero-shot 평가를 나눈다. 공개 자료와 합성 자료의 학습이 있으며, zero-shot은 학습 자체가 없다는 뜻이 아니다. 한 벤치마크의 상대 순위나 평균 점수를 모든 상품·물류 현장의 개선으로 옮기지 않는다.',
   '추가 학습: 새 문맥을 주면 연결값을 고정한 상태에서도 입력과 예측 분포는 달라질 수 있다. fine-tuning은 새 학습 사례의 오차로 연결값을 바꾸는 별도 절차다. 화면의 한 번 갱신은 가상 출력 bias만 바꾸며 Chronos 미세조정을 실행한 것이 아니다.',
   '범위와 후속: 양자화는 세밀한 차이를 버리고 끝 구간에서 큰 값을 포화시킬 수 있다(§5.7).2025 Chronos-2는 group attention·패치 표현·quantile head로 다변량·공변량까지 다루는 별도 기술보고다.2024의 단변량 값 토큰·샘플 경로와 같은 모델로 표시하지 않으며 후속 공식 원문에서 비교한다.'
  ],formula:'과거 문맥에서만 척도 계산\ns = (Σ |xᵢ|) / 관찰값 수\nx̃ᵢ = xᵢ / s\nzᵢ = q(x̃ᵢ) · 구간 번호\n\n원문: pθ(z다음 | 과거 토큰), cross-entropy 학습\n미래 토큰 샘플 → 구간 중심 → ×s → 미래 값\n\n화면: 명시한 작은 조건부 식으로 p를 계산\n추가 학습 보기만 bias ← bias − 0.1(p−onehot)'}
 },keyIdeas:[{title:'분야별 숫자를 하나의 어휘로',text:'척도와 구간을 통해 실수의 열을 유한한 토큰의 열로 바꾼다.'},{title:'최근 문맥은 입력이고 사전학습은 이미 한 학습',text:'새 문맥에 조건을 거는 것과 새로운 가중치 학습을 구분한다.'},{title:'분포에서 뽑고 다시 조건으로',text:'여러 자기회귀 경로를 원래 단위로 복원한다.'}],videos:[],references:[
  {title:'Chronos · 2024 v1 원문',url:pdf,location:'PDF1쪽17명·소속·동등 기여, PDF2쪽Fig.1, PDF4쪽 사전학습과언어모형의차이, PDF5–6쪽§3·Eq.1–2, §5의15/27평가와§5.7 한계.'},
  {title:'공식 코드 · 원래 Chronos 클래스 · 고정 확인본',url:code,location:'1224fafa91e1ecd6674f5204066b159e40b5e4a1. MeanScaleUniformBins, context_input_transform, label_input_transform, output_transform, ChronosModel.forward. 2024 최초 커밋이라는 뜻은 아니다.'},
  {title:'공식 저장소 · 공개 시점·모델 계열 구분',url:repo,location:'News:2024-03-13공개,2025-10-20Chronos2공개. 현재 README의Chronos/Bolt/Chronos2를 구분해 읽음.'},
  {title:'Chronos-2 · 2025 v1 후속 보고서',url:'https://arxiv.org/pdf/2510.15821v1',location:'2025-10-17, PDF1–2쪽 저자·단변량/다변량/공변량·Fig.1 group attention·패치·quantile 출력. 이번 카드의 구현 대상이 아니다.'}
 ]};
 const record={id,year:2024,track:'neural',dateLabel:'2024.03.12 원고 · 03.13 공식 공개',title:'처음 보는 시계열도, 미리 배운 시간의 언어로',subtitle:'Chronos: Learning the Language of Time Series',people:authors,authorNote:'v1의17명 공동저자다. Ansari·Stella는 동등 기여, 세 주요 인물은AWS 소속. Jan Gasthaus는 이 논문의 공동저자가 아니며2019 GluonTS 공동저자 관계를 통해 별도로 연결한다.',summary:'여러 분야의 시계열을 척도 조정·양자화한 토큰으로 사전학습하고, 새 이력의 문맥에 조건을 걸어 여러 미래 토큰 경로를 샘플링한다.',detail:'원논문의 값 토큰·사전학습·zero-shot을 DeepAR의 공유 RNN·실수 분포와 비교한다.',question:content.article.question,visual:'sequence',sources:[at(1,'최초 원고·공동연구'),{title:'Amazon Science · 공식 코드',url:repo}],related:['amazon-deepar-2017','transformer','seq2seq'],caveat:'원논문 글로벌 벤치마크와 직접 정한 작은 전처리·분포·경로 계산을 구분한다. 코드나 모델을 실행한 것처럼 결과를 표시하지 않는다.',content};if(window.TIMELINE_DATA.some(e=>e.id===id))throw Error('Duplicate Chronos2024 record');window.TIMELINE_DATA.push(record);window.AtlasEntries.register({id,record:{...record},content});window.ATLAS_CHRONOS_2024=record;
})();
