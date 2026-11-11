/* Existing person, one additional dated company/research record. */
(function(){
 'use strict';
 const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="chelsea-finn");
 if(!person||person.works.some(w=>w.id==="finn-physical-intelligence-2024"))throw new Error('Existing profile and unapplied adapter required.');
 const work={
  "id": "finn-physical-intelligence-2024",
  "year": 2024,
  "dateLabel": "2024년 π0 공개를 기준으로 · 2017–2026 연구·모델·API 맥락",
  "title": "Physical Intelligence: 빠르게 배우는 모형에서 로봇의 행동과 배포로",
  "summary": "기존 MAML·π0.5 연구 기록을 보존하며 Physical Intelligence의 모델·데이터·로봇 연결과 API 제공 경로를 잇는다. 적응의 시작점, 언어 하위 목표와 연속 행동, 로봇별 실행·평가 조건을 공동 연구와 시점별 원문으로 읽는다.",
  "type": "기업·연구 조직·모델·제공 경로·공식 자료",
  "track": "industry",
  "people": [
    "Chelsea Finn",
    "Sergey Levine"
  ],
  "authorNote": "논문과 회사 자료의 여러 기여·역할을 날짜별로 연결한 기록이다. 전체 저자 목록이나 개인의 단독 발명·모든 시점의 동일한 소속을 뜻하지 않는다.",
  "sources": [
    {
      "title": "Finn·Abbeel·Levine · MAML (2017)",
      "url": "https://proceedings.mlr.press/v70/finn17a/finn17a.pdf",
      "location": "pp.1–3, Fig.1·Algorithm1·§2.2. 적응 후 별도 자료의 손실로 초기화를 학습. 자체 한 변수 제곱 손실은 원논문 실험의 재현이 아님."
    },
    {
      "title": "Physical Intelligence 외 · π0.5 원논문 v1",
      "url": "https://arxiv.org/pdf/2504.16054v1",
      "location": "2025-04-22 · §III–IV, Fig.3, §V·VI, AppendixA–B. 이질 자료 공동 학습·고수준 단계와 연속 행동·평가 조건. Fig.3 PDF p.4를 실제 확인."
    },
    {
      "title": "Physical Intelligence · Pi API beta",
      "url": "https://www.pi.website/blog/api-beta",
      "location": "2026-10-13 · 자료 업로드·미세조정·hosted inference·실패 기반 후속 수집. 공개 beta와 회사가 제시한 제공 경로이며 실제 계정·장치를 연결하지 않음."
    },
    {
      "title": "Physical Intelligence · 공식 openpi 저장소",
      "url": "https://github.com/Physical-Intelligence/openpi",
      "location": "조회 2026-11-11 · 모델·학습·추론 안내와 로봇별 입력·변환·설정. 공개 코드와 hosted API를 구분하며 여기서는 코드를 실행하지 않음."
    }
  ],
  "caveat": "기준 연도 이후의 후속 공개는 날짜를 붙여 구분한다. 회사의 목표·발표와 검증된 연구 결과, 직접 정한 작은 산술과 실제 모형·API·현장 실행을 서로 다른 근거로 읽는다.",
  "content": {
    "article": {
      "question": "새 일을 몇 번의 경험으로 익히게 하려던 연구는\n어떻게 장면·말·몸의 움직임을 함께 다루는 로봇으로 이어졌을까?",
      "opening": [
        "사람은 이전에 배운 것을 바탕으로 새 도구를 익히고, 낯선 물건을 다른 방식으로 집는다. 로봇도 과제가 바뀔 때마다 처음부터 학습해야 할까? 첼시 핀의 연구를 읽는 출발점은 과거의 경험을 새 과제의 빠른 학습으로 연결하는 문제다. 행동의 규칙을 하나씩 더 작성하는 대신, 새 경험이 잘 반영될 표현과 연결값을 배우려 했다.",
        "MAML은 하나의 일을 완성한 모형보다 다시 배우기 좋은 시작점을 찾는다. 여러 과제에서 조금씩 적응해 보고, 적응에 쓰지 않은 자료에서 결과를 확인해 초기 연결값을 조정한다. 새 과제에서는 실제로 연결값을 바꾼다. 문맥에 예시만 넣고 고정된 모형으로 답을 생성하는 방식과는 학습이 일어나는 위치가 다르다.",
        "로봇으로 가면 무엇을 배울지의 표현도 중요해진다. 말로는 ‘방을 정리해’라고 해도, 카메라에 보이는 물체 중 무엇을 집을지, 어디에 놓을지, 관절을 어떻게 움직일지는 서로 다른 수준의 문제다. π0.5 연구는 로봇 시범·웹의 시각과 언어 자료·말로 된 하위 단계 등 이질적인 경험을 함께 학습해 이 수준들을 연결하려 했다.",
        "π0.5의 공식 설명은 우선 언어로 다음 하위 단계를 만들고, 그 단계에 따라 연속적인 행동 묶음을 계산하는 추론을 보여 준다. 언어가 행동을 대신하는 것이 아니라, 장면과 목표를 운동의 조건으로 이어 주는 것이다. 실제 장치에는 로봇별 자료 변환과 제어·관찰의 연결도 필요하다. 정책이 행동을 출력했다는 사실만으로 현장에서 안정적이고 안전하게 작동했다고 볼 수는 없다.",
        "Physical Intelligence의 2024년 π0 공개에서 2026년 후속 모델·API beta로 이어지는 기록은 연구를 다른 장치와 응용에 연결하는 경로다. 2026년 π0.7은 행동을 지정하는 프롬프트와 자료 조건을 넓혔고, API beta 글은 자료 업로드·미세조정·hosted inference와 실패 기반 반복을 소개했다. 서로 다른 버전과 제공 경로를 한 시점의 동일한 내부 구조로 합치지 않는다.",
        "아래에서는 적응하기 좋은 시작점, 장면·언어에서 행동으로 이어지는 표현, 회사·API·현장 평가를 세 보기로 연결한다. 핀과 여러 공동 연구자의 기존 MAML·π0.5 카드도 그대로 이어 읽는다. 작은 손실과 시간 버퍼의 숫자는 직접 정한 설명 사례이며 논문의 로봇 실험, 실제 Pi API나 현장 안전 검사를 실행한 결과가 아니다."
      ],
      "evidenceLabel": "공식 자료와 원논문 더 읽기",
      "referencesLabel": "연구·회사·제품 원문의 확인 위치",
      "visual": {
        "id": "pi-robot-platform",
        "navLabel": "연구·조직·현장",
        "title": "Physical Intelligence: 빠르게 배우는 모형에서 로봇의 행동과 배포로",
        "caption": "원논문과 공식 자료를 참고해 직접 그린 역할·관계 그림입니다. 각 항목을 눌러 핵심 아이디어와 근거를 읽고, 직접 구성한 작은 사례에서 가정을 바꾸어 보세요."
      },
      "takeaway": {
        "title": "빠른 학습이 일어날 시작점을 배운다",
        "text": "MAML은 과제별 적응 뒤의 결과로 초기 연결값을 학습한다. 과거 경험을 새 과제의 적은 자료에 잘 반응하는 표현으로 옮기려 했다. VLA는 지금 보이는 것과 원하는 행동을 연결한다. 언어 하위 목표와 저수준 연속 행동을 같은 출력으로 뭉뚱그리지 않는다."
      },
      "technical": {
        "title": "원논문의 방법과 이후 조직·제공 조건을 나누어 읽기",
        "paragraphs": [
          "MAML은 여러 과제를 한꺼번에 잘 푸는 답만 찾는 대신, 조금 더 배웠을 때 잘 풀리는 출발점을 찾는다. 각 과제에서 연결값 θ를 조금 바꾼 θ′를 만들고, 그 적응 뒤 손실을 줄이도록 원래 θ를 갱신한다. Fig.1의 과제별 화살표가 한 출발점에서 서로 다른 해답으로 갈라지는 이유다.",
          "Algorithm1은 적응에 쓴 표본과 메타 갱신에 쓴 추가 표본을 구분한다. 적은 자료를 외워서 낮춘 오차보다, 그 자료로 배운 뒤 다른 표본에서도 잘 작동하는지를 보려는 선택이다. 최종 새 과제는 메타 학습 과제와도 분리한다. 경험을 옮길 수 있는 범위를 판정하려면 이 세 수준의 자료 역할을 구별해야 한다.",
          "시작점 사례는 목표값 −2,1,4와 L_i(θ)=(θ−y_i)²를 직접 정했다. 한 번의 적응은 θ′_i=θ−0.25×2(θ−y_i)다. 시작점이 −1·1·3일 때 적응 뒤 평균 손실은 각각 2.5·1.5·2.5가 된다. 한 과제의 정답에 가까운 점보다 여러 과제에 조금씩 움직인 뒤의 결과가 좋은 점을 찾는 질문을 드러낸다.",
          "2017년 시각적 모방 연구는 이 질문을 관찰에서 행동으로 옮겼다. 정책은 카메라 관찰을 행동으로 연결하며, 여러 과제의 시범으로 새 시범에 잘 적응할 연결값을 학습한다. Algorithm1에서 한 시범으로 적응하고 다른 시범으로 메타 손실을 계산한다. 적응에 행동 라벨이 없는 영상만 주어지는 설정까지 별도로 연구했다.",
          "2024년 π0는 시각·언어 사전학습이 가진 물체와 지시의 표현을 연속적인 운동으로 연결하려 했다. 웹의 말과 사진을 배운 VLM에 로봇 행동을 만드는 부분을 결합하고, 여러 장치와 과제의 시범을 함께 학습한다. 언어 토큰을 잘 예측하는 것만으로는 높은 빈도의 운동 명령을 충분히 표현하기 어려워, 연속 행동을 위한 flow matching을 도입했다.",
          "π0.5의 Fig.3은 자료마다 가르치는 역할이 다름을 보여 준다. 웹 자료는 물체·언어의 의미를, 고수준 하위 단계는 다음에 무엇을 할지를, 로봇 시범은 실제로 어떻게 움직일지를 학습하는 데 쓰인다. 이질적인 자료를 함께 쓰면 로봇으로 직접 수집하기 어려운 넓은 의미 경험을 행동의 조건에 연결할 수 있다.",
          "π0.5 추론에서는 현재 장면과 전체 지시로 다음 언어 하위 단계를 생성하고, 그 단계에 조건화된 action expert가 연속 행동 묶음을 만든다. ‘컵을 집어라’라는 목표와 관절의 시간에 따른 명령은 추상화 수준이 다르므로 출력도 나누었다. 공식 해설의 50-step·1초 청크는 이 연구에서 가까운 미래의 여러 운동을 함께 계산한 단위다.",
          "행동 청크가 있어도 새 청크를 기다릴 때 멈추거나 이전 궤적과 어긋날 수 있다. 2025년 RTC 자료는 이미 실행될 이전 청크 부분을 고정하고, 겹치는 미래 구간을 일부 참고하며 나머지를 채우는 inpainting으로 연속성을 다룬다. 이전 명령을 실행하면서 다음 명령을 계산한다는 시간 겹침과, 두 명령이 서로 맞는다는 일관성은 함께 풀어야 하는 문제다.",
          "2026년 π0.7 §III–V는 행동의 조건을 더 풍부하게 구성한다. 같은 과제명이라도 속도·품질·전략이 다른 자료를 무작정 섞으면 서로 다른 행동을 평균낼 수 있다. 상세 언어, 에피소드 메타데이터와 시각적 하위 목표로 ‘무엇을’뿐 아니라 ‘어떤 방식으로’ 할지를 알려 준다. 예를 들어 미래 장면의 그림은 손잡이를 어떤 모습으로 잡아야 하는지를 언어보다 구체적으로 제약할 수 있다.",
          "π0.7의 새로운 과제 평가에는 사람이 하위 단계를 말해 주는 coaching과 그 기록으로 고수준 정책을 미세조정한 조건도 있다. π0.5의 새 집 평가 역시 정해진 과제·환경·자료 분리와 실패 분석 안에서 읽는다. MAML, π0.5, π0.7은 과거 경험을 새 상황에 옮기는 문제를 공유하지만 같은 알고리즘은 아니며 각 조건의 결과를 모든 로봇·환경·안전으로 일반화할 수 없다.",
          "실제 장치와 모형 사이에는 표현을 맞추는 층이 필요하다. 공식 openpi의 LiberoInputs·LiberoOutputs는 환경의 입력과 모형의 입력, 모형의 행동과 환경의 행동을 매핑한다. 학습 자료의 상태·행동 정규화, 로봇별 카메라와 관절 규약, 별도 추론 서버로 관찰을 보내고 행동을 돌려받는 구성도 이 연결에 포함된다.",
          "2026-10-13 API beta는 자료 업로드→관리된 미세조정→hosted inference→로봇 시험→실패를 보고 후속 수집을 정하는 경로를 제시한다. 공개 openpi 자체 실행과는 제공 경로가 다르다. 이 화면은 실제 API·로봇을 연결하지 않고 한 변수 손실과 가정한 시간 차만 계산한다. 버퍼 사례의 공백 0ms는 움직임의 적절함·RTC 구현·현장 안전을 뜻하지 않는다."
        ]
      }
    },
    "keyIdeas": [
      {
        "title": "빠른 학습이 일어날 시작점을 배운다",
        "text": "MAML은 과제별 적응 뒤의 결과로 초기 연결값을 학습한다. 과거 경험을 새 과제의 적은 자료에 잘 반응하는 표현으로 옮기려 했다."
      },
      {
        "title": "장면·말·움직임은 다른 표현이다",
        "text": "VLA는 지금 보이는 것과 원하는 행동을 연결한다. 언어 하위 목표와 저수준 연속 행동을 같은 출력으로 뭉뚱그리지 않는다."
      },
      {
        "title": "모형과 현장 시스템의 역할을 나눈다",
        "text": "정책의 출력, 로봇별 자료 변환과 제어, 새 관찰, 추론 지연과 실제 평가를 함께 보아야 배포 조건을 이해할 수 있다."
      },
      {
        "title": "후속 모델·API와 원논문의 시점을 구분한다",
        "text": "2024 π0, 2025 π0.5와 실시간 청크 연구, 2026 π0.7·API beta는 다른 공개 기록이다. 같은 기여를 모든 버전에 소급하지 않는다."
      }
    ],
    "references": [
      {
        "title": "Finn·Abbeel·Levine · MAML (2017)",
        "url": "https://proceedings.mlr.press/v70/finn17a/finn17a.pdf",
        "location": "pp.1–3, Fig.1·Algorithm1·§2.2. 적응 후 별도 자료의 손실로 초기화를 학습. 자체 한 변수 제곱 손실은 원논문 실험의 재현이 아님."
      },
      {
        "title": "Finn 외 · One-Shot Visual Imitation Learning (2017)",
        "url": "https://proceedings.mlr.press/v78/finn17a/finn17a.pdf",
        "location": "§1·3–4, Algorithm1, Fig.2·5. 시각적 모방과 메타 갱신용 별도 시범, §4.2의 적응 시 행동 라벨 없는 영상 조건. 메타 학습에는 전문가 행동 자료가 필요."
      },
      {
        "title": "Physical Intelligence · π0 공개",
        "url": "https://www.pi.website/blog/pi0",
        "location": "2024-10-31 · Our First Generalist Policy. 다양한 로봇 자료와 VLA·flow matching의 방향. 이 기록의 2024년 기준점."
      },
      {
        "title": "Physical Intelligence 외 · π0.5 원논문 v1",
        "url": "https://arxiv.org/pdf/2504.16054v1",
        "location": "2025-04-22 · §III–IV, Fig.3, §V·VI, AppendixA–B. 이질 자료 공동 학습·고수준 단계와 연속 행동·평가 조건. Fig.3 PDF p.4를 실제 확인."
      },
      {
        "title": "Physical Intelligence · π0.5 공식 해설",
        "url": "https://www.pi.website/blog/pi05",
        "location": "2025-04-22 · How does it work / Training and inference / Generalization. 50-step·1초 행동 청크와 새 환경 평가·실패를 설명. 원논문과 같은 연구의 별도 해설."
      },
      {
        "title": "Physical Intelligence 외 · π0.7 원논문",
        "url": "https://www.pi.website/download/pi07.pdf",
        "location": "2026-04-16 · §III–V, Fig.1–2, §VII와 coaching 평가 Fig.14–16. 상세 언어·메타데이터·시각 하위 목표와 지원 조건을 구분. 모든 시연을 처음부터 완전 자율로 읽지 않음."
      },
      {
        "title": "Physical Intelligence · π0.7 공식 해설",
        "url": "https://www.pi.website/blog/pi07",
        "location": "2026-04-16 · Training/Inference와 Compositional task generalization. 언어·메타데이터·시각적 하위 목표로 행동을 지정하며 coaching·후속 fine-tuning 조건을 구분."
      },
      {
        "title": "Physical Intelligence · Real-Time Action Chunking",
        "url": "https://www.pi.website/research/real_time_chunking",
        "location": "2025-06-09 · 동기 추론의 지연 문제와 비동기 청크 생성. 아래 버퍼 산술은 해당 알고리즘의 구현·성능 측정이 아님."
      },
      {
        "title": "Physical Intelligence · Pi API beta",
        "url": "https://www.pi.website/blog/api-beta",
        "location": "2026-10-13 · 자료 업로드·미세조정·hosted inference·실패 기반 후속 수집. 공개 beta와 회사가 제시한 제공 경로이며 실제 계정·장치를 연결하지 않음."
      },
      {
        "title": "Physical Intelligence · 공식 openpi 저장소",
        "url": "https://github.com/Physical-Intelligence/openpi",
        "location": "조회 2026-11-11 · 모델·학습·추론 안내와 로봇별 입력·변환·설정. 공개 코드와 hosted API를 구분하며 여기서는 코드를 실행하지 않음."
      }
    ],
    "videos": []
  }
};
 person.tagline="새 과제의 빠른 학습에서 시각·언어·로봇 행동과 플랫폼으로";
 person.intro="기존 MAML·π0.5 연구 기록을 보존하며 Physical Intelligence의 모델·데이터·로봇 연결과 API 제공 경로를 잇는다. 적응의 시작점, 언어 하위 목표와 연속 행동, 로봇별 실행·평가 조건을 공동 연구와 시점별 원문으로 읽는다.";
 if(!person.tags.includes('industry'))person.tags.push('industry');
 person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
 window.ATLAS_FINN_REVISION={personId:person.id,workId:work.id,visualId:"pi-robot-platform",sourceVersion:'0.49'};
})();
