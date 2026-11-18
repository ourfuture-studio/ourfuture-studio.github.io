/* First ViT preprint. Historical attribution and the later ICLR publication stay distinct. */
(function(){
 'use strict';
 const paper='https://arxiv.org/pdf/2010.11929v1',blog='https://research.google/blog/transformers-for-image-recognition-at-scale/',repo='https://github.com/google-research/vision_transformer';
 const content={article:{
  question:'눈앞의 장면을 이해하는 데,\n이미지 전용 연결 구조가 반드시 필요할까?',
  opening:[
   'LeNet과 AlexNet은 가까운 화소를 함께 보고, 같은 필터를 여러 위치에 쓰며, 작은 시각 단서를 여러 층에서 조합했다. 사람의 시각에서 가져온 이 구조는 이미지의 특징을 배우는 데 강한 출발점을 준다. ViT 연구팀은 다른 질문을 던졌다. 그런 연결을 미리 많이 정하지 않고도, 이미지의 여러 부분이 서로 참고하며 무엇이 중요한지 배울 수 있을까?',
   '출발점은 사진을 단어로 번역하는 일이 아니다. 이미지를 작은 사각 패치로 나누고, 각 패치의 화소를 펼쳐 같은 선형 변환으로 벡터를 만든다. 문장에 단어 벡터가 나열되듯 패치 벡터를 나열하면, 기존 Transformer encoder가 그 사이의 관계를 계산할 수 있다. 패치가 무엇의 일부인지는 분류 정답의 오차로 연결값을 바꾸며 배운다.',
   '패치의 내용만 나열하면 어느 자리에 있던 조각인지 알기 어렵다. 연구팀은 패치 벡터에 학습 가능한 위치 벡터를 더하고, 앞에는 이미지에서 잘라 낸 조각이 아닌 별도의 class token을 둔다. Encoder 안에서 모든 위치가 서로를 참고한 뒤, 이 토큰의 출력 표현을 분류에 사용한다. class token이 처음부터 전체 이미지의 의미를 아는 것은 아니다.',
   '이 변화가 적은 자료에서도 항상 유리했던 것은 아니다. 원논문은 CNN에 들어 있는 국소성·이동에 관한 구조적 가정을 덜 두는 대신, 큰 사전학습 자료에서 관계를 배울 필요를 보여 준다. 충분한 자료에서 먼저 학습하고 새 분류 과제에 전체 망을 미세조정하는 경로까지 함께 읽어야 한다.',
   '2020년 첫 원고의 저자는 Google Research, Brain Team의 12명이다. 아래에는 세 공동저자 인물 기록을 연결했다. 이 기록은 세 사람의 단독 발명이나 현재 소속을 뜻하지 않으며, 최초 원고와 2021년 ICLR 출판을 구분한다.'
  ],
  visual:{id:'vit-2020-patch-learning',navLabel:'패치에서 장면의 표현으로',title:'작은 이미지 조각들이, 서로를 참고하는 입력이 되다',caption:'원논문 Figure 1을 먼저 보고, 직접 그린 작은 그림으로 패치·선형 변환·위치·class token의 차이를 살펴보세요. 패치와 위치 계산은 직접 실행하지만 원래 ViT의 가중치나 분류 결과를 실행하는 화면은 아닙니다.'},
  takeaway:{title:'무엇을 같은 대상으로 볼지, 이미지 조각의 관계에서 배우다',text:'ViT는 패치 하나를 단어 하나의 의미로 바꾸는 사전이 아니다. 여러 패치의 표현이 서로 참고하며 달라지는 계산을, 이미지 분류의 오차로 함께 학습하려 한 모델이다.'},
  technical:{title:'원논문의 연결·학습 조건을 더 읽기',paragraphs:[
   '§3.1과 Figure 1은 H×W×C 이미지를 N개의 P×P 패치로 나누고, 각 패치를 길이 P²C 벡터로 펼친 뒤 학습 가능한 같은 행렬 E로 D차원에 투영한다. “패치 평균을 구한다”는 정의가 아니다. 아래 작은 계산에 쓰는 E는 우리가 세 출력을 비교하도록 직접 지정한 행렬이며 원모델의 학습된 투영이 아니다.',
   '패치 벡터 앞에 별도의 학습 가능한 class embedding을 붙이고, 전체 순서에 학습 가능한 1차원 위치 임베딩을 더한다. Class token의 encoder 출력에 최종 정규화를 적용한 표현이 분류 head로 전달된다. 처음의 class embedding, 여러 패치를 참고한 뒤의 출력, 사람이 읽을 수 있는 클래스 이름은 서로 다른 것이다.',
   'Encoder는 LayerNorm → multi-head self-attention → 잔차 더하기 → LayerNorm → MLP → 잔차 더하기를 반복한다. Attention은 서로 다른 위치의 정보를 결합하고, MLP는 각 위치의 벡터를 같은 방식으로 변환한다. 이 이미지 분류 encoder에는 다음 단어를 숨기는 인과 마스크를 사용하지 않는다. 위치 벡터를 더하는 것과 참고할 수 있는 위치를 가리는 것도 구분한다.',
   '§3.2와 부록 B.1.1은 새 자료로 옮길 때 기존 분류 head를 제거하고, 새 클래스 수에 맞는 0으로 초기화한 선형 head를 붙인 뒤 전체 망을 미세조정한다. Patch projection·위치 벡터·class token·encoder까지 학습 대상이다. 마지막 분류기만 학습하는 linear probe를 기본 미세조정으로 표시하지 않는다.',
   '더 높은 해상도로 바꿀 때 패치 크기를 유지하면 패치 수와 sequence length가 늘어난다. 원문은 패치 위치 벡터를 원래 2차원 배치에 따라 보간한다. 해상도 변화가 단순히 마지막 출력 칸만 늘리는 일은 아니다. 아래 구조 계산은 패치·토큰 수를 계산하며 실제 메모리 사용량이나 속도를 측정하지 않는다.',
   '원문 Table 1의 Base·Large·Huge는 각각 12·24·32층, 표현 차원 768·1024·1280, head 수 12·16·16을 사용한다. MLP 차원은 3072·4096·5120이다. 이 표의 규모와 패치 크기 선택은 구분한다. ViT-L/16의 L은 규모, 16은 패치 한 변의 길이다.',
   '§4.1·4.3의 비교는 ImageNet·ImageNet-21k·JFT 등 사전학습 자료와 계산량의 조건을 함께 다룬다. 추가 자료가 적은 조건과 충분한 사전학습 조건에서 결과가 달랐다. 패치 기반 Transformer가 모든 자료·모든 시각 과제에서 CNN보다 좋다고 일반화하지 않는다. 이 카드의 작은 그림과 고정 행렬 계산은 논문의 정확도 실험이 아니다.',
   '함께 제공하는 공식 저장소는 후속 모델과 코드 변경도 포함한다. 여기서 내려받아 대조한 코드는 2026-11-18 확인본이며, 2020년 최초 코드라고 표시하지 않는다. 역사적 구조·학습 설명의 기준은 2020년 v1 본문과 Figure 1이다.'
  ],formula:'패치 수 N = H×W / P²\n각 패치 xₚ: 길이 P²C → 같은 행렬 E로 D차원 투영\nz₀ = [xclass; xₚ¹E; …; xₚᴺE] + Epos\n\nz′ₗ = MSA(LN(zₗ₋₁)) + zₗ₋₁\nzₗ = MLP(LN(z′ₗ)) + z′ₗ\ny = LN(zᴸ의 class 위치) → 분류 head\n\n새 과제: 기존 head 교체 + 전체 망 미세조정\n사용: 연결값 유지, 입력 이미지에서 분류\n\n아래 16×16 RGB 그림·3차원 E·Attention은 직접 정한 예시다.\n원논문의 D차원 표현·학습된 Attention·실제 분류를 재현하지 않는다.'}
 },keyIdeas:[
  {title:'이미지 조각을, 같은 연산이 적용되는 벡터로 바꾼다',text:'모양을 사람이 붙인 이름으로 먼저 바꾸지 않는다. 화소에서 벡터로 옮기는 투영도 학습하고, 그 벡터 사이의 관계도 학습한다. 같은 투영 행렬을 여러 패치에 쓰는 것과 여러 층이 같은 연결값을 갖는 것은 다르다.'},
  {title:'무엇이 있는가와, 어디에 있는가를 나눈다',text:'패치 내용과 위치 벡터는 서로 다른 입력이다. 위치를 빼고 class token으로 집계하는 구조는 패치의 순서를 구별할 단서가 부족하다. 직접 정한 작은 Attention 계산에서 패치 순서를 바꾸며 그 차이를 확인할 수 있다.'},
  {title:'전체 이미지 표현은, 다른 위치를 참고한 결과로 만들어진다',text:'class token은 이미지의 일부가 아니다. 학습 가능한 시작 벡터가 패치들과 함께 encoder를 지나며 바뀌고, 분류 오차가 그 경로를 학습시킨다. 원도판의 별표와 0번 칸을 이미지 패치 번호로 읽지 않아야 한다.'},
  {title:'분류기를 바꾸는 일과, 표현까지 다시 배우는 일을 구분한다',text:'새 과제의 head를 붙이는 것만으로 미세조정이 끝나지 않는다. 이 논문의 전이 과정에서는 기존 표현을 만드는 망도 새 정답에 맞춰 갱신한다. 사용 단계에서 가중치를 유지하는 일과 대비해 볼 수 있다.'}
 ],videos:[],references:[
  {title:'Dosovitskiy 외 · ViT 최초 원고 v1',url:paper,location:'2020-10-22 원고. PDF 1쪽 소속·기여 표기, 3쪽 Figure 1·§3.1·식1–4, 4쪽 §3.2·4.1, 5쪽 Table 1, 6–7쪽 §4.3, 14쪽 부록 B.1.1을 읽고 구조·미세조정·자료 조건을 대조했다.'},
  {title:'Google Research · Transformers for Image Recognition at Scale',url:blog,location:'2020-12-03 공식 설명. 입력 패치와 위치 표현, 사전학습 자료 크기에 따른 비교, 원논문·공식 구현 연결을 확인했다. 특정 수치 비교를 모든 조건의 우위로 바꾸지 않는다.'},
  {title:'Google Research · ViT 공식 저장소',url:repo,location:'README의 Vision Transformer 절은 열두 공동저자·기여 표기·모델 개요를 설명한다. vit_figure.png는 원논문 Figure 1과 구조를 대조한 공식 이미지이며 원래 구성·라벨을 바꾸지 않고 표시한다. 저장소 Apache-2.0 LICENSE를 함께 보존했다.'},
  {title:'ViT 공식 공개 구현 · models_vit.py',url:repo+'/blob/main/vit_jax/models_vit.py',location:'2026-11-18 확인본. AddPositionEmbs, Encoder1DBlock, VisionTransformer의 patch embedding·class token·class 출력 경로를 대조했다. 후속 변경을 포함하는 현재 코드이며 2020년 최초 구현으로 주장하지 않는다.'},
  {title:'arXiv · 최초 원고 이력',url:'https://arxiv.org/abs/2010.11929v1',location:'첫 제출 2020-10-22와 v1/v2를 확인했다. 이후 ICLR 2021 출판과 최초 원고의 연도를 구분한다.'},
  {title:'ViT · 후속 v2 표제의 ICLR 2021 출판 표기',url:'https://arxiv.org/pdf/2010.11929v2#page=1',location:'v2 첫 페이지의 Published as a conference paper at ICLR 2021을 확인했다. 본문·그림 위치와 비교 기준은 위의 2020년 v1이며 판본별 쪽수를 섞지 않는다.'}
 ]};
 const record={id:'vit-2020',year:2020,dateLabel:'2020-10-22 최초 원고 · ICLR 2021',track:'neural',title:'이미지 조각의 관계에서, 장면의 표현을 배우다',subtitle:'Vision Transformer · An Image is Worth 16x16 Words',people:['Alexey Dosovitskiy','Lucas Beyer','Alexander Kolesnikov'],authorNote:'Google Research, Brain Team의 12명 공동저자 연구다. 연결한 세 사람은 원고의 동등 기술 기여 표시를 가진 공동저자 일부이며, 전체 저자나 개인별 단독 발명을 뜻하지 않는다.',summary:'이미지를 패치 벡터의 열로 표현하고, 위치와 class token을 더한 Transformer encoder가 시각 관계를 학습하도록 했다.',detail:'원문 Figure 1의 패치 투영·위치·class token·encoder·분류 경로를 읽고, 작은 벡터 계산과 전체 미세조정의 차이를 직접 살펴본다.',question:content.article.question,visual:'network',sources:[{title:'ViT · 2020 v1 원문',url:paper},{title:'Google Research · 공식 설명',url:blog}],caveat:'2020년 첫 ViT 원고를 기준으로 한다. 세 인물은 열두 공동저자의 일부다. 원본 구조 그림과 자체 16×16 그림·3차원 계산을 구분하며 원래 ViT의 가중치·학습·정확도·속도를 실행하지 않는다. 2026년에 확인한 공식 코드의 후속 변경과 당시 구조를 구분한다.',related:['lenet','alexnet','transformer','bert'],content};
 if((window.TIMELINE_DATA||[]).some(x=>x.id===record.id))throw Error('Duplicate ViT 2020 record.');
 (window.TIMELINE_DATA=window.TIMELINE_DATA||[]).push(record);window.AtlasEntries.register({id:record.id,record:{...record},content});window.AtlasVit2020Entry=record;
})();
