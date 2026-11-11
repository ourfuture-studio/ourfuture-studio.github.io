/* Refine only the existing work's summary, caveat and content after catalog-setup. */
(function(){'use strict';
const p=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="palmer-luckey");
const w=p?.works.find(w=>w.id==="luckey-oculus-2012");if(!w)throw new Error('Existing industry work required.');
Object.assign(w,{
  "summary": "Oculus의 출발은 넓은 시야·빠른 머리 추적·착용감·접근 가능한 비용을 묶어 가상 세계를 실제처럼 경험할 장치를 만들려는 시도였다. 사람의 움직임과 표시 영상의 연결,시제품에서 개발 플랫폼으로 이어지는 조건을 본다.",
  "caveat": "2012 출발은 Luckey가2022년에 재게시한 당시 소개문과2014 개발자 발표로 읽었다.2015 SDK와2026 compositor 문서는 이후 개발의 설명이며2012에 모두 구현됐다고 소급하지 않는다. 아래 ms와 회전각은 직접 가정한 직렬 모델이며 기기·사람의 반응이나 멀미를 측정하지 않는다.",
  "content": {
    "article": {
      "question": "고개를 돌렸을 때 보이는 세계도,\n어떻게 그 움직임과 함께 바뀌게 할까?",
      "opening": [
        "머리에 화면을 쓰는 것과 그 안의 공간에 있는 듯 느끼는 것은 다르다. 고개를 돌리면 시선의 방향이 달라지고,표시할 장면도 그 움직임에 맞게 바뀌어야 한다. Oculus의 출발은 컴퓨터가 만든 세계를 사람의 시야·움직임·착용 경험과 연결하려는 장치 개발의 문제였다.",
        "Luckey는2022년 회고에서2012-04-15의 Oculus 소개문을 다시 실었다. 당시 글은 넓은 시야,낮은 지연의 추적,가벼운 무게와 오래 쓸 편안함,접근 가능한 비용을 함께 목표로 놓았다. 좋은 화면 하나보다 여러 조건의 조합으로 체험을 만들려 했다는 점이 드러난다.",
        "개발자는 사람의 지각도 고려해야 했다. Forsyth의2014 발표는 머리 움직임과 눈의 보상 반응,렌더링의 크기와 화면의 안정성을 함께 다룬다. 장면이 정지해 있다는 느낌을 유지하려면 기기의 좌표·렌즈·표시와 사람의 움직임이 서로 맞아야 하기 때문이다.",
        "같은 발표의 DK2 설명은 화면·렌즈·렌즈 왜곡 보정·자세와 위치 추적·융합과 예측을 한 장치의 구성으로 놓았다. 센서가 움직임을 읽고,소프트웨어가 그 상태로 장면을 계산하고,렌즈를 통해 보일 영상을 표시하는 연결이다. 각 단계의 지연과 오차가 함께 체험에 닿는다.",
        "하드웨어 시제품을 다른 사람이 쓸 플랫폼으로 만드는 일도 필요했다.2015년 공식 SDK 안내는 최종 하드웨어와 SDK·runtime을 출시 앱 개발자에게 제공하는 단계,기존 DK2와 SDK의 개발 용도를 구분했다. 제품의 발전에는 장치뿐 아니라 콘텐츠와 개발 도구를 맞추는 과정이 포함된다.",
        "아래의 세 그림은 사람의 움직임,그 움직임을 영상으로 잇는 경로,서로 다른 시점의 개발 기록을 연결한다. 작은 계산에서는 직접 정한 단계 지연을 더하고 일정한 회전 속도에서 그 시간 동안의 각도를 구한다. 실제 기기의 지연이나 편안함을 재현하는 값은 아니다."
      ],
      "visual": {
        "id": "detail-luckey-oculus-2012",
        "navLabel": "지각·반응·개발",
        "title": "눈앞의 화면을,몸이 움직이는 세계의 경험으로",
        "caption": "Luckey가 재게시한2012소개문,Tom Forsyth의 GDC2014 개발 발표(PDF3·22·24쪽),현재 Meta compositor 문서를 참고해 직접 그렸습니다. 사람의 반응은 맥락이고,회로 전체를 복제한 신경 모형은 아닙니다. 서로 다른 시점의 장치를 같은 버전으로 합치지 않았습니다."
      },
      "takeaway": {
        "title": "가상 세계의 경험은 화면·움직임·렌즈·개발 도구를 함께 맞출 때 생긴다",
        "text": "Oculus는 시각 경험의 여러 조건을 하나의 장치와 개발 플랫폼으로 연결하려 했다. 이 카드는 VR 제품 개발의 기록이며 새 AI 학습 이론이나 Luckey의 단독 기술 발명으로 제시하지 않는다."
      },
      "technical": {
        "title": "머리·눈의 움직임,지연,개발 버전의 관계를 더 읽기",
        "paragraphs": [
          "2022 회고는2012 소개문을 재게시한 창업자의1차 개인 기록이다. 사업의 시작과 법인 서류가 돌아온 시점을 같은 날로 합치지 않고,초기 목표와 후대의 회고라는 문서 성격을 표시했다. 후원액·기업 가치나 창업자의 후대 주장은 이 카드의 기술 근거로 사용하지 않았다.",
          "GDC Europe2014의 Tom Forsyth 발표는 DK2의 화면·렌즈·왜곡 보정·센서·소프트웨어 융합과 예측을 설명한다. 첫해 시제품이 모두 이 구성을 갖췄다는 의미는 아니다. 장치의 각 부품이 무엇을 연결해야 했는지 읽기 위해 후속 개발 자료를 썼다.",
          "같은 발표의 VOR 도판은 귀의 반고리관,눈과 근육,반사 경로를 보여 주고 머리 움직임과 눈의 보상 관계를 설명한다. 아래 그림은 이 발표가 강조한 몸과 장면의 일치라는 질문을 단순한 역할로 재구성했다. 생리학 회로의 상세 재현이나 Oculus가 사람의 뇌를 학습시킨다는 주장은 하지 않는다.",
          "현재 Meta compositor 문서는 앱이 제출한 프레임과 실제 표시 사이에서 time warp·렌즈 보정·레이어 합성을 수행한다고 설명한다. 이 기능을2012 구현으로 소급하지 않고,움직임과 영상 사이의 지연을 후대에 어떻게 다루는지 연결해 볼 자료로 둔다.",
          "그 문서의 time warp는 더 늦게 얻은 머리 방향 추정으로 이미 그린 프레임을 조정한다. 장면 전체를 다시 렌더링하는 것과 다르며,기본 회전 보정만으로 머리 이동에 따른 시차를 모두 고치는 것도 아니다. Positional time warp는 깊이 정보를 사용하는 별도 설명이다.",
          "공식 PC SDK HUD는 추적 정보를 읽은 시점에서 화면의 중간 주사선이 빛나는 시점까지의 지연과 TimeWarp 관련 지연의 기준을 따로 정의한다. 따라서 ms를 비교할 때 시작·끝 지점과 기기·앱·SDK 조건을 먼저 맞춰야 한다. 이 카드의 자체합계를 해당 HUD의 측정값이라고 부르지 않는다.",
          "2015-12-21 SDK1.0 안내는 소비자 제품에 맞춘 기능과 출시 앱의 준비 조건을 적고,기존 개발에는 DK2/SDK0.8을 구분해 제시했다.2015-06의 소비자 제품 발표 또한2016년1분기 제공 예정이었다. 발표·개발자 제공·소비자 배송을 한 사건으로 뭉치지 않는다.",
          "작은 계산은 감지·앱 처리·렌더링·표시 대기의 ms를 직렬로 더한다. 일정 회전90°/s를 가정하면20ms 동안90×20/1000=1.8° 움직인다. 실제 시스템의 예측·겹친 처리·reprojection·추적 오차·화면 주사·사람의 반응은 이 단순 모델에 포함하지 않았으므로 각도를 실제 표시 오차나 안전한 지연 기준으로 해석하지 않는다."
        ]
      },
      "referencesLabel": "공식 원문과 확인한 위치",
      "evidenceLabel": "개발의 조건과 근거 더 읽기"
    },
    "keyIdeas": [
      {
        "title": "움직임과 보이는 장면을 맞춘다",
        "text": "머리의 방향·위치가 바뀔 때 어느 장면을 보여 줄지 연결한다."
      },
      {
        "title": "지연은 여러 단계에서 생긴다",
        "text": "추적·앱 처리·렌더링·표시의 시간을 나누어 전체 경로를 본다."
      },
      {
        "title": "렌즈와 영상도 함께 설계한다",
        "text": "렌즈를 거쳐 보이는 장면에 맞추어 영상의 왜곡을 보정한다."
      },
      {
        "title": "장치와 개발 플랫폼을 연결한다",
        "text": "SDK·runtime·콘텐츠 개발 조건이 맞아야 다른 개발자가 경험을 만들 수 있다."
      },
      {
        "title": "초기의 목표와 후대의 방법을 구분한다",
        "text": "2012의 목표,2014DK2,2015SDK,현재compositor 설명을 시점별로 읽는다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "Palmer Luckey · 10 Years of Oculus",
        "url": "https://palmerluckey.com/10-years-of-oculus/",
        "location": "2022-04-15/16 회고가 재게시한2012-04-15 About문:넓은시야/낮은추적지연/가벼움/착용감/비용 목표. 개인회고와 당시문장구분."
      },
      {
        "title": "Tom Forsyth · GDC Europe2014 / DK2",
        "url": "https://media.gdcvault.com/gdceurope2014/Presentations/830373_Tom_Forsyth.pdf#page=3",
        "location": "2014-08 Developing VR Experiences with Oculus Rift,PDF3 The Rift Technology. 화면·렌즈·왜곡보정·추적·융합/예측. 원문도판 실제확인."
      },
      {
        "title": "GDC2014 · 머리와 눈의 관계",
        "url": "https://media.gdcvault.com/gdceurope2014/Presentations/830373_Tom_Forsyth.pdf#page=22",
        "location": "PDF22 Vestibulo-Optical Reflex 도판,PDF23–25 fixation/VORgain. 귀·눈·반사경로와 머리/눈의관계를 개발 조건으로 제시. 그림 직접확인;생리학성능새주장X."
      },
      {
        "title": "Meta · The compositor",
        "url": "https://developers.meta.com/vr/essentials/the-compositor/",
        "location": "Updated2026-08-28:세역할·Time warp·Positionaltimewarp·Lenscorrection.2026-11-11본문확인.2012기능으로소급하지않음."
      },
      {
        "title": "Meta PC SDK · Performance HUD",
        "url": "https://developers.meta.com/vr/documentation/native/pc/dg-hud/",
        "location": "Performance Summary/Latency Timing:AppMotion-to-Photon·AppTrackingtoMid-Photon·TimeWarptoMid-Photon 정의. 측정시작/끝점구분. CDN이미지fetch실패라직접이미지확인주장X."
      },
      {
        "title": "Oculus Team · SDK1.0 개발자 제공",
        "url": "https://developers.meta.com/vr/blog/rift-sdk-1-0-shipping-to-developers-with-final-rift-hardware/",
        "location": "2015-12-21 본문:출시앱을 위한 최종hardware/SDK/runtime,DK2/SDK0.8의 다른 개발용도. 당시 개발 제공 범위."
      },
      {
        "title": "Meta 공식 기록 · Introducing Oculus Rift",
        "url": "https://about.fb.com/news/2015/06/introducing-the-oculus-rift/",
        "location": "2015-06-11 본문:소비자Rift를2016Q1에 제공할 예정으로 발표. 발표와 실제배송구분."
      }
    ]
  }
});
})();
