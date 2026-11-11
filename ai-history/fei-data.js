/* Complement the existing ImageNet/Visual Genome records with a dated company record. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='fei-fei-li');
  if(!person||person.works.some(w=>w.id==='fei-worldlabs-2024'))throw new Error('The existing Fei-Fei Li profile and an unapplied adapter are required.');
  const imagenet='https://image-net.org/static_files/papers/imagenet_cvpr09.pdf',genome='https://arxiv.org/pdf/1602.07332v1';
  const nerf='https://arxiv.org/pdf/2003.08934v2',splats='https://arxiv.org/pdf/2308.04079v1';
  const about='https://worldlabs.ai/about',generating='https://worldlabs.ai/blog/generating-worlds';
  const marble='https://worldlabs.ai/blog/marble-world-model',api='https://worldlabs.ai/blog/announcing-the-world-api';
  const atlas='https://worldlabs.ai/blog/atlas',frameboy='https://worldlabs.ai/blog/atlas-realtime';
  const taxonomy='https://worldlabs.ai/blog/taxonomy-of-world-models',amd='https://worldlabs.ai/blog/amd-announcement';
  const content={article:{
    question:'사진 속 사물의 이름을 아는 데서,\n그 공간을 다른 자리에서도 보고 움직일 수 있는 표현으로 나아가려면?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'시각 데이터·공간 표현 원논문과 World Labs의 날짜별 공식 자료',
    opening:[
      '방 사진에서 의자를 찾는 것과, 그 의자 뒤로 돌아갔을 때 무엇이 보일지 표현하는 것은 다른 문제다. 화면에 보이는 픽셀만으로는 가려진 면이나 물체까지의 거리가 모두 정해지지 않는다. 지능이 공간을 다루려면 무엇이 있는지뿐 아니라 어디에 있고, 시점을 옮기면 어떻게 보이며, 행동하면 무엇이 달라지는지도 나누어 표현해야 한다.',
      '페이페이 리가 공동연구한 ImageNet은 대상의 범주에 많은 이미지를 연결해, 모양이 달라도 같은 대상을 알아보는 방법을 학습할 자료를 만들었다. Visual Genome은 한 이미지 안의 영역·대상·속성·관계에 주석을 붙였다. 의자라는 이름에서 사람이 의자에 앉아 있다는 관계로 표현을 넓히면, 시각이 답해야 할 질문과 학습에 필요한 자료도 함께 바뀐다.',
      'World Labs가 내건 공간 지능의 질문은 화면의 이름표를 넘어선다. 사진이나 말로 제시한 장면을 다른 위치에서 탐색하고, 배치를 바꾸며, 여러 출력을 일관된 공간에 연결하려는 것이다. 공식 공동설립팀은 리와 Justin Johnson, Ben Mildenhall, Christoph Lassner다. 시각 자료·3D 표현·생성·그래픽스와 제품을 연결하는 조직의 선택으로 이 경로를 읽는다.',
      '공간을 계산하는 표현의 차이는 원논문 그림에서 볼 수 있다. NeRF는 위치와 보는 방향을 색·밀도로 바꾸는 함수를 학습하고, 카메라 광선 위의 값들을 영상으로 누적한다. 3D Gaussian Splatting은 위치·모양·색·불투명도를 가진 요소들을 장면 안에 두고 투영·합성한다. 새 시점을 만드는 데 좌표·방향·깊이·가림이 왜 필요한지를 두 표현이 서로 다른 방식으로 보여 준다.',
      'Marble은 텍스트·이미지·영상·거친 3D 배치에서 탐색 가능한 공간을 만들고, 편집·확장·내보내는 제품 경로를 설명했다. World API는 생성 요청을 프로그램과 연결했다. Atlas는 카메라와 깊이를 공간 문맥에 넣어 새 관측과 3D 출력을 만드는 모형으로 소개됐고, Frameboy 연구 미리보기는 클라우드에서 생성한 프레임을 사용자의 카메라 조작에 따라 전송했다. 무엇을 표현하느냐에 따라 제작 도구와 서비스의 접점도 달라진다.',
      '두 작은 계산에서 카메라를 옮기면 깊이가 다른 점의 시차가 달라지고, 요소의 앞뒤를 바꾸면 한 화소의 색이 달라진다. 직접 정한 좌표·색으로 공간 표현의 선택을 읽는 사례다. NeRF·3DGS는 리의 논문이나 Marble의 공개 학습 구조로 표시하지 않는다. 회사가 생성한 그럴듯한 외관과 실제 공간·행동을 확인한 증거도 구분하며, 모형·API 실행과 거래 상태의 범위는 아래 근거와 함께 적었다.'
    ],
    visual:{id:'worldlabs-spatial-platform',navLabel:'시각 표현·공간·제품',title:'대상의 이름에서 공간의 표현으로, 연구에서 제품의 접점으로',caption:'논문에서 다룬 대상·관계·공간 표현과 World Labs의 공식 제품 경로를 구분해 연결합니다. 카메라와 색을 바꾸는 두 사례는 직접 정한 값의 실제 산술이며, 학습된 세계 모형을 실행하거나 실제 공간을 재구성하는 기능은 아닙니다.'},
    takeaway:{title:'공간을 안다는 주장은 무엇을 표현하고 무엇으로 확인했는지와 함께 읽어야 한다',text:'대상 분류, 관계 주석, 새 시점 영상, 명시적인 3D 자료, 행동 뒤의 상태 예측은 서로 다른 목표다. 이 목표를 나누어 보면 시각 연구가 생성 모형·편집 도구·개발자 API와 계산 기반으로 이어지는 길과, 아직 추가 검증이 필요한 부분을 함께 읽을 수 있다.'},
    technical:{title:'공간의 표현·생성·서비스와 관계의 근거를 자세히 읽기',paragraphs:[
      '공간 표현은 관측된 영상과 새 시점의 영상을 같은 장면에 연결하는 계산상의 약속이다. 카메라의 위치·방향과 깊이를 표현에 넣으면, 시점을 옮겼을 때 무엇이 이동하고 무엇이 가려질지를 계산할 수 있다. 이 카드의 2024년은 World Labs 출발의 기준 연도이며, 아래 연표는 회사 창립·Marble·API·Atlas와 연구 미리보기를 각각의 공개 시점에 놓는다.',
      'ImageNet 원논문의 Fig.1과 자료 구축 절은 WordNet의 개념 계층에 이미지를 모으고 확인하는 방법을 설명한다. Visual Genome의 Fig.1은 영역 설명·대상·속성·관계와 장면 그래프를 연결한다. 범주를 맞히는 목표와 관계를 기술하는 목표는 정답의 형태부터 다르다. 기존 두 연구 카드에서 이 자료의 구성과 검증 조건을 이어 읽을 수 있다.',
      'NeRF 원논문 Fig.2와 §3–4에서 입력은 위치 3차원과 보는 방향 2차원이다. MLP가 색과 밀도를 출력하면, 카메라 광선을 따라 표본들을 누적해 화소를 만들고 관측 영상과의 차이로 장면을 최적화한다. 새 시점에서도 같은 함수를 조회한다는 것이 여러 영상을 한 표현으로 묶는 선택이다. 공동설립자 Mildenhall은 이 논문의 공동저자다.',
      '3D Gaussian Splatting의 Fig.2·§3–4는 보정된 카메라 영상과 초기 점들에서 위치·공분산·색·불투명도를 가진 가우시안 장면을 최적화한다. 이를 영상 평면에 투영하고, 깊이 순서로 겹치는 요소들을 합성한다. Eq.3의 뒤쪽 색은 앞 요소를 통과하고 남은 비율만 기여한다. 이 표현에서는 장면 요소를 명시적으로 배치하고 투영하는 선택이 렌더링 경로로 이어진다.',
      '첫 사례는 양의 깊이와 평행한 카메라 축을 정한 핀홀 식 u=f(X−Cx)/Z다. f=120일 때 점 (1,4)와 (2,8)은 정면에서 모두 u=30이지만, 카메라를 Cx=−1로 옮기면 60과 45가 된다. 영상의 한 위치에 겹쳤던 점들이 다른 시점에서 갈라진다. 가까운 점의 이동이 더 크다는 계산은 영상·카메라·깊이를 함께 표현할 이유를 드러낸다.',
      '두 번째 사례는 붉은 요소의 알파를 0.6, 푸른 요소를 0.5로 정한다. 붉은 요소가 앞이면 두 색의 가중치는 0.6과 0.4×0.5=0.2이고, 흰 배경에는 남은 0.2가 곱해진다. 순서를 바꾸면 푸른색 0.5와 붉은색 0.5×0.6=0.3이 된다. 원논문 Eq.3의 합성 역할을 이렇게 분리해 계산했으며, 실제 가우시안 투영·학습 전체나 World Labs 모형·API를 실행한 결과는 아니다.',
      '2025-11-12 Marble 글은 단일·여러 이미지와 영상, 텍스트 및 Chisel의 거친 3D 배치를 입력으로 소개한다. 편집·영역 확장·세계 합성과 Gaussian splat·메시·영상 내보내기를 각각 설명한다. 글은 입력에 없는 세부를 만들어 낸다고 명시한다. 가우시안 출력 형식이 공개되었다는 사실이 그 생성 모형의 전체 학습 구조까지 공개됐다는 뜻은 아니다.',
      '2026-09-01 Atlas의 Technical Details는 텍스트·이미지·카메라 포즈·깊이를 공간 문맥에 두는 멀티모달 autoregressive diffusion transformer라고 설명한다. 이전 문맥에 조건을 두어 다음 요소를 만들고, 이미지·깊이를 명시적 카메라에 연결하는 회사의 구조 설명이다. 같은 글의 평가에서 경쟁 모형에는 주로 텍스트로 카메라 경로를 지정한 조건을 밝혔으므로, 모든 모형에 동일한 카메라 입력을 준 비교라고 쓰지 않는다.',
      '2026-01-21 World API 발표는 요청을 비동기 생성 작업으로 보내고 결과 공간을 프로그램에서 이용하는 접점을 설명한다. 2026-11-05 Frameboy는 카메라 입력에 따라 클라우드 GPU의 생성 프레임을 브라우저로 보내는 연구 미리보기다. 글에서 Viewfinder는 closed beta로 소개한다. 이미 만든 splat 장면을 장치에서 그리는 일과 서버에서 새 프레임을 생성하는 일을 같은 계산 경로로 묶지 않는다.',
      'World Labs의 2026년 분류 글은 관측 영상을 만드는 renderer, 행동 뒤 상태를 예측하는 simulator, 행동을 고르는 planner를 나누어 읽는다. 이것은 회사가 제안한 기능별 관점이다. 장면의 외관이 일관되어 보이는 결과를 물리 법칙·로봇 행동의 신뢰성까지 확인한 증거로 확대하지 않는다. 로봇에 이용하려면 감각·상태·행동과 실제 환경의 비교 조건이 추가로 필요하다.',
      '공식 회사 소개의 투자자 목록에는 NVIDIA와 AMD가 실려 있다. 이 목록의 기업 관계와 리·젠슨 황 개인의 연구 관계는 다른 주장이다. 황의 CUDA 카드는 계산 기반을 비교해 읽는 연결로 제공한다. 이름이 함께 나온다는 이유로 두 사람의 지도·공동발명 관계나 모든 모델의 NVIDIA 장치 사용을 추정하지 않는다.',
      '2026-09-28 발표는 AMD와의 definitive agreement, 이전 해부터의 GPU 학습·추론 최적화 협력, 리의 예정된 역할을 설명한다. 거래는 규제 승인 등 조건을 충족하면 2026년 말까지 마칠 것으로 예상한다고 적었다. 2026-11-11 조회 기준으로 이 발표만으로 인수 완료나 새 역할의 취임을 단정하지 않는다. 관련 노드와 선에도 조건부 발표임을 표시한다.'
    ]}
  },keyIdeas:[
    {title:'대상·관계·공간·행동은 서로 다른 표현을 요구한다',text:'사물의 이름과 의미 관계를 아는 것에서 새 시점·깊이·행동 결과를 다루는 문제로 확장할 때, 어떤 자료와 출력을 배울지 다시 정해야 한다.'},
    {title:'보이지 않은 부분의 생성과 관측에 맞춘 재구성을 구분한다',text:'입력 사진에 없는 뒷면은 여러 가능성을 가진다. 그럴듯하게 채운 부분과 실제 관측으로 확인한 부분을 같은 확실성으로 읽지 않는다.'},
    {title:'학습 모형·3D 자료·렌더러·서비스는 다른 역할이다',text:'세계를 만드는 계산과 이미 만든 세계를 보여 주는 계산, 프로그램의 생성 요청과 결과 활용을 나누면 연구가 제품으로 이어지는 경로를 읽을 수 있다.'},
    {title:'기업 관계와 기술적 기여에는 날짜와 조건을 붙인다',text:'공동연구의 저자, 공동설립, 투자 목록과 조건부 거래 발표를 나누어 연결한다. 회사의 목표나 발표를 독립적으로 검증된 연구 결과로 바꾸지 않는다.'}
  ],videos:[],references:[
    {title:'Deng 외 · ImageNet (2009) 원논문',url:imagenet,location:'CVPR2009 · Fig.1, §2–3. 개념 계층과 이미지 수집·확인. 기존 연구 카드의 검토 조건과 함께 읽음.'},
    {title:'Krishna 외 · Visual Genome 원고',url:genome,location:'arXiv1602.07332v1, 2016-02-23 · Fig.1과 자료·주석 구성. 기존 2017 IJCV 기록의 사전공개 원문을 대조.'},
    {title:'Mildenhall 외 · NeRF (2020) 원논문',url:nerf,location:'arXiv2003.08934v2 · Fig.2(PDFp.5), §3–4. 좌표·방향→색·밀도→영상. 원도판과 관련 절을 확인; 리의 논문으로 표시하지 않음.'},
    {title:'Kerbl 외 · 3D Gaussian Splatting (2023) 원논문',url:splats,location:'arXiv2308.04079v1 · Fig.2(PDFp.5), Eq.3(PDFp.3), §3–4. 장면 표현·투영·순서별 합성. 이 그림을 Marble의 비공개 학습 구조라고 해석하지 않음.'},
    {title:'World Labs · About Us',url:about,location:'2026-11-11 조회 · 공동설립자 네 명, Marble 소개와 투자자 목록. 개인의 공동연구·지도 관계와 구별.'},
    {title:'World Labs · Generating Worlds',url:generating,location:'2024-12-02 · 현재 페이지의 제목·소개문만 텍스트로 확인. 탐색 가능한 공간 연구의 초기 공개 시점을 확인하며 상세 방법·성능을 이 페이지로 단정하지 않음.'},
    {title:'World Labs · Marble: A Multimodal World Model',url:marble,location:'2025-11-12 · Multi-Image and Video, Chisel, expansion/composition, Exporting Worlds. 제품 기능과 생성된 부분의 경계.'},
    {title:'World Labs · Announcing the World API',url:api,location:'2026-01-21 · A World Model You Can Call / From Prompts to Worlds. 비동기 요청과 프로그램 접점. 현재 화면은 호출하지 않음.'},
    {title:'World Labs · Atlas: A World Model for Spatial Intelligence',url:atlas,location:'2026-09-01 · Spatial Context / Explicit3D Outputs / Technical Details / Benchmarks. 회사 구조 설명과 비교의 입력 조건·early access를 함께 확인.'},
    {title:'World Labs · Frameboy: Atlas in Real-time',url:frameboy,location:'2026-11-05 · research preview, cloud GPU streaming, Viewfinder closed beta. 제품·미리보기 상태와 장치의 렌더링을 구분.'},
    {title:'World Labs · A Functional Taxonomy of World Models',url:taxonomy,location:'2026-06-03 · 상태·관측·행동의 구분, renderer/simulator/planner. 회사가 제안한 기능 분류로 읽음.'},
    {title:'World Labs · AMD와의 계약 발표',url:amd,location:'2026-09-28 · definitive agreement와 예상 종결·규제 등 조건. 2026-11-11 조회이며 완료된 인수·취임으로 바꾸지 않음.'}
  ]};
  const work={id:'fei-worldlabs-2024',year:2024,dateLabel:'2024년 World Labs 출발 · 2025–2026 공간 모형·제품·공식 발표',title:'World Labs: 대상을 알아보는 시각에서 공간을 표현하는 모형과 제품으로',summary:'ImageNet·Visual Genome의 시각 자료 연구에서 공간의 표현 문제로 질문을 넓힌다. 원논문의 시점·광선·장면 표현과 World Labs의 Marble·Atlas·API를 구분하고, 공동설립팀·기업·계산 기반의 관계를 날짜별 공식 자료로 연결한다.',type:'기업·연구 조직·공간 모형·제품·공식 자료',track:'industry',people:['Fei-Fei Li','Justin Johnson','Ben Mildenhall','Christoph Lassner'],authorNote:'World Labs의 공식 공동설립팀과 연구·제품 경로를 연결한 기록이다. 기존 ImageNet·Visual Genome 논문 저자 명단을 교체하거나 모든 방법을 공동설립자 한 명의 발명으로 뜻하지 않는다.',sources:[{title:'World Labs · 회사·공동설립팀',url:about},{title:'World Labs · Marble 공개',url:marble},{title:'World Labs · Atlas 구조·제공 설명',url:atlas},{title:'World Labs · AMD 계약 발표',url:amd}],caveat:'2024년은 회사 출발의 기준 연도다. 원논문의 장면 표현, 회사의 구조·능력 설명과 실제 제공 상태를 구분한다. AMD 거래는 2026년 발표의 조건부 예상 종결이며 완료로 표시하지 않는다. 자체 점·색 사례는 학습 모형·API 실행이나 실제 공간 복원 결과가 아니다.',content};
  person.tagline='시각 데이터·대상 관계에서 World Labs의 공간 모형과 제품으로';
  person.intro='ImageNet·Visual Genome의 기존 연구와 World Labs의 조직·공간 모형·제품 기록을 함께 읽는다. 대상을 알아보는 일, 관계를 적는 일, 새 시점·3D 자료를 만드는 일과 행동 결과를 예측하는 일을 나누어 보고, 공동연구·공동설립·투자·조건부 계약을 출처와 시점에 맞추어 연결한다.';
  if(!person.tags.includes('industry'))person.tags.push('industry');
  person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
  window.ATLAS_FEI_REVISION={personId:person.id,workId:work.id,visualId:'worldlabs-spatial-platform',sourceVersion:'0.49'};
})();
