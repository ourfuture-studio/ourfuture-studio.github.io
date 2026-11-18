/* Late patch of the existing Kiuk Chung work. No second event or work object. */
(function(){
 'use strict';const work=window.AtlasAmazonResearch?.chungWork,profile=(window.ATLAS_PEOPLE_PROFILES||[]).find(x=>x.id==='kiuk-chung');if(!work||!profile?.works.includes(work))throw Error('DSSTNE detail requires the existing Amazon research adapter and work identity.');
 const blog='https://aws.amazon.com/blogs/big-data/generating-recommendations-at-amazon-scale-with-apache-spark-and-amazon-dsstne/',repo='https://github.com/amazon-archives/amazon-dsstne',example=repo+'/blob/master/docs/getting_started/examples.md',config=repo+'/blob/master/samples/movielens/config.json';
 const content={article:{question:'관찰한 행동은 드문데 상품은 많다.\n어떤 표현을 배우고, 그 계산을 어디에서 실행할까?',opening:[
  '상품 관계표는 이력의 겹침을 직접 비교한다. 신경망 추천은 다른 표현을 배울 수 있다. 이용자의 희소한 상품 이력을 입력으로 읽고, 여러 이용자에게 공유하는 연결값으로 내부 표현을 만든 뒤 상품별 점수를 낸다. 입력은 사람마다 다르지만 표현을 만드는 망은 함께 학습한다.',
  'DSSTNE의 공식 MovieLens 예시는 세 층의 autoencoder다. 상품 수만큼의 입력과 출력 사이에 128개의 sigmoid 은닉 단위를 두고, 입력의 일부를 가리는 denoising 설정도 제공한다. 이것이 DSSTNE의 모든 모델을 뜻하는 것은 아니다. 엔진은 넓고 희소한 추천 입출력을 다루는 실행 기반이고, 학습할 구조는 설정으로 정한다.',
  'Kiuk Chung의 2016년 AWS 글은 이 모형을 실제 작업으로 만드는 다른 문제를 다룬다. 원자료를 분석하고 나누는 Spark는 CPU에서, 신경망 학습·예측은 GPU에서 실행된다. 한 행렬 연산씩 Spark에 맡기는 대신, 학습이나 예측 전체를 별도 GPU 컨테이너 작업으로 보내려 했다.',
  'CPU의 Spark/EMR은 자료를 S3에 놓고, ECS는 ECR의 이미지를 사용해 GPU 작업을 실행한다. 작업은 자료를 내려받아 명령을 수행하고 결과를 S3로 돌려보낸다. 자료의 이동과 실행 명령, 모델의 연결값은 서로 다른 흐름이다.',
  '학습과 추천 생성에서도 분산의 축이 달랐다. 큰 모델을 한 GPU에 담기 어려울 때는 연결값을 나누고 같은 학습 자료를 함께 읽는 모델 병렬을 사용한다. 학습한 뒤에는 같은 모델로 여러 이용자를 독립 처리할 수 있으므로 자료를 나눠 예측한다. GPU 개수가 늘었다고 같은 일을 같은 방식으로 나누는 것은 아니다.'
 ],visual:{id:'amazon-dsstne-recommendation',navLabel:'희소 표현·CPU와 GPU 역할',title:'함께 배우는 표현과, 나눠 실행하는 작업을 구분한다',caption:'AWS 공식 전체 구성도를 먼저 보고, 아래의 자체 신경망 계산·모델/자료 분할·실행 경로를 연결합니다. 작은 6→3→6 망은 직접 정한 연결값으로 계산하며 실제 DSSTNE·AWS·MovieLens 학습을 실행하지 않습니다.'},
 takeaway:{title:'표현을 배우는 방법과 계산을 조직하는 방법이 함께 필요하다',text:'희소 이력에서 공유 신경망을 학습하는 발상과, CPU 자료 준비·GPU 실행·모델/자료 병렬의 역할을 나누어 보면 추천이 실제 시스템으로 이어지는 경로가 드러난다.'},
 technical:{title:'공식 모형·실행 구조·작은 계산의 범위를 더 읽기',paragraphs:[
  '2016-07-09 공식 글은 Kiuk Chung을 Amazon Personalization의 Software Development Engineer로 소개한다. 저술과 당시 직무를 확인한 것이며 DSSTNE 전체를 혼자 개발했다거나 DeepAR 공동저자라는 뜻은 아니다. 기존 인물의 동일한 2016년 기록을 보강했다.',
  'Architecture overview에서 Spark driver/executor는 CPU의 EMR 영역이고 ECS는 별도의 GPU 작업을 관리한다. S3는 파티션과 결과를 전달하고 ECR은 실행할 Docker 이미지를 보관한다. S3를 신경망 자체, ECR을 학습 데이터 저장소로 바꾸어 그리지 않는다. 이 설명은 2016년 글의 구조이며 현재 AWS 권장 구성이나 현재 GPU 스케줄러의 기능을 설명하지 않는다.',
  'Deep learning with DSSTNE와 Model parallel training 절은 큰 모델을 N GPU에 분산하고 학습 자료를 복제하는 구성을 설명한다. Data parallel prediction 절은 이용자 배치를 나누어 독립적으로 예측한다. 공식 저장소 README는 각 층의 계산·저장을 나누는 model-parallel 특성과 희소 GPU 커널을 설명한다. 이 카드의 분할은 역할을 드러내는 작은 인덱스 계산이며 실제 통신·대역폭·메모리·속도 실측이 아니다.',
  '공식 samples/movielens/config.json은 FeedForward, 128 hidden sigmoid, sparse input/hidden/output, denoising p=0.2, ScaledMarginalCrossEntropy 등의 설정을 담는다. 원자료에서 같은 sample 인덱스를 입출력에 사용하는 예시와, predict의 이미 본 feature 제외·top-K를 공식 문서에서 확인했다. 표본 데이터의 변환·학습 예시 자체가 미래 추천의 누수 없는 성능 검증을 완료했다는 뜻은 아니다.',
  '아래 작은 망은 6입력·3은닉·6출력 sigmoid와 직접 정한 가중치로 시작한다. 과거 행의 입력 하나를 가릴 수 있고, 그 과거 행의 목표와 비교해 한 번의 경사하강으로 전체 연결값을 실제 갱신한다. 양성 1, 관찰 없음 0의 가중 BCE를 직접 정의했다. 원문의 128은닉·sparsity penalty·denoising 확률·ScaledMarginalCrossEntropy·GPU 커널을 구현한 것으로 표시하지 않는다.',
  '0은 관찰되지 않은 행동이지 명시적인 비선호 정답이 아니다. 화면에서 정한 손실의 가중치와 목표는 그 선택에 대한 가정이다. 한 과거 행의 재구성 손실이 내려가는 것은 학습한 적 없는 미래 추천이 좋아졌다는 증거가 아니다. 별도로 남긴 정답은 입력·학습·상품 관계표 생성에서 분리해야 한다.',
  '모델 병렬 화면은 각 층의 36개 가중치 분할과 같은 자료의 복제를, 예측 화면은 36개 가중치의 복제와 이용자 행의 분할을 계산한다. bias·activation 통신·실제 GPU 작업은 생략한다. 공식 글의 당시 확장성 주장을 이 작은 계산에서 검증한 속도로 바꾸지 않는다.'
 ],formula:'희소 이력 x → 공유 연결값 W₁ → 내부 표현 h\nh = sigmoid(xW₁+b₁)\n상품 점수 s = sigmoid(hW₂+b₂)\n이미 관찰한 상품 제외 → 상위 K 후보\n\n화면의 한 번 갱신: 직접 정한 가중 BCE의 경사하강\n과거 행의 재구성 손실 ≠ 미래 추천의 정확도\n\n공식 실행 구성\nSpark/EMR(CPU) → S3 파티션 → ECS GPU 작업 → S3 결과\nECR: 실행 이미지 / ECS: 작업 관리\n학습: 모델 분할·자료 복제\n예측: 모델 복제·이용자 배치 분할'}},
 keyIdeas:[{title:'희소한 입력에서도, 여러 사람이 공유하는 표현을 학습한다',text:'모든 이용자–상품 조합이 채워져 있을 필요는 없다. 관찰한 이력은 따로 두고, 그 이력을 변환하는 신경망 연결값은 여러 예에서 함께 학습한다.'},{title:'신경망 구조와 작업 실행의 구조는 다른 그림이다',text:'은닉층과 출력층은 점수를 만드는 모형이다. EMR·S3·ECS·ECR은 자료와 실행을 이어 주는 기반이다. 두 층위를 섞으면 어떤 문제가 어디에서 해결되는지 보이지 않는다.'},{title:'같은 GPU 수라도, 모델을 나눌지 자료를 나눌지 다르다',text:'하나의 큰 모델을 여러 장치에 담는 일과 같은 모델로 여러 이용자를 처리하는 일은 다르다. 학습과 추천 생성에서 그 목적에 맞게 분할 축을 선택했다.'}],videos:[],references:[
  {title:'Kiuk Chung · AWS Big Data Blog · 2016-07-09',url:blog,location:'첫 저자 소개·Architecture overview·Deep learning with DSSTNE·Model parallel training·Data parallel prediction 본문과 두 원도판을 확인했다. 현재 글의 이미지 URL에 들어 있는 이전 호스팅 경로 날짜를 새 연구 공개일로 사용하지 않는다.'},
  {title:'Amazon DSSTNE · 공식 archived 저장소',url:repo,location:'README의 sparse input/hidden/output, 각 층의 model-parallel 계산·저장과 sparse GPU 연산. 보존된 저장소이며 최신 추천 시스템이나 현재 유지보수 상태를 추정하지 않는다.'},
  {title:'DSSTNE · 공식 MovieLens 모델 설정',url:config,location:'FeedForward·128 hidden sigmoid·sparse 층·Denoising p=0.2·손실 설정을 직접 확인했다. 아래의 6→3→6 가중 BCE 예시와 구분한다.'},
  {title:'DSSTNE · 공식 입출력·학습·예측 예시',url:example,location:'NetCDF 변환, input/output의 같은 sample 인덱스, mpirun model-parallel 학습, predict의 관찰 feature 제외와 top-10. 예시 실행 문서와 누수 없는 미래 성능 검증은 별개다.'}
 ]};
 Object.assign(work,{title:'DSSTNE와 Spark · 희소 표현 학습에서 CPU·GPU 실행으로',summary:'희소한 이력에서 공유 신경망의 표현을 배우고, Spark의 자료 준비와 별도 GPU 작업을 연결한다. 모델을 나누는 학습과 이용자를 나누는 예측을 구분한다.',content,caveat:'기존 Kiuk Chung의 2016년 공식 기술 글 기록을 같은 ID·같은 객체로 보강했다. 원도판과 직접 정한 6→3→6 망·경사하강·분할 인덱스 계산을 구분한다. DSSTNE·AWS·실제 추천 데이터 학습이나 성능·속도를 실행한 결과가 아니다.',related:['amazon-item-to-item-2003','amazon-deepar-2017']});
 window.AtlasAmazonDsstneDetail=work;
})();
