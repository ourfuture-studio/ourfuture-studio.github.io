/* WordNet source-data notice (also retained in the portable preview):
WordNet Release 3.0

This software and database is being provided to you, the LICENSEE, by Princeton University under the following license. By obtaining, using and/or copying this software and database, you agree that you have read, understood, and will comply with these terms and conditions.:

Permission to use, copy, modify and distribute this software and database and its documentation for any purpose and without fee or royalty is hereby granted, provided that you agree to comply with the following copyright notice and statements, including the disclaimer, and that the same appear on ALL copies of the software, database and documentation, including modifications that you make for internal use or for distribution.

WordNet 3.0 Copyright 2006 by Princeton University. All rights reserved.

THIS SOFTWARE AND DATABASE IS PROVIDED "AS IS" AND PRINCETON UNIVERSITY MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED. BY WAY OF EXAMPLE, BUT NOT LIMITATION, PRINCETON UNIVERSITY MAKES NO REPRESENTATIONS OR WARRANTIES OF MERCHANT- ABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE LICENSED SOFTWARE, DATABASE OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS, COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS. The name of Princeton University or Princeton may not be used in advertising or publicity pertaining to distribution of the software and/or database. Title to copyright in this software, database and any associated documentation shall at all times remain with Princeton University and LICENSEE agrees to preserve same.

Source: https://wordnet.princeton.edu/license-and-commercial-use

*/
/* The 2009 data resource: concepts, visual experience and human verification.
 * Edit this article independently from visuals/imagenet-experience.js. */
window.AtlasEntries.register({
  id:'imagenet',
  record:{
    title:'기계가 배울 세상의 모습을 모으다',
    summary:'개념의 이름만 가르치는 대신, 그 개념이 실제 세계에서 얼마나 다른 모습으로 나타나는지 모으려 했다. WordNet의 의미 구분, 웹 사진 수집, 사람의 확인을 대규모 시각 자료로 연결했다.',
    detail:'',question:'',
    sources:[{title:'Deng 외 (2009) · ImageNet · 연구실 보관 원문',url:'https://cs.stanford.edu/groups/vision/pdf/ImageNet_CVPR2009.pdf'}],
    caveat:'2009년 데이터 논문의 범위를 다룬다. 화면의 crane 개념 경로와 Commons 사진은 별도로 구성했으며 실제 ImageNet 표본이 아니다. 사람의 포함·제외 선택은 이 화면에만 남는다. Fig.7의 주석 신뢰도는 원문 수치이며, 사진 분류기의 정확도나 이 화면의 선택에서 계산한 값이 아니다.'
  },
  content:{
    article:{
      question:'세상의 사물을 배우게 하려면,\n어떤 경험을 모아 줘야 할까?',
      opening:[
        'LeNet은 작은 영역에서 얻은 시각적 단서를 층으로 결합하고, 연결을 학습해 글자를 구별하려 했다. 그렇다면 글자 바깥의 세상은 어떨까? 같은 새도 날개를 펴거나 접고, 가까이 있거나 멀리 있으며, 다른 물체에 가려지기도 한다. 한 장의 대표 그림만으로는 이런 변화를 충분히 만나기 어렵다.',
        'ImageNet 팀은 기계가 배울 경험의 범위를 넓히는 쪽에서 이 문제에 접근했다. 무엇을 하나의 개념으로 묶을지 정하고, 그 개념이 실제 장면에서 나타나는 여러 모습을 모으려 했다. 여기서 지능을 구현하려는 발상은 인식 방법이 배우고 시험받을 세상을 조직하는 데 있다.',
        '연구팀은 WordNet의 개념 관계를 뼈대로 삼아 웹에서 후보 사진을 모으고, 사람들이 개념의 정의와 사진을 비교하게 했다. 개념의 지도, 다양한 사례, 사람의 확인을 연결한 데이터 구축이다. 아래에서는 같은 영어 단어 crane이 가리키는 두 개념을 따라 이 생각을 살펴본다.'
      ],
      visual:{
        id:'concept-experience',navLabel:'경험을 모으는 방법',
        title:'단어 하나에서, 개념마다 다른 시각적 경험으로',
        caption:'crane은 새일 수도, 물체를 들어 올리는 기계일 수도 있습니다. 뜻을 고르고 여러 모습을 비교한 뒤, 어떤 사진을 그 개념에 포함할지 직접 판단해 보세요.',
        stages:[
          {id:'meaning',label:'의미를 나누다',text:'사진을 묶는 기준은 철자가 아니라 뜻이다. 두루미류와 기중기는 모두 crane으로 불리지만 서로 다른 개념 경로에 속한다. 같은 개념 안에서도 모습과 배경은 달라진다.'},
          {id:'collect',label:'사례를 모으다',text:'검색으로 모은 후보가 모두 해당 개념의 사진은 아니다. 선택한 개념의 정의와 장면을 비교해 포함·제외·보류를 정해 보세요. 개념을 바꾸면 검토 기록도 따로 유지됩니다.'},
          {id:'verify',label:'사람이 확인하다',text:'같은 수의 찬성이라도 개념마다 확인의 어려움은 다르다. 원문 Fig.7의 cat과 Burmese cat을 비교하면, 같은 투표 조건에 다른 주석 신뢰도가 붙는 이유를 살펴볼 수 있다.'}
        ],
        scope:'이 crane 예시는 WordNet 3.0의 실제 개념 관계를 참고해 새로 구성했습니다. 중간 단계를 생략한 곳은 …로 표시하며 대표 경로만 보여 줍니다. 사진은 이용 조건을 확인한 Commons 자료로, 실제 ImageNet 표본이 아닙니다. 계층은 데이터의 의미 관계이며 신경망의 처리 층을 뜻하지 않습니다.',
        source:{title:'Deng 외 (2009) · PDF pp.2, 4–5 · Fig.1, §3, Fig.7 참조',url:'https://cs.stanford.edu/groups/vision/pdf/ImageNet_CVPR2009.pdf#page=2'},
        nodes:[
          {id:'entity',label:'존재 · entity',parentIds:[]},
          {id:'bird-gap',label:'…',parentIds:['entity'],kind:'elision'},
          {id:'bird-parent',label:'새 · bird',parentIds:['bird-gap']},
          {id:'aquatic',label:'물새 · aquatic bird',parentIds:['bird-parent']},
          {id:'wading',label:'섭금류 · wading bird',parentIds:['aquatic']},
          {id:'bird',label:'두루미류 · crane',parentIds:['wading']},
          {id:'artifact-gap',label:'…',parentIds:['entity'],kind:'elision'},
          {id:'artifact',label:'인공물 · artifact',parentIds:['artifact-gap']},
          {id:'instrumentality',label:'도구·설비 · instrumentality',parentIds:['artifact']},
          {id:'device',label:'장치 · device',parentIds:['instrumentality']},
          {id:'lifting',label:'인양 장치 · lifting device',parentIds:['device']},
          {id:'machine',label:'기중기 · crane',parentIds:['lifting']}
        ],
        concepts:[
          {id:'bird',synsetId:'n02012849',label:'두루미류 · crane',definition:'목과 다리가 긴 대형 새를 가리키는 crane의 뜻. 습지나 평원 등에서 볼 수 있다. 날고 있거나 다른 새와 함께 있어도, 대상 개념이 보이는지 판단한다.'},
          {id:'machine',synsetId:'n03126707',label:'기중기 · crane',definition:'회전하는 붐으로 무거운 물체를 들어 올려 옮기는 장치를 가리키는 crane의 뜻. 장면에 다른 물체가 많거나 장치가 멀리 있어도, 해당 대상이 보이는지 판단한다.'}
        ],
        candidates:[
          {id:'crane-ground',file:'imagenet-crane-ground.jpg',title:'물가에 선 두루미류',description:'긴 목과 다리를 가진 새가 물 위에 서 있다.',synsetIds:['n02012849'],credit:{author:'Вых Пыхманн',license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:Common_crane.jpg',changes:'Commons 축소본 사용 · 원본 비율로 표시'}},
          {id:'crane-flight',file:'imagenet-crane-flight.jpg',title:'날개를 편 두루미류',description:'세 마리의 새가 날개를 펴고 하늘을 날고 있다.',synsetIds:['n02012849'],credit:{author:'Prasan Shrestha',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:The_Common_Crane.jpg',changes:'Commons 축소본 사용 · 원본 비율로 표시'}},
          {id:'crane-city',file:'imagenet-crane-city.jpg',title:'도시 풍경 속 기중기',description:'버스와 건물 뒤쪽으로 타워 크레인이 보인다. 대상이 장면의 일부만 차지한다.',synsetIds:['n03126707'],credit:{author:'D0a5l0e6',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:Tower_Crane.jpg',changes:'Commons 축소본 사용 · 원본 비율로 표시'}},
          {id:'crane-mountain',file:'imagenet-crane-mountain.jpg',title:'산악 배경의 기중기',description:'바위와 눈 덮인 산을 배경으로 기중기가 서 있다. 붐과 인양 줄을 볼 수 있다.',synsetIds:['n03126707'],credit:{author:'Kristoferb',license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:Tower_Crane.JPG',changes:'Commons 축소본 사용 · 원본 비율로 표시'}},
          {id:'flamingo',file:'imagenet-flamingo.jpg',title:'플라밍고 무리',description:'긴 목과 다리를 가진 새들이 모여 있다. 비슷한 외형만으로 같은 개념이라고 판단해도 될까?',synsetIds:[],credit:{author:'Kate Bazhenova83',license:'CC0',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:Flamingo_close-up.jpg',changes:'Commons 축소본 사용 · 원본 비율로 표시'}},
          {id:'excavator',file:'imagenet-excavator.jpg',title:'공사 현장의 굴착기',description:'궤도와 굴착용 버킷을 갖춘 장치들이 보인다. 공사 장비라는 공통점과 개념의 정의를 나누어 보자.',synsetIds:[],credit:{author:'Wikideas1',license:'CC0',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:Excavator_5.jpg',changes:'Commons 축소본 사용 · 원본 비율로 표시'}}
        ],
        confidence:{
          title:'같은 찬성 수, 서로 다른 개념의 신뢰도',
          intro:'다음은 원문 Fig.7에 실린 별도의 고양이 예시입니다. 위 crane 사진에서 고른 포함·제외 기록으로 계산한 값이 아닙니다. 찬성만 받은 세 조건을 골라 두 개념을 나란히 봅니다.',
          labels:['cat','Burmese cat'],
          rows:[{yes:1,no:0,values:[.85,.69]},{yes:2,no:0,values:[.97,.83]},{yes:3,no:0,values:[.99,.90]}],
          scope:'수치는 원문에서 개념별로 보정한 주석 신뢰도입니다. 찬성 비율이나 학습된 분류기의 출력 확률이 아닙니다. 원문 전체 표의 일부 행이며, 여기에 없는 조합이나 공통 합격 기준을 추정하지 않습니다.',
          source:{title:'원문 PDF p.5 · §3.2와 Fig.7',url:'https://cs.stanford.edu/groups/vision/pdf/ImageNet_CVPR2009.pdf#page=5'}
        },
        milestones:[
          {year:2009,title:'ImageNet 데이터 논문',detail:'당시 보고한 규모는 12개 하위 트리(범주군), 5,247개 개념, 약 320만 장. 데이터의 개념 구조와 수집·확인 방법을 제시했다.'},
          {year:2010,title:'ILSVRC 챌린지',detail:'일정한 과제로 인식 방법을 비교하는 연례 대회가 시작됐다. 1,000개 범주 분류 설정은 2009년 데이터 전체와 구분한다.'},
          {year:2012,title:'AlexNet 모형',detail:'Krizhevsky·Sutskever·Hinton의 심층 합성곱 신경망 연구. 데이터 자원의 구축과 그 자원에서 학습한 모형의 기여는 각각 읽는다.'}
        ]
      },
      takeaway:{title:'인식 방법이 배울 세상을 설계하다',text:'이미지를 많이 모으는 것에 더해, 무엇이 같은 개념인지 정하고 서로 다른 모습의 사례를 확인해 모았다. 지능을 향한 연구에서 학습 방법과 함께 경험의 구성도 설계 대상이 된 것이다.'},
      technical:{
        title:'원문의 수집·확인 절차와 2009년 범위 더 읽기',
        paragraphs:[
          '기준은 CVPR 2009의 8쪽 원문이다. 이 카드의 쪽수는 PDF 내부 1–8쪽을 따른다. Fig.1(p.2)은 mammal에서 husky, vehicle에서 trimaran으로 가는 두 경로와 개념마다 여러 사진을 보여 준다. 화면의 crane 경로는 그 구성 아이디어를 WordNet 3.0의 다른 실제 개념에 적용한 자체 사례다.',
          '§3.1(p.4)은 동의어와 관련 상위 개념을 검색어에 활용하고 여러 언어의 검색을 추가하는 절차를 설명한다. 검색 결과는 후보 풀이다. 검색어가 일치한다는 사실을 정답 라벨로 삼지 않고, 이후 사람이 대상 개념의 존재를 확인한다.',
          '§3.2(pp.4–5)는 가림이나 여러 물체가 있는 사진도 대상이 보이면 포함할 수 있다고 설명한다. 먼저 일부 사진을 각 10명 이상이 판단해 개념별 신뢰도 표를 보정하고, 나머지 사진에서는 미리 정한 신뢰도에 도달할 때까지 투표를 동적으로 모은다. 모든 사진을 정확히 10명이 보거나, 고정 다수결 하나로 통과시키는 방식으로 설명하면 원문 절차가 달라진다.',
          'Fig.7(p.5)의 cat과 Burmese cat은 같은 투표 수에서도 신뢰도가 다르다. 화면은 세 행의 발표된 값만 옮겼으며 전체 표를 새 공식으로 근사하지 않는다. 원문에 공통 수치의 합격 임계값이 명시되지 않았으므로 임의의 기준선을 넣지 않았다.',
          '약 320만 장·5,247개 개념·12개 하위 트리(범주군)는 2009년 논문 시점이다. 약 5천만 장은 당시 완성 목표였다. 2010년 대회, 2012년 AlexNet, 2015년 TED에서 회고한 확장 규모를 이 시점의 수치로 합치지 않는다.',
          '개념 지도는 사람이 마련한 의미 구조다. 이를 사용해 사진을 조직했다는 사실만으로, 학습된 신경망이 이 관계를 따라 추론하거나 사람과 같은 개념을 이해했다고 결론 내릴 수는 없다. 이 카드에서는 데이터 구축을 인식 연구의 기반으로 다루며 완전한 시각 지능의 구현으로 제시하지 않는다.'
        ]
      }
    },
    keyIdeas:[
      {title:'이름을 맞히기 전에, 이름의 뜻을 나누다',text:'같은 철자가 다른 사물을 가리키면 사진을 한데 모으는 기준부터 흔들린다. WordNet의 synset은 단어 형태와 개념을 구분하는 단위다. crane의 두 뜻을 서로 다른 개념으로 두면 무엇을 확인하고 모을지 분명해진다.'},
      {title:'한 개념을, 한 모습에 가두지 않다',text:'두루미류는 서 있을 때와 날 때 외형이 달라지고 기중기는 다른 물체들 뒤에 작게 보일 수 있다. 이런 변화를 담은 사례를 접하게 하려는 것이 대규모 시각 경험의 발상이다. 특정 배경이나 구도만 되풀이하면 그것이 개념의 본질처럼 보일 수 있다는 문제도 함께 생각해 볼 수 있다.'},
      {title:'검색의 결과를, 사람의 확인과 연결하다',text:'사진을 찾는 일과 사진에 개념을 붙이는 일은 서로 다른 판단을 요구한다. 연구팀은 웹의 큰 후보 풀과 사람의 확인을 연결했다. 이 화면에서 직접 해 보는 판단은 그 차이를 살펴보는 활동이며, 원문의 다인 주석 절차를 재현한 실험은 아니다.'},
      {title:'데이터를 만든 사람들의 기여를 함께 읽다',text:'이 논문은 Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li, Li Fei-Fei의 공동 연구다. 모델의 학습 규칙, 데이터 구축, 같은 조건에서 비교할 과제는 서로 연결되지만 각각 별도의 연구 기여를 가진다.'}
    ],
    videos:[{title:'Fei-Fei Li · How we’re teaching computers to understand pictures',url:'https://www.youtube.com/watch?v=40riCqvRoMs',channel:'TED · 2015',note:'ImageNet과 시각 이해를 돌아보는 저자 강연. 2015년의 회고이며 2009년 논문 당시 규모와 구분한다. 공식 TED의 제목·발표자·시점을 확인했으며 전체 시청·현재 재생은 검사하지 않았다.',sourceUrl:'https://www.ted.com/talks/fei_fei_li_how_we_re_teaching_computers_to_understand_pictures'}],
    references:[
      {title:'Deng 외 (2009) · ImageNet: A Large-Scale Hierarchical Image Database',url:'https://cs.stanford.edu/groups/vision/pdf/ImageNet_CVPR2009.pdf',location:'PDF p.1: 공동저자·당시 규모·구축 목적. p.2 Fig.1: 개념 경로와 여러 시각 사례. p.4 §3.1: 웹 후보 수집. pp.4–5 §3.2와 p.5 Fig.7: 사람의 판단과 개념별 신뢰도 보정. 해당 지면을 렌더링해 대조했다.'},
      {title:'Princeton WordNet · 개념과 의미 관계',url:'https://wordnet.princeton.edu/front',location:'synset·다의어·상하위 관계의 공식 설명. crane의 새/인양 장치 구분은 WordNet 3.0 data.noun의 n02012849·n03126707과 상위 관계를 직접 대조했다. 전체 계층을 복제한 화면은 아니다.'},
      {title:'Princeton WordNet 3.0 · 원자료',url:'https://wordnetcode.princeton.edu/3.0/WordNet-3.0.tar.gz',location:'dict/data.noun의 crane → wading bird → aquatic bird → bird 경로와 crane → lifting device → device → instrumentality → artifact 경로. entity까지의 생략은 …로 표시한다. 노드의 한국어 표기는 이 화면의 설명이다.'},
      {title:'Miller (1995) · WordNet: A Lexical Database for English',url:'https://wordnet.princeton.edu/citing-wordnet',location:'WordNet 공식 사이트의 권장 인용 서지. Communications of the ACM 38(11), 39–41. 개념 자원의 출처를 표시하기 위한 항목이며, 이 카드에서 해당 논문의 전문까지 검토한 것은 아니다.'},
      {title:'WordNet 3.0 · 라이선스',url:'https://wordnet.princeton.edu/license-and-commercial-use',location:'WordNet 3.0 Copyright 2006 by Princeton University. 개념 경로를 구성하는 데 참고한 데이터의 라이선스 전문은 배포본 WORDNET-LICENSE.txt와 이 카드 소스에 보존했다.'},
      {title:'ILSVRC 2010 · 공식 대회 안내',url:'https://image-net.org/challenges/LSVRC/2010/index',location:'2010년 대회와 1,000개 범주 설정의 공식 안내를 검색 색인 본문에서 확인. 직접 페이지 열기는 시간 초과였으며 세부 분할 수나 다운로드 상태를 현재 확인한 것은 아니다.'},
      {title:'Russakovsky 외 · ImageNet Large Scale Visual Recognition Challenge',url:'https://arxiv.org/abs/1409.0575',location:'초록에서 2010년부터 이어진 연례 대회임을 확인. 2009년 데이터 구축과 대회 시점을 나누는 근거. 이 카드에서는 챌린지 논문 전체 실험을 분석하지 않았다.'},
      {title:'Krizhevsky·Sutskever·Hinton (2012) · AlexNet 원문',url:'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',location:'별도 심층 합성곱 모형 논문의 저자·연도·주제를 연결한다. 성능 수치나 세부 구조는 이번 ImageNet 카드에 옮기지 않았다.'},
      {title:'Fei-Fei Li · TED 공식 강연 페이지',url:'https://www.ted.com/talks/fei_fei_li_how_we_re_teaching_computers_to_understand_pictures',location:'2015년 3월 강연의 제목·발표자·소개를 확인했다. 회고 강연을 2009년 시점의 원문과 구분한다. 영상 전체 시청이나 현재 재생 가능 여부는 확인하지 않았다.'}
    ]
  }
});
