/* Source-bound roles and authored spatial arithmetic; no model/API is executed. */
(function(){
  'use strict';
  const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  const sources={
    imagenet:{title:'Deng 외 · ImageNet 원논문',url:'https://image-net.org/static_files/papers/imagenet_cvpr09.pdf',location:'CVPR2009 · Fig.1, §2–3. 대상 개념과 검증한 이미지의 계층형 자료'},
    genome:{title:'Krishna 외 · Visual Genome 원고',url:'https://arxiv.org/pdf/1602.07332v1',location:'2016 arXiv 원고·2017 IJCV 기록 · Fig.1, 주석 구성. 영역·대상·속성·관계와 장면 그래프'},
    nerf:{title:'Mildenhall 외 · NeRF 원논문',url:'https://arxiv.org/pdf/2003.08934v2',location:'2020 · Fig.2(PDFp.5), §3–4. 좌표·방향→색·밀도→영상. 별도 연구팀의 장면 표현 사례'},
    splats:{title:'Kerbl 외 · 3D Gaussian Splatting 원논문',url:'https://arxiv.org/pdf/2308.04079v1',location:'2023 · Eq.3(PDFp.3), Fig.2(PDFp.5), §3–4. 투영·순서별 합성과 장면 최적화'},
    about:{title:'World Labs · 공동설립팀·기업 소개',url:'https://worldlabs.ai/about',location:'2026-11-11 조회 · 네 명의 공동설립자와 투자자 목록. 개인 공동연구나 특정 장치 사용의 증거와 구분'},
    generating:{title:'World Labs · Generating Worlds',url:'https://worldlabs.ai/blog/generating-worlds',location:'2024-12-02 · 제목과 소개문으로 초기 탐색 공간 연구의 공개 시점만 확인'},
    marble:{title:'World Labs · Marble 공개',url:'https://worldlabs.ai/blog/marble-world-model',location:'2025-11-12 · 입력·Chisel·편집·확장·내보내기. 공개 출력 형식과 비공개 학습 구현을 구분'},
    api:{title:'World Labs · World API 공개',url:'https://worldlabs.ai/blog/announcing-the-world-api',location:'2026-01-21 · A World Model You Can Call / From Prompts to Worlds. 비동기 요청과 결과 활용'},
    atlas:{title:'World Labs · Atlas 구조·평가 설명',url:'https://worldlabs.ai/blog/atlas',location:'2026-09-01 · Spatial Context, Explicit3D Outputs, Technical Details, Benchmarks와 early access. 회사 발표의 범위'},
    frameboy:{title:'World Labs · Frameboy 연구 미리보기',url:'https://worldlabs.ai/blog/atlas-realtime',location:'2026-11-05 · cloud GPU 생성 프레임과 카메라 제어. Viewfinder는 closed beta로 소개'},
    taxonomy:{title:'World Labs · 세계 모형의 기능별 분류',url:'https://worldlabs.ai/blog/taxonomy-of-world-models',location:'2026-06-03 · 상태·관측·행동, renderer/simulator/planner. 회사가 제안한 개념적 분류'},
    amd:{title:'World Labs · AMD와의 조건부 계약',url:'https://worldlabs.ai/blog/amd-announcement',location:'2026-09-28 · definitive agreement, 이전 협력과 예정 역할. 예상 종결end2026·규제 등 조건을 완료된 거래와 구분'}
  };
  const n=(id,label,short,icon,type,input,role,output,sourceIds)=>({id,label,short,icon,type,input,role,output,sourceIds});
  const nodes=[
    n('object-labels','대상의 이름','ImageNet · 무엇이 있는가','image','자료가 정하는 학습 대상','대상 개념과 여러 이미지','ImageNet은 개념 계층에 맞춘 이미지 수집·확인으로 시각 인식의 자료를 만들었다. 분류 자료가 깊이·힘의 법칙까지 제공하는 것은 아니다.','대상 범주를 배울 자료',['imagenet']),
    n('object-relations','대상 사이의 관계','Visual Genome · 무엇과 어떤 관계인가','relations','자료의 표현을 넓히기','영역·대상·속성·관계 주석','Visual Genome은 장면 안의 의미 관계를 주석으로 연결했다. 의미 관계와 수치적 3D 공간·동역학은 서로 다른 표현이다.','영역 설명과 장면 그래프',['genome']),
    n('camera-rays','관측과 카메라','어디에서 어느 방향을 보았는가','camera','영상과 공간을 잇는 조건','여러 관측 영상과 카메라','같은 공간도 시점에 따라 영상이 달라진다. 아래 직접 정한 핀홀 계산은 깊이가 다른 두 점의 시차만 보여 준다.','공간을 통과하는 관측 광선',['nerf','splats']),
    n('radiance-field','좌표에서 색·밀도로','NeRF · 한 장면의 연속 함수','model','원논문의 공간 표현 사례','3D 위치와 보는 방향','NeRF는 좌표·방향에서 색과 밀도를 구하는 함수를 신경망으로 맞추었다. 리의 논문이나 Marble의 공개된 전체 구조라고 표시하지 않는다.','광선을 따라 누적할 값',['nerf']),
    n('gaussian-scene','가우시안 장면 요소','3DGS · 위치·모양·색·불투명도','points','별도 원논문의 표현·렌더링','보정된 영상과 초기 점','3DGS는 가우시안 장면 요소들을 최적화해 영상으로 투영한다. Marble은 splat 출력을 공개하지만 그것만으로 생성기의 학습 구조를 알 수는 없다.','투영·합성 가능한 장면 표현',['splats','marble']),
    n('novel-view','다른 자리의 영상','표현에서 새 시점을 그리기','eye','출력의 역할','카메라와 학습·최적화한 장면','관측에 맞춘 장면 표현으로 새 시점을 그린다. 영상이 그럴듯해 보이는 것과 가려진 실제 공간·물리적 행동을 확인한 것은 다른 주장이다.','새 시점의 영상과 확인 조건',['nerf','splats']),
    n('generative-space','관측 밖의 공간 생성','입력에 없는 부분은 여러 가능성','world','생성 모형의 문제','이미지·텍스트·공간 문맥','Marble·Atlas 발표는 입력에 없는 영역도 생성한다고 설명한다. 새 부분은 관측으로 확정한 사실과 구분해 읽어야 한다.','탐색·편집할 생성 공간',['marble','atlas']),
    n('action-boundary','행동의 검증은 별도','렌더링·시뮬레이션·계획을 구분','target','주장의 범위를 나누기','생성 영상·공간과 행동 조건','회사의 기능 분류는 관측, 행동 뒤 상태, 행동 선택을 나눈다. 외관의 일관성만으로 모든 힘·충돌·로봇 행동이 검증되지는 않는다.','과제별로 필요한 추가 확인',['taxonomy']),
    n('input-signals','이번 입력과 배치','텍스트·이미지·영상·거친 3D','image','요청의 출발','사용자가 주는 관측과 조건','Marble 공개는 여러 입력 형식과 Chisel의 거친 3D 배치를 소개했다. 입력으로 정한 구조와 모형이 채우는 세부를 구분한다.','생성 작업에 주는 조건',['marble']),
    n('generated-space','생성한 공간 자료','새 요청과 학습된 모형은 별개','world','모형 출력의 역할','준비된 모형과 이번 입력','모형이 만든 공간을 결과 자료로 다룬다. 이 도식은 학습 구현을 공개하거나 API를 실행하는 화면이 아니다.','검토·수정할 생성 결과',['marble','api']),
    n('edit-expand','편집·확장·합성','결과를 다음 작업의 입력으로','tools','제작 과정의 접점','생성 결과와 사용자의 변경','공개 글은 부분 편집, 영역 확장과 여러 공간의 합성을 나누어 설명했다. 한 번의 생성과 반복 제작은 같은 단계가 아니다.','새 조건에 맞춘 공간 자료',['marble']),
    n('render-interaction','장면을 장치에서 그리기','이미 만든 splat의 시점 변경','eye','렌더링의 역할','명시적인 공간 자료와 카메라','이미 만든 splat 장면은 렌더러로 다른 시점에서 보여 줄 수 있다. 서버에서 새 프레임을 생성하는 Frameboy 경로와 구분한다.','브라우저·장치에 표시할 영상',['marble','frameboy']),
    n('export-assets','자료를 다른 도구로','splat·메시·영상 내보내기','data','결과를 옮기는 접점','검토한 생성 공간','Marble 글은 여러 내보내기 형식을 설명한다. 렌더링 자료와 거친 collider 메시를 실제 환경의 물리적 정답으로 해석하지 않는다.','다른 제작·시뮬레이션 도구의 입력',['marble']),
    n('world-api','프로그램의 생성 요청','비동기 작업과 결과 활용','code','개발자 접점','입력·요청을 보내는 프로그램','World API는 공간 생성 요청을 비동기 작업으로 제공한다고 설명한다. 요청·작업·결과를 구분하며 이 화면은 호출하지 않는다.','프로그램에서 이용할 결과',['api']),
    n('atlas-stream','Atlas·Frameboy','공간 문맥과 생성 프레임','model','2026년 모델과 연구 미리보기','카메라·이미지·깊이의 문맥','Atlas는 공개 글에서 공간 문맥에 조건을 둔 멀티모달 모형으로 설명된다. Frameboy는 클라우드 GPU의 생성 프레임을 보내는 연구 미리보기다.','생성 영상·깊이와 사용자 접점',['atlas','frameboy']),
    n('validation-conditions','자료와 성능의 확인','관측·생성·평가 조건을 함께','chart','이용 전에 읽을 경계','입력 관측·출력과 평가 설계','회사 발표의 비교 입력·제공 상태·제약을 확인한다. 생성한 영역의 사실성이나 모든 실제 행동의 안정성을 이 도식의 계산으로 판단하지 않는다.','적용 조건과 추가 검증',['atlas','taxonomy']),
    n('fei','페이페이 리','데이터 연구와 공동설립의 역할','person','개인의 기여를 날짜별로','공동연구와 조직의 역할','ImageNet·Visual Genome의 공동연구와 World Labs 공동설립을 연결한다. 모든 공간 표현 논문을 개인의 단독 발명으로 합치지 않는다.','연구와 조직을 연결한 기록',['imagenet','genome','about']),
    n('cofounders','공동설립팀','Johnson·Mildenhall·Lassner','people','서로 다른 연구 배경','네 명의 공동설립자','공식 회사 소개의 설립팀과 원논문 저자를 대조한다. Johnson의 Visual Genome 참여, Mildenhall의 NeRF 참여는 각각 원논문에서 확인한다.','여러 연구·개발 기여의 팀',['about','genome','nerf']),
    n('world-labs','World Labs','2024 출발 · 공간 모형과 제품','company','연구 조직과 제공 경로','연구·엔지니어링·제품 팀','2024년 창립을 공식 후속 발표가 회고한다. 연구 모형과 Marble·개발자 접점의 공개 시점을 따로 읽는다.','공간 연구와 제품의 접점',['about','amd','api']),
    n('nvidia','NVIDIA','공식 투자자 목록의 기업 관계','chip','기업 관계의 근거','회사 소개에 기재한 투자자','공식 투자자 목록에 NVIDIA가 있다. 황의 CUDA 카드는 계산 기반을 비교해 읽는 연결이며 두 사람의 공동발명·지도 관계를 뜻하지 않는다.','확인한 기업 관계와 인프라 읽기',['about']),
    n('amd','AMD · 조건부 계약','2026.09 발표 · 종결 조건 유지','chip','거래 발표와 예정 역할','definitive agreement와 이전 협력','발표는 승인 등 조건 아래 2026년 말까지의 종결을 예상한다. 계약·예정 역할을 완료된 인수·취임으로 바꾸지 않는다.','조건과 후속 확인이 있는 관계',['amd']),
    n('users-developers','창작자와 개발자','앱·API·도구의 이용자','people','제품이 만나는 사람','공간을 만들고 이용할 요청','모형의 결과를 편집하거나 프로그램·다른 도구에서 활용한다. 연구 평가와 개별 실제 작업의 적합성은 별도로 확인해야 한다.','실제 작업과 검토의 요구',['marble','api']),
    n('research-community','시각·그래픽스 연구','자료·관계·공간 표현의 여러 팀','relations','방법과 인물의 연결을 구분','여러 논문의 문제와 조건','시각 데이터, NeRF와 3DGS를 서로 다른 연구로 비교한다. 공통 개념이나 출력 형식만으로 회사 내부의 모든 기술 계보를 단정하지 않는다.','원문과 연구 인물로 이어 읽기',['imagenet','genome','nerf','splats'])
  ];
  const e=(id,from,to,label,kind,sourceIds)=>({id,from,to,label,kind,sourceIds});
  const edges=[
    e('labels-relations','object-labels','object-relations','대상에서 의미 관계로','comparison',['imagenet','genome']),
    e('rays-nerf','camera-rays','radiance-field','좌표와 방향','paper',['nerf']),
    e('rays-splats','camera-rays','gaussian-scene','보정된 관측','paper',['splats']),
    e('nerf-view','radiance-field','novel-view','광선의 값 누적','paper',['nerf']),
    e('splats-view','gaussian-scene','novel-view','투영·합성','paper',['splats']),
    e('world-splats','generative-space','gaussian-scene','공개 출력 형식','export',['marble','atlas']),
    e('world-boundary','generative-space','action-boundary','행동 검증의 조건','condition',['taxonomy']),
    e('input-generated','input-signals','generated-space','조건에서 공간으로','product',['marble']),
    e('generated-edit','generated-space','edit-expand','반복 제작','product',['marble']),
    e('edit-render','edit-expand','render-interaction','표현을 보여 주기','product',['marble']),
    e('generated-export','generated-space','export-assets','결과 내보내기','product',['marble']),
    e('api-generation','world-api','generated-space','비동기 요청','product',['api']),
    e('atlas-render','atlas-stream','render-interaction','별도의 생성·전송 경로','comparison',['atlas','frameboy']),
    e('generated-check','generated-space','validation-conditions','과제별 확인','condition',['atlas','taxonomy']),
    e('fei-lab','fei','world-labs','공동설립','organization',['about']),
    e('team-lab','cofounders','world-labs','공동설립팀','organization',['about']),
    e('community-fei','research-community','fei','데이터 공동연구','research',['imagenet','genome']),
    e('community-team','research-community','cofounders','논문별 기여','research',['genome','nerf','about']),
    e('nvidia-lab','nvidia','world-labs','투자자로 기재','listed',['about']),
    e('amd-lab','amd','world-labs','조건부 계약 발표','announced',['amd']),
    e('lab-users','world-labs','users-developers','앱·개발자 접점','organization',['marble','api'])
  ];
  const views=[
    {id:'research',label:'01 대상·관계에서 공간의 표현으로',title:'무엇이 있는가, 어디에 있는가, 다른 자리에서는 무엇이 보이는가?',intro:'자료의 의미 표현과 별도 연구팀의 공간 표현을 비교합니다. 비교 선은 한 사람·회사로 모든 방법이 직접 계승되었다는 뜻이 아닙니다.',initial:'camera-rays',nodeIds:['object-labels','object-relations','camera-rays','radiance-field','gaussian-scene','novel-view','generative-space','action-boundary'],edgeIds:['labels-relations','rays-nerf','rays-splats','nerf-view','splats-view','world-splats','world-boundary'],height:535,positions:{'object-labels':[170,85],'object-relations':[610,85],'camera-rays':[140,260],'radiance-field':[470,260],'gaussian-scene':[800,260],'novel-view':[140,440],'generative-space':[470,440],'action-boundary':[800,440]},scope:'NeRF Fig.2와 3DGS Fig.2·Eq.3을 참고한 자체 개념도입니다. Marble의 비공개 내부 학습 구조나 실제 모형 출력이 아니며, 의미 관계·영상·기하·행동을 같은 검증으로 합치지 않습니다.'},
    {id:'product',label:'02 공간 모형에서 앱·API로',title:'생성한 공간, 이미 만든 공간의 렌더링, 새 프레임의 생성을 나누어 읽다',intro:'입력·생성 결과·편집·내보내기와 개발자 요청을 연결합니다. 정적인 splat 렌더링과 Atlas·Frameboy의 서버 생성·전송은 다른 경로입니다.',initial:'generated-space',nodeIds:['input-signals','generated-space','edit-expand','render-interaction','export-assets','world-api','atlas-stream','validation-conditions'],edgeIds:['input-generated','generated-edit','edit-render','generated-export','api-generation','atlas-render','generated-check'],height:465,positions:{'input-signals':[120,80],'generated-space':[365,80],'edit-expand':[610,80],'render-interaction':[845,80],'export-assets':[365,315],'world-api':[120,315],'atlas-stream':[845,315],'validation-conditions':[610,315]},scope:'2025년 Marble, 2026년 API·Atlas·Frameboy의 발표 시점과 제공 상태를 구분합니다. 회사의 능력·비교 주장을 독립 재현 결과로 표시하지 않으며 실제 요청·과금·모형 실행은 하지 않습니다.'},
    {id:'connections',label:'03 사람·기업·계산 기반 연결',title:'공동연구·공동설립·투자·조건부 계약은 서로 다른 관계다',intro:'연구자의 논문 기여와 조직의 관계를 나눕니다. NVIDIA는 공식 목록의 투자 관계이며, AMD의 2026년 계약은 조건부 예상 종결로 표시합니다.',initial:'world-labs',nodeIds:['fei','cofounders','world-labs','nvidia','amd','users-developers','research-community'],edgeIds:['fei-lab','team-lab','community-fei','community-team','nvidia-lab','amd-lab','lab-users'],height:470,positions:{fei:[95,80],cofounders:[365,80],'world-labs':[620,190],nvidia:[850,80],amd:[850,335],'users-developers':[365,345],'research-community':[95,345]},scope:'2026-11-11에 읽은 공식 자료의 범위입니다. 계약 종결·현재 취임을 추정하지 않습니다. 기존 다른 기업 카드는 비교 읽기이며, 그 연결 자체를 협업 관계로 주장하지 않습니다.'}
  ];
  const milestones=[
    {date:'2024',title:'World Labs 출발',text:'2026년 공식 발표가 회고한 창립 연도',sourceId:'amd'},
    {date:'2025.11.12',title:'Marble 공개',text:'공간 생성·편집·내보내기의 제품 접점',sourceId:'marble'},
    {date:'2026.01.21',title:'World API',text:'프로그램의 비동기 생성 요청',sourceId:'api'},
    {date:'2026.09.01',title:'Atlas 발표',text:'공간 문맥과 여러 출력의 회사 구조 설명·early access',sourceId:'atlas'},
    {date:'2026.09.28',title:'AMD와의 계약 발표',text:'예상 종결end2026·승인 등 조건이 있는 발표',sourceId:'amd'},
    {date:'2026.11.05',title:'Frameboy 연구 미리보기',text:'클라우드 생성 프레임을 카메라 제어와 연결',sourceId:'frameboy'}
  ];
  const examples={
    projection:{id:'projection',label:'카메라를 옮겨 깊이의 차이 보기',question:'같은 화소에 겹친 두 점을, 옆으로 이동해서 보면?',scope:'좌표·초점거리·카메라 위치를 직접 정한 핀홀 기하입니다. 실제 사진·보정·특징 대응·깊이 신경망이나 World Labs 모형을 실행하지 않습니다.',focal:120,points:[{id:'near',label:'가까운 점',x:1,z:4,color:'#a94d5d'},{id:'far',label:'먼 점',x:2,z:8,color:'#4e8caa'}],cameras:[{id:'left',label:'왼쪽 · Cx=−1',x:-1},{id:'center',label:'정면 · Cx=0',x:0},{id:'right',label:'오른쪽 · Cx=1',x:1}]},
    compositing:{id:'compositing',label:'가려지는 순서와 한 화소의 색',question:'같은 색·알파도 앞뒤 순서가 바뀌면 같은 영상이 될까?',scope:'3DGS Eq.3의 합성 역할을 참고해 두 요소의 화소별 색·알파를 직접 정했습니다. 남은 투과율에는 흰 배경을 더합니다. 실제 가우시안 투영·학습·전체 렌더러·Marble 실행을 재현하지 않습니다.',background:[1,1,1],layers:[{id:'red',label:'붉은 요소',color:[1,0,0],alpha:.6},{id:'blue',label:'푸른 요소',color:[0,0,1],alpha:.5}],modes:[{id:'red-front',label:'붉은 요소가 앞',order:['red','blue']},{id:'blue-front',label:'푸른 요소가 앞',order:['blue','red']},{id:'opaque-front',label:'앞 요소의 α=1',order:['red','blue'],opaque:true}]}
  };
  const bridges=[
    {id:'person-fei',type:'person',label:'페이페이 리 인물 카드',personId:'fei-fei-li',filter:'industry'},
    {id:'event-imagenet',type:'event',label:'ImageNet 연구 카드',eventId:'imagenet'},
    {id:'event-visual-genome',type:'event',label:'Visual Genome 연구 카드',eventId:'visual-genome'},
    {id:'person-huang',type:'person',label:'젠슨 황 인물 카드',personId:'jensen-huang',filter:'industry'},
    {id:'work-huang-cuda',type:'work',label:'CUDA·계산 기반 카드',personId:'jensen-huang',workId:'huang-cuda-2006',filter:'industry'},
    {id:'person-finn',type:'person',label:'첼시 핀 · 로봇 연구 비교',personId:'chelsea-finn',filter:'industry'},
    {id:'person-peebles',type:'person',label:'윌리엄 피블스 · 생성 표현 비교',personId:'william-peebles',filter:'industry'}
  ];
  const byId=new Map(nodes.map(x=>[x.id,x])),edgeById=new Map(edges.map(x=>[x.id,x]));
  if(byId.size!==nodes.length||edgeById.size!==edges.length)throw new TypeError('Spatial role/edge IDs must be unique.');
  for(const item of [...nodes,...edges])if(!item.sourceIds.length||item.sourceIds.some(id=>!sources[id]))throw new TypeError('Every spatial role/edge needs a source.');
  for(const edge of edges)if(!byId.has(edge.from)||!byId.has(edge.to)||edge.from===edge.to)throw new TypeError('Distinct spatial role endpoints required.');
  for(const v of views)if(!v.nodeIds.includes(v.initial)||v.nodeIds.some(id=>!byId.has(id)||!v.positions[id])||v.edgeIds.some(id=>!edgeById.has(id)||![edgeById.get(id).from,edgeById.get(id).to].every(x=>v.nodeIds.includes(x))))throw new TypeError('Visible positioned spatial endpoints required.');
  function getView(id){const v=views.find(x=>x.id===id);if(!v)throw new RangeError('Unknown spatial view.');return freeze({...v,nodes:v.nodeIds.map(x=>byId.get(x)),edges:v.edgeIds.map(x=>edgeById.get(x))});}
  function select(viewId,nodeId){const v=getView(viewId),index=v.nodeIds.indexOf(nodeId);if(index<0)throw new RangeError('Choose a visible spatial role.');return freeze({viewId,index,node:v.nodes[index],connections:v.edges.filter(e=>e.from===nodeId||e.to===nodeId),hasPrevious:index>0,hasNext:index<v.nodes.length-1});}
  function step(viewId,nodeId,direction){if(direction!==1&&direction!==-1)throw new RangeError('Step one spatial role at a time.');const s=select(viewId,nodeId),v=getView(viewId);return select(viewId,v.nodeIds[Math.max(0,Math.min(v.nodeIds.length-1,s.index+direction))]);}
  function getExample(id){if(!Object.hasOwn(examples,id))throw new RangeError('Unknown spatial example.');return freeze({...examples[id],executesModel:false,executesApi:false});}
  function projectionCase(cameraId){const data=getExample('projection'),camera=data.cameras.find(x=>x.id===cameraId);if(!camera)throw new RangeError('Choose a known camera.');const projected=data.points.map(p=>({...p,u:data.focal*(p.x-camera.x)/p.z}));return freeze({cameraId,camera,focal:data.focal,projected,separation:Math.abs(projected[0].u-projected[1].u),overlap:projected[0].u===projected[1].u,scope:data.scope,executesModel:false});}
  function compositingCase(modeId){const data=getExample('compositing'),mode=data.modes.find(x=>x.id===modeId);if(!mode)throw new RangeError('Choose a known layer order.');let transmission=1,color=[0,0,0];const contributions=mode.order.map((id,i)=>{const original=data.layers.find(x=>x.id===id),layer={...original,alpha:mode.opaque&&i===0?1:original.alpha},before=transmission,weight=before*layer.alpha;const amount=layer.color.map(x=>weight*x);color=color.map((x,j)=>x+amount[j]);transmission*=1-layer.alpha;return{...layer,before,weight,amount,after:transmission};});const background=data.background.map(x=>x*transmission);color=color.map((x,i)=>x+background[i]);return freeze({modeId,mode,contributions,backgroundWeight:transmission,background,color,rgb:color.map(x=>Math.round(255*x)),scope:data.scope,executesModel:false});}
  window.AtlasWorldlabsSpatialPlatform=freeze({sources,nodes,edges,views:views.map(v=>getView(v.id)),milestones,bridges,exampleIds:Object.keys(examples),getView,select,step,getExample,projectionCase,compositingCase});
})();
