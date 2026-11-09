/* The dated2024 report's disclosed representation, not later Sora products or an invented implementation. */
(function(){
  'use strict';const report='https://openai.com/index/video-generation-models-as-world-simulators/',at=(fragment,title)=>({title:'OpenAI (2024-02-15) · '+title,url:report+'#'+fragment});
  window.AtlasEntries.register({id:'sora',record:{title:'영상의 길이와 화면비가 달라도, 같은 시공간 패치로',subtitle:'Sora · Video generation models as world simulators',dateLabel:'2024-02-15 · 최초 공식 기술보고',people:['Tim Brooks','Bill Peebles','Connor Holmes','Will DePue','Yufei Guo','Li Jing','David Schnurr','Joe Taylor','Troy Luhman','Eric Luhman','Clarence Ng','Ricky Wang','Aditya Ramesh'],authorNote:'공식 보고서의 Authors에 실린 13명을 보존한다. 이 카드는 2024-02-15 보고서가 공개한 표현 방식·정성 평가·한계에 관한 기록이다. 이후 Sora 제품·버전·사용 조건을 이 당시 보고서에 섞지 않는다.',summary:'시간과 공간을 압축한 영상·이미지의 잠재 표현을 시공간 패치로 나누어, 다양한 길이·해상도·화면비를 같은 처리 단위로 묶었다. 텍스트 조건 확산 Transformer를 크게 학습해 영상의 변화와 일관성을 표현하려 했다.',detail:'',question:'',related:['dit','transformer','visual-genome'],sources:[{title:'OpenAI · 2024-02-15 공식 기술보고',url:report}],caveat:'보고서는 세부 모형·구현을 공개하지 않았고 정성적인 능력과 실패 사례를 제시했다. 아래는 직접 정한 잠재 상자의 패치 배치·복원·출발 잡음만 계산하며 실제 Sora 영상 생성이나 물리 이해를 재현하지 않는다.'},content:{article:{
    question:'한 장의 이미지, 가로 영상, 세로 영상을\n크기를 잘라 맞추지 않고 같은 방식으로 배울 수 있을까?',
    opening:[
      '영상에는 공간뿐 아니라 시간이 있다. 가로·세로 화면비도 다르고, 한 장으로 끝나는 이미지부터 긴 영상까지 길이도 다르다. 모든 자료를 짧고 작은 정사각형으로 잘라 맞추면, 원래 장면의 구도와 시간 범위를 잃을 수 있다. 2024년 Sora 보고서는 이런 다양한 시각 자료를 하나의 표현 단위로 다루는 방법을 중심으로 설명했다.',
      '언어모형이 여러 언어와 코드의 문장을 토큰열로 다루듯, Sora는 압축된 영상·이미지를 시공간 패치로 다뤘다. 먼저 시간·공간을 함께 압축한 잠재 표현을 만들고 작은 블록으로 나눈다. 블록은 Transformer의 토큰이 되고, 영상의 길이와 화면비는 토큰이 놓일 시공간 격자에 남는다.',
      '모형은 텍스트 같은 조건과 잡음이 섞인 패치에서 깨끗한 패치를 예측하도록 학습한다. 보고서는 이 확산 Transformer를 크게 학습했을 때 영상의 일관성이 나타나는 사례와 한계를 함께 제시했다. 아래에서는 공개된 핵심인 표현과 배치에 집중해, 한 장과 여러 시간 칸의 상자가 같은 토큰 규칙으로 바뀌는 모습을 살핀다.'
    ],visual:{id:'spacetime-patch-layout',navLabel:'시간까지 포함한 패치',title:'자료의 모양은 보존하고, 처리할 단위는 시공간 패치로 맞추다',caption:'2024년 공식 보고서의 Video compression network·Spacetime latent patches 설명에 따라 재구성한 보기입니다. 실제 Sora의 압축률·패치 크기·세부 구현은 미공개이므로, 아래 배열과 가장자리 규칙은 별도로 정했습니다.',stages:[
      {id:'volume',label:'시간·공간을 한 상자로',text:'이미 압축된 잠재 배열을 시간×높이×너비로 본다. 한 장과 가로·세로 영상의 모양을 바꾸며 대응 관계를 살핀다.'},
      {id:'patches',label:'작은 블록을 토큰으로',text:'같은 크기의 시공간 블록으로 잘라 값·좌표·유효 마스크를 보존한다. 한 토큰이 어느 시간과 공간의 칸들을 담는지 선택해 본다.'},
      {id:'generation',label:'만들 크기도 배치에',text:'선택한 잠재 모양에 출발 잡음을 놓고 토큰 수를 비교한다. 그 뒤의 확산 예측·디코딩은 공식 보고서의 흐름으로 연결해 읽는다.'}
    ],example:{presets:[
      {id:'image',label:'한 장 · 잠재 1×4×4',shape:[1,4,4],explanation:'시간 길이가 한 칸인 이미지를 가정합니다. 보고서는 이미지를 한 프레임인 영상으로도 다룰 수 있다고 설명합니다. 이 작은 잠재 크기는 직접 정한 값입니다.'},
      {id:'wide',label:'가로 영상 · 잠재 4×2×6',shape:[4,2,6],explanation:'네 시간 칸의 가로 잠재 배열입니다. 다음 세로 배열과 전체 칸 수가 같아도 높이·너비의 배치는 다릅니다. 같은 패치 단위로 서로 다른 모양을 표현합니다.'},
      {id:'portrait',label:'세로 영상 · 잠재 4×6×2',shape:[4,6,2],explanation:'네 시간 칸의 세로 잠재 배열입니다. 가로 영상을 정사각형으로 잘라낸 것이 아니라, 원래 다른 모양의 배열을 같은 규칙으로 토큰화합니다.'},
      {id:'edge',label:'가장자리 확인 · 잠재 3×3×5',shape:[3,3,5],explanation:'패치 크기로 나누어떨어지지 않는 모양입니다. 이 보기는 가장자리를 0으로 채우고 마스크로 구분합니다. 이 처리법은 보고서가 공개한 Sora 구현이 아니라 별도의 명시적 계산 규칙입니다.'}
    ],initialPreset:'wide',patchShapes:[{id:'spatial',label:'1×2×2 · 한 시간의 공간 조각',shape:[1,2,2]},{id:'spacetime',label:'2×2×2 · 시간도 묶은 블록',shape:[2,2,2]},{id:'cells',label:'1×1×1 · 각 칸을 한 토큰으로',shape:[1,1,1]}],initialPatch:'spacetime',seeds:[17,42,2024],initialSeed:17,scope:'최대 6×6×6의 한 채널 잠재 배열을 직접 정한다. 시간→행→열 순서로 토큰을 만들고, 가장자리는0과 유효 마스크로 표현한다. 좌표·순서·마스크를 검증해 원래 배열을 정확히 복원한다. 출발 잡음은 고정된 32비트 난수와 Box–Muller 식으로 재현 가능한 가우시안 값을 만든다. 이 난수 생성기·패치 크기·패딩·토큰 순서는 Sora의 실제 세부 구현이 아니다.'},source:at('spacetime-latent-patches','시공간 패치와 가변 크기'),scope:'실행한 것은 배열 배치·가역적 토큰화·잡음 배치뿐이다. 학습한 영상 압축망·텍스트 조건망·확산 Transformer·깨끗한 패치 예측·디코더를 실행하지 않는다. 보고서의 세부 구현 미공개를 임의의 모델 크기·압축률·정량 성능으로 채우지 않는다.'},
    takeaway:{title:'시간과 화면비가 다른 자료를, 같은 학습 단위로 다룰 길을 만들었다',text:'잠재 시공간 패치는 이미지와 영상을 통일된 토큰 단위로 표현하면서 각 자료의 모양과 길이를 담는다. Sora 보고서는 이 표현과 확산 Transformer의 대규모 학습이 영상 생성에 유용할 수 있음을 보여 주려 했다. 장면이 그럴듯하게 이어지는 현상과 물리·인과를 정확히 이해한다는 검증은 구분해야 한다.'},
    technical:{title:'2024년 보고서의 공개 범위와 배열 계산을 더 읽기',paragraphs:[
      '출처와 시점: 이 카드는 2024-02-15 공식 기술보고 Video generation models as world simulators를 직접 확인했다. 보고서는 표현 방식과 정성 평가에 초점을 두며 모형·구현 세부는 포함하지 않는다고 명시한다. 이후 제품의 기능·이용 조건·영상 길이나 최신 모형을 이 역사 카드의 사실로 넣지 않는다.',
      '연구 문제: Turning visual data into patches는 언어모형의 토큰이 다양한 텍스트를 통일해 다루는 발상에서 영감을 받았다고 설명한다. 시각 패치에는 선행연구가 있으며 패치 자체의 최초 발명으로 적지 않는다. 연구의 초점은 서로 다른 시간·공간 크기의 시각 자료를 대규모 생성 학습에 넣을 표현으로 묶는 것이다.',
      '압축과 패치: Video compression network는 원본 영상을 시간과 공간 모두에서 압축한 잠재 표현을 만들고 대응 디코더로 다시 픽셀 공간에 보낸다고 설명한다. Spacetime latent patches는 그 압축된 표현을 토큰으로 바꾼다. 화면은 이미 압축된 상자에서 시작하므로 각 시간 칸을 실제 원본 프레임 수와 동일시하지 않는다.',
      '가변 크기: 보고서는 한 프레임인 이미지도 같은 방식으로 다루고, 시간·해상도·화면비가 다른 자료를 학습한다고 설명한다. 추론 시 무작위 패치의 격자 크기를 정해 생성 크기를 조절한다고 적는다. 같은 수의 토큰이라도 어떤 시간·행·열 좌표로 놓이는지는 보존해야 한다.',
      '토큰 수의 별도 규칙: 이 보기에서는 N=ceil(T/pT)·ceil(H/pH)·ceil(W/pW)로 패치 수를 센다. 나누어떨어지지 않으면 가장자리에0을 채우고 유효 마스크를 저장한다. 보고서에 이 ceil·패딩·마스크 구현이 공개된 것은 아니다. 실제 값0과 채운0을 구분하고 원래 크기로 되돌릴 수 있는 별도의 가역 배열 규칙이다.',
      '순서와 복원: 패치 격자는 시간→행→열, 패치 안의 칸도 시간→행→열 순서로 펼친다. 각 토큰의 격자 좌표·시작 좌표·유효 마스크를 함께 저장한다. 복원 시 그 정보와 모양이 일치하는지 확인하고 유효 칸만 원래 배열에 넣는다. 단순히 숫자열만 잇고 시공간 위치를 잃어버린 표현과 구분한다.',
      '출발 잡음: 보고서의 생성은 적절한 크기의 무작위 패치에서 시작한다. 이 보기는 재현 가능한 가우시안 배열을 만들고 같은 시공간 크기에 놓기까지만 계산한다. 잡음에서 깨끗한 패치를 예측하는 내부 수식이나 스케줄은 공개되지 않았으므로, DiT의 전체 학습·샘플러를 그대로 Sora 구현이라고 제시하지 않는다.',
      '텍스트와 학습: Scaling transformers for video generation은 잡음 패치와 텍스트 같은 조건에서 깨끗한 패치를 예측하는 확산 Transformer를 설명한다. Language understanding은 영상 재캡셔닝과 짧은 프롬프트를 자세한 설명으로 확장하는 과정을 언급한다. 이 보기에서는 텍스트 인코더·조건 주입·모형 용량을 임의로 구현해 공식 구조로 부르지 않는다.',
      '스케일의 관찰: 보고서는 고정 시드·입력에서 학습 계산을 늘린 표본들을 정성적으로 비교한다. 제시한 영상의 개선을 모든 자료·조건의 정량 벤치마크로 일반화하지 않는다. 이 화면의 배열 복원 정확성과 토큰 수는 영상 품질·학습 스케일링의 재현 결과가 아니다.',
      '시뮬레이터라는 해석: Emerging simulation capabilities는 카메라 이동·가림 뒤 객체 유지·상태 변화 같은 현상을 예시로 제시하지만 항상 성공한다고 적지 않는다. Discussion은 유리 파손이나 음식 섭취 뒤 상태 변화, 긴 영상의 불일치와 객체의 갑작스러운 출현 같은 실패를 설명한다. 제목을 검증된 일반 물리 시뮬레이터의 완성 선언으로 바꾸지 않는다.',
      '인물과 경계: Authors에 제시된 13명을 보존하고 기관의 모든 기여자나 한 사람의 단독 발명을 뜻하는 목록으로 확대하지 않는다. 원문 영상과 이 보기의 칸 그림을 분리한다. 여기에는 Sora가 생성한 사진·영상 표본이 없으며, 공개되지 않은 성능 수치·학습 자료 규모·구현 값도 만들지 않았다.'
    ],formula:'공식 보고서가 공개한 흐름\n영상·이미지 → 시간·공간 압축 → 시공간 잠재 패치\n텍스트 등의 조건 + 잡음 패치 → 깨끗한 패치 예측\n잠재 표현 → 디코더 → 영상·이미지\n\n이 보기에서 별도로 정한 배열 규칙\nshape = [T,H,W], patch = [pT,pH,pW]\nN = ceil(T/pT) ceil(H/pH) ceil(W/pW)\n패치당 칸 수 = pT·pH·pW\n채운 칸 수 = N·pT·pH·pW − T·H·W\n토큰마다 좌표·값·유효 마스크를 보존한다.\nSora의 실제 패치·패딩 구현이라고 주장하지 않는다.'}
  },keyIdeas:[{title:'이미지와 영상을 시공간 토큰으로 통일한다',text:'시간·공간을 압축한 잠재 패치를 사용해 길이·해상도·화면비가 다른 자료를 같은 처리 단위로 다룬다.'},{title:'모양과 길이를 패치 격자에 남긴다',text:'표현 단위가 같아도 토큰이 놓이는 시간·행·열의 크기는 다르다. 보고서는 그 배치로 추론 시 생성 크기도 조절한다고 설명한다.'},{title:'표현의 확장성과 물리 이해를 구분한다',text:'대규모 영상 학습의 정성 관찰과 실제 물리·인과·상태 변화의 정확한 모델링은 같은 검증이 아니다.'}],videos:[],references:[
    {title:'OpenAI · 공식 2024 기술보고',url:report,location:'2024-02-15. 원문 본문·Authors·Discussion을 직접 확인. 모형·구현 세부 미공개와 정성 평가 범위를 보존한다.'},
    {title:'공식 보고서 · 시각 자료의 토큰화',url:report+'#turning-visual-data-into-patches',location:'Turning visual data into patches / Video compression network. 시간·공간 압축과 잠재 패치의 역할.'},
    {title:'공식 보고서 · 시공간 패치',url:report+'#spacetime-latent-patches',location:'Spacetime latent patches. 이미지=한 프레임의 영상, 가변 크기와 추론 때의 패치 격자 배치.'},
    {title:'공식 보고서 · 확산 Transformer',url:report+'#scaling-transformers-for-video-generation',location:'Scaling transformers for video generation. 텍스트 등 조건과 잡음 패치에서 깨끗한 패치를 예측. 정성 스케일 비교.'},
    {title:'공식 보고서 · 화면비와 텍스트',url:report+'#variable-durations-resolutions-aspect-ratios',location:'Variable durations, resolutions, aspect ratios / Language understanding. 구도·재캡셔닝·프롬프트 확장.'},
    {title:'공식 보고서 · 능력과 실패',url:report+'#discussion',location:'Emerging simulation capabilities / Discussion. 일관성의 예시와 기본 물리·상태 변화의 실패를 함께 읽는다.'}
  ]}});
})();
