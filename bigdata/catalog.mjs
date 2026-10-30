// Sanitized reviewed educational content; no operating paths or review metadata.
export const CATALOG = [
  {
    "code": "1-02",
    "subject": 1,
    "title": "저장소와 작업 실행 순서 관리",
    "lead": "파일을 보관하는 장소와 다음 작업을 시작하는 규칙은 서로 다른 역할이다.",
    "cue": "보관할 곳을 묻는지, 다음 실행 조건을 묻는지 먼저 읽는다.",
    "question": {
      "givens": "정제가 성공한 뒤에만 매출 집계를 실행해야 한다.",
      "stem": "직접 필요한 역할은?",
      "choices": [
        "파일 영구 보관",
        "작업 의존성 관리",
        "영상 압축",
        "분류 확률 계산"
      ],
      "answer": 2,
      "reason": "성공 조건과 다음 작업의 연결을 정하는 것은 워크플로의 작업 의존성 관리다.",
      "wrong_reasons": [
        "1번은 결과를 보관하지만 시작 조건을 정하지 않는다.",
        "3번은 특정 자료의 변환 작업이다.",
        "4번은 분석모형의 계산이다."
      ]
    },
    "goal": "정제 결과 한 조건을 바꿔 집계 실행 허용을 판단한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-28",
      "1-29"
    ],
    "sources": [
      {
        "title": "Apache Oozie",
        "url": "https://oozie.apache.org/"
      },
      {
        "title": "Apache Attic: Oozie",
        "url": "https://attic.apache.org/projects/oozie.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-03",
    "subject": 1,
    "title": "데이터 관리와 모형 개발의 업무 구분",
    "lead": "직함을 외우기 전에 맡긴 업무의 결과물이 무엇인지 확인한다.",
    "cue": "직함보다 권한·복구·예측처럼 실제 업무를 본다.",
    "question": {
      "givens": "DB의 사용자 권한과 백업·복구를 맡긴다.",
      "stem": "요구와 가장 직접 연결되는 업무는?",
      "choices": [
        "이탈모형 학습",
        "주성분 수 선정",
        "DB 운영·보호",
        "군집 개수 선정"
      ],
      "answer": 3,
      "reason": "권한과 백업·복구는 DB를 안전하고 지속적으로 사용할 수 있게 하는 운영·보호 업무다.",
      "wrong_reasons": [
        "1번은 예측모형을 개발하는 업무다.",
        "2번은 차원 축소의 설정이다.",
        "4번은 군집 분석의 설정이다."
      ]
    },
    "goal": "맡긴 결과물을 바꾸며 직접적인 업무 책임을 구분한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-06",
      "1-16"
    ],
    "sources": [
      {
        "title": "Oracle Database: Duties of Database Administrators",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/concepts-for-database-administrators.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-04",
    "subject": 1,
    "title": "Volume·Velocity·Variety를 조건으로 구분하기",
    "lead": "자료의 양, 도착 속도, 표현 형태를 서로 다른 축으로 읽는다.",
    "cue": "얼마나 많이·얼마나 빨리·어떤 형태인지 나눈다.",
    "question": {
      "givens": "총량과 초당 유입 건수는 같다. 표 데이터에 음성·영상 형태가 추가됐다.",
      "stem": "직접 증가한 특성은?",
      "choices": [
        "Volume",
        "Velocity",
        "Variety",
        "정확도"
      ],
      "answer": 3,
      "reason": "양과 유입 속도를 고정하고 표현 형태가 늘었으므로 Variety를 묻는다.",
      "wrong_reasons": [
        "1번은 총량이며 이 문제에서는 고정했다.",
        "2번은 유입 속도이며 이 문제에서는 같다.",
        "4번은 예측의 맞고 틀림을 나타내는 평가량이다."
      ]
    },
    "goal": "원래 값과 변경 값을 비교해 실제 변한 축을 찾는다.",
    "kind": "numeric",
    "relatedCodes": [
      "1-24",
      "1-27"
    ],
    "sources": [
      {
        "title": "AWS: What is Big Data?",
        "url": "https://aws.amazon.com/what-is/big-data/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-05",
    "subject": 1,
    "title": "데이터 보유에서 서비스 가치까지",
    "lead": "저장량만으로 어떤 고객에게 무엇을 제공하는 사업인지 설명할 수 없다.",
    "cue": "누구에게 무엇을 제공하고 어떤 결정을 바꾸는가.",
    "question": {
      "givens": "두 회사 모두 주문 기록을 보유한다. B는 점주에게 다음 날 발주 참고 예측을 제공하고 이용료를 받는다.",
      "stem": "B의 사업을 가장 구체적으로 설명한 것은?",
      "choices": [
        "자료가 많아 수익이 보장된다",
        "저장 장비만 판매한다",
        "자료를 전혀 가공하지 않는다",
        "분석 결과로 고객의 결정을 돕는 서비스를 제공한다"
      ],
      "answer": 4,
      "reason": "고객인 점주, 제공물인 예측, 활용 결정인 발주와 이용료 구조가 제시됐다.",
      "wrong_reasons": [
        "1번은 실제 수익이나 효과를 검증하지 않은 단정이다.",
        "2번은 제시된 제공물이 예측 서비스라는 사실과 다르다.",
        "3번은 주문 기록을 예측으로 가공한다는 조건과 다르다."
      ]
    },
    "goal": "현재 확인한 기록으로 어디까지 말할 수 있는지 판단한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-07",
      "4-37"
    ],
    "sources": [
      {
        "title": "AWS: What is Data Mining?",
        "url": "https://aws.amazon.com/what-is/data-mining/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-06",
    "subject": 1,
    "title": "집중형·현업 배치형 분석 조직의 선택",
    "lead": "같은 분석 인력도 어디에 배치하느냐에 따라 협업과 조정의 문제가 달라진다.",
    "cue": "공통 기준의 책임과 현업 문제를 푸는 책임을 함께 확인한다.",
    "question": {
      "givens": "현업 분석팀을 유지하되 전사 공통 지표를 통일하려 한다.",
      "stem": "직접 필요한 조정은?",
      "choices": [
        "부서별 정의를 영구 고정",
        "공통 정의와 관리 책임 수립",
        "현업 질문 수집 중단",
        "공통 기준 없이 도구만 통일"
      ],
      "answer": 2,
      "reason": "지표 의미를 맞추려면 공통 정의와 이를 관리할 책임이 필요하다.",
      "wrong_reasons": [
        "1번은 서로 다른 정의를 유지하는 선택이다.",
        "3번은 현업과의 연결을 없애며 지표 불일치를 해결하지 않는다.",
        "4번은 같은 도구로도 다른 지표를 계산할 수 있다는 문제를 남긴다."
      ]
    },
    "goal": "조직의 문제를 바꿔 직접 필요한 조정 책임을 찾는다.",
    "kind": "decision",
    "relatedCodes": [
      "1-03",
      "1-07"
    ],
    "sources": [
      {
        "title": "IBM: How to structure a modern data team",
        "url": "https://www.ibm.com/think/topics/how-to-structure-a-modern-data-team"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-07",
    "subject": 1,
    "title": "분석 준비와 실제 활용을 따로 진단하기",
    "lead": "장비와 인력이 있어도 분석 결과가 의사결정에 쓰인다고 단정할 수 없다.",
    "cue": "할 수 있는 기반과 실제로 쓰는 행동을 나눈다.",
    "question": {
      "givens": "담당자와 데이터·도구는 있다. 분석 보고서를 실제 회의에서 사용한 기록은 없다.",
      "stem": "현재 근거로 가능한 판단은?",
      "choices": [
        "활용 효과가 입증됐다",
        "분석 준비가 전혀 없다",
        "준비와 활용을 나누어 추가 확인한다",
        "장비가 있으므로 활용도 높다"
      ],
      "answer": 3,
      "reason": "준비 항목은 있으나 실제 활용의 근거가 없으므로 두 상태를 나누어 확인해야 한다.",
      "wrong_reasons": [
        "1번은 사용 여부도 확인하지 못한 상태에서 효과를 확정한다.",
        "2번은 제시된 준비 자원의 존재와 모순된다.",
        "4번은 자원 보유를 실제 사용으로 바꾸어 해석한다."
      ]
    },
    "goal": "준비와 활용의 근거를 독립적으로 바꾸어 진단한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-05",
      "1-06"
    ],
    "sources": [
      {
        "title": "UK Government: Data Maturity Assessment",
        "url": "https://assets.publishing.service.gov.uk/media/64184bccd3bf7f79d9675dbd/Data_Maturity_Assessment_for_Government_-_FINAL_PDF.pdf"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-09",
    "subject": 1,
    "title": "한 모형의 계획과 여러 과제의 로드맵",
    "lead": "로드맵은 과제 사이의 순서와 의존 관계를 보여 준다.",
    "cue": "한 과제 안의 설계인가, 과제 사이의 연결인가.",
    "question": {
      "givens": "A 코드 통일 뒤 B 수요예측, B 검증 뒤 C 발주 적용을 진행한다.",
      "stem": "이 연결을 보여 주는 계획은?",
      "choices": [
        "여러 분석 과제의 로드맵",
        "한 모형의 손실함수",
        "DB 비밀번호 목록",
        "하나의 변수 분포표"
      ],
      "answer": 1,
      "reason": "선행 조건을 기준으로 여러 과제의 순서를 연결했으므로 로드맵에 해당한다.",
      "wrong_reasons": [
        "2번은 한 모형의 최적화 기준이다.",
        "3번은 접근 정보이며 과제 간 순서가 아니다.",
        "4번은 데이터 탐색 결과다."
      ]
    },
    "goal": "문서 범위와 의존 관계의 유무로 계획을 구분한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-10",
      "1-16"
    ],
    "sources": [
      {
        "title": "IBM: CRISP-DM Guide",
        "url": "https://www.ibm.com/docs/en/SS3RA7_18.5.0/pdf/ModelerCRISPDM.pdf"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-10",
    "subject": 1,
    "title": "명시한 기준으로 과제 우선순위 정하기",
    "lead": "급한 정도와 실행 가능성을 어떤 규칙으로 결합하는지 먼저 읽는다.",
    "cue": "점수의 뜻·결합 규칙·우선 방향을 확인한다.",
    "question": {
      "givens": "큰 점수를 우선한다. 점수=긴급성×실행 가능성. A=(5,1), B=(3,4), C=(2,3).",
      "stem": "주어진 규칙의 1순위는?",
      "choices": [
        "A",
        "B",
        "C",
        "세 과제 동점"
      ],
      "answer": 2,
      "reason": "A=5, B=12, C=6이므로 가장 큰 12점을 얻은 B다.",
      "wrong_reasons": [
        "1번은 긴급성만 비교한 선택이다.",
        "3번의 점수 6은 B의 12보다 작다.",
        "4번은 계산한 점수가 서로 다르므로 틀리다."
      ]
    },
    "goal": "같은 자체 규칙에서 실행 가능성 변경과 동점을 확인한다.",
    "kind": "numeric",
    "relatedCodes": [
      "1-09",
      "1-18"
    ],
    "sources": [
      {
        "title": "IBM: CRISP-DM View",
        "url": "https://www.ibm.com/docs/en/spss-modeler/18.6.0?topic=projects-crisp-dm-view"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-12",
    "subject": 1,
    "title": "업무 문제에서 시작하기와 데이터에서 발견하기",
    "lead": "출발점이 업무 질문인지, 관찰한 데이터 패턴인지 구분한다.",
    "cue": "질문에서 자료로 갔는지, 자료에서 질문을 찾았는지.",
    "question": {
      "givens": "정해 둔 업무 과제 없이 로그를 탐색하다 반복 오류를 발견해 조사 과제를 만들었다.",
      "stem": "출발점에 따른 접근은?",
      "choices": [
        "하향식",
        "상향식",
        "실험으로 인과 확정",
        "모형 배포 완료"
      ],
      "answer": 2,
      "reason": "데이터의 패턴을 발견한 뒤 과제를 정의했으므로 상향식 사례다.",
      "wrong_reasons": [
        "1번은 업무 문제를 먼저 정의하는 출발과 다르다.",
        "3번은 관찰 패턴만으로 인과를 확정한다.",
        "4번은 탐색·과제 정의를 배포와 혼동한다."
      ]
    },
    "goal": "처음 주어진 단서를 바꾸며 출발점을 판단한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-13",
      "1-16"
    ],
    "sources": [
      {
        "title": "AWS: What is Data Mining?",
        "url": "https://aws.amazon.com/what-is/data-mining/"
      },
      {
        "title": "IBM: CRISP-DM Guide",
        "url": "https://www.ibm.com/docs/en/SS3RA7_18.5.0/pdf/ModelerCRISPDM.pdf"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-13",
    "subject": 1,
    "title": "KDD와 CRISP-DM의 단계 읽기",
    "lead": "데이터 마이닝은 지식을 얻는 전체 과정 안에 놓인 작업이다.",
    "cue": "마이닝은 전체 KDD와 같지 않으며 절차는 반복할 수 있다.",
    "question": {
      "givens": "CRISP-DM에서 예측모형을 학습한 뒤 업무 목표에 맞는지 검토한다.",
      "stem": "주된 단계는?",
      "choices": [
        "데이터 준비",
        "모델링",
        "평가",
        "자료 선택만 수행"
      ],
      "answer": 3,
      "reason": "학습 후 결과가 업무 목표에 부합하는지를 검토하는 것은 평가 단계다.",
      "wrong_reasons": [
        "1번은 입력 자료를 분석 가능한 형태로 준비하는 단계다.",
        "2번은 예측 규칙을 학습하는 작업에 해당한다.",
        "4번은 전체 검토를 자료 범위 선정으로 축소한다."
      ]
    },
    "goal": "학습 후 현재 해야 할 일을 바꾸어 단계를 고른다.",
    "kind": "decision",
    "relatedCodes": [
      "1-09",
      "1-12"
    ],
    "sources": [
      {
        "title": "Fayyad et al.: From Data Mining to Knowledge Discovery in Databases",
        "url": "https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1230"
      },
      {
        "title": "Fayyad et al. 1996 본문 PDF",
        "url": "https://www.kdnuggets.com/gpspubs/aimag-kdd-overview-1996-Fayyad.pdf"
      },
      {
        "title": "IBM: CRISP-DM Guide",
        "url": "https://www.ibm.com/docs/en/SS3RA7_18.5.0/pdf/ModelerCRISPDM.pdf"
      }
    ],
    "featured": true,
    "featuredOrder": 3,
    "shortTitle": "분석 절차 읽기"
  },
  {
    "code": "1-16",
    "subject": 1,
    "title": "알고리즘보다 먼저 정할 모형의 조건",
    "lead": "무엇을 언제 예측하고 그때 어떤 입력을 알 수 있는지 먼저 적는다.",
    "cue": "그 값을 예측하는 순간에도 알 수 있는가.",
    "question": {
      "givens": "주문 접수 순간에 반품을 예측한다.",
      "stem": "그때 입력으로 쓸 수 없는 값은?",
      "choices": [
        "주문 상품",
        "결제 금액",
        "접수 전 구매 횟수",
        "반품 완료 사유"
      ],
      "answer": 4,
      "reason": "반품 완료 사유는 예측 이후에 생기므로 접수 시점의 입력으로 사용할 수 없다.",
      "wrong_reasons": [
        "1번은 접수한 주문에 포함된 정보다.",
        "2번은 접수 시 확보되는 결제 정보다.",
        "3번은 접수 전까지 확정된 기록을 사용한다는 조건에서 가능하다."
      ]
    },
    "goal": "입력의 생성 시점과 사용 목적을 바꾸어 사용 가능성을 판단한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-13",
      "2-37",
      "4-34"
    ],
    "sources": [
      {
        "title": "IBM: CRISP-DM View",
        "url": "https://www.ibm.com/docs/en/spss-modeler/18.6.0?topic=projects-crisp-dm-view"
      },
      {
        "title": "NIST: AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ],
    "featured": true,
    "featuredOrder": 2,
    "shortTitle": "문제와 모형의 조건"
  },
  {
    "code": "1-17",
    "subject": 1,
    "title": "AI·머신러닝·딥러닝과 전이학습",
    "lead": "분야의 포함 관계와 학습 지식을 재사용하는 전략을 구분한다.",
    "cue": "AI·ML·DL은 범주, 전이는 지식 재사용 전략.",
    "question": {
      "givens": "사전학습 신경망의 앞부분을 고정하고 새 상품 분류 출력층을 학습한다.",
      "stem": "가장 직접적인 설명은?",
      "choices": [
        "전이학습 활용",
        "데이터 없이 인과 확정",
        "신경망을 전혀 사용하지 않음",
        "모든 가중치를 무작위 초기화"
      ],
      "answer": 1,
      "reason": "먼저 학습한 표현을 새로운 분류 과제에 재사용하는 전이학습 사례다.",
      "wrong_reasons": [
        "2번은 학습과 인과 추론을 혼동한다.",
        "3번은 사전학습 신경망을 쓴다는 조건과 다르다.",
        "4번은 기존 가중치를 유지한다는 조건과 모순된다."
      ]
    },
    "goal": "사전학습 사용과 고정 여부를 바꾸며 전략을 판단한다.",
    "kind": "decision",
    "relatedCodes": [
      "3-09",
      "3-12"
    ],
    "sources": [
      {
        "title": "IBM: AI vs machine learning vs deep learning",
        "url": "https://www.ibm.com/think/topics/ai-vs-machine-learning-vs-deep-learning-vs-neural-networks"
      },
      {
        "title": "PyTorch: Transfer Learning for Computer Vision Tutorial",
        "url": "https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-18",
    "subject": 1,
    "title": "AI 도입 전 성능과 운영 조건 함께 보기",
    "lead": "높은 실험 점수와 실제 업무에서 사용할 수 있는 상태를 구분한다.",
    "cue": "성능·데이터·시간·운영의 필수 조건을 같이 본다.",
    "question": {
      "givens": "업무는 2초 이내 응답과 외부 전송 금지를 요구한다. 후보 A는 8초가 걸리고 외부 전송이 필요하다.",
      "stem": "현재 판단은?",
      "choices": [
        "점수만 높으면 즉시 도입",
        "필수 운영 조건 미충족",
        "검증 없이 사용 가능",
        "전송 조건은 분석과 무관"
      ],
      "answer": 2,
      "reason": "제시된 응답 시간과 데이터 전송의 필수 조건을 모두 충족하지 못한다.",
      "wrong_reasons": [
        "1번은 필수 제약을 성능 점수로 무시한다.",
        "3번은 확인된 미충족 조건을 검토 없이 건너뛴다.",
        "4번은 데이터 운영 조건을 도입 판단에서 누락한다."
      ]
    },
    "goal": "시간과 외부 전송을 각각 바꾸어 남은 제약을 찾는다.",
    "kind": "decision",
    "relatedCodes": [
      "1-10",
      "4-21",
      "4-34"
    ],
    "sources": [
      {
        "title": "NIST: AI Risk Management Framework",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-19",
    "subject": 1,
    "title": "개인정보 수집·이용과 제3자 제공 구분",
    "lead": "자료를 가지고 있다는 사실만으로 새로운 목적의 제공 근거가 생기지는 않는다.",
    "cue": "누가·무슨 목적으로·무엇을 받는지, 그 근거를 확인한다.",
    "question": {
      "givens": "배송 목적으로 수집한 연락처를 별도 회사의 광고에 제공하려 한다.",
      "stem": "가장 먼저 확인할 판단은?",
      "choices": [
        "보유 중이면 무조건 가능",
        "이름만 지우면 모든 조건 면제",
        "새 목적과 제공에 적용할 법적 근거 확인",
        "암호화하면 목적 검토 불필요"
      ],
      "answer": 3,
      "reason": "새 목적과 제3자 제공의 조건을 확인해야 하며, 기존 보유 사실만으로 허용을 확정할 수 없다.",
      "wrong_reasons": [
        "1번은 수집과 새로운 제공의 조건을 혼동한다.",
        "2번은 이름 삭제만으로 개인 식별 가능성과 처리 조건이 모두 없어졌다고 단정한다.",
        "4번은 보호 조치가 목적과 근거 검토를 대체한다고 잘못 본다."
      ]
    },
    "goal": "동의 문구의 범위를 바꾸며 다음 확인 지점을 고른다.",
    "kind": "decision",
    "relatedCodes": [
      "1-20",
      "1-21"
    ],
    "sources": [
      {
        "title": "국가법령정보센터: 개인정보 보호법 제15조",
        "url": "https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029335375"
      },
      {
        "title": "국가법령정보센터: 개인정보 보호법 제17~19조",
        "url": "https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334945"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-20",
    "subject": 1,
    "title": "이름을 지운 뒤에도 남는 재식별 위험",
    "lead": "직접 식별자 삭제와 다른 정보와의 연결 가능성을 구분한다.",
    "cue": "이름을 지웠는지 다음에, 무엇과 연결할 수 있는지.",
    "question": {
      "givens": "이름은 삭제했지만 출생일·작은 지역·희귀 직업 조합이 남았다. 외부 명부와 연결할 수 있다.",
      "stem": "맞는 판단은?",
      "choices": [
        "삭제했으므로 위험 0",
        "재식별 가능성 검토 필요",
        "모든 외부 정보와 연결 불가",
        "항상 법률 적용 제외"
      ],
      "answer": 2,
      "reason": "남은 준식별자 조합을 외부 정보와 연결할 수 있으므로 재식별 위험을 검토해야 한다.",
      "wrong_reasons": [
        "1번은 직접 식별자 삭제만으로 위험이 없다고 단정한다.",
        "3번은 연결할 수 있다는 조건과 모순된다.",
        "4번은 법적 분류를 구체적 조건 없이 확정한다."
      ]
    },
    "goal": "같은 조합의 후보 수와 확인된 외부 연결을 바꾸어 위험 설명을 비교한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-19",
      "1-22"
    ],
    "sources": [
      {
        "title": "NIST SP 800-188: De-Identifying Government Datasets",
        "url": "https://csrc.nist.gov/pubs/sp/800/188/final"
      },
      {
        "title": "Li et al.: t-Closeness",
        "url": "https://www.cs.purdue.edu/homes/ninghui/papers/t_closeness_icde07.pdf"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-21",
    "subject": 1,
    "title": "일반화·집계·마스킹의 차이",
    "lead": "값의 범주를 넓히는지, 여러 행을 요약하는지, 일부를 가리는지 본다.",
    "cue": "넓히기·요약하기·가리기의 출력을 비교한다.",
    "question": {
      "givens": "각 개인 행의 나이 27세·29세를 모두 “20대”로 바꿨다.",
      "stem": "주된 처리는?",
      "choices": [
        "집계 평균 산출",
        "일반화",
        "무작위 표본 추출",
        "회귀 예측"
      ],
      "answer": 2,
      "reason": "개별 값을 더 넓은 연령 범주로 바꾸었으므로 일반화다.",
      "wrong_reasons": [
        "1번은 여러 행을 하나의 평균으로 요약하는 처리이며 여기서는 각 행이 남는다.",
        "3번은 일부 관측치를 선택하는 일이다.",
        "4번은 입력에서 결과를 예측하는 일이다."
      ]
    },
    "goal": "같은 두 나이를 어떤 출력으로 바꾸는지 비교한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-20",
      "1-22"
    ],
    "sources": [
      {
        "title": "NIST SP 800-188: De-Identifying Government Datasets",
        "url": "https://csrc.nist.gov/pubs/sp/800/188/final"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-22",
    "subject": 1,
    "title": "k-익명성·l-다양성·t-근접성",
    "lead": "사람을 구별하기 어려워도 민감한 속성을 알아낼 수 있는지 따로 본다.",
    "cue": "k는 집단 크기, l은 민감값 다양성, t는 전체와의 분포 거리.",
    "question": {
      "givens": "준식별자는 연령대·지역이다. (20대,A)의 두 행 질환은 모두 감기, (30대,B)의 두 행은 감기·천식이다.",
      "stem": "k=2와 distinct l=2의 충족 여부는?",
      "choices": [
        "둘 다 충족",
        "k만 충족",
        "l만 충족",
        "둘 다 미충족"
      ],
      "answer": 2,
      "reason": "모든 집단은 두 행 이상이지만 첫 집단의 민감값이 감기 하나여서 distinct l=2는 미충족이다.",
      "wrong_reasons": [
        "1번은 첫 집단의 민감값이 하나라는 점을 놓친다.",
        "3번은 집단 크기는 2라는 조건을 놓친다.",
        "4번은 모든 집단의 크기가 2라는 사실과 다르다."
      ]
    },
    "goal": "첫 집단의 질환 한 개를 바꿔 k·distinct l·이진 분포 거리를 분리해 확인한다.",
    "kind": "distribution",
    "relatedCodes": [
      "1-20",
      "1-21"
    ],
    "sources": [
      {
        "title": "Li et al.: t-Closeness",
        "url": "https://www.cs.purdue.edu/homes/ninghui/papers/t_closeness_icde07.pdf"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-24",
    "subject": 1,
    "title": "정형·반정형·비정형 자료를 구조로 읽기",
    "lead": "파일 이름보다 값에 어떤 구조와 의미가 붙어 있는지 확인한다.",
    "cue": "고정 열인가, 키·태그인가, 내용 해석이 필요한가.",
    "question": {
      "givens": "항목마다 키가 있고 일부 항목은 중첩되며 선택 필드도 있는 JSON 문서를 받았다.",
      "stem": "통상적인 교육 분류는?",
      "choices": [
        "반정형",
        "항상 무구조",
        "반드시 관계형 표",
        "암호화 자료"
      ],
      "answer": 1,
      "reason": "키와 중첩처럼 자기 설명적인 구조를 가진 반정형 자료의 대표 사례다.",
      "wrong_reasons": [
        "2번은 구조 단서가 있다는 조건과 다르다.",
        "3번은 JSON을 반드시 관계형 고정 표라고 볼 수 없기 때문에 틀리다.",
        "4번은 자료 구조와 암호화 여부를 혼동한다."
      ]
    },
    "goal": "파일 이름 대신 표현 구조를 바꾸며 통상 분류를 판단한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-04",
      "1-26"
    ],
    "sources": [
      {
        "title": "AWS: What is Structured Data?",
        "url": "https://aws.amazon.com/what-is/structured-data/"
      }
    ],
    "featured": true,
    "featuredOrder": 1,
    "shortTitle": "자료 구조 구분"
  },
  {
    "code": "1-26",
    "subject": 1,
    "title": "웹·API·DB에 맞는 수집 경로",
    "lead": "화면을 읽는 방법, 제공된 인터페이스를 호출하는 방법, DB를 질의하는 방법을 구분한다.",
    "cue": "제공 형태·명세·허용 범위를 함께 확인한다.",
    "question": {
      "givens": "필요한 필드를 반환하는 공식 API가 있고 이용 권한과 조건을 충족했다.",
      "stem": "직접 맞는 수집 경로는?",
      "choices": [
        "화면 픽셀을 무조건 수기 복사",
        "API 명세에 따라 요청·응답 수집",
        "DB 권한 우회",
        "API는 자료를 반환할 수 없음"
      ],
      "answer": 2,
      "reason": "제공된 필드와 요청·응답 명세를 사용해 자료를 수집할 수 있다.",
      "wrong_reasons": [
        "1번은 공식 인터페이스가 있다는 조건을 활용하지 않는다.",
        "3번은 허용된 경로를 벗어난다.",
        "4번은 API가 필드를 반환한다는 조건과 모순된다."
      ]
    },
    "goal": "필요한 API와 허용 DB의 존재를 바꾸어 경로를 선택한다.",
    "kind": "decision",
    "relatedCodes": [
      "1-24",
      "1-27"
    ],
    "sources": [
      {
        "title": "공공데이터포털: 전국평생학습강좌표준데이터",
        "url": "https://www.data.go.kr/data/15013110/standard.do"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-27",
    "subject": 1,
    "title": "일괄 수집과 지속적인 스트림 수집",
    "lead": "끝이 정해진 묶음을 처리하는지, 계속 들어오는 사건을 처리하는지 본다.",
    "cue": "계속 들어오는가, 끝이 정해진 묶음인가.",
    "question": {
      "givens": "로그가 계속 발생하고 도착할 때마다 짧은 주기로 결과를 갱신한다.",
      "stem": "가장 맞는 설명은?",
      "choices": [
        "일일 종료 파일만 처리",
        "스트림 처리이며 지연은 별도 확인",
        "스트림이면 지연은 항상 0",
        "모든 로그가 발생 순서대로 도착"
      ],
      "answer": 2,
      "reason": "계속 늘어나는 입력을 처리하는 스트림이며 실제 지연과 순서는 별도의 조건이다.",
      "wrong_reasons": [
        "1번은 정해진 묶음을 모으는 방식이다.",
        "3번은 전송·처리 지연을 무시한다.",
        "4번은 늦은 도착 가능성을 없다고 단정한다."
      ]
    },
    "goal": "입력의 끝과 도착 지연을 독립적으로 바꾸어 읽는다.",
    "kind": "decision",
    "relatedCodes": [
      "1-04",
      "1-26"
    ],
    "sources": [
      {
        "title": "Apache Beam: Basics of the Beam model",
        "url": "https://beam.apache.org/documentation/basics/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-28",
    "subject": 1,
    "title": "ETL과 ELT의 변환 위치",
    "lead": "둘의 핵심 차이는 데이터를 어디에 적재한 뒤 변환하는지다.",
    "cue": "목적 저장소에 넣기 전 변환인지, 넣은 뒤 변환인지.",
    "question": {
      "givens": "목적지는 분석 DB다. 원본을 분석 DB에 적재한 뒤 그 DB 안에서 값을 정리한다.",
      "stem": "주된 흐름은?",
      "choices": [
        "ETL",
        "ELT",
        "저장 없는 시각화",
        "추출 없는 백업"
      ],
      "answer": 2,
      "reason": "목적 DB에 먼저 적재하고 그 안에서 변환하므로 E→L→T다.",
      "wrong_reasons": [
        "1번은 목적지 적재 전에 변환하는 흐름이다.",
        "3번은 적재·변환이 있다는 조건과 다르다.",
        "4번은 원본을 추출해 옮긴다는 조건을 누락한다."
      ]
    },
    "goal": "분석 DB라는 목적지를 고정하고 주된 변환 위치만 바꾼다.",
    "kind": "decision",
    "relatedCodes": [
      "1-02",
      "1-29"
    ],
    "sources": [
      {
        "title": "Microsoft Learn: Extract, transform, load",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "1-29",
    "subject": 1,
    "title": "웨어하우스·마트·레이크·레이크하우스의 목적",
    "lead": "저장소 이름보다 자료 범위와 사용 목적을 연결해 읽는다.",
    "cue": "전사 통합·주제 범위·원본 다양성·관리 기능을 나눈다.",
    "question": {
      "givens": "전사 자료 중 마케팅 부서의 캠페인 분석에 필요한 범위를 구성한다.",
      "stem": "분석 범위를 가장 직접 설명하는 것은?",
      "choices": [
        "데이터 마트",
        "원본 영상 코덱",
        "항상 전사 전체와 같은 범위",
        "워크플로 스케줄러"
      ],
      "answer": 1,
      "reason": "특정 부서와 주제에 초점을 맞춘 분석 자료 범위는 데이터 마트로 설명할 수 있다.",
      "wrong_reasons": [
        "2번은 영상 표현 방식이다.",
        "3번은 부서·주제로 한정한다는 조건과 다르다.",
        "4번은 작업 실행 순서를 관리하는 역할이다."
      ]
    },
    "goal": "문제에서 가장 직접 강조한 요구를 바꾸어 개념을 고른다.",
    "kind": "decision",
    "relatedCodes": [
      "1-02",
      "1-28"
    ],
    "sources": [
      {
        "title": "AWS: Data lake vs data warehouse vs data mart",
        "url": "https://aws.amazon.com/compare/the-difference-between-a-data-warehouse-data-lake-and-data-mart/"
      },
      {
        "title": "Microsoft Learn: Store data in Microsoft Fabric",
        "url": "https://learn.microsoft.com/en-us/fabric/fundamentals/store-data"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-01",
    "subject": 2,
    "title": "평균이 다른 두 제품의 상대 산포를 비교하는 법",
    "lead": "평균 중량이 다른 제품을 비교할 때 표준편차의 크기와 상대적인 흔들림은 다른 답을 준다. 비교하려는 것이 몇 g의 차이인지, 평균에 대한 몇 %의 차이인지 먼저 정한다.",
    "cue": "몇 g인가와 평균의 몇 %인가는 다른 질문이다.",
    "question": {
      "givens": "A 평균 100g·표준편차 10g, B 평균 20g·표준편차 4g. 양수 비율척도이며 같은 표준편차 정의를 쓴다.",
      "stem": "변동계수로 비교할 때 상대 산포가 더 큰 제품은?",
      "choices": [
        "A",
        "B",
        "두 제품이 같다",
        "표준편차가 모두 0이다"
      ],
      "answer": 2,
      "reason": "A는 10%, B는 20%이므로 B의 상대 산포가 더 크다.",
      "wrong_reasons": [
        "① 10g과 4g만 비교한 절대 산포의 판단이다.",
        "③ 두 비율 0.10과 0.20은 같지 않다.",
        "④ 주어진 표준편차는 각각 10g과 4g이다."
      ]
    },
    "goal": "평균과 표준편차를 바꾸어 절대 산포와 상대 산포의 순위를 비교한다.",
    "kind": "numeric-comparison",
    "relatedCodes": [
      "2-13",
      "2-23"
    ],
    "sources": [
      {
        "title": "NIST Dataplot: Coefficient of Variation",
        "url": "https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/coefvari.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-02",
    "subject": 2,
    "title": "95% 신뢰구간의 비율은 구간을 만드는 절차에 붙는다",
    "lead": "빈도주의 신뢰구간의 95%는 한 번 얻은 구간 안에서 모수가 움직일 확률이 아니다. 같은 방법으로 구간을 반복 생성했을 때의 장기적인 포함 비율이다.",
    "cue": "95%는 한 구간의 확률이 아니라 구간 생성 절차의 성질이다.",
    "question": {
      "givens": "빈도주의의 유효한 95% 신뢰구간 생성 절차를 같은 조건에서 반복한다고 가정한다.",
      "stem": "95%의 뜻으로 옳은 것은?",
      "choices": [
        "한 번 구한 구간 안에 모수가 있을 확률이 95%다",
        "표본 관측값의 95%가 항상 구간 안에 있다",
        "생성된 구간들의 장기적 약 95%가 고정된 모수를 포함한다",
        "구간의 중심이 참 평균과 정확히 일치할 확률이 95%다"
      ],
      "answer": 3,
      "reason": "확률적으로 달라지는 것은 표본과 그로 만든 구간이며 신뢰수준은 절차의 장기적 포함 성질이다.",
      "wrong_reasons": [
        "① 이 문맥에서는 모수를 확률변수로 두지 않는다.",
        "② 평균의 신뢰구간과 관측값 분포의 범위는 다르다.",
        "④ 표본평균과 모평균의 정확한 일치를 보장하는 비율이 아니다."
      ]
    },
    "goal": "같은 표본과 n=25에서 신뢰수준만 바꿔 구간의 폭을 확인한다.",
    "kind": "interval-calculation",
    "relatedCodes": [
      "2-36",
      "2-38"
    ],
    "sources": [
      {
        "title": "NIST: Confidence Limits for the Mean",
        "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-03",
    "subject": 2,
    "title": "빈칸의 패턴과 결측 발생 기전은 같은 정보가 아니다",
    "lead": "빈칸이 몇 개인지 세는 일과 왜 비었는지 설명하는 일은 다르다. MCAR·MAR·MNAR는 관측된 칸의 모양보다 결측 확률이 어떤 값에 의존하는지를 구분한다.",
    "cue": "빈칸을 보기보다 무엇이 빈칸의 확률을 바꾸는지 묻는다.",
    "question": {
      "givens": "연령은 모두 관측됐다. 체중 누락 확률은 연령대별로 서로 다르고 관측된 연령에만 의존한다. 연령을 조건으로 하면 실제 체중에는 의존하지 않는다.",
      "stem": "이 명시된 결측 발생 규칙은 무엇에 해당하는가?",
      "choices": [
        "MCAR",
        "MAR",
        "MNAR",
        "빈칸을 0으로 대치한 규칙"
      ],
      "answer": 2,
      "reason": "관측 연령에는 의존하지만 연령을 조건으로 실제 체중에는 의존하지 않으므로 MAR 조건이다.",
      "wrong_reasons": [
        "① 관측 연령에 따라 누락 확률이 달라져 MCAR의 독립 조건과 다르다.",
        "③ 누락 체중 자체에 대한 추가 의존성은 없다고 주어졌다.",
        "④ 발생 기전과 값을 채우는 처리는 다른 개념이다."
      ]
    },
    "goal": "같은 빈칸 표에서 발생 규칙을 바꾸어 MCAR·MAR·MNAR의 차이를 판단한다.",
    "kind": "condition-choice",
    "relatedCodes": [
      "2-05",
      "2-07"
    ],
    "sources": [
      {
        "title": "UCLA OARC: Multiple Imputation in SAS Part 1",
        "url": "https://stats.oarc.ucla.edu/sas/seminars/multiple-imputation-in-sas/mi_new_1/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-04",
    "subject": 2,
    "title": "횟수를 세는 변수와 시간을 재는 변수부터 구분한다",
    "lead": "하루 고장 횟수와 고장까지의 시간은 같은 설비에서 얻어도 가능한 값의 구조가 다르다. 이산·연속의 구분은 분포를 고르는 출발점이며 특정 분포를 확정하는 근거는 아니다.",
    "cue": "정수로 보이는가보다 무엇을 세거나 재었는가를 먼저 본다.",
    "question": {
      "givens": "X는 하루 고장 건수, T는 이상적인 연속시간으로 정의한 다음 고장까지의 시간이다.",
      "stem": "변수 종류를 올바르게 구분한 것은?",
      "choices": [
        "X와 T 모두 이산",
        "X는 이산, T는 연속",
        "X는 연속, T는 이산",
        "X와 T 모두 명목 범주"
      ],
      "answer": 2,
      "reason": "건수의 가능한 값은 셀 수 있고 이상적 시간은 구간 안의 값을 연속적으로 허용한다.",
      "wrong_reasons": [
        "① T를 반올림한 기록과 이상적인 시간 모형을 혼동했다.",
        "③ 두 변수의 가능한 값 구조를 뒤집었다.",
        "④ 횟수와 시간에는 수량의 의미가 있다."
      ]
    },
    "goal": "측정 대상과 기록 방식을 바꾸어 원래 연속시간과 이산적인 반올림 기록을 구분한다.",
    "kind": "condition-choice",
    "relatedCodes": [
      "2-15",
      "2-23"
    ],
    "sources": [
      {
        "title": "Penn State STAT 897D: What is Data",
        "url": "https://online.stat.psu.edu/stat857/node/31/"
      }
    ],
    "featured": true,
    "featuredOrder": 4,
    "shortTitle": "변수의 종류"
  },
  {
    "code": "2-05",
    "subject": 2,
    "title": "빠진 값과 형식이 틀린 값은 다른 품질 문제다",
    "lead": "칸이 모두 채워져 있어도 값이 쓸 수 있는 것은 아니다. 완전성은 필요한 기록이 있는지, 유효성은 정한 범위와 형식에 맞는지 확인한다.",
    "cue": "있는가, 규칙에 맞는가, 사실과 같은가는 다른 검사다.",
    "question": {
      "givens": "점수는 필수이며 0~100의 정수다. A는 빈칸이고 B는 999다.",
      "stem": "가장 직접적인 품질 문제의 연결은?",
      "choices": [
        "A 완전성·B 유효성",
        "A 유일성·B 완전성",
        "A 적시성·B 유일성",
        "A와 B 모두 실제 점수가 확인됐다"
      ],
      "answer": 1,
      "reason": "A는 있어야 할 값이 없고 B는 값이 있지만 허용 범위를 어겼다.",
      "wrong_reasons": [
        "② 중복 여부는 주어지지 않았고 B의 값은 존재한다.",
        "③ 입력 시점이나 중복에 관한 정보는 없다.",
        "④ 두 기록 모두 실제 점수와의 대조는 하지 않았다."
      ]
    },
    "goal": "값의 존재·허용 규칙·원기록을 바꿔 어떤 품질 검사가 실패하는지 확인한다.",
    "kind": "condition-choice",
    "relatedCodes": [
      "2-03",
      "2-07"
    ],
    "sources": [
      {
        "title": "UK Government Data Quality Framework",
        "url": "https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-07",
    "subject": 2,
    "title": "드문 값을 찾았다는 이유만으로 삭제하지 않는다",
    "lead": "다른 값과 멀리 떨어진 기록은 확인할 후보이지 곧바로 오류라는 판정이 아니다. 입력 단위와 원기록을 먼저 대조해야 드문 사건을 지워 버리는 일을 피할 수 있다.",
    "cue": "이상값 표시는 조사 시작이며 삭제 허가가 아니다.",
    "question": {
      "givens": "일별 주문량 18·20·21·120건. 120건의 발생 원인은 아직 모른다.",
      "stem": "먼저 할 행동으로 가장 적절한 것은?",
      "choices": [
        "가장 큰 값이므로 즉시 삭제한다",
        "원기록·단위·행사 여부를 대조한다",
        "전체 평균으로 바로 바꾼다",
        "드문 값은 실제로 생길 수 없다고 결론 낸다"
      ],
      "answer": 2,
      "reason": "원인을 확인해야 입력 오류를 고치는 것과 실제 드문 사건을 보존하는 것을 구분할 수 있다.",
      "wrong_reasons": [
        "① 큰 값이라는 표시만으로 삭제 근거가 생기지 않는다.",
        "③ 대치는 발생 원인 확인을 대신하지 못한다.",
        "④ 극단적인 관측은 실제 사건일 수도 있다."
      ]
    },
    "goal": "극단값 120에 관한 추가 증거를 바꾸어 보존·정정·추가 조사를 구분한다.",
    "kind": "evidence-choice",
    "relatedCodes": [
      "2-08",
      "2-05"
    ],
    "sources": [
      {
        "title": "NIST: Detection of Outliers",
        "url": "https://itl.nist.gov/div898/handbook/eda/section3/eda35h.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-08",
    "subject": 2,
    "title": "이상값의 표시 기준을 바꾸면 선택되는 점도 달라진다",
    "lead": "상자그림 울타리 밖의 점과 표준점수가 큰 점은 같은 기준으로 고른 것이 아니다. 계산한 기준과 비교한 집단을 밝힌 뒤 그 표시를 해석한다.",
    "cue": "경계 계산과 오류 판단은 두 단계다.",
    "question": {
      "givens": "Q1=10, Q3=20. 1.5×IQR 울타리를 엄격히 벗어난 값만 후보로 표시한다. 관측값은 40이다.",
      "stem": "맞는 판단은?",
      "choices": [
        "IQR은 30이다",
        "40은 울타리 안이다",
        "40은 입력 오류로 확정된다",
        "40은 위 울타리 밖의 후보지만 오류는 미확정이다"
      ],
      "answer": 4,
      "reason": "IQR=10, 위 울타리=20+15=35다. 40은 밖이지만 그 원인은 알 수 없다.",
      "wrong_reasons": [
        "① IQR은 합이 아니라 Q3−Q1=10이다.",
        "② 40은 위 울타리 35보다 크다.",
        "③ 표시 규칙은 입력 오류의 원인을 입증하지 않는다."
      ]
    },
    "goal": "관측값과 IQR 배수를 바꿔 엄격한 울타리의 경계 포함 여부를 계산한다.",
    "kind": "fence-calculation",
    "relatedCodes": [
      "2-07",
      "2-26"
    ],
    "sources": [
      {
        "title": "NIST: Box Plot",
        "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
      },
      {
        "title": "NIST: Detection of Outliers",
        "url": "https://itl.nist.gov/div898/handbook/eda/section3/eda35h.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-12",
    "subject": 2,
    "title": "최소-최대 변환의 기준은 적용할 자료마다 새로 정하지 않는다",
    "lead": "최소-최대 변환은 정한 구간의 시작과 폭으로 값을 다시 표시한다. 어떤 자료에서 최솟값과 최댓값을 배웠는지가 결과의 뜻을 결정한다.",
    "cue": "값을 바꾸기 전에 기준 구간을 고정한다.",
    "question": {
      "givens": "기준 최솟값 10, 최댓값 30. 0~1 최소-최대 선형 변환이며 clipping하지 않는다.",
      "stem": "값 20의 변환 결과는?",
      "choices": [
        "0",
        "0.5",
        "1",
        "2"
      ],
      "answer": 2,
      "reason": "(20−10)/(30−10)=10/20=0.5다.",
      "wrong_reasons": [
        "① 0은 기준 최솟값 10의 결과다.",
        "③ 1은 기준 최댓값 30의 결과다.",
        "④ 2는 이 기준에서 50의 결과다."
      ]
    },
    "goal": "저장된 기준과 관측값, clipping 선택을 바꾸어 선형 변환의 차이를 확인한다.",
    "kind": "numeric-transform",
    "relatedCodes": [
      "2-13",
      "2-21"
    ],
    "sources": [
      {
        "title": "scikit-learn: Preprocessing data",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-13",
    "subject": 2,
    "title": "표준점수 0은 원자료의 0이 아니라 기준 평균이다",
    "lead": "표준화는 평균에서의 차이를 표준편차 단위로 표시한다. 표준점수가 0이라고 원래 값이 없거나 측정값이 0이었다는 뜻은 아니다.",
    "cue": "표준점수 0은 그 자료의 출발점이 아니라 평균 위치다.",
    "question": {
      "givens": "기준 평균 50, 표준편차 5이며 x=50이다. z=(x−평균)/표준편차를 사용한다.",
      "stem": "z와 그 의미로 옳은 것은?",
      "choices": [
        "0·원래 측정값이 0이다",
        "1·평균과 같다",
        "0·기준 평균과 같다",
        "−1·기준 평균보다 크다"
      ],
      "answer": 3,
      "reason": "(50−50)/5=0이고 이는 기준 평균과 같은 위치라는 뜻이다.",
      "wrong_reasons": [
        "① 원자료는 50이며 변환 후 0의 뜻을 혼동했다.",
        "② 평균에서 표준편차만큼 커야 z=1이다.",
        "④ z=−1은 여기서는 원자료 45의 위치다."
      ]
    },
    "goal": "기준 평균과 표준편차를 고정하고 관측값의 상대 위치를 바꿔 본다.",
    "kind": "numeric-transform",
    "relatedCodes": [
      "2-12",
      "2-25"
    ],
    "sources": [
      {
        "title": "scikit-learn: Preprocessing data",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
      }
    ],
    "featured": true,
    "featuredOrder": 5,
    "shortTitle": "표준점수의 기준"
  },
  {
    "code": "2-14",
    "subject": 2,
    "title": "로그 변환은 큰 값 사이의 간격을 다른 척도로 표현한다",
    "lead": "양수 자료의 로그 변환은 배율을 덧셈 간격으로 바꾼다. 큰 값을 압축할 수 있지만 정규성이나 예측 성능 향상을 자동으로 보장하지 않는다.",
    "cue": "로그의 같은 간격은 원자료의 같은 배율이다.",
    "question": {
      "givens": "실수 범위에서 밑이 10인 로그를 쓴다. 입력 x=100이다.",
      "stem": "log10(100)은?",
      "choices": [
        "0",
        "1",
        "2",
        "100"
      ],
      "answer": 3,
      "reason": "10²=100이므로 지수 2가 로그값이다.",
      "wrong_reasons": [
        "① 0은 log10(1)이다.",
        "② 1은 log10(10)이다.",
        "④ 입력값과 로그값을 구분하지 않았다."
      ]
    },
    "goal": "양수·0·음수와 로그의 밑을 바꾸어 정의역과 출력값을 확인한다.",
    "kind": "numeric-transform",
    "relatedCodes": [
      "2-12",
      "2-24"
    ],
    "sources": [
      {
        "title": "scikit-learn: Preprocessing data",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
      },
      {
        "title": "NumPy log10",
        "url": "https://numpy.org/doc/stable/reference/generated/numpy.log10.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-15",
    "subject": 2,
    "title": "연속값을 구간으로 바꾸면 정확한 값은 되찾기 어렵다",
    "lead": "이산화는 연속값을 구간의 이름이나 번호로 바꾸는 처리다. 구간을 고르는 규칙은 남지만 같은 구간 안에서의 작은 차이는 사라진다.",
    "cue": "같은 구간은 같은 원래 값을 뜻하지 않는다.",
    "question": {
      "givens": "[0,10)은 낮음, [10,20]은 높음으로 변환하고 구간 이름만 저장한다.",
      "stem": "낮음이라는 저장값에서 알 수 없는 것은?",
      "choices": [
        "값이 0 이상 10 미만이었다",
        "10은 낮음에 포함되지 않는다",
        "원래 값이 3인지 8인지 정확히 구별한다",
        "3과 8은 같은 구간에 들어간다"
      ],
      "answer": 3,
      "reason": "구간 이름만 남으면 같은 구간 안의 정확한 값 정보는 되찾을 수 없다.",
      "wrong_reasons": [
        "① 구간의 정의에서 확인할 수 있다.",
        "② 오른쪽 끝을 제외하는 [0,10) 규칙에 명시되어 있다.",
        "④ 두 값 모두 정의된 낮음 구간에 있다."
      ]
    },
    "goal": "관측값을 바꾸어 구간 경계의 소속과 구간화의 정보 손실을 확인한다.",
    "kind": "bin-assignment",
    "relatedCodes": [
      "2-04",
      "2-16"
    ],
    "sources": [
      {
        "title": "scikit-learn: Preprocessing data",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-16",
    "subject": 2,
    "title": "명목 범주의 숫자는 크기가 아니라 이름이다",
    "lead": "색상에 1·2·3이라는 코드를 붙여도 색 사이에 크기나 거리의 의미가 생기지 않는다. 원-핫 인코딩은 각 범주에 속하는지를 별도 열로 표시한다.",
    "cue": "숫자의 위치보다 그 열의 범주 이름을 읽는다.",
    "question": {
      "givens": "한 행은 색 하나다. 열 순서는 빨강·파랑·초록이며 범주를 생략하지 않는다.",
      "stem": "파랑의 원-핫 표현은?",
      "choices": [
        "[1,0,0]",
        "[0,1,0]",
        "[0,0,1]",
        "[1,1,0]"
      ],
      "answer": 2,
      "reason": "파랑 열만 1이고 다른 두 색의 열은 0이다.",
      "wrong_reasons": [
        "① 주어진 순서에서 빨강이다.",
        "③ 주어진 순서에서 초록이다.",
        "④ 한 행이 두 색에 속한다고 표시하여 색 하나 조건과 다르다."
      ]
    },
    "goal": "색상과 열 순서를 바꾸어 같은 범주의 원-핫 벡터를 확인한다.",
    "kind": "encoding-choice",
    "relatedCodes": [
      "2-23",
      "3-01"
    ],
    "sources": [
      {
        "title": "scikit-learn: Preprocessing data",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-17",
    "subject": 2,
    "title": "파생변수는 계산식과 관측 단위를 함께 정의한다",
    "lead": "기존 열을 계산했다고 모두 같은 의미의 새 변수가 되는 것은 아니다. 한 행이 무엇을 나타내는지와 계산 결과가 답하려는 질문을 함께 정해야 한다.",
    "cue": "새 열의 계산식 옆에 한 행의 단위를 적는다.",
    "question": {
      "givens": "한 행은 주문 한 건이다. 주문 A의 수량 2개, 단가 5천원이며 금액=수량×단가다.",
      "stem": "A의 주문금액은 몇 천원인가?",
      "choices": [
        "2",
        "5",
        "10",
        "7"
      ],
      "answer": 3,
      "reason": "같은 주문의 수량 2와 단가 5를 곱해 10천원을 얻는다.",
      "wrong_reasons": [
        "① 수량만 읽었다.",
        "② 단가만 읽었다.",
        "④ 곱셈 대신 2+5를 계산했다."
      ]
    },
    "goal": "같은 주문의 수량과 단가를 바꾸어 단위를 유지한 파생 금액을 계산한다.",
    "kind": "derived-feature",
    "relatedCodes": [
      "2-05",
      "2-21"
    ],
    "sources": [
      {
        "title": "scikit-learn: Preprocessing data",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-19",
    "subject": 2,
    "title": "열을 남기는 선택과 새 축을 만드는 추출을 구분한다",
    "lead": "입력 열 수를 줄였다는 결과만으로 같은 처리라고 부르면 안 된다. 원래 열이 그대로 남는지, 여러 열을 섞어 새로운 표현을 만들었는지가 선택과 추출을 가른다.",
    "cue": "원래 열을 골랐는가, 새로운 축을 만들었는가.",
    "question": {
      "givens": "A는 x1~x5 중 x1·x4를 남긴다. B는 z=0.6x1+0.8x2라는 새 축을 만든다.",
      "stem": "두 처리의 구분으로 맞는 것은?",
      "choices": [
        "A 선택·B 추출",
        "A 추출·B 선택",
        "A와 B 모두 원래 열 두 개를 선택",
        "A와 B 모두 정보 손실이 전혀 없다"
      ],
      "answer": 1,
      "reason": "A의 출력은 원래 열의 부분집합이고 B의 출력은 여러 열을 결합한 새로운 표현이다.",
      "wrong_reasons": [
        "② 산출물의 구조를 뒤집었다.",
        "③ B는 새 축 하나이고 원래 두 열이 그대로 남지 않는다.",
        "④ 선택·축소 과정에서 필요한 정보가 사라질 수도 있다."
      ]
    },
    "goal": "같은 입력에서 원래 열을 선택하거나 새 값을 결합하는 차이를 확인한다.",
    "kind": "feature-transform",
    "relatedCodes": [
      "2-16",
      "2-21"
    ],
    "sources": [
      {
        "title": "scikit-learn: Feature selection",
        "url": "https://scikit-learn.org/stable/modules/feature_selection.html"
      },
      {
        "title": "scikit-learn: Decomposing signals in components",
        "url": "https://scikit-learn.org/stable/modules/decomposition.html#pca"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-21",
    "subject": 2,
    "title": "검증으로 고르고 시험 자료로 마지막 성능을 확인한다",
    "lead": "훈련·검증·시험 자료를 나누는 이유는 이름을 외우기 위해서가 아니다. 모형을 학습한 자료와 모형을 선택한 자료의 영향에서 최종 평가를 분리하기 위해서다.",
    "cue": "훈련은 학습, 검증은 선택, 시험은 선택 뒤 확인이다.",
    "question": {
      "givens": "같은 검증 자료의 정확도로 후보를 고른다. A: 훈련99%·검증70%, B: 훈련90%·검증80%. 시험은 아직 보지 않았다.",
      "stem": "주어진 기준에서 선택할 후보는?",
      "choices": [
        "훈련 점수가 높은 A",
        "검증 점수가 높은 B",
        "시험 정답을 본 뒤 다시 고른다",
        "두 훈련 점수를 더해 결정한다"
      ],
      "answer": 2,
      "reason": "정한 선택 기준은 동일 검증 자료의 정확도이며 B의 80%가 A의 70%보다 높다.",
      "wrong_reasons": [
        "① 선택 기준을 훈련 정확도로 바꾸었다.",
        "③ 시험 정답을 선택에 사용하면 최종 평가의 독립성이 깨진다.",
        "④ 후보별 학습 점수의 합은 정한 선택 기준이 아니다."
      ]
    },
    "goal": "검증 점수와 시험 정보 사용 여부를 바꾸어 선택과 독립 평가의 경계를 확인한다.",
    "kind": "selection-rule",
    "relatedCodes": [
      "2-12",
      "2-22"
    ],
    "sources": [
      {
        "title": "scikit-learn: Cross-validation",
        "url": "https://scikit-learn.org/stable/modules/cross_validation.html"
      }
    ],
    "featured": true,
    "featuredOrder": 6,
    "shortTitle": "학습·검증·시험 분리"
  },
  {
    "code": "2-22",
    "subject": 2,
    "title": "분할 단위는 나중에 예측할 대상에 맞춘다",
    "lead": "행을 섞어 나누기 전에 한 행이 누구와 어느 시점에서 나왔는지 확인한다. 같은 사람의 반복 기록이나 미래의 관측이 섞이면 평가하려던 조건이 바뀔 수 있다.",
    "cue": "나눌 단위는 행이 아니라 평가하려는 사람과 시간이다.",
    "question": {
      "givens": "A·B·C 각각 두 기록이 있다. 목표는 훈련 때 없던 새 사람을 예측하는 것이다.",
      "stem": "목표에 맞는 시험 분할은?",
      "choices": [
        "각 사람의 첫 행은 훈련, 둘째 행은 시험",
        "모든 기록으로 학습하고 같은 기록을 시험",
        "A·B의 모든 행으로 훈련하고 C의 모든 행으로 시험",
        "행 번호가 홀수인지로만 분할"
      ],
      "answer": 3,
      "reason": "사람 C는 훈련에 없으므로 새 사람을 평가한다는 질문을 유지한다.",
      "wrong_reasons": [
        "① 같은 사람이 양쪽에 있어 새 사람 조건이 아니다.",
        "② 학습 자료 자체를 평가하면 새 자료 평가가 아니다.",
        "④ 행 번호와 개인의 중복 여부는 무관할 수 있다."
      ]
    },
    "goal": "평가 목적과 분할 방법을 바꾸어 사람과 시간의 경계를 확인한다.",
    "kind": "split-condition",
    "relatedCodes": [
      "2-21",
      "2-32"
    ],
    "sources": [
      {
        "title": "scikit-learn: Cross-validation",
        "url": "https://scikit-learn.org/stable/modules/cross_validation.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-23",
    "subject": 2,
    "title": "같은 숫자라도 척도에 따라 가능한 해석이 다르다",
    "lead": "범주에 붙인 번호와 중량을 잰 숫자는 같은 연산을 허용하지 않는다. 순서·차이·비율 중 무엇이 의미 있는지를 변수의 정의에서 확인한다.",
    "cue": "번호인가, 순서인가, 차이인가, 비율인가.",
    "question": {
      "givens": "색상은 명목 코드, 만족도는 순위, 온도는 섭씨, 중량은 kg이다.",
      "stem": "정당한 해석은?",
      "choices": [
        "색상 코드 2는 1의 두 배 색이다",
        "만족도 4와 2의 차이는 항상 2와 0의 차이와 같다",
        "20℃는 10℃의 두 배 온도다",
        "20kg은 10kg의 두 배 중량이다"
      ],
      "answer": 4,
      "reason": "중량은 의미 있는 영점을 가진 비율척도라 같은 단위에서 배율을 해석할 수 있다.",
      "wrong_reasons": [
        "① 명목 코드는 식별자이지 수량이 아니다.",
        "② 서열 단계 사이의 같은 간격이 보장되지 않는다.",
        "③ 섭씨의 0은 절대 영점이 아니므로 온도 비율을 그렇게 해석하지 않는다."
      ]
    },
    "goal": "측정척도를 바꾸어 배율 해석과 코드의 산술 연산을 구분한다.",
    "kind": "scale-interpretation",
    "relatedCodes": [
      "2-01",
      "2-16"
    ],
    "sources": [
      {
        "title": "Penn State STAT 897D: What is Data",
        "url": "https://online.stat.psu.edu/stat857/node/31/"
      },
      {
        "title": "NIST Dataplot: Coefficient of Variation",
        "url": "https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/coefvari.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-24",
    "subject": 2,
    "title": "평균을 고르기 전에 무엇의 합을 보존할지 정한다",
    "lead": "평균은 무조건 더하고 개수로 나누는 한 종류의 계산이 아니다. 같은 시간의 속도, 같은 거리의 속도, 기간별 성장배율은 서로 다른 합계와 관계를 보존해야 한다.",
    "cue": "속도 평균은 총거리 나누기 총시간에서 시작한다.",
    "question": {
      "givens": "같은 거리 60km씩을 시속 30km와 60km로 이동했다. 정차 시간은 없다.",
      "stem": "전체 평균 속도는 몇 km/h인가?",
      "choices": [
        "30",
        "40",
        "45",
        "60"
      ],
      "answer": 2,
      "reason": "총거리 120km, 총시간 60/30+60/60=3h이므로 40km/h다.",
      "wrong_reasons": [
        "① 느린 구간 속도만 골랐다.",
        "③ 같은 시간일 때의 산술평균을 같은 거리 조건에 적용했다.",
        "④ 빠른 구간 속도만 골랐다."
      ]
    },
    "goal": "두 속도와 동일 거리·동일 시간 조건을 바꾸어 평균 속도를 계산한다.",
    "kind": "weighted-rate",
    "relatedCodes": [
      "2-17",
      "2-35"
    ],
    "sources": [
      {
        "title": "NIST: Measures of Location",
        "url": "https://itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
      },
      {
        "title": "SciPy: hmean",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.hmean.html"
      },
      {
        "title": "SciPy: gmean",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gmean.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-25",
    "subject": 2,
    "title": "표본분산의 분모 n−1은 평균을 추정한 제약과 연결된다",
    "lead": "표본평균 주변의 편차는 모두 독립적으로 정해지지 않는다. 모분산을 불편하게 추정하는 표본분산은 그 제약을 반영해 편차제곱합을 n−1로 나눈다.",
    "cue": "편차를 제곱했으니 단위와 배율도 제곱된다.",
    "question": {
      "givens": "독립·동일분포 표본 2·4·6이다. 모분산의 불편 추정량 s²=Σ(x−표본평균)²/(n−1)을 쓴다.",
      "stem": "s²는 얼마인가?",
      "choices": [
        "2",
        "8/3",
        "4",
        "8"
      ],
      "answer": 3,
      "reason": "평균은 4, 편차제곱합은 8이므로 8/(3−1)=4다.",
      "wrong_reasons": [
        "① 표본표준편차와 분산을 혼동했다.",
        "② n으로 나눈 값이며 문제에서 정한 분모와 다르다.",
        "④ 편차제곱합에서 나누기를 하지 않았다."
      ]
    },
    "goal": "세 관측의 배율과 분모의 정의를 바꾸어 분산과 표준편차를 구분한다.",
    "kind": "variance-calculation",
    "relatedCodes": [
      "2-13",
      "2-28"
    ],
    "sources": [
      {
        "title": "NIST: Measures of Scale",
        "url": "https://itl.nist.gov/div898/handbook/eda/section3/eda356.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-26",
    "subject": 2,
    "title": "상자그림에 그리지 않은 평균을 중앙선으로 읽지 않는다",
    "lead": "상자그림의 중앙선은 보통 중앙값이다. 평균 표시가 따로 없다면 상자그림에서 정확한 산술평균을 읽을 수 없다.",
    "cue": "중앙선은 중앙값이며 평균은 별도 표시를 확인한다.",
    "question": {
      "givens": "상자그림에 아래 수염2·Q1=4·중앙값6·Q3=8·위 수염10만 표시하고 평균 기호는 없다.",
      "stem": "그림에서 정확한 값을 직접 읽을 수 없는 것은?",
      "choices": [
        "중앙값",
        "산술평균",
        "제1사분위수",
        "제3사분위수"
      ],
      "answer": 2,
      "reason": "평균 표시는 없고 사분위수와 중앙값만으로 평균은 일반적으로 정해지지 않는다.",
      "wrong_reasons": [
        "① 중앙값 6이 명시되어 있다.",
        "③ Q1=4가 명시되어 있다.",
        "④ Q3=8이 명시되어 있다."
      ]
    },
    "goal": "평균 기호와 바깥 점을 추가했을 때 그림에서 직접 읽을 수 있는 값을 구분한다.",
    "kind": "read-plot-conditions",
    "relatedCodes": [
      "2-08",
      "2-25"
    ],
    "sources": [
      {
        "title": "NIST: Box Plot",
        "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
      },
      {
        "title": "NIST: Measures of Location",
        "url": "https://itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-28",
    "subject": 2,
    "title": "공분산의 크기와 상관계수의 크기는 단위 변화에 다르게 반응한다",
    "lead": "공분산은 두 변수의 함께 움직임을 원래 단위의 곱으로 나타낸다. 상관계수는 각각의 표준편차로 다시 나누므로 양수 단위 변환에 영향을 받지 않는다.",
    "cue": "공분산에는 단위가 남고 상관계수에서는 산포 단위가 나뉜다.",
    "question": {
      "givens": "x=[1,2,3], y=[2,4,6]. 표본공분산은 n−1로 나눈다. y만 100배 한다.",
      "stem": "변환 후 공분산과 피어슨 상관계수는?",
      "choices": [
        "2와 1",
        "200과 100",
        "2와 100",
        "200과 1"
      ],
      "answer": 4,
      "reason": "공분산은 100배인 200이 되고 표준편차 배율이 상쇄되어 상관계수는 1로 유지된다.",
      "wrong_reasons": [
        "① 공분산의 단위 배율을 반영하지 않았다.",
        "② 상관계수는 100이 될 수 없고 이 경우 배율은 상쇄된다.",
        "③ 공분산과 상관계수 양쪽의 변화를 잘못 적용했다."
      ]
    },
    "goal": "y의 배율을 양수·음수·0으로 바꾸어 공분산과 상관계수의 차이를 확인한다.",
    "kind": "covariance-correlation",
    "relatedCodes": [
      "2-25",
      "2-13"
    ],
    "sources": [
      {
        "title": "SciPy: pearsonr",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.pearsonr.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-31",
    "subject": 2,
    "title": "각 층에서 뽑는가, 일부 집락을 고르는가",
    "lead": "집단을 나누었다는 사실만으로 층화추출과 집락추출을 구분할 수 없다. 모든 집단에서 일부를 뽑았는지, 집단 일부를 먼저 고른 뒤 그 안을 조사했는지가 핵심이다.",
    "cue": "각 층의 일부인지, 일부 집락의 전부인지 읽는다.",
    "question": {
      "givens": "4개 학급 각 20명에서, 모든 학급마다 무작위로 2명씩 추출한다.",
      "stem": "이 추출 절차는?",
      "choices": [
        "학급을 층으로 한 층화추출",
        "학급 한 개의 전원 집락추출",
        "전체 학생의 전수조사",
        "확률을 정하지 않은 임의 편의추출"
      ],
      "answer": 1,
      "reason": "모든 층에서 각각 표본을 무작위로 뽑는 구조이므로 층화추출이다.",
      "wrong_reasons": [
        "② 집락 일부를 고르고 전원을 조사한 절차가 아니다.",
        "③ 전체 80명 중 8명만 조사한다.",
        "④ 각 학급 내 무작위 추출이라는 확률 절차가 주어졌다."
      ]
    },
    "goal": "추출 단위를 바꾸어 층화·집락·다단계의 절차와 조사 인원을 확인한다.",
    "kind": "sampling-design",
    "relatedCodes": [
      "2-32",
      "2-22"
    ],
    "sources": [
      {
        "title": "Statistics Canada: Probability sampling",
        "url": "https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/prob/5214899-eng.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-32",
    "subject": 2,
    "title": "표본을 늘려도 표본틀에서 빠진 사람은 돌아오지 않는다",
    "lead": "표본 수를 늘리면 무작위 표집의 흔들림을 줄일 수 있지만 조사 대상에서 체계적으로 빠진 집단의 문제를 자동으로 고치지는 못한다.",
    "cue": "많이 뽑는 것보다 누구를 뽑을 수 있는 틀인지 먼저 본다.",
    "question": {
      "givens": "전체 주민 평균이 목표인데 전화 보유자만 표본틀에 있다. 이 틀에서 100명을 1000명으로 늘린다.",
      "stem": "옳은 판단은?",
      "choices": [
        "포괄오차가 반드시 0이 된다",
        "전체 주민을 모두 조사한 셈이다",
        "전화 미보유자의 체계적 누락은 남을 수 있다",
        "비표본오차는 표본 수만 알면 정확히 계산된다"
      ],
      "answer": 3,
      "reason": "누락된 집단은 뽑힐 기회 자체가 없어 같은 표본틀 안의 표본 확대가 포괄 문제를 해결하지 못한다.",
      "wrong_reasons": [
        "① 표본틀을 고치지 않았으므로 그런 보장은 없다.",
        "② 표본틀 밖의 주민은 여전히 제외되어 있다.",
        "④ 비표본오차의 원인·크기를 표본 수 하나로 알 수 없다."
      ]
    },
    "goal": "같은 표본틀의 표본 수 증가와 누락 집단을 틀에 포함하는 변화를 비교한다.",
    "kind": "coverage-calculation",
    "relatedCodes": [
      "2-31",
      "2-36"
    ],
    "sources": [
      {
        "title": "Statistics Canada: Non-sampling error",
        "url": "https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch6/nse-endae/5214806-eng.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-33",
    "subject": 2,
    "title": "조건부확률은 조건에 해당하는 집단을 분모로 삼는다",
    "lead": "불량품을 보았을 때 어느 공장에서 왔는지 묻는 확률과, 한 공장의 제품이 불량일 확률은 조건이 반대다. 분모에 들어가는 집단부터 표시한다.",
    "cue": "무엇을 안 뒤의 확률인지가 분모를 정한다.",
    "question": {
      "givens": "A 생산100개 중 불량10개, B 생산100개 중 불량30개다. 전체 생산품에서 균등하게 고른 제품이 불량이라고 확인됐다.",
      "stem": "그 제품이 B 공장 제품일 조건부확률은?",
      "choices": [
        "30%",
        "50%",
        "75%",
        "15%"
      ],
      "answer": 3,
      "reason": "불량 40개 중 B의 불량이 30개이므로 30/40=0.75다.",
      "wrong_reasons": [
        "① B라는 조건에서 불량일 비율 30/100이다.",
        "② 전체 생산품에서 B가 차지하는 비율 100/200이다.",
        "④ B와 불량이 함께인 비율 30/200이다."
      ]
    },
    "goal": "불량 수와 조건의 방향을 바꾸어 조건부확률의 분모를 확인한다.",
    "kind": "conditional-probability",
    "relatedCodes": [
      "2-34",
      "2-35"
    ],
    "sources": [
      {
        "title": "Penn State STAT 414: Bayes’ Theorem",
        "url": "https://online.stat.psu.edu/stat414/Lesson06"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-34",
    "subject": 2,
    "title": "다시 넣는 추출과 넣지 않는 추출은 다음 확률이 다르다",
    "lead": "성공 횟수를 센다는 공통점만으로 이항분포를 쓰면 안 된다. 시행 사이에 성공확률이 유지되는지와 독립성을 먼저 확인한다.",
    "cue": "첫 번째를 뽑은 뒤 주머니에 무엇이 남는지 적는다.",
    "question": {
      "givens": "빨강 2개·파랑 3개에서 두 개를 균등하게 비복원 추출한다.",
      "stem": "두 번 모두 빨강일 확률은?",
      "choices": [
        "0.16",
        "0.10",
        "0.40",
        "0.25"
      ],
      "answer": 2,
      "reason": "첫 빨강 2/5 뒤에는 빨강 1개가 전체 4개 중 남으므로 2/5×1/4=0.10이다.",
      "wrong_reasons": [
        "① 복원·독립 추출의 (2/5)²을 적용했다.",
        "③ 첫 번째 빨강의 확률만 계산했다.",
        "④ 첫 빨강을 뽑은 뒤의 두 번째 조건부확률만 계산했다."
      ]
    },
    "goal": "공의 수와 복원 여부를 바꾸어 두 번 모두 빨강인 확률을 계산한다.",
    "kind": "draw-probability",
    "relatedCodes": [
      "2-33",
      "2-35"
    ],
    "sources": [
      {
        "title": "SciPy: binom",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binom.html"
      },
      {
        "title": "SciPy: hypergeom",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.hypergeom.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-35",
    "subject": 2,
    "title": "기댓값은 가능한 값에 확률을 가중한 평균이다",
    "lead": "기댓값은 가능한 값에 각각의 확률을 곱해 더한 평균이다. 확률이 모두 같으면 단순평균과 일치하지만, 일반적인 계산에서는 주어진 확률을 생략하면 안 된다. 분산은 같은 확률로 평균에서의 제곱 거리를 요약한다.",
    "cue": "값에 확률을 곱해 더하고, 제곱의 평균에서 평균의 제곱을 뺀다.",
    "question": {
      "givens": "P(X=0)=0.25, P(X=2)=0.75다.",
      "stem": "E(X)와 Var(X)는?",
      "choices": [
        "1과 1",
        "1.5와 3",
        "1.5와 0.75",
        "2와 0.25"
      ],
      "answer": 3,
      "reason": "E(X)=0×0.25+2×0.75=1.5, Var(X)=3−1.5²=0.75다.",
      "wrong_reasons": [
        "① 두 가능한 값의 확률이 같다고 계산했다.",
        "② E(X²)=3과 분산을 혼동했다.",
        "④ 자주 나오는 값 2를 기댓값으로, 확률 0.25를 분산으로 읽었다."
      ]
    },
    "goal": "확률과 선형 변환의 배율·위치를 바꾸어 기댓값과 분산을 계산한다.",
    "kind": "expectation-variance",
    "relatedCodes": [
      "2-24",
      "2-25"
    ],
    "sources": [
      {
        "title": "Penn State STAT 414: Mathematical Expectation",
        "url": "https://online.stat.psu.edu/stat414/Lesson08"
      },
      {
        "title": "SciPy rv_discrete.expect",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.rv_discrete.expect.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-36",
    "subject": 2,
    "title": "개별 관측의 산포와 표본평균의 산포는 다르다",
    "lead": "표본평균의 분포는 같은 크기의 표본을 반복해서 뽑고 평균을 계산할 때의 분포다. 한 표본 안의 개별 값들이 모인 분포와 구분해야 한다.",
    "cue": "n개 값의 분포와 n개를 평균낸 값의 분포를 나눈다.",
    "question": {
      "givens": "평균100·표준편차12인 모집단에서 독립·동일분포 관측 36개를 뽑아 평균낸다.",
      "stem": "표본평균의 기댓값과 표준오차는?",
      "choices": [
        "100과 2",
        "100과 12",
        "100/36과 2",
        "100과 144"
      ],
      "answer": 1,
      "reason": "E(평균)=100, 표준오차=12/√36=2다.",
      "wrong_reasons": [
        "② 개별 관측의 표준편차를 평균의 표준오차로 썼다.",
        "③ 평균의 기댓값은 n으로 다시 나누지 않는다.",
        "④ 144는 개별 관측의 분산이며 표준오차가 아니다."
      ]
    },
    "goal": "표본 수와 독립성 조건을 바꾸어 평균의 표준오차 공식 적용 여부를 확인한다.",
    "kind": "standard-error",
    "relatedCodes": [
      "2-02",
      "2-32"
    ],
    "sources": [
      {
        "title": "Penn State STAT 414: Central Limit Theorem",
        "url": "https://online.stat.psu.edu/stat414/Lesson27"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-37",
    "subject": 2,
    "title": "좋은 추정량의 네 성질은 서로 다른 질문이다",
    "lead": "한 번의 추정값이 참값과 가까웠다는 사실만으로 추정량을 평가할 수 없다. 불편성·일치성·효율성·충분성은 반복 표집과 자료 축약의 서로 다른 성질을 말한다.",
    "cue": "평균이 맞는가, 모이는가, 덜 흔들리는가, 정보를 남기는가.",
    "question": {
      "givens": "모수 θ의 추정량 T에 대해 모든 θ에서 Eθ(T)=θ가 성립한다.",
      "stem": "이 조건이 직접 말하는 성질은?",
      "choices": [
        "표본 수가 커지면 반드시 참값과 정확히 같다",
        "모든 모수의 정보를 항상 보존한다",
        "분산이 가능한 모든 추정량 중 가장 작다",
        "불편성"
      ],
      "answer": 4,
      "reason": "추정량의 기댓값과 목표 모수가 같다는 것은 불편성의 정의다.",
      "wrong_reasons": [
        "① 일치성도 확률적 가까워짐을 말하며 정확한 일치를 보장하지 않는다.",
        "② 충분성은 조건부 분포나 우도 구조를 별도로 확인해야 한다.",
        "③ 효율성은 분산과 비교 집합에 관한 추가 조건이 필요하다."
      ]
    },
    "goal": "같은 불편성을 가진 두 추정 규칙의 분산을 표본 수에 따라 비교한다.",
    "kind": "estimator-comparison",
    "relatedCodes": [
      "2-25",
      "2-36"
    ],
    "sources": [
      {
        "title": "Hyebin Song, Penn State STAT 415 (2021): Point Estimation",
        "url": "https://hsong1.github.io/teachings/psu-sp21-stat415/2_Point%20Estimation.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "2-38",
    "subject": 2,
    "title": "p값을 읽을 때 가정과 결론의 방향을 바꾸지 않는다",
    "lead": "p값은 귀무가설이 참일 확률이 아니다. 귀무가설과 검정 가정 아래에서 관측한 결과 이상으로 극단적인 통계량이 나올 확률을 나타낸다.",
    "cue": "p값은 가설의 확률이 아니라 가설 아래 결과의 극단성이다.",
    "question": {
      "givens": "가정이 맞는 검정에서 p=0.03이다. 유의수준 α=0.05를 사전에 정했다.",
      "stem": "맞는 결론은?",
      "choices": [
        "귀무가설이 참일 확률은 3%다",
        "0.03<0.05이므로 귀무가설을 기각한다",
        "차이가 전혀 없다고 확정한다",
        "제2종 오류 확률은 항상 3%다"
      ],
      "answer": 2,
      "reason": "정한 기준에서 p값이 α보다 작아 기각한다. 이 결정은 가설의 사후확률이나 효과 크기를 직접 말하지 않는다.",
      "wrong_reasons": [
        "① p값의 조건부 방향을 뒤집었다.",
        "③ 기각 결과와도 맞지 않고 차이의 부재를 증명하는 절차도 아니다.",
        "④ β는 특정 대립가설·표본 설계 등에 따라 달라지며 p값과 같지 않다."
      ]
    },
    "goal": "같은 p값에 서로 다른 사전 유의수준을 적용하고 등호 경계를 확인한다.",
    "kind": "hypothesis-decision",
    "relatedCodes": [
      "2-02",
      "4-14"
    ],
    "sources": [
      {
        "title": "Penn State STAT 200: Hypothesis Testing Part 1",
        "url": "https://online.stat.psu.edu/stat200/Lesson05"
      },
      {
        "title": "Penn State STAT 200: Hypothesis Testing Part 2",
        "url": "https://online.stat.psu.edu/stat200/Lesson06"
      },
      {
        "title": "ASA Statement on Statistical Significance and P-Values",
        "url": "https://www.amstat.org/asa/files/pdfs/P-ValueStatement.pdf"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-01",
    "subject": 3,
    "title": "범주형 회귀의 계수는 조건부터 센다",
    "lead": "수준 수를 바로 더하지 말고 절편·주효과·교호작용을 먼저 표시한다.",
    "cue": "절편을 적고, 수준마다 하나씩 뺀다.",
    "question": {
      "givens": "A 3수준·B 4수준. 절편 포함, 기준 코딩, 주효과만, 설계행렬 완전열랭크.",
      "stem": "추정하는 평균 모형의 계수 수는?",
      "choices": [
        "5개",
        "6개",
        "7개",
        "12개"
      ],
      "answer": 2,
      "reason": "절편 1개와 A의 2개, B의 3개를 더하면 6개다. 문제는 교호작용을 제외했다.",
      "wrong_reasons": [
        "1번: 5는 지시변수 계수만 센 것으로 절편이 빠졌다.",
        "3번: 7은 수준 3+4를 그대로 더한 수로 지정된 기준 코딩과 다르다.",
        "4번: 12는 두 범주의 모든 조합을 별도 평균으로 표현할 때의 자유로운 평균 수다."
      ]
    },
    "goal": "주효과와 교호작용을 켰을 때 독립 계수 수가 달라지는 이유를 확인한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "Penn State STAT 502",
        "url": "https://online.stat.psu.edu/stat502/Lesson04"
      },
      {
        "title": "R stats model.matrix",
        "url": "https://stat.ethz.ch/R-manual/R-devel/library/stats/html/model.matrix.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-03",
    "subject": 3,
    "title": "비모수검정은 표본의 연결부터 고른다",
    "lead": "정규성이라는 한 단어보다 독립 표본인지 같은 사람의 반복 측정인지 먼저 본다.",
    "cue": "독립 두 집단인가, 같은 사람의 차이인가.",
    "question": {
      "givens": "서로 다른 사람의 두 독립 집단. 순서형 반응의 분포를 순위로 비교하려 한다.",
      "stem": "보기 중 자료 구조에 맞는 검정은?",
      "choices": [
        "대응표본 t검정",
        "Wilcoxon 부호순위 검정",
        "Mann–Whitney U 검정",
        "범주 빈도 카이제곱검정"
      ],
      "answer": 3,
      "reason": "두 집단 사이에 짝이 없고 순위 기반 분포 비교를 원하므로 Mann–Whitney U가 맞는다.",
      "wrong_reasons": [
        "1번: 같은 사람의 차이 평균을 다루는 설계가 아니다.",
        "2번: 짝별 차이가 필요한 검정인데 여기에는 짝이 없다.",
        "4번: 반응을 범주별 빈도로 정리하는 상황을 제시하지 않았다."
      ]
    },
    "goal": "짝 정보와 차이의 대칭성에 따라 검토할 순위검정을 바꾼다.",
    "kind": "decision",
    "relatedCodes": [],
    "sources": [
      {
        "title": "SciPy mannwhitneyu",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.mannwhitneyu.html"
      },
      {
        "title": "SciPy wilcoxon",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.wilcoxon.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-05",
    "subject": 3,
    "title": "최소제곱은 잔차의 부호를 지운다",
    "lead": "잔차 합이 0이라는 사실과 오차가 작다는 판단을 구별한다.",
    "cue": "잔차를 더하지 말고, 제곱해서 더한다.",
    "question": {
      "givens": "관측값 1·2·3에 절편 b만 있는 모형을 보통 최소제곱으로 적합한다.",
      "stem": "적합 절편과 잔차 제곱합은?",
      "choices": [
        "b=2, RSS=0",
        "b=1, RSS=5",
        "b=3, RSS=2",
        "b=2, RSS=2"
      ],
      "answer": 4,
      "reason": "평균 2를 예측하면 잔차는 −1,0,1이다. 제곱합 1+0+1=2를 얻는다.",
      "wrong_reasons": [
        "1번: 잔차 합 0과 잔차 제곱합을 혼동했다.",
        "2번: 제시된 RSS 계산은 맞지만 5보다 작은 RSS를 갖는 b=2가 있다.",
        "3번: b=3의 RSS는 4+1+0=5다."
      ]
    },
    "goal": "절편 후보를 바꿔 RSS 곡선의 최소점이 평균임을 확인한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-08"
    ],
    "sources": [
      {
        "title": "scikit-learn Linear Models",
        "url": "https://scikit-learn.org/stable/modules/linear_model.html"
      }
    ],
    "featured": true,
    "featuredOrder": 7,
    "shortTitle": "최소제곱의 기준"
  },
  {
    "code": "3-06",
    "subject": 3,
    "title": "로지스틱 계수는 확률보다 오즈에 붙는다",
    "lead": "선형식·오즈·확률을 세 줄로 나누면 증가량과 배수를 구별할 수 있다.",
    "cue": "계수는 로그오즈, 지수는 오즈의 배수.",
    "question": {
      "givens": "이진 로지스틱 모형에서 한 관측의 선형식 η=ln3이다.",
      "stem": "사건 확률 p는?",
      "choices": [
        "0.25",
        "0.50",
        "0.75",
        "3.00"
      ],
      "answer": 3,
      "reason": "오즈 exp(ln3)=3이므로 p=3/(1+3)=0.75다.",
      "wrong_reasons": [
        "1번: 사건과 비사건을 바꾸었을 때의 확률이다.",
        "2번: 선형식 η=0일 때의 값이다.",
        "4번: 오즈 3을 확률로 오인했다."
      ]
    },
    "goal": "같은 오즈 배수가 시작 확률에 따라 다른 확률 변화를 만드는 것을 본다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Linear Models",
        "url": "https://scikit-learn.org/stable/modules/linear_model.html"
      }
    ],
    "featured": true,
    "featuredOrder": 8,
    "shortTitle": "확률·오즈·로짓"
  },
  {
    "code": "3-07",
    "subject": 3,
    "title": "트리 분할은 자식 전체의 엔트로피를 본다",
    "lead": "작은 순수 노드 하나보다 분할 뒤 남은 전체 혼합을 비교한다.",
    "cue": "부모에서, 자식의 크기 가중평균을 뺀다.",
    "question": {
      "givens": "앞 8명 예제와 별개인 가상 분할 평가다. 계산 편의를 위해 부모 H=1, 분할 A의 가중 자식 H=0.8, B는 0.3으로 주었다.",
      "stem": "정보이득이 큰 분할과 그 이득은?",
      "choices": [
        "A, 0.8",
        "A, 0.2",
        "B, 0.3",
        "B, 0.7"
      ],
      "answer": 4,
      "reason": "정보이득은 1−가중 자식 H다. A는 0.2, B는 0.7이므로 B다.",
      "wrong_reasons": [
        "1번: 남은 불순도 0.8을 이득으로 읽었다.",
        "2번: A의 이득은 맞지만 B보다 작다.",
        "3번: B에 남은 불순도이며 줄어든 양이 아니다."
      ]
    },
    "goal": "자식의 실제 도수를 바꿔 부모·가중 자식·정보이득을 함께 다시 계산한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Decision Trees",
        "url": "https://scikit-learn.org/stable/modules/tree.html"
      }
    ],
    "featured": true,
    "featuredOrder": 9,
    "shortTitle": "트리의 정보이득"
  },
  {
    "code": "3-08",
    "subject": 3,
    "title": "분류 트리와 회귀 트리의 잎을 구별한다",
    "lead": "정답의 자료형과 손실을 알면 잎의 예측값이 정해진다.",
    "cue": "수치 잎은 손실을 확인한다: 제곱은 평균.",
    "question": {
      "givens": "회귀 트리의 한 잎에 반응값 2·4·6이 있다. 제곱오차 기준이다.",
      "stem": "이 잎의 예측값과 제곱오차 합은?",
      "choices": [
        "4, 8",
        "4, 0",
        "2, 8",
        "6, 20"
      ],
      "answer": 1,
      "reason": "평균 (2+4+6)/3=4이고, (2−4)²+(4−4)²+(6−4)²=8이다.",
      "wrong_reasons": [
        "2번: 평균을 예측해도 서로 다른 실제 값의 잔차가 모두 0이 되지는 않는다.",
        "3번: 최소제곱 잎 예측은 최소값 2가 아니라 평균이다.",
        "4번: 6에서의 제곱오차는 20이지만 기준을 최소화하지 못한다."
      ]
    },
    "goal": "극단값을 넣고 손실을 바꿔 평균과 중앙값의 차이를 본다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-05"
    ],
    "sources": [
      {
        "title": "scikit-learn Decision Trees",
        "url": "https://scikit-learn.org/stable/modules/tree.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-09",
    "subject": 3,
    "title": "순전파는 층마다 값을 넘긴다",
    "lead": "가중합을 모두 구한 뒤 지정된 활성화를 적용한다.",
    "cue": "가중합 뒤 활성화, 그 출력이 다음 입력.",
    "question": {
      "givens": "x=(2,1). h₁=ReLU(x₁+x₂−1), h₂=ReLU(x₁−x₂), y=h₁+2h₂.",
      "stem": "출력 y는?",
      "choices": [
        "1",
        "2",
        "3",
        "4"
      ],
      "answer": 4,
      "reason": "h₁=2, h₂=1이고 y=2+2×1=4다.",
      "wrong_reasons": [
        "1번: h₂ 한 뉴런의 출력일 뿐 최종 출력이 아니다.",
        "2번: h₁만 계산하고 h₂ 경로를 빠뜨렸다.",
        "3번: h₁+h₂를 사용해 두 번째 출력 가중치 2를 누락했다."
      ]
    },
    "goal": "입력 값을 바꾸며 ReLU의 차단과 출력 가중치를 확인한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-11",
      "3-12"
    ],
    "sources": [
      {
        "title": "Stanford CS231n Neural Networks 1",
        "url": "https://cs231n.github.io/neural-networks-1/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-10",
    "subject": 3,
    "title": "XOR는 비선형 표현이 필요한 이유를 보여 준다",
    "lead": "층 수만 늘려도 모든 활성화가 선형이면 한 선형식으로 합쳐진다.",
    "cue": "깊이보다 먼저 중간의 비선형을 확인한다.",
    "question": {
      "givens": "XOR 네 점을 분류한다. 은닉층과 출력층이 모두 아핀 연산이며 비선형 활성화가 없다.",
      "stem": "층을 더 쌓으면 직선 한계를 없앨 수 있는가?",
      "choices": [
        "항상 가능하다",
        "입력 표본 수만 늘면 가능하다",
        "합성이 다시 아핀식이므로 이 구성만으로는 어렵다",
        "편향을 없애면 반드시 가능하다"
      ],
      "answer": 3,
      "reason": "아핀 함수의 합성은 아핀 함수다. 직선 하나로 분리할 수 없는 XOR를 이 구조만으로 완전 분류할 수 없다.",
      "wrong_reasons": [
        "1번: 깊이와 비선형 표현을 같은 것으로 보았다.",
        "2번: 표본 수가 함수족의 선형성을 바꾸지는 않는다.",
        "4번: 편향 제거는 표현을 더 제한하며 XOR 해결을 보장하지 않는다."
      ]
    },
    "goal": "같은 고정 가중치에서 중간 비선형을 제거했을 때 XOR 네 점 결과를 비교한다.",
    "kind": "decision",
    "relatedCodes": [
      "3-09",
      "3-11"
    ],
    "sources": [
      {
        "title": "Stanford CS231n Neural Networks 1",
        "url": "https://cs231n.github.io/neural-networks-1/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-11",
    "subject": 3,
    "title": "활성화 함수의 값과 범위를 따로 본다",
    "lead": "출력이 0이 될 수 있는지, 음수가 가능한지, 상한이 있는지 비교한다.",
    "cue": "시그모이드는 반, 나머지 둘은 원점에서 영.",
    "question": {
      "givens": "입력 z=0. 순서는 sigmoid, tanh, ReLU다.",
      "stem": "세 함수값의 순서는?",
      "choices": [
        "(0,0,0)",
        "(0.5,0,0)",
        "(1,0,1)",
        "(0.5,0.5,0.5)"
      ],
      "answer": 2,
      "reason": "sigmoid(0)=1/(1+1)=0.5, tanh(0)=0, ReLU(0)=0이다.",
      "wrong_reasons": [
        "1번: sigmoid가 원점에서 0.5라는 점을 놓쳤다.",
        "3번: 함수값을 이진 레이블처럼 취급했다.",
        "4번: 서로 다른 세 함수에 sigmoid의 값을 모두 적용했다."
      ]
    },
    "goal": "입력 부호와 함수 선택을 바꿔 값·상한을 비교한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-09",
      "3-13"
    ],
    "sources": [
      {
        "title": "Stanford CS231n Neural Networks 1",
        "url": "https://cs231n.github.io/neural-networks-1/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-12",
    "subject": 3,
    "title": "역전파와 갱신은 서로 다른 단계다",
    "lead": "기울기를 구했다는 사실만으로 가중치가 바뀌지는 않는다.",
    "cue": "역전파는 기울기, 갱신은 새 가중치.",
    "question": {
      "givens": "ŷ=wx, L=(ŷ−t)²/2. x=2, t=0, w=1. 학습률 0.1로 한 번 갱신한다.",
      "stem": "갱신 뒤 w는?",
      "choices": [
        "0.6",
        "1.0",
        "1.4",
        "4.0"
      ],
      "answer": 1,
      "reason": "∂L/∂w=(wx−t)x=4다. 따라서 1−0.1×4=0.6이다.",
      "wrong_reasons": [
        "2번: 갱신을 하지 않고 기울기만 구했을 때의 w다.",
        "3번: 손실을 줄이는 음의 기울기 방향 대신 더했다.",
        "4번: 기울기 4를 새 가중치로 착각했다."
      ]
    },
    "goal": "역전파만 수행하는 상태와 갱신까지 수행하는 상태를 분리한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-09",
      "3-13"
    ],
    "sources": [
      {
        "title": "PyTorch Automatic Differentiation",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-13",
    "subject": 3,
    "title": "기울기의 반복 곱은 작아지거나 커질 수 있다",
    "lead": "클리핑이 막는 것은 큰 기울기이며 사라진 신호를 복원하는 장치는 아니다.",
    "cue": "노름 클리핑은 큰 길이만 줄인다.",
    "question": {
      "givens": "기울기 g=(6,8), L2 노름 10. 노름 문턱 5로 방향을 유지해 클리핑한다.",
      "stem": "클리핑 뒤 기울기는?",
      "choices": [
        "(5,5)",
        "(6,8)",
        "(3,4)",
        "(0,0)"
      ],
      "answer": 3,
      "reason": "노름 비율 5/10=0.5를 두 좌표에 곱하면 (3,4)다.",
      "wrong_reasons": [
        "1번: 좌표별 값 클리핑과 노름 클리핑을 혼동했다.",
        "2번: 원래 노름이 문턱 5를 초과하므로 조정이 필요하다.",
        "4번: 길이를 제한하는 것이지 기울기를 지우는 것은 아니다."
      ]
    },
    "goal": "문턱보다 큰 기울기만 줄이고 작은 기울기는 유지되는지 확인한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-12"
    ],
    "sources": [
      {
        "title": "Pascanu et al., 2013",
        "url": "https://proceedings.mlr.press/v28/pascanu13.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-14",
    "subject": 3,
    "title": "서포트벡터는 경계에 가까운 제약을 만든다",
    "lead": "하드 마진의 간단한 선형 예제로 경계와 두 지지선을 분리한다.",
    "cue": "하드 마진은 가장 가까운 양쪽 점을 본다.",
    "question": {
      "givens": "1차원 하드 마진. 음성은 −3·−1, 양성은 1·3. 경계 x=0.",
      "stem": "서포트벡터 좌표 쌍은?",
      "choices": [
        "−1과 1",
        "−3과 3",
        "−3과 −1",
        "1과 3"
      ],
      "answer": 1,
      "reason": "두 클래스에서 경계에 가장 가까운 −1과 1이 여유 없는 제약을 만든다.",
      "wrong_reasons": [
        "2번: 가장 먼 두 점을 골랐다.",
        "3번: 한 클래스만 골라 양쪽 마진을 제한하는 점을 놓쳤다.",
        "4번: 양성 클래스만 골랐다."
      ]
    },
    "goal": "좌표 단위를 바꾸면서 정규화된 w와 기하 마진을 함께 바꾼다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Support Vector Machines",
        "url": "https://scikit-learn.org/stable/modules/svm.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-15",
    "subject": 3,
    "title": "커널과 C는 서로 다른 부분을 바꾼다",
    "lead": "특징 공간의 내적과 마진 위반 벌점의 비중을 구별한다.",
    "cue": "커널은 내적, C는 위반의 가격.",
    "question": {
      "givens": "목적식 ½‖w‖²+CΣξ. A=(1,2), B=(3,0)는 두 항의 값이다. C=2.",
      "stem": "두 후보 중 목적값이 작은 쪽은?",
      "choices": [
        "A, 목적값 1",
        "A, 목적값 2",
        "B, 목적값 0",
        "B, 목적값 3"
      ],
      "answer": 4,
      "reason": "A는 1+2×2=5, B는 3+2×0=3이다. 두 후보 중 B의 목적값이 더 작다.",
      "wrong_reasons": [
        "1번: A의 위반 벌점 항을 무시했다.",
        "2번: C와 두 항을 제시된 목적식대로 결합하지 않았다.",
        "3번: B의 위반량이 0이라는 이유로 가중치 노름 항까지 지웠다."
      ]
    },
    "goal": "C를 바꾸며 같은 두 후보의 목적값 우열이 뒤집히는 지점을 찾는다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Support Vector Machines",
        "url": "https://scikit-learn.org/stable/modules/svm.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-16",
    "subject": 3,
    "title": "연관규칙의 분모를 바꾸면 질문도 바뀐다",
    "lead": "전체 거래·선행 품목 거래·후행 품목 기본 비율을 순서대로 구별한다.",
    "cue": "신뢰도 분모는 화살표 앞, 향상도는 기본 비율 비교.",
    "question": {
      "givens": "거래 40장, A 10장, B 20장, 동시 8장. 결측은 없다.",
      "stem": "A→B 향상도는?",
      "choices": [
        "0.2",
        "0.8",
        "1.6",
        "2.0"
      ],
      "answer": 3,
      "reason": "신뢰도 8/10=0.8을 B의 기본 지지도 20/40=0.5로 나누면 1.6이다.",
      "wrong_reasons": [
        "1번: 동시 지지도다.",
        "2번: A→B 신뢰도이며 기본 비율과 비교하기 전이다.",
        "4번: 신뢰도 계산에 동시 거래 수 8을 반영하지 않았다."
      ]
    },
    "goal": "방향을 바꿔 신뢰도의 분모가 달라져도 향상도는 같은지 확인한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "mlxtend Association rules",
        "url": "https://rasbt.github.io/mlxtend/user_guide/frequent_patterns/association_rules/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-20",
    "subject": 3,
    "title": "K-means의 중심과 DBSCAN의 이웃을 구별한다",
    "lead": "군집 수를 정하는 방식과 잡음을 남기는 방식을 비교한다.",
    "cue": "평균 중심인가, 반경 안 이웃 수인가.",
    "question": {
      "givens": "좌표 0·0.1·0.2·2. DBSCAN eps=0.11, min_samples=3, 자기 자신 포함.",
      "stem": "잡음으로 남는 좌표는?",
      "choices": [
        "2만",
        "0과 0.2",
        "모든 점",
        "없다"
      ],
      "answer": 1,
      "reason": "앞의 세 점은 핵심점 0.1을 통해 한 군집이다. 멀리 있는 2는 핵심점과 연결되지 않는다.",
      "wrong_reasons": [
        "2번: 경계점을 잡음과 혼동했다.",
        "3번: 0.1 주변에 자기 포함 세 점이 있다는 사실을 놓쳤다.",
        "4번: 떨어진 2는 핵심점이거나 핵심점 이웃이라는 조건을 만족하지 못한다."
      ]
    },
    "goal": "이웃 반경과 최소 수를 직접 바꿔 핵심·경계·잡음을 다시 분류한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Clustering",
        "url": "https://scikit-learn.org/stable/modules/clustering.html"
      },
      {
        "title": "scikit-learn DBSCAN",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-21",
    "subject": 3,
    "title": "고윳값은 축의 분산 몫을 보여 준다",
    "lead": "단일 축의 비율과 누적 비율을 구별해 남길 개수를 정한다.",
    "cue": "한 축은 나누고, 남길 개수는 누적한다.",
    "question": {
      "givens": "PCA 고윳값 6·3·1. 누적 설명분산비 80% 이상을 만족하는 최소 개수를 고른다.",
      "stem": "남길 주성분 수는?",
      "choices": [
        "1개",
        "2개",
        "3개",
        "6개"
      ],
      "answer": 2,
      "reason": "첫 축은 6/10=60%, 첫 두 축은 9/10=90%이므로 최소 2개다.",
      "wrong_reasons": [
        "1번: 60%라서 기준 80%에 미달한다.",
        "3번: 기준은 만족하지만 최소 개수가 아니다.",
        "4번: 고윳값 6을 주성분 개수로 읽었다."
      ]
    },
    "goal": "누적 기준을 바꾸며 필요한 최소 축 수가 바뀌는 지점을 찾는다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Decomposition",
        "url": "https://scikit-learn.org/stable/modules/decomposition.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-22",
    "subject": 3,
    "title": "교차표는 관측빈도를 독립 기대빈도와 비교한다",
    "lead": "행의 합과 열의 합을 이용해 독립일 때의 기준을 만든다.",
    "cue": "기대 셀은 행 합 곱하기 열 합, 전체로 나누기.",
    "question": {
      "givens": "교차표에서 A행 합 20, 구매열 합 20, 전체 40명이다.",
      "stem": "독립 가정 아래 A·구매 셀 기대빈도는?",
      "choices": [
        "5",
        "8",
        "10",
        "20"
      ],
      "answer": 3,
      "reason": "행 합과 열 합을 곱해 전체 수로 나눈다. 20×20/40=10이다.",
      "wrong_reasons": [
        "1번: 행·열의 비율을 인원수로 바꾸는 계산이 맞지 않는다.",
        "2번: 예제의 다른 셀 관측빈도이며 독립 기대빈도가 아니다.",
        "4번: 주변합 자체이며 셀 기대빈도가 아니다."
      ]
    },
    "goal": "주변합을 고정하고 관측 도수 차이를 바꿔 Pearson χ²가 달라짐을 확인한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "SciPy chi2_contingency",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chi2_contingency.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-23",
    "subject": 3,
    "title": "MANOVA는 여러 반응의 평균벡터를 비교한다",
    "lead": "반응변수 수와 집단 수를 먼저 구분한다.",
    "cue": "여러 반응을 묶은 집단 평균벡터.",
    "question": {
      "givens": "서로 독립인 세 교육 집단에서 각 사람의 시간·점수 두 수치 반응을 함께 측정했다. 일원 MANOVA를 검토한다.",
      "stem": "기본 귀무가설은?",
      "choices": [
        "모든 관측값이 같다",
        "두 반응의 상관계수가 0이다",
        "각 집단의 표본 수가 같다",
        "세 집단의 모평균벡터가 같다"
      ],
      "answer": 4,
      "reason": "집단별 두 반응의 모평균을 묶은 벡터가 모두 같다는 가설이다.",
      "wrong_reasons": [
        "1번: 평균이 같다는 것과 모든 관측이 같다는 것은 다르다.",
        "2번: 반응 사이 무상관 검정이 아니다.",
        "3번: 동일 표본 수는 여기서 검정하려는 효과 가설이 아니다."
      ]
    },
    "goal": "반응 수와 독립·반복측정 설계에 따라 기본 질문을 구별한다.",
    "kind": "decision",
    "relatedCodes": [
      "3-24"
    ],
    "sources": [
      {
        "title": "Penn State STAT 505 MANOVA",
        "url": "https://online.stat.psu.edu/stat505/Lesson08"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-24",
    "subject": 3,
    "title": "정준상관은 두 묶음에서 점수를 하나씩 만든다",
    "lead": "한 쌍의 원래 변수보다 두 변수 집합의 선형결합을 비교한다.",
    "cue": "두 묶음, 두 선형결합, 그 사이 상관.",
    "question": {
      "givens": "여러 사람 각각에게서 시험 두 과목과 직무지표 세 개를 함께 관측해 두 변수 묶음의 선형 관계를 탐색한다.",
      "stem": "CCA가 직접 비교하는 것은?",
      "choices": [
        "각 묶음에서 만든 선형결합 점수",
        "모든 원래 값의 합 하나",
        "집단별 수치 반응의 평균벡터",
        "정답 레이블의 다수결"
      ],
      "answer": 1,
      "reason": "두 변수 집합에서 선형결합을 하나씩 만들고 그 점수 사이 상관을 다룬다.",
      "wrong_reasons": [
        "2번: 두 묶음의 구분과 가중치를 모두 잃는다.",
        "3번: 집단 간 평균벡터 비교는 MANOVA의 질문이다.",
        "4번: 여러 분류기의 예측을 투표로 합치는 문제가 아니다."
      ]
    },
    "goal": "미리 정한 두 선형결합의 값을 바꾸되 이것이 CCA 적합은 아님을 확인한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-23",
      "3-21"
    ],
    "sources": [
      {
        "title": "scikit-learn Cross decomposition",
        "url": "https://scikit-learn.org/stable/modules/cross_decomposition.html"
      },
      {
        "title": "scikit-learn CCA",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.cross_decomposition.CCA.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-25",
    "subject": 3,
    "title": "ARIMA의 MA는 과거 관측의 단순 평균이 아니다",
    "lead": "자기회귀·차분·과거 오차의 세 역할을 식에서 찾는다.",
    "cue": "AR은 과거 값, I는 차분, MA는 과거 오차.",
    "question": {
      "givens": "모형 wₜ=0.5wₜ₋₁+εₜ+0.2εₜ₋₁. w=Δy, 과거 w=4·ε=1, 다음 ε의 조건부 기대 0.",
      "stem": "다음 차분의 조건부 예측은?",
      "choices": [
        "0.2",
        "2.0",
        "2.2",
        "4.2"
      ],
      "answer": 3,
      "reason": "AR 기여 2와 MA 기여 0.2를 더한다. 예측 대상이 원수준이 아니라 차분이라는 조건도 유지한다.",
      "wrong_reasons": [
        "1번: AR 항을 누락했다.",
        "2번: 주어진 과거 혁신 오차의 MA 항을 누락했다.",
        "4번: AR 계수 0.5를 적용하지 않았다."
      ]
    },
    "goal": "차분 예측과 원수준 복원을 선택해 같은 수치를 다르게 해석한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "statsmodels ARIMA",
        "url": "https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-27",
    "subject": 3,
    "title": "슬라이딩 윈도우는 예측 시점을 고정해 만든다",
    "lead": "입력의 끝과 정답의 시점을 별도로 적는다.",
    "cue": "창 끝 t, 정답은 t+h.",
    "question": {
      "givens": "시간순 관측 5개. 창 길이 3, 한 시점 앞을 예측하고 창을 1칸씩 이동한다.",
      "stem": "만들 수 있는 완전한 입력·정답 쌍은?",
      "choices": [
        "1개",
        "2개",
        "3개",
        "5개"
      ],
      "answer": 2,
      "reason": "n−L−h+1=5−3−1+1=2다. 마지막 창 뒤의 정답까지 있어야 쌍을 셀 수 있다.",
      "wrong_reasons": [
        "1번: 한 창만 만들고 다음 가능한 창을 누락했다.",
        "3번: 정답이 없는 마지막 입력 창까지 셌다.",
        "4번: 각 시점을 창 하나로 셌으며 앞뒤에 필요한 관측을 고려하지 않았다."
      ]
    },
    "goal": "창 길이와 예측 수평을 바꿔 완전한 입력·정답 쌍을 센다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn TimeSeriesSplit",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-28",
    "subject": 3,
    "title": "베이즈는 관찰 뒤 분모를 다시 정한다",
    "lead": "사전 규모에 가능도를 곱하고 관찰된 전체 안에서 정규화한다.",
    "cue": "사전 곱하기 가능도, 관찰된 전체로 나누기.",
    "question": {
      "givens": "A형 25%·B형 75%. 경고 확률은 A에서 20%, B에서 4%다. 두 유형이 전체다.",
      "stem": "경고를 보았을 때 A형일 확률은?",
      "choices": [
        "20%",
        "25%",
        "50%",
        "62.5%"
      ],
      "answer": 4,
      "reason": "관찰의 전체 확률은 0.25×0.20+0.75×0.04=0.08이다. A와 경고가 함께인 확률 0.05를 나누면 62.5%다.",
      "wrong_reasons": [
        "1번: P(경고|A)를 P(A|경고)와 뒤바꾸었다.",
        "2번: 관찰 전의 사전확률을 그대로 사용했다.",
        "3번: 두 가능도에 사전 규모가 다르다는 조건을 반영하지 않았다."
      ]
    },
    "goal": "사전 비율을 바꿔 같은 가능도의 사후확률을 다시 정규화한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-29",
      "3-38"
    ],
    "sources": [
      {
        "title": "scikit-learn Naive Bayes",
        "url": "https://scikit-learn.org/stable/modules/naive_bayes.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-29",
    "subject": 3,
    "title": "나이브 베이즈는 클래스 안에서 곱으로 나눈다",
    "lead": "특성의 무조건 독립이 아니라 클래스 조건을 붙인 독립 가정이다.",
    "cue": "클래스를 고정한 뒤, 특성 가능도를 곱한다.",
    "question": {
      "givens": "사전 A/B 각 0.5. 두 관찰 특성의 가능도는 A=(0.8,0.5), B=(0.4,0.5). 조건부 독립을 가정한다.",
      "stem": "A의 비정규화 점수는?",
      "choices": [
        "0.20",
        "0.40",
        "0.65",
        "0.80"
      ],
      "answer": 1,
      "reason": "사전까지 곱해 0.5×0.8×0.5=0.20이다.",
      "wrong_reasons": [
        "2번: 두 가능도만 곱하고 사전 0.5를 빠뜨렸다.",
        "3번: 제시된 곱셈 모형 대신 확률을 임의로 더하거나 평균했다.",
        "4번: 첫 특성 가능도만 사용했다."
      ]
    },
    "goal": "사전 또는 특성 가능도를 바꾸어 점수와 사후확률을 분리한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-28"
    ],
    "sources": [
      {
        "title": "scikit-learn Naive Bayes",
        "url": "https://scikit-learn.org/stable/modules/naive_bayes.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-30",
    "subject": 3,
    "title": "배깅은 표본을 바꾸고 부스팅은 순서대로 보완한다",
    "lead": "여러 모형을 쓴다는 공통점 뒤에 학습 자료와 이전 단계 의존성의 차이가 있다.",
    "cue": "배깅은 표본의 변화, 부스팅은 앞 단계의 보완.",
    "question": {
      "givens": "기울기 부스팅에서 F₀=(2,2), h=(1,3), 학습률 0.5. F₁=F₀+0.5h.",
      "stem": "새 예측 F₁은?",
      "choices": [
        "(1,3)",
        "(2.5,3.5)",
        "(3,5)",
        "(4,4)"
      ],
      "answer": 2,
      "reason": "현재 예측에 보정의 절반을 더한다. 2+0.5×1=2.5, 2+0.5×3=3.5다.",
      "wrong_reasons": [
        "1번: 보정값만 출력하고 기존 예측을 버렸다.",
        "3번: 학습률 1로 더한 결과다.",
        "4번: 두 관측의 서로 다른 보정을 구분하지 않았다."
      ]
    },
    "goal": "새 보정의 기여를 바꾸되 기존 예측에 더한다는 구조를 유지한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Ensembles",
        "url": "https://scikit-learn.org/stable/modules/ensemble.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-31",
    "subject": 3,
    "title": "랜덤포레스트의 무작위성은 두 곳에 있다",
    "lead": "훈련 행을 뽑는 일과 노드에서 분할 후보 특성을 뽑는 일을 나눈다.",
    "cue": "행은 나무별로, 후보 열은 노드별로.",
    "question": {
      "givens": "랜덤포레스트의 노드별 분할 후보 특성을 무작위로 선택하는 설정을 생각한다.",
      "stem": "올바른 설명은?",
      "choices": [
        "정답 레이블을 무작위로 바꾼다",
        "한 나무는 처음 고른 특성만 계속 쓴다",
        "노드마다 후보 특성 집합이 달라질 수 있다",
        "특성 선택이 부트스트랩 행 추출과 같은 일이다"
      ],
      "answer": 3,
      "reason": "노드의 분할을 검토할 때 후보 특성의 부분집합을 선택하므로 서로 다른 노드에서 후보가 달라질 수 있다.",
      "wrong_reasons": [
        "1번: 분류 정답을 섞는 것은 이 학습 절차의 설명이 아니다.",
        "2번: 노드별 후보 선택을 나무 전체의 고정 특성 선택으로 바꾸었다.",
        "4번: 행과 열이라는 서로 다른 대상을 혼동했다."
      ]
    },
    "goal": "노드 후보 특성 수를 바꿔 가능한 부분집합 수와 무작위화의 범위를 비교한다.",
    "kind": "decision",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn RandomForestClassifier",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-32",
    "subject": 3,
    "title": "투표와 메타학습의 입력은 다르다",
    "lead": "레이블을 세는지 확률을 평균하는지, 예측을 다시 학습하는지 확인한다.",
    "cue": "레이블은 표 수, 소프트는 확률 평균.",
    "question": {
      "givens": "클래스 1 확률 0.51·0.51·0.01. 동등 가중치, 모든 문턱 0.5.",
      "stem": "하드·소프트 보팅의 범주 순서는?",
      "choices": [
        "(1,0)",
        "(1,1)",
        "(0,1)",
        "(0,0)"
      ],
      "answer": 1,
      "reason": "개별 범주는 1,1,0이므로 하드는 1이다. 평균은 1.03/3≈0.343이므로 소프트는 0이다.",
      "wrong_reasons": [
        "2번: 확률 평균을 계산하지 않고 다수 레이블을 두 번 사용했다.",
        "3번: 두 결합 방식의 결과를 서로 바꾸었다.",
        "4번: 하드 보팅에서 1이 두 표라는 사실을 놓쳤다."
      ]
    },
    "goal": "같은 다수표여도 확률 평균이 다른 결론을 낼 수 있음을 확인한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Ensembles",
        "url": "https://scikit-learn.org/stable/modules/ensemble.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-33",
    "subject": 3,
    "title": "TF는 문서 안을, IDF는 문서 전체를 본다",
    "lead": "단어가 나온 횟수와 그 단어를 포함한 문서 수를 구별한다.",
    "cue": "TF는 한 문서, DF는 문서 수. 수식도 적는다.",
    "question": {
      "givens": "IDF=ln(N/DF), TF는 원시 빈도, 정규화 없음. N=4, DF=2, 해당 문서 TF=2.",
      "stem": "TF-IDF는?",
      "choices": [
        "0",
        "ln2",
        "2ln2",
        "4ln2"
      ],
      "answer": 3,
      "reason": "IDF는 ln2이고 TF 2를 곱하므로 2ln2다.",
      "wrong_reasons": [
        "1번: 단어가 모든 문서에 있는 조건 N=DF가 아니다.",
        "2번: IDF만 구하고 TF 2를 곱하지 않았다.",
        "4번: TF 또는 문서 수를 중복으로 곱했다."
      ]
    },
    "goal": "DF와 명시적 IDF 수식을 바꿔 같은 TF의 가중치를 비교한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "scikit-learn Feature extraction",
        "url": "https://scikit-learn.org/stable/modules/feature_extraction.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-34",
    "subject": 3,
    "title": "CBOW와 Skip-gram은 예측 화살표가 반대다",
    "lead": "주변 문맥을 넣는지 중심 단어를 넣는지 먼저 그린다.",
    "cue": "CBOW는 문맥에서 중심, Skip-gram은 반대.",
    "question": {
      "givens": "[새벽,기차,출발]의 중심은 기차. 반경 1의 주변 단어로 중심을 예측한다.",
      "stem": "해당 학습 방향은?",
      "choices": [
        "CBOW: 문맥→기차",
        "Skip-gram: 문맥→기차",
        "PCA: 문맥→기차",
        "CCA: 문맥→기차"
      ],
      "answer": 1,
      "reason": "주변 문맥을 입력으로 중심 단어를 예측하는 방향은 CBOW다.",
      "wrong_reasons": [
        "2번: Skip-gram은 중심에서 주변을 예측하는 반대 방향이다.",
        "3번: PCA는 이러한 중심 단어 예측 과제를 정의하는 이름이 아니다.",
        "4번: CCA는 두 변수 묶음의 선형결합 상관을 다루는 기법이다."
      ]
    },
    "goal": "예측 방향과 중심 위치를 바꾸어 문맥·목표를 직접 만든다.",
    "kind": "decision",
    "relatedCodes": [],
    "sources": [
      {
        "title": "Mikolov et al., 2013",
        "url": "https://arxiv.org/html/1301.3781v3"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-35",
    "subject": 3,
    "title": "RNN은 이전 상태를 받아 다음 상태를 만든다",
    "lead": "입력 순서와 상태 전달을 함께 보면 seq2seq의 역할도 구별된다.",
    "cue": "현재 입력과 이전 상태를 한 줄에 놓는다.",
    "question": {
      "givens": "hₜ=0.5hₜ₋₁+xₜ, h₀=0. 입력은 x₁=2, x₂=0이다.",
      "stem": "마지막 상태 h₂는?",
      "choices": [
        "0",
        "1",
        "2",
        "3"
      ],
      "answer": 2,
      "reason": "h₁=0.5×0+2=2, h₂=0.5×2+0=1이다.",
      "wrong_reasons": [
        "1번: 마지막 입력만 사용하고 이전 상태를 버렸다.",
        "3번: 이전 상태에 적용하는 0.5를 빠뜨렸다.",
        "4번: 제시된 순환식으로 얻을 수 없는 값이다."
      ]
    },
    "goal": "순서와 상태 계수를 바꿔 마지막 상태가 받는 영향을 본다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "Attention Is All You Need",
        "url": "https://arxiv.org/html/1706.03762v7"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-36",
    "subject": 3,
    "title": "Attention은 가중치를 구해 Value를 합친다",
    "lead": "Query·Key가 정한 비중과 실제로 집계되는 Value를 구별한다.",
    "cue": "Q와 K로 비중, V를 가중합.",
    "question": {
      "givens": "Attention 가중치 (0.25,0.75), Value (2,6). 출력은 Value의 가중합이다.",
      "stem": "출력값은?",
      "choices": [
        "2",
        "4",
        "6",
        "5"
      ],
      "answer": 4,
      "reason": "0.25×2+0.75×6=0.5+4.5=5다.",
      "wrong_reasons": [
        "1번: 첫 Value만 선택했다.",
        "2번: 가중치를 무시하고 단순 평균을 냈다.",
        "3번: 가장 큰 가중치의 Value만 선택했다."
      ]
    },
    "goal": "합이1인 두 비중을 바꾸며 Value 가중합의 이동을 본다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-35"
    ],
    "sources": [
      {
        "title": "Vaswani et al., Attention Is All You Need",
        "url": "https://arxiv.org/html/1706.03762v7"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-37",
    "subject": 3,
    "title": "오토인코더는 입력을 복원하는 표현을 배운다",
    "lead": "범주 라벨이 없어도 학습 목표가 없는 것은 아니다.",
    "cue": "라벨 대신 입력 복원, 오차와 고장은 구별.",
    "question": {
      "givens": "x=(2,4), 복원 x̂=(1,5). 손실은 두 좌표의 평균제곱오차다.",
      "stem": "복원 MSE는?",
      "choices": [
        "0",
        "1",
        "2",
        "4"
      ],
      "answer": 2,
      "reason": "좌표별 차이 1과 −1을 제곱해 합한 2를 좌표 수 2로 나누면 1이다.",
      "wrong_reasons": [
        "1번: 부호가 있는 오차를 그대로 더했다.",
        "3번: 제곱합 2를 평균으로 나누지 않았다.",
        "4번: 손실 정의에 없는 추가 제곱을 했다."
      ]
    },
    "goal": "복원 두 좌표를 직접 바꿔 부호 상쇄와 평균제곱오차를 비교한다.",
    "kind": "calculation",
    "relatedCodes": [],
    "sources": [
      {
        "title": "TensorFlow Intro to Autoencoders",
        "url": "https://www.tensorflow.org/tutorials/generative/autoencoder"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "3-38",
    "subject": 3,
    "title": "HMM은 상태의 이동과 관측의 발생을 나눈다",
    "lead": "안 보이는 상태를 센서 값과 같은 것으로 취급하지 않는다.",
    "cue": "전이는 상태에서 상태, 방출은 상태에서 관측.",
    "question": {
      "givens": "장비의 내부 상태는 정상·마모, 센서는 낮음·높음이다.",
      "stem": "전이확률이 설명하는 것은?",
      "choices": [
        "상태가 주어졌을 때 센서값의 확률",
        "현재 상태에서 다음 상태로 갈 확률",
        "첫 상태의 확률만",
        "관측 뒤 특정 상태일 확률"
      ],
      "answer": 2,
      "reason": "전이는 숨은 상태 사이의 이동이다. 관측값이 나올 조건부 확률은 방출이다.",
      "wrong_reasons": [
        "1번: 방출확률의 역할이다.",
        "3번: 초기분포의 역할이다.",
        "4번: 관측을 조건으로 한 사후 상태 추론과 다르다."
      ]
    },
    "goal": "한 경로의 전이확률을 바꿔 지정 경로·관측의 결합확률을 계산한다.",
    "kind": "calculation",
    "relatedCodes": [
      "3-28"
    ],
    "sources": [
      {
        "title": "hmmlearn Tutorial",
        "url": "https://hmmlearn.readthedocs.io/en/latest/tutorial.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-01",
    "subject": 4,
    "title": "포아송 적합도 자유도는 모수를 어디에서 구했는지부터 본다",
    "lead": "최종 범주 수가 같아도 포아송 모수 λ를 외부에서 고정했는지, 같은 범주도수로 추정했는지에 따라 적합도 검정의 기준 분포가 달라진다. ‘포아송이므로 하나 뺀다’보다 추정한 정보의 수를 먼저 센다.",
    "cue": "최종 범주 − 합계 제약 − 같은 자료의 추정 모수.",
    "question": {
      "givens": "독립 표본을 최종 6개 범주로 나눴다. 기대도수는 충분하다. A는 λ를 외부에서 고정하고, B는 최종 범주 도수의 다항 우도로 λ 한 개를 정규적인 최대우도 추정한다.",
      "stem": "A와 B의 카이제곱 근사 자유도는 각각?",
      "choices": [
        "5와 4",
        "4와 5",
        "5와 5",
        "6과 5"
      ],
      "answer": 1,
      "reason": "A는 추정 모수가 없어 6−1=5, B는 같은 범주 도수에서 추정한 모수가 하나라 6−1−1=4다. 합계 제약과 모수 추정을 따로 센다.",
      "wrong_reasons": [
        "2번: 외부 고정 모수와 같은 자료에서 추정한 모수를 반대로 취급했다.",
        "3번: B에서 λ를 추정해 기대도수를 조정한 조건을 빠뜨렸다.",
        "4번: 고정된 총도수 때문에 생기는 합계 제약 한 개를 반영하지 않았다."
      ]
    },
    "goal": "최종 범주 수와 λ 추정 출처를 바꾸어 근사 자유도를 계산한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-02"
    ],
    "sources": [
      {
        "title": "SciPy chisquare",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html"
      },
      {
        "title": "NIST Chi-Square Goodness-of-Fit Test",
        "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-02",
    "subject": 4,
    "title": "구간을 합쳤다면 최종 도수표로 자유도를 다시 센다",
    "lead": "8구간으로 시작했더라도 검정을 6구간 도수표에서 수행한다면 범주 수는 6이다. 정규분포의 평균·표준편차를 그 최종 도수로 추정한 조건까지 함께 확인한다.",
    "cue": "처음 그린 칸 말고, 검정에 남은 칸을 센다.",
    "question": {
      "givens": "독립 표본의 정규 적합도 검정에서 8개 구간을 규칙에 따라 6개 구간으로 합쳤다. 최종 도수의 다항 우도로 μ·σ를 정규적인 최대우도 추정하며 기대도수는 충분하다.",
      "stem": "이 최종 검정의 카이제곱 근사 자유도는?",
      "choices": [
        "7",
        "5",
        "3",
        "1"
      ],
      "answer": 3,
      "reason": "최종 k=6에서 합계 제약 1개와 추정 모수 2개를 뺀다. 6−1−2=3이며 병합 전 8구간은 계산의 k가 아니다.",
      "wrong_reasons": [
        "1번: 7은 원래 8구간에서 합계 제약만 뺀 값이다. 병합과 모수 추정을 모두 놓쳤다.",
        "2번: 5는 최종 6구간에서 모수를 추정하지 않았을 때의 값이며, 병합 전 8−1−2와도 우연히 같다.",
        "4번: 구간 두 개를 합친 효과를 최종 k에 이미 반영하고도 다시 두 번 뺀 셈이다."
      ]
    },
    "goal": "최종 k와 외부 모수 고정 여부를 바꾸어 자유도를 다시 센다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-01"
    ],
    "sources": [
      {
        "title": "NIST Chi-Square Goodness-of-Fit Test",
        "url": "https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm"
      },
      {
        "title": "SciPy chisquare",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-03",
    "subject": 4,
    "title": "행을 고르는 작업과 표현을 다듬는 작업을 구분한다",
    "lead": "시각화 과정에서는 자료에 무엇을 남기는지와 남긴 자료를 어떻게 보이게 하는지를 구분한다. 색상을 바꾸었다고 자료가 걸러지는 것은 아니고, 행을 지웠다고 표현이 개선된 것도 아니다.",
    "cue": "행이 바뀌나, 보여주는 방식이 바뀌나.",
    "question": {
      "givens": "작업 A는 매출표에서 2025년 행만 남긴다. 작업 B는 그 결과의 막대와 값을 유지하고 글자 크기·색 대비만 다듬는다. 정적인 제작 단계의 역할을 비교한다.",
      "stem": "Ben Fry의 과정에서 A와 B에 해당하는 것은?",
      "choices": [
        "parse와 acquire",
        "filter와 refine",
        "refine과 filter",
        "mine과 interact"
      ],
      "answer": 2,
      "reason": "A는 분석 대상 행을 제한하는 filter, B는 기존 표현의 가독성을 다듬는 refine에 해당한다. 두 작업은 자료의 범위와 표현이라는 서로 다른 대상을 바꾼다.",
      "wrong_reasons": [
        "1번: 구조 해석과 자료 획득은 이미 주어진 표에서 관심 연도만 남기는 일과 다르다.",
        "3번: 자료 범위 제한과 표현 개선의 역할을 반대로 배치했다.",
        "4번: 통계적 패턴을 계산하거나 사용자 조작 기능을 추가한 작업은 제시하지 않았다."
      ]
    },
    "goal": "작업 전후에 바뀐 대상을 선택해 Ben Fry 단계와 연결한다.",
    "kind": "decision",
    "relatedCodes": [
      "4-27",
      "4-30"
    ],
    "sources": [
      {
        "title": "Ben Fry Computational Information Design",
        "url": "https://www.benfry.com/phd/dissertation/1.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-04",
    "subject": 4,
    "title": "정밀도와 재현율은 같은 분자를 다른 집합으로 나눈다",
    "lead": "정밀도와 재현율은 모두 맞게 찾은 양성 TP를 쓰지만 분모가 다르다. 양성=스팸이라는 기준을 고정하고, 예측한 스팸부터 모을지 실제 스팸부터 모을지 확인한다.",
    "cue": "정밀도는 예측한 것, 재현율은 실제인 것부터.",
    "question": {
      "givens": "양성은 스팸이다. TP=3, FP=1, FN=2, TN=4인 자체 메일 10통의 같은 판정 결과다.",
      "stem": "정밀도와 재현율은 각각 얼마인가?",
      "choices": [
        "60%와 75%",
        "75%와 60%",
        "70%와 60%",
        "75%와 70%"
      ],
      "answer": 2,
      "reason": "정밀도는 예측 양성 4통 중 3통인 75%, 재현율은 실제 양성 5통 중 3통인 60%다. 분모가 예측 집합인지 실제 집합인지 구별한다.",
      "wrong_reasons": [
        "1번: 실제 양성 분모와 예측 양성 분모를 바꾸어 사용했다.",
        "3번: 정밀도 자리에 전체 정답 비율인 정확도 70%를 넣었다.",
        "4번: 재현율 자리에 TN까지 포함한 정확도 70%를 넣었다."
      ]
    },
    "goal": "네 칸과 분모를 바꿔 정밀도·재현율의 차이를 직접 확인한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-06",
      "4-07"
    ],
    "sources": [
      {
        "title": "scikit-learn precision_score",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html"
      }
    ],
    "featured": true,
    "featuredOrder": 11,
    "shortTitle": "정밀도와 재현율"
  },
  {
    "code": "4-06",
    "subject": 4,
    "title": "희귀 양성에서는 정확도와 놓친 양성을 함께 본다",
    "lead": "양성이100개 중1개뿐이면 모두 음성으로 찍어도 정확도99%다. 높은 숫자가 양성을 찾았다는 뜻인지는 실제 양성의 결과와 오경보 비용을 함께 확인해야 한다.",
    "cue": "많이 맞힌 클래스와 꼭 찾아야 할 클래스를 나눈다.",
    "question": {
      "givens": "실제 양성 1건·음성 99건인 100건에서 모형 A가 전부 음성으로 예측했다. 양성 탐지가 평가 목적이다.",
      "stem": "A의 정확도와 양성 재현율은 각각?",
      "choices": [
        "99%와 0%",
        "99%와 99%",
        "100%와 0%",
        "1%와 100%"
      ],
      "answer": 1,
      "reason": "정상 99건을 맞혔으므로 정확도 99%지만 유일한 양성을 놓쳐 재현율은 0/1=0%다. 높은 정확도만으로 양성 탐지에 성공했다고 고를 수 없다.",
      "wrong_reasons": [
        "2번: 전체 정답 비율 99%를 양성 집합의 재현율로 그대로 옮겼다.",
        "3번: 놓친 양성 1건도 오답이므로 정확도 100%가 아니다.",
        "4번: 양성의 자료 비중 1%를 정확도로 오인했고 실제로는 양성을 찾지 못했다."
      ]
    },
    "goal": "같은 100건에서 양성 탐지와 오경보를 바꾸어 지표를 비교한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-04",
      "4-07"
    ],
    "sources": [
      {
        "title": "scikit-learn balanced_accuracy_score",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.balanced_accuracy_score.html"
      },
      {
        "title": "scikit-learn precision_score",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-07",
    "subject": 4,
    "title": "ROC의 한 점과 점수 순서를 요약한 AUC를 구분한다",
    "lead": "ROC는 임곗값을 바꾸며 실제 음성의 오경보율과 실제 양성의 탐지율을 함께 그린다. AUC는 한 번의 판정 정확도가 아니라 여러 임곗값을 거친 순위 정보를 요약한다.",
    "cue": "ROC는 판정 지점들, AUC는 그 점수의 순위.",
    "question": {
      "givens": "이진 평가 4건이다. 양성 점수는 0.9·0.6, 음성 점수는 0.8·0.2다. 높을수록 양성이며 동점은 없다.",
      "stem": "이 점수의 ROC-AUC는?",
      "choices": [
        "0.25",
        "0.50",
        "0.75",
        "1.00"
      ],
      "answer": 3,
      "reason": "양성 2개와 음성 2개의 4쌍을 비교하면 양성이 높은 쌍은 3개다. 0.75는 점수 순위의 요약이지 특정 임곗값에서 계산한 TPR이나 FPR이 아니다.",
      "wrong_reasons": [
        "1번: 잘못된 순서 1쌍의 비율을 양성이 앞서는 비율과 바꾸었다.",
        "2번: 올바른 쌍은 2개가 아니라 3개다. 0.5라는 임곗값과도 무관하다.",
        "4번: 양성 0.6은 음성 0.8보다 낮으므로 모든 쌍의 순서가 맞지 않는다."
      ]
    },
    "goal": "한 양성 점수와 판정 임곗값을 독립적으로 바꾸어 AUC와 ROC 점을 비교한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-04",
      "4-16"
    ],
    "sources": [
      {
        "title": "scikit-learn roc_auc_score",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_auc_score.html"
      },
      {
        "title": "scikit-learn Metrics and scoring",
        "url": "https://scikit-learn.org/stable/modules/model_evaluation.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-08",
    "subject": 4,
    "title": "같은 오차도 제곱하면 큰 오차의 영향이 커진다",
    "lead": "MAE는 오차의 절댓값을 평균하고 MSE는 제곱을 평균한다. RMSE는 MSE에 제곱근을 씌워 원래 단위로 돌아오지만 큰 오차를 강조한 계산 구조는 유지한다.",
    "cue": "제곱을 먼저 했는지, 평균을 먼저 했는지.",
    "question": {
      "givens": "평가 3건의 오차 e=y−ŷ는 −1·1·4이며 모든 관측의 가중치는 같다.",
      "stem": "이 예측의 MSE는?",
      "choices": [
        "2",
        "6",
        "√6",
        "18"
      ],
      "answer": 2,
      "reason": "오차를 먼저 제곱해 1·1·16을 만든 뒤 3으로 나누므로 MSE=18/3=6이다. 2는 MAE,√6은 RMSE,18은 제곱오차의 합이다.",
      "wrong_reasons": [
        "1번: 절대오차 평균 2를 구했으며 제곱오차 평균과 다르다.",
        "3번: MSE에 다시 제곱근을 씌운 RMSE다.",
        "4번: 세 관측의 제곱오차를 합한 뒤 평가 건수 3으로 나누지 않았다."
      ]
    },
    "goal": "세 오차에서 MAE·MSE·RMSE를 계산하고 큰 오차만 바꾼다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-25",
      "4-36"
    ],
    "sources": [
      {
        "title": "scikit-learn mean_squared_error",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.mean_squared_error.html"
      },
      {
        "title": "scikit-learn Metrics and scoring",
        "url": "https://scikit-learn.org/stable/modules/model_evaluation.html"
      }
    ],
    "featured": true,
    "featuredOrder": 10,
    "shortTitle": "수치 예측의 오차"
  },
  {
    "code": "4-14",
    "subject": 4,
    "title": "회귀계수의 t검정은 추정값을 불확실성과 함께 읽는다",
    "lead": "회귀계수가0.6이라는 크기와0인지 검정하는 판단은 다르다. 추정값이 표준오차에 비해 얼마나 큰지 계산하고, 귀무가설 아래 그 정도 통계량이 나올 가능성을 p값으로 읽는다.",
    "cue": "추정값만 보지 말고, 표준오차로 나눈다.",
    "question": {
      "givens": "고전적 선형회귀 조건과 잔차 자유도 10을 가정한다. 한 계수의 추정값은 0.6, 표준오차는 0.2다. H0: βj=0의 양측 검정이다.",
      "stem": "이 계수의 t 통계량은?",
      "choices": [
        "0.12",
        "0.4",
        "3",
        "6"
      ],
      "answer": 3,
      "reason": "(0.6−0)/0.2=3이다. 표준오차에 비해 추정값이 몇 배 떨어져 있는지 계산하며, p값은 이 통계량과 기준 자유도를 이용해 따로 구한다.",
      "wrong_reasons": [
        "1번: 추정값과 표준오차를 곱했다. t 통계량은 차이를 표준오차로 나눈다.",
        "2번: 0.6−0.2를 계산했으며 표준오차로 표준화하지 않았다.",
        "4번: 실제 표준오차 0.2 대신 0.1을 사용한 값이다."
      ]
    },
    "goal": "계수와 표준오차를 바꾸어 고정 T10 양측 기준과 비교한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-15",
      "4-33"
    ],
    "sources": [
      {
        "title": "statsmodels RegressionResults.tvalues",
        "url": "https://www.statsmodels.org/stable/generated/statsmodels.regression.linear_model.RegressionResults.tvalues.html"
      },
      {
        "title": "SciPy Student t distribution",
        "url": "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.t.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-15",
    "subject": 4,
    "title": "전체 F검정은 모든 기울기를 함께 묻는다",
    "lead": "회귀 ANOVA의 전체 F검정은 절편을 제외한 기울기가 모두0인지 공동으로 묻는다. 결과가 유의하더라도 각 계수가 하나씩 모두 유의하다는 결론으로 바꾸지 않는다.",
    "cue": "제곱합이 아니라 평균제곱을 비교한다.",
    "question": {
      "givens": "절편 포함 OLS에서 n=12, 설명변수 p=2, SSR=80, SSE=20이다. 완전계수와 독립 정규·등분산 오차의 고전적 전체 F 검정이다.",
      "stem": "전체 F 통계량은?",
      "choices": [
        "4",
        "9",
        "18",
        "40"
      ],
      "answer": 3,
      "reason": "회귀 평균제곱 40을 잔차 평균제곱 20/9로 나누어 18을 얻는다. 절편은 설명변수 p에 넣지 않고 잔차 자유도에서 따로 반영한다.",
      "wrong_reasons": [
        "1번: 80/20만 계산해 회귀와 잔차의 서로 다른 자유도를 빠뜨렸다.",
        "2번: 잔차 자유도 12−2−1=9를 F 통계량과 혼동했다.",
        "4번: 분자인 회귀 평균제곱만 구하고 잔차 평균제곱으로 나누지 않았다."
      ]
    },
    "goal": "주어진 요약에서 p와 n을 바꾸어 평균제곱 비를 계산한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-14"
    ],
    "sources": [
      {
        "title": "statsmodels RegressionResults.fvalue",
        "url": "https://www.statsmodels.org/stable/generated/statsmodels.regression.linear_model.RegressionResults.fvalue.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-16",
    "subject": 4,
    "title": "로지스틱 적합도와 분류 정확도는 다른 질문이다",
    "lead": "같은0·1 판정을 내린 두 모형도 양성확률을 다르게 줄 수 있다. 정확도는 임곗값을 넘긴 라벨을 평가하고 적합도·보정 진단은 확률과 관측 결과의 일치까지 살핀다.",
    "cue": "같은 라벨 뒤에 다른 확률이 숨어 있다.",
    "question": {
      "givens": "자체 평가 10건은 양성 8건·음성 2건이다. A의 양성 확률은 모두 0.6, B는 모두 0.9다. 임곗값 0.5에서 둘 다 전부 양성으로 판정한다.",
      "stem": "이 기록에서 가능한 판단은?",
      "choices": [
        "정확도가 같으므로 확률 적합도도 같다",
        "두 모형의 정확도는 80%지만 확률 평가는 다를 수 있다",
        "B의 정확도는 90%다",
        "정확도가 같으므로 적합도 검정은 불필요하다"
      ],
      "answer": 2,
      "reason": "둘 다 실제 양성 8건만 맞혀 정확도 80%다. 그러나 예측 확률 자체가 다르므로 관측 양성 비율과의 일치나 확률 오차는 달라질 수 있다.",
      "wrong_reasons": [
        "1번: 임곗값으로 버린 확률의 차이를 라벨 정확도만으로 복원할 수 없다.",
        "3번: 0.9는 모형이 내놓은 확률이며 실제 정답을 맞힌 비율이 아니다.",
        "4번: 같은 정확도는 확률모형의 형태·보정·누락 구조 진단을 면제하지 않는다."
      ]
    },
    "goal": "일정 예측확률만 바꾸어 라벨 정확도와 확률 제곱오차를 비교한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-07",
      "4-04"
    ],
    "sources": [
      {
        "title": "scikit-learn Probability calibration",
        "url": "https://scikit-learn.org/stable/modules/calibration.html"
      },
      {
        "title": "Stata Logistic regression: Introduction",
        "url": "https://www.stata.com/links/stata-basics/logistic-regression-1-introduction/"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-20",
    "subject": 4,
    "title": "가지치기·드롭아웃·조기종료는 제한하는 대상이 다르다",
    "lead": "세 기법은 모두 과대적합을 줄이는 데 사용할 수 있지만 같은 동작은 아니다. 나무의 가지, 훈련 중 활성값, 반복 학습의 종료 시점 중 무엇을 제한하는지 나누어 본다.",
    "cue": "구조를 줄이나, 잠깐 끄나, 반복을 멈추나.",
    "question": {
      "givens": "신경망 훈련마다 일부 활성값을 무작위로 0으로 만들고, 통상 평가 때는 이 동작을 끈다.",
      "stem": "이 설명에 해당하는 것은?",
      "choices": [
        "나무 가지의 영구 삭제",
        "시험 정답 무작위 변경",
        "드롭아웃",
        "검증 지표를 보지 않는 고정 종료"
      ],
      "answer": 3,
      "reason": "훈련 중 일시적인 무작위 활성 비활성화는 드롭아웃이다. 나무 구조를 줄이는 가지치기나 반복 시점을 정하는 조기종료와 직접 바꾸는 대상이 다르다.",
      "wrong_reasons": [
        "1번: 노드나 가지의 영구 구조 삭제를 훈련마다 바뀌는 활성 마스크와 혼동했다.",
        "2번: 드롭아웃은 정답 라벨을 바꾸는 방법이 아니다.",
        "4번: 제시된 설명은 종료 시점을 정하지 않고 훈련 중 활성값을 바꾼다."
      ]
    },
    "goal": "훈련·평가 모드와 마스크 상태를 바꿔 출력 크기를 확인한다.",
    "kind": "numeric",
    "relatedCodes": [
      "3-13",
      "4-23"
    ],
    "sources": [
      {
        "title": "Dive into Deep Learning Dropout",
        "url": "https://d2l.ai/chapter_multilayer-perceptrons/dropout.html"
      },
      {
        "title": "Keras EarlyStopping",
        "url": "https://keras.io/api/callbacks/early_stopping/"
      },
      {
        "title": "scikit-learn Decision Trees",
        "url": "https://scikit-learn.org/stable/modules/tree.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-21",
    "subject": 4,
    "title": "성능을 탓하기 전에 자료 품질과 입력 조건을 점검한다",
    "lead": "출력값이 달라졌다면 모형을 다시 학습하기 전에 자료형·단위·결측·전처리와 적용 대상을 확인한다. 입력 변화는 원인 후보이며, 실제 성능 저하와 그 원인을 확정하는 근거는 따로 필요하다.",
    "cue": "값이 달라졌나, 값의 뜻이 달라졌나.",
    "question": {
      "givens": "훈련 입력의 가격 단위는 천원이다. 같은 상품이 전개 입력에서는 원 단위의 수치 10000으로 들어온다. 이 기간의 실제 정답은 아직 없다.",
      "stem": "가장 먼저 확인할 진단은?",
      "choices": [
        "학습 epoch만 두 배로 늘린다",
        "단위·전처리 계약을 맞추고 입력과 출력을 점검한다",
        "분포가 달라졌으므로 정확도 하락을 확정한다",
        "모든 이상값을 삭제한다"
      ],
      "answer": 2,
      "reason": "같은 가격이 다른 단위로 전달된 경로를 확인하고 천원 기준을 일치시켜야 한다. 실제 성능의 변화는 정답을 확보해 별도로 평가한다.",
      "wrong_reasons": [
        "1번: 단위 불일치가 남은 채 학습 횟수를 늘려도 입력 계약의 오류는 해결되지 않는다.",
        "3번: 입력 변화만으로 라벨 기반 정확도 하락을 계산하거나 인과 원인을 확정할 수 없다.",
        "4번: 10000이라는 숫자는 원 단위에서 정상일 수 있으며 삭제보다 의미와 단위를 먼저 확인한다."
      ]
    },
    "goal": "같은 원 가격을 변환하거나 생략해 f(x)=2x의 출력 차이를 확인한다.",
    "kind": "numeric",
    "relatedCodes": [
      "1-18",
      "4-34",
      "4-35"
    ],
    "sources": [
      {
        "title": "Google MLCC Monitoring pipelines",
        "url": "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-23",
    "subject": 4,
    "title": "탐색 방법은 같은 예산에서 다음 후보를 고르는 규칙이 다르다",
    "lead": "격자·무작위·베이지안 탐색을 비교할 때는 후보 공간, 평가 지표, 분할과 예산을 먼저 맞춘다. 특정 이름을 썼다는 이유로 항상 더 좋은 모형을 찾았다고 말할 수 없다.",
    "cue": "다음 후보를 고를 때 이전 점수를 쓰는가.",
    "question": {
      "givens": "검증 점수로 설정을 평가한다. 이전 후보·점수와 불확실성을 표현한 대리모형을 갱신해 다음 후보를 고르려 한다.",
      "stem": "이 방식과 가장 직접 연결되는 것은?",
      "choices": [
        "고정된 전체 격자만 순서대로 평가",
        "이전 점수와 무관한 무작위 추출만 수행",
        "시험 정답으로 후보를 선택",
        "베이지안 최적화"
      ],
      "answer": 4,
      "reason": "베이지안 최적화는 관측한 결과로 대리모형을 갱신하고 획득함수를 이용해 다음 평가 위치를 정한다. 설정과 예산 안의 순차 의사결정이며 전역 최적의 보장은 아니다.",
      "wrong_reasons": [
        "1번: 고정 격자의 조합은 이전 검증 결과를 이용해 새 평가 위치를 정하는 방식이 아니다.",
        "2번: 이 문제는 이전 점수와 불확실성을 다음 결정에 반영한다고 명시했다.",
        "3번: 최종 시험 정답을 탐색에 쓰면 독립 성능 평가를 위한 역할이 무너진다."
      ]
    },
    "goal": "같은 공간·fold에서 평가 후보 수와 학습 횟수를 계산한다.",
    "kind": "numeric",
    "relatedCodes": [
      "1-10",
      "4-20"
    ],
    "sources": [
      {
        "title": "scikit-learn Tuning hyper-parameters",
        "url": "https://scikit-learn.org/stable/modules/grid_search.html"
      },
      {
        "title": "Snoek et al. Practical Bayesian Optimization",
        "url": "https://arxiv.org/html/1206.2944v2"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-25",
    "subject": 4,
    "title": "융합했다는 사실과 더 좋아졌다는 결과를 구분한다",
    "lead": "여러 모형의 예측을 평균해도 가장 좋은 단일 모형보다 나쁠 수 있다. 결합 규칙을 정한 뒤 같은 평가자료와 지표에서 결과를 직접 비교해야 한다.",
    "cue": "모형 개수 대신, 같은 표의 오차를 비교한다.",
    "question": {
      "givens": "정답이 0인 같은 평가 사례에서 A의 예측 1과 B의 예측 3을 동일 가중치로 평균한다.",
      "stem": "평균 융합의 절대오차와 A 대비 판단은?",
      "choices": [
        "오차 0으로 반드시 개선",
        "오차 2로 A보다 나쁨",
        "오차 1로 A와 같음",
        "모형이 2개라 일반화 향상 보장"
      ],
      "answer": 2,
      "reason": "평균 예측은(1+3)/2=2, 절대오차는|0−2|=2다. A의 절대오차 1보다 커서 이 사례에서는 융합이 나쁘다.",
      "wrong_reasons": [
        "1번: 서로 같은 방향의 오차는 평균한다고 0으로 상쇄되지 않는다.",
        "3번: 두 예측의 평균은 1이 아니라 2다.",
        "4번: 모형 개수는 예측 오차나 새 자료 성능을 자동으로 보장하지 않는다."
      ]
    },
    "goal": "B의 예측과 결합 가중치를 바꿔 상쇄 여부를 확인한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-08",
      "4-36"
    ],
    "sources": [
      {
        "title": "scikit-learn VotingRegressor",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.VotingRegressor.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-27",
    "subject": 4,
    "title": "시간 추세와 공간 분포는 먼저 묻는 질문이 다르다",
    "lead": "같은 매출표도 한 지역의 월별 변화, 한 달의 지역 차이, 지역별 시간 변화를 묻는지에 따라 표현이 달라진다. 좌표가 있다는 이유만으로 언제나 지도가 가장 좋은 선택은 아니다.",
    "cue": "어디의 차이인가, 언제의 변화인가.",
    "question": {
      "givens": "가상 지역 A의 1·2·3월 매출은 각각 10·12·14다. 목적은 A의 월별 추세와 변화 시점 확인이다.",
      "stem": "이 목적에 가장 직접 맞는 표현은?",
      "choices": [
        "한 달의 지역별 면적 지도만",
        "시간 순서가 있는 선그래프",
        "합계만 나타낸 원그래프",
        "지역 이름의 가나다순 목록만"
      ],
      "answer": 2,
      "reason": "월별 값과 시간 순서를 같은 축에 놓은 선그래프는 추세와 변화 시점을 직접 보여준다. 지도나 합계만으로는 이 질문의 시간 변화를 충분히 나타내지 못한다.",
      "wrong_reasons": [
        "1번: 한 달의 공간 배치만 보여주면 A의 월별 변화가 빠진다.",
        "3번: 합계를 부분 비중으로 바꾸면 언제 값이 달라졌는지 보이지 않는다.",
        "4번: 지역 이름의 순서는 시간 순서나 월별 값의 변화가 아니다."
      ]
    },
    "goal": "동일 자료에서 먼저 답할 질문을 바꾸어 표현을 선택한다.",
    "kind": "decision",
    "relatedCodes": [
      "4-28",
      "4-32"
    ],
    "sources": [
      {
        "title": "ONS Line chart",
        "url": "https://service-manual.ons.gov.uk/data-visualisation/chart-types/line-chart"
      },
      {
        "title": "ONS Choropleth maps",
        "url": "https://service-manual.ons.gov.uk/data-visualisation/chart-types/choropleth-maps"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-28",
    "subject": 4,
    "title": "카토그램의 면적은 실제 땅보다 선택한 통계량을 나타낸다",
    "lead": "실제 지리면적과 인구에 비례해 다시 그린 면적은 다른 정보다. 지역이 크게 보이면 땅이 넓다는 뜻인지, 표시한 통계량이 많다는 뜻인지 범례부터 확인한다.",
    "cue": "지도에서 큰 것이, 땅인가 사람인가.",
    "question": {
      "givens": "인구가 A는 10만 명, B는 30만 명인 두 지역을 인구 비례 면적의 카토그램으로 그린다. 같은 비례상수를 사용한다.",
      "stem": "B의 표시 면적은 A의 몇 배인가?",
      "choices": [
        "1/3배",
        "2배",
        "3배",
        "실제 지리 면적을 알아야만 계산 가능"
      ],
      "answer": 3,
      "reason": "표시 면적을 인구에 비례시켰으므로 30/10=3배다. 실제 지리 면적 비율은 이 인코딩의 크기를 정하는 기준이 아니다.",
      "wrong_reasons": [
        "1번: 인구의 분자와 분모를 반대로 나누었다.",
        "2번: 자체 예제의 실제 지리 면적A/B=2를 카토그램의B/A 비율로 옮겼다.",
        "4번: 이 문제는 인구 비례라고 명시했으므로 인구 비율만으로 표시 면적 비율을 구할 수 있다."
      ]
    },
    "goal": "같은 총 표시 면적200에서 인구만 바꿔 비례 배분한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-27",
      "4-29"
    ],
    "sources": [
      {
        "title": "Gastner and Newman Density equalizing maps",
        "url": "https://arxiv.org/html/physics/0401102v1"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-29",
    "subject": 4,
    "title": "버블의 값 비율과 반지름 비율은 다르다",
    "lead": "버블차트는 위치와 크기에 서로 다른 변수를 담는다. 원의 면적을 값에 비례시켰다면 값이4배여도 반지름은2배이며, 크기 범례 없이는 단순히 지름을 값처럼 읽으면 안 된다.",
    "cue": "면적의 네 배는, 반지름의 두 배.",
    "question": {
      "givens": "같은 원형 버블의 면적이 값에 비례한다. A의 값은 10, B의 값은 40이고 테두리 영향은 제외한다.",
      "stem": "B의 반지름은 A의 몇 배인가?",
      "choices": [
        "1배",
        "2배",
        "4배",
        "16배"
      ],
      "answer": 2,
      "reason": "면적은 4배이지만 반지름은 면적의 제곱근에 비례하므로√(40/10)=2배다. 값의 비율과 길이의 비율을 구분한다.",
      "wrong_reasons": [
        "1번: 값과 면적이 서로 다르므로 반지름도 같을 수 없다.",
        "3번: 면적 비율 4를 반지름 비율로 그대로 사용했다.",
        "4번: 면적 비율을 다시 제곱한 값이며 반지름을 구할 때는 제곱근을 써야 한다."
      ]
    },
    "goal": "동일한 값 비율에서 크기 인코딩만 바꿔 길이와 면적을 비교한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-28",
      "4-32"
    ],
    "sources": [
      {
        "title": "Matplotlib pyplot.scatter",
        "url": "https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.scatter.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-30",
    "subject": 4,
    "title": "히트맵의 재정렬은 값을 바꾸지 않고 이웃을 바꾼다",
    "lead": "행·열의 순서만 바꾸면 가까운 패턴을 모아 볼 수 있지만 관측값 자체가 바뀌지는 않는다. 재정렬과 표준화·값 변환을 같은 작업으로 설명하지 않는다.",
    "cue": "자리만 바뀌었나, 숫자도 바뀌었나.",
    "question": {
      "givens": "A=(1,2), B=(8,9), C=(2,1), D=(9,8)의 행 순서만 A·C·B·D로 바꾼다. 값 변환은 없고 색 범위도 같다.",
      "stem": "재정렬 후 올바른 설명은?",
      "choices": [
        "전체 합계 40과 각 이름에 연결된 값은 같다",
        "서로 이웃한 모든 행의 상관은 1이 된다",
        "관측 수가 4에서 8로 늘어난다",
        "값이 자동으로 평균 0으로 표준화된다"
      ],
      "answer": 1,
      "reason": "행의 위치만 달라졌으므로 값·합계·행 수는 변하지 않는다. 비슷한 행을 이웃하게 보여주는 효과와 수치 변환을 구별한다.",
      "wrong_reasons": [
        "2번: 이웃 배치는 새로운 상관을 만들거나 완전한 상관을 보장하지 않는다.",
        "3번: 4행의 순서를 바꿨을 뿐 관측을 추가하지 않았다.",
        "4번: 평균을 빼는 표준화는 이 문제에서 수행하지 않았다고 명시한 별도 연산이다."
      ]
    },
    "goal": "행 재정렬과 A행 평균 중심화의 결과를 비교한다.",
    "kind": "decision",
    "relatedCodes": [
      "4-03",
      "4-31"
    ],
    "sources": [
      {
        "title": "seaborn clustermap",
        "url": "https://seaborn.pydata.org/generated/seaborn.clustermap.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-31",
    "subject": 4,
    "title": "히스토그램의 밀도는 높이가 아니라 면적으로 비율을 읽는다",
    "lead": "도수가 같아도 구간 너비가 다르면 밀도 높이는 다르다. density로 정규화한 히스토그램은 막대 높이의 합이 아니라 높이×너비의 총합이1이 되도록 계산한다.",
    "cue": "밀도 그림은, 높이 곱하기 너비.",
    "question": {
      "givens": "관측값 0.2·0.6·1.2·2.4를 구간 [0,1), [1,3]으로 나눈다. 가중치 없이 전체 4개를 density로 정규화한다.",
      "stem": "두 구간의 밀도 높이는 각각?",
      "choices": [
        "2와 2",
        "0.5와 0.5",
        "0.5와 0.25",
        "1과 0.5"
      ],
      "answer": 3,
      "reason": "첫 구간은 2/(4×1)=0.5, 둘째는 2/(4×2)=0.25다. 각각 높이에 구간 너비를 곱하면 관측의 절반에 해당하는 면적 0.5가 된다.",
      "wrong_reasons": [
        "1번: 구간의 도수를 밀도 높이로 그대로 썼다.",
        "2번: 상대도수는 둘 다 0.5지만 두 번째 구간 너비 2로 다시 나누지 않았다.",
        "4번: 전체 관측 수 4가 아니라 2로 나누어 면적 총합이 2가 된다."
      ]
    },
    "goal": "구간과 마지막 관측을 바꾸어 밀도 높이와 면적을 계산한다.",
    "kind": "distribution",
    "relatedCodes": [
      "4-30",
      "4-32"
    ],
    "sources": [
      {
        "title": "NumPy histogram",
        "url": "https://numpy.org/doc/stable/reference/generated/numpy.histogram.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-32",
    "subject": 4,
    "title": "축을 잘라도 자료의 증가율이 바뀌지는 않는다",
    "lead": "값20과30은50% 증가다. 막대의 세로축을18부터 그려 보이는 길이가2와12가 되었다고 자료값이6배가 된 것은 아니다. 실제값·단위·분모와 시각적 길이를 나누어 읽는다.",
    "cue": "눈에 보인 길이 말고, 원자료의 분모.",
    "question": {
      "givens": "같은 단위의 통계값이 20→30으로 증가했다. 막대의 축은 18부터 시작해 보이는 높이가 2→12가 됐다.",
      "stem": "실제 통계값의 증가율은?",
      "choices": [
        "600%",
        "500%",
        "50%",
        "10%"
      ],
      "answer": 3,
      "reason": "(30−20)/20=0.5이므로 50%다. 보이는 높이의 비 6이나 높이 증가율 500%는 실제 자료값의 증가율이 아니다.",
      "wrong_reasons": [
        "1번: 보이는 높이 12/2=6을 실제값의 증가율로 읽었다. 배율과 증가율도 혼동했다.",
        "2번: 잘린 높이의 증가율(12−2)/2=500%를 원자료에 적용했다.",
        "4번: 차이 10을 이전 값 20으로 나누지 않고 그대로 퍼센트로 붙였다."
      ]
    },
    "goal": "축 시작과 자료의 비율 단위를 바꾸어 원자료 증가율을 유지한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-27",
      "4-29"
    ],
    "sources": [
      {
        "title": "ONS Bar chart",
        "url": "https://service-manual.ons.gov.uk/data-visualisation/chart-types/bar-charts"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-33",
    "subject": 4,
    "title": "회귀계수의 크기는 원인의 크기가 아니다",
    "lead": "예측식의 계수는 다른 입력을 고정하고 한 입력을 한 단위 바꿀 때 예측값이 얼마나 바뀌는지 말한다. 단위와 모형을 지우고 중요도나 인과효과로 바꾸어 읽으면 설명 범위를 넘는다.",
    "cue": "계수는 단위, 중요도는 평가 조건부터.",
    "question": {
      "givens": "예측식 ŷ=2x₁+0.01x₂에서 x₁은 천원 단위다. 원 단위 w₁=1000x₁로 바꾸고 같은 예측을 유지한다.",
      "stem": "w₁의 계수와 해석으로 옳은 것은?",
      "choices": [
        "계수 2000, 현실의 인과효과도 1000배다",
        "계수 0.002, 단위가 바뀌었을 뿐 예측식은 동등하다",
        "계수 2, 입력 단위와 계수는 무관하다",
        "계수 0.01, 더 작은 계수가 언제나 덜 중요한 변수다"
      ],
      "answer": 2,
      "reason": "x₁=w₁/1000이므로 2x₁=0.002w₁다. 동일한 입력값을 단위에 맞게 환산하면 예측은 같고, 이 변환은 인과효과를 증명하지 않는다.",
      "wrong_reasons": [
        "1번: 입력 수치가 1000배가 되므로 계수는 1000분의 1로 줄여야 한다. 인과효과의 확대도 도출되지 않는다.",
        "3번: 계수 2를 유지하면 첫 항이 1000배가 되어 원래 식과 다른 예측을 만든다.",
        "4번: 두 번째 변수의 계수를 가져왔다. 서로 다른 단위의 계수 크기로 중요도를 단정할 수도 없다."
      ]
    },
    "goal": "첫 입력의 수치 배율을 바꾸어 동등한 계수와 예측을 확인한다.",
    "kind": "numeric",
    "relatedCodes": [
      "2-01",
      "4-14",
      "4-34"
    ],
    "sources": [
      {
        "title": "scikit-learn Coefficient interpretation pitfalls",
        "url": "https://scikit-learn.org/stable/auto_examples/inspection/plot_linear_model_coefficient_interpretation.html"
      },
      {
        "title": "scikit-learn Permutation feature importance",
        "url": "https://scikit-learn.org/stable/modules/permutation_importance.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-34",
    "subject": 4,
    "title": "예측할 때도 학습한 전처리를 그대로 연결한다",
    "lead": "모형 파일이 같아도 열 순서와 단위, 결측값 처리, 학습한 변환이 달라지면 다른 입력을 계산한다. 실제 적용에서는 원시 입력부터 출력의 의미까지 한 계약으로 확인한다.",
    "cue": "새 입력에는 fit 말고 저장한 transform.",
    "question": {
      "givens": "저장된 전처리는 z=(x−10)/2, 모형은 ŷ=3z+1이다. 운영 입력 x=14에 같은 파이프라인을 적용한다.",
      "stem": "올바른 처리와 출력은?",
      "choices": [
        "원시 입력 14를 바로 넣어 43을 출력한다",
        "새 입력의 평균을 다시 학습해 항상 1을 출력한다",
        "저장한 평균·표준편차로 변환해 7을 출력한다",
        "출력 단위는 숫자만 맞으면 확인하지 않는다"
      ],
      "answer": 3,
      "reason": "저장한 변환에서 z=2이고 ŷ=7이다. 학습된 변환과 입력·출력 의미를 함께 유지해야 동일한 파이프라인을 적용한 것이다.",
      "wrong_reasons": [
        "1번: 표준화 단계를 빠뜨려 학습 때와 다른 숫자를 모형에 넣었다.",
        "2번: 새 입력에서 변환을 다시 fit하면 저장한 학습 변환과 달라진다. 임의의 재학습으로 출력을 고정할 수 없다.",
        "4번: 같은 숫자라도 단위·기간·클래스 의미가 다르면 사용자가 다른 행동을 할 수 있다. 출력 계약도 확인한다."
      ]
    },
    "goal": "입력 값과 전처리 경로를 바꾸어 지정 파이프라인의 결과를 비교한다.",
    "kind": "numeric",
    "relatedCodes": [
      "1-16",
      "4-21"
    ],
    "sources": [
      {
        "title": "scikit-learn Pipelines",
        "url": "https://scikit-learn.org/stable/modules/compose.html"
      },
      {
        "title": "Google MLCC Monitoring pipelines",
        "url": "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring"
      }
    ],
    "featured": true,
    "featuredOrder": 12,
    "shortTitle": "학습 전처리 재사용"
  },
  {
    "code": "4-35",
    "subject": 4,
    "title": "입력 변화는 경보이고 성능 저하는 정답으로 확인한다",
    "lead": "새 데이터의 분포가 달라졌다는 사실만으로 오답이 늘었다고 말할 수 없다. 정답이 늦게 도착하는 동안은 입력·시스템 경보를 관찰하고, 나중에 같은 예측과 연결한 정답으로 성능을 계산한다.",
    "cue": "입력 경보와 정답 기반 성능을 나눈다.",
    "question": {
      "givens": "입력값 1의 비율이 이전 5개 중 1개에서 새 5개 중 3개로 바뀌었다. 새 구간의 정답은 아직 없다.",
      "stem": "현재 근거로 내릴 수 있는 결론은?",
      "choices": [
        "정확도가 40퍼센트포인트 하락했다",
        "입력 비율은 달라졌지만 성능 저하 여부는 아직 확인할 수 없다",
        "재현율은 반드시 0이다",
        "정답 없이도 새 구간 AUC를 계산할 수 있다"
      ],
      "answer": 2,
      "reason": "입력값 1의 비율은 20%에서 60%로 달라졌다. 정확도·재현율·AUC는 실제 정답과 예측을 연결해야 하므로 입력 비율 변화만으로 그 변화를 확정할 수 없다.",
      "wrong_reasons": [
        "1번: 입력 비율 차이를 정확도 차이로 바꾸었다. 정답이 없으므로 정확도 자체를 계산하지 못했다.",
        "3번: 실제 양성과 그중 맞춘 수를 모른다. 입력 1을 정답 양성이나 오답으로 대신 셀 수 없다.",
        "4번: AUC에는 실제 정답 클래스와 그 관측의 예측 점수가 필요하다. 점수는 이산적일 수도 있지만 입력 분포만으로 정답과의 순위를 구할 수는 없다."
      ]
    },
    "goal": "정답 도착 여부와 저장 예측을 바꾸어 계산 가능한 성능의 범위를 확인한다.",
    "kind": "decision",
    "relatedCodes": [
      "4-07",
      "4-21",
      "4-36"
    ],
    "sources": [
      {
        "title": "Google MLCC Monitoring pipelines",
        "url": "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring"
      },
      {
        "title": "Google Productionization",
        "url": "https://developers.google.com/machine-learning/managing-ml-projects/production"
      },
      {
        "title": "scikit-learn roc_auc_score",
        "url": "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_auc_score.html"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-36",
    "subject": 4,
    "title": "재학습했다는 사실과 교체할 근거를 구분한다",
    "lead": "새 데이터가 늘었다고 새 모형을 곧바로 운영에 올리지 않는다. 원인을 진단하고 같은 평가 조건에서 기존 모형과 비교한 뒤, 정한 성능·비용·운영 조건을 통과한 후보를 검토한다.",
    "cue": "재학습은 작업, 교체는 비교 후 판단.",
    "question": {
      "givens": "같은 검증 정답 [10,20]에 기존 예측은 [12,18], 재학습 후보의 예측은 [13,17]이다. 낮은 MAE가 기준이고 다른 조건은 같다.",
      "stem": "이 검증 결과에 맞는 판단은?",
      "choices": [
        "새 자료로 학습했으므로 후보를 바로 교체한다",
        "기존 MAE는 2, 후보 MAE는 3이므로 이 결과는 후보 교체를 지지하지 않는다",
        "후보 MAE는 0이므로 교체한다",
        "두 모형을 비교할 때 정답 자료를 각각 바꾼다"
      ],
      "answer": 2,
      "reason": "기존 절대 오차는 2·2로 MAE가 2이고, 후보는 3·3으로 MAE가 3이다. 정한 낮은 MAE 기준에서는 기존이 낫다. 이 작은 검증만으로 모든 환경의 우열을 주장하지는 않는다.",
      "wrong_reasons": [
        "1번: 재학습 여부를 검증 성능 대신 교체 근거로 삼았다. 후보는 이 조건에서 오히려 오차가 크다.",
        "3번: 후보 예측은 정답과 각각 3만큼 다르므로 MAE는 3이다.",
        "4번: 서로 다른 평가 자료를 쓰면 자료 난이도와 구성 차이가 모형 차이에 섞인다. 공정한 비교 조건을 유지한다."
      ]
    },
    "goal": "같은 두 정답에서 후보 예측만 바꾸어 낮은 MAE 기준과 비교한다.",
    "kind": "numeric",
    "relatedCodes": [
      "4-08",
      "4-25",
      "4-35"
    ],
    "sources": [
      {
        "title": "Google Cloud MLOps pipelines",
        "url": "https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning"
      },
      {
        "title": "Google MLCC Monitoring pipelines",
        "url": "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring"
      }
    ],
    "featured": false,
    "featuredOrder": null
  },
  {
    "code": "4-37",
    "subject": 4,
    "title": "예측값 다음에 누가 무엇을 결정하는지 적는다",
    "lead": "같은 수요80개도 발주 담당자와 배송 담당자가 필요한 설명은 다르다. 예측 단위·시점·불확실성과 사용자의 행동 규칙을 연결해야 결과가 실제 의사결정에 쓰인다.",
    "cue": "예측값 옆에 사용자·행동·조건.",
    "question": {
      "givens": "내일 수요 예측은 80개, 재고는 20개다. 입고·폐기·안전 재고·포장 제약은 없다. 단순 정책은 추가 발주=max(예측 수요−재고,0)이다.",
      "stem": "이 정책의 추가 발주량과 올바른 설명은?",
      "choices": [
        "80개, 예측은 항상 최적 행동과 같다",
        "100개, 재고를 더해야 한다",
        "60개, 명시한 단순 정책의 결과다",
        "20개, 예측값은 의사결정에 쓰지 않는다"
      ],
      "answer": 3,
      "reason": "max(80−20,0)=60이다. 재고를 고려한 지정 정책의 산출이며, 현실의 모든 비용·제약을 반영한 최적 주문이나 업무 성과 개선을 뜻하지 않는다.",
      "wrong_reasons": [
        "1번: 재고 20개를 빠뜨렸다. 예측값과 제약을 반영한 행동은 구별한다.",
        "2번: 현재 재고는 수요를 충당하므로 지정 식에서는 빼야 한다.",
        "4번: 재고를 그대로 발주량으로 읽었다. 주어진 정책은 예측 수요와 재고를 함께 쓴다."
      ]
    },
    "goal": "명시한 단순 발주 정책에서 수요와 재고를 바꾸어 계산한다.",
    "kind": "numeric",
    "relatedCodes": [
      "1-05",
      "4-36"
    ],
    "sources": [
      {
        "title": "Google Framing an ML problem",
        "url": "https://developers.google.com/machine-learning/problem-framing/ml-framing"
      },
      {
        "title": "Google Productionization",
        "url": "https://developers.google.com/machine-learning/managing-ml-projects/production"
      }
    ],
    "featured": false,
    "featuredOrder": null
  }
];
