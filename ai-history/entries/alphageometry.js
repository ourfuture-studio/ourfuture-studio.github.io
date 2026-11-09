/* AlphaGeometry2024: new geometric constructions enable rule-based deductions. */
(function(){
 'use strict';const paper='https://www.nature.com/articles/s41586-023-06747-5',archive='https://pmc.ncbi.nlm.nih.gov/articles/PMC10794143/',repo='https://github.com/google-deepmind/alphageometry',source=title=>({title:'Trinh 외 (2024) · '+title,url:paper});
 window.AtlasEntries.register({id:'alphageometry',record:{
  title:'AlphaGeometry · 새 점을 제안하면, 막힌 증명에 길이 생길까?',subtitle:'Solving olympiad geometry without human demonstrations',dateLabel:'2024 · Nature 논문 출판',people:['Trieu H. Trinh','Yuhuai Wu','Quoc V. Le','He He','Thang Luong'],
  authorNote:'Trieu H. Trinh, Yuhuai Wu, Quoc V. Le, He He, Thang Luong의 Nature625, pp.476–482 논문.2024년1월17일 온라인·18일 권호 출판.2024년2월 정정은 감사의 성명 표기를 고친 것으로 방법의 새 판본과 구분한다. 후속 AlphaGeometry2를 이 카드의 원모델로 설명하지 않는다.',
  summary:'기호 엔진이 현재 점과 관계에서 더 추론하지 못하면, 합성 증명으로 배운 언어모델이 새 보조 구성을 제안했다. 그 구성이 추가한 관계를 기호 추론에 돌려주어 증명을 이어 갔다.',detail:'',question:'',related:['transformer','strips','alphaproof'],
  sources:[{title:'Trinh 외2024 · Nature 원문',url:paper},{title:'AlphaGeometry · 공식 코드와모델',url:repo}],
  caveat:'고전 평면 기하의 전용 표현과 추론 엔진 범위에서 작동한다. 아래 후보·점수·기호 규칙은 이 카드에 맞춰 작성했으며 원래 언어모델이나 DD+AR를 실행한 결과가 아니다.'
 },content:{article:{
  question:'이미 있는 점으로는 추론이 막힐 때,\n어떤 점을 더 만들어야 증명이 이어질까?',
  opening:[
   '등변삼각형의 두 밑각이 같음을 보이려 한다. 변AB와AC가 같다는 사실은 있지만, 현재 규칙이 비교할 두 작은 삼각형은 아직 없다. 밑변BC의 중점D를 만들고AD를 잇는 순간, BD=DC와 같은 선분AD가 생긴다. 이제 두 삼각형의 세 변을 비교하고 대응각을 얻는 길이 열린다.',
   'AlphaGeometry는 이렇게 새로운 대상을 만드는 일과, 알려진 관계에서 결론을 도출하는 일을 연결했다. 기호 추론 엔진은 가진 점과 관계에서 규칙·대수 계산으로 결론을 늘린다. 더 진행하지 못하면 언어모델이 새 점의 보조 구성을 제안한다. 그 구성이 주는 사실을 더한 뒤 기호 엔진이 다시 추론한다. 제안 자체를 증명으로 받아들이는 구조가 아니다.',
   '보조 구성을 배울 자료도 기호 추론으로 만들었다. 무작위로 구성한 전제에서 어떤 결론이 따라오는지 계산하고, 그 결론에 실제로 필요한 전제와 보조점을 추적한다. 언어모델은 이렇게 만든 문제·증명에서 유용한 새 구성을 배운다. 인간이 쓴 증명 시범에 의존하지 않는다는 말은 언어와 기하 규칙, 엔진까지 사람이 설계하지 않았다는 뜻은 아니다.'
  ],visual:{id:'alphageometry-auxiliary-proof',navLabel:'보조 구성에서 증명으로',title:'중점 하나가 추가한 두 관계를, 합동과 각의 추론에 쓰다',caption:'원논문 Figure1의 등변삼각형 예제를 바탕으로 만든 제한된 기호 추론입니다. 직접 정한 후보와 점수를 비교하고, 보조 구성의 정의·추론의 부모 사실·목표에 이르는 경로를 실제 계산합니다.',
   stages:[{id:'premise',label:'1 · 현재 전제의 한계',text:'비퇴화 삼각형과AB=AC에서 출발한다. 이 카드의 제한된 규칙만으로는 새 보조점이 생기지 않는다.'},{id:'propose',label:'2 · 새 보조 관계 제안',text:'어디에D를 만들지 비교한다. 후보 점수는 직접 정한 순서이며, 실제로 목표를 도출하는지는 기호 추론으로 검사한다.'},{id:'deduce',label:'3 · 근거를 이어 증명',text:'중점의 두 관계, 세 변의 합동, 같은 반직선의 각 치환을 잇는다. 필요한 전제나 규칙을 빼면 이번 증명 경로가 끊긴다.'}],
   initial:{caseId:'isosceles',halfBase:2,height:2.4,construction:'none',useEqualSides:true,enabledRules:['interiorABD','interiorACD','reflexiveAD','rayBDC','rayCDB','sss','replace']},
   originalImage:{src:'alphageometry-2024-midpoint.png',title:'원논문 Figure1d · 중점D와 파란 보조선AD',alt:'AlphaGeometry2024 Figure1d의 삼각형 도식. 꼭짓점A와 밑변B·C에 새 중점D가 파란색으로 표시되고AD가 파란 보조선으로 그려져 있다.',caption:'논문Figure1d의 해결 도식에서 삼각형·점 이름·파란 보조선 부분만 발췌했다. 연구팀이 공개한Figure1 원본SVG를 동일하게 렌더링한 뒤 이 영역을 잘랐으며, 원문 도형 자체에는 표시를 덧붙이지 않았다. 전체Figure1은 언어모델의 보조 구성과 기호 엔진의 추론이 번갈아 이어지는 구조를 보여 준다.',credit:'Trieu H. Trinh 등5명, Nature625, 2024, Figure1d의 기하 도식 발췌. 원본: 연구팀공식GitHub fig1.svg. 논문은 CC-BY4.0이며 출처·라이선스를 표시한다. 변경: 삼각형 도식 영역만 잘라 설명을 밖에 붙였다. https://creativecommons.org/licenses/by/4.0/',source:{title:'AlphaGeometry 공식 저장소 · Figure1 원본SVG',url:repo+'/blob/main/fig1.svg'}},
   source:source('Figure1 · 신경 제안과 기호 추론의 순환'),scope:'정해진A·B·C·D 이름과7개 기호 규칙만 다룬다. 원래 DD+AR의 기하 규칙 전체·대수 추론·언어모델·합성 자료 학습을 실행하지 않는다. 좌표는 그림과 별도 수치 검산에만 쓰고 목표를 증명하는 근거로 쓰지 않는다. 후보 검색은 직접 정한4점수의 한 라운드 비교다. 현재 경로로 목표를 찾지 못한 결과는 목표의 거짓이나 모든 증명 방법의 실패를 뜻하지 않는다.'
  },takeaway:{title:'새 대상을 만드는 제안과, 그 뒤의 추론을 서로 다른 역할로 연결했다',text:'AlphaGeometry의 언어모델은 막힌 증명에 보조 구성을 제안한다. 기호 엔진은 그 구성이 제공한 관계에서 다음 결론을 도출하고 근거를 남긴다. 무엇을 더 그렸는지뿐 아니라 그 제안이 어느 추론에 쓰였는지를 따라가면 두 역할의 연결이 보인다.'},
  technical:{title:'원논문의 신경·기호 분담과 이 작은 증명 시스템',paragraphs:[
   '판본 확인: 논문은 Nature625:476–482, DOI10.1038/s41586-023-06747-5, 2024다. Nature와PMC의 전체 본문·Methods, EuropePMC가 제공한 동일 논문의JATS XML을 확인했다. 출판사·PMC의 PDF다운로드가 확인용HTML을 반환해 이를 원문PDF로 저장하거나 인용하지 않았다. 그림은 연구팀공식저장소의fig1.svg를 보존해 사용했다.2024년2월23일 AuthorCorrection은 감사의P.Pak를P.Bak로 고친다.',
   '무엇을 배웠나: 원문은 합성한 기하 문제와 증명 전체로 언어모델을 사전학습하고, 보조 구성 생성에 초점을 맞춰 미세조정한다. 목표 정리의 인간 해법 시범이 없어도 보조 구성의 유형과 쓰임을 학습하려는 방법이다. 기하 언어·구성 동작·추론 규칙·대수 엔진은 사람이 정한 기반이다.',
   '합성 문제에서 보조점을 드러내기: 무작위로 일관된 구성을 만들고 기호 엔진으로 deduction closure를 얻는다. 결론에서 필요한 전제와 추론을 역추적하며, 원래 전제와 결론의 의존 대상 사이 차이를 보조 구성으로 분리한다. 증명에서 필요하지 않은 보조점을 줄이는 절차도 쓴다. 이 카드가 그 대규모 생성·pruning과 학습을 재현한 것은 아니다.',
   '추론 엔진이 담당하는 일: Methods의 DD는 기하 관계에서 규칙 기반으로 사실을 늘리고, AR은 각·비·거리의 선형 대수적 관계를 다룬다. 두 결과를 번갈아 공급해 공동closure를 확장한다. 언어모델은 새 보조 구성이라는 무한한 후보 공간을 안내하고, 이후의 deduction은 전용 기호 엔진이 맡는다. 원문 시스템을 일반언어의 무제한 수학 정리증명기로 설명하지 않는다.',
   '이 카드의 제한된 규칙: 비퇴화 삼각형ABC와 D의 엄격한 밑변 내부 조건에서 작은 두 삼각형의 비퇴화를 얻는다. AB=AC, BD=DC, AD=AD에서 SSS합동의 대응각∠ABD=∠ACD를 얻는다. D가 B와 C 사이에 있으므로 B에서 BD와 BC, C에서 CD와 CB가 같은 반직선이라는 사실을 쓰면 목표∠ABC=∠ACB로 바꿀 수 있다. 각 단계는 사용한 부모 사실과 규칙ID를 남긴다.',
   '중점이 제공하는 관계: 비퇴화 삼각형의 BC에는 유일한 중점D가 있다. 중점이라는 구성을 선택하면 D가 BC의 내부에 있고 BD=DC라는 정의적 관계를 함께 얻는다. 목표 각의 동등성은 이 관계들에서 추론한다. D를 B와 겹치게 하는 후보는 이 보기의 새 내부점 구성으로 거절한다.',
   '후보의 실패가 드러내는 조건: 밑변 위의1/3점은 위치 관계만, 수직이등분선 위의 밑변 밖 점은 같은 거리 관계만 이 작은 규칙 체계에 제공한다. 중점은 둘을 함께 준다. 현재 규칙에서 목표를 도출하지 못하더라도 다른 보조 구성·다른 정리로 증명할 가능성을 부정하지 않는다. 그림을 등변으로 유지한 채 AB=AC 전제만 제외하는 비교도 그 사실이 거짓이라는 주장은 아니다.',
   '점수와 검증의 차이: 이 보기의 한 라운드 검색은 후보4개를 직접 정한 점수 순으로 최대1·2·4개 살핀다. 높은 점수의 밑변 위 점이 실패한 뒤 중점이 성공할 수 있다. 이 점수는 원래 언어모델의 출력이나 성공 확률이 아니다. 원문의 언어모델 beam decoding과 다단계 증명 상태 검색을 구현하지 않는다.',
   '좌표 그림과 논리 근거: 기본 그림은 B=(−b,0), C=(b,0), A=(0,h)로 두고 b,h를 양수로 정한다. 등변이 아닌 비교에서는 A의 가로 위치를 옮긴다. 좌표로 길이와 각을 별도 검산할 수 있지만 기호 목표는7개 규칙의 도출 기록으로만 판단한다. 그림이 등변처럼 보이거나 수치 각도가 가깝다는 이유로 목표 사실을 추가하지 않는다.',
   '문제 표현과 평가 범위: 원문은 유클리드 평면의 고전 기하를 다루며 기하 부등식·조합 기하를 제외한다. 전용 환경으로 옮긴 문제와 자연어IMO 전체를 같게 취급하지 않는다. Figure1의 중점 예제는 실제 올림피아드 벤치마크의 성능 수치를 재현하는 실험이 아니다. 후속 AlphaGeometry2의 추론 언어·검색·모델 변화를2024모델에 소급하지 않는다.'
  ],formula:'주어진 전제\n비퇴화 삼각형ABC · AB=AC\n\n구성: D=midpoint(B,C)\n→ D는BC내부 · BD=DC\n\nAB=AC · BD=DC · AD=AD\n+ 두 작은 삼각형의 비퇴화\n→ SSS합동 → ∠ABD=∠ACD\n\nB에서 D·C가 같은 반직선\nC에서 D·B가 같은 반직선\n→ ∠ABC=∠ACB\n\n제안의 점수 ≠ 증명\n그림의 좌표 검산 ≠ 기호 도출의 근거'}
 },keyIdeas:[{title:'새 대상을 만드는 선택을 배운다',text:'현재 기호로 더 추론하기 어려울 때 언어모델이 새 점의 보조 구성을 제안한다.'},{title:'추론은 관계와 규칙으로 이어 간다',text:'구성이 제공한 정의적 사실에서 기호 엔진이 결론을 도출하고 부모 근거를 남긴다.'},{title:'합성 증명이 배움의 재료가 된다',text:'무작위 구성과 기호 도출의 의존 관계를 추적해 문제·해법·보조 구성의 학습 자료를 만든다.'}],videos:[],references:[
  {title:'Trinh 등5명 · Nature2024 원문',url:paper,location:'Nature625:476–482,2024. Figure1과본문·Methods전체를Nature/PMC 및EuropePMC동일논문XML로확인.'},
  {title:'PMC · 원문전체와Figure1 설명',url:archive,location:'PMCID PMC10794143,PMID38233616. 전체본문·Methods·그림설명. Figure1의단순예제와보조구성→기호추론의역할.'},
  {title:'EuropePMC · 동일논문의전체XML',url:'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10794143/fullTextXML',location:'공식공개JATS XML로보존. 논문표제·DOI·본문·Methods·Figure1·라이선스대조. PDF와구분.'},
  {title:'AlphaGeometry · Figure1 원본',url:repo+'/blob/main/fig1.svg',location:'연구팀공식SVG. Figure1d 삼각형의영역만렌더링·발췌. 원래언어모델과기호엔진의실행결과를이카드에서재실행한것은아님.'},
  {title:'AlphaGeometry · 공식구현',url:repo,location:'DD+AR와보조구성beam검색의공식경로. 본카드의7규칙구현과원체계구현을구분.'},
  {title:'Author Correction ·2024-02-23',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10954538/',location:'감사의성명P.Pak→P.Bak수정. 원논문의방법을새로제시한정정으로해석하지않는다.'}
 ]}});
})();

