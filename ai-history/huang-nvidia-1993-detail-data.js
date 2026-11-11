/* Refine only the existing work's summary, caveat and content after catalog-setup. */
(function(){'use strict';
const p=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==="jensen-huang");
const w=p?.works.find(w=>w.id==="huang-nvidia-1993");if(!w)throw new Error('Existing industry work required.');
Object.assign(w,{
  "summary": "게임의 3D 장면을 반복해서 화면으로 바꾸는 문제에서 출발한 공동설립 기록이다. 그래픽스 파이프라인의 계산·데이터 이동·개발 도구를 함께 읽고, 이후 CUDA·AI로 이어진 시점은 나누어 본다.",
  "caveat": "1993 설립의 공식 회고와 2004 GPU Gems의 파이프라인 설명을 구분한다. 아래 구조는 1993 제품의 배선도가 아니며, 직접 정한 단계 단위는 실제 GPU의 지연·처리량 측정값이 아니다.",
  "content": {
    "article": {
      "question": "게임 속 3D 장면을 빠르게 그리려면,\n어떤 일을 장치와 개발 도구가 함께 맡아야 할까?",
      "opening": [
        "게임의 장면은 물체 이름만으로 화면이 되지 않는다. 물체의 점을 시점에 맞게 바꾸고, 삼각형이 화면의 어느 부분을 덮는지 구하고, 색과 가려짐을 결정해야 한다. 장면이 움직이면 이 일을 다시 수행해야 한다. 3D 그래픽스 사업의 출발은 이런 반복 작업을 사용자가 기다릴 수 있는 시간 안에 처리할 장치를 만드는 문제와 연결된다.",
        "NVIDIA의 공식 연혁은 Jensen Huang·Chris Malachowsky·Curtis Priem이 1993년 4월 5일 회사를 설립했고, 게임과 멀티미디어 시장에 3D 그래픽스를 가져오려 했다고 기록한다. 세 공동설립자의 조직 구성과 시장 선택을 제품 개발팀의 기술 설계와 함께 읽어야 한다. 이 기록의 주인공은 회사가 계산을 맡을 기반을 만들려 했던 경로다.",
        "장면을 그리는 일에는 서로 다른 종류의 계산이 이어진다. 뒤에 출판된 GPU Gems의 그림은 CPU가 준비한 명령과 기하 자료, 정점 처리, 삼각형 설정과 래스터화, fragment 처리, frame buffer를 나눈다. 물체의 점을 바꾸는 일과 화면의 색을 쓰는 일은 자료도 작업량도 다르므로 기능을 나누어 설계할 이유가 생긴다.",
        "칩만 준비하면 개발자가 바로 원하는 장면을 만들 수 있는 것은 아니다. CPU가 그릴 일을 묶어 제출하고, 기하와 텍스처가 적절한 기억에 놓이며, 각 단계가 다음에 쓸 표현을 전달해야 한다. 개발자가 만든 장면과 장치의 능력을 잇는 명령·메모리·소프트웨어의 접점도 제품의 일부다.",
        "이 경로의 뒤쪽에는 다른 사건들이 있다. 공식 연혁은 1999년 GPU, 2006년 CUDA, 2012년 AlexNet과 연결된 AI 계산을 별도의 연도로 배치한다. 그래픽스에서 반복 작업을 다룬 경험이 이후 계산 플랫폼을 읽을 배경이 되지만, 1993의 회사 설립을 곧바로 현대 신경망의 발명으로 합칠 수는 없다.",
        "아래 그림은 창업의 질문, 그래픽스의 자료 흐름, 개발자가 병목을 찾는 순서를 연결한다. 직접 정한 작은 단계 예산에서는 fragment 처리만 줄여도 가장 느린 frame-buffer 단계가 남을 수 있다. 어느 부분을 바꾸어야 전체 흐름이 달라지는지 묻는 방법이, 유명한 회사 이름보다 구체적으로 인프라의 기여를 드러낸다."
      ],
      "visual": {
        "id": "detail-huang-nvidia-1993",
        "navLabel": "장면·파이프라인·개발 조건",
        "title": "장면의 기하에서 화면의 색으로: 반복되는 일을 분리해 다루다",
        "caption": "NVIDIA 공식 연혁과 GPU Gems(2004) Fig.28-1·§28.1–2를 참고해 직접 그렸습니다. 1993의 시장 선택, 뒤에 정리된 그래픽스 구조와 이후 계산 플랫폼의 시점을 구분합니다. 단계별 역할을 누르고 직접 정한 작업 단위를 바꾸어 병목을 비교하세요."
      },
      "takeaway": {
        "title": "알고리즘이 쓰일 장면과, 그 계산을 받아 줄 기반을 함께 만든다",
        "text": "1993의 사업 목표는 게임·멀티미디어의 3D 그래픽스였다. 이후의 자료 흐름과 병목 분석을 함께 읽으면, 공동설립·장치·소프트웨어·사용자의 서로 다른 역할과 CUDA·AI로 넓어진 연대기를 구체적으로 연결할 수 있다."
      },
      "technical": {
        "title": "그래픽스의 단계와 직접 정한 병목 사례 더 읽기",
        "paragraphs": [
          "공식 연혁의 1993 항목은 세 공동설립자와 게임·멀티미디어용 3D 그래픽스라는 방향을 명시한다. 창업 당시 개인의 마음이나 모든 후속 제품의 설계를 이 짧은 회고에서 추정하지 않고, 확인되는 조직·시장 선택을 출발점으로 삼았다.",
          "GPU Gems Chapter28 Fig.28-1은 CPU의 명령과 기하·텍스처·frame buffer가 GPU의 캐시·처리 기능과 연결되는 모습을 그린다. 이 카드의 둘째 그림은 그 기능과 자료 경로를 다시 배치한 자체 도식이다. 원 그림은 2004년의 설명이며 1993 제품 구조를 보이는 사료로 사용하지 않는다.",
          "§28.2.4의 정점 처리는 위치·법선·텍스처 좌표 같은 속성을 받아 clipping과 rasterization에 쓸 표현을 만든다. §28.2.3의 fragment 처리는 색과 깊이 등을 만들어 내는 작업을 다룬다. 정점 수와 화면 해상도가 서로 다른 단계의 작업량을 바꿀 수 있는 이유다.",
          "§28.2.1의 raster operations는 깊이·stencil 비교와 색의 읽기·쓰기, blending 등을 맡는다. 색을 계산하는 shader와 결과를 기억에 읽고 쓰는 부담을 구분해야, 화면 해상도에 따라 느려졌다는 관찰의 원인을 더 좁힐 수 있다.",
          "§28.2.5는 정점·index의 위치에 따라 자료 이동 경로가 달라진다고 설명한다. §28.3.1은 draw call마다 CPU 비용이 생기므로 작업을 묶는 선택을 논한다. 개발 도구와 자료 준비도 장치 활용의 조건이라는 점을 보여 주는 부분이다.",
          "§28.1.2의 방법은 단계의 작업량 또는 계산 조건을 바꾸어 병목을 찾고, 그 단계의 부담을 줄인 뒤 다시 확인하는 반복이다. 장면의 대상과 재질에 따라 한 프레임 안의 제한 요인도 달라질 수 있다고 §28.2가 설명한다.",
          "직접 정한 사례의 네 단계는 전송·정점·fragment·출력이다. 첫 항목이 차례로 지날 때의 합과, 독립된 단계들이 완전히 겹쳐 지속적으로 흐른다고 가정할 때의 최대 단계 단위를 함께 계산한다. 준비 비용·CPU 대기·캐시·실제 병렬 스케줄은 모델에 넣지 않았으므로 이 값은 실제 프레임 시간이나 GPU 속도가 아니다.",
          "공식 연혁의 1999·2006·2012 항목은 각각 GPU·CUDA·AI 활용을 놓는다. 현재의 도구와 뒤의 개발 문서로 설명을 넓히되, 어느 시점의 제품·프로그래밍 방식인지 표시해야 1993의 역사적 기록과 후속 계산 플랫폼의 역할을 혼동하지 않는다."
        ]
      },
      "referencesLabel": "공식 원문과 확인한 위치",
      "evidenceLabel": "개발의 조건과 근거 더 읽기"
    },
    "keyIdeas": [
      {
        "title": "반복할 일이 있는 시장을 고른다",
        "text": "움직이는 3D 장면은 변환·화면 위치·색·가려짐의 계산을 거듭 요구한다. 회사의 출발을 어떤 작업을 감당하려 했는지로 읽는다."
      },
      {
        "title": "같은 프레임에도 여러 계산이 있다",
        "text": "정점·fragment·메모리 접근은 다른 작업이다. 여러 기능과 자료의 경계를 설계해야 화면으로 이어진다."
      },
      {
        "title": "명령과 자료를 공급하는 접점이 필요하다",
        "text": "CPU의 제출, 기하·텍스처 배치와 기억 접근도 GPU를 쓰는 개발 조건이다."
      },
      {
        "title": "한 부분의 개선이 전체 개선과 같지는 않다",
        "text": "단계가 겹쳐 흐르는 조건에서는 가장 느린 단계가 다음 항목의 간격을 제한할 수 있다. 무엇이 병목인지 먼저 바꾸어 확인한다."
      },
      {
        "title": "사업·제품·연구의 연도를 나눈다",
        "text": "1993 공동설립, 뒤의 GPU와 CUDA, AI 학습 활용을 각 자료의 날짜와 기여 단위에 맞추어 연결한다."
      }
    ],
    "videos": [],
    "references": [
      {
        "title": "NVIDIA 공식 연혁 · 1993",
        "url": "https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/",
        "location": "1993 · 3D Graphics. 1993-04-05와 Huang·Malachowsky·Priem 공동설립, 게임·멀티미디어 목표. 2026-11-11 본문 확인."
      },
      {
        "title": "NVIDIA 공식 연혁 · 후속 사건",
        "url": "https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/",
        "location": "1999 GPU · 2006 CUDA · 2012 AI. 회사의 회고·표현이며 독립 성능 검증이 아니다. 2026-11-11 확인."
      },
      {
        "title": "NVIDIA GPU Gems · Fig.28-1",
        "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
        "location": "Cem Cebenoyan, Chapter28 §28.1.1 · Fig.28-1, PDF p6/인쇄474. 원 도판 직접 확인: system/video memory, caches, vertex/raster/fragment/ROP. 2004 설명을 1993 사양으로 소급하지 않음."
      },
      {
        "title": "GPU Gems · 병목을 찾는 방법",
        "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
        "location": "§28.1.2·§28.2 및 Fig.28-2. 작업량/처리 조건을 바꾸어 제한 단계를 찾고 반복하는 절. 도판28-2 본문 설명 확인, 그림 자체의 영상 검토는 하지 않음."
      },
      {
        "title": "GPU Gems · 정점·fragment·출력",
        "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
        "location": "§28.2.1 ROP, §28.2.3 Fragment Shading, §28.2.4 Vertex Processing. 색 계산과 기억 읽기·쓰기를 구분한 본문 확인."
      },
      {
        "title": "GPU Gems · 자료 이동과 작업 제출",
        "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
        "location": "§28.2.5 Vertex and Index Transfer · §28.3.1 CPU/resource locking/batch size. 실제 구현·벤치마크는 실행하지 않음."
      }
    ]
  }
});
})();
