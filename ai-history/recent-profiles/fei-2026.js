/* A new dated Atlas record; the earlier World Labs and research cards stay intact. */
(function(){
 'use strict';
 const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='fei-fei-li');
 if(!person||person.works.some(w=>w.id==='fei-atlas-world-model-2026'))throw Error('The existing Fei-Fei Li profile and an unapplied2026 record are required.');
 const atlas='https://worldlabs.ai/blog/atlas',release='https://worldlabs.ai/atlas',updates='https://worldlabs.ai/blog',frameboy='https://worldlabs.ai/blog/atlas-realtime',about='https://worldlabs.ai/about';
 const content={article:{
  question:'사진 한 장의 바깥으로 카메라를 옮길 때,\n이전에 본 공간과 새로 상상한 부분을 어떻게 함께 다룰까?',
  evidenceLabel:'공식 자료 더 읽기',referencesLabel:'Atlas의 공식 구조 설명·공개 기록·연구 미리보기',
  opening:[
   '사진에 보이는 가림판 뒤에는 무엇이 있을까? 한 장의 영상에는 보이지 않는 면이 있다. 새로운 시점을 만드는 프로그램은 이전에 본 부분의 관계를 유지하면서도 아직 관측하지 않은 부분을 채워야 한다. 이때 그럴듯하게 생성한 모습과 관측으로 확인한 모습은 같은 근거를 갖지 않는다.',
   '페이페이 리가 공동설립한 World Labs는2026년 Atlas를 소개하며 이미지·카메라 포즈·깊이를 공간 문맥으로 연결하는 구상을 설명했다. 카메라가 어디를 보았는지를 표현에 넣고 이전 문맥에 조건을 두어 다음 출력을 만든다. 문서와 단어의 나열만 다루던 시퀀스 모형을, 위치가 붙은 여러 종류의 관측으로 넓혀 읽을 수 있다.',
   '회사의 구조 설명은 Atlas를 멀티모달 자기회귀 확산 Transformer로 부른다. 여기서 자기회귀는 앞선 요소를 조건으로 다음 요소를 만드는 순서이고, 확산은 연속적인 출력의 생성 방식이다. 새 시점·깊이·명시적3D 출력에 관한 회사 설명을 하나의 공통 문맥이라는 질문으로 연결한다.',
   '11월12일 공개 기록은 Atlas의 도구와 개발자 접점을 소개한다. Viewfinder는 장면을 재구성하고 새 시점을 탐색하는 흐름, Chisel은 거친 공간 배치로 결과를 조절하는 흐름을 제시한다. 앞선11월5일 Frameboy는 생성 프레임을 서버에서 브라우저로 전송하는 연구 미리보기로 소개됐다. 이전World Labs 카드의 출발·공간 표현과, 이번2026년 공개 기록의 시점을 나누어 읽는다.',
   '아래에서는 가림판과 두 표식의 기하를 직접 정하고, 세 카메라의 색 관측을 계산했다. 한 장만 읽으면 네 색 가설이 모두 맞지만 양쪽 관측을 모으면 선택지가 줄어든다. 새 이미지를 학습해 생성하는 Atlas를 실행하는 대신, 관측을 공간에 연결할 이유와 문맥을 남기지 않았을 때 잃는 제약을 분리해서 보여 준다.'
  ],
  visual:{id:'fei-atlas-2026',navLabel:'관측·문맥·새 시점',title:'같은 공간의 관측을 모으고, 가려진 부분의 근거를 나누다',caption:'공식 Atlas 소개의 공간 문맥 아이디어를 참고해 직접 만든 기하·색·카메라 사례입니다. 관측을 추가하고 남기는 조건을 바꾸며, 입력과 맞는 장면 가설과 아직 정해지지 않은 색을 실제 산술로 비교합니다.'},
  takeaway:{title:'한 장에서 보이지 않은 부분은 생성과 관측의 경계를 남긴 채 이어야 한다',text:'새 시점이 그럴듯하다는 사실만으로 실제 공간을 확인했다고 할 수는 없다. 무엇을 관측했고, 어떤 카메라와 깊이에 연결했으며, 남은 부분을 어떤 가설로 채웠는지 나누면 세계 모형의 출력과 재구성의 근거를 함께 읽을 수 있다.'},
  technical:{title:'2026년 공개 기록과 자체 공간 계산을 자세히 읽기',paragraphs:[
   '서지와 시점: Atlas 구조 설명은World Labs Team 명의의2026-09-01 공식 기술 글이다. 2026-11-12 연구 목록의 공개 기록은현재 Atlas 제품·도구 페이지로 연결된다. 논문 심사 결과나 리 개인의 단독 발명 기록으로 바꾸지 않는다. 공동설립자 네 명의 역할과 회사 팀의 연구·제품 발표도 구분한다.',
   'Atlas의 Model Architecture 절은 텍스트·이미지·카메라 포즈·깊이 지도를 다루며, 이미지와 깊이를 명시적 카메라에 연결한다고 설명한다. Spatial Context 절은 입력을 공간에 놓고 그 문맥에 조건을 두어 다음 관측을 생성하는 방식을 제시한다. 이 공개 설명으로 전체 학습 자료·가중치·실제 내부 처리의 모든 세부를 알 수 있다고 쓰지 않는다.',
   '입력에 없는 영역의 생성과 관측에 맞춘 재구성은 다르다. 공식 Spatial Reconstruction 사례도 입력 이미지가 늘면 상상으로 채우던 부분이 추가 관측에 제한되는 모습을 설명한다. 아래의 네 가설 비교는 이 질문을 직접 정한 단면에서 읽는 사례이며 회사의 실제3D 재구성 성능을 재현하지 않는다.',
   '자체 계산: 21개 광선의 좌표 u는−10부터10까지이며, 카메라의 x위치와 면의 깊이 z에 대해 교점 x=Cx+u×z/12를 계산한다. 교점이 면의 가로 범위 안에 있으면 닿은 것으로 보고, 여러 면에 닿으면 깊이가 가장 작은 면의 색을 선택한다. 주어진 깊이·물체 좌표를 이미지에서 추정하지 않는다.',
   '가설 네 개는 같은 가림판과 배치를 공유하고 뒤 두 표식의 색만 다르다. 가상 관측은 금색·청록 장면에서 계산했다. 각 가설의 영상과 관측의21개 색이 같은지 정확히 비교한다. 가설이 하나만 남아도 미리 정한 네 장면 밖의 세계까지 정답을 찾았다는 뜻은 아니다. 최근 한 장만 남기는 조건은 이전 관측의 제약을 제거하는 자체 대조다.',
   '제품의 계산 경로도 나눈다. Frameboy는 클라우드GPU에서 생성한 프레임을 전송하는 연구 미리보기로 소개됐고, 이미 생성된 Gaussian splat 장면을 기기에서 렌더링하는 경로와 다르다. 현재 보기는 원자료의 API를 호출하지 않으며, 직접 정한 장면의 광선·가림·색 비교만 실행한다.'
  ],formula:'자체 고정 장면의 가시성\n\nx = 카메라x + u × 깊이 / 12\n\n면의 가로 범위에 닿는 교점 중\n깊이가 가장 작은 면의 색을 선택\n\n입력 관측과 색이 모두 같은 가설을 남김\n미관측 영역의 선택 ≠ 실제 공간의 확인'}
 },keyIdeas:[
  {title:'관측은 카메라와 함께 공간에 놓인다',text:'같은 색 이미지라도 어디에서 어느 방향으로 본 기록인지가 다르면 다음 시점에 주는 제약이 달라진다.'},
  {title:'생성한 부분과 관측으로 확인한 부분을 나눈다',text:'가려진 면에는 여러 장면이 맞을 수 있다. 새로운 관측은 그중 입력과 다른 선택을 가려내는 근거가 된다.'},
  {title:'이전 문맥을 남기는 선택은 다음 출력의 조건을 바꾼다',text:'공간의 여러 관측을 함께 쓸 때와 최근 한 장만 볼 때 남는 가설을 대조한다. 이는 직접 만든 유한 비교이며 실제 모형 성능의 주장과 구분한다.'},
  {title:'세계 생성·재구성·렌더링·제품 접점을 나누어 읽는다',text:'같은 탐색 화면처럼 보여도 새 관측을 만드는 모형, 명시적인3D 자료, 이를 그리는 렌더러와 개발자 API는 서로 다른 역할을 맡는다.'}
 ],videos:[],references:[
  {title:'World Labs Team · Atlas: A World Model for Spatial Intelligence',url:atlas,location:'2026-09-01 공식 기술 글·2026-11-15 현재판 확인. Generating with Spatial Context, Spatial Reconstruction, Explicit3D Outputs, Model Architecture. 회사 설명과 자체 계산을 구분.'},
  {title:'World Labs · 연구·공개 기록',url:updates,location:'2026-11-12 Atlas 공개 항목의 날짜와 제품 페이지 연결 확인. 기존2026-09-01기술소개·11-05미리보기와 구분.'},
  {title:'World Labs · Atlas 제품·도구 공개 페이지',url:release,location:'2026-11-15 조회. Viewfinder, Chisel, Splats to Mesh, Relight, Developer API. 공개 도구의 역할이며 실제 호출·사용 결과는 아님.'},
  {title:'World Labs · Frameboy: Atlas in Real-time',url:frameboy,location:'2026-11-05. 연구 미리보기·클라우드 생성 프레임 전송·공간 문맥·Viewfinder 설명. 11월12일 공개 기록과 시점 구분.'},
  {title:'World Labs · 공식 공동설립팀 소개',url:about,location:'2026-11-15 조회. Fei-Fei Li·Justin Johnson·Ben Mildenhall·Christoph Lassner 공동설립. 회사 팀의 모형 성과를 한 사람의 단독 발명으로 귀속하지 않음.'}
 ]};
 person.intro+=' 2026년에는 Atlas의 공간 문맥과 공개 도구를 별도 기록으로 이어 읽는다. 카메라가 붙은 관측을 함께 쓰는 문제, 보이지 않은 부분의 생성과 실제 관측으로 제한되는 부분, 모형의 생성과 렌더러·API의 역할을 나누어 살핀다.';
 person.works.push({id:'fei-atlas-world-model-2026',year:2026,dateLabel:'2026-11-12 Atlas 공개 · 09-01 구조 설명·11-05 연구 미리보기와 구분',title:'Atlas: 관측을 공간 문맥으로 연결하고, 새 시점과3D 세계로 이어가다',summary:'World Labs의2026년 Atlas 구조·공개 도구를 따라, 이미지·카메라·깊이를 함께 쓰려던 아이디어를 읽는다. 직접 만든 가림 장면에서 관측을 모을 때와 최근 한 장만 남길 때의 제약을 비교하고, 생성한 부분과 관측의 근거를 나눈다.',type:'공식 기술·모형·제품 공개',track:'neural',people:['Fei-Fei Li','World Labs Team'],authorNote:'World Labs Team의 공식 기술·제품 자료와 리의 공동설립 역할을 연결한 기록이다. 공동설립자 한 명이 Atlas 전체를 단독 설계·발명했다는 뜻이 아니다.',sources:[{title:'World Labs · Atlas 구조 설명',url:atlas},{title:'World Labs ·2026-11-12공개 기록',url:updates},{title:'World Labs · Atlas 도구·API',url:release}],caveat:'2026년 공식 회사 설명을 바탕으로 한 기록이다. 새 시점의 외관 일관성을 물리 법칙·로봇 행동의 정확성까지 입증한 결과로 확대하지 않는다. 아래 광선·색·가설 비교는 직접 만든 고정 자료이며 Atlas 학습·추론·재구성·API 실행이 아니다.',content});
 person.works.sort((a,b)=>a.year-b.year);
})();
