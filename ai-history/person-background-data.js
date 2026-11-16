/* Generated from people-background/*.json. Work dates and typed relationships are separate. */
window.ATLAS_PERSON_BACKGROUNDS=[
  {
    "personId": "alain-colmerauer",
    "origin": {
      "label": "출생",
      "text": "카르카손, 프랑스",
      "sourceIds": [
        "oclc-authority"
      ]
    },
    "education": [
      {
        "name": "ENSIMAG · Grenoble",
        "detail": "ENSIMAG 첫 졸업 기수",
        "period": "1963",
        "sourceIds": [
          "gdria-memorial"
        ]
      },
      {
        "name": "Université de Grenoble · 그르노블대학교",
        "detail": "박사 · 구문 분석 방법 연구",
        "period": "1967",
        "sourceIds": [
          "gdria-memorial",
          "cohen-tribute"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-grenoble",
        "name": "Université de Grenoble · Laboratoire de Calcul",
        "period": "1963–1967년의 연구",
        "place": "그르노블, 프랑스",
        "note": "구문 분석과 컴파일러 연구를 수행했다. 박사 연구에서는 프로그램의 구문을 규칙으로 분석하는 방법을 다뤘다.",
        "sourceIds": [
          "gdria-memorial",
          "cohen-tribute"
        ]
      },
      {
        "institutionId": "university-of-montreal",
        "name": "Université de Montréal · TAUM 프로젝트",
        "period": "1967–1970년 무렵",
        "place": "몬트리올, 캐나다",
        "note": "자동 번역과 자연어 처리를 연구하고 Q-systems를 발전시켰다. 나무 구조를 규칙으로 바꾸는 이 형식은 초기 Prolog의 연구 배경으로 이어졌다.",
        "sourceIds": [
          "cohen-tribute",
          "birth-prolog-archive"
        ]
      },
      {
        "institutionId": "aix-marseille-university",
        "name": "Université Aix-Marseille II · Luminy 연구팀",
        "period": "1970년 귀국 이후 · 1972년 초기 Prolog",
        "place": "마르세유, 프랑스",
        "note": "자연어로 컴퓨터와 소통하려는 프로젝트를 시작했다. Roussel·Pasero·Kanoui 등과 언어와 응용을 발전시켰고, Kowalski와의 교류는 정리증명과 프로그램 실행을 연결하는 연구를 뒷받침했다.",
        "sourceIds": [
          "gdria-memorial",
          "birth-prolog-archive",
          "iuf-profile"
        ]
      }
    ],
    "background": "카르카손에서 태어나 그르노블에서 구문 분석을 연구했다. 몬트리올의 자동 번역 연구를 거쳐 마르세유에서 자연어 소통과 논리적 추론을 한 체계에서 다루려 했다. 문장의 구조를 분석하고, 그 뜻을 논리로 나타내고, 질문의 답을 추론하는 작업이 Prolog의 설계·구현으로 이어졌다.",
    "backgroundSourceIds": [
      "oclc-authority",
      "gdria-memorial",
      "cohen-tribute",
      "birth-prolog-archive"
    ],
    "connections": [
      {
        "personId": "robert-kowalski",
        "name": "Robert Kowalski",
        "nameKo": "로버트 코왈스키",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "Prolog 형성기의 마르세유·에든버러 공동연구",
        "description": "1971–1972년에 Kowalski를 초청해 자연어의 의미와 문법을 논리로 표현하고, 증명 절차를 실행에 사용하는 방법을 함께 연구했다. Colmerauer·Roussel 등이 이끈 마르세유의 언어·응용 개발과 에든버러의 논리 프로그래밍 연구를 잇는 협력이다.",
        "period": "1971–1972",
        "sourceIds": [
          "kowalski-life-2025",
          "birth-prolog-archive"
        ]
      }
    ],
    "sources": [
      {
        "id": "oclc-authority",
        "title": "OCLC WorldCat Entities · Alain Colmerauer 인물 전거",
        "url": "https://entities.oclc.org/worldcat/entity/E39PBJhCFB7MB6vh9bqKqgVXBP.html",
        "scope": "공식 인물 전거의 이름·출생지와 날짜를 읽고, 페이지에 포함된 구조화 데이터의 placeOfBirth=Carcassonne와 dateOfBirth를 대조했다. 도서관 인물 전거를 확인한 범위이며 출생 기록 원본을 검토한 것으로 표시하지 않는다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "gdria-memorial",
        "title": "GDR IA · Grenoble LIG 소장의 Alain Colmerauer 추모문 · 2017",
        "url": "https://www.gdria.fr/bull-ia-fwd-sif-forum-deces-alain-colmerauer/",
        "scope": "Grenoble LIG 소장 Eric Gaussier의 기관 공지를 재수록한 본문을 읽었다. ENSIMAG 첫 기수의 1963년 졸업, Grenoble Laboratoire de Calcul의 연구와 1967년 구문 분석 박사논문, 1970년 귀국 후 Marseille·Luminy 연구를 확인했다. 이 공지의 사망일·Montreal 체류 기간 요약은 사용하지 않고 다른 원자료와 구분했다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "cohen-tribute",
        "title": "Jacques Cohen · A Tribute to Alain Colmerauer · 2001년 원고",
        "url": "https://arxiv.org/pdf/cs/0402058",
        "scope": "동료 연구자의 회고 PDF 1–4쪽을 읽었다. 1963년 Grenoble의 만남과 학업, 1967년 무렵 박사 후 약 3년간의 Montreal 연구, Q-systems와 Marseille의 자연어·정리증명 연구를 확인했다. 1·4쪽을 지면으로 대조했다. 저자가 명시한 개인적 회고의 성격을 유지하고, 동기·개성에 대한 추측이나 모든 우선권 평가를 사실로 옮기지 않았다. 표지는 2001년 원고이며 arXiv 보관은 2004년이다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "birth-prolog-archive",
        "title": "Computer History Museum · Colmerauer·Roussel, The Birth of Prolog 보존 기록",
        "url": "https://softwarepreservation.computerhistory.org/prolog/#ColmerauerAndRoussel1996",
        "scope": "CHM의 서지·보존 기록과 연결된 저자 보관 원고를 확인했다. 직접 읽은 26쪽 PDF 표지는 November 1992이며, PDF 2쪽의 자연어 소통 프로젝트와 TAUM 배경, 5–6쪽의 Kowalski 방문·SL-resolution·언어와 응용의 개발을 본문과 지면으로 대조했다. Roussel이 초기 인터프리터를 구현한 공헌과 Pasero·Kanoui 등의 응용 기여를 유지한다. 1992년 초고를 CHM에 별도로 기록된 1996년 출판본 전체 검토로 표시하지 않는다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "kowalski-life-2025",
        "title": "Robert Kowalski · A Short Story of My Life and Work · 2025년 개정본",
        "url": "https://www.doc.ic.ac.uk/~rak/history.pdf",
        "scope": "PDF 4–5쪽의 본문과 지면에서 Colmerauer의 초청, 1971년 첫 방문과 1972년의 두 달간 재방문, 두 사람이 함께 문법과 증명기를 연구한 일을 대조했다. Kowalski 자신의 회고이며, 이를 독립적인 역할·우선권 판정이나 1974년 논문 공동저술의 증거로 사용하지 않는다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "iuf-profile",
        "title": "Institut Universitaire de France · Alain Colmerauer 회원 기록",
        "url": "https://www.iufrance.fr/les-membres-de-liuf/membre/34.html",
        "scope": "공식 회원 기록 본문에서 교수 직위, Université de la Méditerranée–Aix-Marseille 2 소속과 Informatique·Résolution de contraintes 분야를 확인했다. 현재 재직 여부나 초기 Prolog의 구체적 역할은 이 기록만으로 추정하지 않는다.",
        "accessed": "2026-11-14"
      }
    ]
  },
  {
    "personId": "alan-robinson",
    "origin": {
      "label": "출생",
      "text": "핼리팩스, 요크셔, 잉글랜드",
      "sourceIds": [
        "upm-biography"
      ]
    },
    "education": [
      {
        "name": "University of Cambridge · 케임브리지대학교",
        "detail": "고전학 학사 · Classics",
        "period": "1952",
        "sourceIds": [
          "princeton-memorial",
          "aar-interview-2010"
        ]
      },
      {
        "name": "University of Oregon · 오리건대학교",
        "detail": "철학 석사",
        "period": "1953",
        "sourceIds": [
          "princeton-memorial",
          "aar-interview-2010"
        ]
      },
      {
        "name": "Princeton University · 프린스턴대학교",
        "detail": "철학 박사 · 흄의 인과론에 관한 연구",
        "period": "1956",
        "sourceIds": [
          "princeton-memorial",
          "robinson-retrospective-1992"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "dupont",
        "name": "DuPont · 듀폰",
        "period": "1956–1960",
        "place": "미국",
        "note": "산업계에서 수치 계산과 프로그래밍의 실무를 익혔다. 본인의 회고는 이 기간의 Univac 1·IBM 704, 어셈블리와 Fortran 작업을 설명한다.",
        "sourceIds": [
          "aar-interview-2010"
        ]
      },
      {
        "institutionId": "university-of-pittsburgh",
        "name": "University of Pittsburgh · 피츠버그대학교",
        "period": "1960–1961 학년도",
        "place": "피츠버그, 펜실베이니아, 미국",
        "note": "철학 분야 박사후 연구원으로 재직했다. 이 시기에 Davis·Putnam의 증명 절차를 읽고, Argonne 방문 전부터 그 절차를 구현할 프로그램을 작성했다고 회고한다.",
        "sourceIds": [
          "aar-interview-2010"
        ]
      },
      {
        "institutionId": "argonne-national-laboratory",
        "name": "Argonne National Laboratory · Applied Mathematics Division",
        "period": "1961–1964년 여름 · 방문 연구",
        "place": "아르곤, 일리노이, 미국",
        "note": "Davis–Putnam 절차의 IBM 704 구현을 계기로 기계적 증명을 연구했다. 1963년에 Resolution 논문을 작성했으며, 출판은 1965년이었다. 1965년 원논문 표제에도 Argonne이 표기되어 있다.",
        "sourceIds": [
          "aar-interview-2010",
          "robinson-retrospective-1992",
          "resolution-1965"
        ]
      },
      {
        "institutionId": "rice-university",
        "name": "Rice University · 라이스대학교",
        "period": "1961년 합류 · 1965년 논문 소속",
        "place": "휴스턴, 텍사스, 미국",
        "note": "논리와 과학철학을 가르치는 전임 직책으로 합류했다. Resolution 원논문은 Argonne과 Rice를 함께 표기하며, 각주에는 당시 주소를 Rice University로 적었다.",
        "sourceIds": [
          "aar-interview-2010",
          "resolution-1965"
        ]
      },
      {
        "institutionId": "syracuse-university",
        "name": "Syracuse University · 시러큐스대학교",
        "period": "1967년 합류 · 1993년 명예교수",
        "place": "시러큐스, 뉴욕, 미국",
        "note": "논리·컴퓨터과학 연구를 이어간 주요 소속 기관이다. UPM의 공식 전기는 1967년 합류와 1993년 명예교수 전환을 설명한다.",
        "sourceIds": [
          "upm-biography",
          "princeton-memorial"
        ]
      }
    ],
    "background": "잉글랜드 요크셔에서 태어나 고전학과 철학을 공부했다. 듀폰의 프로그래밍 실무를 거쳐 피츠버그와 Argonne에서 기계적 증명을 연구했고, Rice와 Syracuse에서 논리·컴퓨터과학 연구를 이어갔다. 기계가 처리할 추론의 형태를 설계해, 기호로 표현한 지식에서 증명을 찾는 과정을 만들려 했다.",
    "backgroundSourceIds": [
      "upm-biography",
      "princeton-memorial",
      "aar-interview-2010",
      "resolution-1965"
    ],
    "connections": [
      {
        "personId": "john-mccarthy",
        "name": "John McCarthy",
        "nameKo": "존 매카시",
        "kind": "influence",
        "relation": "influenced",
        "label": "Resolution의 Lisp 증명 구현",
        "description": "로빈슨은 1965년 Stanford에서 매카시를 처음 만났을 때, 매카시가 자신의 Resolution 논문을 읽고 Lisp 증명 프로그램을 작성·시험했다는 사실을 알게 되었다고 회고한다. 이 연결은 논문의 추론 방법이 매카시의 구현에 사용된 기술적 영향을 나타낸다.",
        "period": "1965년의 만남 · 1992년 회고",
        "sourceIds": [
          "robinson-retrospective-1992"
        ]
      }
    ],
    "sources": [
      {
        "id": "princeton-memorial",
        "title": "Princeton Alumni Weekly · John A. Robinson *56 · 2017년 추모문",
        "url": "https://paw.princeton.edu/memorial/john-robinson-56",
        "scope": "Princeton의 동문지 추모문 본문을 읽었다. Cambridge 고전학 학사 1952년, Oregon 철학 석사 1953년, Princeton 철학 박사 1956년과 1967년 Syracuse 합류를 확인했다. 개별 학위 원본이나 전체 인사 기록을 검토한 것으로 확대하지 않는다. 자동 증명 연구를 시작한 정확한 시점은 본인의 회고로 별도 확인했다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "upm-biography",
        "title": "Universidad Politécnica de Madrid · John Alan Robinson · 공식 전기",
        "url": "https://www.upm.es/sfs/Gabinete%20del%20Rector/Honoris%20Causa/curriculum/john.pdf",
        "scope": "대학 공식 전기의 PDF 1쪽을 본문과 지면으로 대조했다. Halifax·Yorkshire 출생, Cambridge·Oregon·Princeton 학업, 1967년 Syracuse 합류와 1993년 명예교수 전환을 확인했다. Resolution의 논문 출판 연도와 세부 연구 경력은 이 전기의 요약을 그대로 옮기지 않고 1965년 원논문과 본인 회고로 대조했다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "aar-interview-2010",
        "title": "Association for Automated Reasoning · Maarten van Emden의 Alan Robinson 인터뷰 · 2010",
        "url": "https://aarinc.org/Newsletters/089-2010-10.html",
        "scope": "Interview with Alan Robinson about the Beginnings of Automatic Deduction 절의 문답 전체를 읽었다. 본인의 설명에서 Cambridge 고전학과 Oregon 철학 공부, DuPont 1956–1960년, Pittsburgh 1960/61 학년도 박사후 연구, 1961년 Rice 직책과 Argonne 여름 방문 및 1962–1964년 재방문을 확인했다. 개인 회고라는 자료의 성격을 유지하며, 이를 학위·인사 문서 원본의 검토로 확대하지 않는다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "robinson-retrospective-1992",
        "title": "J. A. Robinson · Logic and Logic Programming · Communications of the ACM 35(3), 1992",
        "url": "https://www.cs.tufts.edu/comp/150FP/archive/john-robinson/logic-and-logic-programming.pdf#page=6",
        "scope": "인쇄 pp.44–45 / PDF 5–6쪽을 본문과 지면으로 대조했다. Princeton의 1953–1956년 철학 박사 연구, Argonne 여름 방문과 1963년 원고·1965년 출판의 구분, 통일화와 추론을 결합한 발상을 확인했다. p.45 가운데 열의 아래쪽 단락은 1965년 Stanford에서의 첫 만남과 매카시의 논문 독해·Lisp 증명 프로그램 작성·시험을 설명한다. 이 직접적인 구현 회고를 기술적 영향으로 연결하며 공동저술이나 지도 관계로 바꾸지 않는다. 전체 논문의 모든 역사적 평가를 검증한 것으로 표시하지 않는다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "resolution-1965",
        "title": "J. A. Robinson · A Machine-Oriented Logic Based on the Resolution Principle · 1965",
        "url": "https://web.stanford.edu/class/linguist289/robinson65.pdf",
        "scope": "인쇄 pp.23–24 / PDF 1–2쪽의 저자·Argonne와 Rice 소속·당시 주소 각주, 초록과 도입을 본문과 지면으로 대조했다. 기계가 처리할 추론 원리를 설계하려는 목적, 변수 치환과 논리 처리를 결합한 Resolution, 반박과 충족 불가능성을 다루는 형식을 확인했다. 완전성에서 바로 얻는 단순 절차도 비효율적일 수 있다는 원문의 한계를 유지한다. 세부 수식·증명과 화면의 계산 범위는 연결된 연구 카드의 별도 원문 검토를 따른다.",
        "accessed": "2026-11-14"
      }
    ]
  },
  {
    "personId": "alan-turing",
    "origin": {
      "label": "출생",
      "text": "런던, 영국",
      "sourceIds": [
        "kings"
      ]
    },
    "education": [
      {
        "name": "케임브리지대학교 킹스칼리지",
        "detail": "수학 학부",
        "period": "1931–1934",
        "sourceIds": [
          "kings"
        ]
      },
      {
        "name": "프린스턴대학교",
        "detail": "알론조 처치의 지도로 박사 과정",
        "period": "1936–1938",
        "sourceIds": [
          "manchester"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "bletchley-park",
        "name": "GC&CS · 블레츨리파크",
        "place": "영국",
        "period": "제2차 세계대전 중",
        "note": "정부 암호해독 조직에서 연구했다.",
        "sourceIds": [
          "kings"
        ]
      },
      {
        "institutionId": "national-physical-laboratory",
        "name": "국립물리연구소 · NPL",
        "place": "테딩턴, 영국",
        "period": "전후–1948",
        "note": "ACE 범용 전자계산기 설계를 다뤘다.",
        "sourceIds": [
          "kings"
        ]
      },
      {
        "institutionId": "university-of-manchester",
        "name": "맨체스터대학교",
        "place": "맨체스터, 영국",
        "period": "1948년부터",
        "note": "계산기 연구와 프로그래밍에 참여했다.",
        "sourceIds": [
          "kings",
          "manchester"
        ]
      }
    ],
    "background": "영국 런던에서 태어나 케임브리지와 프린스턴에서 수학을 공부했다. 전쟁 중의 암호해독 연구를 거쳐, 전후에는 NPL과 맨체스터에서 실제 계산기와 프로그래밍을 다뤘다.",
    "backgroundSourceIds": [
      "kings",
      "manchester"
    ],
    "connections": [
      {
        "personId": "alonzo-church",
        "name": "Alonzo Church",
        "nameKo": "알론조 처치",
        "kind": "advisor",
        "label": "박사 지도교수",
        "description": "프린스턴에서 튜링의 박사 연구를 지도했다.",
        "period": "1936–1938",
        "sourceIds": [
          "manchester",
          "kings"
        ],
        "relation": "student-of"
      },
      {
        "personId": "max-newman",
        "name": "Max Newman",
        "nameKo": "맥스 뉴먼",
        "kind": "influence",
        "label": "연구에 영향",
        "description": "1935년 강의와 연구 지도로 튜링의 결정문제 연구에 영향을 주었고, 이후 맨체스터에서 다시 함께 일했다.",
        "period": "1935–1936 · 1948년 이후",
        "sourceIds": [
          "kings",
          "manchester"
        ],
        "relation": "influenced-by"
      }
    ],
    "sources": [
      {
        "id": "kings",
        "title": "King’s College Cambridge · Alan Mathison Turing",
        "url": "https://www.kings.cam.ac.uk/alan-mathison-turing-1912-54",
        "scope": "Childhood, The Entscheidungsproblem, Princeton and Bletchley Park, After the War and Artificial Intelligence. 출생·학업·뉴먼의 지도·주요 연구기관.",
        "accessed": "2026-11-10"
      },
      {
        "id": "manchester",
        "title": "University of Manchester · Digital 60: Alan Turing",
        "url": "https://curation.cs.manchester.ac.uk/digital60/www.digital60.org/about/biographies/alanturing/index.html",
        "scope": "Turing at Princeton(1936–38), At Manchester(1948–51). 처치의 박사 지도·1938년 귀국·1948년 맨체스터 합류.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "alex-graves",
    "origin": null,
    "education": [
      {
        "name": "뮌헨공과대학교 · TUM",
        "detail": "Supervised Sequence Labelling with Recurrent Neural Networks · Dr.rer.nat. 박사학위 논문",
        "period": "2008 · TUM의 학위 서지",
        "sourceIds": [
          "tum-alumnus",
          "graves-thesis"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "idsia",
        "name": "IDSIA",
        "place": "Manno-Lugano, 스위스",
        "period": "2006 CTC 논문 소속",
        "note": "CTC 논문은 Graves·Fernández·Gomez를 IDSIA 소속으로 표시한다.",
        "sourceIds": [
          "ctc-original"
        ]
      },
      {
        "institutionId": "technical-university-munich",
        "name": "뮌헨공과대학교 · TUM",
        "place": "Garching, 독일",
        "period": "2008 학위 · 과거 연구원 기록",
        "note": "연구실의 alumni 페이지는 Former Research Associate와2008년 박사학위 논문을 기록한다.",
        "sourceIds": [
          "tum-alumnus",
          "graves-thesis"
        ]
      },
      {
        "institutionId": "university-of-toronto",
        "name": "토론토대학교 컴퓨터과학과",
        "place": "토론토, 캐나다",
        "period": "과거 개인 소개 · 2013년 공동논문 수록",
        "note": "개인 페이지의 CIFAR Junior Fellow·Hinton 감독 소개는 당시 연구 환경으로 읽으며 현재 직책으로 표시하지 않는다.",
        "sourceIds": [
          "graves-home",
          "speech-2013"
        ]
      }
    ],
    "background": "2006년 IDSIA의 공동저자로 CTC를 발표했고, TUM의 2008년 박사학위 논문에서는 순환 신경망을 이용한 시퀀스 라벨링을 다뤘다. 토론토 시기의 개인 소개와2013년 힌턴·모하메드와의 공동논문을 통해 음성·필기 인식에서 시간의 표현과 정답을 잇는 연구를 살펴볼 수 있다.",
    "backgroundSourceIds": [
      "ctc-original",
      "tum-alumnus",
      "graves-thesis",
      "graves-home",
      "speech-2013"
    ],
    "connections": [
      {
        "personId": "jurgen-schmidhuber",
        "name": "Jürgen Schmidhuber",
        "nameKo": "위르겐 슈미트후버",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "CTC 공동저자",
        "description": "2006년 CTC 논문의 네 공동저자 중 두 명이다. 이 연결은 논문이 확인하는 공동연구이며 지도 관계와 구분한다.",
        "period": "2006",
        "sourceIds": [
          "ctc-original"
        ]
      },
      {
        "personId": "geoffrey-hinton",
        "name": "Geoffrey E. Hinton",
        "nameKo": "제프리 힌턴",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "음성 인식 공동연구",
        "description": "2013년 Speech Recognition with Deep Recurrent Neural Networks를 Abdel-rahman Mohamed와 함께 공동저술했다. 힌턴을 박사 지도교수로 표시하는 관계가 아니다.",
        "period": "2013",
        "sourceIds": [
          "speech-2013",
          "graves-home"
        ]
      }
    ],
    "sources": [
      {
        "id": "ctc-original",
        "title": "Graves 외 · Connectionist Temporal Classification (2006)",
        "url": "https://www.cs.toronto.edu/~graves/icml_2006.pdf",
        "scope": "첫 쪽의 네 공동저자·IDSIA/TUM 소속과 PDF2–6의 방법·도판·학습·실험 조건을 확인했다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "tum-alumnus",
        "title": "TUM Robotics and Embedded Systems · Dr.Alex Graves (Alumnus)",
        "url": "https://vmknoll82.in.tum.de/Main/Graves.html",
        "scope": "Former Research Associate, 연구 주제·기관주소, 출판물[13]의 Alexander Graves 2008 Dissertation·TUM을 확인. 과거 연구실 페이지이며 현재 소속·직책으로 사용하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "graves-thesis",
        "title": "Alex Graves · Supervised Sequence Labelling with Recurrent Neural Networks · 학위논문",
        "url": "https://www.cs.toronto.edu/~graves/phd.pdf",
        "scope": "PDF 표제의 TUM·Fakultät für Informatik·Dr.rer.nat. 승인 박사논문과 다음 쪽 초록을 직접 확인. 2008 연도는 TUM의 별도 학위 서지와 대조하며 논문 전체 내용 검토를 주장하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "graves-home",
        "title": "Alex Graves · 토론토대학교 개인 페이지",
        "url": "https://www.cs.toronto.edu/~graves/",
        "scope": "CIFAR Junior Fellow·Hinton 감독의 과거 소개와2013년까지의 논문 목록을 확인. 이후 경력을 추측하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "speech-2013",
        "title": "Graves·Mohamed·Hinton · Speech Recognition with Deep Recurrent Neural Networks",
        "url": "https://arxiv.org/abs/1303.5778",
        "scope": "2013년 논문의 세 공동저자와 초록·제출 서지로 공동연구를 확인. CTC2006의 네 공동저자와 구분한다.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "alex-karp",
    "origin": {
      "label": "출생",
      "text": "뉴욕, 미국",
      "sourceIds": [
        "karp-basf"
      ]
    },
    "education": [
      {
        "name": "스탠퍼드 로스쿨",
        "detail": "법학 전문학위(J.D.)",
        "period": "1992년",
        "sourceIds": [
          "karp-basf",
          "karp-sec"
        ]
      },
      {
        "name": "괴테대학교 프랑크푸르트",
        "detail": "철학 박사",
        "period": "2002년",
        "sourceIds": [
          "karp-basf"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "palantir",
        "name": "Palantir Technologies",
        "place": "미국",
        "period": "2003년 공동창업",
        "note": "데이터 분석·의사결정 소프트웨어 기업의 설립·경영에 참여했다.",
        "sourceIds": [
          "karp-basf",
          "karp-sec"
        ]
      }
    ],
    "background": "뉴욕에서 태어났고, Haverford에서 사회학·인류학을 공부한 뒤 법학과 철학으로 학업을 이어 갔다. 2003년 Palantir를 공동 설립한 경력은 데이터 분석 소프트웨어 기업의 조직·경영이라는 맥락에서 읽는다.",
    "backgroundSourceIds": [
      "karp-basf",
      "karp-sec"
    ],
    "connections": [
      {
        "personId": "peter-thiel",
        "name": "Peter Thiel",
        "kind": "cofounder",
        "label": "Palantir 공동창업",
        "description": "Palantir의 공식 SEC 공시는 두 사람을 공동창업자로 명시한다.",
        "period": "2003년 설립",
        "sourceIds": [
          "karp-sec"
        ],
        "relation": "cofounded-with"
      },
      {
        "personId": "stephen-cohen-palantir",
        "name": "Stephen Cohen",
        "kind": "cofounder",
        "label": "Palantir 공동창업",
        "description": "Palantir 공동창업자 Stephen Cohen이다. 동명의 다른 학자와 구분한다.",
        "period": "Palantir 설립",
        "sourceIds": [
          "karp-sec"
        ],
        "relation": "cofounded-with"
      }
    ],
    "sources": [
      {
        "id": "karp-basf",
        "title": "BASF · 2019 감독이사회 후보 공식 약력, p.9",
        "url": "https://www.basf.com/dam/jcr%3Aba6c9e4c-ddfb-3602-87a9-1514a7c3a2cd/basf/www/global/documents/en/investor-relations/calendar-and-publications/annual-shareholders-meeting/2019/AM-2019_Candidates-Supervisory-Board.pdf",
        "scope": "뉴욕 출생, Haverford 1989·Stanford J.D.1992·Goethe 철학박사2002, Palantir 2003년 공동창업. 개인 주거지·가족 정보는 수록하지 않았다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "karp-sec",
        "title": "Palantir · 2023 SEC 위임장 공시",
        "url": "https://www.sec.gov/Archives/edgar/data/1321655/000132165523000033/pltr-20230425.htm",
        "scope": "Karp 학위 및 Karp·Peter Thiel·Stephen Cohen의 공동창업자 표기. 현재 직책은 이 공시 시점과 구분한다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "alexandr-wang",
    "origin": {
      "label": "성장",
      "text": "로스앨러모스, 뉴멕시코, 미국",
      "sourceIds": [
        "wang-interview"
      ]
    },
    "education": [
      {
        "name": "매사추세츠공과대학교(MIT)",
        "detail": "재학 중 기계학습 연구",
        "period": "Scale 창업 이전",
        "sourceIds": [
          "wang-interview"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "quora",
        "name": "Quora",
        "place": "미국",
        "period": "Scale 창업 이전",
        "note": "기술 개발 업무를 경험했다.",
        "sourceIds": [
          "wang-interview"
        ]
      },
      {
        "institutionId": "scale-ai",
        "name": "Scale AI",
        "place": "샌프란시스코, 미국",
        "period": "2016년 설립",
        "note": "AI 개발에 필요한 데이터·작업 인프라를 제공하는 회사를 창업했다.",
        "sourceIds": [
          "wang-yc",
          "wang-interview"
        ]
      }
    ],
    "background": "로스앨러모스에서 자랐고 Quora 등에서 일한 뒤, MIT에서 기계학습을 연구한 경험을 창업으로 이어 갔다. 2016년 설립한 Scale AI에서는 개발자가 AI에 쓸 데이터를 확보하는 문제를 서비스로 다뤘다.",
    "backgroundSourceIds": [
      "wang-interview",
      "wang-yc"
    ],
    "connections": [
      {
        "personId": "lucy-guo",
        "name": "Lucy Guo",
        "kind": "cofounder",
        "label": "Scale AI 공동창업",
        "description": "2016년 Scale AI를 함께 설립했다.",
        "period": "2016년",
        "sourceIds": [
          "wang-yc",
          "wang-guo-yc"
        ],
        "relation": "cofounded-with"
      }
    ],
    "sources": [
      {
        "id": "wang-interview",
        "title": "SaaStr Podcast 227 · Alexandr Wang 본인 인터뷰와 녹취",
        "url": "https://www.saastr.com/saastr-podcast-227-alexandr-wang-founder-ceo-scale-on-why-tam-in-the-traditional-sense-barely-matters/",
        "scope": "본인이 설명한 Los Alamos 성장, Quora·Addepar 업무, MIT에서의 기계학습 연구와 데이터 확보 문제. MIT 졸업 학위로 표시하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "wang-yc",
        "title": "Y Combinator · Scale AI 회사 기록",
        "url": "https://www.ycombinator.com/companies/scale-ai",
        "scope": "2016년 설립·S16 기수, San Francisco 위치, 데이터 인프라 사업과 Alexandr Wang 창업자 표기.",
        "accessed": "2026-11-10"
      },
      {
        "id": "wang-guo-yc",
        "title": "Y Combinator · Lucy Guo 창업자 기록",
        "url": "https://www.ycombinator.com/founders/lucy-guo",
        "scope": "Lucy Guo의 Scale AI 창업자 표기와 관련 창업자 Alexandr Wang. 두 사람의 이후 재직 상태를 현재까지 이어진 것으로 표시하지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "ali-farhadi",
    "education": [
      {
        "name": "University of Illinois Urbana-Champaign · Computer Science",
        "detail": "박사 · 지도교수 David Forsyth",
        "period": "2011년 박사학위",
        "sourceIds": [
          "uw-appointment",
          "cmu-home"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "carnegie-mellon-university",
        "name": "Carnegie Mellon University · Robotics Institute",
        "period": "2012년 대학 발표에 표기된 박사후연구",
        "place": "피츠버그, 펜실베이니아주, 미국",
        "note": "UW의 2012년 영입 기사는 Carnegie Mellon의 박사후연구원이었다고 소개한다. 당시 대학 도메인에 둔 본인 홈페이지는 Martial Hebert·Alexei Efros와 컴퓨터 비전·기계학습을 연구하고, 물체의 속성·장면 이해·풍부한 이미지 설명을 다룬다고 적고 있다.",
        "sourceIds": [
          "uw-appointment",
          "cmu-home"
        ]
      },
      {
        "institutionId": "university-of-washington",
        "name": "University of Washington · 컴퓨터 비전 연구",
        "period": "2012년 가을 교수진 합류 발표 · 초기 YOLO 시기",
        "place": "시애틀, 워싱턴주, 미국",
        "note": "UW는 2012년 5월에 그해 가을 합류를 발표했다. 초기 YOLO에서는 Redmon·Divvala·Girshick과 종류와 위치를 함께 예측하는 신경망을 연구했다. RAIVN의 졸업생 기록은 Redmon의 지도교수였음을 확인한다.",
        "sourceIds": [
          "uw-appointment",
          "yolo-original",
          "raivn-people"
        ]
      },
      {
        "institutionId": "allen-institute-for-ai",
        "name": "Allen Institute for Artificial Intelligence · 원논문 소속",
        "period": "2015년 사전 공개 · CVPR 2016",
        "place": "시애틀, 워싱턴주, 미국",
        "note": "초기 YOLO 첫쪽의 저자 소속 기호는 Farhadi를 UW와 Allen Institute for AI에 함께 연결한다. 논문 당시 소속을 기록하며 2026년 현재의 기관장 직함으로 사용하지 않는다.",
        "sourceIds": [
          "yolo-original"
        ]
      }
    ],
    "background": "2011년 Illinois에서 David Forsyth의 지도로 박사학위를 받았고, Carnegie Mellon의 Robotics Institute에서 박사후연구를 했다. 물체의 속성과 장면을 더 풍부하게 설명하는 연구에서 출발해, 2012년 UW 교수진 합류를 발표했다. UW에서 레드몬을 지도하며 초기 YOLO의 공동저자로 참여했다. 이 카드에서는 물체를 인식하는 문제를 위치·종류의 공동 예측으로 표현한 연구와, 그 연구를 수행한 대학·연구소의 배경을 연결한다.",
    "backgroundSourceIds": [
      "uw-appointment",
      "cmu-home",
      "raivn-people",
      "yolo-original"
    ],
    "connections": [
      {
        "personId": "joseph-redmon",
        "name": "Joseph Redmon",
        "nameKo": "조셉 레드몬",
        "kind": "advisor",
        "relation": "advised",
        "label": "워싱턴대학교 박사과정 지도",
        "description": "UW RAIVN Lab의 졸업생 기록은 Redmon의 박사과정 기간을 2013–2021로 표시하고 Ali Farhadi를 지도교수로 명시한다. 인물 관계도에서는 Farhadi에서 Redmon으로 향하는 지도 관계로 연결한다.",
        "period": "2013–2021 · UW 박사과정",
        "sourceIds": [
          "raivn-people"
        ]
      },
      {
        "personId": "joseph-redmon",
        "name": "Joseph Redmon",
        "nameKo": "조셉 레드몬",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "초기 YOLO 공동연구",
        "description": "Farhadi·Redmon은 Santosh Divvala·Ross Girshick과 초기 YOLO 논문을 함께 썼다. 이미지 전체의 특징에서 경계 상자와 종류에 관한 출력을 함께 예측하는 접근을 설명한다. 지도와 공동저술은 서로 다른 관계 유형으로 보존한다.",
        "period": "2015년 사전 공개 · CVPR 2016",
        "sourceIds": [
          "yolo-original",
          "yolo-cvpr"
        ]
      }
    ],
    "sources": [
      {
        "id": "uw-appointment",
        "title": "University of Washington · Ali Farhadi joins UW CSE · 2012-05-30",
        "url": "https://news.cs.washington.edu/2012/05/30/ali-farhadi-joins-uw-cse/",
        "scope": "영입 기사 본문에서 2011년 Illinois 박사학위, 당시 Carnegie Mellon Robotics Institute 박사후연구, 2012년 가을 UW 교수진 합류 예정이라는 기록을 읽었다. 당시 발표를 현재의 직함이나 소속 종료 시점까지 확장하지 않는다. 구체적인 출생 도시와 학부 학력은 이 자료에서 확인하지 못했다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "cmu-home",
        "title": "Ali Farhadi · Carnegie Mellon University 시기의 본인 홈페이지",
        "url": "https://www.cs.cmu.edu/~afarhadi/",
        "scope": "대학 도메인에 남은 과거 홈페이지 본문에서 UIUC 박사와 David Forsyth의 지도, Robotics Institute에서 Martial Hebert·Alexei Efros와의 연구, 속성 기반 물체 표현·장면 이해·풍부한 이미지 설명이라는 관심 분야를 직접 읽었다. 이 페이지의 박사후연구원 직함은 당시의 경력으로 사용하며 현재 직함으로 옮기지 않는다. 학위 연도는 별도의 UW 2012년 영입 기사와 대조했다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "raivn-people",
        "title": "University of Washington · RAIVN Lab · People / Alumni",
        "url": "https://raivn.cs.washington.edu/people/",
        "scope": "공식 졸업생 목록의 Joseph (Joe) Redmon 행에서 Ph.D., 2013–2021과 Advisor: Ali Farhadi를 읽었다. Farhadi에서 Redmon으로 향하는 지도 관계의 직접 근거다. 같은 기관에 있었다는 사실만으로 다른 인물과의 관계를 만들지 않는다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "yolo-original",
        "title": "Redmon·Divvala·Girshick·Farhadi · You Only Look Once 원논문",
        "url": "https://pjreddie.com/static/papers/yolo_1.pdf",
        "scope": "PDF p.1의 네 저자·소속 기호와 초록·도입, p.2 §2 Unified Detection을 읽었다. Farhadi·Divvala의 UW와 Allen Institute for AI 겸 소속, Redmon의 UW, Girshick의 Facebook AI Research를 구분한다. 개별 연구자의 단독 발명이나 역할 분담, 이후 모든 YOLO 버전의 개발 관계는 추정하지 않는다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "yolo-cvpr",
        "title": "CVF · CVPR 2016 · You Only Look Once 공식 논문 기록",
        "url": "https://openaccess.thecvf.com/content_cvpr_2016/html/Redmon_You_Only_Look_CVPR_2016_paper.html",
        "scope": "CVPR 2016의 제목·네 공동저자·공식 논문 기록을 저자 공개본과 대조한다. 학회 출판과 사전 공개를 나누어 표시한다.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "allen-newell",
    "origin": {
      "label": "출생",
      "text": "샌프란시스코, 미국",
      "sourceIds": [
        "cmu-newell-archives"
      ]
    },
    "education": [
      {
        "name": "Stanford University · 스탠퍼드대학교",
        "detail": "물리학 학사 · B.S.",
        "period": "1949",
        "sourceIds": [
          "cmu-newell-archives"
        ]
      },
      {
        "name": "Princeton University · 프린스턴대학교",
        "detail": "수학 대학원 과정",
        "period": "1949–1950년 무렵",
        "sourceIds": [
          "cmu-newell-archives"
        ]
      },
      {
        "name": "Carnegie Institute of Technology · 현재 Carnegie Mellon University",
        "detail": "산업경영학 박사 · Industrial Administration",
        "period": "1957",
        "sourceIds": [
          "cmu-newell-archives"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "rand-corporation",
        "name": "RAND Corporation · RAND 연구소",
        "period": "1950–1961",
        "place": "샌타모니카·피츠버그, 미국",
        "note": "연구원으로 일하며 사이먼·J. C. Shaw와 기호 처리와 문제 해결을 연구했다. 피츠버그에서 박사과정 연구를 진행할 때도 1961년까지 RAND 소속을 유지했다.",
        "sourceIds": [
          "cmu-newell-archives",
          "lt-1957"
        ]
      },
      {
        "institutionId": "carnegie-mellon-university",
        "name": "Carnegie Institute of Technology → Carnegie Mellon University",
        "period": "1957년 박사 · 1961년 교수 임용 이후",
        "place": "피츠버그, 펜실베이니아, 미국",
        "note": "사이먼과 문제 해결 연구를 이어갔다. Logic Theorist 이후의 General Problem Solver(GPS), Human Problem Solving과 이후 Soar 연구도 CMU 소장목록의 연구 배경에 설명되어 있다.",
        "sourceIds": [
          "cmu-newell-archives"
        ]
      }
    ],
    "background": "샌프란시스코에서 태어나 물리학을 공부한 뒤 수학 대학원과 RAND의 연구를 거쳤다. 계산기를 기호를 다루는 장치로 보고, 사람이 답을 모르면서도 유망한 길을 골라 문제를 푸는 과정을 프로그램으로 표현하려 했다. 사이먼·Shaw와의 Logic Theorist 연구는 이후 GPS 등의 문제 해결 연구로 이어졌다.",
    "backgroundSourceIds": [
      "cmu-newell-archives",
      "lt-1956",
      "lt-1957"
    ],
    "connections": [
      {
        "personId": "herbert-simon",
        "name": "Herbert A. Simon",
        "nameKo": "허버트 사이먼",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "기호 처리·문제 해결 공동연구",
        "description": "1956년 Logic Theory Machine 명세의 공동저자다. J. C. Shaw는 원문 각주에서 여러 측면의 공동 작업자이자 컴퓨터 실현을 맡은 동료로 명시되며, 1957년 실행 보고에는 세 사람이 공동저자로 표기된다. 이후 GPS와 Human Problem Solving으로 이어지는 협력을 공동연구 관계로 연결한다.",
        "period": "1956–1972년의 공동 연구·저술",
        "sourceIds": [
          "lt-1956",
          "lt-1957",
          "cmu-newell-archives"
        ]
      }
    ],
    "sources": [
      {
        "id": "cmu-newell-archives",
        "title": "Carnegie Mellon University Archives · Allen Newell Papers · Biographical Notes",
        "url": "https://findingaids.library.cmu.edu/repositories/2/resources/202",
        "scope": "공식 소장목록의 Biographical Notes 본문을 읽었다. 출생지, 1949년 Stanford 물리학 학사, 이후 Princeton 수학 대학원 수학, RAND 연구원 1950–1961년, 1957년 CIT 산업경영학 박사와 1961년 교수 임용, Simon·Shaw와의 공동연구 및 GPS·Human Problem Solving·Soar로 이어진 연구 배경을 확인했다. 소장목록의 전기를 확인한 범위이며 개별 박사학위 원문·재직 기록 전체를 검토한 것은 아니다. Princeton의 학위 취득이나 Simon과의 지도 관계는 표시하지 않는다.",
        "accessed": "2026-11-13"
      },
      {
        "id": "lt-1956",
        "title": "Newell·Simon (1956) · The Logic Theory Machine · RAND P-868",
        "url": "https://iiif.library.cmu.edu/file/Simon_box00006_fld00406_bdl0001_doc0001/Simon_box00006_fld00406_bdl0001_doc0001.pdf#page=2",
        "scope": "CMU 보관 스캔의 인쇄 p.1 / PDF 2쪽에서 Newell·Simon의 저자 표기, RAND·Carnegie Institute of Technology 소속, 휴리스틱을 이용한 증명 탐색이라는 연구 목적을 지면으로 대조했다. 같은 쪽 각주는 J. C. Shaw를 여러 측면의 파트너이자 컴퓨터 실현을 맡은 동료로 명시한다. 인쇄 pp.7·25·30·45의 추출 본문으로 기호 기억, 공리와 추론 규칙, 유사한 후보 선택과 매칭, 중간 문제와 정리 저장을 읽었다. 이 자료는 시스템 명세이며 컴퓨터 실행 보고와 구분한다. 개별 알고리즘의 단독 발명자나 더 세밀한 역할 분담을 추정하지 않는다.",
        "accessed": "2026-11-13"
      },
      {
        "id": "lt-1957",
        "title": "Newell·Shaw·Simon (1957) · Empirical Explorations of the Logic Theory Machine",
        "url": "https://iiif.library.cmu.edu/file/Newell_box00028_fld01976_doc0005/Newell_box00028_fld01976_doc0005.pdf#page=2",
        "scope": "CMU 보관 부분본의 표지와 인쇄 p.218 / PDF 2쪽을 지면으로 대조했다. 세 공동저자, Newell·Shaw의 RAND와 Simon의 Carnegie Institute of Technology 소속, JOHNNIAC 실행 자료와 휴리스틱 문제 해결 과정을 연구한다는 설명을 확인했다. 전체 논문이나 세 사람의 모든 연구를 검토한 것으로 확대하지 않는다.",
        "accessed": "2026-11-13"
      }
    ]
  },
  {
    "personId": "alonzo-church",
    "origin": {
      "label": "출생",
      "text": "워싱턴 D.C., 미국",
      "sourceIds": [
        "church-princeton-findingaid"
      ]
    },
    "education": [
      {
        "name": "프린스턴대학교",
        "detail": "수학 학사 · A.B.",
        "period": "1924",
        "sourceIds": [
          "church-princeton-findingaid",
          "church-oral-history"
        ]
      },
      {
        "name": "프린스턴대학교",
        "detail": "수학 박사 · Oswald Veblen의 지도",
        "period": "1927",
        "sourceIds": [
          "church-princeton-findingaid"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "princeton-university",
        "name": "프린스턴대학교",
        "place": "프린스턴, 미국",
        "period": "1929–1967",
        "note": "수학·논리 연구와 대학원생 지도에 참여했다.",
        "sourceIds": [
          "church-princeton-findingaid",
          "church-princeton-memorial"
        ]
      },
      {
        "institutionId": "ucla",
        "name": "캘리포니아대학교 로스앤젤레스 · UCLA",
        "place": "로스앤젤레스, 미국",
        "period": "1967–1990 · 재직·강의",
        "note": "철학과 수학을 가르치며 연구를 계속했다. 1990년은 강의에서 은퇴한 해다.",
        "sourceIds": [
          "church-princeton-findingaid"
        ]
      }
    ],
    "background": "미국 워싱턴 D.C.에서 태어나 프린스턴에서 수학 학사와 박사 학위를 받았다. 프린스턴과 UCLA에서 수학·논리를 연구하고 가르쳤으며, 프린스턴에서는 튜링의 박사 연구를 지도했다.",
    "backgroundSourceIds": [
      "church-princeton-findingaid",
      "church-turing-princeton"
    ],
    "connections": [
      {
        "personId": "alan-turing",
        "name": "Alan Turing",
        "nameKo": "앨런 튜링",
        "kind": "advisor",
        "relation": "advised",
        "label": "박사과정 지도",
        "description": "프린스턴에서 튜링의 박사 연구를 지도했다. 튜링은 1938년 박사 학위를 받았고, 학위논문은 서수에 기반한 논리 체계를 다뤘다.",
        "period": "1936–1938",
        "sourceIds": [
          "church-turing-princeton"
        ]
      }
    ],
    "sources": [
      {
        "id": "church-princeton-findingaid",
        "title": "Princeton University Library · Alonzo Church Papers, C0948",
        "url": "https://findingaids.library.upenn.edu/records/PRIN_MUDD_C0948",
        "scope": "프린스턴 도서관이 작성한 finding aid의 Philadelphia Area Archives 제공본. Biography/History의 출생·1924년 A.B.·1927년 Veblen 지도 박사·Princeton 1929–1967·UCLA 강의 은퇴 1990년을 확인했다. 이 기록의 계산가능성·논제 관련 요약은 카드의 수학적 근거로 사용하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "church-oral-history",
        "title": "Alonzo Church · Princeton 수학 공동체 구술사, 1984",
        "url": "https://homepage.villanova.edu/robert.jantzen/princeton_math/pmc05.htm",
        "scope": "Princeton University의 1985년 전사본을 제공하는 Villanova 보관본. 학부 졸업 1924년·박사 1927년이라는 본인 진술을 확인했다. 뒤의 튜링 회고는 초기 계산가능성 연구와 프린스턴 서수논리 박사 연구를 구분한다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "church-princeton-memorial",
        "title": "Princeton Alumni Weekly · Alonzo Church ’24 *27",
        "url": "https://paw.princeton.edu/memorial/alonzo-church-24-27",
        "scope": "1929년 Princeton 교원 합류와 1967년 UCLA 철학과 합류를 확인했다. 이 추모문의 다른 수상·회원 연도는 이번 배경에 사용하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "church-turing-princeton",
        "title": "Princeton University Library · Alan Turing and Princeton",
        "url": "https://manuscripts.blogs.princeton.edu/2015/01/29/alan-m-turing-and-princeton/",
        "scope": "Don Skemer가 작성한 도서관 자료 소개 첫 두 문단. 1936–1938년 Church 지도 아래의 대학원 연구, 1938년 박사 학위, 서수논리 학위논문의 1939년 수정 출판을 확인했다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "andrew-ng",
    "origin": null,
    "education": [
      {
        "name": "카네기멜런대학교·MIT",
        "detail": "이학 학사·이학 석사",
        "period": "학사·석사 과정",
        "sourceIds": [
          "ng-official-bio"
        ]
      },
      {
        "name": "캘리포니아대학교 버클리",
        "detail": "컴퓨터과학 박사 · 지도교수 Michael I. Jordan",
        "period": "박사 과정",
        "sourceIds": [
          "ng-official-bio",
          "ng-berkeley-alumni"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "stanford",
        "name": "스탠퍼드대학교",
        "place": "스탠퍼드, 미국",
        "period": "AI연구실 소장 재직",
        "note": "머신러닝 연구·교육과 Stanford AI Lab 운영",
        "sourceIds": [
          "ng-official-bio"
        ]
      },
      {
        "institutionId": "google-brain",
        "name": "Google Brain",
        "place": "미국",
        "period": "초기 연구팀",
        "note": "설립 연구팀을 이끌었다",
        "sourceIds": [
          "ng-official-bio"
        ]
      },
      {
        "institutionId": "baidu",
        "name": "Baidu",
        "place": "중국",
        "period": "수석과학자 재직",
        "note": "기업 AI팀의 기술과 연구 전략을 담당했다",
        "sourceIds": [
          "ng-official-bio"
        ]
      }
    ],
    "background": "카네기멜런·MIT·UC 버클리에서 공부했고, 스탠퍼드의 연구·교육과 Google Brain·Baidu의 기업 연구를 거쳤다. Coursera와 DeepLearning.AI 설립을 통해 대학 강의와 AI 학습 자료를 더 넓은 학습자에게 연결하는 일도 해 왔다.",
    "backgroundSourceIds": [
      "ng-official-bio"
    ],
    "connections": [
      {
        "personId": "michael-i-jordan",
        "name": "Michael I. Jordan",
        "kind": "advisor",
        "label": "박사 지도교수",
        "description": "UC 버클리 박사과정에서 Ng를 지도했다.",
        "period": "박사 과정",
        "sourceIds": [
          "ng-berkeley-alumni"
        ],
        "relation": "student-of"
      },
      {
        "personId": "ian-goodfellow",
        "name": "Ian Goodfellow",
        "kind": "institution",
        "label": "Stanford 학업 인연",
        "description": "Goodfellow의 본인 약력은 Stanford에서 Ng·Gary Bradski와 공부했다고 기록한다. 특정 학위의 단독 지도 관계로 확대하지 않는다.",
        "period": "Stanford 연구 시기",
        "sourceIds": [
          "ng-goodfellow-bio"
        ],
        "relation": "shared-institution-with"
      }
    ],
    "sources": [
      {
        "id": "ng-official-bio",
        "title": "Andrew Ng · 공식 개인 약력",
        "url": "https://www.andrewng.org/",
        "scope": "CMU·MIT·UC Berkeley 학위, Stanford AI Lab 과거소장·Google Brain 설립책임자·Baidu 과거수석과학자·교육기관 설립",
        "accessed": "2026-11-10"
      },
      {
        "id": "ng-berkeley-alumni",
        "title": "Berkeley EECS · Andrew Ng 동문 소개, 2017",
        "url": "https://eecs.berkeley.edu/news/andrew-ng-one-7-leaders-shaping-ai-revolution/",
        "scope": "Michael Jordan 지도교수 관계. 공식동문 페이지들 사이 학위 연도2002/2003 차이가 있어 연도는 표시하지 않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "ng-goodfellow-bio",
        "title": "Ian Goodfellow · 본인 약력",
        "url": "https://www.iangoodfellow.com/bio",
        "scope": "Goodfellow가 Stanford에서 Andrew Ng·Gary Bradski와 공부했다는 관계. 특정학위 단독지도나 공동저자 관계로 확대하지 않음",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "artur-garcez",
    "origin": null,
    "education": [
      {
        "name": "리우데자네이루 교황청립가톨릭대학교(PUC-Rio)",
        "detail": "컴퓨터공학 학위",
        "period": "1993년",
        "sourceIds": [
          "garcez-city"
        ]
      },
      {
        "name": "임피리얼 칼리지 런던",
        "detail": "컴퓨팅 박사",
        "period": "2000년",
        "sourceIds": [
          "garcez-city"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "ufrj",
        "name": "리우데자네이루 연방대학교(UFRJ)",
        "place": "리우데자네이루, 브라질",
        "period": "1996년 석사",
        "note": "시스템공학·컴퓨팅 석사 과정에서 연구했다.",
        "sourceIds": [
          "garcez-city"
        ]
      },
      {
        "institutionId": "imperial-college-london",
        "name": "임피리얼 칼리지 런던",
        "place": "런던, 영국",
        "period": "2000년 박사",
        "note": "신경망과 논리의 결합을 연구했다.",
        "sourceIds": [
          "garcez-city"
        ]
      },
      {
        "institutionId": "city-university-london",
        "name": "City, University of London",
        "place": "런던, 영국",
        "period": "2015년 교수",
        "note": "기계학습·신경기호 계산 연구와 교육을 이끌었다.",
        "sourceIds": [
          "garcez-city"
        ]
      }
    ],
    "background": "브라질 리우데자네이루의 PUC-Rio와 UFRJ에서 공학을 공부한 뒤, 런던의 Imperial에서 컴퓨팅 박사학위를 받았다. City에서는 신경망·논리·학습을 잇는 연구와 데이터과학 교육을 함께 전개했다.",
    "backgroundSourceIds": [
      "garcez-city"
    ],
    "connections": [
      {
        "personId": "dov-gabbay",
        "name": "Dov M. Gabbay",
        "kind": "collaboration",
        "label": "신경기호 연구 공동저술",
        "description": "2002년 Neural-Symbolic Learning Systems와 2009년 Neural-Symbolic Cognitive Reasoning을 함께 집필했다.",
        "period": "2002·2009년",
        "sourceIds": [
          "garcez-city"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "luis-c-lamb",
        "name": "Luís C. Lamb",
        "kind": "collaboration",
        "label": "신경기호 연구 공동저술",
        "description": "Garcez·Lamb·Gabbay는 2009년 Neural-Symbolic Cognitive Reasoning의 공동저자다.",
        "period": "2009년",
        "sourceIds": [
          "garcez-city"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "garcez-city",
        "title": "City St George's · Artur d'Avila Garcez 공식 소개",
        "url": "https://www.citystgeorges.ac.uk/about/people/academics/artur-davila-garcez",
        "scope": "1993년 PUC-Rio·1996년 UFRJ·2000년 Imperial 학위, 2015년 City 교수 경력, 연구 분야 및 Gabbay·Lamb 공동저술. Rio에서 공부한 일을 출생지로 취급하지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "ashish-vaswani",
    "origin": {
      "label": "출생",
      "text": "인도",
      "sourceIds": [
        "vaswani-usc"
      ]
    },
    "education": [
      {
        "name": "서던캘리포니아대학교(USC)",
        "detail": "컴퓨터과학 박사",
        "period": "2014년",
        "sourceIds": [
          "vaswani-usc"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "usc-isi",
        "name": "USC 정보과학연구소(ISI)",
        "place": "미국 캘리포니아",
        "period": "박사 과정",
        "note": "자연어 처리 연구그룹에서 번역·신경 언어모형을 연구했다.",
        "sourceIds": [
          "vaswani-usc"
        ]
      },
      {
        "institutionId": "google-brain",
        "name": "Google Brain",
        "place": "미국",
        "period": "2016년 합류",
        "note": "2017년 Transformer 공동연구로 이어졌다.",
        "sourceIds": [
          "vaswani-usc"
        ]
      }
    ],
    "background": "인도에서 태어나 인도와 중동에서 성장했고, USC에서 자연어 처리를 연구하며 박사학위를 받았다. USC에서 만난 니키 파르마르와 Google Brain에서도 함께 연구해 Transformer 논문을 공동 집필했다.",
    "backgroundSourceIds": [
      "vaswani-usc"
    ],
    "connections": [
      {
        "personId": "david-chiang",
        "name": "David Chiang",
        "kind": "advisor",
        "label": "박사 지도",
        "description": "USC 박사 과정에서 Liang Huang과 함께 바스와니를 지도했다.",
        "period": "2014년 박사",
        "sourceIds": [
          "vaswani-usc"
        ],
        "relation": "student-of"
      },
      {
        "personId": "niki-parmar",
        "name": "Niki Parmar",
        "kind": "collaboration",
        "label": "Transformer 공동연구",
        "description": "USC에서 만난 뒤 Google Brain에서 2017년 Attention Is All You Need를 공동 집필했다.",
        "period": "2017년",
        "sourceIds": [
          "vaswani-usc"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "vaswani-usc",
        "title": "USC Viterbi · USC Alumni Paved Path for ChatGPT",
        "url": "https://viterbischool.usc.edu/news/2023/03/attention-is-all-you-need-usc-alumni-paved-path-for-chatgpt/",
        "scope": "출생·성장 배경, 2014년 박사, Chiang·Huang의 지도, ISI 연구, 2016년 Google Brain 합류와 Parmar 공동연구에 관한 대학의 인터뷰·관계자 증언.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "binyuan-hui",
    "education": [],
    "researchPlaces": [
      {
        "institutionId": "alibaba-qwen-team",
        "name": "Alibaba Group · Qwen 연구팀",
        "period": "2024–2025년 기술 보고서의 연구 참여",
        "place": "공식 보고서의 팀·공동저자 표기",
        "note": "Qwen2.5-Coder v1의 표제는 Qwen Team·Alibaba Group과 Hui를 포함한 공동저자를 표시한다. Qwen3 v1의 §6에도 Core Contributors로 실려 있다. 이 시점의 연구 참여를 기록하며 현재 소속·직함이나 근무 도시는 표시하지 않는다.",
        "sourceIds": [
          "qwen25-coder-v1",
          "qwen3-report-v1"
        ]
      }
    ],
    "background": "코드 언어모델과 자연어로 소프트웨어를 다루는 연구를 해 왔다. 본인 홈페이지는 코드의 실행 피드백을 활용하는 추론과 자율 코딩을 연구 목표로 설명한다. 2024년 Qwen2.5-Coder 보고서의 동등 핵심 기여자 가운데 한 명이며, 2025년 Qwen3에서는 추론과 직접 응답을 함께 학습하는 팀의 공동저자로 이어진다. 개인의 연구 관심과 팀 전체가 발표한 방법을 구분해 읽는다.",
    "backgroundSourceIds": [
      "hui-homepage",
      "qwen25-coder-v1",
      "qwen3-report-v1"
    ],
    "connections": [
      {
        "personId": "junyang-lin",
        "name": "Junyang Lin",
        "nameKo": "린쥔양",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "Qwen 코드·언어모델 공동연구",
        "description": "Qwen2.5-Coder v1의 공동저자와 Qwen3 v1의 §6 Core Contributors에 두 이름이 함께 실려 있다. 같은 연구 보고서에 대한 공동 기여이며 지도 관계나 현재 조직 내 직급을 뜻하지 않는다.",
        "period": "2024–2025년 기술 보고서",
        "sourceIds": [
          "qwen25-coder-v1",
          "qwen3-report-v1"
        ]
      },
      {
        "personId": "jingren-zhou",
        "name": "Jingren Zhou",
        "nameKo": "저우징런",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "Qwen 기술 보고서 공동연구",
        "description": "Qwen2.5-Coder v1의 공동저자와 Qwen3 v1의 Core Contributors에 Hui와 Zhou가 함께 기재된다. 공동저술 근거로 연결하며 개별 구성요소의 담당자나 사적인 관계를 추정하지 않는다.",
        "period": "2024–2025년 기술 보고서",
        "sourceIds": [
          "qwen25-coder-v1",
          "qwen3-report-v1"
        ]
      }
    ],
    "sources": [
      {
        "id": "hui-homepage",
        "title": "Binyuan Hui · 본인 연구 소개와 논문 목록",
        "url": "https://huybery.github.io/",
        "scope": "연구 소개의 자율 코딩 목표·실행 피드백·기초모델/추론모델/코딩 에이전트 관심과 Selected Publications의 Qwen2.5-Coder를 읽었다. 일반지능에 관한 문장은 본인의 연구 관점으로 한정한다. 페이지의 staff research scientist 표기는 하단 Updated on May, 2024 및 본인 GitHub의 Formerly @ Qwen 표기와 시점이 맞지 않을 수 있어 현재 소속·직함의 근거로 사용하지 않는다. 학력·출생지는 확인하지 못해 기입하지 않는다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "hui-github",
        "title": "Binyuan Hui · 본인 GitHub 프로필",
        "url": "https://github.com/huybery",
        "scope": "Binyuan Hui·huybery의 연결, 개인 홈페이지 링크와 Formerly @ Qwen 표기를 확인했다. 같은 화면 소개 문구에는 Qwen Team도 남아 있어 현직·이직 시점·새 근무처를 확정하지 않았다. 프로필의 위치나 계정 활동을 출생지·학력·연구 성과로 바꾸지 않았다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "qwen25-coder-v1",
        "title": "Hui 외 · Qwen2.5-Coder Technical Report · 2024 v1",
        "url": "https://arxiv.org/html/2409.12186v1",
        "scope": "2024-09-18 v1의 표제·저자와 Equal core contribution 각주, Qwen Team·Alibaba Group 표기를 읽었다. Hui·Jian Yang·Zeyu Cui·Jiaxi Yang 네 명의 별표를 확인했다. §3.2·Figures 2–4의 파일/저장소 사전학습과 다음 토큰/FIM 목표를 확인했다. §4.1의 코드 검증 설명도 읽었으나 전체 실험·성능 우위를 재검증한 것으로 표시하지 않는다. 11월 v3의 추가 모델을 9월 v1 설정과 합치지 않았다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "qwen3-report-v1",
        "title": "Qwen Team · Qwen3 Technical Report · 2025 v1",
        "url": "https://arxiv.org/html/2505.09388v1",
        "scope": "§6 Core Contributors에서 Binyuan Hui·Junyang Lin·Jingren Zhou·An Yang을 직접 확인했다. Figure 1·§4의 사후학습 경로와 사고/직답 통합은 기존 Qwen3 상세 연구 카드의 원문 설명을 공유한다. 공동저자 명단으로 세부 역할·단독 발명·지도 관계를 추정하지 않는다. arXiv 첫 제출은 2025-05-14이며 모델 공개일과 구분한다.",
        "accessed": "2026-11-16"
      }
    ]
  },
  {
    "personId": "chelsea-finn",
    "origin": null,
    "education": [
      {
        "name": "매사추세츠공과대학교(MIT)",
        "detail": "전기전자·컴퓨터과학 학사",
        "period": "2014년",
        "sourceIds": [
          "finn-cv"
        ]
      },
      {
        "name": "UC 버클리",
        "detail": "컴퓨터과학 박사",
        "period": "2018년",
        "sourceIds": [
          "finn-cv"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "berkeley-bair",
        "name": "UC 버클리",
        "place": "버클리, 미국",
        "period": "2014–2018년",
        "note": "로봇 학습과 메타학습을 연구한 박사 과정.",
        "sourceIds": [
          "finn-cv",
          "finn-maml"
        ]
      },
      {
        "institutionId": "google-brain",
        "name": "Google Brain·Google DeepMind",
        "place": "미국",
        "period": "2018–2024년",
        "note": "연구 과학자로 일했다.",
        "sourceIds": [
          "finn-cv"
        ]
      },
      {
        "institutionId": "stanford",
        "name": "스탠퍼드대학교",
        "place": "스탠퍼드, 미국",
        "period": "2019년 합류",
        "note": "컴퓨터과학·전기공학 분야에서 로봇의 학습과 상호작용을 연구했다.",
        "sourceIds": [
          "finn-cv",
          "finn-stanford"
        ]
      },
      {
        "institutionId": "physical-intelligence",
        "name": "Physical Intelligence · 2026년 공동연구",
        "period": "2026년 MEM·π0.7 공개",
        "note": "과거 관측의 기억과 목표 장면·수행 메타데이터를 로봇 행동의 조건으로 연결하는 공동연구의 저자에 포함된다. 논문 공동저자 기록으로 확인한 범위다.",
        "sourceIds": [
          "finn-pi07-2026",
          "finn-mem-2026"
        ]
      }
    ],
    "background": "MIT에서 전기전자·컴퓨터과학을 공부하고 UC 버클리에서 로봇 학습으로 박사 과정을 마쳤다. Google의 연구팀과 스탠퍼드에서 로봇이 경험을 모으고 새로운 과제에 적응하는 문제를 이어 연구했다. 2026년에는 Physical Intelligence의 MEM·π0.7 공동연구를 통해 과거 관측의 기억과 다양한 행동 조건을 이어 다뤘다.",
    "backgroundSourceIds": [
      "finn-cv",
      "finn-stanford",
      "finn-pi07-2026",
      "finn-mem-2026"
    ],
    "connections": [
      {
        "personId": "pieter-abbeel",
        "name": "Pieter Abbeel",
        "kind": "collaboration",
        "label": "MAML 공동연구",
        "description": "Finn·Abbeel·Levine은 2017년 MAML 논문의 공동저자다.",
        "period": "2017년",
        "sourceIds": [
          "finn-maml"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "sergey-levine",
        "name": "Sergey Levine",
        "kind": "collaboration",
        "label": "MAML 공동연구",
        "description": "새 과제에 빠르게 적응하는 메타학습 연구를 함께 발표했다.",
        "period": "2017년",
        "sourceIds": [
          "finn-maml"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "finn-cv",
        "title": "Chelsea Finn · 공식 CV",
        "url": "https://ai.stanford.edu/~cbfinn/_files/cv.pdf",
        "scope": "2014년 MIT 학사·2018년 Berkeley 박사, Google 2018–2024년, Stanford 2019년 합류. CV의 종료하지 않은 직책을 영구 재직으로 해석하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "finn-stanford",
        "title": "Stanford Profiles · Chelsea Finn",
        "url": "https://profiles.stanford.edu/chelsea-finn?tab=bio",
        "scope": "학업 배경과 로봇·메타학습 연구 분야.",
        "accessed": "2026-11-10"
      },
      {
        "id": "finn-maml",
        "title": "Finn·Abbeel·Levine · Model-Agnostic Meta-Learning",
        "url": "https://arxiv.org/abs/1703.03400",
        "scope": "2017년 논문 공동저자 명단. 이 관계는 논문 공동연구이며 여기서 박사 지도 관계로 재분류하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "finn-pi07-2026",
        "title": "Physical Intelligence · π0.7 원논문과 공개 글",
        "url": "https://www.pi.website/blog/pi07",
        "scope": "2026-04-16 공개. 첼시 핀은 저자 명단에 포함. PDF p.1 저자·Fig.1, p.4 Fig.2의 조건부 VLA·세계모델·고수준 정책 구조.",
        "accessed": "2026-11-15"
      },
      {
        "id": "finn-mem-2026",
        "title": "Physical Intelligence · VLAs with Long and Short-Term Memory",
        "url": "https://www.pi.website/research/memory",
        "scope": "2026-03-03 공식 공개. 단기·장기 기억과 첼시 핀·세르게이 레빈 공동저자 기록.",
        "accessed": "2026-11-15"
      },
      {
        "id": "finn-api-2026",
        "title": "Physical Intelligence · Pi API beta",
        "url": "https://www.pi.website/blog/api-beta",
        "scope": "2026-10-13 공개. 자료 업로드·미세조정·hosted inference·실패 기반 후속 수집의 회사 설명.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "damai-dai",
    "education": [
      {
        "name": "Peking University · 컴퓨터과학 박사과정 재학 기록",
        "period": "2022년 학과 공식 공지",
        "detail": "2021–2022학년도 장학금 예비심사 공지의 박사과정 명단에서 이름을 확인했다. 해당 공지를 학위 취득·최종 장학금 수상 확인으로 사용하지 않는다.",
        "sourceIds": [
          "pku-doctoral-record"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "peking-university",
        "name": "Peking University · 멀티미디어 정보처리 국가중점연구실",
        "period": "2024년 DeepSeekMoE 논문 소속",
        "place": "중국 · 논문 소속 표기",
        "note": "DeepSeekMoE의 첫 쪽은 Damai Dai에게 베이징대학교와 DeepSeek-AI의 두 소속을 함께 표시한다. LIKE Lab 팀 페이지에도 동문으로 기재된다.",
        "sourceIds": [
          "moe-paper-v1",
          "pku-lab-alumni"
        ]
      },
      {
        "institutionId": "deepseek",
        "name": "DeepSeek-AI · MoE와 대규모 언어모델 공동연구",
        "period": "2024년 MoE·V3 · 2025년 최초 R1 보고서",
        "place": "공식 논문에 기록된 연구 참여",
        "note": "DeepSeekMoE 첫 쪽은 별표 저자의 기여를 DeepSeek-AI 인턴 기간의 기여로 설명한다. 이후 V3와 R1의 팀 기여 명단도 연결한다. 현재 조직 내 직급·보고 체계는 이 자료에서 추정하지 않는다.",
        "sourceIds": [
          "moe-paper-v1",
          "v3-report-v1",
          "r1-report-v1"
        ]
      }
    ],
    "background": "베이징대학교에서 컴퓨터과학을 연구했으며, 2024년 DeepSeekMoE 원논문은 베이징대학교 연구실과 DeepSeek-AI의 두 소속을 표시한다. 이 공동연구에서는 전문가를 잘게 나누어 조합하는 방법과 공통으로 쓰는 전문가를 구분했다. V3에서는 이 발상이 문맥 저장·학습 목표·계산 기반과 함께 더 큰 언어모델로 이어진다. V3 첫 보고서의 연구·엔지니어링 명단과 R1 첫 보고서의 기여자 명단에서도 이름을 확인할 수 있다.",
    "backgroundSourceIds": [
      "pku-doctoral-record",
      "moe-paper-v1",
      "v3-report-v1",
      "r1-report-v1"
    ],
    "connections": [
      {
        "personId": "liang-wenfeng",
        "name": "Liang Wenfeng",
        "nameKo": "량원펑",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "DeepSeekMoE·V3 공동연구",
        "description": "2024년 DeepSeekMoE의 저자 명단과 V3 첫 보고서의 Research & Engineering에 Damai Dai와 Wenfeng Liang이 함께 기재된다. 논문 공동연구 관계이며 개인 간 지도 관계를 뜻하지 않는다.",
        "period": "2024년 · DeepSeekMoE·V3",
        "sourceIds": [
          "moe-paper-v1",
          "v3-report-v1"
        ]
      },
      {
        "personId": "daya-guo",
        "name": "Daya Guo",
        "nameKo": "다야 궈",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "V3·R1 팀 공동연구",
        "description": "V3에서는 두 사람이 연구·엔지니어링 명단에 함께 실린다. 2025년 1월 R1 첫 판은 Daya Guo를 핵심 기여자, Damai Dai를 기여자로 구분한다. 두 방법의 단독 발명이나 같은 조직 내 직급을 이 명단에서 추정하지 않는다.",
        "period": "2024–2025 · 첫 기술 보고서",
        "sourceIds": [
          "v3-report-v1",
          "r1-report-v1"
        ]
      }
    ],
    "sources": [
      {
        "id": "pku-doctoral-record",
        "title": "Peking University 컴퓨터학과 · 2021–2022학년도 장학금 예비심사 공지",
        "url": "https://cs.pku.edu.cn/info/1035/1331.htm",
        "scope": "2022-09-26 학과 공식 공지에서 代达劢를 박사과정 대상 명단에서 확인했다. 예비심사 추천 결과이며 최종 수상이나 박사학위 취득 연도·지도교수를 확정하는 자료로 쓰지 않는다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "pku-lab-alumni",
        "title": "LIKE Lab · Peking University · 팀 동문 목록",
        "url": "https://likelabpku.github.io/zh/people.html",
        "scope": "베이징대학교 언어지능·지식공학 연구실 팀 페이지의 部分校友에서 代达劢와 DeepSeek 표기를 확인했다. 논문에 있는 소속과 함께 연구실 배경을 연결하되 이 명단으로 학위 종류·취득 연도·현재 직함을 단정하지 않는다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "moe-paper-v1",
        "title": "Dai 외 · DeepSeekMoE · 2024 v1",
        "url": "https://arxiv.org/pdf/2401.06066v1#page=1",
        "scope": "2024-01-11 v1 PDF1쪽의 저자·두 소속·인턴 기여 각주와 PDF2–3쪽 도입의 세분화된 전문가·공유 전문가 아이디어를 읽었다. 논문은 팀의 공동 제안이며 개별 저자의 방법 발명 분담을 밝힌 명세가 아니다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "v3-report-v1",
        "title": "DeepSeek-AI · DeepSeek-V3 Technical Report · 2024 v1",
        "url": "https://arxiv.org/pdf/2412.19437v1#page=45",
        "scope": "2024-12-27 v1 PDF45쪽 Appendix A Research & Engineering에서 Damai Dai·Daya Guo·Wenfeng Liang을 확인했다. §2의 원도판·방법은 기존 V3 연구 카드와 공유한다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "r1-report-v1",
        "title": "DeepSeek-AI · DeepSeek-R1 · 2025년 1월 v1",
        "url": "https://arxiv.org/pdf/2501.12948v1#page=20",
        "scope": "2025-01-22 v1 PDF20쪽에서 Damai Dai를 Contributors, Daya Guo를 Core Contributors로 확인했다. 인물 연대기에서 연구 참여를 연결하며 세부 RL 방법을 Damai 개인의 단독 발명으로 돌리지 않는다.",
        "accessed": "2026-11-16"
      }
    ]
  },
  {
    "personId": "dario-amodei",
    "origin": null,
    "education": [
      {
        "name": "스탠퍼드대학교",
        "detail": "학부 과정",
        "period": "",
        "sourceIds": [
          "amodei-hertz"
        ]
      },
      {
        "name": "프린스턴대학교",
        "detail": "물리학 박사·신경회로의 집단적 작동 연구",
        "period": "",
        "sourceIds": [
          "amodei-hertz"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "google-brain",
        "name": "Google Brain",
        "place": "미국",
        "period": "OpenAI 합류 이전",
        "note": "신경망의 능력을 확장하는 딥러닝 연구에 참여했다.",
        "sourceIds": [
          "amodei-hertz"
        ]
      },
      {
        "institutionId": "openai",
        "name": "OpenAI",
        "place": "미국",
        "period": "GPT-2·GPT-3 연구 시기",
        "note": "연구를 이끌고 대규모 언어모형과 장기적 AI 안전을 다뤘다.",
        "sourceIds": [
          "amodei-hertz",
          "amodei-gpt2"
        ]
      },
      {
        "institutionId": "anthropic",
        "name": "Anthropic",
        "place": "미국",
        "period": "공동창업",
        "note": "신뢰성·해석 가능성·조절 가능한 AI를 연구하는 회사를 공동 설립했다.",
        "sourceIds": [
          "amodei-hertz"
        ]
      }
    ],
    "background": "물리학 박사 과정에서는 신경회로의 집단적 작동과 이를 측정하는 장치를 연구했다. 이후 Google Brain과 OpenAI를 거쳐 Anthropic을 공동 설립하며 딥러닝과 AI 안전 연구로 경력을 이어 갔다.",
    "backgroundSourceIds": [
      "amodei-hertz"
    ],
    "connections": [
      {
        "personId": "ilya-sutskever",
        "name": "Ilya Sutskever",
        "kind": "collaboration",
        "label": "GPT-2 공동연구",
        "description": "2019년 GPT-2 기술 보고서에 함께 저자로 참여했다.",
        "period": "2019년",
        "sourceIds": [
          "amodei-gpt2"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "jared-kaplan",
        "name": "Jared Kaplan",
        "kind": "cofounder",
        "label": "Anthropic 공동창업",
        "description": "Anthropic을 함께 설립하고 AI 연구와 개발을 이어 갔다.",
        "period": "Anthropic 설립",
        "sourceIds": [
          "amodei-hertz"
        ],
        "relation": "cofounded-with"
      }
    ],
    "sources": [
      {
        "id": "amodei-hertz",
        "title": "Hertz Foundation · Dario Amodei",
        "url": "https://www.hertzfoundation.org/people/dario-amodei/",
        "scope": "Stanford 학부·Princeton 물리 박사, 신경회로 연구, Google Brain·OpenAI 경력, Anthropic 및 Jared Kaplan 공동창업. 학위 연도는 이 자료에서 특정하지 않아 생략했다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "amodei-gpt2",
        "title": "OpenAI · Language Models are Unsupervised Multitask Learners",
        "url": "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
        "scope": "2019년 GPT-2 보고서 첫 쪽의 Dario Amodei·Ilya Sutskever 공동저자 명단.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "david-rumelhart",
    "origin": {
      "label": "출생",
      "text": "Wessington Springs, South Dakota, 미국",
      "sourceIds": [
        "stanford-obituary"
      ]
    },
    "education": [
      {
        "name": "University of South Dakota",
        "period": "1963",
        "detail": "심리학·수학 학사",
        "sourceIds": [
          "macarthur-profile",
          "cognitive-society"
        ]
      },
      {
        "name": "Stanford University",
        "period": "1967",
        "detail": "수리심리학 박사",
        "sourceIds": [
          "macarthur-profile",
          "cognitive-society"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "uc-san-diego",
        "name": "University of California, San Diego",
        "period": "1967–1987",
        "place": "La Jolla, California, 미국",
        "note": "심리학과에서 연구했고 Institute of Cognitive Science의 공동 설립에 참여했다. 역전파 원논문의 저자 소속에도 이 연구소가 적혀 있다.",
        "sourceIds": [
          "macarthur-profile",
          "nature-1986"
        ]
      },
      {
        "institutionId": "stanford-university",
        "name": "Stanford University",
        "period": "1987–1998",
        "place": "Stanford, California, 미국",
        "note": "심리학·인지 연구를 이어갔다. 기관 기록의 재직 시기와 연구 분야를 구분해 적었다.",
        "sourceIds": [
          "macarthur-profile",
          "stanford-obituary"
        ]
      }
    ],
    "background": "미국 사우스다코타의 Wessington Springs에서 태어나 심리학과 수학을 공부했다. 수리심리학 박사학위 뒤 UC San Diego에서 인간 인지의 계산 모형을 연구했고, 1987년 Stanford로 옮겼다. 규칙으로 미리 정한 기호만을 조작하는 설명에서, 신경 활동과 학습되는 연결의 상호작용으로 인지의 내부 표현을 설명하는 방향을 탐구했다.",
    "backgroundSourceIds": [
      "stanford-obituary",
      "macarthur-profile",
      "cognitive-society"
    ],
    "connections": [
      {
        "personId": "geoffrey-hinton",
        "name": "Geoffrey E. Hinton",
        "nameKo": "제프리 힌턴",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "역전파 공동 논문",
        "description": "Ronald J. Williams와 함께 1986년 Nature 논문 Learning representations by back-propagating errors를 발표했다. 세 공동저자의 연구이며 루멜하트나 힌턴의 단독 발명으로 설명하지 않는다.",
        "period": "1986",
        "sourceIds": [
          "nature-1986",
          "hinton-publications"
        ]
      },
      {
        "personId": "ronald-williams",
        "name": "Ronald J. Williams",
        "nameKo": "로널드 윌리엄스",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "역전파 공동 논문",
        "description": "Hinton과 함께 역전파의 미분·가중치 갱신과 내부 표현 학습을 설명한 1986년 논문의 공동저자다. 논문 표제의 소속은 Rumelhart·Williams가 UC San Diego, Hinton이 Carnegie Mellon이다.",
        "period": "1986",
        "sourceIds": [
          "nature-1986"
        ]
      }
    ],
    "sources": [
      {
        "id": "stanford-obituary",
        "title": "Stanford Report · David Rumelhart, pioneer in cognitive neuroscience, dies at68",
        "url": "https://news.stanford.edu/stories/2011/03/david-rumelhart-pioneer-cognitive-neuroscience-dies-68",
        "scope": "대학의2011년 추모 기사. 출생지·심리학과 수학 공부·1967년 박사·UCSD 진출·1987년 Stanford 이동과 McClelland의 공동연구 회고를 확인했다. 과거 경력과 기사의 인지 연구에 대한 설명을 구분해 읽는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "macarthur-profile",
        "title": "MacArthur Foundation · David Rumelhart",
        "url": "https://www.macfound.org/fellows/class-of-1987/david-rumelhart",
        "scope": "공식 수상자 전기의 학력 B.A.1963·Ph.D.1967, UCSD1967–1987·Stanford1987–1998, Institute of Cognitive Science 공동 설립을 확인했다. 과거 전기이며 현재 재직으로 표시하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "cognitive-society",
        "title": "Cognitive Science Society · Rumelhart Prize",
        "url": "https://cognitivesciencesociety.org/rumelhart-prize/",
        "scope": "학회의 공식 소개에서 심리학·수학 학사와 수리심리학 박사, 인지의 여러 계산 모형을 연구한 배경을 확인했다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "nature-1986",
        "title": "Rumelhart·Hinton·Williams · Learning representations by back-propagating errors",
        "url": "https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf",
        "scope": "원논문4면을 지면으로 대조했다. p.533 세 저자와 UCSD·Carnegie Mellon 소속, p.534 Fig.1 초기 범위·누적 갱신·1425회와 대칭 과제, pp.534–535 식(3)–(9), p.536 첫 문단의 생물학적 구분. 첫쪽 앞 논문과 마지막쪽 뒤 논문은 연구 내용에서 제외한다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "hinton-publications",
        "title": "Hinton · Backpropagation Learning 논문 목록",
        "url": "https://www.cs.toronto.edu/~hinton/backprop.html",
        "scope": "1986년 Nature 논문과 별도 PDP 장의 세 공동저자·서지를 확인했다. 두 저작을 같은 출판물로 합치지 않는다.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "daya-guo",
    "education": [
      {
        "name": "Sun Yat-sen University · 컴퓨터과학·기술 학사",
        "period": "2014–2018",
        "detail": "본인 홈페이지의 학사 학력 기록.",
        "sourceIds": [
          "personal-homepage"
        ]
      },
      {
        "name": "Sun Yat-sen University · 컴퓨터과학·기술 박사",
        "period": "2018–2023",
        "detail": "Microsoft Research Asia와의 공동 박사과정. 본인 소개는 Jian Yin·Ming Zhou의 지도를 명시한다.",
        "sourceIds": [
          "personal-homepage"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "sun-yat-sen-university",
        "name": "Sun Yat-sen University",
        "period": "2014–2023 · 학사·박사 과정",
        "place": "중국",
        "note": "자연어처리와 코드 지능을 연구했다. 출생지나 성장 지역을 학위기관 소재지에서 추정하지 않는다.",
        "sourceIds": [
          "personal-homepage"
        ]
      },
      {
        "institutionId": "microsoft-research-asia",
        "name": "Microsoft Research Asia · Natural Language Computing Group",
        "period": "2017–2023 · 연구 인턴·공동 박사과정",
        "place": "본인 홈페이지의 연구 경력",
        "note": "인턴 기간에는 Duyu Tang과 Nan Duan의 멘토링을 받았다고 기록한다. 박사 지도와 인턴 멘토링은 별개의 관계다.",
        "sourceIds": [
          "personal-homepage"
        ]
      },
      {
        "institutionId": "deepseek",
        "name": "DeepSeek · 코드 지능과 언어모델 추론",
        "period": "2023-07–2026-04 · 본인 경력 기록",
        "place": "2024–2025년 기술 보고서의 팀 연구",
        "note": "본인 홈페이지가 명시한 근무 기간이다. V3는 Research & Engineering, R1 첫 판은 Core Contributors로 기여 범위를 나누어 표기한다. 이 이력을 현재의 재직·직함으로 바꾸지 않는다.",
        "sourceIds": [
          "personal-homepage",
          "v3-report-v1",
          "r1-report-v1"
        ]
      }
    ],
    "background": "중산대학교에서 컴퓨터과학·기술 학사와 박사과정을 마쳤고, 박사과정은 Microsoft Research Asia와 공동으로 진행했다. 자연어와 프로그래밍 언어를 이해·생성하는 모델이 연구의 출발점이다. 본인 홈페이지는 DeepSeek에서 2023년 7월부터 2026년 4월까지 코드 지능과 언어모델 추론을 연구했다고 기록한다. V3의 연구·엔지니어링 기여와 R1 첫 판의 핵심 기여를 연결하되, 학습 체계 전체를 개인의 단독 성과로 표시하지 않는다.",
    "backgroundSourceIds": [
      "personal-homepage",
      "v3-report-v1",
      "r1-report-v1"
    ],
    "connections": [
      {
        "personId": "liang-wenfeng",
        "name": "Liang Wenfeng",
        "nameKo": "량원펑",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "DeepSeek-R1 팀 공동연구",
        "description": "R1의 2025년 1월 첫 보고서는 Daya Guo를 Core Contributors, Wenfeng Liang을 Contributors에 기재한다. 같은 보고서의 팀 기여 관계를 연결한다.",
        "period": "2025-01 · R1 v1",
        "sourceIds": [
          "r1-report-v1"
        ]
      },
      {
        "personId": "damai-dai",
        "name": "Damai Dai",
        "nameKo": "다마이 다이",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "V3·R1 팀 공동연구",
        "description": "V3의 Research & Engineering에는 두 사람이 함께 실려 있다. R1 첫 판에서는 Daya Guo가 핵심 기여자, Damai Dai가 기여자로 나뉜다. 공동연구 명단에서 개인별 방법의 발명 분담을 추정하지 않는다.",
        "period": "2024–2025 · 첫 기술 보고서",
        "sourceIds": [
          "v3-report-v1",
          "r1-report-v1"
        ]
      },
      {
        "personId": "zhihong-shao",
        "name": "Zhihong Shao",
        "nameKo": "사오즈훙",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "R1 핵심 기여자 공동연구",
        "description": "R1 첫 보고서 Appendix A의 Core Contributors에 Daya Guo와 Zhihong Shao가 함께 기재된다. 두 사람 사이의 지도·관리 관계를 뜻하지 않는다.",
        "period": "2025-01 · R1 v1",
        "sourceIds": [
          "r1-report-v1"
        ]
      }
    ],
    "sources": [
      {
        "id": "personal-homepage",
        "title": "Daya Guo · 본인 연구·학력·경력 소개",
        "url": "https://guoday.github.io/",
        "scope": "Introduction, Educations, Experiences를 직접 읽었다. SYSU 학사2014-08–2018-06·박사2018-08–2023-06, MSRA 공동과정과 Jian Yin·Ming Zhou 지도, 연구 인턴의 멘토링, DeepSeek 근무2023-07–2026-04 및 코드 지능·언어모델 추론 관심을 확인했다. 2026년 이후의 새 소속이나 출생지는 확인하지 않아 추가하지 않았다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "v3-report-v1",
        "title": "DeepSeek-AI · DeepSeek-V3 Technical Report · 2024 v1",
        "url": "https://arxiv.org/pdf/2412.19437v1#page=45",
        "scope": "2024-12-27 v1 PDF45쪽 Appendix A Research & Engineering에서 Daya Guo·Damai Dai·Wenfeng Liang을 확인했다. §2의 방법 설명은 기존 V3 상세 카드와 공유하며 기여 목록을 세부 발명 귀속으로 해석하지 않는다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "r1-report-v1",
        "title": "DeepSeek-AI · DeepSeek-R1 · 2025년 1월 v1",
        "url": "https://arxiv.org/pdf/2501.12948v1#page=20",
        "scope": "2025-01-22 v1 PDF20쪽 Appendix A에서 Daya Guo·Zhihong Shao의 Core Contributors와 Damai Dai의 Contributors, PDF21쪽의 Wenfeng Liang을 확인했다. §2.2–2.4의 Zero·최종R1·증류 구분은 기존 연구 카드와 공유한다. 후속 Nature·2026년 v2의 표기와 섞지 않는다.",
        "accessed": "2026-11-16"
      }
    ]
  },
  {
    "personId": "demis-hassabis",
    "origin": {
      "label": "출생",
      "text": "런던, 영국",
      "sourceIds": [
        "hassabis-nobel-facts"
      ]
    },
    "education": [
      {
        "name": "케임브리지대학교",
        "detail": "컴퓨터과학",
        "period": "학부 과정",
        "sourceIds": [
          "hassabis-royal-society"
        ]
      },
      {
        "name": "유니버시티칼리지런던(UCL)",
        "detail": "인지신경과학 박사 · 지도교수 Eleanor Maguire",
        "period": "박사 과정",
        "sourceIds": [
          "hassabis-ucl-bio",
          "hassabis-royal-society"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "ucl",
        "name": "UCL",
        "place": "런던, 영국",
        "period": "박사과정·박사후연구",
        "note": "기억·상상 연구와 Gatsby 계산신경과학 연구",
        "sourceIds": [
          "hassabis-ucl-bio"
        ]
      },
      {
        "institutionId": "deepmind",
        "name": "DeepMind",
        "place": "런던, 영국",
        "period": "2010년 공동 설립",
        "note": "신경과학·게임 개발 경험을 AI 연구와 연결",
        "sourceIds": [
          "hassabis-academia-cv",
          "hassabis-ucl-bio"
        ]
      }
    ],
    "background": "런던에서 성장하며 체스와 게임 개발을 경험했고, 케임브리지의 컴퓨터과학과 UCL의 인지신경과학을 거쳤다. 기억과 상상을 연구한 뒤 런던에 DeepMind를 공동 설립했다.",
    "backgroundSourceIds": [
      "hassabis-ucl-bio",
      "hassabis-royal-society",
      "hassabis-academia-cv"
    ],
    "connections": [
      {
        "personId": "eleanor-maguire",
        "name": "Eleanor Maguire",
        "kind": "advisor",
        "label": "박사 지도교수",
        "description": "UCL에서 기억과 상상의 신경 기반을 연구할 때 Hassabis를 지도했다.",
        "period": "UCL 박사과정",
        "sourceIds": [
          "hassabis-ucl-bio"
        ],
        "relation": "student-of"
      },
      {
        "personId": "john-jumper",
        "name": "John Jumper",
        "kind": "collaboration",
        "label": "AlphaFold 공동 연구",
        "description": "DeepMind에서 AlphaFold 개발을 함께 이끌었다.",
        "period": "AlphaFold 연구",
        "sourceIds": [
          "hassabis-ucl-bio"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "hassabis-nobel-facts",
        "title": "Nobel Prize · Demis Hassabis Facts, 2024",
        "url": "https://www.nobelprize.org/prizes/chemistry/2024/hassabis/facts/",
        "scope": "영국 런던 출생",
        "accessed": "2026-11-10"
      },
      {
        "id": "hassabis-ucl-bio",
        "title": "UCL · Demis Hassabis, AI and neuroscience trailblazer",
        "url": "https://www.ucl.ac.uk/about/search-faces-ucl/smart-tech-smarter-minds-demis-hassabis-ai-and-neuroscience-trailblazer",
        "scope": "런던성장·Maguire지도·Gatsby박사후연구·런던DeepMind설립·Jumper와AlphaFold공동연구",
        "accessed": "2026-11-10"
      },
      {
        "id": "hassabis-royal-society",
        "title": "Royal Society · Sir Demis Hassabis",
        "url": "https://royalsociety.org/people/demis-hassabis-13817/",
        "scope": "Cambridge컴퓨터과학·게임개발·UCL인지신경과학박사",
        "accessed": "2026-11-10"
      },
      {
        "id": "hassabis-academia-cv",
        "title": "Academia Europaea · Demis Hassabis 경력",
        "url": "https://www.ae-info.org/ae/Member/Hassabis_Demis",
        "scope": "2010년 DeepMind공동설립, 과거박사·박사후연구기간. 현재직함으로사용하지않음",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "donald-hebb",
    "origin": {
      "label": "출생",
      "text": "체스터, 노바스코샤, 캐나다",
      "sourceIds": [
        "mcgill-department"
      ]
    },
    "education": [
      {
        "name": "댈하우지대학교",
        "detail": "학사 · B.A.",
        "period": "1925",
        "sourceIds": [
          "mcgill-department"
        ]
      },
      {
        "name": "맥길대학교",
        "detail": "석사 · M.A.",
        "period": "1932",
        "sourceIds": [
          "mcgill-department"
        ]
      },
      {
        "name": "하버드대학교",
        "detail": "박사 · Karl Lashley의 지도로 연구",
        "period": "1936",
        "sourceIds": [
          "mcgill-department"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "montreal-neurological-institute",
        "name": "몬트리올 신경학연구소 · MNI",
        "place": "몬트리올, 캐나다",
        "period": "1937–1939",
        "note": "Wilder Penfield와 함께 뇌 손상이 지능과 행동에 미치는 영향을 연구했다.",
        "sourceIds": [
          "mcgill-department"
        ]
      },
      {
        "institutionId": "yerkes-laboratories-primate-biology",
        "name": "Yerkes Laboratories of Primate Biology",
        "place": "미국",
        "period": "1942–1947",
        "note": "Lashley의 초청으로 영장류 연구실에서 연구했다.",
        "sourceIds": [
          "mcgill-department"
        ]
      },
      {
        "institutionId": "mcgill-university",
        "name": "맥길대학교 심리학과",
        "place": "몬트리올, 캐나다",
        "period": "1947년부터 · 교수",
        "note": "신경계의 활동과 행동을 연결하는 연구·교육을 이어갔다. 1949년 저서의 표제에도 맥길 소속이 표시돼 있다.",
        "sourceIds": [
          "mcgill-department",
          "hebb-book"
        ]
      }
    ],
    "background": "캐나다 노바스코샤의 체스터에서 태어나 댈하우지·맥길·하버드에서 공부했다. 뇌 손상과 영장류 행동을 연구한 뒤 맥길에서 연구·교육을 이어가며, 1949년 저서에 신경세포의 변화로 학습과 기억을 설명하려는 가설을 정리했다.",
    "backgroundSourceIds": [
      "mcgill-department",
      "hebb-book"
    ],
    "connections": [
      {
        "personId": "frank-rosenblatt",
        "name": "Frank Rosenblatt",
        "nameKo": "프랭크 로젠블랫",
        "kind": "influence",
        "relation": "influenced",
        "label": "이론적 배경에 영향",
        "description": "로젠블랫은 1958년 논문에서 헵과 하이에크의 연구를 퍼셉트론 이론에 시사적인 배경으로 평가하고 신경계의 가소성에 관한 가정을 논의했다. 두 사람의 지도 관계나 같은 학습 알고리즘을 뜻하지 않는다.",
        "period": "1958년 논문의 논의",
        "sourceIds": [
          "rosenblatt-1958"
        ]
      }
    ],
    "sources": [
      {
        "id": "mcgill-department",
        "title": "McGill University Department of Psychology · About D.O. Hebb",
        "url": "https://www.mcgill.ca/psychology/events-colloquia/hebb-lecture-series/about-do-hebb",
        "scope": "Chudasama·Milner의 학과 전기. Chester 출생·성장, Dalhousie B.A.1925·McGill M.A.1932·Harvard Ph.D.1936, Lashley 지도, MNI1937–1939·Yerkes1942–1947·McGill 교수1947년 합류를 확인했다. 전기의 영향력에 대한 평가를 객관적 순위로 사용하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "hebb-book",
        "title": "Hebb (1949) · The Organization of Behavior · MPI 보관 원본",
        "url": "https://pure.mpg.de/rest/items/item_2346268_3/component/file_2346267/content",
        "scope": "1949년 John Wiley 원판 스캔. PDF1 표제·소속·연도, 인쇄 pp.61–63(PDF79–81) 활동 흔적·구조 변화와 가설의 지위, pp.72–74(PDF90–92) 세포집합, pp.99–100(PDF118–119) 단계적 활동과 부분 단서를 대조했다. 스캔 파일과 도판의 공개 재배포 허가는 확인하지 않았다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "rosenblatt-1958",
        "title": "Rosenblatt (1958) · The Perceptron",
        "url": "https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf#page=3",
        "scope": "인쇄 p.388(PDF3)의 Hebb·Hayek에 대한 직접 평가와 가소성 가정을 확인했다. 기존 이론의 형식적 정확성과 분석의 엄밀성에 대한 비판도 함께 읽는다. 영향의 인정이 헵의 가설·퍼셉트론 학습법의 동일성이나 지도 관계를 입증하지는 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "dov-gabbay",
    "origin": null,
    "education": [],
    "researchPlaces": [
      {
        "institutionId": "kings-college-london",
        "name": "King’s College London · Department of Informatics",
        "place": "런던, 영국",
        "period": "공식 소개 확인: 2026-11-11",
        "note": "컴퓨터과학 명예교수. 논리 체계·양상 논리·시간 논리·AI 연구.",
        "sourceIds": [
          "gabbay-kcl",
          "gabbay-research"
        ]
      }
    ],
    "background": "King’s College London의 논리와 계산 분야에서 연구했으며 공식 소개는 양상·시간 논리와 AI를 주요 관심으로 제시한다. 신경 기호 공동저서에서는 서로 다른 논리의 구조와 학습 모형을 연결했다.",
    "backgroundSourceIds": [
      "gabbay-kcl",
      "gabbay-research",
      "cognitive-publisher"
    ],
    "connections": [
      {
        "personId": "artur-garcez",
        "name": "Artur d’Avila Garcez",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "신경 기호 연구 공동저자",
        "description": "Garcez·Lamb·Gabbay의 Neural-Symbolic Cognitive Reasoning을 공동 집필했다.",
        "period": "2008년 발행 · ©2009",
        "sourceIds": [
          "cognitive-publisher"
        ]
      },
      {
        "personId": "luis-c-lamb",
        "name": "Luís C. Lamb",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "신경 기호 연구 공동저자",
        "description": "논리적 추론과 신경 모형의 결합을 다룬 공동저서의 저자다.",
        "period": "2008년 발행 · ©2009",
        "sourceIds": [
          "cognitive-publisher"
        ]
      }
    ],
    "sources": [
      {
        "id": "gabbay-kcl",
        "title": "King’s College London · Dov Gabbay 공식 소개",
        "url": "https://www.kcl.ac.uk/people/dov-gabbay",
        "scope": "명예교수·소속 및 논리 체계·양상/시간 논리·AI 연구 관심.",
        "accessed": "2026-11-11"
      },
      {
        "id": "gabbay-research",
        "title": "King’s College London · 연구자 프로필",
        "url": "https://kclpure.kcl.ac.uk/portal/en/persons/dov-gabbay/",
        "scope": "Logic and computation 연구그룹과 연구 관심. 열람하지 않은 학력이나 출생 정보를 추정하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "cognitive-publisher",
        "title": "Springer · Neural-Symbolic Cognitive Reasoning",
        "url": "https://link.springer.com/book/10.1007/978-3-540-73246-4",
        "scope": "세 공동저자와 소속·전자책/양장 발행일·저작권 연도 구분.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "edward-feigenbaum",
    "origin": {
      "label": "출생",
      "text": "위호큰, 뉴저지, 미국",
      "sourceIds": [
        "stanford-cv",
        "chm-biography"
      ]
    },
    "education": [
      {
        "name": "Carnegie Institute of Technology · 현재 Carnegie Mellon University",
        "detail": "전기공학 학사 · B.S.",
        "period": "1956",
        "sourceIds": [
          "stanford-cv"
        ]
      },
      {
        "name": "Carnegie Institute of Technology · Graduate School of Industrial Administration",
        "detail": "박사 · 인간의 언어 학습을 프로그램으로 설명한 EPAM 연구",
        "period": "1960년 9월 학위 · 1959년 8월 논문 원고",
        "sourceIds": [
          "stanford-cv",
          "thesis-1959",
          "chm-biography"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "carnegie-mellon-university",
        "name": "Carnegie Institute of Technology · GSIA",
        "period": "1959년 학위논문 · 1960년 박사학위",
        "place": "피츠버그, 펜실베이니아, 미국",
        "note": "사이먼의 지도로 인간의 학습을 정보 처리 과정으로 설명하는 EPAM을 연구했다. 학위논문 서문은 뉴얼과 사이먼의 초기 발상과 모형의 구성·구현에 대한 도움을 함께 밝힌다.",
        "sourceIds": [
          "stanford-cv",
          "chm-biography",
          "cmu-honorary-2025",
          "thesis-1959"
        ]
      },
      {
        "institutionId": "university-of-california-berkeley",
        "name": "University of California, Berkeley · 캘리포니아대학교 버클리",
        "period": "1960–1965",
        "place": "버클리, 캘리포니아, 미국",
        "note": "School of Business Administration에서 재직했다. 1961–1964년에는 Center for Human Learning의 연구 경력도 이력서에 기록되어 있다.",
        "sourceIds": [
          "stanford-cv"
        ]
      },
      {
        "institutionId": "stanford-university",
        "name": "Stanford University · Heuristic Programming Project / Knowledge Systems Laboratory",
        "period": "1965년 합류 · 1977년 논문 소속",
        "place": "스탠퍼드, 캘리포니아, 미국",
        "note": "1965년 컴퓨터과학 교수진에 합류해 DENDRAL과 지식 기반 AI 연구를 시작했다. 1977년 IJCAI 회고에서는 HPP의 여러 사례로 전문 지식의 획득·표현·추론·설명을 논의했다.",
        "sourceIds": [
          "stanford-cv",
          "chm-biography",
          "expert-systems-1977"
        ]
      }
    ],
    "background": "뉴저지 위호큰에서 태어나 Carnegie에서 전기공학을 공부한 뒤, 사이먼의 지도 아래 인간의 학습을 프로그램으로 설명하는 박사 연구를 수행했다. 버클리를 거쳐 1965년 Stanford에 합류했고, 화학과 의학의 전문가들이 사용하는 지식을 컴퓨터가 다룰 수 있게 만드는 연구로 이어갔다.",
    "backgroundSourceIds": [
      "stanford-cv",
      "chm-biography",
      "cmu-honorary-2025",
      "thesis-1959",
      "expert-systems-1977"
    ],
    "connections": [
      {
        "personId": "herbert-simon",
        "name": "Herbert A. Simon",
        "nameKo": "허버트 사이먼",
        "kind": "advisor",
        "relation": "student-of",
        "label": "EPAM 박사 연구 지도",
        "description": "파이겐바움은 사이먼의 지도로 인간의 언어 학습을 정보 처리 프로그램으로 설명하는 박사 연구를 수행했다. 1959년 학위논문 서문에서는 뉴얼·사이먼이 EPAM의 초기 아이디어를 제안했으며, 두 사람이 모형의 구성과 구현을 도왔다고 밝혔다.",
        "period": "1959년 논문 원고 · 1960년 박사학위",
        "sourceIds": [
          "chm-biography",
          "cmu-honorary-2025",
          "thesis-1959",
          "stanford-cv"
        ]
      }
    ],
    "sources": [
      {
        "id": "stanford-cv",
        "title": "Stanford · Edward Feigenbaum · 이력서",
        "url": "https://cs.stanford.edu/people/eaf/cv.html",
        "scope": "Born·Education·Professional Experience·Books and Monographs 항목을 읽었다. Weehawken 출생, 1956년 전기공학 학사, 1960년 9월 GSIA 박사, Berkeley 1960–1965년 경력과 Stanford 1965년 합류를 확인했다. 학위의 전공명을 대학원 이름에서 추정하지 않았다. 작성 시점이 다른 present 표기는 현재 재직 기간으로 확장하지 않고 역사적 경력만 사용했다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "chm-biography",
        "title": "Computer History Museum · Edward Feigenbaum · 2012 Fellow 전기",
        "url": "https://computerhistory.org/profile/edward-feigenbaum/?alias=bio&person=edward-feigenbaum",
        "scope": "인물 전기 본문을 읽었다. 박사논문을 Herb Simon이 지도했다는 직접 서술, 인간 학습의 컴퓨터 모형이라는 연구 대상, Stanford 1965년 합류와 같은 해 Lederberg와의 DENDRAL 시작을 확인했다. 전문가 지식의 역할에 관한 소개는 1977년 본문과 대조했으며, 우선권을 주장하는 수식어는 카드에 옮기지 않았다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "cmu-honorary-2025",
        "title": "Carnegie Mellon · 2025 명예학위 수여자 소개 · Edward Feigenbaum 절",
        "url": "https://news.pantheon.cmu.edu/stories/archives/2025/april/carnegie-mellon-university-announces-2025-honorary-degree-recipients",
        "scope": "2025년 4월 2일 공식 기사 중 Edward Feigenbaum 절을 읽었다. 학사·박사 학력과 Simon의 지도로 EPAM을 학위논문에서 개발했다는 서술을 확인했다. 이 기사의 2025년 명예학위는 1960년 정규 박사학위와 구분하며, 학력 항목에 추가하지 않았다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "thesis-1959",
        "title": "Feigenbaum · An Information Processing Theory of Verbal Learning · 1959 학위논문 제출본",
        "url": "https://purl.stanford.edu/ng900rn4022",
        "scope": "Stanford Digital Repository의 188쪽 보존본을 확인하고, PDF 2쪽 표제·3쪽 서문·5–8쪽 서론을 읽었다. 표제의 August 1959·GSIA 학위논문, 서문의 Newell·Simon 공헌, 학습·기억을 정보 처리 프로그램으로 연구하려는 목적을 확인했다. 표제·서문·서론의 지면도 대조했다. 1959년 원고 날짜와 CV의 1960년 9월 학위 취득을 구분하며, 전체 실험·프로그램을 재검증한 것으로 확대하지 않는다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "expert-systems-1977",
        "title": "Feigenbaum (1977) · The Art of Artificial Intelligence · IJCAI 원문",
        "url": "https://ijcai.org/proceedings/1977/0231.pdf",
        "scope": "PDF 1–5쪽, 인쇄 1014–1018쪽의 초록·PUFF 도입·2절·2.1–2.2절·3절의 공통 주제를 읽었다. 지능적 프로그램이 전문 지식을 표현·활용하도록 하려는 질문, 지식 획득과 추론 과정의 설명, Stanford HPP 연구 환경을 확인했다. 1016쪽의 지면을 대조했다. 전문 지식의 역할은 이 회고가 제시한 연구 관점으로 설명하며 모든 AI에 대한 보편적 성능 법칙으로 일반화하지 않는다.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "elon-musk",
    "origin": {
      "label": "성장",
      "text": "남아프리카공화국",
      "sourceIds": [
        "musk-aps"
      ]
    },
    "education": [
      {
        "name": "퀸스대학교",
        "detail": "캐나다에서 재학한 뒤 Penn으로 편입",
        "period": "",
        "sourceIds": [
          "musk-wharton"
        ]
      },
      {
        "name": "펜실베이니아대학교",
        "detail": "물리학·경제학 학부 학위",
        "period": "1997년 학위",
        "sourceIds": [
          "musk-wharton",
          "musk-aps"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "spacex",
        "name": "SpaceX",
        "place": "미국",
        "period": "창업·설계 경력",
        "note": "우주 발사체 기업을 설립했다.",
        "sourceIds": [
          "musk-wharton",
          "musk-aps"
        ]
      },
      {
        "institutionId": "tesla",
        "name": "Tesla",
        "place": "미국",
        "period": "2009년 기록",
        "note": "전기자동차 기업의 경영·설계를 맡은 경력을 소개했다.",
        "sourceIds": [
          "musk-wharton"
        ]
      },
      {
        "institutionId": "openai",
        "name": "OpenAI",
        "place": "미국",
        "period": "2015년 설립 발표",
        "note": "초기 조직의 공동의장·후원자로 발표됐다.",
        "sourceIds": [
          "musk-openai"
        ]
      }
    ],
    "background": "남아프리카공화국에서 성장한 뒤 캐나다로 옮겼고, Penn에서 물리학과 경제학을 공부했다. 여기서는 SpaceX·Tesla의 창업·설계·경영과 OpenAI 초기 조직 참여라는 산업적 경로를 함께 읽는다.",
    "backgroundSourceIds": [
      "musk-aps",
      "musk-wharton",
      "musk-openai"
    ],
    "connections": [
      {
        "personId": "sam-altman",
        "name": "Sam Altman",
        "kind": "institution",
        "label": "OpenAI 초기 공동의장",
        "description": "2015년 공식 설립 발표는 Musk와 Altman을 공동의장으로 명시한다. 논문 공동저자 관계를 뜻하지 않는다.",
        "period": "2015년",
        "sourceIds": [
          "musk-openai"
        ],
        "relation": "shared-institution-with"
      }
    ],
    "sources": [
      {
        "id": "musk-aps",
        "title": "American Physical Society · Profiles in Versatility",
        "url": "https://www.aps.org/apsnews/2013/10/profiles-in-versatility",
        "scope": "2013년 본인 인터뷰의 남아공 성장 배경과 물리학·경제학 학업. 출생 도시를 이 인터뷰에서 확인하지 않아 성장 국가로 적었다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "musk-wharton",
        "title": "Knowledge at Wharton · Musk의 Penn 강연과 학업 경로",
        "url": "https://knowledge.wharton.upenn.edu/article/harnessing-the-sun-and-outer-space-elon-musks-sky-high-vision/",
        "scope": "Queen's→Penn, 물리학·학부 경영학 학위, 1995년 학교를 떠난 때와 1997년 학위 수여 구분, 2009년 당시 SpaceX·Tesla 경력.",
        "accessed": "2026-11-10"
      },
      {
        "id": "musk-openai",
        "title": "OpenAI · Introducing OpenAI (2015)",
        "url": "https://openai.com/index/introducing-openai/",
        "scope": "Musk·Altman의 초기 공동의장과 후원자 역할. 현재 직책이나 기술 논문 공동연구로 확대하지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "fei-fei-li",
    "origin": {
      "label": "출생",
      "text": "베이징, 중국 · 청두에서 성장",
      "sourceIds": [
        "li-personal-bio"
      ]
    },
    "education": [
      {
        "name": "프린스턴대학교",
        "detail": "물리학 학사",
        "period": "1999",
        "sourceIds": [
          "li-stanford-profile"
        ]
      },
      {
        "name": "캘리포니아공과대학교(Caltech)",
        "detail": "전기공학 박사",
        "period": "2005",
        "sourceIds": [
          "li-stanford-profile"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "california-institute-of-technology",
        "name": "Caltech",
        "place": "패서디나, 미국",
        "period": "박사과정",
        "note": "Pietro Perona·Christof Koch의 지도로 컴퓨터비전·신경과학을 연구",
        "sourceIds": [
          "li-personal-bio",
          "li-stanford-memoir"
        ]
      },
      {
        "institutionId": "stanford",
        "name": "스탠퍼드대학교",
        "place": "스탠퍼드, 미국",
        "period": "2013–2018",
        "note": "Stanford AI Lab 소장을 맡았다",
        "sourceIds": [
          "li-stanford-profile"
        ]
      },
      {
        "institutionId": "google-cloud",
        "name": "Google Cloud",
        "place": "기업 연구",
        "period": "2017–2018",
        "note": "AI·머신러닝 수석과학자로 일했다",
        "sourceIds": [
          "li-stanford-profile"
        ]
      },
      {
        "institutionId": "world-labs",
        "name": "World Labs · 공간 지능 연구·제품",
        "place": "기업 연구·공동설립팀",
        "period": "2024–2026 · 공동설립과 Atlas 공개 기록",
        "note": "공식 소개는 리와 Justin Johnson·Ben Mildenhall·Christoph Lassner를 공동설립팀으로 명시한다. 2026년 Atlas의 공간 문맥·새 시점 생성·도구 공개는 World Labs Team 명의로 발표됐다.",
        "sourceIds": [
          "li-worldlabs-about-2026",
          "li-atlas-structure-2026",
          "li-atlas-release-2026"
        ]
      }
    ],
    "background": "중국 베이징에서 태어나 청두에서 성장한 뒤 가족과 미국으로 이주했다. 프린스턴에서 물리학을 공부하고 Caltech 박사과정에서 컴퓨터비전·신경과학으로 관심을 넓혔다.",
    "backgroundSourceIds": [
      "li-personal-bio",
      "li-stanford-memoir"
    ],
    "connections": [
      {
        "personId": "pietro-perona",
        "name": "Pietro Perona",
        "kind": "advisor",
        "label": "박사 지도교수",
        "description": "Caltech에서 Christof Koch와 함께 Li의 박사과정을 지도했다.",
        "period": "2005년 박사학위",
        "sourceIds": [
          "li-personal-bio"
        ],
        "relation": "student-of"
      },
      {
        "personId": "jia-deng",
        "name": "Jia Deng",
        "kind": "collaboration",
        "label": "ImageNet 공동저자",
        "description": "2009년 ImageNet 논문의 공동저자다.",
        "period": "2009",
        "sourceIds": [
          "li-stanford-profile"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "li-personal-bio",
        "title": "Fei-Fei Li · Stanford 보관 개인 전기",
        "url": "https://cs.stanford.edu/people/feifeili/Bio.htm",
        "scope": "베이징 출생·청두 성장·미국이주·Princeton물리학·Caltech2005·지도교수Perona와Koch. 오래된현재직함은사용하지않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "li-stanford-profile",
        "title": "Stanford Profiles · Fei-Fei Li",
        "url": "https://profiles.stanford.edu/fei-fei-li",
        "scope": "Princeton1999·Caltech전기공학박사2005·SAIL소장2013–2018·GoogleCloud2017–2018·ImageNet2009공동저자목록",
        "accessed": "2026-11-10"
      },
      {
        "id": "li-stanford-memoir",
        "title": "Stanford HAI · Fei-Fei Li의 회고록 인터뷰",
        "url": "https://hai.stanford.edu/news/fei-fei-li-candid-look-young-immigrants-rise-ai-trailblazer",
        "scope": "물리학에서 Caltech 컴퓨터비전·신경과학으로 관심이 이어진 배경",
        "accessed": "2026-11-10"
      },
      {
        "id": "li-worldlabs-about-2026",
        "title": "World Labs · About Us",
        "url": "https://worldlabs.ai/about",
        "scope": "네 명의 공동설립자와 공간 지능 연구·제품 방향. 현재 역할의 세부 직함이나 조건부 거래의 완료를 추정하지 않음.",
        "accessed": "2026-11-15"
      },
      {
        "id": "li-atlas-structure-2026",
        "title": "World Labs Team · Atlas 구조 설명",
        "url": "https://worldlabs.ai/blog/atlas",
        "scope": "2026-09-01 기술 글 현재판. 공간 문맥·이미지·카메라·깊이·자기회귀 확산Transformer 구조 설명. 회사 팀의 발표로 귀속.",
        "accessed": "2026-11-15"
      },
      {
        "id": "li-atlas-release-2026",
        "title": "World Labs · 연구·공개 기록과 Atlas",
        "url": "https://worldlabs.ai/blog",
        "scope": "2026-11-12 Atlas 공개 날짜와 제품·도구 페이지로 이어지는 항목. 11-05 Frameboy 연구 미리보기와 구분.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "frank-rosenblatt",
    "origin": {
      "label": "성장",
      "text": "뉴로셸, 뉴욕주, 미국",
      "sourceIds": [
        "cornell"
      ]
    },
    "education": [
      {
        "name": "코넬대학교",
        "detail": "사회심리학을 전공하고 심리학 박사 과정을 마쳤다.",
        "period": "1950년 학사 · 1956년 박사",
        "sourceIds": [
          "cornell"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "cornell-aeronautical-laboratory",
        "name": "코넬항공연구소 · CAL",
        "place": "버펄로, 뉴욕주, 미국",
        "period": "1958년 논문 당시",
        "note": "연구심리학자이자 프로젝트 엔지니어로 퍼셉트론을 연구했다.",
        "sourceIds": [
          "cornell",
          "paper"
        ]
      },
      {
        "institutionId": "cornell-university",
        "name": "코넬대학교 인지시스템 연구 프로그램",
        "place": "이타카, 뉴욕주, 미국",
        "period": "1959년부터",
        "note": "프로그램 책임자와 심리학 강사로 연구를 이어갔다.",
        "sourceIds": [
          "cornell"
        ]
      }
    ],
    "background": "뉴욕주 뉴로셸에서 자랐고 코넬에서 심리학을 공부했다. 버펄로의 코넬항공연구소에서 퍼셉트론을 연구한 뒤, 1959년 이타카 캠퍼스로 옮겨 인지시스템 연구와 학생 지도를 이어갔다.",
    "backgroundSourceIds": [
      "cornell",
      "paper"
    ],
    "connections": [
      {
        "personId": "donald-hebb",
        "name": "Donald O. Hebb",
        "nameKo": "도널드 헵",
        "kind": "influence",
        "label": "이론적 배경",
        "description": "1958년 논문은 헵의 세포집합 관점을 다루며, 헵과 하이에크의 연구가 이 이론의 발상에 도움을 주었다고 설명한다.",
        "period": "1958년 논문의 논의",
        "sourceIds": [
          "paper"
        ],
        "relation": "influenced-by"
      },
      {
        "personId": "marvin-minsky",
        "name": "Marvin Minsky",
        "nameKo": "마빈 민스키",
        "kind": "debate",
        "label": "연구상 논쟁",
        "description": "퍼셉트론의 가능성을 두고 학술회의에서 공개 토론했다.",
        "period": "퍼셉트론 연구를 둘러싼 토론",
        "sourceIds": [
          "cornell"
        ],
        "relation": "debated-with"
      }
    ],
    "sources": [
      {
        "id": "cornell",
        "title": "Cornell University · Professor’s perceptron paved the way for AI",
        "url": "https://as.cornell.edu/news/professors-perceptron-paved-way-ai-60-years-too-soon",
        "scope": "출생·성장과 코넬 학위, CAL·1959년 이타카 합류, Minsky vs. Rosenblatt 절의 공개 토론 증언. 기사 전체의 AI 역사 해석을 그대로 옮기지는 않았다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "paper",
        "title": "Rosenblatt(1958) · The Perceptron",
        "url": "https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf#page=3",
        "scope": "p.386 소속·연구 지원, pp.386–388 기억·연합의 관점과 Hebb·Hayek에 관한 직접 논의.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "geoffrey-hinton",
    "origin": {
      "label": "출생",
      "text": "런던, 영국",
      "sourceIds": [
        "hinton-nobel-facts"
      ]
    },
    "education": [
      {
        "name": "케임브리지대학교",
        "detail": "실험심리학 학사",
        "period": "1970",
        "sourceIds": [
          "hinton-personal-bio"
        ]
      },
      {
        "name": "에든버러대학교",
        "detail": "인공지능 박사",
        "period": "1978",
        "sourceIds": [
          "hinton-personal-bio"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-toronto",
        "name": "토론토대학교",
        "place": "토론토, 캐나다",
        "period": "1987년 합류",
        "note": "CIFAR와 연결된 신경망 연구·대학원 교육",
        "sourceIds": [
          "hinton-ucl-bio"
        ]
      },
      {
        "institutionId": "ucl-gatsby",
        "name": "UCL Gatsby Computational Neuroscience Unit",
        "place": "런던, 영국",
        "period": "1998–2001",
        "note": "계산신경과학 연구 조직을 설립했다",
        "sourceIds": [
          "hinton-personal-bio"
        ]
      },
      {
        "institutionId": "google",
        "name": "Google",
        "place": "기업 연구",
        "period": "2013–2023",
        "note": "토론토대 연구와 병행한 반일제 기업 연구 경력",
        "sourceIds": [
          "hinton-personal-bio"
        ]
      }
    ],
    "background": "런던에서 태어나 케임브리지에서는 실험심리학을, 에든버러에서는 인공지능을 공부했다. 영국·미국의 연구기관을 거쳐 토론토로 옮겼고, UCL에서는 계산신경과학 연구 조직을 세웠다.",
    "backgroundSourceIds": [
      "hinton-nobel-facts",
      "hinton-personal-bio",
      "hinton-ucl-bio"
    ],
    "connections": [
      {
        "personId": "david-rumelhart",
        "name": "David E. Rumelhart",
        "kind": "collaboration",
        "label": "공동 논문",
        "description": "Ronald J. Williams와 함께 1986년 역전파 논문을 썼다.",
        "period": "1986",
        "sourceIds": [
          "hinton-backprop-list"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "ilya-sutskever",
        "name": "Ilya Sutskever",
        "kind": "advisor",
        "label": "지도한 연구자",
        "description": "토론토대학교에서 Sutskever의 박사과정을 지도했다.",
        "period": "박사과정",
        "sourceIds": [
          "hinton-sutskever-utoronto"
        ],
        "relation": "advised"
      }
    ],
    "sources": [
      {
        "id": "hinton-nobel-facts",
        "title": "Nobel Prize · Geoffrey Hinton Facts, 2024",
        "url": "https://www.nobelprize.org/prizes/physics/2024/hinton/facts/",
        "scope": "영국 런던 출생과 수상 당시 토론토대 소속",
        "accessed": "2026-11-10"
      },
      {
        "id": "hinton-personal-bio",
        "title": "Geoffrey Hinton · 토론토대학교 개인 약력",
        "url": "https://www.cs.toronto.edu/~hinton/index.html",
        "scope": "학위·영미권 박사후연구·CMU 경력·UCL1998–2001·Google2013–2023 반일제 경력",
        "accessed": "2026-11-10"
      },
      {
        "id": "hinton-ucl-bio",
        "title": "UCL · Intelligent futures: Geoffrey Hinton",
        "url": "https://www.ucl.ac.uk/about/search-faces-ucl/intelligent-futures-geoffrey-hinton-godfather-turned-critic-ai",
        "scope": "1987년 토론토대 이동과 UCL Gatsby 설립 책임자 경력",
        "accessed": "2026-11-10"
      },
      {
        "id": "hinton-backprop-list",
        "title": "Hinton · Backpropagation Learning 논문 목록",
        "url": "https://www.cs.toronto.edu/~hinton/backprop.html",
        "scope": "1986년 Nature 논문의 Rumelhart·Hinton·Williams 공동저자 서지",
        "accessed": "2026-11-10"
      },
      {
        "id": "hinton-sutskever-utoronto",
        "title": "University of Toronto · Ilya Sutskever 명예학위 소개",
        "url": "https://www.utoronto.ca/news/ilya-sutskever-leader-ai-and-its-responsible-development-receives-u-t-honorary-degree",
        "scope": "Hinton이 Sutskever의 박사 지도교수였다는 관계",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "herbert-simon",
    "origin": {
      "label": "출생",
      "text": "밀워키, 위스콘신, 미국",
      "sourceIds": [
        "cmu-simon-cv"
      ]
    },
    "education": [
      {
        "name": "University of Chicago · 시카고대학교",
        "detail": "정치학 학사 · A.B.",
        "period": "1936",
        "sourceIds": [
          "cmu-simon-cv"
        ]
      },
      {
        "name": "University of Chicago · 시카고대학교",
        "detail": "정치학 박사 · Ph.D.",
        "period": "1943",
        "sourceIds": [
          "cmu-simon-cv"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-california-berkeley",
        "name": "University of California, Berkeley · Bureau of Public Administration",
        "period": "1939–1942",
        "place": "버클리, 캘리포니아, 미국",
        "note": "Administrative Measurement Studies를 이끌며 행정에 관한 연구를 수행했다. 이후의 의사결정·문제 해결 연구에 앞선 연구 경력이다.",
        "sourceIds": [
          "cmu-simon-cv"
        ]
      },
      {
        "institutionId": "illinois-institute-of-technology",
        "name": "Illinois Institute of Technology · 일리노이 공과대학교",
        "period": "1942–1949",
        "place": "시카고, 일리노이, 미국",
        "note": "정치학 교수로 재직하며 1946–1949년에는 Department of Political and Social Science의 학과장을 맡았다.",
        "sourceIds": [
          "cmu-simon-cv"
        ]
      },
      {
        "institutionId": "carnegie-mellon-university",
        "name": "Carnegie Institute of Technology → Carnegie Mellon University",
        "period": "1949–2001",
        "place": "피츠버그, 펜실베이니아, 미국",
        "note": "Graduate School of Industrial Administration 설립에 참여했다. 인간의 의사결정과 문제 해결을 연구하며 뉴얼과 기호 처리 연구를 이어갔다.",
        "sourceIds": [
          "cmu-simon-cv",
          "cmu-tepper-simon",
          "lt-1957"
        ]
      },
      {
        "institutionId": "rand-corporation",
        "name": "RAND Corporation · RAND 연구소",
        "period": "1952–1976 · 자문",
        "place": "샌타모니카, 캘리포니아, 미국",
        "note": "Carnegie 재직 중 RAND의 자문으로도 활동했다. RAND 연구원이던 뉴얼·Shaw와 문제 해결 연구를 함께 수행했다.",
        "sourceIds": [
          "cmu-simon-cv"
        ]
      }
    ],
    "background": "밀워키에서 태어나 시카고대학교에서 정치학을 공부했다. 행정·경제·심리학과 컴퓨터과학을 오가며 인간이 어떻게 결정하고 문제를 푸는지 연구했다. Carnegie에서의 연구와 RAND 자문을 통해 뉴얼·Shaw와 협력했고, 문제 해결 과정을 구체적인 프로그램으로 적어 그 행동을 조사하는 연구로 이어갔다.",
    "backgroundSourceIds": [
      "cmu-simon-cv",
      "cmu-tepper-simon",
      "lt-1956",
      "lt-1957"
    ],
    "connections": [
      {
        "personId": "allen-newell",
        "name": "Allen Newell",
        "nameKo": "앨런 뉴얼",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "기호 처리·문제 해결 공동연구",
        "description": "1956년 Logic Theory Machine 명세를 함께 저술했다. 원문은 J. C. Shaw의 공동 작업과 컴퓨터 실현 공헌도 명시하며, 1957년 보고는 세 사람이 함께 JOHNNIAC 실행 자료를 연구한 기록이다. 이후 GPS와 Human Problem Solving으로 이어진 협력을 공동연구 관계로 표시한다.",
        "period": "1956–1972년의 공동 연구·저술",
        "sourceIds": [
          "lt-1956",
          "lt-1957",
          "cmu-newell-archives"
        ]
      }
    ],
    "sources": [
      {
        "id": "cmu-simon-cv",
        "title": "Carnegie Mellon University Archives · Herbert A. Simon · 이력서와 연구 소개",
        "url": "https://iiif.library.cmu.edu/file/Simon_box00087_fld07004_bdl0001_doc0001/Simon_box00087_fld07004_bdl0001_doc0001.pdf",
        "scope": "CMU 보관 16쪽 자료의 PDF 1쪽 Education·출생지, 3쪽 Professional Career·RAND 자문, 16쪽 연구 소개를 본문과 지면으로 대조했다. 정치학 학사 1936년·박사 1943년, Berkeley 1939–1942년·IIT 1942–1949년·Carnegie 1949년 합류, RAND Consultant 1952–1976년을 확인했다. 명예학위는 정규 학력으로 추가하지 않았으며, 이력서 작성 당시의 present를 현재 직책으로 옮기지 않았다. 자료 전체의 논문 목록을 검토한 것으로 표시하지 않는다.",
        "accessed": "2026-11-13"
      },
      {
        "id": "cmu-tepper-simon",
        "title": "Carnegie Mellon · Tepper School of Business · Nobel Laureates · Herbert Simon",
        "url": "https://www.cmu.edu/tepper/about/nobel-laureates",
        "scope": "CMU Tepper의 Herbert Simon 절 본문을 읽었다. 1949년 GSIA 설립 참여와 2001년까지의 Carnegie 재직, 인간 의사결정에 대한 연구, 정보 수집과 계산의 제약을 다루는 관점, 뉴얼과 컴퓨터 프로그램으로 문제 해결을 연구하려 했다는 회고를 확인했다. 이 설명은 CMU 공식 전기를 확인한 범위이며 개별 수상 자료나 전체 연구 업적의 검토로 확대하지 않는다.",
        "accessed": "2026-11-13"
      },
      {
        "id": "cmu-newell-archives",
        "title": "Carnegie Mellon University Archives · Allen Newell Papers · Biographical Notes",
        "url": "https://findingaids.library.cmu.edu/repositories/2/resources/202",
        "scope": "공식 소장목록 Biographical Notes 본문에서 Newell·Simon·Shaw의 Logic Theorist 및 GPS 연구, Newell·Simon의 Human Problem Solving 공동저술 1972년을 확인했다. 소장목록의 전기를 읽은 범위이며 개별 공동연구 자료 전체의 검토로 확대하지 않는다. 공동연구를 지도 관계로 바꾸지 않았다.",
        "accessed": "2026-11-13"
      },
      {
        "id": "lt-1956",
        "title": "Newell·Simon (1956) · The Logic Theory Machine · RAND P-868",
        "url": "https://iiif.library.cmu.edu/file/Simon_box00006_fld00406_bdl0001_doc0001/Simon_box00006_fld00406_bdl0001_doc0001.pdf#page=2",
        "scope": "인쇄 p.1 / PDF 2쪽의 저자·공동 소속, 휴리스틱 증명 탐색을 명세하는 연구 목적과 J. C. Shaw의 공동 작업·컴퓨터 실현을 명시한 각주를 지면으로 대조했다. 인쇄 pp.7·25·30·45의 추출 본문으로 기호 기억, 공리와 추론 규칙, 유사한 후보 선택과 매칭, 중간 문제와 정리 저장을 읽었다. 1956년 명세와 후속 컴퓨터 실행 보고를 구분하며, 알고리즘별 개인의 단독 공헌을 추정하지 않는다.",
        "accessed": "2026-11-13"
      },
      {
        "id": "lt-1957",
        "title": "Newell·Shaw·Simon (1957) · Empirical Explorations of the Logic Theory Machine",
        "url": "https://iiif.library.cmu.edu/file/Newell_box00028_fld01976_doc0005/Newell_box00028_fld01976_doc0005.pdf#page=2",
        "scope": "CMU 보관 부분본의 표지와 인쇄 p.218 / PDF 2쪽에서 세 공동저자, Newell·Shaw의 RAND 및 Simon의 Carnegie Institute of Technology 소속, JOHNNIAC에서 얻은 실행 자료로 문제 해결 과정을 조사한 연구 목적을 본문과 지면으로 대조했다. 부분본을 전체 논문 검토로 표시하지 않는다.",
        "accessed": "2026-11-13"
      }
    ]
  },
  {
    "personId": "ian-goodfellow",
    "origin": null,
    "education": [
      {
        "name": "스탠퍼드대학교",
        "detail": "Andrew Ng·Gary Bradski와 연구",
        "period": "몬트리올 진학 전",
        "sourceIds": [
          "goodfellow-personal-bio"
        ]
      },
      {
        "name": "몬트리올대학교",
        "detail": "표현학습·컴퓨터비전 박사학위 논문심사",
        "period": "2014년 9월",
        "sourceIds": [
          "goodfellow-defense"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "universite-de-montreal",
        "name": "몬트리올대학교",
        "place": "몬트리올, 캐나다",
        "period": "박사과정",
        "note": "Yoshua Bengio·Aaron Courville의 지도 아래 표현학습 연구",
        "sourceIds": [
          "goodfellow-defense",
          "goodfellow-personal-bio"
        ]
      },
      {
        "institutionId": "google",
        "name": "Google 연구팀",
        "place": "기업 연구",
        "period": "박사과정 이후",
        "note": "대학의 2015년 동문 기록은 Google 연구팀 합류와 Street View 연구를 소개한다",
        "sourceIds": [
          "goodfellow-udem-alumni"
        ]
      },
      {
        "institutionId": "openai",
        "name": "OpenAI",
        "place": "미국",
        "period": "과거 재직",
        "note": "본인 약력에 명시된 기업 연구 경력",
        "sourceIds": [
          "goodfellow-personal-bio"
        ]
      }
    ],
    "background": "스탠퍼드에서 연구한 뒤 몬트리올대학교에서 Bengio·Courville의 지도로 박사과정을 밟았다. 대학과 Google·OpenAI 같은 기업 연구실을 거치며 신경망의 표현학습과 모델 보안을 연구했다. 2014년 GAN 공동연구에 이어 Shlens·Szegedy와는 작은 입력 변화가 신경망의 판단을 바꾸는 적대적 예제를 연구했다. 후자의 원고는 2014년 말에 공개됐고 ICLR 2015 논문으로 이어졌다.",
    "backgroundSourceIds": [
      "goodfellow-personal-bio",
      "goodfellow-defense",
      "goodfellow-udem-alumni",
      "goodfellow-adversarial-2015"
    ],
    "connections": [
      {
        "personId": "yoshua-bengio",
        "name": "Yoshua Bengio",
        "kind": "advisor",
        "label": "박사 지도교수",
        "description": "2014년 박사학위 논문심사 공고에 연구 지도교수로 명시돼 있다.",
        "period": "2014년 학위심사 기록",
        "sourceIds": [
          "goodfellow-defense"
        ],
        "relation": "student-of"
      },
      {
        "personId": "aaron-courville",
        "name": "Aaron Courville",
        "kind": "advisor",
        "label": "박사 공동 지도교수",
        "description": "2014년 박사학위 논문심사 공고에 공동 지도교수로 명시돼 있다.",
        "period": "2014년 학위심사 기록",
        "sourceIds": [
          "goodfellow-defense"
        ],
        "relation": "student-of"
      }
    ],
    "sources": [
      {
        "id": "goodfellow-personal-bio",
        "title": "Ian Goodfellow · 본인 약력",
        "url": "https://www.iangoodfellow.com/bio",
        "scope": "Stanford의Ng·Bradski, Montreal의Bengio·Courville와공부한관계·OpenAI과거재직·신경망보안연구",
        "accessed": "2026-11-10"
      },
      {
        "id": "goodfellow-defense",
        "title": "Université de Montréal · Ian Goodfellow 박사학위 논문심사",
        "url": "https://diro.umontreal.ca/en/departement/activites/activite/news/eventDetail/Event/deep-learning-of-representations-and-its-application-to-computer-vision/",
        "scope": "2014-09-02 심사·논문제목·지도교수Bengio·공동지도Courville. 학위수여연도로확대하지않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "goodfellow-udem-alumni",
        "title": "Université de Montréal · Rector's Report 2015",
        "url": "https://secretariatgeneral.umontreal.ca/public/secretariatgeneral/documents/doc_officiels/documents-institutionnels/rapport-annuel/Rapport-du-Recteur-2015-An.pdf",
        "scope": "Goodfellow를2014년동문으로소개하고 Google연구팀채용·StreetView연구를기록. 특정입사연도는표시하지않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "goodfellow-adversarial-2015",
        "title": "Goodfellow·Shlens·Szegedy · Explaining and Harnessing Adversarial Examples",
        "url": "https://arxiv.org/pdf/1412.6572v3",
        "scope": "2015년 v3 PDF 첫쪽의 세 공동저자·ICLR2015 표제와 §4·Figure1의 입력 기울기·적대적 예제. arXiv 제출 기록의2014-12-20 최초공개를 논문발표연도와 구분한다. 원실험을 이 사이트가 재실행했다는 의미가 아니다.",
        "accessed": "2026-11-16"
      }
    ]
  },
  {
    "personId": "ilya-sutskever",
    "origin": {
      "label": "출생",
      "text": "니즈니노브고로드, 러시아 · 예루살렘에서 성장",
      "sourceIds": [
        "sutskever-utoronto-magazine"
      ]
    },
    "education": [
      {
        "name": "토론토대학교",
        "detail": "수학 학사",
        "period": "2005",
        "sourceIds": [
          "sutskever-utoronto-magazine",
          "sutskever-utoronto-degree"
        ]
      },
      {
        "name": "토론토대학교",
        "detail": "컴퓨터과학 석사·박사 · 지도교수 Geoffrey Hinton",
        "period": "2007·2012",
        "sourceIds": [
          "sutskever-utoronto-magazine",
          "sutskever-utoronto-degree"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-toronto",
        "name": "토론토대학교",
        "place": "토론토, 캐나다",
        "period": "대학원 연구",
        "note": "Hinton 연구팀에서 신경망·언어·영상 인식을 연구",
        "sourceIds": [
          "sutskever-utoronto-degree"
        ]
      },
      {
        "institutionId": "google-brain",
        "name": "Google Brain",
        "place": "기업 연구",
        "period": "OpenAI 설립 전",
        "note": "DNNResearch 인수 후 연구원으로 합류해 Seq2Seq 등에 참여",
        "sourceIds": [
          "sutskever-utoronto-degree"
        ]
      },
      {
        "institutionId": "openai",
        "name": "OpenAI",
        "place": "미국",
        "period": "2015년 공동 설립",
        "note": "연구책임자·수석과학자로 일했다",
        "sourceIds": [
          "sutskever-utoronto-degree"
        ]
      }
    ],
    "background": "러시아에서 태어나 주로 예루살렘에서 자랐고, 가족과 캐나다로 이주한 뒤 토론토대학교에서 수학과 컴퓨터과학을 공부했다. Hinton 연구팀에서 시작한 연구 경력은 Google Brain과 OpenAI 설립으로 이어졌다.",
    "backgroundSourceIds": [
      "sutskever-utoronto-magazine",
      "sutskever-utoronto-degree"
    ],
    "connections": [
      {
        "personId": "geoffrey-hinton",
        "name": "Geoffrey Hinton",
        "kind": "advisor",
        "label": "박사 지도교수",
        "description": "토론토대학교에서 Sutskever의 박사과정을 지도했다.",
        "period": "박사과정",
        "sourceIds": [
          "sutskever-utoronto-degree"
        ],
        "relation": "student-of"
      },
      {
        "personId": "oriol-vinyals",
        "name": "Oriol Vinyals",
        "kind": "collaboration",
        "label": "Seq2Seq 공동저자",
        "description": "Quoc V. Le와 함께 2014년 Sequence to Sequence Learning with Neural Networks를 썼다.",
        "period": "2014",
        "sourceIds": [
          "sutskever-seq2seq-paper"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "sutskever-utoronto-magazine",
        "title": "University of Toronto Magazine · Heard It Through the AI",
        "url": "https://magazine.utoronto.ca/people/alumni-donors/heard-it-through-the-ai-openai-ilya-sutskever/",
        "scope": "니즈니노브고로드출생·예루살렘성장·캐나다이주·학위BSc2005 MSc2007 PhD2012",
        "accessed": "2026-11-10"
      },
      {
        "id": "sutskever-utoronto-degree",
        "title": "University of Toronto · Ilya Sutskever 명예학위 소개",
        "url": "https://www.utoronto.ca/news/ilya-sutskever-leader-ai-and-its-responsible-development-receives-u-t-honorary-degree",
        "scope": "Hinton 지도·Toronto연구·DNNResearch와GoogleBrain·2015 OpenAI공동설립과역할. 현재직함으로사용하지않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "sutskever-seq2seq-paper",
        "title": "Sutskever·Vinyals·Le · Sequence to Sequence Learning with Neural Networks",
        "url": "https://arxiv.org/abs/1409.3215",
        "scope": "2014년 세 공동저자 서지",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "jensen-huang",
    "origin": {
      "label": "출생",
      "text": "대만",
      "sourceIds": [
        "huang-hkust"
      ]
    },
    "education": [
      {
        "name": "오리건주립대학교",
        "detail": "전기공학 학사",
        "period": "",
        "sourceIds": [
          "huang-nvidia"
        ]
      },
      {
        "name": "스탠퍼드대학교",
        "detail": "전기공학 석사",
        "period": "",
        "sourceIds": [
          "huang-nvidia"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "amd",
        "name": "Advanced Micro Devices(AMD)",
        "place": "미국",
        "period": "NVIDIA 창업 이전",
        "note": "반도체 설계 분야에서 일했다.",
        "sourceIds": [
          "huang-nvidia"
        ]
      },
      {
        "institutionId": "lsi-logic",
        "name": "LSI Logic",
        "place": "미국",
        "period": "NVIDIA 창업 이전",
        "note": "반도체 기업에서 경력을 쌓았다.",
        "sourceIds": [
          "huang-nvidia"
        ]
      },
      {
        "institutionId": "nvidia",
        "name": "NVIDIA",
        "place": "미국",
        "period": "1993년 공동창업",
        "note": "GPU·가속 컴퓨팅 기업을 공동 설립하고 이끌었다.",
        "sourceIds": [
          "huang-nvidia",
          "huang-history"
        ]
      }
    ],
    "background": "대만에서 태어나 어린 시절 태국과 미국을 거쳐 오리건에서 학교를 다녔다. 전기공학을 공부하고 AMD·LSI Logic에서 일한 뒤, 1993년 NVIDIA를 공동 설립했다.",
    "backgroundSourceIds": [
      "huang-hkust",
      "huang-nvidia",
      "huang-history"
    ],
    "connections": [
      {
        "personId": "chris-malachowsky",
        "name": "Chris Malachowsky",
        "kind": "cofounder",
        "label": "NVIDIA 공동창업",
        "description": "Huang·Malachowsky·Priem은 1993년 NVIDIA를 함께 설립했다.",
        "period": "1993년",
        "sourceIds": [
          "huang-history"
        ],
        "relation": "cofounded-with"
      },
      {
        "personId": "curtis-priem",
        "name": "Curtis Priem",
        "kind": "cofounder",
        "label": "NVIDIA 공동창업",
        "description": "NVIDIA의 공식 회사 연표가 세 사람의 공동창업을 기록한다.",
        "period": "1993년",
        "sourceIds": [
          "huang-history"
        ],
        "relation": "cofounded-with"
      }
    ],
    "sources": [
      {
        "id": "huang-nvidia",
        "title": "NVIDIA Newsroom · Jensen Huang",
        "url": "https://nvidianews.nvidia.com/bios/jensen-huang",
        "scope": "Oregon State·Stanford 전기공학 학위, 창업 전 AMD·LSI Logic 경력과 1993년 NVIDIA 창업. 기업 경영·계산 인프라 기여를 개별 AI 논문 저자 역할과 구분한다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "huang-hkust",
        "title": "HKUST · Jensen Huang 명예학위 공적서",
        "url": "https://geco.ust.hk/download/Booklet/Dr_Jensen_HUANG_EN.pdf",
        "scope": "어린 시절 대만·태국·미국과 오리건 학업 경로. 여기서는 출생 도시를 표시하지 않고 대만으로 범위를 한정했다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "huang-history",
        "title": "NVIDIA · 공식 회사 연표 1993",
        "url": "https://www.nvidia.com/content/timeline/time_93.html",
        "scope": "Jensen Huang·Chris Malachowsky·Curtis Priem 공동창업. 월 표기는 다른 공식 공시와 달라 연도만 사용한다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "john-mccarthy",
    "origin": {
      "label": "출생",
      "text": "보스턴, 미국",
      "sourceIds": [
        "mccarthy-stanford-bio"
      ]
    },
    "education": [
      {
        "name": "캘리포니아공과대학교(Caltech)",
        "detail": "수학 학사",
        "period": "1948",
        "sourceIds": [
          "mccarthy-stanford-bio"
        ]
      },
      {
        "name": "프린스턴대학교",
        "detail": "수학 박사 · 지도교수 Donald C. Spencer",
        "period": "1951",
        "sourceIds": [
          "mccarthy-princeton-degree"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "dartmouth-college",
        "name": "다트머스대학교",
        "place": "하노버, 미국",
        "period": "1955–1958",
        "note": "AI 여름 연구 모임을 제안한 시기의 소속",
        "sourceIds": [
          "mccarthy-stanford-memorial",
          "mccarthy-dartmouth-proposal"
        ]
      },
      {
        "institutionId": "mit",
        "name": "MIT",
        "place": "케임브리지, 미국",
        "period": "1958년 합류",
        "note": "Marvin Minsky와 MIT Artificial Intelligence Project 공동 설립",
        "sourceIds": [
          "mccarthy-stanford-bio",
          "mccarthy-stanford-memorial"
        ]
      },
      {
        "institutionId": "stanford",
        "name": "스탠퍼드대학교",
        "place": "스탠퍼드, 미국",
        "period": "1962년 복귀",
        "note": "이후 Stanford Artificial Intelligence Laboratory를 설립·이끌었다",
        "sourceIds": [
          "mccarthy-stanford-memorial"
        ]
      }
    ],
    "background": "미국 보스턴에서 태어나 로스앤젤레스에서 성장했고, Caltech와 프린스턴에서 수학을 공부했다. 다트머스·MIT·스탠퍼드를 옮겨 가며 연구했고, 동료들과 AI 연구 조직을 만드는 일에도 참여했다.",
    "backgroundSourceIds": [
      "mccarthy-stanford-bio",
      "mccarthy-stanford-memorial"
    ],
    "connections": [
      {
        "personId": "marvin-minsky",
        "name": "Marvin Minsky",
        "kind": "cofounder",
        "label": "연구 프로젝트 공동 설립",
        "description": "MIT Artificial Intelligence Project를 함께 설립했다.",
        "period": "MIT 재직 시기",
        "sourceIds": [
          "mccarthy-stanford-memorial"
        ],
        "relation": "cofounded-with"
      },
      {
        "personId": "patrick-hayes",
        "name": "Patrick J. Hayes",
        "kind": "collaboration",
        "label": "공동 논문",
        "description": "행동·지식·전략의 형식화를 다룬 1969년 논문의 공동저자다.",
        "period": "1969",
        "sourceIds": [
          "mccarthy-hayes-paper"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "mccarthy-stanford-bio",
        "title": "Stanford Engineering · John McCarthy 추모 전기",
        "url": "https://engineering.stanford.edu/news/stanfords-john-mccarthy-seminal-figure-artificial-intelligence-dead-84",
        "scope": "보스턴 출생, Caltech1948·Princeton1951, Dartmouth·MIT·Stanford 경력",
        "accessed": "2026-11-10"
      },
      {
        "id": "mccarthy-princeton-degree",
        "title": "Princeton Graduate School · John McCarthy",
        "url": "https://gradschool.princeton.edu/deans-initiatives-awards-events/dean%E2%80%99s-initiatives/viget-honor-roll/john-mccarthy",
        "scope": "1951년 수학박사, 지도교수 Donald C. Spencer",
        "accessed": "2026-11-10"
      },
      {
        "id": "mccarthy-stanford-memorial",
        "title": "Stanford Computer Science · Professor John McCarthy",
        "url": "https://legacy.cs.stanford.edu/memoriam/professor-john-mccarthy",
        "scope": "로스앤젤레스 성장, 1953–1955 Stanford·1955–1958 Dartmouth, Minsky와 MIT프로젝트 공동설립, 1962 Stanford복귀",
        "accessed": "2026-11-10"
      },
      {
        "id": "mccarthy-dartmouth-proposal",
        "title": "McCarthy 외 · Dartmouth Summer Research Project 제안서",
        "url": "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
        "scope": "1955년 제안서의 저자·소속과 1956년 하노버 연구 계획",
        "accessed": "2026-11-10"
      },
      {
        "id": "mccarthy-hayes-paper",
        "title": "McCarthy·Hayes · Some Philosophical Problems from the Standpoint of Artificial Intelligence",
        "url": "https://www-formal.stanford.edu/jmc/mcchay69/mcchay69.html",
        "scope": "1969년 공동저자·논문 제목; 내용은 기존 카드의 검토 범위를 따른다",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "joseph-redmon",
    "education": [
      {
        "name": "Middlebury College",
        "detail": "컴퓨터과학 전공 · 수학 부전공",
        "period": "2012년 졸업 · 본인 공개 이력서",
        "sourceIds": [
          "redmon-resume"
        ]
      },
      {
        "name": "University of Washington · Computer Science & Engineering",
        "detail": "박사과정 · 지도교수 Ali Farhadi",
        "period": "2013–2021 · 연구실 졸업생 기록",
        "sourceIds": [
          "raivn-people",
          "redmon-home"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-washington",
        "name": "University of Washington · 컴퓨터 비전 연구",
        "period": "2013–2021 박사과정 · 2015/2016 초기 YOLO",
        "place": "시애틀, 워싱턴주, 미국",
        "note": "원논문 첫쪽에서 Redmon은 University of Washington 소속으로 표기된다. 연구실 졸업생 목록은 박사과정 기간과 지도교수 Farhadi를 확인한다. Darknet은 저자가 공개한 신경망 프레임워크다.",
        "sourceIds": [
          "yolo-original",
          "raivn-people",
          "redmon-home"
        ]
      },
      {
        "institutionId": "allen-institute-for-ai",
        "name": "Ai2 · OlmoEarth 연구팀",
        "period": "2026-11-15 조회한 본인 홈페이지",
        "place": "시애틀, 워싱턴주, 미국",
        "note": "홈페이지는 자신을 Ai2의 연구자로 소개하고 환경·인도주의 단체를 위한 OlmoEarth 연구를 연결한다. 초기 YOLO 이후의 활동을 소개하는 배경이며, 이 카드가 OlmoEarth 논문의 방법이나 성능을 검토했다는 뜻은 아니다.",
        "sourceIds": [
          "redmon-home"
        ]
      }
    ],
    "background": "Middlebury College에서 컴퓨터과학을 전공하고 수학을 부전공했다. 본인 이력서에는 졸업 뒤 알래스카 Unalaska에서 라디오 DJ와 웹 개발자로 일한 경력도 적혀 있다. 이후 워싱턴대학교에서 파르하디의 지도를 받으며 컴퓨터 비전을 연구했다. 초기 YOLO에서는 Divvala·Girshick·Farhadi와 함께, 장면을 여러 후보 영역으로 나누어 따로 처리하던 탐지를 하나의 신경망 예측 문제로 다시 표현했다. 저자 홈페이지는 Darknet과 YOLO 후속 공동연구, 2026년의 Ai2 환경 연구를 구분해 소개한다.",
    "backgroundSourceIds": [
      "redmon-resume",
      "raivn-people",
      "yolo-original",
      "redmon-home"
    ],
    "connections": [
      {
        "personId": "ali-farhadi",
        "name": "Ali Farhadi",
        "nameKo": "알리 파르하디",
        "kind": "advisor",
        "relation": "student-of",
        "label": "워싱턴대학교 박사과정 지도",
        "description": "UW RAIVN Lab의 공식 졸업생 목록은 Joseph (Joe) Redmon의 박사과정 기간을 2013–2021로 적고 지도교수를 Ali Farhadi로 명시한다. Redmon의 본인 홈페이지도 Farhadi에게 지도를 받았다고 소개한다.",
        "period": "2013–2021 · UW 박사과정",
        "sourceIds": [
          "raivn-people",
          "redmon-home"
        ]
      },
      {
        "personId": "ali-farhadi",
        "name": "Ali Farhadi",
        "nameKo": "알리 파르하디",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "초기 YOLO 공동연구",
        "description": "Redmon·Santosh Divvala·Ross Girshick·Farhadi는 You Only Look Once: Unified, Real-Time Object Detection의 네 공동저자다. 지도 관계와 별개로 논문 공동저술 관계를 표시한다. 두 사람의 이름만으로 원논문 전체의 단독 기여를 뜻하지 않는다.",
        "period": "2015년 사전 공개 · CVPR 2016",
        "sourceIds": [
          "yolo-original",
          "yolo-cvpr"
        ]
      }
    ],
    "sources": [
      {
        "id": "redmon-resume",
        "title": "Joseph Redmon · 본인 공개 이력서",
        "url": "https://www.pjreddie.com/static/resume.pdf",
        "scope": "한 쪽 PDF의 Education에서 Middlebury College ’12, Computer Science 전공, Mathematics 부전공을 확인했다. 본문의 졸업 후 Unalaska 라디오 DJ·프리랜서 웹 개발 경력도 읽었다. 대학원 진학 전 미래형 소개가 있는 과거 이력서이므로 현재 직업이나 워싱턴대학교 학위 취득을 이 파일만으로 단정하지 않는다. 개인 연락처·성적·농담은 옮기지 않았다. 출생 장소는 이 자료에서 확인하지 못했다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "raivn-people",
        "title": "University of Washington · RAIVN Lab · People / Alumni",
        "url": "https://raivn.cs.washington.edu/people/",
        "scope": "Alumni의 Joseph (Joe) Redmon 행에서 Ph.D., 2013–2021과 Advisor: Ali Farhadi를 확인했다. 지도 관계의 직접 근거로 사용한다. 다른 졸업생과의 직접 공동연구나 그들의 현재 소속은 이 카드에 추가하지 않는다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "redmon-home",
        "title": "Joseph Chet Redmon · 본인 홈페이지",
        "url": "https://pjreddie.com/",
        "scope": "Welcome 본문의 Farhadi 지도, Darknet 유지와 현재 Ai2 연구자 소개를 확인했다. OlmoEarth 절과 CVPR 2026 서지는 최근 배경의 확인 범위다. 홈페이지는 YOLOv3 뒤 AI 연구를 떠났던 시기의 발표와 현재 환경 연구를 함께 싣고 있으므로 영구적 연구 중단으로 해석하지 않는다. OlmoEarth 논문의 본문·성과는 이번 카드에서 검증하지 않았다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "yolo-original",
        "title": "Redmon·Divvala·Girshick·Farhadi · You Only Look Once 원논문",
        "url": "https://pjreddie.com/static/papers/yolo_1.pdf",
        "scope": "PDF p.1의 네 저자·소속 기호와 초록·도입, p.2 §2 Unified Detection을 읽었다. Redmon은 UW, Divvala·Farhadi는 UW와 Allen Institute for AI, Girshick은 Facebook AI Research로 구분된다. 한 신경망이 전체 이미지에서 위치와 종류를 함께 예측하는 발상을 인물 소개와 연결한다. 개별 저자의 세부 역할 분담은 이 논문에서 확정하지 않는다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "yolo-cvpr",
        "title": "CVF · CVPR 2016 · You Only Look Once 공식 논문 기록",
        "url": "https://openaccess.thecvf.com/content_cvpr_2016/html/Redmon_You_Only_Look_CVPR_2016_paper.html",
        "scope": "공식 CVPR 2016 논문 기록과 저자 공개본의 네 저자·제목을 대조한다. 사전 공개 시점과 학회 출판 연도는 구분하며 연구 기록은 2016년 학회 논문으로 공유한다.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "joshua-tenenbaum",
    "origin": null,
    "education": [
      {
        "name": "예일대학교",
        "detail": "물리학 학부 과정",
        "period": "",
        "sourceIds": [
          "tenenbaum-mit-2003"
        ]
      },
      {
        "name": "매사추세츠공과대학교(MIT)",
        "detail": "박사",
        "period": "1999년",
        "sourceIds": [
          "tenenbaum-mit"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "stanford",
        "name": "스탠퍼드대학교",
        "place": "스탠퍼드, 미국",
        "period": "1999–2002년",
        "note": "조교수로 연구·교육을 맡았다.",
        "sourceIds": [
          "tenenbaum-mit"
        ]
      },
      {
        "institutionId": "mit",
        "name": "MIT · 뇌·인지과학과",
        "place": "케임브리지, 미국",
        "period": "2002년 복귀",
        "note": "인간과 기계의 지각·학습·상식 추론을 연구했다.",
        "sourceIds": [
          "tenenbaum-mit"
        ]
      }
    ],
    "background": "예일에서 물리학을 공부하다 인지과학 연구를 접했고, MIT에서 박사학위를 받았다. 스탠퍼드에서 1999–2002년 교수로 일한 뒤 MIT로 돌아와 인간의 학습을 계산 모형과 연결하는 연구를 이어 갔다.",
    "backgroundSourceIds": [
      "tenenbaum-mit-2003",
      "tenenbaum-mit"
    ],
    "connections": [
      {
        "personId": "jiayuan-mao",
        "name": "Jiayuan Mao",
        "kind": "collaboration",
        "label": "NS-CL 공동연구",
        "description": "장면·언어·기호 프로그램을 잇는 2019년 NS-CL 논문을 함께 발표했다.",
        "period": "2019년",
        "sourceIds": [
          "tenenbaum-nscl"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "jiajun-wu",
        "name": "Jiajun Wu",
        "kind": "collaboration",
        "label": "NS-CL 공동연구",
        "description": "Tenenbaum과 함께 2019년 NS-CL의 다섯 공동저자에 포함된다.",
        "period": "2019년",
        "sourceIds": [
          "tenenbaum-nscl"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "tenenbaum-mit",
        "title": "MIT Brain and Cognitive Sciences · Joshua B. Tenenbaum",
        "url": "https://bcs.mit.edu/directory/joshua-b-tenenbaum",
        "scope": "1999년 MIT 박사, Stanford 1999–2002년, 2002년 MIT 복귀 및 지각·학습·추론 연구 분야.",
        "accessed": "2026-11-10"
      },
      {
        "id": "tenenbaum-mit-2003",
        "title": "MIT BCS Newsletter · Spring 2003, Joshua Tenenbaum 소개",
        "url": "https://bcs.mit.edu/sites/default/files/newsletters/bcsnewsletter_spring_2003.pdf",
        "scope": "인쇄 p.3 Yale 물리학 학부와 Roger Shepard 연구를 접한 경로. 자료의 native Californian 표현만으로 출생 도시·생년을 추가하지 않았다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "tenenbaum-nscl",
        "title": "Mao 외 · The Neuro-Symbolic Concept Learner (2019)",
        "url": "https://arxiv.org/abs/1904.12584",
        "scope": "Jiayuan Mao·Chuang Gan·Pushmeet Kohli·Joshua B. Tenenbaum·Jiajun Wu의 원논문 공동저자 명단. 학생·지도 관계를 이 저자 명단만으로 추정하지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "junyang-lin",
    "education": [],
    "researchPlaces": [
      {
        "institutionId": "alibaba-qwen-team",
        "name": "Alibaba Group · Qwen 연구팀",
        "period": "2023년 공식 강연 소개 · 2025년 기술 보고서",
        "place": "공식 자료에서 연구팀 소속을 확인",
        "note": "HKUST의 2023년 12월 강연 소개는 Lin을 Alibaba의 staff engineer이자 Qwen 팀 리더로 기록하며, 자연어처리·멀티모달 표현·대규모 사전학습과 OFA·Chinese-CLIP·Qwen 계열 연구를 소개한다. Qwen3 보고서에는 팀의 공동저자로 실려 있다. 이 과거 역할을 2026년 현재의 재직이나 직함으로 표시하지 않는다.",
        "sourceIds": [
          "hkust-qwen-2023",
          "qwen3-report-v1"
        ]
      }
    ],
    "background": "자연어처리와 멀티모달 표현 학습, 대규모 사전학습을 연구했다. 2023년 HKUST 공식 행사 소개는 당시 Alibaba의 staff engineer이자 Qwen 팀 리더로 소개하며 OFA·Chinese-CLIP과 언어·영상·음성 Qwen 계열을 연결한다. Qwen3에서는 큰 팀의 공동저자로서, 같은 모델에 긴 추론과 직접 응답을 함께 익히는 연구 기록으로 이어진다. 여기서는 확인한 2023–2025년 연구 맥락을 다루며 현재 직책이나 개인별 발명 기여를 추정하지 않는다.",
    "backgroundSourceIds": [
      "hkust-qwen-2023",
      "qwen3-report-v1",
      "qwen3-launch"
    ],
    "connections": [
      {
        "personId": "binyuan-hui",
        "name": "Binyuan Hui",
        "nameKo": "후이빈위안",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "Qwen3 기술 보고서 공동연구",
        "description": "Qwen3 기술 보고서 v1의 §6 Core Contributors에는 Binyuan Hui와 Junyang Lin이 함께 실려 있다. 보고서 공동저술을 관계의 근거로 삼으며 두 사람의 직급·지도 관계나 세부 역할 분담은 추정하지 않는다.",
        "period": "2025년 · Qwen3 기술 보고서",
        "sourceIds": [
          "qwen3-report-v1"
        ]
      },
      {
        "personId": "jingren-zhou",
        "name": "Jingren Zhou",
        "nameKo": "저우징런",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "Qwen3 기술 보고서 공동연구",
        "description": "Qwen3 기술 보고서 v1의 §6 Core Contributors에는 Jingren Zhou와 Junyang Lin이 함께 실려 있다. 팀의 공동연구 관계로 연결하며, 공동저자라는 사실을 개인 사이의 지도나 창업 관계로 바꾸지 않는다.",
        "period": "2025년 · Qwen3 기술 보고서",
        "sourceIds": [
          "qwen3-report-v1"
        ]
      }
    ],
    "sources": [
      {
        "id": "hkust-qwen-2023",
        "title": "HKUST CSE · Qwen: Towards a Generalist Model · Junyang Lin",
        "url": "https://cse.hkust.edu.hk/pg/seminars/F23/lin.html",
        "scope": "2023-12-05 강연의 Speaker와 Biography 본문을 읽었다. 당시 Alibaba staff engineer·Qwen 팀 리더, 자연어처리·멀티모달 표현·대규모 사전학습, OFA·Chinese-CLIP과 Qwen·Qwen-VL·Qwen-Audio 연구 맥락을 확인했다. 2023년 자료를 현재 직함으로 쓰지 않았다. 이 자료에는 출생지나 정규 학력이 없어 추가하지 않았다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "qwen3-report-v1",
        "title": "Qwen Team · Qwen3 Technical Report · v1",
        "url": "https://arxiv.org/pdf/2505.09388v1",
        "scope": "35쪽 v1 PDF의 §6/PDF22 Core Contributors에서 Junyang Lin·Binyuan Hui·Jingren Zhou·An Yang을 확인했다. §2/PDF3의 모델 계열과 §4/Figure1/PDF9–12의 사후학습 경로를 읽었다. 표지 날짜2025-05-15와 arXiv 제출2025-05-14는 구분한다. 공동저자 기록을 단독 발명이나 지도 관계로 해석하지 않았다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "qwen3-launch",
        "title": "Qwen Team · Qwen3: Think Deeper, Act Faster",
        "url": "https://qwenlm.github.io/blog/qwen3/",
        "scope": "2025-04-29 공식 공개 글의 Qwen Team 표기와 모델 계열·사고/직답 통합·사후학습 설명을 확인했다. 보고서 공개일과 모델 공개일을 구분한다. 2025년 기록을 2026년 최신 제품이나 Lin의 현재 역할로 확장하지 않았다.",
        "accessed": "2026-11-16"
      }
    ]
  },
  {
    "personId": "jurgen-schmidhuber",
    "origin": {
      "label": "출생",
      "text": "뮌헨, 독일",
      "sourceIds": [
        "schmidhuber-cv"
      ]
    },
    "education": [
      {
        "name": "뮌헨공과대학교(TUM)",
        "detail": "컴퓨터과학·수학 Diplom",
        "period": "1983–1987",
        "sourceIds": [
          "schmidhuber-cv"
        ]
      },
      {
        "name": "뮌헨공과대학교(TUM)",
        "detail": "동적 신경망과 신용 할당 문제에 관한 컴퓨터과학 박사",
        "period": "1991",
        "sourceIds": [
          "schmidhuber-cv"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-colorado-boulder",
        "name": "콜로라도대학교 볼더",
        "place": "볼더, 미국",
        "period": "1991–1992",
        "note": "박사후연구",
        "sourceIds": [
          "schmidhuber-life-cv"
        ]
      },
      {
        "institutionId": "idsia",
        "name": "IDSIA",
        "place": "루가노, 스위스",
        "period": "1995년 합류",
        "note": "신경망·학습 연구팀을 이끌었다",
        "sourceIds": [
          "schmidhuber-life-cv"
        ]
      },
      {
        "institutionId": "technical-university-of-munich",
        "name": "뮌헨공과대학교(TUM)",
        "place": "뮌헨, 독일",
        "period": "2004–2009",
        "note": "인지로봇 연구실을 이끌었다",
        "sourceIds": [
          "schmidhuber-life-cv"
        ]
      }
    ],
    "background": "독일 뮌헨에서 태어나 TUM에서 컴퓨터과학과 수학을 공부했다. 미국의 박사후연구를 거쳐 스위스 IDSIA와 독일 TUM에서 연구팀을 이끌며, 순환 신경망과 학습하는 시스템을 연구했다.",
    "backgroundSourceIds": [
      "schmidhuber-cv",
      "schmidhuber-life-cv"
    ],
    "connections": [
      {
        "personId": "sepp-hochreiter",
        "name": "Sepp Hochreiter",
        "kind": "collaboration",
        "label": "LSTM 공동저자",
        "description": "1997년 Long Short-Term Memory 논문의 공동저자다.",
        "period": "1997",
        "sourceIds": [
          "schmidhuber-lstm-paper"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "alex-graves",
        "name": "Alex Graves",
        "kind": "collaboration",
        "label": "CTC 공동저자",
        "description": "2006년 CTC 논문에서 함께 순서 자료의 라벨 학습을 연구했다.",
        "period": "2006",
        "sourceIds": [
          "schmidhuber-ctc-paper"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "schmidhuber-cv",
        "title": "Jürgen Schmidhuber · Curriculum Vitae",
        "url": "https://people.idsia.ch/~juergen/cv.html",
        "scope": "개인 이력의 뮌헨 출생·TUM Diplom1987·박사1991. 연구 우선권에 관한 개인 주장은 배경 소개에 사용하지 않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "schmidhuber-life-cv",
        "title": "Jürgen Schmidhuber · 상세 경력 기록",
        "url": "https://people.idsia.ch/~juergen/life/",
        "scope": "Colorado1991–1992, IDSIA1995 합류, TUM 인지로봇 연구실2004–2009의 과거 경력",
        "accessed": "2026-11-10"
      },
      {
        "id": "schmidhuber-lstm-paper",
        "title": "Hochreiter·Schmidhuber · Long Short-Term Memory, 1997",
        "url": "https://web.stanford.edu/class/psych209/Readings/HochreiterSchmidthuber97LSTM.pdf",
        "scope": "첫 쪽의 두 공동저자와 TUM·IDSIA 소속",
        "accessed": "2026-11-10"
      },
      {
        "id": "schmidhuber-ctc-paper",
        "title": "Graves 외 · Connectionist Temporal Classification, 2006",
        "url": "https://www.cs.toronto.edu/~graves/icml_2006.pdf",
        "scope": "첫 쪽 공동저자 Graves·Fernández·Gomez·Schmidhuber 및 IDSIA·TUM 소속",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "liang-wenfeng",
    "education": [
      {
        "name": "Zhejiang University · 정보·전자공학 분야",
        "detail": "학사·석사 · 대학원 전공은 정보·통신공학. 대학 공식 소개에서 학위와 기계시각 연구 배경을 확인했다.",
        "period": "정확한 입학·졸업 연도는 이 자료에서 별도로 확인하지 못함",
        "sourceIds": [
          "zju-biography"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "zhejiang-university",
        "name": "Zhejiang University · 정보·전자공학 분야",
        "period": "학사·석사 과정",
        "place": "중국",
        "note": "공식 대학 소개는 석사 논문 감사의 글을 통해 지도교수 项志宇와 기계시각 연구를 소개한다. 이 배경을 현재 DeepSeek 팀 내부의 연구 지도 관계로 확대하지 않는다.",
        "sourceIds": [
          "zju-biography"
        ]
      },
      {
        "institutionId": "deepseek",
        "name": "DeepSeek · 창업과 팀 연구",
        "period": "2024년 V3 · 2025년 최초 R1 보고서",
        "place": "DeepSeek-AI · 원논문 소속 표기",
        "note": "대학 공식 소개는 창업자로, V3·R1 첫 보고서는 공동 기여자로 명시한다. 2026년의 직책·조직 규모·투자액을 별도로 확인한 기록은 아니다.",
        "sourceIds": [
          "zju-biography",
          "v3-report",
          "r1-report"
        ]
      }
    ],
    "background": "저장대학교에서 정보·전자공학 분야의 학사와 석사를 마쳤다. 대학 공식 소개는 정보·통신공학 대학원 과정과 기계시각 연구를 설명하며, 석사 논문 감사의 글에 지도교수 项志宇의 지도가 언급된다고 전한다. DeepSeek 창업 이후의 연결은 회사 설립 역할과 공동연구 기여를 나누어 표시한다. V3 첫 보고서 Appendix A의 Research & Engineering에는 Wenfeng Liang과 Damai Dai가, R1 첫 보고서에는 core contributors인 Daya Guo·Zhihong Shao와 contributor인 Wenfeng Liang이 기재된다. 지도·개별 발명·세부 역할 분담을 이 명단만으로 추정하지 않고, 확인 가능한 팀 공동연구 관계만 연결한다.",
    "backgroundSourceIds": [
      "zju-biography",
      "v3-report",
      "r1-report"
    ],
    "connections": [
      {
        "personId": "damai-dai",
        "name": "Damai Dai",
        "nameKo": "다마이 다이",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "DeepSeek-V3 팀 공동연구",
        "description": "2024년 첫 V3 기술 보고서 Appendix A의 Research & Engineering 기여 목록에 Damai Dai와 Wenfeng Liang이 함께 기재된다. 집단 연구 참여를 연결하며 각 구성요소의 발명자·일대일 지도·내부 역할 분담은 이 명단만으로 단정하지 않는다.",
        "period": "2024-12 · V3 보고서 v1",
        "sourceIds": [
          "v3-report"
        ]
      },
      {
        "personId": "daya-guo",
        "name": "Daya Guo",
        "nameKo": "다야 궈",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "DeepSeek-R1 팀 공동연구",
        "description": "2025년 1월 최초 R1 보고서 Appendix A는 Daya Guo를 core contributor, Wenfeng Liang을 contributor로 구분한다. 같은 보고서에 대한 기여 관계이며 두 사람이 전체 R1을 단독으로 개발했다는 뜻은 아니다.",
        "period": "2025-01 · R1 보고서 v1",
        "sourceIds": [
          "r1-report"
        ]
      }
    ],
    "sources": [
      {
        "id": "zju-biography",
        "title": "Zhejiang University · ‘杭州六小龙’：浙大基因密码是什么？",
        "url": "https://zdpx.zju.edu.cn/news1.aspx?fl=301&id=52646",
        "scope": "저장대학교 도메인의 공식 소개에서 DeepSeek 창업자, 정보·전자공학 분야 학사·석사, 정보·통신공학 대학원 전공과 기계시각 연구 배경을 확인했다. 페이지의 검색 색인 본문을 읽었으며 직접 페이지 재접속은 시간 초과였다. 정확한 학위 연도·출생지·현재 CEO 직책은 이 자료로 확정하지 않았다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "v3-report",
        "title": "DeepSeek-AI · DeepSeek-V3 Technical Report · v1",
        "url": "https://arxiv.org/html/2412.19437v1",
        "scope": "2024-12-27 첫 보고서의 §2와 Appendix A Research & Engineering을 읽었다. Damai Dai와 Wenfeng Liang의 공동 기여 명시를 인물 관계의 근거로 삼는다. 개별 구성요소를 누구 한 사람이 발명했다는 근거나 현재 조직의 보고 체계로 쓰지 않는다.",
        "accessed": "2026-11-16"
      },
      {
        "id": "r1-report",
        "title": "DeepSeek-AI · DeepSeek-R1 · 최초 보고서 v1",
        "url": "https://arxiv.org/html/2501.12948v1",
        "scope": "2025-01-22 첫 보고서 Appendix A에서 Daya Guo·Zhihong Shao의 core contributors 표기와 Wenfeng Liang의 contributors 표기를 확인했다. 후속 Nature 판의 교신저자 표기나 2026년 v2와 첫 판의 역할 표기를 섞지 않는다.",
        "accessed": "2026-11-16"
      }
    ]
  },
  {
    "personId": "luis-c-lamb",
    "origin": null,
    "education": [
      {
        "name": "Federal University of Rio Grande do Sul",
        "detail": "컴퓨터과학 학사·석사",
        "period": "1992·1995년",
        "sourceIds": [
          "lamb-unesco"
        ]
      },
      {
        "name": "Imperial College London",
        "detail": "Computing Science 박사",
        "period": "2000년",
        "sourceIds": [
          "lamb-unesco"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "federal-university-rio-grande-do-sul",
        "name": "Federal University of Rio Grande do Sul (UFRGS)",
        "place": "포르투알레그리, 브라질",
        "period": "공식 행사 소개의 연구 경력",
        "note": "컴퓨터과학 기초·AI 교수. 신경 기호 AI·설명 가능한 AI 등을 연구했다. 과거 행사 자료의 행정 직책을 현재 직책으로 표시하지 않는다.",
        "sourceIds": [
          "lamb-cern",
          "lamb-unesco"
        ]
      },
      {
        "institutionId": "imperial-college-london",
        "name": "Imperial College London",
        "place": "런던, 영국",
        "period": "2000년 박사",
        "note": "컴퓨터과학 박사과정에서 연구했다.",
        "sourceIds": [
          "lamb-unesco"
        ]
      }
    ],
    "background": "UFRGS에서 컴퓨터과학을 공부한 뒤 Imperial에서 박사학위를 받았다. 가르세즈·개베이와 학습과 추론을 연결하는 공동저서를 집필했다. 이 카드에서는 신경망 안에 논리의 구조를 어떻게 표현할지에 관한 연구를 중심으로 읽는다.",
    "backgroundSourceIds": [
      "lamb-cern",
      "lamb-unesco",
      "cognitive-publisher"
    ],
    "connections": [
      {
        "personId": "artur-garcez",
        "name": "Artur d’Avila Garcez",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "신경 기호 연구 공동저자",
        "description": "Neural-Symbolic Cognitive Reasoning을 공동 집필했다.",
        "period": "2008년 발행 · ©2009",
        "sourceIds": [
          "cognitive-publisher"
        ]
      },
      {
        "personId": "dov-gabbay",
        "name": "Dov M. Gabbay",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "신경 기호 연구 공동저자",
        "description": "Garcez·Lamb·Gabbay의 공동저서에서 학습과 여러 논리의 추론을 함께 다뤘다.",
        "period": "2008년 발행 · ©2009",
        "sourceIds": [
          "cognitive-publisher"
        ]
      }
    ],
    "sources": [
      {
        "id": "lamb-cern",
        "title": "CERN Sparks · Luís Lamb 행사 소개",
        "url": "https://sparks.cern/node/561",
        "scope": "UFRGS의 연구 분야·경력, Imperial 박사와 UFRGS 학위, Garcez·Gabbay 공동저술. 행사 당시의 정부 직함을 현재 직함으로 단정하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "lamb-unesco",
        "title": "UNESCO 지역 AI 포럼 · 공식 연사 소개",
        "url": "https://unesco-regional-forum-ai.cetic.br/artificial-intelligence/pdf/speakers-en.pdf#page=12",
        "scope": "PDF p.12 Luis Lamb 항목. UFRGS 학사1992·석사1995, Imperial Computing Science PhD2000을 확인. 과거 연사자료이며 현재 보직의 증거로 사용하지 않음.",
        "accessed": "2026-11-11"
      },
      {
        "id": "cognitive-publisher",
        "title": "Springer · Neural-Symbolic Cognitive Reasoning",
        "url": "https://link.springer.com/book/10.1007/978-3-540-73246-4",
        "scope": "Garcez·Lamb·Gabbay 세 공동저자 및 소속. 전자책2008-10-15·양장2008-10-22·©2009 구분.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "marvin-minsky",
    "origin": {
      "label": "출생",
      "text": "뉴욕, 미국",
      "sourceIds": [
        "minsky-chm-bio"
      ]
    },
    "education": [
      {
        "name": "하버드대학교",
        "detail": "수학 학사",
        "period": "1949",
        "sourceIds": [
          "minsky-chm-bio"
        ]
      },
      {
        "name": "프린스턴대학교",
        "detail": "수학 박사",
        "period": "1954",
        "sourceIds": [
          "minsky-chm-bio"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "mit",
        "name": "MIT AI 연구실",
        "place": "케임브리지, 미국",
        "period": "1959년 공동 설립",
        "note": "John McCarthy와 AI 연구 조직을 세웠다",
        "sourceIds": [
          "minsky-chm-bio"
        ]
      },
      {
        "institutionId": "mit-media-lab",
        "name": "MIT Media Lab",
        "place": "케임브리지, 미국",
        "period": "공동 설립·교수 재직",
        "note": "인지·로봇·인간과 기계의 사고를 연구했다",
        "sourceIds": [
          "minsky-mitpress-book",
          "minsky-mit-profile"
        ]
      }
    ],
    "background": "뉴욕에서 태어나 하버드와 프린스턴에서 수학을 공부했다. MIT에서 연구 조직을 만들고, 컴퓨터과학과 심리학을 연결하며 인간과 기계의 사고를 함께 연구했다.",
    "backgroundSourceIds": [
      "minsky-chm-bio",
      "minsky-mitpress-book"
    ],
    "connections": [
      {
        "personId": "john-mccarthy",
        "name": "John McCarthy",
        "kind": "cofounder",
        "label": "AI 연구실 공동 설립",
        "description": "MIT AI 연구실을 함께 설립했다.",
        "period": "1959",
        "sourceIds": [
          "minsky-chm-bio"
        ],
        "relation": "cofounded-with"
      },
      {
        "personId": "seymour-papert",
        "name": "Seymour A. Papert",
        "kind": "collaboration",
        "label": "공동 저술",
        "description": "『Perceptrons』의 공동저자다. 연결한 출처는 1987년 확장판이다.",
        "period": "1987 확장판",
        "sourceIds": [
          "minsky-mitpress-book"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "minsky-chm-bio",
        "title": "Computer History Museum · Marvin Minsky, 2006 Fellow",
        "url": "https://computerhistory.org/profile/marvin-minsky/",
        "scope": "뉴욕 출생·Harvard1949·Princeton1954·McCarthy와 MIT AI연구실1959 공동설립·심리학과컴퓨터과학 연구",
        "accessed": "2026-11-10"
      },
      {
        "id": "minsky-mit-profile",
        "title": "MIT Media Lab · Marvin L. Minsky",
        "url": "https://www.media.mit.edu/people/minsky/overview/",
        "scope": "MIT Media Lab의 과거 교수 프로필",
        "accessed": "2026-11-10"
      },
      {
        "id": "minsky-mitpress-book",
        "title": "MIT Press · Perceptrons, expanded edition",
        "url": "https://mitpress.mit.edu/9780262631112/perceptrons/",
        "scope": "Minsky·Papert 공동저술, 1987 확장판 서지와 Minsky의 MIT Media Lab 공동설립 경력",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "max-newman",
    "origin": {
      "label": "출생",
      "text": "첼시, 런던, 영국",
      "sourceIds": [
        "newman-lms-obituary"
      ]
    },
    "education": [
      {
        "name": "케임브리지대학교 세인트존스칼리지",
        "detail": "수학 과정 · 1915년 입학, 전시 복무 뒤 1919년 복귀, 1921년 Mathematical Tripos",
        "period": "1915–1921 · 재학 중단 포함",
        "sourceIds": [
          "newman-lms-obituary"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-cambridge",
        "name": "케임브리지대학교",
        "place": "케임브리지, 영국",
        "period": "1927–1945 · 대학 강의·연구",
        "note": "수학을 강의했으며, 1935년 수학기초 강의는 튜링의 결정문제 연구에 영향을 주었다.",
        "sourceIds": [
          "newman-lms-obituary",
          "newman-kings-turing"
        ]
      },
      {
        "institutionId": "bletchley-park",
        "name": "Government Code and Cypher School · 블레츨리파크",
        "place": "영국",
        "period": "1942–1945",
        "note": "로렌츠 암호의 기계적 해독을 다룬 조직과 연구를 이끌었다.",
        "sourceIds": [
          "newman-manchester"
        ]
      },
      {
        "institutionId": "university-of-manchester",
        "name": "맨체스터대학교",
        "place": "맨체스터, 영국",
        "period": "1945–1964 · Fielden Professor",
        "note": "수학 연구와 계산기의 활용을 위한 연구 환경을 구축했고, 1948년 튜링을 수학과에 영입했다.",
        "sourceIds": [
          "newman-lms-obituary",
          "newman-manchester"
        ]
      }
    ],
    "background": "영국 런던에서 태어나 케임브리지에서 수학을 공부하고 강의했다. 전쟁 중에는 기계적 암호해독 연구를 이끌었고, 전후 맨체스터에서는 수학과 계산기 연구의 환경을 조성하며 튜링을 영입했다.",
    "backgroundSourceIds": [
      "newman-lms-obituary",
      "newman-manchester"
    ],
    "connections": [
      {
        "personId": "alan-turing",
        "name": "Alan Turing",
        "nameKo": "앨런 튜링",
        "kind": "influence",
        "relation": "influenced",
        "label": "강의·연구에 영향",
        "description": "1935년 수학기초 강의에서 기계적 절차로 수학적 문장의 증명 가능성을 판정하는 문제를 제시해 튜링의 연구에 영향을 주었다. 이후 맨체스터에서 다시 함께 일했다. 튜링의 박사 지도교수인 처치와는 다른 관계다.",
        "period": "1935–1936 · 1948년 이후",
        "sourceIds": [
          "newman-kings-turing",
          "newman-manchester",
          "newman-manchester-turing"
        ]
      }
    ],
    "sources": [
      {
        "id": "newman-lms-obituary",
        "title": "Peter Hilton (1986) · Obituary: M. H. A. Newman",
        "url": "https://mathshistory.st-andrews.ac.uk/LMS/newman_lms_obit.pdf",
        "scope": "Bulletin of the London Mathematical Society 18, 67–72, DOI 10.1112/blms/18.1.67. 인쇄 p.67(PDF2)의 출생·수학 과정·1927년 강사·1945–1964년 맨체스터 재직·1948년 튜링 영입을 대조했다. 작성자는 뉴먼과 함께 일한 Peter Hilton이다. 전쟁 중 기계의 상세 기여는 이 회고의 요약만으로 개인에게 귀속하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "newman-kings-turing",
        "title": "King’s College Cambridge · Alan Mathison Turing · The Entscheidungsproblem",
        "url": "https://www.kings.cam.ac.uk/alan-mathison-turing-1912-54",
        "scope": "The Entscheidungsproblem 절의 1935년 봄 뉴먼의 Part III 강의와 1935–1936년 연구 지도에 대한 아카이브 전시 설명을 확인했다. 강의 당시의 녹취나 원고를 직접 확인한 것으로 표시하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "newman-manchester",
        "title": "University of Manchester · Digital 60: Max Newman",
        "url": "https://curation.cs.manchester.ac.uk/digital60/www.digital60.org/about/biographies/maxnewman/index.html",
        "scope": "첫 문단의 강의·튜링 원고, 전쟁 중 로렌츠 암호해독, 전후 맨체스터 연구 환경과 1948/49년 튜링 임용 재원 설명을 확인했다. 같은 자료의 Baby 하드웨어 설계 기여 범위와, 뉴먼·튜링의 블레츨리파크 활동을 같은 프로젝트로 합치지 말라는 주의도 보존한다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "newman-manchester-turing",
        "title": "University of Manchester · Digital 60: Alan Turing",
        "url": "https://curation.cs.manchester.ac.uk/digital60/www.digital60.org/about/biographies/alanturing/index.html",
        "scope": "Turing Machine 절의 뉴먼 강의·초고, NPL and ACE 절의 뉴먼 제안과 1948년 맨체스터 합류, At Manchester 절의 수학적 계산 공동 작업을 확인했다. 뉴먼을 튜링의 프린스턴 박사 지도교수로 표시하지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "palmer-luckey",
    "origin": null,
    "education": [],
    "researchPlaces": [
      {
        "institutionId": "usc-ict-mxr",
        "name": "USC ICT · Mixed Reality Lab(MxR)",
        "place": "로스앤젤레스, 미국",
        "period": "2010–2012년",
        "note": "연구실 기술 직원으로 저가형·넓은 시야각의 VR 시제품 제작에 참여했다.",
        "sourceIds": [
          "luckey-usc"
        ]
      },
      {
        "institutionId": "oculus",
        "name": "Oculus VR",
        "place": "미국",
        "period": "2012년 창업",
        "note": "Oculus Rift 헤드셋을 개발하고 사업화했다.",
        "sourceIds": [
          "luckey-usc",
          "luckey-usaf"
        ]
      },
      {
        "institutionId": "anduril",
        "name": "Anduril Industries",
        "place": "미국",
        "period": "2017년 창업",
        "note": "방위 기술 기업을 설립했다.",
        "sourceIds": [
          "luckey-usaf"
        ]
      }
    ],
    "background": "Oculus 창업 전에는 USC의 혼합현실 연구실에서 저가형 VR 헤드셋 시제품을 만들었다. 2012년 Oculus Rift를 사업화한 뒤 2017년 Anduril을 설립해 하드웨어·소프트웨어 제품 개발의 경력을 이어 갔다.",
    "backgroundSourceIds": [
      "luckey-usc",
      "luckey-usaf"
    ],
    "connections": [
      {
        "personId": "david-nelson-mxr",
        "name": "David Nelson",
        "kind": "collaboration",
        "label": "MxR 연구소 협업",
        "description": "USC MxR 연구실에서 Luckey의 기술 업무를 감독하며 VR 시제품 개발에 함께 참여했다.",
        "period": "2010년 무렵",
        "sourceIds": [
          "luckey-usc"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "mark-bolas",
        "name": "Mark Bolas",
        "kind": "collaboration",
        "label": "MxR 연구소 협업",
        "description": "당시 MxR 소장 Bolas가 Luckey를 채용했고, 연구실의 저가형 VR 시제품 연구로 이어졌다.",
        "period": "Oculus 창업 이전",
        "sourceIds": [
          "luckey-usc"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "luckey-usc",
        "title": "USC ICT · David Nelson의 Palmer Luckey 연구실 회고",
        "url": "https://ict.usc.edu/news/stories/memories-of-palmer-luckey-at-mxr-and-where-were-heading-next/",
        "scope": "2010년 연구실 직원·상사 관계, Bolas의 채용, VR 시제품 협업, 2012년6월 MxR을 떠나 Oculus를 시작한 경로. 출생지·학위를 이 자료에서 확인하지 않아 생략했다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "luckey-usaf",
        "title": "US Air Force · 2019 Air Force Contracting Summit 공식 약력",
        "url": "https://ww3.safaq.hq.af.mil/Portals/63/Palmer_Luckey%20_Anduril%20Industries.pdf?ver=2019-03-20-141126-673",
        "scope": "Oculus 2012년 및 Anduril 2017년 설립, USC ICT MxR에서의 하드웨어 개발 배경.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "patrick-hayes",
    "origin": null,
    "education": [
      {
        "name": "University of Cambridge",
        "detail": "수학 학사",
        "period": "공식 소개의 학력",
        "sourceIds": [
          "hayes-ihmc"
        ]
      },
      {
        "name": "University of Edinburgh",
        "detail": "인공지능 박사",
        "period": "공식 소개의 학력",
        "sourceIds": [
          "hayes-ihmc"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-essex",
        "name": "University of Essex",
        "place": "영국",
        "period": "과거 교수 경력",
        "note": "컴퓨터과학을 가르치고 연구했다.",
        "sourceIds": [
          "hayes-ihmc"
        ]
      },
      {
        "institutionId": "university-of-rochester",
        "name": "University of Rochester",
        "place": "미국",
        "period": "과거 Luce Professor 경력",
        "note": "인지과학 분야 교수로 연구했다.",
        "sourceIds": [
          "hayes-ihmc"
        ]
      },
      {
        "institutionId": "ihmc",
        "name": "Institute for Human & Machine Cognition",
        "place": "미국",
        "period": "공식 소개 확인: 2026-11-11",
        "note": "Senior Research Scientist Emeritus. 지식 표현·자동 추론·공간과 시간·시맨틱 웹 연구.",
        "sourceIds": [
          "hayes-ihmc"
        ]
      }
    ],
    "background": "수학과 인공지능을 공부한 뒤 컴퓨터과학·철학·인지과학 분야에서 연구했다. 불완전한 세계 지식을 논리로 표현하는 문제와, 웹의 지식 표현에 형식적 의미를 부여하는 문제를 이어서 다뤘다.",
    "backgroundSourceIds": [
      "hayes-ihmc",
      "hayes-rdf"
    ],
    "connections": [
      {
        "personId": "john-mccarthy",
        "name": "John McCarthy",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "지식·행동 표현 공동연구",
        "description": "1969년 Some Philosophical Problems from the Standpoint of Artificial Intelligence의 공동저자다.",
        "period": "1969년",
        "sourceIds": [
          "hayes-mccarthy"
        ]
      }
    ],
    "sources": [
      {
        "id": "hayes-ihmc",
        "title": "IHMC · Pat Hayes 공식 소개",
        "url": "https://www.ihmc.us/groups/phayes/",
        "scope": "학력, Essex·Rochester·IHMC 및 기타 연구 경력과 지식 표현·시맨틱 웹 관심. 학위 연도와 출생지를 추정하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "hayes-mccarthy",
        "title": "McCarthy·Hayes · 1969년 공동논문 원문",
        "url": "https://www-formal.stanford.edu/jmc/mcchay69.pdf",
        "scope": "표제·두 공동저자, 지식 표현·상황·행동·프레임 문제. 연구 본문은 기존 매카시 1969년 카드의 확인 범위를 그대로 공유.",
        "accessed": "2026-11-11"
      },
      {
        "id": "hayes-rdf",
        "title": "W3C · RDF Semantics · 2004 Recommendation",
        "url": "https://www.w3.org/TR/2004/REC-rdf-mt-20040210/",
        "scope": "표제의 편집자 Patrick Hayes와 §0.1의 형식 의미론·타당한 추론 범위. 1999년 RDF 모델·문법 표준과 2004년 의미론을 구분.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "peter-thiel",
    "education": [
      {
        "name": "스탠퍼드대학교",
        "detail": "철학 학사 · B.A.",
        "sourceIds": [
          "thiel-sec-2023"
        ]
      },
      {
        "name": "스탠퍼드 로스쿨",
        "detail": "법학 전문학위 · J.D.",
        "period": "1992년",
        "sourceIds": [
          "thiel-sec-2023",
          "thiel-stanford-interview"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "palantir",
        "name": "Palantir Technologies",
        "place": "미국",
        "period": "2003년 공동창업",
        "note": "공동창업과 이사회 활동으로 데이터·운영 소프트웨어 기업에 참여했다. 2023년 공시는 공동창업자이며 2003년부터 이사회 의장이라고 설명한다.",
        "sourceIds": [
          "thiel-sec-2023",
          "thiel-founders-fund"
        ]
      },
      {
        "institutionId": "founders-fund",
        "name": "Founders Fund",
        "place": "실리콘밸리, 미국",
        "period": "2005년부터 파트너 · 2023년 공시 기준",
        "note": "기술 기업에 투자하는 벤처캐피털의 파트너로 참여했다. 투자회사의 투자와 틸 개인의 투자·기술 개발 역할을 각각 확인한다.",
        "sourceIds": [
          "thiel-sec-2023",
          "thiel-founders-fund"
        ]
      }
    ],
    "background": "스탠퍼드에서 철학과 법학을 공부하고 기업가·투자자로 활동했다. Palantir에서는 알렉스 카프 등과의 공동창업 및 이사회 역할을, Founders Fund에서는 벤처캐피털 파트너로서의 역할을 살펴본다. 기업의 설립·투자 관계와 그 기업이 개발한 AI 플랫폼의 기술적 구성을 구분해 연결한다.",
    "backgroundSourceIds": [
      "thiel-sec-2023",
      "thiel-founders-fund",
      "thiel-stanford-interview"
    ],
    "connections": [
      {
        "personId": "alex-karp",
        "name": "Alexander Karp",
        "nameKo": "알렉스 카프",
        "kind": "cofounder",
        "relation": "cofounded-with",
        "label": "Palantir 공동창업",
        "description": "Palantir의 2023년 SEC 위임장 공시는 카프와 틸을 각각 공동창업자로 명시한다. 이 연결은 공동창업 관계이며, 두 사람이 AIP를 공동 발명했다는 뜻이 아니다.",
        "period": "2003년 설립 · 2023년 공시에서 확인",
        "sourceIds": [
          "thiel-sec-2023"
        ]
      }
    ],
    "sources": [
      {
        "id": "thiel-sec-2023",
        "title": "Palantir · 2023 SEC 위임장 공시 · 인쇄 p.8",
        "url": "https://www.sec.gov/Archives/edgar/data/1321655/000132165523000033/pltr-20230425.htm",
        "scope": "이사 후보 소개와 표에서 Karp·Thiel의 공동창업자 표기, Thiel의 2003년부터 이사회 의장·2005년부터 Founders Fund 파트너 이력, Stanford 철학 B.A.·법학 J.D.를 확인했다. 공시 당시 직책과 현재 직책을 구분하며, 이 자료만으로 Founders Fund의 설립일이나 Thiel 개인의 개별 투자를 추정하지 않는다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "thiel-founders-fund",
        "title": "Founders Fund · Peter Thiel 공식 소개",
        "url": "https://foundersfund.com/team/peter-thiel/",
        "scope": "기업가·투자자, Palantir 공동창업자·의장, Founders Fund 파트너라는 역할을 확인했다. 펀드가 지원한 기업과 개인이 투자한 기업을 구분한다. 출생지·학위 연도는 이 소개에 제시되어 있지 않다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "thiel-stanford-interview",
        "title": "Stanford Law School · Peter Thiel·Mark Lemley 대담 · 2011-05-31",
        "url": "https://law.stanford.edu/stanford-lawyer/articles/q-a-legal-matters-with-peter-thiel-92-ba-89-bs-89-and-mark-a-lemley-ba-88/",
        "scope": "Thiel 자신의 답변에서 Stanford 학부에서 로스쿨로 이어진 학업과 1992년 법학 졸업을 확인했다. 같은 페이지의 Mark Lemley 약력·법률 실무 경력을 Thiel의 경력으로 가져오지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "robert-kowalski",
    "origin": {
      "label": "출생",
      "text": "브리지포트, 코네티컷, 미국",
      "sourceIds": [
        "kowalski-life-2025"
      ]
    },
    "education": [
      {
        "name": "University of Bridgeport · 브리지포트대학교",
        "detail": "수학 학사 · B.A.",
        "period": "1963",
        "sourceIds": [
          "kowalski-cv-2025"
        ]
      },
      {
        "name": "Stanford University · 스탠퍼드대학교",
        "detail": "수학 석사 · M.Sc.",
        "period": "1966",
        "sourceIds": [
          "kowalski-cv-2025"
        ]
      },
      {
        "name": "University of Edinburgh · 에든버러대학교",
        "detail": "컴퓨터과학 박사 · Ph.D.",
        "period": "1970",
        "sourceIds": [
          "kowalski-cv-2025"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-edinburgh",
        "name": "University of Edinburgh · 에든버러대학교",
        "period": "1967–1975 · 박사과정·연구원",
        "place": "에든버러, 스코틀랜드, 영국",
        "note": "박사과정에서 자동 정리증명을 연구했고, 1970년부터 계산논리 분야 연구원으로 재직했다. 이 시기에 목표를 하위 목표로 바꾸는 증명을 프로그램 실행으로 읽는 관점을 발전시켰다.",
        "sourceIds": [
          "kowalski-cv-2025",
          "kowalski-life-2025",
          "kowalski-1974"
        ]
      },
      {
        "institutionId": "aix-marseille-university",
        "name": "Marseille · Luminy 연구팀 방문",
        "period": "1971–1972년의 교류",
        "place": "마르세유, 프랑스",
        "note": "Colmerauer의 초청으로 방문해 문법을 논리로 표현하고 정리증명기를 구문 분석기로 사용하는 방법을 함께 연구했다. 두 사람의 회고는 1971년 첫 방문과 1972년의 두 달간 방문을 구분한다.",
        "sourceIds": [
          "kowalski-life-2025",
          "birth-prolog-archive"
        ]
      },
      {
        "institutionId": "imperial-college-london",
        "name": "Imperial College London · 임페리얼 칼리지 런던",
        "period": "1975년 합류 · 이후 계산논리 연구",
        "place": "런던, 잉글랜드, 영국",
        "note": "계산논리와 논리 프로그래밍 연구를 이어갔다. 이력서는 1975년 Reader 임용과 이후 교수·명예교수 경력을 구분한다.",
        "sourceIds": [
          "kowalski-cv-2025"
        ]
      }
    ],
    "background": "미국 브리지포트에서 태어나 수학과 수리논리를 공부한 뒤 에든버러에서 자동 정리증명을 연구했다. 결론을 증명하는 과정을 목표를 나누어 해결하는 계산으로 읽으려 했다. Colmerauer와의 마르세유 교류를 거쳐 논리 프로그래밍의 관점을 구체화했고, 이후 Imperial에서 계산논리 연구를 이어갔다.",
    "backgroundSourceIds": [
      "kowalski-cv-2025",
      "kowalski-life-2025",
      "kowalski-1974",
      "birth-prolog-archive"
    ],
    "connections": [
      {
        "personId": "alain-colmerauer",
        "name": "Alain Colmerauer",
        "nameKo": "알랭 콜메로에",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "Prolog 형성기의 마르세유·에든버러 공동연구",
        "description": "1971–1972년의 방문과 토론에서 논리로 문법을 표현하고 정리증명기를 계산 절차로 읽는 방법을 함께 연구했다. 이 교류는 마르세유 팀의 Prolog 설계·구현과 Kowalski의 논리 프로그래밍 연구를 연결한다.",
        "period": "1971–1972",
        "sourceIds": [
          "kowalski-life-2025",
          "birth-prolog-archive"
        ]
      }
    ],
    "sources": [
      {
        "id": "kowalski-cv-2025",
        "title": "Robert Anthony Kowalski · Imperial 보관 이력서 · 2025-09-18",
        "url": "https://www.doc.ic.ac.uk/~rak/CV.pdf",
        "scope": "PDF 1–2쪽의 Education·Employment를 본문과 지면으로 대조했다. Bridgeport 수학 학사, Stanford 수학 석사, Edinburgh 컴퓨터과학 박사와 각각의 학업 기간, Edinburgh 연구원 1970–1975년, Imperial 합류 1975년을 확인했다. Chicago·Warsaw의 수학 기록을 추가 학위로 바꾸지 않았고, 전체 논문 목록이나 모든 인사 문서의 검토로 확대하지 않는다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "kowalski-life-2025",
        "title": "Robert Kowalski · A Short Story of My Life and Work · 2025년 개정본",
        "url": "https://www.doc.ic.ac.uk/~rak/history.pdf",
        "scope": "본인의 회고 PDF 1–5쪽에서 출생지·학업 배경·Edinburgh 연구와 Marseille 방문을 읽었고, 4–5쪽은 지면으로 대조했다. 1971년 Colmerauer의 초청, 함께 문법과 증명기를 연구한 작업, 1972년의 두 달간 재방문과 논리 프로그래밍에 관한 설명을 확인했다. 저자의 회고와 역할에 대한 자기평가를 역사적 우선권의 독립적인 판정으로 확대하지 않는다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "kowalski-1974",
        "title": "Robert Kowalski · Predicate Logic as Programming Language · 1974",
        "url": "https://www.doc.ic.ac.uk/~rak/papers/IFIP%2074.pdf",
        "scope": "인쇄 p.569 / PDF 1쪽의 단독 저자·Edinburgh 소속·초록·도입을 지면으로 대조했다. 함의를 절차 선언으로, 조건을 절차 호출로, 증명을 계산으로 해석하는 관점을 확인했다. 이 논문을 Colmerauer·Roussel과의 공동 논문으로 표시하지 않는다. 세부 실행과 원문 그림의 검토는 연결된 연구 카드의 별도 출처 범위를 따른다.",
        "accessed": "2026-11-14"
      },
      {
        "id": "birth-prolog-archive",
        "title": "Computer History Museum · Colmerauer·Roussel, The Birth of Prolog 보존 기록",
        "url": "https://softwarepreservation.computerhistory.org/prolog/#ColmerauerAndRoussel1996",
        "scope": "CHM의 서지·보존 기록과 연결된 저자 보관 원고를 확인했다. 직접 읽은 26쪽 PDF 표지는 November 1992이며, PDF 2쪽의 자연어 소통 목표와 참여자, 5–6쪽의 1971·1972년 Kowalski 방문, SL-resolution 논의, Roussel의 1972년 Algol-W 구현을 본문과 지면으로 대조했다. 이 초고와 CHM이 구분해 수록한 1996년 HOPL-II 출판본을 같은 판본으로 표시하지 않는다. 교류의 정확한 월·계절이나 초록의 연도 표기를 전기 연표의 근거로 사용하지 않는다.",
        "accessed": "2026-11-14"
      }
    ]
  },
  {
    "personId": "ronald-williams",
    "education": [],
    "researchPlaces": [
      {
        "institutionId": "uc-san-diego",
        "name": "University of California, San Diego · Institute for Cognitive Science",
        "period": "1986년 공동논문에 표기된 소속",
        "place": "La Jolla, California, 미국",
        "note": "Nature 논문 첫쪽에서 Rumelhart와 Williams의 이름에 같은 별표가 붙고, 이 연구소 소속으로 연결된다. Hinton의 소속은 Carnegie Mellon으로 따로 적혀 있다.",
        "sourceIds": [
          "nature-1986"
        ]
      },
      {
        "institutionId": "northeastern-university",
        "name": "Northeastern University · Khoury College of Computer Sciences",
        "period": "1986 합류 · 대학 추모 기사의 22년 재직 기록",
        "place": "Boston, Massachusetts, 미국",
        "note": "컴퓨터과학 교수로 합류해 신경망·순환망·강화학습 연구를 이어갔다. 대학의 2024년 추모 기사는 22년의 재직과 명예교수 경력을 소개한다.",
        "sourceIds": [
          "khoury-tribute",
          "author-publications"
        ]
      }
    ],
    "background": "대학 추모 기사는 윌리엄스를 미국 남부캘리포니아 출신으로 소개한다. 1986년 역전파 논문에는 UC San Diego의 인지과학 연구소 소속으로 이름을 올렸고, 같은 해 Northeastern의 컴퓨터과학 교수로 합류했다. 최종 오차로 중간 표현을 학습하는 공동연구에서 나아가, 시간에 따라 상태가 달라지는 순환망과 강화학습도 연구했다. 추모 기사는 학부·박사과정 때 기타와 키보드를 연주하며 지역 밴드에서 활동했던 모습도 전한다.",
    "backgroundSourceIds": [
      "khoury-tribute",
      "nature-1986",
      "author-publications"
    ],
    "connections": [
      {
        "personId": "david-rumelhart",
        "name": "David E. Rumelhart",
        "nameKo": "데이비드 루멜하트",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "역전파 공동 논문",
        "description": "Hinton과 함께 1986년 Nature 논문 Learning representations by back-propagating errors를 발표했다. 최종 정답과 출력의 차이로 연결을 바꾸면서, 중간층의 표현도 학습하는 절차를 설명했다.",
        "period": "1986",
        "sourceIds": [
          "nature-1986",
          "khoury-tribute"
        ]
      },
      {
        "personId": "geoffrey-hinton",
        "name": "Geoffrey E. Hinton",
        "nameKo": "제프리 힌턴",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "역전파 공동 논문",
        "description": "Rumelhart와 함께 출력의 오차에서 각 연결의 기울기를 구하고, 중간 표현을 학습하는 1986년 논문의 공동저자다. Williams·Rumelhart는 UC San Diego, Hinton은 Carnegie Mellon 소속으로 표기되어 있다.",
        "period": "1986",
        "sourceIds": [
          "nature-1986"
        ]
      }
    ],
    "sources": [
      {
        "id": "nature-1986",
        "title": "Rumelhart·Hinton·Williams · Learning representations by back-propagating errors (Nature, 1986)",
        "url": "https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf",
        "scope": "원논문 인쇄 p.533의 표제·세 공동저자·UC San Diego와 Carnegie Mellon 소속을 지면으로 직접 대조했다. 같은 쪽의 초록·도입은 출력 오차에 따른 연결 갱신과 숨은 단위의 표현 학습을 설명한다. 첫쪽 상단의 앞 논문은 이 연구 내용에서 제외한다. 수식·도판의 상세 검토는 연결된 역전파 연구 카드의 출처에 기록한다.",
        "accessed": "2026-11-12"
      },
      {
        "id": "khoury-tribute",
        "title": "Khoury College · A tribute to Ron Williams, Khoury professor and machine learning pioneer",
        "url": "https://www.khoury.northeastern.edu/a-tribute-to-ron-williams-khoury-professor-and-machine-learning-pioneer/",
        "scope": "대학의 2024-03-05 추모 기사 전체를 확인했다. 남부캘리포니아 출신이라는 지역 단위 소개, 1986년 Northeastern 합류, 22년 재직, 명예교수, 역전파 세 공동저자, 순환망·강화학습 연구와 학업 중 음악 활동을 확인한다. 기사의 영향력 평가·인용 수·우선권 표현을 독립 검증된 결과로 옮기지 않는다. 구체적 출생 도시·학위 연도·지도교수는 이 기사로 확정하지 않는다.",
        "accessed": "2026-11-12"
      },
      {
        "id": "author-publications",
        "title": "Ronald J. Williams · Publications available for downloading",
        "url": "https://www.khoury.northeastern.edu/home/rjw/pubs.html",
        "scope": "대학 도메인에 보관된 저자 논문 목록에서 Williams·Zipser (1989)의 순환망 학습, Williams·Peng (1990)의 온라인 순환망 학습, Williams (1992)의 강화학습 논문 서지와 요약을 확인했다. 이 인물 소개가 해당 논문들의 전체 실험을 재검토했다는 뜻은 아니다. 세 연구를 1986년 Nature 논문이나 LSTM과 같은 알고리즘으로 합치지 않는다.",
        "accessed": "2026-11-12"
      }
    ]
  },
  {
    "personId": "sam-altman",
    "origin": {
      "label": "성장",
      "text": "세인트루이스, 미국 · Stanford 강연의 소개 기록",
      "sourceIds": [
        "stanford-talk"
      ]
    },
    "education": [
      {
        "name": "스탠퍼드대학교",
        "detail": "컴퓨터과학 재학 뒤 Loopt 창업 경로로 이동 · 학위 취득으로 표시하지 않음",
        "period": "2년 재학 · 기관 강연 소개의 기록",
        "sourceIds": [
          "stanford-talk"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "y-combinator",
        "name": "Y Combinator",
        "place": "미국",
        "period": "2014–2019 · president",
        "note": "Stanford의 공식 강연 소개가 기록한 창업 지원 조직 경력이다. AI 논문의 연구 소속으로 표시하지 않는다.",
        "sourceIds": [
          "stanford-talk"
        ]
      },
      {
        "institutionId": "openai",
        "name": "OpenAI",
        "place": "미국",
        "period": "2015 공동의장 · 2019 CEO 표기 · 2025 인프라 발표",
        "note": "날짜가 다른 공식 자료로 연구 조직·경영·제품·계산 기반의 역할을 읽는다. 연구·알고리즘의 단독 발명과 구분한다.",
        "sourceIds": [
          "openai-2015",
          "openai-lp",
          "stargate-2025"
        ]
      }
    ],
    "background": "세인트루이스에서 성장해 스탠퍼드에서 컴퓨터과학을 공부한 뒤 창업과 창업 지원 조직의 경로를 거쳤다. OpenAI에서는2015년 공동의장으로 소개됐고, 이후 공식 자료는 경영과 모형·제품·계산 기반을 연결하는 역할을 기록한다.",
    "backgroundSourceIds": [
      "stanford-talk",
      "openai-2015",
      "openai-lp",
      "stargate-2025"
    ],
    "connections": [
      {
        "personId": "elon-musk",
        "name": "Elon Musk",
        "nameKo": "일론 머스크",
        "kind": "institution",
        "relation": "shared-institution-with",
        "label": "OpenAI 초기 공동의장",
        "description": "2015년 OpenAI 공식 설립 발표는 Altman과 Musk를 공동의장으로 명시한다. 같은 조직의 초기 역할이며 논문 공동저술 관계가 아니다.",
        "period": "2015",
        "sourceIds": [
          "openai-2015"
        ]
      },
      {
        "personId": "ilya-sutskever",
        "name": "Ilya Sutskever",
        "nameKo": "일리야 수츠케버",
        "kind": "institution",
        "relation": "shared-institution-with",
        "label": "초기 조직의 경영·연구 역할",
        "description": "2015년 같은 공식 발표에서 Altman은 공동의장, Sutskever는 연구책임자로 구분돼 있다. 이 기록은 개인 간 공동 논문이나 지도 관계를 뜻하지 않는다.",
        "period": "2015",
        "sourceIds": [
          "openai-2015"
        ]
      }
    ],
    "sources": [
      {
        "id": "stanford-talk",
        "title": "Stanford eCorner · The Possibilities of AI · Sam Altman",
        "url": "https://stvp.stanford.edu/av/possibilities-ai-entire-talk",
        "scope": "2024-05-01 공식 강연 페이지와 Read Transcript의 공식 전사 https://stvp.stanford.edu/node/10731/printable/print 에서00:00:20–00:02:47의 기관 소개를 직접 확인했다. St.Louis 성장·Stanford 컴퓨터과학2년 재학·Loopt·YC2014–2019가 명시된다. 전체 영상 재생·전사 전체 검토는 수행하지 않았다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "openai-2015",
        "title": "OpenAI · Introducing OpenAI",
        "url": "https://openai.com/index/introducing-openai/",
        "scope": "2015-12-11. 공동의장Altman·Musk, 연구책임자Sutskever, 조직·후원자 문단을 확인. 현재직책이나 공동논문 관계로 확대하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "openai-lp",
        "title": "OpenAI · OpenAI LP",
        "url": "https://openai.com/index/openai-lp/",
        "scope": "2019-03-11. 계산·인력·슈퍼컴퓨터의 자본 필요성과 당시CEO SamAltman표기,명단의시점각주를 확인.",
        "accessed": "2026-11-11"
      },
      {
        "id": "stargate-2025",
        "title": "OpenAI·SoftBank · Announcing The Stargate Project",
        "url": "https://openai.com/index/announcing-the-stargate-project/",
        "scope": "2025-01-21. 초기투자참여자·재무/운영책임·기술파트너·기존Microsoft/Azure연결. 투자의향을집행액이나실제가동용량으로바꾸지 않는다.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "sepp-hochreiter",
    "origin": {
      "label": "출생",
      "text": "바이에른, 독일 · 기관 소개가 확인하는 지역 단위",
      "sourceIds": [
        "jku-lstm-profile"
      ]
    },
    "education": [
      {
        "name": "뮌헨공과대학교 · TUM",
        "detail": "Untersuchungen zu dynamischen neuronalen Netzen 디플롬 논문",
        "period": "1991",
        "sourceIds": [
          "jku-publications"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "technical-university-munich",
        "name": "뮌헨공과대학교 · TUM",
        "place": "뮌헨, 독일",
        "period": "1991 디플롬 논문 · 1997 LSTM 논문의 소속",
        "note": "순환망의 학습 신호 문제와 LSTM 공동연구를 연결해 읽는다.",
        "sourceIds": [
          "jku-publications",
          "lstm-original"
        ]
      },
      {
        "institutionId": "johannes-kepler-university-linz",
        "name": "요하네스 케플러 대학교 린츠 · JKU",
        "place": "린츠, 오스트리아",
        "period": "2006년 합류 · 2016년 기관 소개의 기록",
        "note": "기관 소개는 이전 TUM·Colorado·TU Berlin 경력과 JKU 생물정보학 연구소 활동을 기록한다. 당시 직책을 현재 직책으로 옮기지 않는다.",
        "sourceIds": [
          "jku-lstm-profile"
        ]
      }
    ],
    "background": "독일 바이에른 출생으로 소개되며 TUM에서 1991년 순환 신경망에 관한 디플롬 논문을 썼다. 슈미트후버와의 1997년 LSTM 연구 뒤에도 여러 기관에서 학습 시스템을 연구했고, JKU에는 2006년에 합류한 것으로 기관 소개에 기록돼 있다.",
    "backgroundSourceIds": [
      "jku-lstm-profile",
      "jku-publications",
      "lstm-original"
    ],
    "connections": [
      {
        "personId": "jurgen-schmidhuber",
        "name": "Jürgen Schmidhuber",
        "nameKo": "위르겐 슈미트후버",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "LSTM 공동저자",
        "description": "1997년 Long Short-Term Memory의 두 공동저자다. 박사 지도와 공동저술은 같은 관계가 아니므로 여기서는 원논문이 직접 확인하는 공동연구로 연결한다.",
        "period": "1997",
        "sourceIds": [
          "lstm-original"
        ]
      }
    ],
    "sources": [
      {
        "id": "jku-lstm-profile",
        "title": "JKU Linz Institute of Technology · Sepp Hochreiter",
        "url": "https://www.jku.at/en/linz-institute-of-technology/research/lit-calls/hochreiter/",
        "scope": "2016 LIT 프로젝트 소개의 전기 단락: 바이에른 출생·JKU2006 합류·TUM/Colorado/TU Berlin 경력·1991 학위논문·1997 첫 LSTM 출판. 기관의 우선권·성공 평가를 독립 검증된 순위로 확대하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "jku-publications",
        "title": "JKU Institut für Machine Learning · 과거 출판물 목록",
        "url": "https://www.jku.at/institut-fuer-machine-learning/forschung/publikationen/older/",
        "scope": "Untersuchungen zu dynamischen neuronalen Netzen을1991 Diploma thesis, Institut für Informatik·Lehrstuhl Prof.Brauer·TUM으로 명시하는 서지를 확인. 논문 전체를 이번 인물 소개에서 검토했다고 주장하지 않는다.",
        "accessed": "2026-11-11"
      },
      {
        "id": "lstm-original",
        "title": "Hochreiter·Schmidhuber · Long Short-Term Memory (1997)",
        "url": "https://web.stanford.edu/class/psych209/Readings/HochreiterSchmidthuber97LSTM.pdf",
        "scope": "기존 LSTM 상세 카드의 원논문. 저자·TUM/IDSIA 소속·기억과 학습 신호의 문제를 연결한다. 현행 forget-gate LSTM을 1997년 전체 구조와 같게 표시하지 않는다.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "seymour-papert",
    "origin": {
      "label": "출생",
      "text": "남아프리카 프리토리아 · 1928년",
      "sourceIds": [
        "papert-mit"
      ]
    },
    "education": [
      {
        "name": "University of the Witwatersrand",
        "detail": "철학 학사·수학 박사",
        "period": "1949·1952년",
        "sourceIds": [
          "papert-mit"
        ]
      },
      {
        "name": "University of Cambridge",
        "detail": "수학 연구·두 번째 박사학위",
        "period": "1950년대",
        "sourceIds": [
          "papert-mit"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-geneva",
        "name": "제네바대학교",
        "place": "제네바, 스위스",
        "period": "MIT 합류 이전",
        "note": "Jean Piaget와 인간의 지식 형성을 연구했다.",
        "sourceIds": [
          "papert-mit"
        ]
      },
      {
        "institutionId": "massachusetts-institute-of-technology",
        "name": "MIT AI Lab·Media Lab",
        "place": "케임브리지, 미국",
        "period": "1963년 합류 · 1967년 교수 · 1985년 Media Lab 창립 교수진",
        "note": "Minsky와 Perceptrons를 공동 집필했고 이후 Epistemology and Learning 연구를 이끌었다.",
        "sourceIds": [
          "papert-mit"
        ]
      }
    ],
    "background": "남아프리카에서 철학과 수학을 공부하고 Cambridge에서 수학 연구를 이어갔다. Geneva에서 Piaget와 연구한 뒤 1963년 MIT에 합류했다. 인간이 지식을 구성하는 과정과, 계산 장치가 표현할 수 있는 판단의 범위를 함께 탐구했다.",
    "backgroundSourceIds": [
      "papert-mit"
    ],
    "connections": [
      {
        "personId": "marvin-minsky",
        "name": "Marvin Minsky",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "Perceptrons 공동저자",
        "description": "1969년 Perceptrons를 공동 집필했다. 서로 다른 지능 구현 방식의 우열을 인물 개인의 대립으로 단순화하지 않는다.",
        "period": "1969년",
        "sourceIds": [
          "papert-mit",
          "papert-publisher"
        ]
      }
    ],
    "sources": [
      {
        "id": "papert-mit",
        "title": "MIT Media Lab · In memory: Seymour Papert",
        "url": "https://www.media.mit.edu/posts/in-memory-seymour-papert/",
        "scope": "2017년 게재된 기관 추모·경력 자료. 출생·학업·Piaget와의 연구·MIT 합류·Minsky 공동저술. Cambridge의 두 번째 박사학위는 정확한 수여연도를 별도로 확정하지 않고 1950년대로 표기.",
        "accessed": "2026-11-11"
      },
      {
        "id": "papert-publisher",
        "title": "MIT Press · Perceptrons 판본·저자",
        "url": "https://mitpress.mit.edu/9780262534772/perceptrons/",
        "scope": "1969년 초판 공동저자와 1988년 확장판의 2017년 재판을 구분.",
        "accessed": "2026-11-11"
      }
    ]
  },
  {
    "personId": "thomas-gruber",
    "origin": null,
    "education": [
      {
        "name": "Loyola University New Orleans · 로욜라대학교 뉴올리언스",
        "detail": "심리학·컴퓨터과학 복수전공 학사 · B.S.",
        "period": "1981년 5월",
        "sourceIds": [
          "stanford-cv-archived",
          "loyola-program-2025"
        ]
      },
      {
        "name": "University of Massachusetts Amherst · 매사추세츠대학교 애머스트",
        "detail": "Computer and Information Science 석사·박사 · 박사논문 The Acquisition of Strategic Knowledge",
        "period": "석사 1984년 2월 · 박사 1988년 9월",
        "sourceIds": [
          "stanford-cv-archived",
          "loyola-program-2025"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-massachusetts-amherst",
        "name": "University of Massachusetts Amherst · Experimental Knowledge Systems Laboratory",
        "period": "1986–1988 · Research Assistant",
        "place": "애머스트, 매사추세츠, 미국",
        "note": "전문가가 다음 행동을 선택하는 전략 지식을 컴퓨터가 획득하도록 연구했다. 1988년 보고서는 전문가의 판단 근거와 피드백을 받아 전략 규칙을 만드는 대화형 보조 도구를 설명한다.",
        "sourceIds": [
          "stanford-cv-archived",
          "umass-method-1988"
        ]
      },
      {
        "institutionId": "stanford-university",
        "name": "Stanford University · Knowledge Systems Laboratory",
        "period": "1988–1994 · Research Associate",
        "place": "스탠퍼드, 캘리포니아, 미국",
        "note": "지식 표현·모형 구성·설명 생성과 지식 공유를 연구했다. Ontolingua를 개발해, 함께 쓸 개념 명세를 서로 다른 지식 표현 체계에 옮기려 했다. 1993년 논문도 Stanford KSL 소속을 명시한다.",
        "sourceIds": [
          "stanford-cv-archived",
          "ontology-1993"
        ]
      }
    ],
    "background": "로욜라에서 심리학과 컴퓨터과학을 함께 공부하고, UMass에서 전문가의 판단을 프로그램의 전략 지식으로 옮기는 연구로 박사학위를 받았다. Stanford KSL에서는 지식의 획득과 함께, 서로 다른 AI 시스템이 지식을 공유·재사용할 수 있는 표현을 연구했다.",
    "backgroundSourceIds": [
      "stanford-cv-archived",
      "loyola-program-2025",
      "umass-method-1988",
      "ontology-1993"
    ],
    "connections": [],
    "sources": [
      {
        "id": "stanford-cv-archived",
        "title": "Stanford KSL · Thomas Robert Gruber · 당시 이력서 보존본",
        "url": "https://web.archive.org/web/20080622024833id_/http://www-ksl.stanford.edu/people/gruber/gruber-cv.html",
        "scope": "Stanford KSL에서 공개한 이력서의 Education·Professional Experience 항목을 보존본으로 읽었다. 1981년 5월 Loyola 학사, 1984년 2월 UMass 석사와 1988년 9월 박사, 학위논문 제목, UMass EKSL 1986–1988년과 Stanford KSL 1988–1994년의 직책을 확인했다. 박사논문 전체나 학위증 원본을 검토한 범위로 확대하지 않는다. 이력서의 과거 present 표기는 현재 직책으로 옮기지 않았다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "loyola-program-2025",
        "title": "Loyola University New Orleans · 2025 졸업식 공식 프로그램 · Tom Gruber ’81",
        "url": "https://commencement.loyno.edu/sites/default/files/2025-05/LOYNO_Commencement-Program-Book_GradUndergrad_Class-of-2025-DIGITAL.pdf",
        "scope": "40쪽 공식 프로그램의 PDF 8쪽·인쇄 6쪽 Tom Gruber 소개를 본문과 지면으로 대조했다. Loyola 심리학·컴퓨터과학 복수전공 B.S., UMass의 Computer and Information Science M.S.·Ph.D.를 확인했다. 학위별 월·연도는 당시 Stanford 이력서로 대조했다. 2025년 명예학위와 정규 학력을 구분하며 이 프로그램의 현재 기업 직책은 원고에 추가하지 않았다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "umass-method-1988",
        "title": "UMass Amherst · Gruber (1988) · A Method for Acquiring Strategic Knowledge · COINS 88-53",
        "url": "https://web.cs.umass.edu/publication/docs/1988/UM-CS-1988-053.pdf",
        "scope": "대학이 공개한 보고서의 표제·소속·초록을 읽었다. 1988년 5월 Thomas R. Gruber의 UMass EKSL 연구, 전문가와의 대화·판단 근거·피드백으로 전략 지식을 획득하려는 목적을 확인했다. 이 보고서를 학위논문 본문으로 표시하지 않으며, 감사의 글의 협력·지도 표현만으로 개인의 박사 지도 관계를 추가하지 않았다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "ontology-1993",
        "title": "Gruber (1993) · A Translation Approach to Portable Ontology Specifications · 저자 공개본",
        "url": "https://tomgruber.org/writing/ontolingua-kaj-1993.pdf",
        "scope": "27쪽 저자 공개본의 PDF 1쪽 표지, 2–3쪽 정의·공유 문제, 6–8쪽 Ontolingua·KIF·번역 범위를 읽었다. 표지의 1992년 9월 보고서·1993년 4월 개정과 1993년 학술지 출판을 구분했다. 공동 개념 명세를 여러 지식 표현 체계에서 재사용하려는 목적을 확인했으며, 1993년 도구가 후대 웹 표준을 구현했다고 서술하지 않는다.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "tim-berners-lee",
    "origin": {
      "label": "출생",
      "text": "런던, 잉글랜드 · 1955년 6월 8일",
      "sourceIds": [
        "w3c-longer-biography"
      ]
    },
    "education": [
      {
        "name": "University of Oxford · The Queen’s College",
        "detail": "물리학 학사 · BA Hons (I) Physics",
        "period": "1973–1976 · 1976년 졸업",
        "sourceIds": [
          "w3c-longer-biography"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "cern",
        "name": "CERN · 유럽입자물리연구소",
        "period": "1980년 6–12월 · 1984년 연구원으로 재합류",
        "place": "제네바 인근, 스위스",
        "note": "1980년 ENQUIRE로 관련 정보를 연결해 기록했다. 1989년 웹을 제안하고 1990년 첫 웹 서버와 브라우저·편집기를 구현했다. 서로 다른 컴퓨터와 기관의 과학자들이 정보를 공유하도록 하려는 문제에서 출발했다.",
        "sourceIds": [
          "w3c-longer-biography",
          "web-proposal-1989",
          "cern-web-history"
        ]
      },
      {
        "institutionId": "massachusetts-institute-of-technology",
        "name": "MIT · Laboratory for Computer Science / World Wide Web Consortium",
        "period": "1994년 W3C 설립 · 2001년 글의 저자 소개",
        "place": "케임브리지, 매사추세츠, 미국",
        "note": "1994년 MIT의 LCS에 W3C를 설립했다. 2001년 글은 버너스리를 웹의 발명자이자 W3C 소장으로 소개하며, Hendler·Lassila와 함께 프로그램이 개념·관계를 따라 웹의 정보를 활용하는 구상을 설명한다.",
        "sourceIds": [
          "w3c-longer-biography",
          "semantic-web-2001"
        ]
      }
    ],
    "background": "런던에서 태어나 Oxford에서 물리학을 공부했다. CERN에서 사람·소프트웨어·문서에 관한 정보를 연결하는 ENQUIRE를 만들고, 1989년에는 분산된 정보를 연결하는 웹을 제안했다. 1994년 W3C를 설립한 뒤, 문서 연결에서 데이터의 개념과 관계를 공유하는 시맨틱 웹의 구상으로 이어갔다.",
    "backgroundSourceIds": [
      "w3c-longer-biography",
      "web-proposal-1989",
      "cern-web-history",
      "semantic-web-2001"
    ],
    "connections": [
      {
        "personId": "james-hendler",
        "name": "James Hendler",
        "nameKo": "제임스 헨들러",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "시맨틱 웹 비전 공동저술",
        "description": "Hendler는 버너스리·Lassila와 2001년 The Semantic Web을 함께 썼다. 여러 출처의 데이터에 개념과 관계를 명시하고, 프로그램이 사용자의 목표에 맞게 정보를 조합하는 비전을 설명한 공동저술 관계로 연결한다. 개별 아이디어의 단독 기여나 지도 관계는 추정하지 않는다.",
        "period": "2001년 5월 · The Semantic Web",
        "sourceIds": [
          "semantic-web-2001",
          "semantic-web-author-page"
        ]
      },
      {
        "personId": "ora-lassila",
        "name": "Ora Lassila",
        "nameKo": "오라 라실라",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "시맨틱 웹 비전 공동저술",
        "description": "Lassila는 버너스리·Hendler와 2001년 The Semantic Web을 함께 썼고, 자신의 웹사이트에 저자 공개본과 서지를 제공한다. 이 공동저술을 관계의 근거로 삼으며, 세 사람의 역할 분담이나 글의 사례가 실제로 실행됐다는 결론으로 넓히지 않는다.",
        "period": "2001년 5월 · The Semantic Web",
        "sourceIds": [
          "semantic-web-2001",
          "semantic-web-author-page"
        ]
      }
    ],
    "sources": [
      {
        "id": "w3c-longer-biography",
        "title": "W3C · Tim Berners-Lee · Longer Biography",
        "url": "https://www.w3.org/People/Berners-Lee/Longer.html",
        "scope": "Background·Education 본문을 읽었다. 런던 출생과 생년월일, Queen’s College의 1973–1976년 물리학 BA Hons (I), 1980년 6–12월 CERN 자문·ENQUIRE, 1984년 연구원 재합류, 1989년 제안·1990년 구현, 1994년 MIT LCS의 W3C 설립을 확인했다. 과거·현재 직책이 섞인 전기이므로 재직 종료 시점이나 현재 직함으로 확장하지 않았다. 명예학위는 정규 학력에 추가하지 않았다. 이 페이지의 2001년 글 쪽수 표기는 사용하지 않고 저자 공개본의 실제 판면과 서지 페이지를 따른다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "web-proposal-1989",
        "title": "Berners-Lee · Information Management: A Proposal · 1989/1990 원문 HTML 보존본",
        "url": "https://www.w3.org/History/1989/proposal.html",
        "scope": "문서 머리말과 Losing Information at CERN·Linked information systems·Personal Experience with Hypertext 절을 읽었다. 1989년 3월 원문에 1990년 5월 날짜를 더한 HTML 전사본이라는 설명, 인력 이동으로 정보가 잃어버려지는 문제, 사람·소프트웨어·문서·개념과 연결 유형을 기록하려는 제안, 1980년 ENQUIRE의 용도를 확인했다. 2001년 시맨틱 웹의 완료된 구현으로 표시하지 않는다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "cern-web-history",
        "title": "CERN · A short history of the Web",
        "url": "https://home.cern/science/computing/the-birth-of-the-web/short-history-web",
        "scope": "공식 역사 본문을 읽었다. 1989년 CERN에서의 웹 제안과 과학자들의 자동 정보 공유라는 배경, 1990년 말 첫 서버·브라우저 구현을 확인했다. CERN의 현재 웹사이트 경로를 사용하며, 네트워크 공개의 여러 시점을 특정 하루로 합치지 않았다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "semantic-web-2001",
        "title": "Berners-Lee·Hendler·Lassila (2001) · The Semantic Web · 저자 공개 PDF",
        "url": "https://lassila.org/publications/2001/SciAm.pdf",
        "scope": "PDF 2쪽의 제목·공동저자, 7쪽 저자 소개, 3–4쪽 가상 예약 사례와 비전, 7–8쪽 개념·관계·어휘 대응의 논지를 확인했다. PDF 1–10쪽은 인쇄 34–43쪽에 대응한다. 세 사람의 공동저술을 공동연구 연결의 근거로 사용하며, 가상 사례를 실제 실행 결과나 평가 수치로 바꾸지 않는다.",
        "accessed": "2026-11-15"
      },
      {
        "id": "semantic-web-author-page",
        "title": "Ora Lassila · The Semantic Web · 저자 공개본과 서지",
        "url": "https://lassila.org/publications/2001/SciAm.html",
        "scope": "저자 공개 페이지의 세 공동저자 순서와 Scientific American 284(5):34–43, May 2001 서지를 확인했다. 공저 사실만으로 지도·고용·단독 발명 관계를 추가하지 않았다.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "tomas-mikolov",
    "origin": null,
    "education": [
      {
        "name": "브르노공과대학교(VUT)",
        "detail": "신경망 기반 통계적 언어모형 박사 · 지도교수 Jan Černocký",
        "period": "2012",
        "sourceIds": [
          "mikolov-vut-thesis"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "google-brain",
        "name": "Google Brain",
        "place": "기업 연구",
        "period": "2012년 이동",
        "note": "신경 언어모형 연구를 이어 가며 word2vec 개발",
        "sourceIds": [
          "mikolov-cvut-interview",
          "mikolov-charles-bio"
        ]
      },
      {
        "institutionId": "facebook-ai-research",
        "name": "Facebook AI Research",
        "place": "기업 연구",
        "period": "2014–2020",
        "note": "언어와 지능 알고리즘을 연구했다",
        "sourceIds": [
          "mikolov-ciirc-announcement"
        ]
      },
      {
        "institutionId": "ciirc-ctu",
        "name": "CIIRC · 체코공과대학교",
        "place": "프라하, 체코",
        "period": "2020년 합류",
        "note": "체코로 돌아와 기초 AI 연구팀을 꾸렸다",
        "sourceIds": [
          "mikolov-ciirc-announcement"
        ]
      }
    ],
    "background": "체코 브르노공과대학교에서 신경망 언어모형으로 박사학위를 받았다. Google Brain과 Facebook AI Research를 거쳐 2020년 체코로 돌아와 CIIRC에서 기초 AI 연구팀을 꾸렸다.",
    "backgroundSourceIds": [
      "mikolov-vut-thesis",
      "mikolov-ciirc-announcement"
    ],
    "connections": [
      {
        "personId": "jan-cernocky",
        "name": "Jan Černocký",
        "kind": "advisor",
        "label": "박사 지도교수",
        "description": "브르노공과대학교 박사학위 논문을 지도했다.",
        "period": "2012",
        "sourceIds": [
          "mikolov-vut-thesis"
        ],
        "relation": "student-of"
      },
      {
        "personId": "ilya-sutskever",
        "name": "Ilya Sutskever",
        "kind": "collaboration",
        "label": "단어 표현 공동저자",
        "description": "2013년 단어·구의 분산 표현 논문의 공동저자다.",
        "period": "2013",
        "sourceIds": [
          "mikolov-word-phrase-paper"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "mikolov-vut-thesis",
        "title": "Brno University of Technology · Mikolov 박사학위 기록",
        "url": "https://www.fit.vut.cz/study/phd-thesis/283/.cs",
        "scope": "학위논문제목·지도JanČernocký·2012-10-02심사통과",
        "accessed": "2026-11-10"
      },
      {
        "id": "mikolov-ciirc-announcement",
        "title": "CIIRC CTU · Tomáš Mikolov 합류 발표, 2020",
        "url": "https://www.ciirc.cvut.cz/cs/svetove-uznavany-expert-tomas-mikolov-prichazi-z-facebook-ai-do-ciirc-cvut-zameri-se-na-vyvoj-silne-umele-inteligence/",
        "scope": "2014년부터FacebookAI연구·2020년4월CIIRC합류·기초AI연구팀 구성",
        "accessed": "2026-11-10"
      },
      {
        "id": "mikolov-cvut-interview",
        "title": "CTU Prague · Mikolov 연구 경력 인터뷰",
        "url": "https://aktualne.cvut.cz/zpravy-z-medii/20231120-tomas-mikolov-umela-inteligence-zatim-zustava-nepochopena",
        "scope": "본인의2012년Google이동발언. 날짜가정아닌인터뷰발언으로확인",
        "accessed": "2026-11-10"
      },
      {
        "id": "mikolov-charles-bio",
        "title": "Charles University ÚFAL · Understanding Language Modeling, 2021",
        "url": "https://ufal.mff.cuni.cz/events/understanding-language-modeling",
        "scope": "GoogleBrain·FacebookAIResearch 과거경력과 word2vec·fastText 개발",
        "accessed": "2026-11-10"
      },
      {
        "id": "mikolov-word-phrase-paper",
        "title": "Mikolov 외 · Distributed Representations of Words and Phrases and their Compositionality",
        "url": "https://arxiv.org/abs/1310.4546",
        "scope": "Mikolov·Sutskever·KaiChen·GregCorrado·JeffreyDean의2013공동저자서지",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "walter-pitts",
    "origin": {
      "label": "성장",
      "text": "디트로이트, 미국",
      "sourceIds": [
        "lettvin-autobiography"
      ]
    },
    "education": [
      {
        "name": "University of Chicago · 시카고대학교",
        "detail": "비등록 상태의 강의 참여 · 논리와 수리생물학 공부",
        "period": "1930년대 후반–1940년대 초 · 회고 자료 기준",
        "sourceIds": [
          "lettvin-autobiography"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-chicago",
        "name": "University of Chicago · 수리생물학 연구 모임",
        "period": "1943년 논문 이전의 연구 배경",
        "place": "시카고, 일리노이, 미국",
        "note": "Lettvin은 피츠가 정식 등록 학생이 아닌 상태로 강의에 참여하고 Rashevsky의 연구 모임에서 공부했다고 회고한다. 이를 정규 학위 취득으로 바꾸어 표시하지 않는다.",
        "sourceIds": [
          "lettvin-autobiography",
          "paper-1943"
        ]
      },
      {
        "institutionId": "university-of-illinois-neuropsychiatric-institute",
        "name": "Illinois Neuropsychiatric Institute · 매컬럭과의 공동연구",
        "period": "1940년대 초 · 1943년 공동논문",
        "place": "시카고, 일리노이, 미국",
        "note": "Lettvin의 직접 회고는 피츠와 매컬럭을 만나게 한 경위와 함께 논문을 구상한 연구 환경을 전한다. 이 사실로 피츠의 교수 직함이나 정규 고용 신분을 추정하지 않는다.",
        "sourceIds": [
          "lettvin-autobiography",
          "paper-1943"
        ]
      },
      {
        "institutionId": "mit-rle",
        "name": "MIT · Research Laboratory of Electronics",
        "period": "1959년 공식 연구 연표의 기록",
        "place": "케임브리지, 매사추세츠, 미국",
        "note": "RLE의 공식 연표는 Lettvin과 Pitts의 1959년 개구리 시각 신경 연구 논문을 기록한다. 1943년의 형식적 신경 모형과 후속 생리학 연구를 같은 실험으로 합치지 않는다.",
        "sourceIds": [
          "mit-rle-history"
        ]
      }
    ],
    "background": "Lettvin의 회고는 피츠를 디트로이트에서 와 논리와 수학을 독학하고, 시카고대학교의 강의와 수리생물학 연구 모임에 참여한 인물로 전한다. 매컬럭과 1943년 논문을 함께 쓴 뒤 MIT RLE에서도 신경계 연구를 이어갔다.",
    "backgroundSourceIds": [
      "lettvin-autobiography",
      "paper-1943",
      "mit-rle-history"
    ],
    "connections": [
      {
        "personId": "warren-mcculloch",
        "name": "Warren McCulloch",
        "nameKo": "워런 매컬럭",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "1943년 신경 모형 공동연구",
        "description": "신경 활동의 사건과 연결 관계를 명제논리로 표현한 1943년 논문의 공동저자다. 두 사람의 신경계·논리에 대한 관심을 결합한 연구이며, 모형을 한 사람이 단독 발명했거나 다른 한 사람이 단순 보조했다는 역할 분담을 가정하지 않는다.",
        "period": "1943",
        "sourceIds": [
          "paper-1943",
          "lettvin-autobiography"
        ]
      }
    ],
    "sources": [
      {
        "id": "paper-1943",
        "title": "McCulloch·Pitts (1943) · A Logical Calculus of the Ideas Immanent in Nervous Activity",
        "url": "https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf",
        "scope": "원논문 인쇄 p.115 / PDF 1쪽의 두 공동저자와 소속 기관 묶음, 신경 사건을 명제논리로 표현하려는 초록을 지면으로 대조했다. 기관의 공동 표기만으로 각자의 고용 신분·학생 등록·학위를 추정하지 않는다. 모형의 억제와 지연 가정은 연결된 연구 카드에서 따로 확인한다.",
        "accessed": "2026-11-12"
      },
      {
        "id": "lettvin-autobiography",
        "title": "Jerome Lettvin · The History of Neuroscience in Autobiography, Vol.2 · Society for Neuroscience",
        "url": "https://www.brainfacts.org/-/media/SfN/Documents/TheHistoryofNeuroscience/Volume-2/c8.pdf#page=5",
        "scope": "공동연구자 Lettvin의 자서전 인쇄 pp.225–227 / PDF 5–7쪽에서 Detroit 출신 배경, 시카고대학교 강의에 비등록으로 참여한 기록, Rashevsky 연구 모임, 피츠를 매컬럭에게 소개한 경위와 공동 연구 환경을 지면으로 대조했다. 이 자료는 직접 회고이며, 정확한 나이·등록 연도·학위·주거 일화 전체를 독립 검증한 전기로 확대하지 않는다. 확인하지 않은 박사 지도 관계나 학위를 추가하지 않았다.",
        "accessed": "2026-11-12"
      },
      {
        "id": "mit-rle-history",
        "title": "MIT Research Laboratory of Electronics · Timeline: 1946–1959",
        "url": "https://www.rle.mit.edu/about/history/timeline-1946-1959/",
        "scope": "RLE의 공식 연구 연표에서 1959년 항목을 확인했다. 이 항목은 Lettvin과 Pitts가 What the Frog’s Eye Tells the Frog’s Brain을 발표했다고 기록한다. 피츠의 1959년 RLE 연구 맥락을 확인하는 근거이며 최초 합류일, 학위 취득, 해당 생리학 논문의 모든 결과를 이 연표만으로 검증한 것은 아니다.",
        "accessed": "2026-11-12"
      }
    ]
  },
  {
    "personId": "warren-mcculloch",
    "origin": {
      "label": "출생",
      "text": "오렌지, 뉴저지, 미국",
      "sourceIds": [
        "aps-finding-aid"
      ]
    },
    "education": [
      {
        "name": "Yale University · 예일대학교",
        "detail": "철학·심리학 학사",
        "period": "1921",
        "sourceIds": [
          "aps-finding-aid"
        ]
      },
      {
        "name": "College of Physicians and Surgeons · New York",
        "detail": "의학 학위 · M.D.",
        "period": "1927",
        "sourceIds": [
          "aps-finding-aid"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "yale-university",
        "name": "Yale University · Laboratory of Neurophysiology",
        "period": "1930년대–1941",
        "place": "뉴헤이븐, 코네티컷, 미국",
        "note": "영장류 대뇌피질 영역 사이의 기능적 연결을 연구했다. 이후 공동연구자 Lettvin의 기고가 이 연구 배경을 설명한다.",
        "sourceIds": [
          "lettvin-encyclopedia"
        ]
      },
      {
        "institutionId": "university-of-illinois-neuropsychiatric-institute",
        "name": "University of Illinois · Illinois Neuropsychiatric Institute",
        "period": "1941년 합류 · 1943년 공동논문",
        "place": "시카고, 일리노이, 미국",
        "note": "정신의학과에서 신경생리학 연구를 이어갔다. 1943년 공동논문 표제에는 이 기관과 University of Chicago가 함께 적혀 있다.",
        "sourceIds": [
          "lettvin-encyclopedia",
          "paper-1943"
        ]
      },
      {
        "institutionId": "mit-rle",
        "name": "MIT · Research Laboratory of Electronics",
        "period": "1950년대의 연구",
        "place": "케임브리지, 매사추세츠, 미국",
        "note": "Pitts·Lettvin·Wall 등과 신경계와 정보 처리에 관한 연구를 이어갔다. 이 카드에서는 자료마다 다르게 적힌 정확한 이적 연도를 확정하지 않는다.",
        "sourceIds": [
          "lettvin-encyclopedia"
        ]
      }
    ],
    "background": "뉴저지 오렌지에서 태어나 철학·심리학과 의학을 공부했다. 예일에서 피질의 연결을 연구하고, 시카고의 Illinois Neuropsychiatric Institute에서 피츠와 1943년 공동논문을 썼다. 이후 MIT RLE에서도 신경계와 정보 처리 연구를 이어갔다. 신경생리학적 연구와 생각을 논리로 표현하려는 질문을 함께 다룬 연구자였다.",
    "backgroundSourceIds": [
      "aps-finding-aid",
      "lettvin-encyclopedia",
      "paper-1943"
    ],
    "connections": [
      {
        "personId": "walter-pitts",
        "name": "Walter Pitts",
        "nameKo": "월터 피츠",
        "kind": "collaboration",
        "relation": "collaborated-with",
        "label": "1943년 신경 모형 공동연구",
        "description": "A Logical Calculus of the Ideas Immanent in Nervous Activity의 공동저자다. 신경 활동이 일어나는 사건과 연결 관계를 명제논리로 표현하고, 논리적 조건에 대응하는 신경망을 연구했다. 이 연결은 공동저술 관계를 나타낸다.",
        "period": "1943",
        "sourceIds": [
          "paper-1943",
          "lettvin-encyclopedia"
        ]
      }
    ],
    "sources": [
      {
        "id": "paper-1943",
        "title": "McCulloch·Pitts (1943) · A Logical Calculus of the Ideas Immanent in Nervous Activity",
        "url": "https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf",
        "scope": "원논문 인쇄 p.115 / PDF 1쪽을 지면으로 대조했다. 두 저자, University of Illinois의 College of Medicine·Illinois Neuropsychiatric Institute와 University of Chicago의 공동 표기, 신경 사건을 명제논리로 다루려는 초록의 발상을 확인한다. 공동 소속 표기만으로 두 사람 각각의 고용 신분이나 학위를 추정하지 않는다. 수식·모형 가정은 연결된 1943년 연구 카드의 출처에서 별도로 다룬다.",
        "accessed": "2026-11-12"
      },
      {
        "id": "lettvin-encyclopedia",
        "title": "Jerome Lettvin · McCulloch, Warren S. · The MIT Encyclopedia of the Cognitive Sciences",
        "url": "https://web.mit.edu/morrishalle/pubworks/papers/1999_Halle_MIT_Encyclopedia_Cognitive_Sciences-paper.pdf#page=645",
        "scope": "MIT가 보관한 1999년 백과사전의 공동연구자 Lettvin 기고를 읽었다. 인쇄 pp.512–513 / PDF 645–646쪽에서 예일의 신경생리학 연구, 1941년 Illinois 합류, 피츠와의 공동논문, 이후 MIT RLE 연구를 지면으로 대조했다. 당사자 회고의 성격을 유지하고 개인 성격·우선권 평가나 위너와의 갈등 설명을 확정 사실로 옮기지 않았다. 첫머리의 사망 연도 표기는 이 카드에서 사용하지 않는다. MIT 합류 연도도 별도로 확정하지 않았다.",
        "accessed": "2026-11-12"
      },
      {
        "id": "aps-finding-aid",
        "title": "American Philosophical Society · Warren S. McCulloch Papers · Biographical/Historical note",
        "url": "https://as.amphilsoc.org/repositories/2/resources/1649",
        "scope": "공식 소장목록의 검색 추출문에서 Orange, New Jersey 출생, Yale의 철학·심리학 학사 1921년, 의학 학위 1927년을 확인했다. 원문에는 College of Physicians and Surgeons 진학과 의학 학위를 설명한다. 현재 본문 재요청은 403 응답이어서 전체 소장목록이나 문서별 원본을 직접 검토한 것으로 표시하지 않는다. 이 자료의 Illinois 재직 기간과 MIT 이적 연도는 본문에 옮기지 않았다.",
        "accessed": "2026-11-12"
      }
    ]
  },
  {
    "personId": "william-peebles",
    "origin": null,
    "education": [
      {
        "name": "매사추세츠공과대학교(MIT)",
        "detail": "학부 과정·Antonio Torralba의 지도",
        "period": "",
        "sourceIds": [
          "peebles-personal"
        ]
      },
      {
        "name": "UC 버클리",
        "detail": "BAIR에서 Alexei Efros의 지도로 박사 과정 이수",
        "period": "",
        "sourceIds": [
          "peebles-personal"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "mit",
        "name": "MIT",
        "place": "케임브리지, 미국",
        "period": "학부 연구",
        "note": "시각 표현·생성 연구의 초기 공동연구에 참여했다.",
        "sourceIds": [
          "peebles-personal"
        ]
      },
      {
        "institutionId": "berkeley-bair",
        "name": "Berkeley AI Research(BAIR)",
        "place": "버클리, 미국",
        "period": "박사 연구",
        "note": "시각적 생성모형과 표현을 연구했다.",
        "sourceIds": [
          "peebles-personal"
        ]
      },
      {
        "institutionId": "openai",
        "name": "OpenAI",
        "place": "미국",
        "period": "2024년 Sora 보고서",
        "note": "영상 생성 모델 연구에 참여했다.",
        "sourceIds": [
          "peebles-sora",
          "peebles-personal"
        ]
      }
    ],
    "background": "MIT 학부에서는 Antonio Torralba, UC 버클리 박사 과정에서는 Alexei Efros의 지도를 받았다. 개인 연구 목록에는 시각 표현과 생성모형에서 DiT와 OpenAI의 Sora로 이어지는 연구가 함께 정리되어 있다.",
    "backgroundSourceIds": [
      "peebles-personal"
    ],
    "connections": [
      {
        "personId": "alexei-efros",
        "name": "Alexei A. Efros",
        "kind": "advisor",
        "label": "박사 지도",
        "description": "Berkeley AI Research에서 피블스의 박사 연구를 지도했다.",
        "period": "UC 버클리 박사 과정",
        "sourceIds": [
          "peebles-personal"
        ],
        "relation": "student-of"
      },
      {
        "personId": "saining-xie",
        "name": "Saining Xie",
        "kind": "collaboration",
        "label": "DiT 공동연구",
        "description": "Scalable Diffusion Models with Transformers의 두 공동저자다.",
        "period": "2023년",
        "sourceIds": [
          "peebles-personal"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "peebles-personal",
        "title": "William Peebles · 연구자 개인 홈페이지",
        "url": "https://www.wpeebles.com/",
        "scope": "MIT·Berkeley 학업과 Torralba·Efros 지도, DiT 공동저자와 시각 생성 연구 목록. 출생지·학위 연도는 이 페이지에서 확인하지 못해 생략했다.",
        "accessed": "2026-11-10"
      },
      {
        "id": "peebles-sora",
        "title": "OpenAI · Video generation models as world simulators",
        "url": "https://openai.com/index/video-generation-models-as-world-simulators/",
        "scope": "2024-02-15 Sora 공식 보고서의 연구·기여자 기록. 최신 직책이나 재직 기간 전체를 뜻하지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "yang-zhilin",
    "origin": null,
    "education": [
      {
        "name": "칭화대학교",
        "detail": "학사·Jie Tang의 지도",
        "period": "2015년",
        "sourceIds": [
          "yang-personal"
        ]
      },
      {
        "name": "카네기멜런대학교(CMU)",
        "detail": "컴퓨터과학 박사",
        "period": "2019년",
        "sourceIds": [
          "yang-personal"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "cmu",
        "name": "카네기멜런대학교",
        "place": "피츠버그, 미국",
        "period": "박사 연구·2019년 학위",
        "note": "Ruslan Salakhutdinov와 William W. Cohen의 지도를 받았다.",
        "sourceIds": [
          "yang-personal"
        ]
      },
      {
        "institutionId": "meta-ai",
        "name": "Meta AI",
        "place": "",
        "period": "",
        "note": "Jason Weston과 함께 일한 경력을 공개했다.",
        "sourceIds": [
          "yang-personal"
        ]
      },
      {
        "institutionId": "google-brain",
        "name": "Google Brain",
        "place": "",
        "period": "",
        "note": "Quoc V. Le와 함께 일한 경력을 공개했다.",
        "sourceIds": [
          "yang-personal"
        ]
      }
    ],
    "background": "칭화대학교에서 학사학위를 받은 뒤 미국 CMU에서 박사 과정을 마쳤다. 개인 경력 소개에는 Meta AI의 Jason Weston, Google Brain의 Quoc V. Le와 함께 일한 경험도 기록되어 있다.",
    "backgroundSourceIds": [
      "yang-personal"
    ],
    "connections": [
      {
        "personId": "ruslan-salakhutdinov",
        "name": "Ruslan Salakhutdinov",
        "kind": "advisor",
        "label": "박사 공동지도",
        "description": "CMU에서 William W. Cohen과 함께 양즈린의 박사 연구를 지도했다.",
        "period": "2019년 박사",
        "sourceIds": [
          "yang-personal"
        ],
        "relation": "student-of"
      },
      {
        "personId": "william-w-cohen",
        "name": "William W. Cohen",
        "kind": "advisor",
        "label": "박사 공동지도",
        "description": "양즈린은 자신의 학업 소개에 Cohen을 공동지도교수로 명시한다.",
        "period": "2019년 박사",
        "sourceIds": [
          "yang-personal"
        ],
        "relation": "student-of"
      }
    ],
    "sources": [
      {
        "id": "yang-personal",
        "title": "Zhilin Yang · 연구자 개인 홈페이지",
        "url": "https://kimiyoung.github.io/",
        "scope": "2015년 Tsinghua 학사·2019년 CMU 박사·지도교수와 Meta AI·Google Brain 공동업무. 오래된 개인 경력 소개의 기관을 현재 소속이라고 표시하지 않는다.",
        "accessed": "2026-11-10"
      }
    ]
  },
  {
    "personId": "yann-lecun",
    "origin": null,
    "education": [
      {
        "name": "ESIEE Paris",
        "detail": "전자공학 공학학위",
        "period": "학부 과정",
        "sourceIds": [
          "lecun-meta-bio"
        ]
      },
      {
        "name": "피에르 마리 퀴리대학교",
        "detail": "컴퓨터과학 박사",
        "period": "1987",
        "sourceIds": [
          "lecun-meta-bio"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "university-of-toronto",
        "name": "토론토대학교",
        "place": "토론토, 캐나다",
        "period": "박사후연구",
        "note": "박사학위 후 Bell Labs로 옮기기 전의 연구 경력",
        "sourceIds": [
          "lecun-meta-bio"
        ]
      },
      {
        "institutionId": "bell-labs",
        "name": "AT&T Bell Laboratories·AT&T Labs",
        "place": "홈델, 미국",
        "period": "1988년 합류",
        "note": "영상 처리·신경망 연구, 1996년 영상처리 연구부서 책임자",
        "sourceIds": [
          "lecun-meta-bio"
        ]
      },
      {
        "institutionId": "new-york-university",
        "name": "뉴욕대학교(NYU)",
        "place": "뉴욕, 미국",
        "period": "2003년 합류",
        "note": "교수로 합류하고 이후 데이터과학 연구 조직 설립에 참여",
        "sourceIds": [
          "lecun-meta-bio"
        ]
      },
      {
        "institutionId": "meta-fair",
        "name": "FAIR at Meta · V-JEPA 2 공동연구",
        "place": "공동연구 소속 표기",
        "period": "2025 · 원논문 Core Team",
        "note": "V-JEPA 2 원논문 첫쪽에서 르쿤을 FAIR at Meta 소속 Core Team 공동저자로 표기한다. 당시 논문의 소속이며2026년 현재 직함으로 사용하지 않는다.",
        "sourceIds": [
          "lecun-vjepa2-2025"
        ]
      },
      {
        "institutionId": "ami-labs",
        "name": "AMI Labs · 공식 창립팀",
        "place": "공식 연구거점: 파리·뉴욕·몬트리올·싱가포르",
        "period": "2026 · 공식 창립팀 소개",
        "note": "공식 페이지의 창립팀에 Yann LeCun이 포함되어 있다. 추상적 표현의 세계모델,기억,추론·계획을 연구 목표로 설명한다. 구체적인 현재 직함과 완성된 성능은 이 출처만으로 추가하지 않는다.",
        "sourceIds": [
          "lecun-ami-2026"
        ]
      }
    ],
    "background": "프랑스에서 공학과 컴퓨터과학을 공부한 뒤 캐나다 토론토에서 박사후연구를 했다. Bell Labs·AT&T Labs에서 영상처리 연구를 하고 2003년 NYU 교수로 옮겼다. 이후에는 자기지도 표현 학습과 행동의 결과를 예측하는 세계모델로 연구 질문을 넓혔다. 2025년 V-JEPA 2에서는 Core Team 공동저자로 참여했고,2026년 AMI Labs 공식 창립팀에도 이름이 실렸다.",
    "backgroundSourceIds": [
      "lecun-meta-bio",
      "lecun-lenet-paper",
      "lecun-vjepa2-2025",
      "lecun-ami-2026"
    ],
    "connections": [
      {
        "personId": "yoshua-bengio",
        "name": "Yoshua Bengio",
        "kind": "collaboration",
        "label": "문서 인식 공동저자",
        "description": "1998년 Gradient Based Learning Applied to Document Recognition 논문을 함께 썼다.",
        "period": "1998",
        "sourceIds": [
          "lecun-lenet-paper"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "leon-bottou",
        "name": "Léon Bottou",
        "kind": "collaboration",
        "label": "문서 인식 공동저자",
        "description": "LeCun·Bengio·Patrick Haffner와 1998년 문서 인식 논문을 함께 썼다.",
        "period": "1998",
        "sourceIds": [
          "lecun-lenet-paper"
        ],
        "relation": "collaborated-with"
      }
    ],
    "sources": [
      {
        "id": "lecun-meta-bio",
        "title": "Meta AI · Yann LeCun 약력",
        "url": "https://ai.meta.com/people/396469589677838/yann-lecun/",
        "scope": "ESIEE·UPMC박사1987, Toronto 박사후연구, Bell Labs1988·부서책임자1996·NYU2003. 현재 직함은 배경에 사용하지 않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "lecun-college-bio",
        "title": "Collège de France · Yann LeCun Biography",
        "url": "https://www.college-de-france.fr/en/chair/yann-lecun-computer-sciences-and-digital-technologies-annual-chair/biography",
        "scope": "프랑스 교육기관 졸업과 Bell Labs·AT&T의 과거 연구 경력 교차 확인",
        "accessed": "2026-11-10"
      },
      {
        "id": "lecun-lenet-paper",
        "title": "Léon Bottou · 1998 문서 인식 논문 저자 서지",
        "url": "https://leon.bottou.org/papers/lecun-98h",
        "scope": "LeCun·Bottou·Bengio·Haffner의 네 공동저자와 1998 출판 서지",
        "accessed": "2026-11-10"
      },
      {
        "id": "lecun-vjepa2-2025",
        "title": "Assran 외 · V-JEPA 2 원논문",
        "url": "https://arxiv.org/pdf/2506.09985",
        "scope": "2025년 공동연구 원문 PDF1의 소속과 CoreTeam표기,PDF4다단계학습·PDF10–11계획. 르쿤 개인의 단독 발명으로 쓰지 않음.",
        "accessed": "2026-11-15"
      },
      {
        "id": "lecun-ami-2026",
        "title": "AMI Labs · 공식 창립팀과 연구 방향",
        "url": "https://amilabs.xyz/",
        "scope": "2026-11-15확인. 창립팀의 Yann LeCun과 표현 공간 세계모델·기억·추론·계획의 연구 목표. 공개되지 않은 구현 성능이나 확인하지 않은 직함은 포함하지 않음.",
        "accessed": "2026-11-15"
      }
    ]
  },
  {
    "personId": "yoshua-bengio",
    "origin": null,
    "education": [
      {
        "name": "맥길대학교",
        "detail": "공학 학사·컴퓨터과학 석사",
        "period": "1986·1988",
        "sourceIds": [
          "bengio-mcgill-alumni"
        ]
      },
      {
        "name": "맥길대학교",
        "detail": "컴퓨터과학 박사",
        "period": "1991",
        "sourceIds": [
          "bengio-caiac-bio",
          "bengio-mcgill-alumni"
        ]
      }
    ],
    "researchPlaces": [
      {
        "institutionId": "mit",
        "name": "MIT",
        "place": "케임브리지, 미국",
        "period": "박사후연구",
        "note": "통계적 학습과 순서 자료 연구",
        "sourceIds": [
          "bengio-caiac-bio"
        ]
      },
      {
        "institutionId": "bell-labs",
        "name": "AT&T Bell Laboratories",
        "place": "홈델, 미국",
        "period": "1993년까지의 박사후연구",
        "note": "학습·시각 알고리즘 연구",
        "sourceIds": [
          "bengio-caiac-bio"
        ]
      },
      {
        "institutionId": "universite-de-montreal",
        "name": "몬트리올대학교",
        "place": "몬트리올, 캐나다",
        "period": "1993년 합류",
        "note": "교수로 합류하고 몬트리올의 학습 연구 공동체를 구축",
        "sourceIds": [
          "bengio-caiac-bio"
        ]
      },
      {
        "institutionId": "lawzero",
        "name": "LawZero",
        "place": "몬트리올, 캐나다",
        "period": "2025년 설립 · 2026년 공식 소개 확인",
        "note": "공식 소개의 Co-President & Scientific Director. Scientist AI에서 확률 예측의 지능과 목표 추구를 구분하는 설계·안전 논증을 공동 연구한다. 제안된 안전성이 완성됐다는 뜻은 아니다.",
        "sourceIds": [
          "bengio-lawzero-bio-2026",
          "bengio-scientist-research-2026",
          "bengio-lawzero-launch-2025"
        ]
      }
    ],
    "background": "몬트리올의 맥길대학교에서 학사·석사·박사 과정을 밟았다. 미국 MIT와 Bell Labs의 박사후연구를 거쳐 1993년 몬트리올대학교 교수로 합류했다.",
    "backgroundSourceIds": [
      "bengio-mcgill-alumni",
      "bengio-caiac-bio"
    ],
    "connections": [
      {
        "personId": "yann-lecun",
        "name": "Yann LeCun",
        "kind": "collaboration",
        "label": "문서 인식 공동저자",
        "description": "1998년 문서 인식 종합 논문의 공동저자다.",
        "period": "1998",
        "sourceIds": [
          "bengio-lenet-paper"
        ],
        "relation": "collaborated-with"
      },
      {
        "personId": "ian-goodfellow",
        "name": "Ian Goodfellow",
        "kind": "advisor",
        "label": "지도한 연구자",
        "description": "Goodfellow의 박사학위 논문 연구를 Aaron Courville과 함께 지도했다.",
        "period": "2014년 학위심사 기록",
        "sourceIds": [
          "bengio-goodfellow-defense"
        ],
        "relation": "advised"
      }
    ],
    "sources": [
      {
        "id": "bengio-mcgill-alumni",
        "title": "McGill University · Notable alumni",
        "url": "https://www.mcgill.ca/about/alumni",
        "scope": "BEng1986·MSc1988·PhD1991 학위 기록",
        "accessed": "2026-11-10"
      },
      {
        "id": "bengio-caiac-bio",
        "title": "Canadian AI Association · Dr. Yoshua Bengio",
        "url": "https://www.caiac.ca/en/yoshua-bengio",
        "scope": "McGill박사1991·MIT와BellLabs박사후연구·1993 UdeM합류의 역사적경력. 페이지의 현재직함은 사용하지 않음",
        "accessed": "2026-11-10"
      },
      {
        "id": "bengio-lenet-paper",
        "title": "Léon Bottou · 1998 문서 인식 논문 저자 서지",
        "url": "https://leon.bottou.org/papers/lecun-98h",
        "scope": "Bengio·LeCun·Bottou·Haffner 공동저자",
        "accessed": "2026-11-10"
      },
      {
        "id": "bengio-goodfellow-defense",
        "title": "Université de Montréal · Ian Goodfellow 학위심사 공고",
        "url": "https://diro.umontreal.ca/en/departement/activites/activite/news/eventDetail/Event/deep-learning-of-representations-and-its-application-to-computer-vision/",
        "scope": "2014-09-02 심사, 지도 Bengio·공동지도 Courville",
        "accessed": "2026-11-10"
      },
      {
        "id": "bengio-lawzero-bio-2026",
        "title": "LawZero · Yoshua Bengio 공식 소개",
        "url": "https://lawzero.org/en/team/yoshua-bengio",
        "scope": "Co-President & Scientific Director,2025년 설립,2023년 이후 안전 연구 방향. 기존 학위·연구 경력·인물 관계와 구분한 최근 기록.",
        "accessed": "2026-11-15"
      },
      {
        "id": "bengio-scientist-research-2026",
        "title": "LawZero · Scientist AI 연구 목록",
        "url": "https://lawzero.org/en/research",
        "scope": "2026년 설계·안전 논증의 공동저자·공개 날짜·원문 링크. 목표를 추구하지 않는 예측과 배포 검사라는 제안.",
        "accessed": "2026-11-15"
      },
      {
        "id": "bengio-lawzero-launch-2025",
        "title": "LawZero · Yoshua Bengio Launches LawZero",
        "url": "https://lawzero.org/en/news/yoshua-bengio-launches-lawzero-new-nonprofit-advancing-safe-design-ai",
        "scope": "공식2025-06-03 설립 발표. Montréal·비영리조직·2023년 이후 연구 방향의 근거. 당시직함과2026년공식소개직함을구분.",
        "accessed": "2026-11-15"
      }
    ]
  }
];
