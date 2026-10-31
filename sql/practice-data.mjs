import {CATALOG} from './catalog.mjs';
// Stable IDs extend the existing v1 answer catalog without changing its 12 original keys.
const additions = [
  {
    "code": "S1-TH33-01",
    "lessonCode": "TH-33",
    "subject": 1,
    "title": "고객·고객 1번·고객 이름의 역할",
    "labUrl": "lab.html?episode=TH-33",
    "topic": "엔터티·인스턴스·속성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH33-01",
      "givens": "고객 이름은 중복을 허용하고 `customer_id`로 고객을 구분한다.\n\n|customer_id|customer_name|\n|---|---|\n|1|MIN|\n|2|MIN|\n|3|SOL|",
      "givensHtml": "<p>고객 이름은 중복을 허용하고 <code>customer_id</code>로 고객을 구분한다.</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>customer_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>3</td>\n<td>SOL</td>\n</tr>\n</tbody>\n</table>\n",
      "stem": "이 업무 모델에서 엔터티 유형·인스턴스·속성을 순서대로 바르게 연결한 것은?",
      "choices": [
        {
          "id": "S1-TH33-01-A",
          "text": "고객 이름 · 고객 · 고객 1번"
        },
        {
          "id": "S1-TH33-01-B",
          "text": "고객 · 고객 이름 · 고객 1번"
        },
        {
          "id": "S1-TH33-01-C",
          "text": "고객 · 고객 1번 · 고객 이름"
        },
        {
          "id": "S1-TH33-01-D",
          "text": "고객 1번 · 고객 이름 · 고객"
        }
      ],
      "answerId": "S1-TH33-01-C",
      "reason": "먼저 무엇을 관리하는지 정한다. 이 예제에서는 고객이라는 유형 아래 고객 1·2·3번이 각각 존재하고, 이름은 각 고객의 속성이다. 관계형 표로 표현할 때 사례를 행, 속성을 열에 대응해 볼 수 있다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH33-01-A",
          "reason": "고객 이름 · 고객 · 고객 1번 — 고객 이름은 속성이며 고객은 관리 대상의 유형이다. 고객 1번은 속성이 아니다."
        },
        {
          "choiceId": "S1-TH33-01-B",
          "reason": "고객 · 고객 이름 · 고객 1번 — 이름이라는 특성과 개별 고객 사례의 역할이 뒤바뀌었다."
        },
        {
          "choiceId": "S1-TH33-01-D",
          "reason": "고객 1번 · 고객 이름 · 고객 — 고객 1번은 개별 사례이고 고객 이름은 특성이므로 유형과 사례를 바꾸어 놓았다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      }
    ]
  },
  {
    "code": "S1-TH33-02",
    "lessonCode": "TH-33",
    "subject": 1,
    "title": "고객 수와 이름 종류 수",
    "labUrl": "lab.html?episode=TH-33",
    "topic": "엔터티·인스턴스·속성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH33-02",
      "givens": "고객 이름은 중복을 허용하고 `customer_id`로 고객을 구분한다.\n\n|customer_id|customer_name|\n|---|---|\n|1|MIN|\n|2|MIN|\n|3|SOL|\n\n```sql\nSELECT COUNT(*) AS customer_rows,\n       COUNT(DISTINCT customer_name) AS name_kinds\nFROM customers;\n```",
      "givensHtml": "<p>고객 이름은 중복을 허용하고 <code>customer_id</code>로 고객을 구분한다.</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>customer_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>3</td>\n<td>SOL</td>\n</tr>\n</tbody>\n</table>\n<pre><code class=\"language-sql\">SELECT COUNT(*) AS customer_rows,\n       COUNT(DISTINCT customer_name) AS name_kinds\nFROM customers;\n</code></pre>\n",
      "stem": "쿼리 결과와 해석을 바르게 짝지은 것은?",
      "choices": [
        {
          "id": "S1-TH33-02-A",
          "text": "3과 2가 나오며, 이름 종류가 2개이므로 실제 고객도 2명이다."
        },
        {
          "id": "S1-TH33-02-B",
          "text": "3과 2가 나오며, 고객은 3명이고 이름 종류는 2개이다."
        },
        {
          "id": "S1-TH33-02-C",
          "text": "2와 2가 나오며, MIN 두 행은 같은 고객이다."
        },
        {
          "id": "S1-TH33-02-D",
          "text": "3과 3이 나오며, 서로 다른 고객은 반드시 다른 이름을 가진다."
        }
      ],
      "answerId": "S1-TH33-02-B",
      "reason": "행 수와 속성 값 종류 수를 구분한다. 이 자료에서 COUNT(*)는 3, COUNT(DISTINCT customer_name)은 2다. 동명이인 두 명을 이름만으로 합치면 고객 한 명의 기록을 잃는다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH33-02-A",
          "reason": "3과 2가 나오며, 이름 종류가 2개이므로 실제 고객도 2명이다. — 두 집계값은 서로 다른 대상을 센다. 이름 종류의 수로 식별된 고객 수를 대체할 수 없다."
        },
        {
          "choiceId": "S1-TH33-02-C",
          "reason": "2와 2가 나오며, MIN 두 행은 같은 고객이다. — COUNT(*)는 이름 중복을 제거하지 않으며, 이 업무에서는 서로 다른 고객 번호가 서로 다른 고객을 뜻한다."
        },
        {
          "choiceId": "S1-TH33-02-D",
          "reason": "3과 3이 나오며, 서로 다른 고객은 반드시 다른 이름을 가진다. — 고객의 식별 기준은 번호이다. 이름 중복을 허용하므로 DISTINCT 이름의 개수는 2다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      }
    ]
  },
  {
    "code": "S1-TH33-03",
    "lessonCode": "TH-33",
    "subject": 1,
    "title": "이름 변경과 개체의 동일성",
    "labUrl": "lab.html?episode=TH-33",
    "topic": "엔터티·인스턴스·속성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH33-03",
      "givens": "고객 이름은 중복을 허용하고 `customer_id`로 고객을 구분한다.\n\n|customer_id|customer_name|\n|---|---|\n|1|MIN|\n|2|MIN|\n|3|SOL|\n\n고객 1번의 이름만 `MIN`에서 `M`으로 정정했다. 고객 번호와 식별 규칙은 그대로다.",
      "givensHtml": "<p>고객 이름은 중복을 허용하고 <code>customer_id</code>로 고객을 구분한다.</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>customer_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>3</td>\n<td>SOL</td>\n</tr>\n</tbody>\n</table>\n<p>고객 1번의 이름만 <code>MIN</code>에서 <code>M</code>으로 정정했다. 고객 번호와 식별 규칙은 그대로다.</p>\n",
      "stem": "변경을 이 업무의 식별 규칙에 맞게 해석한 것은?",
      "choices": [
        {
          "id": "S1-TH33-03-A",
          "text": "같은 고객 인스턴스의 이름 속성 값이 바뀌었다."
        },
        {
          "id": "S1-TH33-03-B",
          "text": "이름이 달라졌으므로 고객 인스턴스가 반드시 하나 추가되었다."
        },
        {
          "id": "S1-TH33-03-C",
          "text": "엔터티 유형이 고객에서 M으로 바뀌었다."
        },
        {
          "id": "S1-TH33-03-D",
          "text": "고객 이름이라는 속성이 삭제되고 새 속성이 생겼다."
        }
      ],
      "answerId": "S1-TH33-03-A",
      "reason": "동일성 판단은 정해 둔 식별 기준에 따른다. 이 예제에서는 같은 customer_id를 유지했으므로 새 고객을 추가한 것이 아니라 기존 고객의 이름을 정정한 것이다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH33-03-B",
          "reason": "이름이 달라졌으므로 고객 인스턴스가 반드시 하나 추가되었다. — 이 업무에서는 이름이 아니라 고객 번호가 동일성을 판단하는 기준이다."
        },
        {
          "choiceId": "S1-TH33-03-C",
          "reason": "엔터티 유형이 고객에서 M으로 바뀌었다. — M은 이름 속성의 값이다. 관리 대상의 유형 자체가 바뀐 것이 아니다."
        },
        {
          "choiceId": "S1-TH33-03-D",
          "reason": "고객 이름이라는 속성이 삭제되고 새 속성이 생겼다. — 열의 의미는 고객 이름으로 유지되고 그 열에 저장된 값만 바뀌었다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      }
    ]
  },
  {
    "code": "S1-TH34-01",
    "lessonCode": "TH-34",
    "subject": 1,
    "title": "속성의 생성 규칙으로 분류하기",
    "labUrl": "lab.html?episode=TH-34",
    "topic": "기본·설계·파생 속성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH34-01",
      "givens": "할인·세금·반올림이 없는 이 예제에서 `qty`와 `unit_price`는 업무 입력 값이고, `order_id`는 시스템 설계를 위해 부여한 번호다. 금액은 `qty * unit_price`로 정한다.\n\n|order_id|qty|unit_price|saved_total|\n|---|---|---|---|\n|101|2|3000|6000|\n|102|1|2000|2000|",
      "givensHtml": "<p>할인·세금·반올림이 없는 이 예제에서 <code>qty</code>와 <code>unit_price</code>는 업무 입력 값이고, <code>order_id</code>는 시스템 설계를 위해 부여한 번호다. 금액은 <code>qty * unit_price</code>로 정한다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>qty</th>\n<th>unit_price</th>\n<th>saved_total</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>2</td>\n<td>3000</td>\n<td>6000</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>2000</td>\n<td>2000</td>\n</tr>\n</tbody>\n</table>\n",
      "stem": "주어진 생성 규칙에 따른 속성 분류가 올바른 것은?",
      "choices": [
        {
          "id": "S1-TH34-01-A",
          "text": "금액을 열에 저장하면 계산식과 관계없이 기본 속성이다."
        },
        {
          "id": "S1-TH34-01-B",
          "text": "qty는 기본 속성, order_id는 설계 속성, qty * unit_price로 계산한 금액은 파생 속성이다."
        },
        {
          "id": "S1-TH34-01-C",
          "text": "모두 숫자로 저장하므로 모두 기본 속성이다."
        },
        {
          "id": "S1-TH34-01-D",
          "text": "order_id는 이름에 id가 있으므로 모든 업무에서 반드시 설계 속성이다."
        }
      ],
      "answerId": "S1-TH34-01-B",
      "reason": "기본·설계·파생의 구분은 값이 만들어지는 이유를 본다. 이 문제에서 수량과 단가는 업무 입력, 주문 번호는 설계를 위한 부여 값, 금액은 곱셈으로 얻은 값이라는 조건이 분류의 근거다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH34-01-A",
          "reason": "금액을 열에 저장하면 계산식과 관계없이 기본 속성이다. — 저장 여부는 생성 규칙과 별개다. 다른 값에서 계산했다면 저장해도 파생 속성이다."
        },
        {
          "choiceId": "S1-TH34-01-C",
          "reason": "모두 숫자로 저장하므로 모두 기본 속성이다. — 자료형이 같다는 사실은 생성 규칙을 같게 만들지 않는다."
        },
        {
          "choiceId": "S1-TH34-01-D",
          "reason": "order_id는 이름에 id가 있으므로 모든 업무에서 반드시 설계 속성이다. — 이 예제에서는 시스템이 부여하기 때문에 설계 속성이다. 이름만으로 다른 업무의 생성 방식을 단정할 수 없다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S1-TH34-02",
    "lessonCode": "TH-34",
    "subject": 1,
    "title": "저장한 파생 값의 성격",
    "labUrl": "lab.html?episode=TH-34",
    "topic": "기본·설계·파생 속성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH34-02",
      "givens": "할인·세금·반올림이 없는 이 예제에서 `qty`와 `unit_price`는 업무 입력 값이고, `order_id`는 시스템 설계를 위해 부여한 번호다. 금액은 `qty * unit_price`로 정한다.\n\n|order_id|qty|unit_price|saved_total|\n|---|---|---|---|\n|101|2|3000|6000|\n|102|1|2000|2000|",
      "givensHtml": "<p>할인·세금·반올림이 없는 이 예제에서 <code>qty</code>와 <code>unit_price</code>는 업무 입력 값이고, <code>order_id</code>는 시스템 설계를 위해 부여한 번호다. 금액은 <code>qty * unit_price</code>로 정한다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>qty</th>\n<th>unit_price</th>\n<th>saved_total</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>2</td>\n<td>3000</td>\n<td>6000</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>2000</td>\n<td>2000</td>\n</tr>\n</tbody>\n</table>\n",
      "stem": "계산한 금액을 saved_total 열에 보관하기 시작했다. 속성 분류에 대한 설명으로 옳은 것은?",
      "choices": [
        {
          "id": "S1-TH34-02-A",
          "text": "계산식으로 생성한다는 규칙이 같다면 저장해도 파생 속성이다."
        },
        {
          "id": "S1-TH34-02-B",
          "text": "테이블에 저장한 순간 기본 속성으로 바뀐다."
        },
        {
          "id": "S1-TH34-02-C",
          "text": "저장된 모든 금액은 설계 속성이 된다."
        },
        {
          "id": "S1-TH34-02-D",
          "text": "파생 속성은 SELECT에서 계산할 수만 있고 저장해서는 안 된다."
        }
      ],
      "answerId": "S1-TH34-02-A",
      "reason": "파생 속성은 다른 속성으로부터 계산해 얻는 값이다. 저장하면 계산 비용을 줄일 여지가 생기지만 원천 값과의 불일치도 관리해야 한다. 저장 자체가 기본 속성으로 바꾸지는 않는다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH34-02-B",
          "reason": "테이블에 저장한 순간 기본 속성으로 바뀐다. — 기본 속성 여부를 저장 유무로 결정할 수 없다."
        },
        {
          "choiceId": "S1-TH34-02-C",
          "reason": "저장된 모든 금액은 설계 속성이 된다. — 설계 속성은 설계를 위해 별도로 도입한 값인지로 구분하며 저장된다는 이유만으로 정하지 않는다."
        },
        {
          "choiceId": "S1-TH34-02-D",
          "reason": "파생 속성은 SELECT에서 계산할 수만 있고 저장해서는 안 된다. — 파생 값을 저장할 수도 있다. 이 경우 원천 값 변경과 저장 값의 일치 여부를 관리해야 한다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S1-TH34-03",
    "lessonCode": "TH-34",
    "subject": 1,
    "title": "저장 금액의 불일치 찾기",
    "labUrl": "lab.html?episode=TH-34",
    "topic": "기본·설계·파생 속성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH34-03",
      "givens": "할인·세금·반올림이 없는 이 예제에서 `qty`와 `unit_price`는 업무 입력 값이고, `order_id`는 시스템 설계를 위해 부여한 번호다. 금액은 `qty * unit_price`로 정한다.\n\n|order_id|qty|unit_price|saved_total|\n|---|---|---|---|\n|101|2|3000|6000|\n|102|1|2000|2000|\n\n주문 101의 saved_total만 5000으로 바꿨다.\n\n```sql\nSELECT order_id, saved_total, qty * unit_price AS calc_total\nFROM order_lines\nWHERE saved_total <> qty * unit_price;\n```",
      "givensHtml": "<p>할인·세금·반올림이 없는 이 예제에서 <code>qty</code>와 <code>unit_price</code>는 업무 입력 값이고, <code>order_id</code>는 시스템 설계를 위해 부여한 번호다. 금액은 <code>qty * unit_price</code>로 정한다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>qty</th>\n<th>unit_price</th>\n<th>saved_total</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>2</td>\n<td>3000</td>\n<td>6000</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>2000</td>\n<td>2000</td>\n</tr>\n</tbody>\n</table>\n<p>주문 101의 saved_total만 5000으로 바꿨다.</p>\n<pre><code class=\"language-sql\">SELECT order_id, saved_total, qty * unit_price AS calc_total\nFROM order_lines\nWHERE saved_total &lt;&gt; qty * unit_price;\n</code></pre>\n",
      "stem": "이 변경 뒤 쿼리가 반환하는 행은?",
      "choices": [
        {
          "id": "S1-TH34-03-A",
          "text": "(101, 5000, 5000) 한 행"
        },
        {
          "id": "S1-TH34-03-B",
          "text": "(102, 2000, 2000) 한 행"
        },
        {
          "id": "S1-TH34-03-C",
          "text": "아무 행도 반환하지 않는다."
        },
        {
          "id": "S1-TH34-03-D",
          "text": "(101, 5000, 6000) 한 행"
        }
      ],
      "answerId": "S1-TH34-03-D",
      "reason": "주문 101의 계산 값은 수량 2와 단가 3000을 곱한 6000이다. 저장 값만 5000으로 바꿨으므로 두 값의 불일치를 찾는 WHERE 절에 걸린다. 주문 102는 여전히 일치한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH34-03-A",
          "reason": "(101, 5000, 5000) 한 행 — calc_total은 saved_total을 복사하지 않고 qty와 unit_price를 곱하므로 6000이다."
        },
        {
          "choiceId": "S1-TH34-03-B",
          "reason": "(102, 2000, 2000) 한 행 — 102는 저장 값과 계산 값이 같아 <> 조건을 만족하지 않는다."
        },
        {
          "choiceId": "S1-TH34-03-C",
          "reason": "아무 행도 반환하지 않는다. — 할인 등 차이를 정당화할 다른 조건이 없고 101의 두 금액이 다르므로 한 행이 선택된다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S1-TH34-04",
    "lessonCode": "TH-34",
    "subject": 1,
    "title": "금액의 업무 의미가 달라졌을 때",
    "labUrl": "lab.html?episode=TH-34",
    "topic": "기본·설계·파생 속성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH34-04",
      "givens": "원고의 단순 금액 예제는 할인·세금·반올림이 없다는 조건이었다. 다른 업무의 `확정 결제 금액`은 할인과 세금 등을 반영하여 별도로 확정한 사실로 정의한다고 하자.",
      "givensHtml": "<p>원고의 단순 금액 예제는 할인·세금·반올림이 없다는 조건이었다. 다른 업무의 <code>확정 결제 금액</code>은 할인과 세금 등을 반영하여 별도로 확정한 사실로 정의한다고 하자.</p>\n",
      "stem": "확정 결제 금액이 현재의 수량×단가와 다를 때 가장 타당한 판단은?",
      "choices": [
        {
          "id": "S1-TH34-04-A",
          "text": "금액이라는 열 이름이 같으므로 원고와 생성 규칙도 반드시 같다."
        },
        {
          "id": "S1-TH34-04-B",
          "text": "저장된 값이므로 금액의 계산 규칙과 의미를 확인할 필요가 없다."
        },
        {
          "id": "S1-TH34-04-C",
          "text": "확정 결제 금액의 업무 정의와 계산·확정 시점을 먼저 확인해야 한다."
        },
        {
          "id": "S1-TH34-04-D",
          "text": "수량×단가와 다르면 업무 정의와 무관하게 모두 데이터 오류이다."
        }
      ],
      "answerId": "S1-TH34-04-C",
      "reason": "원고의 곱셈 비교는 할인·세금·반올림이 없는 조건에서만 그대로 적용된다. 실제 확정 결제 금액은 별도의 업무 정의를 가질 수 있으므로 차이의 원인을 판단하기 전에 그 정의와 적용 시점을 확인한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH34-04-A",
          "reason": "금액이라는 열 이름이 같으므로 원고와 생성 규칙도 반드시 같다. — 열 이름만으로 값이 생성되는 규칙이나 업무 의미를 확정할 수 없다."
        },
        {
          "choiceId": "S1-TH34-04-B",
          "reason": "저장된 값이므로 금액의 계산 규칙과 의미를 확인할 필요가 없다. — 저장 여부와 별개로 어떤 사실을 나타내는 값인지 정의해야 차이를 해석할 수 있다."
        },
        {
          "choiceId": "S1-TH34-04-D",
          "reason": "수량×단가와 다르면 업무 정의와 무관하게 모두 데이터 오류이다. — 할인·세금 등을 반영한 값이라는 조건을 무시하고 단순 예제의 식을 일반화했다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S1-TH35-01",
    "lessonCode": "TH-35",
    "subject": 1,
    "title": "수강 기록의 최소 식별 조합",
    "labUrl": "lab.html?episode=TH-35",
    "topic": "후보 키·슈퍼 키·최소성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH35-01",
      "givens": "한 학생은 여러 과목을 수강할 수 있고 한 과목은 여러 학생이 수강할 수 있다. 같은 학생·같은 과목 조합의 수강은 중복을 허용하지 않는다. student_name은 별도의 유일성 규칙을 갖지 않는 학생 이름 속성이다.\n\n|student_id|course_id|student_name|\n|---|---|---|\n|1|10|MIN|\n|1|20|MIN|\n|2|10|JUN|",
      "givensHtml": "<p>한 학생은 여러 과목을 수강할 수 있고 한 과목은 여러 학생이 수강할 수 있다. 같은 학생·같은 과목 조합의 수강은 중복을 허용하지 않는다. student_name은 별도의 유일성 규칙을 갖지 않는 학생 이름 속성이다.</p>\n<table>\n<thead>\n<tr>\n<th>student_id</th>\n<th>course_id</th>\n<th>student_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>10</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>1</td>\n<td>20</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>10</td>\n<td>JUN</td>\n</tr>\n</tbody>\n</table>\n",
      "stem": "업무 규칙과 표를 함께 볼 때 수강 기록의 후보 키로 적합한 것은?",
      "choices": [
        {
          "id": "S1-TH35-01-A",
          "text": "(student_id, course_id)"
        },
        {
          "id": "S1-TH35-01-B",
          "text": "student_id만"
        },
        {
          "id": "S1-TH35-01-C",
          "text": "course_id만"
        },
        {
          "id": "S1-TH35-01-D",
          "text": "student_name만"
        }
      ],
      "answerId": "S1-TH35-01-A",
      "reason": "후보 키는 유일성과 최소성을 모두 만족한다. 이 업무에서는 학생과 과목 조합의 중복을 금지하며, 학생만 또는 과목만으로는 수강 기록을 구분할 수 없으므로 두 열 조합이 후보 키다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH35-01-B",
          "reason": "student_id만 — 학생 1의 수강 기록이 두 행이므로 학생 번호만으로 수강 기록을 구분할 수 없다."
        },
        {
          "choiceId": "S1-TH35-01-C",
          "reason": "course_id만 — 과목 10에 학생 1과 2가 있으므로 과목 번호만으로 수강 기록을 구분할 수 없다."
        },
        {
          "choiceId": "S1-TH35-01-D",
          "reason": "student_name만 — MIN이 두 행이며 이름의 유일성 규칙도 없다. 이름만으로 수강 기록을 식별할 수 없다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      }
    ]
  },
  {
    "code": "S1-TH35-02",
    "lessonCode": "TH-35",
    "subject": 1,
    "title": "유일한 조합에 속성을 하나 더 붙이면",
    "labUrl": "lab.html?episode=TH-35",
    "topic": "후보 키·슈퍼 키·최소성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH35-02",
      "givens": "한 학생은 여러 과목을 수강할 수 있고 한 과목은 여러 학생이 수강할 수 있다. 같은 학생·같은 과목 조합의 수강은 중복을 허용하지 않는다. student_name은 별도의 유일성 규칙을 갖지 않는 학생 이름 속성이다.\n\n|student_id|course_id|student_name|\n|---|---|---|\n|1|10|MIN|\n|1|20|MIN|\n|2|10|JUN|",
      "givensHtml": "<p>한 학생은 여러 과목을 수강할 수 있고 한 과목은 여러 학생이 수강할 수 있다. 같은 학생·같은 과목 조합의 수강은 중복을 허용하지 않는다. student_name은 별도의 유일성 규칙을 갖지 않는 학생 이름 속성이다.</p>\n<table>\n<thead>\n<tr>\n<th>student_id</th>\n<th>course_id</th>\n<th>student_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>10</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>1</td>\n<td>20</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>10</td>\n<td>JUN</td>\n</tr>\n</tbody>\n</table>\n",
      "stem": "(student_id, course_id, student_name)의 키 성격을 바르게 설명한 것은?",
      "choices": [
        {
          "id": "S1-TH35-02-A",
          "text": "유일하기만 하면 후보 키이므로 이 세 열도 후보 키이다."
        },
        {
          "id": "S1-TH35-02-B",
          "text": "열이 세 개이면 슈퍼 키가 될 수 없다."
        },
        {
          "id": "S1-TH35-02-C",
          "text": "student_name이 중복되므로 세 열 조합 전체도 슈퍼 키가 아니다."
        },
        {
          "id": "S1-TH35-02-D",
          "text": "슈퍼 키이지만 student_name을 빼도 유일하므로 후보 키는 아니다."
        }
      ],
      "answerId": "S1-TH35-02-D",
      "reason": "학생·과목 조합이 유일한 상황에서 이름을 덧붙여도 식별은 가능하다. 다만 이름을 제거해도 식별되므로 세 열 조합은 최소 슈퍼 키인 후보 키가 아니다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH35-02-A",
          "reason": "유일하기만 하면 후보 키이므로 이 세 열도 후보 키이다. — 후보 키에는 유일성뿐 아니라 어느 구성 속성도 제거할 수 없다는 최소성이 필요하다."
        },
        {
          "choiceId": "S1-TH35-02-B",
          "reason": "열이 세 개이면 슈퍼 키가 될 수 없다. — 슈퍼 키의 열 수에는 이러한 제한이 없다. 유일하게 식별할 수 있는지가 기준이다."
        },
        {
          "choiceId": "S1-TH35-02-C",
          "reason": "student_name이 중복되므로 세 열 조합 전체도 슈퍼 키가 아니다. — 추가한 한 열의 중복과 전체 조합의 중복은 다르다. 학생·과목이 이미 유일하다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      }
    ]
  },
  {
    "code": "S1-TH35-03",
    "lessonCode": "TH-35",
    "subject": 1,
    "title": "중복 탐지 결과가 비어 있을 때",
    "labUrl": "lab.html?episode=TH-35",
    "topic": "후보 키·슈퍼 키·최소성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH35-03",
      "givens": "한 학생은 여러 과목을 수강할 수 있고 한 과목은 여러 학생이 수강할 수 있다. 같은 학생·같은 과목 조합의 수강은 중복을 허용하지 않는다. student_name은 별도의 유일성 규칙을 갖지 않는 학생 이름 속성이다.\n\n|student_id|course_id|student_name|\n|---|---|---|\n|1|10|MIN|\n|1|20|MIN|\n|2|10|JUN|\n\n```sql\nSELECT student_id, course_id, COUNT(*) AS cnt\nFROM enrollment\nGROUP BY student_id, course_id\nHAVING COUNT(*) > 1;\n```\n\n현재 자료에서는 결과가 0행이다.",
      "givensHtml": "<p>한 학생은 여러 과목을 수강할 수 있고 한 과목은 여러 학생이 수강할 수 있다. 같은 학생·같은 과목 조합의 수강은 중복을 허용하지 않는다. student_name은 별도의 유일성 규칙을 갖지 않는 학생 이름 속성이다.</p>\n<table>\n<thead>\n<tr>\n<th>student_id</th>\n<th>course_id</th>\n<th>student_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>10</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>1</td>\n<td>20</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>10</td>\n<td>JUN</td>\n</tr>\n</tbody>\n</table>\n<pre><code class=\"language-sql\">SELECT student_id, course_id, COUNT(*) AS cnt\nFROM enrollment\nGROUP BY student_id, course_id\nHAVING COUNT(*) &gt; 1;\n</code></pre>\n<p>현재 자료에서는 결과가 0행이다.</p>\n",
      "stem": "이 조회 결과가 직접 보장하는 범위는?",
      "choices": [
        {
          "id": "S1-TH35-03-A",
          "text": "GROUP BY를 실행했으므로 테이블에 UNIQUE 제약이 생성되었다."
        },
        {
          "id": "S1-TH35-03-B",
          "text": "현재 중복이 없으므로 최소성을 검토하지 않아도 후보 키가 확정된다."
        },
        {
          "id": "S1-TH35-03-C",
          "text": "현재 조회한 자료에 학생·과목 중복 조합이 없다는 것까지이다."
        },
        {
          "id": "S1-TH35-03-D",
          "text": "앞으로 어떤 행을 입력해도 학생·과목 조합은 중복되지 않는다."
        }
      ],
      "answerId": "S1-TH35-03-C",
      "reason": "HAVING COUNT(*) > 1이 반환할 조합이 없다는 것은 현재 표본에서 중복을 찾지 못했다는 뜻이다. 후보 키의 근거는 업무 규칙까지 포함해야 하며, 실제 입력을 막으려면 해당 규칙에 맞는 키·제약이 필요하다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH35-03-A",
          "reason": "GROUP BY를 실행했으므로 테이블에 UNIQUE 제약이 생성되었다. — 집계 SELECT는 제약을 생성하는 DDL이 아니다."
        },
        {
          "choiceId": "S1-TH35-03-B",
          "reason": "현재 중복이 없으므로 최소성을 검토하지 않아도 후보 키가 확정된다. — 후보 키를 판단하려면 허용 가능한 업무 상태의 유일성과 최소성을 검토해야 한다."
        },
        {
          "choiceId": "S1-TH35-03-D",
          "reason": "앞으로 어떤 행을 입력해도 학생·과목 조합은 중복되지 않는다. — 현재 SELECT 결과는 이후 INSERT를 제한하지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      }
    ]
  },
  {
    "code": "S1-TH35-04",
    "lessonCode": "TH-35",
    "subject": 1,
    "title": "최소성과 열 수의 최솟값",
    "labUrl": "lab.html?episode=TH-35",
    "topic": "후보 키·슈퍼 키·최소성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH35-04",
      "givens": "후보 키를 검토할 때 '최소성'을 판단하려 한다. 최소성은 구성 속성 중 일부를 제거해도 유일한지 검토하는 기준이다.",
      "givensHtml": "<p>후보 키를 검토할 때 '최소성'을 판단하려 한다. 최소성은 구성 속성 중 일부를 제거해도 유일한지 검토하는 기준이다.</p>\n",
      "stem": "후보 키의 최소성에 대한 설명으로 옳은 것은?",
      "choices": [
        {
          "id": "S1-TH35-04-A",
          "text": "후보 키는 항상 단일 열이어야 한다."
        },
        {
          "id": "S1-TH35-04-B",
          "text": "그 조합에서 어떤 속성을 빼도 유일성을 유지할 수 없어야 한다."
        },
        {
          "id": "S1-TH35-04-C",
          "text": "테이블에 있는 모든 후보 키 중 열 수가 가장 적은 조합만 후보 키이다."
        },
        {
          "id": "S1-TH35-04-D",
          "text": "유일성을 만족하면 불필요한 열을 추가해도 최소성은 유지된다."
        }
      ],
      "answerId": "S1-TH35-04-B",
      "reason": "'최소'는 구성 속성을 더 빼면 식별할 수 없다는 뜻이다. 서로 포함 관계가 아닌 후보 키는 열 수가 다를 수도 있다. 따라서 최소성을 단일 열 또는 전체 후보 키 중 최소 열 수와 동일시하지 않는다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH35-04-A",
          "reason": "후보 키는 항상 단일 열이어야 한다. — 여러 열을 모두 사용해야 유일해지는 복합 후보 키도 가능하다."
        },
        {
          "choiceId": "S1-TH35-04-C",
          "reason": "테이블에 있는 모든 후보 키 중 열 수가 가장 적은 조합만 후보 키이다. — 최소성은 그 조합의 부분 집합으로 줄일 수 있는지를 뜻한다. 전역적으로 가장 적은 열 수라는 뜻이 아니다."
        },
        {
          "choiceId": "S1-TH35-04-D",
          "reason": "유일성을 만족하면 불필요한 열을 추가해도 최소성은 유지된다. — 제거해도 유일한 열이 생기면 최소성을 잃는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      }
    ]
  },
  {
    "code": "S1-TH36-01",
    "lessonCode": "TH-36",
    "subject": 1,
    "title": "부모 키가 자식 식별자에 포함된 관계",
    "labUrl": "lab.html?episode=TH-36",
    "topic": "식별 관계·비식별 관계",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH36-01",
      "givens": "주문 안에서 line_no는 1부터 다시 부여한다.\n\n|order_id|line_no|\n|---|---|\n|10|1|\n|10|2|\n|20|1|\n\n부모는 주문이며 그 식별자는 order_id이다.\n\n주문 상세의 주 식별자를 `(order_id, line_no)`로 정했다.",
      "givensHtml": "<p>주문 안에서 line_no는 1부터 다시 부여한다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>line_no</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>10</td>\n<td>1</td>\n</tr>\n<tr>\n<td>10</td>\n<td>2</td>\n</tr>\n<tr>\n<td>20</td>\n<td>1</td>\n</tr>\n</tbody>\n</table>\n<p>부모는 주문이며 그 식별자는 order_id이다.</p>\n<p>주문 상세의 주 식별자를 <code>(order_id, line_no)</code>로 정했다.</p>\n",
      "stem": "이 관계를 식별 관계로 판단하는 직접적인 근거는?",
      "choices": [
        {
          "id": "S1-TH36-01-A",
          "text": "두 표의 열 이름에 모두 id가 들어간다."
        },
        {
          "id": "S1-TH36-01-B",
          "text": "자식 표의 모든 열이 NOT NULL이다."
        },
        {
          "id": "S1-TH36-01-C",
          "text": "주문 상세가 주문보다 행 수가 많다."
        },
        {
          "id": "S1-TH36-01-D",
          "text": "부모 주문의 식별자 order_id가 자식의 주 식별자에 포함된다."
        }
      ],
      "answerId": "S1-TH36-01-D",
      "reason": "주문 10의 1번 상세와 주문 20의 1번 상세를 구분하려면 이 설계에서는 주문 번호와 상세 순번을 함께 사용한다. 부모의 식별자 order_id가 자식의 주 식별자에 참여하므로 식별 관계다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH36-01-A",
          "reason": "두 표의 열 이름에 모두 id가 들어간다. — 열 이름은 키 제약이나 식별자 참여를 정하지 않는다."
        },
        {
          "choiceId": "S1-TH36-01-B",
          "reason": "자식 표의 모든 열이 NOT NULL이다. — 필수 입력 여부와 부모 키의 주 식별자 포함 여부는 별도 기준이다."
        },
        {
          "choiceId": "S1-TH36-01-C",
          "reason": "주문 상세가 주문보다 행 수가 많다. — 행 수나 일대다라는 최대 수만으로 식별 관계를 정하지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH36-02",
    "lessonCode": "TH-36",
    "subject": 1,
    "title": "독립 번호를 주 식별자로 고른 관계",
    "labUrl": "lab.html?episode=TH-36",
    "topic": "식별 관계·비식별 관계",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH36-02",
      "givens": "주문 안에서 line_no는 1부터 다시 부여한다.\n\n|order_id|line_no|\n|---|---|\n|10|1|\n|10|2|\n|20|1|\n\n부모는 주문이며 그 식별자는 order_id이다.\n\n다른 설계에서는 상세마다 line_id 101·102·103을 부여하고 주 식별자는 line_id만 사용한다. order_id는 부모 주문을 참조하는 외래 키로 남긴다.",
      "givensHtml": "<p>주문 안에서 line_no는 1부터 다시 부여한다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>line_no</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>10</td>\n<td>1</td>\n</tr>\n<tr>\n<td>10</td>\n<td>2</td>\n</tr>\n<tr>\n<td>20</td>\n<td>1</td>\n</tr>\n</tbody>\n</table>\n<p>부모는 주문이며 그 식별자는 order_id이다.</p>\n<p>다른 설계에서는 상세마다 line_id 101·102·103을 부여하고 주 식별자는 line_id만 사용한다. order_id는 부모 주문을 참조하는 외래 키로 남긴다.</p>\n",
      "stem": "이 다른 설계의 관계를 바르게 설명한 것은?",
      "choices": [
        {
          "id": "S1-TH36-02-A",
          "text": "주 식별자를 line_id로 바꾸면 부모·자식의 연결이 사라진다."
        },
        {
          "id": "S1-TH36-02-B",
          "text": "line_id가 숫자이므로 식별 관계이다."
        },
        {
          "id": "S1-TH36-02-C",
          "text": "order_id가 자식의 주 식별자에 포함되지 않으므로 비식별 관계이다."
        },
        {
          "id": "S1-TH36-02-D",
          "text": "외래 키가 하나라도 있으면 식별 관계이다."
        }
      ],
      "answerId": "S1-TH36-02-C",
      "reason": "부모를 참조하는 값과 자식을 식별하는 값은 역할이 다를 수 있다. 이 설계에서는 line_id가 자식을 식별하고 order_id는 부모 참조에만 쓰이므로 비식별 관계다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH36-02-A",
          "reason": "주 식별자를 line_id로 바꾸면 부모·자식의 연결이 사라진다. — order_id 외래 키를 유지하므로 참조 연결은 남는다."
        },
        {
          "choiceId": "S1-TH36-02-B",
          "reason": "line_id가 숫자이므로 식별 관계이다. — 자료형은 관계의 식별 여부를 결정하는 기준이 아니다."
        },
        {
          "choiceId": "S1-TH36-02-D",
          "reason": "외래 키가 하나라도 있으면 식별 관계이다. — 외래 키 존재만으로는 부족하다. 그 부모 키가 자식 주 식별자에 포함되는지 봐야 한다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH36-03",
    "lessonCode": "TH-36",
    "subject": 1,
    "title": "필수 외래 키와 식별 관계의 차이",
    "labUrl": "lab.html?episode=TH-36",
    "topic": "식별 관계·비식별 관계",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH36-03",
      "givens": "주문 상세의 주 식별자는 line_id 하나다. order_id에는 유효한 부모 주문을 참조하는 FOREIGN KEY와 NOT NULL 제약을 적용했다.",
      "givensHtml": "<p>주문 상세의 주 식별자는 line_id 하나다. order_id에는 유효한 부모 주문을 참조하는 FOREIGN KEY와 NOT NULL 제약을 적용했다.</p>\n",
      "stem": "이 조건에서 올바른 설명은?",
      "choices": [
        {
          "id": "S1-TH36-03-A",
          "text": "외래 키가 필수이므로 모든 주문에 상세가 한 개 이상 있어야 한다."
        },
        {
          "id": "S1-TH36-03-B",
          "text": "부모 참조는 필수지만 order_id가 주 식별자에 없으므로 비식별 관계이다."
        },
        {
          "id": "S1-TH36-03-C",
          "text": "order_id가 NULL이 될 수 없으므로 반드시 식별 관계이다."
        },
        {
          "id": "S1-TH36-03-D",
          "text": "비식별 관계이면 order_id에 NOT NULL을 줄 수 없다."
        }
      ],
      "answerId": "S1-TH36-03-B",
      "reason": "line_id만 주 식별자로 사용하는 설계는 order_id가 NOT NULL이어도 비식별 관계다. 부모 참조의 필수성, 부모 키의 자식 식별자 참여, 부모의 자식 최소 개수는 서로 구분해서 판단한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH36-03-A",
          "reason": "외래 키가 필수이므로 모든 주문에 상세가 한 개 이상 있어야 한다. — 자식의 참조 필수 조건은 자식에서 부모 방향이다. 모든 부모의 자식 존재를 강제하지 않는다."
        },
        {
          "choiceId": "S1-TH36-03-C",
          "reason": "order_id가 NULL이 될 수 없으므로 반드시 식별 관계이다. — NULL 허용 여부는 식별자 참여 여부와 다른 조건이다."
        },
        {
          "choiceId": "S1-TH36-03-D",
          "reason": "비식별 관계이면 order_id에 NOT NULL을 줄 수 없다. — 독립 주 식별자를 사용하면서 부모 참조를 필수로 둘 수 있다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH36-04",
    "lessonCode": "TH-36",
    "subject": 1,
    "title": "대리 번호와 상세 순번 중복",
    "labUrl": "lab.html?episode=TH-36",
    "topic": "식별 관계·비식별 관계",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH36-04",
      "givens": "주문 상세는 line_id 단독 기본 키로 식별하고 order_id 외래 키를 가진다. 업무에서는 같은 주문 안에서 line_no 중복을 허용하지 않는다.",
      "givensHtml": "<p>주문 상세는 line_id 단독 기본 키로 식별하고 order_id 외래 키를 가진다. 업무에서는 같은 주문 안에서 line_no 중복을 허용하지 않는다.</p>\n",
      "stem": "이 업무 규칙을 구현할 때 추가 검토가 필요한 것은?",
      "choices": [
        {
          "id": "S1-TH36-04-A",
          "text": "(order_id, line_no)의 업무 유일성을 별도 제약으로 보장할지 검토한다."
        },
        {
          "id": "S1-TH36-04-B",
          "text": "line_id 기본 키가 있으므로 주문별 line_no 중복도 자동으로 막힌다."
        },
        {
          "id": "S1-TH36-04-C",
          "text": "order_id가 외래 키이면 같은 주문에 상세를 하나만 넣을 수 있다."
        },
        {
          "id": "S1-TH36-04-D",
          "text": "line_no만 전체 테이블에서 유일하도록 바꿔야 한다."
        }
      ],
      "answerId": "S1-TH36-04-A",
      "reason": "독립 번호는 행 식별을 단순하게 할 수 있지만 업무 조합의 중복 방지까지 대신하지 않는다. 주문마다 상세 순번을 다시 부여한다는 규칙에 맞춰 order_id와 line_no 조합의 유일성을 별도로 검토해야 한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH36-04-B",
          "reason": "line_id 기본 키가 있으므로 주문별 line_no 중복도 자동으로 막힌다. — line_id의 유일성과 다른 열 조합의 유일성은 별개의 제약이다."
        },
        {
          "choiceId": "S1-TH36-04-C",
          "reason": "order_id가 외래 키이면 같은 주문에 상세를 하나만 넣을 수 있다. — 외래 키 자체는 여러 자식이 같은 부모를 참조하는 것을 금지하지 않는다."
        },
        {
          "choiceId": "S1-TH36-04-D",
          "reason": "line_no만 전체 테이블에서 유일하도록 바꿔야 한다. — 원고에서는 주문마다 순번을 다시 시작한다. 전체 순번 유일성은 주어진 업무 규칙보다 강한 다른 조건이다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH37-01",
    "lessonCode": "TH-37",
    "subject": 1,
    "title": "일대다의 최대 수와 선택 참여",
    "labUrl": "lab.html?episode=TH-37",
    "topic": "관계의 최대 수와 필수·선택 참여",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH37-01",
      "givens": "고객은 주문 없이도 등록할 수 있고 고객 한 명은 여러 주문을 할 수 있다. 고객 1·2·3이 있으며 주문 자료는 다음과 같다.\n\n|order_id|customer_id|amount|\n|---|---|---|\n|101|1|10|\n|102|1|20|\n|103|2|5|",
      "givensHtml": "<p>고객은 주문 없이도 등록할 수 있고 고객 한 명은 여러 주문을 할 수 있다. 고객 1·2·3이 있으며 주문 자료는 다음과 같다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n",
      "stem": "이 업무의 고객·주문 관계에 대한 설명으로 옳은 것은?",
      "choices": [
        {
          "id": "S1-TH37-01-A",
          "text": "주문 없는 고객이 있으므로 고객·주문은 일대다 관계일 수 없다."
        },
        {
          "id": "S1-TH37-01-B",
          "text": "주문 없는 고객이 있으므로 주문도 반드시 고객 없이 등록할 수 있다."
        },
        {
          "id": "S1-TH37-01-C",
          "text": "고객 1명에게 여러 주문이 가능하고, 고객 3처럼 주문이 0개인 고객도 허용된다."
        },
        {
          "id": "S1-TH37-01-D",
          "text": "일대다 관계이므로 고객 3도 반드시 주문을 한 개 이상 가져야 한다."
        }
      ],
      "answerId": "S1-TH37-01-C",
      "reason": "최대 수는 고객 한 명에게 주문이 몇 개까지 연결될 수 있는지를, 최소 수는 주문이 없어도 고객이 존재할 수 있는지를 나타낸다. 이 업무에서는 고객의 주문 수가 0개일 수도 여러 개일 수도 있다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH37-01-A",
          "reason": "주문 없는 고객이 있으므로 고객·주문은 일대다 관계일 수 없다. — 최소 0개를 허용하면서 최대 여러 개를 허용할 수 있다."
        },
        {
          "choiceId": "S1-TH37-01-B",
          "reason": "주문 없는 고객이 있으므로 주문도 반드시 고객 없이 등록할 수 있다. — 부모의 자식 존재 선택과 자식의 부모 참조 선택은 방향이 다르다."
        },
        {
          "choiceId": "S1-TH37-01-D",
          "reason": "일대다 관계이므로 고객 3도 반드시 주문을 한 개 이상 가져야 한다. — 일대다는 주로 최대 수를 나타낸다. 부모의 최소 자식 수는 별도로 정해야 한다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      }
    ]
  },
  {
    "code": "S1-TH37-02",
    "lessonCode": "TH-37",
    "subject": 1,
    "title": "자식의 참조 필수가 보장하는 방향",
    "labUrl": "lab.html?episode=TH-37",
    "topic": "관계의 최대 수와 필수·선택 참여",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH37-02",
      "givens": "고객은 주문 없이도 등록할 수 있고 고객 한 명은 여러 주문을 할 수 있다. 고객 1·2·3이 있으며 주문 자료는 다음과 같다.\n\n|order_id|customer_id|amount|\n|---|---|---|\n|101|1|10|\n|102|1|20|\n|103|2|5|\n\n주문 표의 customer_id에 NOT NULL과 유효한 부모 고객을 참조하는 FOREIGN KEY를 적용한다.",
      "givensHtml": "<p>고객은 주문 없이도 등록할 수 있고 고객 한 명은 여러 주문을 할 수 있다. 고객 1·2·3이 있으며 주문 자료는 다음과 같다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p>주문 표의 customer_id에 NOT NULL과 유효한 부모 고객을 참조하는 FOREIGN KEY를 적용한다.</p>\n",
      "stem": "이 제약의 효과로 옳은 것은?",
      "choices": [
        {
          "id": "S1-TH37-02-A",
          "text": "주문 번호가 유일해지므로 기본 키가 필요 없어지게 된다."
        },
        {
          "id": "S1-TH37-02-B",
          "text": "각 주문에는 존재하는 고객이 지정되어야 하지만 모든 고객의 주문 존재를 강제하지는 않는다."
        },
        {
          "id": "S1-TH37-02-C",
          "text": "모든 고객이 적어도 한 개의 주문을 갖게 된다."
        },
        {
          "id": "S1-TH37-02-D",
          "text": "한 고객은 최대 한 개의 주문만 가질 수 있게 된다."
        }
      ],
      "answerId": "S1-TH37-02-B",
      "reason": "주문 행을 등록할 때 고객 번호를 비워 두거나 없는 고객을 지정하는 일을 막는 조건이다. 이미 등록된 고객에게 주문이 하나도 없는 상태는 이 두 제약에 어긋나지 않는다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH37-02-A",
          "reason": "주문 번호가 유일해지므로 기본 키가 필요 없어지게 된다. — 고객 참조 제약은 주문 번호의 유일성을 보장하지 않는다."
        },
        {
          "choiceId": "S1-TH37-02-C",
          "reason": "모든 고객이 적어도 한 개의 주문을 갖게 된다. — 자식의 외래 키는 부모마다 자식이 존재하는지를 검사하는 제약이 아니다."
        },
        {
          "choiceId": "S1-TH37-02-D",
          "reason": "한 고객은 최대 한 개의 주문만 가질 수 있게 된다. — 외래 키와 NOT NULL만으로 customer_id의 중복을 금지하지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      }
    ]
  },
  {
    "code": "S1-TH37-03",
    "lessonCode": "TH-37",
    "subject": 1,
    "title": "주문 없는 고객과 고객 없는 주문",
    "labUrl": "lab.html?episode=TH-37",
    "topic": "관계의 최대 수와 필수·선택 참여",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH37-03",
      "givens": "고객은 주문이 없어도 등록할 수 있지만 주문에는 반드시 고객이 있어야 한다. 고객 표에는 1·2·3이 있다. 제약을 적용하기 전 점검용 주문 표본에는 (order_id=101, customer_id=1), (order_id=102, customer_id=NULL)이 있다.",
      "givensHtml": "<p>고객은 주문이 없어도 등록할 수 있지만 주문에는 반드시 고객이 있어야 한다. 고객 표에는 1·2·3이 있다. 제약을 적용하기 전 점검용 주문 표본에는 (order_id=101, customer_id=1), (order_id=102, customer_id=NULL)이 있다.</p>\n",
      "stem": "이 점검 표본에서 주문 측 필수 참여 규칙을 직접 위반하는 것은?",
      "choices": [
        {
          "id": "S1-TH37-03-A",
          "text": "고객이 지정되지 않은 주문 102"
        },
        {
          "id": "S1-TH37-03-B",
          "text": "주문이 없는 고객 3"
        },
        {
          "id": "S1-TH37-03-C",
          "text": "고객 1을 참조하는 주문 101"
        },
        {
          "id": "S1-TH37-03-D",
          "text": "두 주문 모두"
        }
      ],
      "answerId": "S1-TH37-03-A",
      "reason": "참여 방향을 먼저 읽는다. 주문 없는 고객은 허용하지만 고객 없는 주문은 허용하지 않는 조건이다. 따라서 customer_id가 NULL인 주문 102가 수정 대상이다. 실제 NOT NULL 제약을 적용한 뒤에는 이런 행을 그대로 입력할 수 없다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH37-03-B",
          "reason": "주문이 없는 고객 3 — 이 업무는 고객의 주문 선택 참여를 허용한다. 고객 3의 주문 0개는 허용된다."
        },
        {
          "choiceId": "S1-TH37-03-C",
          "reason": "고객 1을 참조하는 주문 101 — 존재하는 고객을 지정했으므로 제시된 필수 참조 규칙을 위반하지 않는다."
        },
        {
          "choiceId": "S1-TH37-03-D",
          "reason": "두 주문 모두 — 주문 101은 고객 1을 참조한다. NULL인 주문 102와 같은 위반으로 묶을 수 없다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      }
    ]
  },
  {
    "code": "S1-TH37-04",
    "lessonCode": "TH-37",
    "subject": 1,
    "title": "참조 열의 유일성과 관계의 최대 수",
    "labUrl": "lab.html?episode=TH-37",
    "topic": "관계의 최대 수와 필수·선택 참여",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH37-04",
      "givens": "원고의 일대다 모델과 비교할 대안 설계를 검토한다. 기존 3행 주문 표본을 사용하지 않고, 빈 주문 테이블에 order_id 기본 키와 customer_id의 NOT NULL·FOREIGN KEY·UNIQUE 제약을 유효하게 생성했다고 가정한다. 고객 테이블에는 고객을 주문 없이 등록할 수 있다.",
      "givensHtml": "<p>원고의 일대다 모델과 비교할 대안 설계를 검토한다. 기존 3행 주문 표본을 사용하지 않고, 빈 주문 테이블에 order_id 기본 키와 customer_id의 NOT NULL·FOREIGN KEY·UNIQUE 제약을 유효하게 생성했다고 가정한다. 고객 테이블에는 고객을 주문 없이 등록할 수 있다.</p>\n",
      "stem": "이 대안에서 제약이 허용하는 고객 한 명당 주문 수는?",
      "choices": [
        {
          "id": "S1-TH37-04-A",
          "text": "정확히 1개"
        },
        {
          "id": "S1-TH37-04-B",
          "text": "0개부터 여러 개까지"
        },
        {
          "id": "S1-TH37-04-C",
          "text": "외래 키가 있으므로 고객마다 반드시 2개 이상"
        },
        {
          "id": "S1-TH37-04-D",
          "text": "0개 또는 1개"
        }
      ],
      "answerId": "S1-TH37-04-D",
      "reason": "부모를 참조하는 자식 열에 유일성을 추가하면 한 부모를 여러 자식이 반복 참조할 수 없게 되어 고객당 최대 주문 수가 1로 제한된다. 그러나 주문이 없는 고객은 여전히 허용된다. 이 문항은 TH-37의 최대·최소 참여 구분에 TH-43의 단일 열 UNIQUE 동작을 적용한 대안 조건이며, 여러 주문을 허용한 원래 설계와 구분한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH37-04-A",
          "reason": "정확히 1개 — 각 주문의 고객이 필수라는 사실은 각 고객의 주문 존재가 필수라는 뜻이 아니다. 주문이 없는 고객도 허용된다."
        },
        {
          "choiceId": "S1-TH37-04-B",
          "reason": "0개부터 여러 개까지 — customer_id가 UNIQUE이므로 같은 고객 번호가 여러 주문 행에 반복될 수 없다. 원래 일대다와 최대 수가 달라진다."
        },
        {
          "choiceId": "S1-TH37-04-C",
          "reason": "외래 키가 있으므로 고객마다 반드시 2개 이상 — 외래 키는 부모 참조의 유효성을 검사한다. 자식 최소 수를 2로 만들지 않으며 UNIQUE와도 맞지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      }
    ]
  },
  {
    "code": "S1-TH38-01",
    "lessonCode": "TH-38",
    "subject": 1,
    "title": "복합 키의 일부에 대한 종속",
    "labUrl": "lab.html?episode=TH-38",
    "topic": "함수 종속·2정규형·3정규형",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH38-01",
      "givens": "다음 관계는 1정규형이며 후보 키는 (order_id, item_id) 하나라고 가정한다. 업무상 함수 종속은 다음과 같다.\n\n- order_id → customer_id\n- customer_id → customer_name\n- item_id → item_name\n- (order_id, item_id) → qty\n\n비키 속성은 customer_id, customer_name, item_name, qty이다.",
      "givensHtml": "<p>다음 관계는 1정규형이며 후보 키는 (order_id, item_id) 하나라고 가정한다. 업무상 함수 종속은 다음과 같다.</p>\n<ul>\n<li>order_id → customer_id</li>\n<li>customer_id → customer_name</li>\n<li>item_id → item_name</li>\n<li>(order_id, item_id) → qty</li>\n</ul>\n<p>비키 속성은 customer_id, customer_name, item_name, qty이다.</p>\n",
      "stem": "2정규형을 검토할 때 직접 제거해야 할 부분 함수 종속의 예는?",
      "choices": [
        {
          "id": "S1-TH38-01-A",
          "text": "부분 종속은 저장된 표에 중복 행이 있어야만 성립한다."
        },
        {
          "id": "S1-TH38-01-B",
          "text": "order_id → customer_id"
        },
        {
          "id": "S1-TH38-01-C",
          "text": "(order_id, item_id) → qty"
        },
        {
          "id": "S1-TH38-01-D",
          "text": "customer_id → customer_name만이 유일한 부분 종속이다."
        }
      ],
      "answerId": "S1-TH38-01-B",
      "reason": "복합 후보 키 전체가 아니라 그 일부가 비키 속성을 결정하면 부분 함수 종속이다. 이 예에서는 주문 번호만으로 고객이 정해지고 상품 번호만으로 상품명이 정해진다. 2정규형을 검토할 때 이 사실들을 주문·상품 관계로 분리한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH38-01-A",
          "reason": "부분 종속은 저장된 표에 중복 행이 있어야만 성립한다. — 함수 종속은 허용되는 데이터의 업무 규칙이다. 현재 행 중복의 유무만으로 결정하지 않는다."
        },
        {
          "choiceId": "S1-TH38-01-C",
          "reason": "(order_id, item_id) → qty — 주어진 규칙에서 qty는 복합 키 전체에 대응한다. 이 종속 자체는 키 일부에 대한 종속으로 제시되지 않았다."
        },
        {
          "choiceId": "S1-TH38-01-D",
          "reason": "customer_id → customer_name만이 유일한 부분 종속이다. — customer_id는 제시된 후보 키의 구성 부분이 아니다. 이는 주문 번호에서 이름으로 이어지는 이행 종속 경로에 해당한다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      },
      {
        "title": "Carnegie Mellon 15-415 · Normalization I (pp. 92, 101–102)",
        "url": "https://www.andrew.cmu.edu/course/15-415-f11/applications/ln/lecture21.pdf"
      }
    ]
  },
  {
    "code": "S1-TH38-02",
    "lessonCode": "TH-38",
    "subject": 1,
    "title": "단일 열 키여도 남는 이행 종속",
    "labUrl": "lab.html?episode=TH-38",
    "topic": "함수 종속·2정규형·3정규형",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH38-02",
      "givens": "관계 Orders(order_id, customer_id, customer_name)의 후보 키는 order_id 하나뿐이다. 업무상 order_id → customer_id, customer_id → customer_name이 성립하고 한 고객은 여러 주문을 할 수 있다. 고객 이름은 키 속성이 아니다.",
      "givensHtml": "<p>관계 Orders(order_id, customer_id, customer_name)의 후보 키는 order_id 하나뿐이다. 업무상 order_id → customer_id, customer_id → customer_name이 성립하고 한 고객은 여러 주문을 할 수 있다. 고객 이름은 키 속성이 아니다.</p>\n",
      "stem": "이 관계의 정규화 상태에 대한 판단으로 옳은 것은?",
      "choices": [
        {
          "id": "S1-TH38-02-A",
          "text": "단일 열 키의 부분 종속은 없지만 customer_id를 거친 이행 종속 때문에 3정규형을 만족하지 않는다."
        },
        {
          "id": "S1-TH38-02-B",
          "text": "후보 키가 한 열이면 어떤 함수 종속이 있더라도 반드시 3정규형이다."
        },
        {
          "id": "S1-TH38-02-C",
          "text": "customer_id가 다른 값을 결정하므로 자동으로 후보 키가 된다."
        },
        {
          "id": "S1-TH38-02-D",
          "text": "customer_name을 order_id 옆으로 옮겨 놓으면 함수 종속이 제거된다."
        }
      ],
      "answerId": "S1-TH38-02-A",
      "reason": "주문 번호로 고객이 정해지고 그 고객으로 이름이 정해진다. 고객 정보가 주문마다 반복되는 이행 종속이다. Order(order_id, customer_id)와 Customer(customer_id, customer_name)를 구분하여 고객 이름을 고객 관계에서 관리할 수 있다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH38-02-B",
          "reason": "후보 키가 한 열이면 어떤 함수 종속이 있더라도 반드시 3정규형이다. — 단일 열 키는 이 예의 부분 종속 문제를 없앨 뿐 비키 속성 사이의 종속까지 없애지 않는다."
        },
        {
          "choiceId": "S1-TH38-02-C",
          "reason": "customer_id가 다른 값을 결정하므로 자동으로 후보 키가 된다. — 한 고객의 여러 주문을 허용하므로 customer_id로 주문 행을 유일하게 식별할 수 없다."
        },
        {
          "choiceId": "S1-TH38-02-D",
          "reason": "customer_name을 order_id 옆으로 옮겨 놓으면 함수 종속이 제거된다. — 열 표시 순서는 업무상 결정 관계를 바꾸지 않는다. 고객 사실을 별도 관계로 분리하는 등의 구조 검토가 필요하다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      },
      {
        "title": "Carnegie Mellon 15-415 · Normalization I (pp. 92, 101–102)",
        "url": "https://www.andrew.cmu.edu/course/15-415-f11/applications/ln/lecture21.pdf"
      }
    ]
  },
  {
    "code": "S1-TH38-03",
    "lessonCode": "TH-38",
    "subject": 1,
    "title": "고객 이름 불일치 표본 찾기",
    "labUrl": "lab.html?episode=TH-38",
    "topic": "함수 종속·2정규형·3정규형",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH38-03",
      "givens": "업무상 customer_id → customer_name이어야 한다. 점검 자료는 다음과 같다.\n\n|order_id|item_id|item_name|customer_id|customer_name|qty|\n|---|---|---|---|---|---|\n|1|10|COFFEE|1|MIN|1|\n|1|20|TEA|1|MIN|2|\n|2|10|COFFEE|1|MINTY|1|\n\n```sql\nSELECT customer_id, COUNT(DISTINCT customer_name) AS name_kinds\nFROM order_lines\nGROUP BY customer_id\nHAVING COUNT(DISTINCT customer_name) > 1;\n```",
      "givensHtml": "<p>업무상 customer_id → customer_name이어야 한다. 점검 자료는 다음과 같다.</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>item_id</th>\n<th>item_name</th>\n<th>customer_id</th>\n<th>customer_name</th>\n<th>qty</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>10</td>\n<td>COFFEE</td>\n<td>1</td>\n<td>MIN</td>\n<td>1</td>\n</tr>\n<tr>\n<td>1</td>\n<td>20</td>\n<td>TEA</td>\n<td>1</td>\n<td>MIN</td>\n<td>2</td>\n</tr>\n<tr>\n<td>2</td>\n<td>10</td>\n<td>COFFEE</td>\n<td>1</td>\n<td>MINTY</td>\n<td>1</td>\n</tr>\n</tbody>\n</table>\n<pre><code class=\"language-sql\">SELECT customer_id, COUNT(DISTINCT customer_name) AS name_kinds\nFROM order_lines\nGROUP BY customer_id\nHAVING COUNT(DISTINCT customer_name) &gt; 1;\n</code></pre>\n",
      "stem": "점검 쿼리의 결과와 그 의미로 옳은 것은?",
      "choices": [
        {
          "id": "S1-TH38-03-A",
          "text": "(1, 3) 한 행이며, 수량의 합이 3이라는 뜻이다."
        },
        {
          "id": "S1-TH38-03-B",
          "text": "0행이며, 같은 고객이 주문을 여러 번 했으므로 이름도 달라도 된다."
        },
        {
          "id": "S1-TH38-03-C",
          "text": "(1, 2) 한 행이므로 다른 모든 함수 종속과 정규형도 자동으로 증명된다."
        },
        {
          "id": "S1-TH38-03-D",
          "text": "(1, 2) 한 행이며, 같은 고객 1에 서로 다른 이름이 기록된 상태를 찾는다."
        }
      ],
      "answerId": "S1-TH38-03-D",
      "reason": "고객 1에 MIN 두 행과 MINTY 한 행이 있으므로 서로 다른 이름은 두 개다. 이 결과는 제시한 고객 번호→이름 규칙을 어긴 표본을 찾는 증거이며, 이 검사 하나가 모든 정규형을 입증하지는 않는다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH38-03-A",
          "reason": "(1, 3) 한 행이며, 수량의 합이 3이라는 뜻이다. — 집계 대상은 수량이나 행 수가 아니라 서로 다른 customer_name이다. 수량의 합도 이 자료에서는 4다."
        },
        {
          "choiceId": "S1-TH38-03-B",
          "reason": "0행이며, 같은 고객이 주문을 여러 번 했으므로 이름도 달라도 된다. — 고객 이름이 고객 번호로 결정된다는 주어진 규칙 아래에서는 주문이 다르다는 이유로 다른 이름을 허용하지 않는다."
        },
        {
          "choiceId": "S1-TH38-03-C",
          "reason": "(1, 2) 한 행이므로 다른 모든 함수 종속과 정규형도 자동으로 증명된다. — 이 쿼리는 고객별 이름 종류만 검사한다. 다른 종속·후보 키·전체 정규형을 검증하지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      },
      {
        "title": "Carnegie Mellon 15-415 · Normalization I (pp. 92, 101–102)",
        "url": "https://www.andrew.cmu.edu/course/15-415-f11/applications/ln/lecture21.pdf"
      }
    ]
  },
  {
    "code": "S1-TH38-04",
    "lessonCode": "TH-38",
    "subject": 1,
    "title": "관계를 분리한 뒤에도 필요한 연결",
    "labUrl": "lab.html?episode=TH-38",
    "topic": "함수 종속·2정규형·3정규형",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH38-04",
      "givens": "다음 관계는 1정규형이며 후보 키는 (order_id, item_id) 하나라고 가정한다. 업무상 함수 종속은 다음과 같다.\n\n- order_id → customer_id\n- customer_id → customer_name\n- item_id → item_name\n- (order_id, item_id) → qty\n\n비키 속성은 customer_id, customer_name, item_name, qty이다.\n\n이를 Customer(customer_id, customer_name), Orders(order_id, customer_id), Item(item_id, item_name), OrderLine(order_id, item_id, qty)으로 분리한다.",
      "givensHtml": "<p>다음 관계는 1정규형이며 후보 키는 (order_id, item_id) 하나라고 가정한다. 업무상 함수 종속은 다음과 같다.</p>\n<ul>\n<li>order_id → customer_id</li>\n<li>customer_id → customer_name</li>\n<li>item_id → item_name</li>\n<li>(order_id, item_id) → qty</li>\n</ul>\n<p>비키 속성은 customer_id, customer_name, item_name, qty이다.</p>\n<p>이를 Customer(customer_id, customer_name), Orders(order_id, customer_id), Item(item_id, item_name), OrderLine(order_id, item_id, qty)으로 분리한다.</p>\n",
      "stem": "이 분리의 목적과 결과를 바르게 설명한 것은?",
      "choices": [
        {
          "id": "S1-TH38-04-A",
          "text": "표 수가 늘어났으므로 모든 조회가 항상 빨라진다."
        },
        {
          "id": "S1-TH38-04-B",
          "text": "관계를 분리하면 고객 번호와 고객 이름의 업무 규칙을 더 이상 정의할 필요가 없다."
        },
        {
          "id": "S1-TH38-04-C",
          "text": "고객 이름을 고객 관계에서 관리하여 반복 수정을 줄이고, 주문 상세 화면에는 필요한 관계를 조인한다."
        },
        {
          "id": "S1-TH38-04-D",
          "text": "정규화하면 주문·고객·상품을 연결하는 조인이 모두 사라진다."
        }
      ],
      "answerId": "S1-TH38-04-C",
      "reason": "정규화는 어떤 사실을 어느 키에 종속시켜 저장할지 정리한다. 고객 이름을 고객 관계에서 한 번 관리하면 주문마다 이름을 고쳐야 하는 문제를 줄일 수 있다. 원래처럼 주문·상품·고객을 함께 보여 줄 때는 관계를 조인하며 속도는 따로 평가한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH38-04-A",
          "reason": "표 수가 늘어났으므로 모든 조회가 항상 빨라진다. — 성능은 데이터와 조회·실행 계획 등에 달려 있다. 분리만으로 모든 조회의 속도를 보장할 수 없다."
        },
        {
          "choiceId": "S1-TH38-04-B",
          "reason": "관계를 분리하면 고객 번호와 고객 이름의 업무 규칙을 더 이상 정의할 필요가 없다. — 어떤 사실을 분리할지 결정하는 근거가 바로 후보 키와 함수 종속 등 업무 규칙이다."
        },
        {
          "choiceId": "S1-TH38-04-D",
          "reason": "정규화하면 주문·고객·상품을 연결하는 조인이 모두 사라진다. — 분리된 정보가 함께 필요하면 조인이 필요하다. 정규화의 목적이 조인 제거는 아니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "UC Berkeley CS186 · Database Design",
        "url": "https://cs186berkeley.net/notes/note13/"
      },
      {
        "title": "Carnegie Mellon 15-415 · Normalization I (pp. 92, 101–102)",
        "url": "https://www.andrew.cmu.edu/course/15-415-f11/applications/ln/lecture21.pdf"
      }
    ]
  },
  {
    "code": "S1-TH39-01",
    "lessonCode": "TH-39",
    "subject": 1,
    "title": "서로 다른 청구 번호가 놓치는 중복",
    "labUrl": "lab.html?episode=TH-39",
    "topic": "인조 식별자와 업무 유일성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH39-01",
      "givens": "고객별 같은 청구월에는 청구를 한 번만 허용한다. invoice_id는 행마다 새로 부여하는 기본 키다. bill_month는 이 예제의 정수 코드이다.\n\n|invoice_id|customer_id|bill_month|\n|---|---|---|\n|101|1|202610|\n|102|1|202610|\n|103|2|202610|",
      "givensHtml": "<p>고객별 같은 청구월에는 청구를 한 번만 허용한다. invoice_id는 행마다 새로 부여하는 기본 키다. bill_month는 이 예제의 정수 코드이다.</p>\n<table>\n<thead>\n<tr>\n<th>invoice_id</th>\n<th>customer_id</th>\n<th>bill_month</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>202610</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>202610</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>202610</td>\n</tr>\n</tbody>\n</table>\n",
      "stem": "invoice_id가 세 행 모두 다르다는 사실만으로 보장되는 것은?",
      "choices": [
        {
          "id": "S1-TH39-01-A",
          "text": "청구 번호는 서로 다르지만 고객·청구월의 업무 중복은 남을 수 있다."
        },
        {
          "id": "S1-TH39-01-B",
          "text": "고객 1·202610의 청구는 반드시 한 건뿐이다."
        },
        {
          "id": "S1-TH39-01-C",
          "text": "invoice_id가 다르므로 101과 102는 반드시 서로 다른 고객의 청구이다."
        },
        {
          "id": "S1-TH39-01-D",
          "text": "기본 키가 존재하면 다른 업무 유일성 규칙은 불필요하다."
        }
      ],
      "answerId": "S1-TH39-01-A",
      "reason": "행을 구분하는 번호와 업무에서 중복으로 보는 기준은 다르다. invoice_id는 101·102·103으로 모두 유일하지만 고객 1의 202610 청구가 두 번 저장되어 주어진 업무 규칙에 어긋난다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH39-01-B",
          "reason": "고객 1·202610의 청구는 반드시 한 건뿐이다. — 실제로 그 조합을 가진 행이 두 개다. 인조 번호의 유일성은 업무 조합의 유일성을 대신하지 않는다."
        },
        {
          "choiceId": "S1-TH39-01-C",
          "reason": "invoice_id가 다르므로 101과 102는 반드시 서로 다른 고객의 청구이다. — 주어진 표에서 두 행의 customer_id는 모두 1이다."
        },
        {
          "choiceId": "S1-TH39-01-D",
          "reason": "기본 키가 존재하면 다른 업무 유일성 규칙은 불필요하다. — 기본 키와 별도로 금지해야 하는 업무 조합이 있으면 해당 규칙을 구현해야 한다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH39-02",
    "lessonCode": "TH-39",
    "subject": 1,
    "title": "업무 조합으로 중복 찾기",
    "labUrl": "lab.html?episode=TH-39",
    "topic": "인조 식별자와 업무 유일성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH39-02",
      "givens": "고객별 같은 청구월에는 청구를 한 번만 허용한다. invoice_id는 행마다 새로 부여하는 기본 키다. bill_month는 이 예제의 정수 코드이다.\n\n|invoice_id|customer_id|bill_month|\n|---|---|---|\n|101|1|202610|\n|102|1|202610|\n|103|2|202610|\n\n```sql\nSELECT customer_id, bill_month, COUNT(*) AS cnt\nFROM invoices\nGROUP BY customer_id, bill_month\nHAVING COUNT(*) > 1;\n```",
      "givensHtml": "<p>고객별 같은 청구월에는 청구를 한 번만 허용한다. invoice_id는 행마다 새로 부여하는 기본 키다. bill_month는 이 예제의 정수 코드이다.</p>\n<table>\n<thead>\n<tr>\n<th>invoice_id</th>\n<th>customer_id</th>\n<th>bill_month</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>202610</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>202610</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>202610</td>\n</tr>\n</tbody>\n</table>\n<pre><code class=\"language-sql\">SELECT customer_id, bill_month, COUNT(*) AS cnt\nFROM invoices\nGROUP BY customer_id, bill_month\nHAVING COUNT(*) &gt; 1;\n</code></pre>\n",
      "stem": "이 중복 점검 쿼리의 결과는?",
      "choices": [
        {
          "id": "S1-TH39-02-A",
          "text": "(101, 202610, 2) 한 행"
        },
        {
          "id": "S1-TH39-02-B",
          "text": "(2, 202610, 1) 한 행"
        },
        {
          "id": "S1-TH39-02-C",
          "text": "아무 행도 반환하지 않는다."
        },
        {
          "id": "S1-TH39-02-D",
          "text": "(1, 202610, 2) 한 행"
        }
      ],
      "answerId": "S1-TH39-02-D",
      "reason": "GROUP BY가 업무 중복의 단위를 정한다. 이 문제의 단위는 고객·청구월이므로 청구 번호가 달라도 같은 그룹으로 묶인다. 그중 고객 1·202610만 건수가 2라서 선택된다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH39-02-A",
          "reason": "(101, 202610, 2) 한 행 — 첫 출력 열은 invoice_id가 아니라 customer_id다. 101은 청구 번호다."
        },
        {
          "choiceId": "S1-TH39-02-B",
          "reason": "(2, 202610, 1) 한 행 — 고객 2의 조합은 한 번뿐이므로 COUNT(*) > 1을 만족하지 않는다."
        },
        {
          "choiceId": "S1-TH39-02-C",
          "reason": "아무 행도 반환하지 않는다. — 그룹 기준은 유일한 청구 번호가 아니라 customer_id와 bill_month다. 중복 조합이 하나 있다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH39-03",
    "lessonCode": "TH-39",
    "subject": 1,
    "title": "인조 키와 업무 제약을 함께 적용하기",
    "labUrl": "lab.html?episode=TH-39",
    "topic": "인조 식별자와 업무 유일성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH39-03",
      "givens": "고객별 청구월마다 한 번만 청구한다. 각 청구는 고객과 청구월이 반드시 있어야 한다. 새 자료를 Oracle 테이블에 입력할 때 invoice_id를 기본 키로 유지한다.",
      "givensHtml": "<p>고객별 청구월마다 한 번만 청구한다. 각 청구는 고객과 청구월이 반드시 있어야 한다. 새 자료를 Oracle 테이블에 입력할 때 invoice_id를 기본 키로 유지한다.</p>\n",
      "stem": "이 업무 규칙을 함께 구현하는 제약 조합으로 가장 적절한 것은?",
      "choices": [
        {
          "id": "S1-TH39-03-A",
          "text": "bill_month에만 UNIQUE를 둔다."
        },
        {
          "id": "S1-TH39-03-B",
          "text": "invoice_id 기본 키만 두고 두 업무 열에는 아무 제약도 두지 않는다."
        },
        {
          "id": "S1-TH39-03-C",
          "text": "customer_id와 bill_month 각각에 NOT NULL, 두 열 조합에 UNIQUE를 둔다."
        },
        {
          "id": "S1-TH39-03-D",
          "text": "customer_id에만 UNIQUE를 둔다."
        }
      ],
      "answerId": "S1-TH39-03-C",
      "reason": "인조 키는 행 식별을 맡고, NOT NULL은 필수 업무 값의 누락을, 복합 UNIQUE는 같은 고객·청구월의 반복을 막는다. Oracle에서 UNIQUE만으로 필수 입력을 대신한다고 가정하지 않고 필수성도 명시한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH39-03-A",
          "reason": "bill_month에만 UNIQUE를 둔다. — 같은 월에 다른 고객도 청구할 수 있으므로 월 하나의 유일성은 업무 규칙과 맞지 않는다."
        },
        {
          "choiceId": "S1-TH39-03-B",
          "reason": "invoice_id 기본 키만 두고 두 업무 열에는 아무 제약도 두지 않는다. — 서로 다른 번호를 부여한 업무 중복과 고객·월의 누락을 방지할 수 없다."
        },
        {
          "choiceId": "S1-TH39-03-D",
          "reason": "customer_id에만 UNIQUE를 둔다. — 한 고객의 다음 달 청구까지 막으므로 '고객별 청구월 1회'보다 강한 잘못된 조건이다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH39-04",
    "lessonCode": "TH-39",
    "subject": 1,
    "title": "충돌을 해소한 표본의 검증 범위",
    "labUrl": "lab.html?episode=TH-39",
    "topic": "인조 식별자와 업무 유일성",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH39-04",
      "givens": "고객별 같은 청구월에는 청구를 한 번만 허용한다. invoice_id는 행마다 새로 부여하는 기본 키다. bill_month는 이 예제의 정수 코드이다.\n\n|invoice_id|customer_id|bill_month|\n|---|---|---|\n|101|1|202610|\n|102|1|202610|\n|103|2|202610|\n\ninvoice_id 102의 bill_month만 202611로 바꾸고 같은 고객·청구월 중복 조회를 다시 실행한다.",
      "givensHtml": "<p>고객별 같은 청구월에는 청구를 한 번만 허용한다. invoice_id는 행마다 새로 부여하는 기본 키다. bill_month는 이 예제의 정수 코드이다.</p>\n<table>\n<thead>\n<tr>\n<th>invoice_id</th>\n<th>customer_id</th>\n<th>bill_month</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>202610</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>202610</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>202610</td>\n</tr>\n</tbody>\n</table>\n<p>invoice_id 102의 bill_month만 202611로 바꾸고 같은 고객·청구월 중복 조회를 다시 실행한다.</p>\n",
      "stem": "조회 결과와 해석으로 옳은 것은?",
      "choices": [
        {
          "id": "S1-TH39-04-A",
          "text": "같은 고객의 행이 두 개이므로 서로 다른 월이어도 규칙 위반이다."
        },
        {
          "id": "S1-TH39-04-B",
          "text": "중복 그룹은 0개가 되지만 향후 중복 입력 방지는 별도 제약으로 보장해야 한다."
        },
        {
          "id": "S1-TH39-04-C",
          "text": "중복 그룹은 여전히 1개이며 청구 번호 101과 102가 원인이다."
        },
        {
          "id": "S1-TH39-04-D",
          "text": "중복 그룹이 0개이면 이미 UNIQUE 제약이 생성된 것이다."
        }
      ],
      "answerId": "S1-TH39-04-B",
      "reason": "102의 월을 바꾸면 현재 중복은 해소된다. 다만 지금 중복이 없다는 검사와 앞으로도 중복이 입력되지 않도록 하는 제약은 다른 단계다. 두 가지를 모두 확인해야 한다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH39-04-A",
          "reason": "같은 고객의 행이 두 개이므로 서로 다른 월이어도 규칙 위반이다. — 한 고객이 여러 월에 청구받는 것은 허용한다. 금지한 것은 같은 고객의 같은 월 중복이다."
        },
        {
          "choiceId": "S1-TH39-04-C",
          "reason": "중복 그룹은 여전히 1개이며 청구 번호 101과 102가 원인이다. — 중복 조회의 기준은 청구 번호가 아니라 고객·월이다. 바꾼 후 두 행은 서로 다른 월이다."
        },
        {
          "choiceId": "S1-TH39-04-D",
          "reason": "중복 그룹이 0개이면 이미 UNIQUE 제약이 생성된 것이다. — UPDATE나 현재 값의 변경과 중복 SELECT는 UNIQUE 제약을 자동 생성하지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S1-TH40-01",
    "lessonCode": "TH-40",
    "subject": 1,
    "title": "모델 단계마다 정하는 것",
    "labUrl": "lab.html?episode=TH-40",
    "topic": "개념·논리·물리 모델",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH40-01",
      "givens": "고객과 주문을 관리하는 시스템을 설계한다. 이 문제는 원고의 구분처럼 개념 모델은 관리 대상과 관계, 논리 모델은 속성·식별자·구조, 물리 모델은 특정 DBMS 구현을 다룬다.",
      "givensHtml": "<p>고객과 주문을 관리하는 시스템을 설계한다. 이 문제는 원고의 구분처럼 개념 모델은 관리 대상과 관계, 논리 모델은 속성·식별자·구조, 물리 모델은 특정 DBMS 구현을 다룬다.</p>\n",
      "stem": "다음 판단을 개념·논리·물리 단계에 순서대로 대응시킨 것은?",
      "choices": [
        {
          "id": "S1-TH40-01-A",
          "text": "Oracle 인덱스를 정함 · 고객을 관리할지 정함 · 고객과 주문의 업무 관계를 정함"
        },
        {
          "id": "S1-TH40-01-B",
          "text": "VARCHAR2 길이를 정함 · Oracle 저장 방식을 정함 · 주문이라는 관리 대상을 정함"
        },
        {
          "id": "S1-TH40-01-C",
          "text": "고객과 주문의 관계를 정함 · Oracle NUMBER(6)과 제약 DDL을 정함 · 주문의 업무 식별자를 정함"
        },
        {
          "id": "S1-TH40-01-D",
          "text": "고객과 주문의 관계를 정함 · 주문의 식별자를 정함 · Oracle의 자료형과 제약 DDL을 정함"
        }
      ],
      "answerId": "S1-TH40-01-D",
      "reason": "개념 단계에서 무엇을 관리하고 어떻게 연결할지 정한 뒤, 논리 단계에서 그 대상을 속성·식별자 등 구조로 구체화한다. 물리 단계에서는 특정 DBMS가 제공하는 자료형과 제약·접근 구조로 구현한다. 도구마다 명칭과 작업 경계에는 차이가 있을 수 있다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH40-01-A",
          "reason": "Oracle 인덱스를 정함 · 고객을 관리할지 정함 · 고객과 주문의 업무 관계를 정함 — 인덱스는 물리 구현 판단이며 업무 대상과 관계는 개념 단계의 중심이다. 순서가 뒤섞였다."
        },
        {
          "choiceId": "S1-TH40-01-B",
          "reason": "VARCHAR2 길이를 정함 · Oracle 저장 방식을 정함 · 주문이라는 관리 대상을 정함 — 특정 DBMS의 형식과 저장 결정은 물리 단계이고 관리 대상은 개념 단계다."
        },
        {
          "choiceId": "S1-TH40-01-C",
          "reason": "고객과 주문의 관계를 정함 · Oracle NUMBER(6)과 제약 DDL을 정함 · 주문의 업무 식별자를 정함 — 논리 단계에서 정하는 식별 구조와 물리 단계에서 정하는 DBMS 자료형·DDL의 순서를 뒤바꾸었다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "CREATE-TABLE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CREATE-TABLE.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html"
      }
    ]
  },
  {
    "code": "S1-TH40-02",
    "lessonCode": "TH-40",
    "subject": 1,
    "title": "식별 속성과 Oracle 자료형의 결정",
    "labUrl": "lab.html?episode=TH-40",
    "topic": "개념·논리·물리 모델",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH40-02",
      "givens": "고객을 customer_id로 구분하기로 정한 뒤 Oracle 구현에서 그 열을 NUMBER(6)으로 정한다. 이 예제의 NUMBER(6)는 정해 둔 번호 범위에 맞춘 구현 선택이다.",
      "givensHtml": "<p>고객을 customer_id로 구분하기로 정한 뒤 Oracle 구현에서 그 열을 NUMBER(6)으로 정한다. 이 예제의 NUMBER(6)는 정해 둔 번호 범위에 맞춘 구현 선택이다.</p>\n",
      "stem": "두 결정의 차이를 바르게 설명한 것은?",
      "choices": [
        {
          "id": "S1-TH40-02-A",
          "text": "고객 번호는 모든 업무에서 NUMBER(6)여야 한다."
        },
        {
          "id": "S1-TH40-02-B",
          "text": "NUMBER(6)를 선택하면 어떤 속성이 고객을 식별하는지 검토할 필요가 없다."
        },
        {
          "id": "S1-TH40-02-C",
          "text": "무엇으로 고객을 구분할지는 논리 구조의 결정이고 NUMBER(6)는 Oracle의 물리 표현을 정하는 결정이다."
        },
        {
          "id": "S1-TH40-02-D",
          "text": "customer_id라는 이름만 쓰면 Oracle이 자동으로 기본 키와 NUMBER(6)를 만든다."
        }
      ],
      "answerId": "S1-TH40-02-C",
      "reason": "고객 번호라는 속성을 식별에 사용한다는 뜻과 그 값을 Oracle의 어느 자료형으로 표현한다는 뜻은 다르다. NUMBER(6)는 원고 예제의 구현 조건이며 다른 업무의 모든 고객 번호에 적용할 보편 규칙이 아니다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH40-02-A",
          "reason": "고객 번호는 모든 업무에서 NUMBER(6)여야 한다. — 자리 범위와 값의 형태는 해당 업무 조건과 DBMS 구현에 맞춰 검토해야 한다."
        },
        {
          "choiceId": "S1-TH40-02-B",
          "reason": "NUMBER(6)를 선택하면 어떤 속성이 고객을 식별하는지 검토할 필요가 없다. — 자료형은 값의 표현을 정할 뿐 업무상의 식별 규칙을 대신하지 않는다."
        },
        {
          "choiceId": "S1-TH40-02-D",
          "reason": "customer_id라는 이름만 쓰면 Oracle이 자동으로 기본 키와 NUMBER(6)를 만든다. — 열 이름 자체가 자료형이나 키 제약을 생성하지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "CREATE-TABLE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CREATE-TABLE.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html"
      }
    ]
  },
  {
    "code": "S1-TH40-03",
    "lessonCode": "TH-40",
    "subject": 1,
    "title": "조회용 표본과 실제 제약 생성",
    "labUrl": "lab.html?episode=TH-40",
    "topic": "개념·논리·물리 모델",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH40-03",
      "givens": "원고의 첫 예제는 WITH customers와 WITH orders로 만든 임시 조회 자료를 조인한다. 비교 예제는 CREATE TABLE에 PRIMARY KEY, NOT NULL, REFERENCES를 적어 Oracle 표를 정의한다.",
      "givensHtml": "<p>원고의 첫 예제는 WITH customers와 WITH orders로 만든 임시 조회 자료를 조인한다. 비교 예제는 CREATE TABLE에 PRIMARY KEY, NOT NULL, REFERENCES를 적어 Oracle 표를 정의한다.</p>\n",
      "stem": "두 예제의 차이를 바르게 설명한 것은?",
      "choices": [
        {
          "id": "S1-TH40-03-A",
          "text": "CREATE TABLE에 PRIMARY KEY를 적어도 실제 제약은 생기지 않고 화면 설명만 바뀐다."
        },
        {
          "id": "S1-TH40-03-B",
          "text": "WITH 조인은 연결 결과를 보여 주며, 실제 키·참조 제약 생성은 해당 CREATE TABLE 정의로 확인한다."
        },
        {
          "id": "S1-TH40-03-C",
          "text": "WITH에서 같은 이름의 customer_id를 사용하면 자동으로 외래 키가 생성된다."
        },
        {
          "id": "S1-TH40-03-D",
          "text": "조인이 세 행을 반환하면 모든 주문의 고객 참조가 앞으로도 보장된다."
        }
      ],
      "answerId": "S1-TH40-03-B",
      "reason": "같은 자료를 조인해서 올바른 결과를 얻었다는 것과 키·참조 무결성을 실제로 강제했다는 것은 별개다. WITH는 이 예제의 조회용 표본이며, 비교 DDL에 명시한 제약이 구현 판단의 대상이다. 이 문항은 DDL 실행을 요구하지 않는다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH40-03-A",
          "reason": "CREATE TABLE에 PRIMARY KEY를 적어도 실제 제약은 생기지 않고 화면 설명만 바뀐다. — 유효하게 실행된 CREATE TABLE의 제약 정의는 실제 스키마 제약을 생성한다. 단순한 결과 표시와 다르다."
        },
        {
          "choiceId": "S1-TH40-03-C",
          "reason": "WITH에서 같은 이름의 customer_id를 사용하면 자동으로 외래 키가 생성된다. — 같은 열 이름이나 조인 조건만으로 스키마의 외래 키 제약이 생성되지는 않는다."
        },
        {
          "choiceId": "S1-TH40-03-D",
          "reason": "조인이 세 행을 반환하면 모든 주문의 고객 참조가 앞으로도 보장된다. — 표본의 조인 결과는 이후 데이터 입력을 제한하지 않는다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "CREATE-TABLE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CREATE-TABLE.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html"
      }
    ]
  },
  {
    "code": "S1-TH40-04",
    "lessonCode": "TH-40",
    "subject": 1,
    "title": "물리 설계와 성능 주장의 근거",
    "labUrl": "lab.html?episode=TH-40",
    "topic": "개념·논리·물리 모델",
    "verificationKind": "conceptual",
    "question": {
      "id": "S1-TH40-04",
      "givens": "논리 구조를 정한 뒤 Oracle 물리 설계에서 특정 조회에 사용할 인덱스를 검토한다. 아직 데이터 규모·분포·조회 조건·실행 계획·측정 결과는 확인하지 않았다.",
      "givensHtml": "<p>논리 구조를 정한 뒤 Oracle 물리 설계에서 특정 조회에 사용할 인덱스를 검토한다. 아직 데이터 규모·분포·조회 조건·실행 계획·측정 결과는 확인하지 않았다.</p>\n",
      "stem": "현재 단계에서 타당한 결론은?",
      "choices": [
        {
          "id": "S1-TH40-04-A",
          "text": "인덱스는 물리 설계의 선택이며 실제 조회 성능은 대상 데이터와 실행 계획·측정으로 확인해야 한다."
        },
        {
          "id": "S1-TH40-04-B",
          "text": "물리 모델까지 만들었으므로 모든 쿼리가 반드시 빨라진다."
        },
        {
          "id": "S1-TH40-04-C",
          "text": "인덱스라는 이름을 붙이면 실제 생성이나 실행 계획을 확인하지 않아도 성능이 증명된다."
        },
        {
          "id": "S1-TH40-04-D",
          "text": "인덱스 선택은 고객이라는 엔터티의 존재 여부만 정하는 개념 모델 작업이다."
        }
      ],
      "answerId": "S1-TH40-04-A",
      "reason": "인덱스의 효과는 어떤 데이터를 어떤 조건으로 읽는지에 따라 달라진다. 원고의 모델 단계 설명은 물리 구현에서 접근 구조를 검토한다는 뜻이지, 측정 없이 성능 향상을 확정한다는 뜻이 아니다.",
      "wrongReasons": [
        {
          "choiceId": "S1-TH40-04-B",
          "reason": "물리 모델까지 만들었으므로 모든 쿼리가 반드시 빨라진다. — 모델 단계 완료는 모든 조회의 성능 향상 증거가 아니다."
        },
        {
          "choiceId": "S1-TH40-04-C",
          "reason": "인덱스라는 이름을 붙이면 실제 생성이나 실행 계획을 확인하지 않아도 성능이 증명된다. — 명칭만으로 실제 접근 구조의 존재나 사용 여부·효과를 알 수 없다."
        },
        {
          "choiceId": "S1-TH40-04-D",
          "reason": "인덱스 선택은 고객이라는 엔터티의 존재 여부만 정하는 개념 모델 작업이다. — 인덱스는 특정 구현의 접근 구조를 정하는 물리 설계 판단이다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      },
      {
        "title": "CREATE-TABLE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CREATE-TABLE.html"
      },
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html"
      }
    ]
  },
  {
    "code": "S2-E001-zero-count",
    "lessonCode": "E001",
    "subject": 2,
    "title": "0이 기록되면 COUNT는 어떻게 달라질까",
    "labUrl": "lab.html?episode=E001&variant=zero&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E001-zero-count",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — coupon_amount 단위: 원\n\n| order_id | coupon_amount |\n| --- | --- |\n| 201 | 500 |\n| 202 | 0 |\n| 203 | 500 |\n\n**SQL A: 세 종류 비교**\n\n```sql\nSELECT COUNT(*) AS rows_n, COUNT(coupon_amount) AS values_n, COUNT(DISTINCT coupon_amount) AS distinct_n FROM orders\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — coupon_amount 단위: 원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>coupon_amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>500</td>\n</tr>\n<tr>\n<td>202</td>\n<td>0</td>\n</tr>\n<tr>\n<td>203</td>\n<td>500</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 세 종류 비교</strong></p>\n<pre><code class=\"language-sql\">SELECT COUNT(*) AS rows_n, COUNT(coupon_amount) AS values_n, COUNT(DISTINCT coupon_amount) AS distinct_n FROM orders\n</code></pre>\n",
      "stem": "SQL의 (rows_n, values_n, distinct_n)은?",
      "choices": [
        {
          "id": "S2-E001-zero-count-A",
          "text": "(3, 3, 2)"
        },
        {
          "id": "S2-E001-zero-count-D",
          "text": "(2, 2, 2)"
        },
        {
          "id": "S2-E001-zero-count-B",
          "text": "(3, 2, 1)"
        },
        {
          "id": "S2-E001-zero-count-C",
          "text": "(3, 3, 3)"
        }
      ],
      "answerId": "S2-E001-zero-count-A",
      "reason": "전체 3행이 있고 coupon_amount는 500, 0, 500으로 모두 NULL이 아닙니다. 값의 종류는 0과 500 두 가지이므로 3, 3, 2입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E001-zero-count-D",
          "reason": "(2, 2, 2) — COUNT(*)는 0이 들어 있는 행도 셉니다."
        },
        {
          "choiceId": "S2-E001-zero-count-B",
          "reason": "(3, 2, 1) — 0도 NULL이 아닌 값이므로 values_n과 distinct_n에 포함됩니다."
        },
        {
          "choiceId": "S2-E001-zero-count-C",
          "reason": "(3, 3, 3) — 500 두 개는 DISTINCT에서 한 종류입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      },
      {
        "title": "Oracle 19c 집계 함수",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-E001-null-count",
    "lessonCode": "E001",
    "subject": 2,
    "title": "값만 사라진 경우와 행이 사라진 경우",
    "labUrl": "lab.html?episode=E001&variant=null&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E001-null-count",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — coupon_amount 단위: 원\n\n| order_id | coupon_amount |\n| --- | --- |\n| 201 | NULL |\n| 202 | NULL |\n| 203 | NULL |\n\n**SQL A: A**\n\n```sql\nSELECT COUNT(*),COUNT(coupon_amount),\nCOUNT(DISTINCT coupon_amount) FROM orders\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — coupon_amount 단위: 원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>coupon_amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>202</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>203</td>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT COUNT(*),COUNT(coupon_amount),\nCOUNT(DISTINCT coupon_amount) FROM orders\n</code></pre>\n",
      "stem": "쿠폰 값만 모두 NULL인 현재 입력에서 세 COUNT의 결과는?",
      "choices": [
        {
          "id": "S2-E001-null-count-B",
          "text": "(3, 0, 0)"
        },
        {
          "id": "S2-E001-null-count-A",
          "text": "(3, NULL, NULL)"
        },
        {
          "id": "S2-E001-null-count-C",
          "text": "(0, 0, 0)"
        },
        {
          "id": "S2-E001-null-count-D",
          "text": "(3, 3, 1)"
        }
      ],
      "answerId": "S2-E001-null-count-B",
      "reason": "주문 행 3개는 남아 있어 COUNT(*)는 3입니다. 나머지 두 집계의 대상 값은 전부 NULL이므로 각각 0입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E001-null-count-A",
          "reason": "(3, NULL, NULL) — COUNT는 셀 값이 없으면 NULL 대신 0을 반환합니다."
        },
        {
          "choiceId": "S2-E001-null-count-C",
          "reason": "(0, 0, 0) — NULL인 행도 실제로 존재하므로 COUNT(*)는 3입니다."
        },
        {
          "choiceId": "S2-E001-null-count-D",
          "reason": "(3, 3, 1) — COUNT(표현식)와 COUNT(DISTINCT 표현식)은 NULL을 세지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      },
      {
        "title": "Oracle 19c 집계 함수",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-E001-empty-count",
    "lessonCode": "E001",
    "subject": 2,
    "title": "입력이 0행인 전체 COUNT",
    "labUrl": "lab.html?episode=E001&variant=empty&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E001-empty-count",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — coupon_amount 단위: 원\n\n| order_id | coupon_amount |\n| --- | --- |\n\n이 테이블은 0행입니다.\n\n**SQL A: 세 종류 비교**\n\n```sql\nSELECT COUNT(*),COUNT(coupon_amount),COUNT(DISTINCT coupon_amount) FROM orders\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — coupon_amount 단위: 원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>coupon_amount</th>\n</tr>\n</thead>\n</table>\n<p>이 테이블은 0행입니다.</p>\n<p><strong>SQL A: 세 종류 비교</strong></p>\n<pre><code class=\"language-sql\">SELECT COUNT(*),COUNT(coupon_amount),COUNT(DISTINCT coupon_amount) FROM orders\n</code></pre>\n",
      "stem": "입력이 0행인 이 GROUP BY 없는 SQL의 반환 형태는?",
      "choices": [
        {
          "id": "S2-E001-empty-count-B",
          "text": "COUNT(DISTINCT)가 오류를 낸다."
        },
        {
          "id": "S2-E001-empty-count-D",
          "text": "결과가 0행이다."
        },
        {
          "id": "S2-E001-empty-count-A",
          "text": "결과 1행이며 값은 (NULL, NULL, NULL)이다."
        },
        {
          "id": "S2-E001-empty-count-C",
          "text": "결과 1행이며 값은 (0, 0, 0)이다."
        }
      ],
      "answerId": "S2-E001-empty-count-C",
      "reason": "전체 집계는 입력 행 수와 결과 행 수를 구분해야 합니다. 입력은 0행이지만 전체 COUNT 결과는 한 행이며 세 값 모두 0입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E001-empty-count-B",
          "reason": "COUNT(DISTINCT)가 오류를 낸다. — DISTINCT 집계도 빈 입력에 사용할 수 있습니다."
        },
        {
          "choiceId": "S2-E001-empty-count-D",
          "reason": "결과가 0행이다. — GROUP BY 없는 전체 COUNT는 빈 입력에도 한 행을 반환합니다."
        },
        {
          "choiceId": "S2-E001-empty-count-A",
          "reason": "결과 1행이며 값은 (NULL, NULL, NULL)이다. — COUNT는 빈 입력에서 0을 반환합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      },
      {
        "title": "Oracle 19c 집계 함수",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-E025-coalesce-position",
    "lessonCode": "E025",
    "subject": 2,
    "title": "COALESCE를 행 덧셈의 어디에 적용할까",
    "labUrl": "lab.html?episode=E025&variant=coalesce&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E025-coalesce-position",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount·fee 단위: 천원\n\n| order_id | amount | fee |\n| --- | --- | --- |\n| 201 | 8 | 2 |\n| 202 | 12 | NULL |\n| 203 | 7 | 3 |\n\n**SQL A: A**\n\n```sql\nSELECT\nSUM(COALESCE(amount+fee,0)),\nSUM(COALESCE(amount,0)+COALESCE(fee,0)) FROM orders\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount·fee 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>amount</th>\n<th>fee</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>8</td>\n<td>2</td>\n</tr>\n<tr>\n<td>202</td>\n<td>12</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>203</td>\n<td>7</td>\n<td>3</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT\nSUM(COALESCE(amount+fee,0)),\nSUM(COALESCE(amount,0)+COALESCE(fee,0)) FROM orders\n</code></pre>\n",
      "stem": "SQL의 왼쪽 합계와 오른쪽 합계는?",
      "choices": [
        {
          "id": "S2-E025-coalesce-position-D",
          "text": "(20, 32)"
        },
        {
          "id": "S2-E025-coalesce-position-B",
          "text": "(20, 20)"
        },
        {
          "id": "S2-E025-coalesce-position-C",
          "text": "(NULL, 32)"
        },
        {
          "id": "S2-E025-coalesce-position-A",
          "text": "(32, 32)"
        }
      ],
      "answerId": "S2-E025-coalesce-position-D",
      "reason": "왼쪽의 행 값은 10, 0, 10으로 합계 20입니다. 오른쪽은 각각의 NULL을 먼저 치환하므로 10, 12, 10이 되어 32입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E025-coalesce-position-B",
          "reason": "(20, 20) — 오른쪽 식은 fee의 NULL만 0으로 바꾸므로 해당 행의 amount 12가 살아 있습니다."
        },
        {
          "choiceId": "S2-E025-coalesce-position-C",
          "reason": "(NULL, 32) — 왼쪽도 COALESCE로 행 표현식의 NULL을 0으로 바꿉니다."
        },
        {
          "choiceId": "S2-E025-coalesce-position-A",
          "reason": "(32, 32) — 왼쪽 식은 12+NULL을 먼저 NULL로 만든 뒤 전체 행 값을 0으로 바꿉니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SUM",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SUM.html"
      },
      {
        "title": "Oracle 19c 집계 함수",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c COALESCE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COALESCE.html"
      }
    ]
  },
  {
    "code": "S2-E025-empty-sum",
    "lessonCode": "E025",
    "subject": 2,
    "title": "빈 집합의 SUM과 COUNT",
    "labUrl": "lab.html?episode=E025&variant=empty&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E025-empty-sum",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount·fee 단위: 천원\n\n| order_id | amount | fee |\n| --- | --- | --- |\n| 201 | 8 | 2 |\n| 202 | 12 | NULL |\n| 203 | 7 | 3 |\n\n**SQL A: A**\n\n```sql\nSELECT SUM(amount),COUNT(*) FROM orders WHERE 1=0\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount·fee 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>amount</th>\n<th>fee</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>8</td>\n<td>2</td>\n</tr>\n<tr>\n<td>202</td>\n<td>12</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>203</td>\n<td>7</td>\n<td>3</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT SUM(amount),COUNT(*) FROM orders WHERE 1=0\n</code></pre>\n",
      "stem": "WHERE 1=0을 적용한 SUM(amount), COUNT(*)는?",
      "choices": [
        {
          "id": "S2-E025-empty-sum-C",
          "text": "(NULL, NULL)"
        },
        {
          "id": "S2-E025-empty-sum-D",
          "text": "결과 0행"
        },
        {
          "id": "S2-E025-empty-sum-B",
          "text": "(0, 0)"
        },
        {
          "id": "S2-E025-empty-sum-A",
          "text": "(NULL, 0)"
        }
      ],
      "answerId": "S2-E025-empty-sum-A",
      "reason": "WHERE가 모든 행을 제거합니다. 전체 집계의 SUM은 NULL, COUNT(*)는 0이므로 결과 한 행은 (NULL, 0)입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E025-empty-sum-C",
          "reason": "(NULL, NULL) — COUNT(*)는 빈 입력에서 0을 반환합니다."
        },
        {
          "choiceId": "S2-E025-empty-sum-D",
          "reason": "결과 0행 — GROUP BY 없는 전체 집계는 한 행을 반환합니다."
        },
        {
          "choiceId": "S2-E025-empty-sum-B",
          "reason": "(0, 0) — SUM은 빈 입력에서 0을 자동으로 만들지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SUM",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SUM.html"
      },
      {
        "title": "Oracle 19c 집계 함수",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c COALESCE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COALESCE.html"
      }
    ]
  },
  {
    "code": "S2-E004-count-null-extension",
    "lessonCode": "E004",
    "subject": 2,
    "title": "외부 조인으로 만들어진 행을 세기",
    "labUrl": "lab.html?episode=E004&variant=counts&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E004-count-null-extension",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**orders**\n\n| order_id | customer_id |\n| --- | --- |\n| 201 | 11 |\n| 202 | 11 |\n| 203 | 22 |\n\n**SQL A: A**\n\n```sql\nSELECT c.customer_id,\nCOUNT(*),COUNT(o.order_id) FROM customers c LEFT JOIN orders o\nON c.customer_id=o.customer_id GROUP BY c.customer_id ORDER BY c.customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong></p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>11</td>\n</tr>\n<tr>\n<td>202</td>\n<td>11</td>\n</tr>\n<tr>\n<td>203</td>\n<td>22</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id,\nCOUNT(*),COUNT(o.order_id) FROM customers c LEFT JOIN orders o\nON c.customer_id=o.customer_id GROUP BY c.customer_id ORDER BY c.customer_id\n</code></pre>\n",
      "stem": "주문이 없는 33번의 (COUNT(*), COUNT(o.order_id))는?",
      "choices": [
        {
          "id": "S2-E004-count-null-extension-B",
          "text": "(1, 0)"
        },
        {
          "id": "S2-E004-count-null-extension-A",
          "text": "(0, 1)"
        },
        {
          "id": "S2-E004-count-null-extension-C",
          "text": "(0, 0)"
        },
        {
          "id": "S2-E004-count-null-extension-D",
          "text": "(1, 1)"
        }
      ],
      "answerId": "S2-E004-count-null-extension-B",
      "reason": "33번은 주문과 매칭되지 않지만 LEFT JOIN 결과에 한 행 남습니다. COUNT(*)는 그 행을 세고 COUNT(o.order_id)는 NULL을 제외하여 1, 0입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E004-count-null-extension-A",
          "reason": "(0, 1) — COUNT(*)가 보존 행을 세며 COUNT(order_id)는 NULL을 제외합니다."
        },
        {
          "choiceId": "S2-E004-count-null-extension-C",
          "reason": "(0, 0) — LEFT JOIN이 33번 고객을 보존하여 NULL이 붙은 행 하나를 만듭니다."
        },
        {
          "choiceId": "S2-E004-count-null-extension-D",
          "reason": "(1, 1) — 오른쪽 order_id가 NULL이므로 COUNT(o.order_id)는 세지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      }
    ]
  },
  {
    "code": "S2-E004-empty-right",
    "lessonCode": "E004",
    "subject": 2,
    "title": "오른쪽 테이블이 완전히 비어 있으면",
    "labUrl": "lab.html?episode=E004&variant=none&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E004-empty-right",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**orders**\n\n| order_id | customer_id |\n| --- | --- |\n\n이 테이블은 0행입니다.\n\n**SQL A: A**\n\n```sql\nSELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id ORDER BY c.customer_id,o.order_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong></p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n</tr>\n</thead>\n</table>\n<p>이 테이블은 0행입니다.</p>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id ORDER BY c.customer_id,o.order_id\n</code></pre>\n",
      "stem": "SQL이 반환하는 결과는?",
      "choices": [
        {
          "id": "S2-E004-empty-right-A",
          "text": "고객 33만 한 행 남는다."
        },
        {
          "id": "S2-E004-empty-right-B",
          "text": "고객 11이 두 행, 22·33이 한 행씩 남는다."
        },
        {
          "id": "S2-E004-empty-right-C",
          "text": "고객 11·22·33이 각각 한 행씩 남고 order_id는 모두 NULL이다."
        },
        {
          "id": "S2-E004-empty-right-D",
          "text": "0행이다."
        }
      ],
      "answerId": "S2-E004-empty-right-C",
      "reason": "orders가 비어 있으므로 세 고객 모두 미매칭입니다. 각 고객마다 오른쪽 열이 NULL인 보존 행이 하나씩 생성되어 총 3행입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E004-empty-right-A",
          "reason": "고객 33만 한 행 남는다. — 이 입력에서는 모든 고객에게 주문이 없으므로 세 고객 모두 보존됩니다."
        },
        {
          "choiceId": "S2-E004-empty-right-B",
          "reason": "고객 11이 두 행, 22·33이 한 행씩 남는다. — 과거 주문 수가 아니라 현재 빈 orders를 조인합니다."
        },
        {
          "choiceId": "S2-E004-empty-right-D",
          "reason": "0행이다. — LEFT JOIN은 오른쪽에 매칭 행이 없어도 왼쪽 고객을 보존합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      }
    ]
  },
  {
    "code": "S2-E016-or-null-repair",
    "lessonCode": "E016",
    "subject": 2,
    "title": "WHERE의 OR IS NULL이 복구하지 못하는 고객",
    "labUrl": "lab.html?episode=E016&variant=repair&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E016-or-null-repair",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 201 | 11 | 8 |\n| 202 | 11 | 12 |\n| 203 | 22 | 7 |\n\n**SQL A: A**\n\n```sql\nSELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id WHERE o.amount>=10 OR o.order_id IS NULL ORDER BY c.customer_id,o.order_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>11</td>\n<td>8</td>\n</tr>\n<tr>\n<td>202</td>\n<td>11</td>\n<td>12</td>\n</tr>\n<tr>\n<td>203</td>\n<td>22</td>\n<td>7</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id WHERE o.amount&gt;=10 OR o.order_id IS NULL ORDER BY c.customer_id,o.order_id\n</code></pre>\n",
      "stem": "현재 SQL에서 고객 22가 사라지는 이유는?",
      "choices": [
        {
          "id": "S2-E016-or-null-repair-C",
          "text": "LEFT JOIN은 주문이 한 건인 고객을 제거하기 때문이다."
        },
        {
          "id": "S2-E016-or-null-repair-B",
          "text": "22의 customer_id가 NULL이기 때문이다."
        },
        {
          "id": "S2-E016-or-null-repair-A",
          "text": "OR o.order_id IS NULL이 모든 LEFT JOIN에서 항상 거짓이기 때문이다."
        },
        {
          "id": "S2-E016-or-null-repair-D",
          "text": "22는 amount=7인 주문과 이미 매칭되어, WHERE를 통과할 NULL 보존 행이 따로 생성되지 않기 때문이다."
        }
      ],
      "answerId": "S2-E016-or-null-repair-D",
      "reason": "22는 주문 203과 매칭되므로 (22,203,7) 행이 만들어집니다. amount>=10과 order_id IS NULL이 모두 거짓이라 제거됩니다. 미매칭 33의 NULL 보존 행만 OR 조건을 통과합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E016-or-null-repair-C",
          "reason": "LEFT JOIN은 주문이 한 건인 고객을 제거하기 때문이다. — 제거 원인은 조인 종류가 아니라 매칭 후 WHERE 조건입니다."
        },
        {
          "choiceId": "S2-E016-or-null-repair-B",
          "reason": "22의 customer_id가 NULL이기 때문이다. — 입력의 고객 번호는 22이며 NULL이 아닙니다."
        },
        {
          "choiceId": "S2-E016-or-null-repair-A",
          "reason": "OR o.order_id IS NULL이 모든 LEFT JOIN에서 항상 거짓이기 때문이다. — 미매칭 고객 33의 order_id는 NULL이므로 그 조건은 참입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-E016-on-where-no-match",
    "lessonCode": "E016",
    "subject": 2,
    "title": "추가 조건을 만족하는 주문이 한 건도 없을 때",
    "labUrl": "lab.html?episode=E016&variant=no-match&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E016-on-where-no-match",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 201 | 11 | 0 |\n| 202 | 11 | 0 |\n| 203 | 22 | 0 |\n\n**SQL A: A**\n\n```sql\nSELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id AND o.amount>=10 ORDER BY c.customer_id,o.order_id\n```\n\n**SQL B: B**\n\n```sql\nSELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id WHERE o.amount>=10 ORDER BY c.customer_id,o.order_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>11</td>\n<td>0</td>\n</tr>\n<tr>\n<td>202</td>\n<td>11</td>\n<td>0</td>\n</tr>\n<tr>\n<td>203</td>\n<td>22</td>\n<td>0</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id AND o.amount&gt;=10 ORDER BY c.customer_id,o.order_id\n</code></pre>\n<p><strong>SQL B: B</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id,o.order_id\nFROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id WHERE o.amount&gt;=10 ORDER BY c.customer_id,o.order_id\n</code></pre>\n",
      "stem": "SQL A(ON 조건)와 SQL B(WHERE 조건)의 결과 행 수는?",
      "choices": [
        {
          "id": "S2-E016-on-where-no-match-D",
          "text": "A는 0행, B는 3행"
        },
        {
          "id": "S2-E016-on-where-no-match-C",
          "text": "A와 B 모두 3행"
        },
        {
          "id": "S2-E016-on-where-no-match-A",
          "text": "A는 3행, B는 0행"
        },
        {
          "id": "S2-E016-on-where-no-match-B",
          "text": "A와 B 모두 0행"
        }
      ],
      "answerId": "S2-E016-on-where-no-match-A",
      "reason": "모든 주문 금액이 0입니다. A는 ON 매칭에 성공한 주문이 없어 고객별 NULL 보존 행 3개를 반환합니다. B는 조인 뒤 WHERE에서 모든 행을 제거합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E016-on-where-no-match-D",
          "reason": "A는 0행, B는 3행 — LEFT JOIN의 보존 단계와 WHERE 필터 단계가 뒤바뀌었습니다."
        },
        {
          "choiceId": "S2-E016-on-where-no-match-C",
          "reason": "A와 B 모두 3행 — B의 WHERE에서 amount>=10은 0 또는 NULL에 대해 TRUE가 되지 않습니다."
        },
        {
          "choiceId": "S2-E016-on-where-no-match-B",
          "reason": "A와 B 모두 0행 — ON에서 매칭 실패한 경우 A는 왼쪽 세 고객을 보존합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-E019-false-unknown",
    "lessonCode": "E019",
    "subject": 2,
    "title": "NOT IN의 FALSE와 UNKNOWN을 구분하기",
    "labUrl": "lab.html?episode=E019&variant=truth&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E019-false-unknown",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**excluded_customers** — NULL은 번호가 기록되지 않았다는 뜻\n\n| customer_id |\n| --- |\n| 11 |\n| NULL |\n\n**SQL A: CASE로 조건 판정**\n\n```sql\nSELECT customer_id, CASE WHEN customer_id NOT IN (SELECT customer_id FROM excluded_customers) THEN 'TRUE' WHEN customer_id IN (SELECT customer_id FROM excluded_customers) THEN 'FALSE' ELSE 'UNKNOWN' END AS condition_result FROM customers ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>excluded_customers</strong> — NULL은 번호가 기록되지 않았다는 뜻</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: CASE로 조건 판정</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id, CASE WHEN customer_id NOT IN (SELECT customer_id FROM excluded_customers) THEN 'TRUE' WHEN customer_id IN (SELECT customer_id FROM excluded_customers) THEN 'FALSE' ELSE 'UNKNOWN' END AS condition_result FROM customers ORDER BY customer_id\n</code></pre>\n",
      "stem": "고객 11·22·33의 condition_result를 순서대로 고르면?",
      "choices": [
        {
          "id": "S2-E019-false-unknown-D",
          "text": "(UNKNOWN, UNKNOWN, UNKNOWN)"
        },
        {
          "id": "S2-E019-false-unknown-B",
          "text": "(FALSE, UNKNOWN, UNKNOWN)"
        },
        {
          "id": "S2-E019-false-unknown-A",
          "text": "(TRUE, FALSE, FALSE)"
        },
        {
          "id": "S2-E019-false-unknown-C",
          "text": "(FALSE, TRUE, TRUE)"
        }
      ],
      "answerId": "S2-E019-false-unknown-B",
      "reason": "11은 제외 목록의 11과 일치하므로 NOT IN은 FALSE입니다. 22·33은 11과 다르지만 NULL과의 비교를 확정할 수 없어 UNKNOWN입니다. WHERE에서는 FALSE와 UNKNOWN 모두 제거됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E019-false-unknown-D",
          "reason": "(UNKNOWN, UNKNOWN, UNKNOWN) — 11은 목록의 11과 일치하므로 IN이 TRUE, NOT IN이 FALSE입니다."
        },
        {
          "choiceId": "S2-E019-false-unknown-A",
          "reason": "(TRUE, FALSE, FALSE) — 11의 일치 여부와 NOT의 의미가 뒤바뀌었습니다."
        },
        {
          "choiceId": "S2-E019-false-unknown-C",
          "reason": "(FALSE, TRUE, TRUE) — 목록의 NULL 때문에 22·33은 불일치를 확정할 수 없습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c IN·NOT IN 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/IN-Condition.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c CASE 표현식",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CASE-Expressions.html"
      },
      {
        "title": "Oracle 19c EXISTS 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      }
    ]
  },
  {
    "code": "S2-E019-not-exists-null",
    "lessonCode": "E019",
    "subject": 2,
    "title": "관련 없는 NULL이 NOT EXISTS에 미치는 영향",
    "labUrl": "lab.html?episode=E019&variant=exists&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E019-not-exists-null",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**excluded_customers** — NULL은 번호가 기록되지 않았다는 뜻\n\n| customer_id |\n| --- |\n| 11 |\n| NULL |\n\n**SQL A: A**\n\n```sql\nSELECT c.customer_id FROM customers c\nWHERE NOT EXISTS (SELECT 1 FROM excluded_customers x\nWHERE x.customer_id=c.customer_id) ORDER BY c.customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>excluded_customers</strong> — NULL은 번호가 기록되지 않았다는 뜻</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id FROM customers c\nWHERE NOT EXISTS (SELECT 1 FROM excluded_customers x\nWHERE x.customer_id=c.customer_id) ORDER BY c.customer_id\n</code></pre>\n",
      "stem": "현재 상관 NOT EXISTS가 반환하는 고객 번호는?",
      "choices": [
        {
          "id": "S2-E019-not-exists-null-A",
          "text": "11만"
        },
        {
          "id": "S2-E019-not-exists-null-D",
          "text": "없음"
        },
        {
          "id": "S2-E019-not-exists-null-C",
          "text": "22, 33"
        },
        {
          "id": "S2-E019-not-exists-null-B",
          "text": "11, 22, 33"
        }
      ],
      "answerId": "S2-E019-not-exists-null-C",
      "reason": "22·33과 같은 customer_id를 가진 제외 행은 없습니다. NULL=22·33은 TRUE가 아니므로 해당 NULL 행은 매칭되지 않습니다. 11만 제외됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E019-not-exists-null-A",
          "reason": "11만 — 11은 제외 목록에 동일 번호가 있어 NOT EXISTS가 거짓입니다."
        },
        {
          "choiceId": "S2-E019-not-exists-null-D",
          "reason": "없음 — NOT IN과 달리 NOT EXISTS는 각 고객과 일치하는 행의 존재를 검사합니다."
        },
        {
          "choiceId": "S2-E019-not-exists-null-B",
          "reason": "11, 22, 33 — 11과 일치하는 제외 행이 있으므로 11은 반환되지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c IN·NOT IN 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/IN-Condition.html"
      },
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c CASE 표현식",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CASE-Expressions.html"
      },
      {
        "title": "Oracle 19c EXISTS 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      }
    ]
  },
  {
    "code": "S2-E026-range-unique",
    "lessonCode": "E026",
    "subject": 2,
    "title": "정렬 키가 유일해지면 RANGE의 동률은",
    "labUrl": "lab.html?episode=E026&variant=unique&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E026-range-unique",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**receipts** — amount 단위: 천원 · 앞 주문 자료와 별도 예시\n\n| receipt_id | day_no | amount |\n| --- | --- | --- |\n| 401 | 1 | 4 |\n| 402 | 2 | 6 |\n| 403 | 2 | 9 |\n| 404 | 3 | 5 |\n\n**SQL A: A**\n\n```sql\nSELECT receipt_id,day_no,amount,\nSUM(amount) OVER (ORDER BY day_no,receipt_id\nRANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total\nFROM receipts ORDER BY day_no,receipt_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>receipts</strong> — amount 단위: 천원 · 앞 주문 자료와 별도 예시</p>\n<table>\n<thead>\n<tr>\n<th>receipt_id</th>\n<th>day_no</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>1</td>\n<td>4</td>\n</tr>\n<tr>\n<td>402</td>\n<td>2</td>\n<td>6</td>\n</tr>\n<tr>\n<td>403</td>\n<td>2</td>\n<td>9</td>\n</tr>\n<tr>\n<td>404</td>\n<td>3</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT receipt_id,day_no,amount,\nSUM(amount) OVER (ORDER BY day_no,receipt_id\nRANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total\nFROM receipts ORDER BY day_no,receipt_id\n</code></pre>\n",
      "stem": "receipt_id 402·403의 running_total은 각각 얼마인가?",
      "choices": [
        {
          "id": "S2-E026-range-unique-C",
          "text": "24, 24"
        },
        {
          "id": "S2-E026-range-unique-A",
          "text": "19, 19"
        },
        {
          "id": "S2-E026-range-unique-D",
          "text": "10, 19"
        },
        {
          "id": "S2-E026-range-unique-B",
          "text": "6, 9"
        }
      ],
      "answerId": "S2-E026-range-unique-D",
      "reason": "정렬 키가 (day_no, receipt_id)이므로 402의 키와 403의 키는 다릅니다. RANGE라도 두 행이 한 동률 집합이 아니어서 누계가 4+6=10, 4+6+9=19입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E026-range-unique-C",
          "reason": "24, 24 — CURRENT ROW 뒤의 404는 현재 프레임에 포함되지 않습니다."
        },
        {
          "choiceId": "S2-E026-range-unique-A",
          "reason": "19, 19 — ORDER BY에 receipt_id가 더해져 402와 403이 같은 정렬 키가 아닙니다."
        },
        {
          "choiceId": "S2-E026-range-unique-B",
          "reason": "6, 9 — 현재 SQL은 행의 amount가 아니라 앞에서부터 누적 합계를 구합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c 분석 함수·윈도우 프레임",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      },
      {
        "title": "Oracle 19c SUM",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SUM.html"
      }
    ]
  },
  {
    "code": "S2-E026-default-frame",
    "lessonCode": "E026",
    "subject": 2,
    "title": "프레임을 생략한 누적 SUM",
    "labUrl": "lab.html?episode=E026&variant=default&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E026-default-frame",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**receipts** — amount 단위: 천원 · 앞 주문 자료와 별도 예시\n\n| receipt_id | day_no | amount |\n| --- | --- | --- |\n| 401 | 1 | 4 |\n| 402 | 2 | 6 |\n| 403 | 2 | 9 |\n| 404 | 3 | 5 |\n\n**SQL A: A**\n\n```sql\nSELECT receipt_id,day_no,amount,\nSUM(amount) OVER (ORDER BY day_no) AS running_total\nFROM receipts ORDER BY day_no,receipt_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>receipts</strong> — amount 단위: 천원 · 앞 주문 자료와 별도 예시</p>\n<table>\n<thead>\n<tr>\n<th>receipt_id</th>\n<th>day_no</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>1</td>\n<td>4</td>\n</tr>\n<tr>\n<td>402</td>\n<td>2</td>\n<td>6</td>\n</tr>\n<tr>\n<td>403</td>\n<td>2</td>\n<td>9</td>\n</tr>\n<tr>\n<td>404</td>\n<td>3</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: A</strong></p>\n<pre><code class=\"language-sql\">SELECT receipt_id,day_no,amount,\nSUM(amount) OVER (ORDER BY day_no) AS running_total\nFROM receipts ORDER BY day_no,receipt_id\n</code></pre>\n",
      "stem": "day_no=2인 두 행의 running_total이 같은 이유는?",
      "choices": [
        {
          "id": "S2-E026-default-frame-D",
          "text": "ORDER BY가 없어서 전체 합계 24가 반복된다."
        },
        {
          "id": "S2-E026-default-frame-C",
          "text": "같은 day_no의 amount가 원래 같기 때문이다."
        },
        {
          "id": "S2-E026-default-frame-A",
          "text": "ORDER BY만 둔 이 SUM의 기본 프레임이 RANGE ... CURRENT ROW여서 같은 day_no의 동률 행을 함께 포함한다."
        },
        {
          "id": "S2-E026-default-frame-B",
          "text": "프레임을 생략하면 항상 현재 행 한 개만 계산한다."
        }
      ],
      "answerId": "S2-E026-default-frame-A",
      "reason": "이 SUM은 ORDER BY day_no만 지정했습니다. 기본 RANGE 프레임은 처음부터 현재 정렬 키의 동률까지 포함하므로 day_no=2인 두 행 모두 4+6+9=19입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E026-default-frame-D",
          "reason": "ORDER BY가 없어서 전체 합계 24가 반복된다. — SQL에 ORDER BY day_no가 있으며 day_no=2의 값은 19입니다."
        },
        {
          "choiceId": "S2-E026-default-frame-C",
          "reason": "같은 day_no의 amount가 원래 같기 때문이다. — 두 값은 6과 9로 다릅니다."
        },
        {
          "choiceId": "S2-E026-default-frame-B",
          "reason": "프레임을 생략하면 항상 현재 행 한 개만 계산한다. — 결과는 누적 집계이며 단일 행 프레임이 아닙니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c 분석 함수·윈도우 프레임",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      },
      {
        "title": "Oracle 19c SUM",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SUM.html"
      }
    ]
  },
  {
    "code": "S2-E002-zero-not-null",
    "lessonCode": "E002",
    "subject": 2,
    "title": "0을 찾는 조건",
    "labUrl": "lab.html?episode=E002&variant=zero&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E002-zero-not-null",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**null_orders** — coupon 단위: 원\n\n| order_id | coupon |\n| --- | --- |\n| 301 | 500 |\n| 302 | NULL |\n| 303 | 0 |\n\n**SQL A: zero**\n\n```sql\nSELECT order_id FROM null_orders WHERE coupon = 0 ORDER BY order_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>null_orders</strong> — coupon 단위: 원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>coupon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>301</td>\n<td>500</td>\n</tr>\n<tr>\n<td>302</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>303</td>\n<td>0</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: zero</strong></p>\n<pre><code class=\"language-sql\">SELECT order_id FROM null_orders WHERE coupon = 0 ORDER BY order_id\n</code></pre>\n",
      "stem": "WHERE coupon=0이 반환하는 order_id는?",
      "choices": [
        {
          "id": "S2-E002-zero-not-null-A",
          "text": "301, 302, 303"
        },
        {
          "id": "S2-E002-zero-not-null-B",
          "text": "303만"
        },
        {
          "id": "S2-E002-zero-not-null-D",
          "text": "302, 303"
        },
        {
          "id": "S2-E002-zero-not-null-C",
          "text": "302만"
        }
      ],
      "answerId": "S2-E002-zero-not-null-B",
      "reason": "0은 실제 숫자이고 NULL은 값이 없다는 표시입니다. 301은 500, 302는 NULL이므로 제거되고 coupon=0인 303만 남습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E002-zero-not-null-A",
          "reason": "301, 302, 303 — coupon=0은 모든 행에 참인 조건이 아닙니다."
        },
        {
          "choiceId": "S2-E002-zero-not-null-D",
          "reason": "302, 303 — NULL=0은 UNKNOWN이므로 WHERE를 통과하지 않습니다."
        },
        {
          "choiceId": "S2-E002-zero-not-null-C",
          "reason": "302만 — 302의 coupon은 NULL로, 0과 같다고 판단하지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c CASE 표현식",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CASE-Expressions.html"
      }
    ]
  },
  {
    "code": "S2-E002-not-equal-null",
    "lessonCode": "E002",
    "subject": 2,
    "title": "같지 않다는 조건도 NULL을 찾지 못한다",
    "labUrl": "lab.html?episode=E002&variant=ne&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E002-not-equal-null",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**null_orders** — coupon 단위: 원\n\n| order_id | coupon |\n| --- | --- |\n| 301 | 500 |\n| 302 | NULL |\n| 303 | 0 |\n\n**SQL A: not-equal**\n\n```sql\nSELECT order_id FROM null_orders WHERE coupon <> 500 ORDER BY order_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>null_orders</strong> — coupon 단위: 원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>coupon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>301</td>\n<td>500</td>\n</tr>\n<tr>\n<td>302</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>303</td>\n<td>0</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: not-equal</strong></p>\n<pre><code class=\"language-sql\">SELECT order_id FROM null_orders WHERE coupon &lt;&gt; 500 ORDER BY order_id\n</code></pre>\n",
      "stem": "coupon<>500 조건에서 302번이 반환되지 않는 이유는?",
      "choices": [
        {
          "id": "S2-E002-not-equal-null-B",
          "text": "NULL<>500은 FALSE이고 그 부정은 TRUE이기 때문이다."
        },
        {
          "id": "S2-E002-not-equal-null-A",
          "text": "<> 연산자는 0도 제외하기 때문이다."
        },
        {
          "id": "S2-E002-not-equal-null-D",
          "text": "NULL은 자동으로 500으로 바뀌기 때문이다."
        },
        {
          "id": "S2-E002-not-equal-null-C",
          "text": "NULL<>500은 UNKNOWN이며 WHERE는 TRUE인 행만 남기기 때문이다."
        }
      ],
      "answerId": "S2-E002-not-equal-null-C",
      "reason": "NULL과 500의 대소·동일 여부를 확정할 수 없으므로 <> 결과도 UNKNOWN입니다. 0인 303만 조건이 TRUE가 되어 반환됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E002-not-equal-null-B",
          "reason": "NULL<>500은 FALSE이고 그 부정은 TRUE이기 때문이다. — NULL 비교는 UNKNOWN이며 NOT UNKNOWN도 UNKNOWN입니다."
        },
        {
          "choiceId": "S2-E002-not-equal-null-A",
          "reason": "<> 연산자는 0도 제외하기 때문이다. — 0<>500은 TRUE이므로 303은 반환됩니다."
        },
        {
          "choiceId": "S2-E002-not-equal-null-D",
          "reason": "NULL은 자동으로 500으로 바뀌기 때문이다. — 비교 조건이 NULL을 숫자로 치환하지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c NULL과 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c CASE 표현식",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CASE-Expressions.html"
      }
    ]
  },
  {
    "code": "S2-E011-distinct-projection",
    "lessonCode": "E011",
    "subject": 2,
    "title": "DISTINCT의 기준 열을 줄이면",
    "labUrl": "lab.html?episode=E011&variant=customer&query=0",
    "topic": "집합과 중복",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E011-distinct-projection",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**purchases**\n\n| order_id | customer_id | menu |\n| --- | --- | --- |\n| 401 | 11 | 커피 |\n| 402 | 11 | 커피 |\n| 403 | 11 | 차 |\n| 404 | 22 | 커피 |\n\n**SQL A: customers**\n\n```sql\nSELECT DISTINCT customer_id FROM purchases ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>purchases</strong></p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>menu</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>11</td>\n<td>커피</td>\n</tr>\n<tr>\n<td>402</td>\n<td>11</td>\n<td>커피</td>\n</tr>\n<tr>\n<td>403</td>\n<td>11</td>\n<td>차</td>\n</tr>\n<tr>\n<td>404</td>\n<td>22</td>\n<td>커피</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: customers</strong></p>\n<pre><code class=\"language-sql\">SELECT DISTINCT customer_id FROM purchases ORDER BY customer_id\n</code></pre>\n",
      "stem": "SQL이 반환하는 customer_id 행 수는?",
      "choices": [
        {
          "id": "S2-E011-distinct-projection-B",
          "text": "3행"
        },
        {
          "id": "S2-E011-distinct-projection-A",
          "text": "4행"
        },
        {
          "id": "S2-E011-distinct-projection-D",
          "text": "2행"
        },
        {
          "id": "S2-E011-distinct-projection-C",
          "text": "1행"
        }
      ],
      "answerId": "S2-E011-distinct-projection-D",
      "reason": "SELECT 목록은 customer_id 한 열입니다. 11이 몇 번 나오거나 메뉴가 달라도 같은 값으로 보아 한 행이 되며 22까지 총 2행입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E011-distinct-projection-B",
          "reason": "3행 — 원래 (고객,메뉴) 쌍이 아니라 customer_id 한 열만 비교합니다."
        },
        {
          "choiceId": "S2-E011-distinct-projection-A",
          "reason": "4행 — DISTINCT가 같은 customer_id 11 세 개를 한 행으로 줄입니다."
        },
        {
          "choiceId": "S2-E011-distinct-projection-C",
          "reason": "1행 — 11과 22는 서로 다른 값입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S2-E011-distinct-unique-key",
    "lessonCode": "E011",
    "subject": 2,
    "title": "유일한 주문 번호까지 DISTINCT에 넣으면",
    "labUrl": "lab.html?episode=E011&variant=key&query=0",
    "topic": "집합과 중복",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E011-distinct-unique-key",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**purchases**\n\n| order_id | customer_id | menu |\n| --- | --- | --- |\n| 401 | 11 | 커피 |\n| 402 | 11 | 커피 |\n| 403 | 11 | 차 |\n| 404 | 22 | 커피 |\n\n**SQL A: with-id**\n\n```sql\nSELECT DISTINCT order_id, customer_id, menu FROM purchases ORDER BY order_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>purchases</strong></p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>menu</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>11</td>\n<td>커피</td>\n</tr>\n<tr>\n<td>402</td>\n<td>11</td>\n<td>커피</td>\n</tr>\n<tr>\n<td>403</td>\n<td>11</td>\n<td>차</td>\n</tr>\n<tr>\n<td>404</td>\n<td>22</td>\n<td>커피</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: with-id</strong></p>\n<pre><code class=\"language-sql\">SELECT DISTINCT order_id, customer_id, menu FROM purchases ORDER BY order_id\n</code></pre>\n",
      "stem": "이 SQL이 네 행을 모두 남기는 이유는?",
      "choices": [
        {
          "id": "S2-E011-distinct-unique-key-C",
          "text": "같은 고객의 행은 DISTINCT 대상에서 제외되기 때문이다."
        },
        {
          "id": "S2-E011-distinct-unique-key-D",
          "text": "DISTINCT는 행 수가 네 개 이하면 동작하지 않기 때문이다."
        },
        {
          "id": "S2-E011-distinct-unique-key-A",
          "text": "DISTINCT는 SELECT한 전체 튜플을 비교하며 order_id가 네 행에서 모두 다르기 때문이다."
        },
        {
          "id": "S2-E011-distinct-unique-key-B",
          "text": "DISTINCT는 문자열 menu를 비교하지 못하기 때문이다."
        }
      ],
      "answerId": "S2-E011-distinct-unique-key-A",
      "reason": "고객 11·메뉴 커피가 반복되어도 주문 번호 401과 402가 다릅니다. 전체 (order_id,customer_id,menu) 튜플이 네 개 모두 달라 제거되는 행이 없습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E011-distinct-unique-key-C",
          "reason": "같은 고객의 행은 DISTINCT 대상에서 제외되기 때문이다. — 고객이 같아도 선택한 다른 열이 다르면 별개 튜플입니다."
        },
        {
          "choiceId": "S2-E011-distinct-unique-key-D",
          "reason": "DISTINCT는 행 수가 네 개 이하면 동작하지 않기 때문이다. — DISTINCT에는 그런 최소 행 수 조건이 없습니다."
        },
        {
          "choiceId": "S2-E011-distinct-unique-key-B",
          "reason": "DISTINCT는 문자열 menu를 비교하지 못하기 때문이다. — DISTINCT는 문자열을 포함한 SELECT 결과의 중복을 판단합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S2-E005-union-internal-duplicate",
    "lessonCode": "E005",
    "subject": 2,
    "title": "한쪽이 비어도 UNION과 UNION ALL은 다를까",
    "labUrl": "lab.html?episode=E005&variant=right-empty&query=0",
    "topic": "집합과 중복",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E005-union-internal-duplicate",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**campaign_a**\n\n| customer_id |\n| --- |\n| 11 |\n| 11 |\n| 22 |\n\n**campaign_b**\n\n| customer_id |\n| --- |\n\n이 테이블은 0행입니다.\n\n**SQL A: UNION**\n\n```sql\nSELECT customer_id FROM campaign_a UNION SELECT customer_id FROM campaign_b ORDER BY customer_id\n```\n\n**SQL B: UNION ALL**\n\n```sql\nSELECT customer_id FROM campaign_a UNION ALL SELECT customer_id FROM campaign_b ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>campaign_a</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n</tbody>\n</table>\n<p><strong>campaign_b</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n</table>\n<p>이 테이블은 0행입니다.</p>\n<p><strong>SQL A: UNION</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id FROM campaign_a UNION SELECT customer_id FROM campaign_b ORDER BY customer_id\n</code></pre>\n<p><strong>SQL B: UNION ALL</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id FROM campaign_a UNION ALL SELECT customer_id FROM campaign_b ORDER BY customer_id\n</code></pre>\n",
      "stem": "SQL A(UNION)와 SQL B(UNION ALL)의 결과 행 수는?",
      "choices": [
        {
          "id": "S2-E005-union-internal-duplicate-B",
          "text": "A 2행, B 3행"
        },
        {
          "id": "S2-E005-union-internal-duplicate-A",
          "text": "A 3행, B 2행"
        },
        {
          "id": "S2-E005-union-internal-duplicate-C",
          "text": "둘 다 3행"
        },
        {
          "id": "S2-E005-union-internal-duplicate-D",
          "text": "둘 다 0행"
        }
      ],
      "answerId": "S2-E005-union-internal-duplicate-B",
      "reason": "campaign_b는 비어 있어도 campaign_a에는 11,11,22가 있습니다. UNION은 합친 결과 전체에서 11을 한 번으로 줄여 2행, UNION ALL은 세 행을 유지합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E005-union-internal-duplicate-A",
          "reason": "A 3행, B 2행 — 중복 제거를 수행하는 연산자는 UNION입니다."
        },
        {
          "choiceId": "S2-E005-union-internal-duplicate-C",
          "reason": "둘 다 3행 — UNION은 한쪽 테이블 내부의 중복도 제거합니다."
        },
        {
          "choiceId": "S2-E005-union-internal-duplicate-D",
          "reason": "둘 다 0행 — UNION은 교집합이 아니므로 왼쪽 결과가 유지됩니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c UNION과 UNION ALL",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/The-UNION-ALL-INTERSECT-MINUS-Operators.html"
      }
    ]
  },
  {
    "code": "S2-E005-union-equal-condition",
    "lessonCode": "E005",
    "subject": 2,
    "title": "두 집합 연산의 행 수가 같아지는 입력",
    "labUrl": "lab.html?episode=E005&variant=disjoint&query=0",
    "topic": "집합과 중복",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E005-union-equal-condition",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**campaign_a**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n\n**campaign_b**\n\n| customer_id |\n| --- |\n| 33 |\n| 44 |\n\n**SQL A: UNION**\n\n```sql\nSELECT customer_id FROM campaign_a UNION SELECT customer_id FROM campaign_b ORDER BY customer_id\n```\n\n**SQL B: UNION ALL**\n\n```sql\nSELECT customer_id FROM campaign_a UNION ALL SELECT customer_id FROM campaign_b ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>campaign_a</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n</tbody>\n</table>\n<p><strong>campaign_b</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>33</td>\n</tr>\n<tr>\n<td>44</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: UNION</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id FROM campaign_a UNION SELECT customer_id FROM campaign_b ORDER BY customer_id\n</code></pre>\n<p><strong>SQL B: UNION ALL</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id FROM campaign_a UNION ALL SELECT customer_id FROM campaign_b ORDER BY customer_id\n</code></pre>\n",
      "stem": "현재 입력에서 UNION과 UNION ALL이 모두 4행을 반환하는 이유는?",
      "choices": [
        {
          "id": "S2-E005-union-equal-condition-D",
          "text": "서로 다른 테이블을 사용하면 UNION은 중복을 검사하지 않기 때문이다."
        },
        {
          "id": "S2-E005-union-equal-condition-B",
          "text": "두 연산자는 언제나 같은 결과를 내기 때문이다."
        },
        {
          "id": "S2-E005-union-equal-condition-A",
          "text": "UNION ALL도 기본적으로 DISTINCT를 수행하기 때문이다."
        },
        {
          "id": "S2-E005-union-equal-condition-C",
          "text": "각 입력 내부와 두 입력 사이 모두에 중복 값이 없기 때문이다."
        }
      ],
      "answerId": "S2-E005-union-equal-condition-C",
      "reason": "입력은 11·22와 33·44입니다. 중복 제거 대상 자체가 없어 UNION도 네 행을 남기며 UNION ALL의 네 행과 같습니다. 이 결과가 연산자 의미가 같다는 뜻은 아닙니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E005-union-equal-condition-D",
          "reason": "서로 다른 테이블을 사용하면 UNION은 중복을 검사하지 않기 때문이다. — UNION의 중복 검사는 테이블이 다른지와 무관합니다."
        },
        {
          "choiceId": "S2-E005-union-equal-condition-B",
          "reason": "두 연산자는 언제나 같은 결과를 내기 때문이다. — 중복이 있으면 두 결과의 행 수가 달라집니다."
        },
        {
          "choiceId": "S2-E005-union-equal-condition-A",
          "reason": "UNION ALL도 기본적으로 DISTINCT를 수행하기 때문이다. — UNION ALL은 중복을 유지합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c UNION과 UNION ALL",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/The-UNION-ALL-INTERSECT-MINUS-Operators.html"
      }
    ]
  },
  {
    "code": "S2-E003-where-before-group",
    "lessonCode": "E003",
    "subject": 2,
    "title": "행 조건과 그룹 합계 조건의 차이",
    "labUrl": "lab.html?episode=E003&variant=where&query=0",
    "topic": "집계 조건",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E003-where-before-group",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원 · batch2-v1 자료\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 501 | 11 | 8 |\n| 502 | 11 | 7 |\n| 503 | 22 | 12 |\n\n**SQL A: WHERE**\n\n```sql\nSELECT customer_id FROM orders WHERE amount >= 15 GROUP BY customer_id ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원 · batch2-v1 자료</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>501</td>\n<td>11</td>\n<td>8</td>\n</tr>\n<tr>\n<td>502</td>\n<td>11</td>\n<td>7</td>\n</tr>\n<tr>\n<td>503</td>\n<td>22</td>\n<td>12</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: WHERE</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id FROM orders WHERE amount &gt;= 15 GROUP BY customer_id ORDER BY customer_id\n</code></pre>\n",
      "stem": "고객 11의 합계는 15인데 현재 WHERE SQL이 0행인 이유는?",
      "choices": [
        {
          "id": "S2-E003-where-before-group-B",
          "text": "GROUP BY는 두 행 이상의 그룹을 제거하기 때문이다."
        },
        {
          "id": "S2-E003-where-before-group-D",
          "text": "WHERE가 그룹화 전에 각 주문 금액 8·7·12를 검사하여 모든 행을 제거하기 때문이다."
        },
        {
          "id": "S2-E003-where-before-group-A",
          "text": "WHERE가 고객별 합계 15를 15보다 작다고 비교하기 때문이다."
        },
        {
          "id": "S2-E003-where-before-group-C",
          "text": "ORDER BY가 집계 결과를 비우기 때문이다."
        }
      ],
      "answerId": "S2-E003-where-before-group-D",
      "reason": "현재 WHERE amount>=15는 개별 행 8,7,12에 먼저 적용됩니다. 모두 탈락하므로 그룹 자체가 없습니다. 합계 15를 판단하려면 GROUP BY 뒤 HAVING SUM(amount)>=15가 필요합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E003-where-before-group-B",
          "reason": "GROUP BY는 두 행 이상의 그룹을 제거하기 때문이다. — GROUP BY에 그런 제거 규칙은 없습니다."
        },
        {
          "choiceId": "S2-E003-where-before-group-A",
          "reason": "WHERE가 고객별 합계 15를 15보다 작다고 비교하기 때문이다. — WHERE의 amount는 개별 주문 금액이며 합계가 아닙니다."
        },
        {
          "choiceId": "S2-E003-where-before-group-C",
          "reason": "ORDER BY가 집계 결과를 비우기 때문이다. — ORDER BY는 출력 순서를 정하며 행을 제거하지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c 집계 함수",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      }
    ]
  },
  {
    "code": "S2-E003-where-then-having",
    "lessonCode": "E003",
    "subject": 2,
    "title": "WHERE 뒤에는 원래 합계가 남아 있지 않다",
    "labUrl": "lab.html?episode=E003&variant=both&query=0",
    "topic": "집계 조건",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E003-where-then-having",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원 · batch2-v1 자료\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 501 | 11 | 8 |\n| 502 | 11 | 7 |\n| 503 | 22 | 12 |\n\n**SQL A: WHERE-then-HAVING**\n\n```sql\nSELECT customer_id FROM orders WHERE amount >= 10 GROUP BY customer_id HAVING SUM(amount) >= 15 ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원 · batch2-v1 자료</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>501</td>\n<td>11</td>\n<td>8</td>\n</tr>\n<tr>\n<td>502</td>\n<td>11</td>\n<td>7</td>\n</tr>\n<tr>\n<td>503</td>\n<td>22</td>\n<td>12</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: WHERE-then-HAVING</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id FROM orders WHERE amount &gt;= 10 GROUP BY customer_id HAVING SUM(amount) &gt;= 15 ORDER BY customer_id\n</code></pre>\n",
      "stem": "WHERE amount>=10과 HAVING SUM(amount)>=15를 함께 적용한 결과는?",
      "choices": [
        {
          "id": "S2-E003-where-then-having-A",
          "text": "0행"
        },
        {
          "id": "S2-E003-where-then-having-B",
          "text": "고객 11만"
        },
        {
          "id": "S2-E003-where-then-having-C",
          "text": "고객 22만"
        },
        {
          "id": "S2-E003-where-then-having-D",
          "text": "고객 11·22 모두"
        }
      ],
      "answerId": "S2-E003-where-then-having-A",
      "reason": "WHERE는 8·7을 제거하고 고객 22의 12만 남깁니다. 남은 그룹의 SUM은 12이므로 HAVING>=15에서 제거되어 최종 결과는 0행입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E003-where-then-having-B",
          "reason": "고객 11만 — 11의 주문 8·7은 WHERE에서 둘 다 제거됩니다."
        },
        {
          "choiceId": "S2-E003-where-then-having-C",
          "reason": "고객 22만 — 22의 12는 WHERE를 통과하지만 HAVING의 합계 15에 못 미칩니다."
        },
        {
          "choiceId": "S2-E003-where-then-having-D",
          "reason": "고객 11·22 모두 — WHERE 뒤의 그룹 합계를 다시 판단해야 합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c SELECT·조인·DISTINCT·HAVING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c 집계 함수",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      }
    ]
  },
  {
    "code": "S2-E018-exists-empty",
    "lessonCode": "E018",
    "subject": 2,
    "title": "EXISTS의 SELECT NULL과 빈 결과",
    "labUrl": "lab.html?episode=E018&variant=empty&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E018-exists-empty",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n\n이 테이블은 0행입니다.\n\n**SQL A: empty**\n\n```sql\nSELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o WHERE o.customer_id = c.customer_id) ORDER BY c.customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n</table>\n<p>이 테이블은 0행입니다.</p>\n<p><strong>SQL A: empty</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o WHERE o.customer_id = c.customer_id) ORDER BY c.customer_id\n</code></pre>\n",
      "stem": "이 SQL이 반환하는 고객 수와 그 이유는?",
      "choices": [
        {
          "id": "S2-E018-exists-empty-B",
          "text": "0명. 상관 서브쿼리가 어느 고객에 대해서도 행을 반환하지 않는다."
        },
        {
          "id": "S2-E018-exists-empty-C",
          "text": "3명. SELECT NULL이 한 행을 자동으로 만든다."
        },
        {
          "id": "S2-E018-exists-empty-D",
          "text": "3명. 고객 테이블에 세 행이 있기만 하면 EXISTS는 참이다."
        },
        {
          "id": "S2-E018-exists-empty-A",
          "text": "NULL 때문에 오류가 난다."
        }
      ],
      "answerId": "S2-E018-exists-empty-B",
      "reason": "EXISTS는 SELECT 목록의 NULL 자체가 아니라 서브쿼리 결과 행이 하나라도 있는지 봅니다. 현재 orders가 0행이므로 모든 고객에 대해 FALSE이고 결과도 0명입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E018-exists-empty-C",
          "reason": "3명. SELECT NULL이 한 행을 자동으로 만든다. — FROM orders가 빈 테이블이면 SELECT NULL도 반환 행이 없습니다."
        },
        {
          "choiceId": "S2-E018-exists-empty-D",
          "reason": "3명. 고객 테이블에 세 행이 있기만 하면 EXISTS는 참이다. — EXISTS는 바깥 행 수가 아니라 서브쿼리 행의 존재를 봅니다."
        },
        {
          "choiceId": "S2-E018-exists-empty-A",
          "reason": "NULL 때문에 오류가 난다. — EXISTS 안에서 SELECT NULL을 사용하는 것은 유효합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c EXISTS 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      }
    ]
  },
  {
    "code": "S2-E018-exists-missing-correlation",
    "lessonCode": "E018",
    "subject": 2,
    "title": "상관 조건을 빠뜨린 EXISTS",
    "labUrl": "lab.html?episode=E018&variant=uncorrelated&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E018-exists-missing-correlation",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers**\n\n| customer_id |\n| --- |\n| 11 |\n| 22 |\n| 33 |\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 501 | 11 | 8 |\n| 502 | 11 | 7 |\n| 503 | 22 | 12 |\n\n**SQL A: uncorrelated**\n\n```sql\nSELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o) ORDER BY c.customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n</tr>\n<tr>\n<td>22</td>\n</tr>\n<tr>\n<td>33</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>501</td>\n<td>11</td>\n<td>8</td>\n</tr>\n<tr>\n<td>502</td>\n<td>11</td>\n<td>7</td>\n</tr>\n<tr>\n<td>503</td>\n<td>22</td>\n<td>12</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: uncorrelated</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o) ORDER BY c.customer_id\n</code></pre>\n",
      "stem": "주문이 없는 고객 33까지 반환되는 이유는?",
      "choices": [
        {
          "id": "S2-E018-exists-missing-correlation-C",
          "text": "서브쿼리에 바깥 고객과 연결하는 조건이 없어 orders의 한 행 존재가 모든 고객에게 동일하게 적용되기 때문이다."
        },
        {
          "id": "S2-E018-exists-missing-correlation-A",
          "text": "EXISTS가 자동으로 고객 번호를 연결하기 때문이다."
        },
        {
          "id": "S2-E018-exists-missing-correlation-B",
          "text": "orders가 비어 있기 때문이다."
        },
        {
          "id": "S2-E018-exists-missing-correlation-D",
          "text": "EXISTS가 NULL을 주문 번호 33으로 바꾸기 때문이다."
        }
      ],
      "answerId": "S2-E018-exists-missing-correlation-C",
      "reason": "WHERE o.customer_id=c.customer_id 같은 상관 조건이 없습니다. orders가 비어 있지 않아 EXISTS는 모든 바깥 행에서 TRUE가 되므로 11·22·33을 모두 반환합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E018-exists-missing-correlation-A",
          "reason": "EXISTS가 자동으로 고객 번호를 연결하기 때문이다. — 자동 상관은 없으며 SQL에 연결 조건을 써야 합니다."
        },
        {
          "choiceId": "S2-E018-exists-missing-correlation-B",
          "reason": "orders가 비어 있기 때문이다. — 현재 orders에는 세 행이 있으므로 EXISTS가 TRUE입니다."
        },
        {
          "choiceId": "S2-E018-exists-missing-correlation-D",
          "reason": "EXISTS가 NULL을 주문 번호 33으로 바꾸기 때문이다. — SELECT NULL의 값은 행 존재 검사 결과에 영향을 주지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c EXISTS 조건",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      }
    ]
  },
  {
    "code": "S2-E021-rank-unique-order",
    "lessonCode": "E021",
    "subject": 2,
    "title": "RANK의 동률을 정하는 전체 정렬 키",
    "labUrl": "lab.html?episode=E021&variant=unique&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E021-rank-unique-order",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**scores**\n\n| customer_id | score |\n| --- | --- |\n| 11 | 90 |\n| 22 | 90 |\n| 33 | 80 |\n| 44 | 70 |\n\n**SQL A: unique-key**\n\n```sql\nSELECT customer_id, RANK() OVER (ORDER BY score DESC, customer_id) AS r, DENSE_RANK() OVER (ORDER BY score DESC, customer_id) AS d FROM scores ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>scores</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>score</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n<td>90</td>\n</tr>\n<tr>\n<td>22</td>\n<td>90</td>\n</tr>\n<tr>\n<td>33</td>\n<td>80</td>\n</tr>\n<tr>\n<td>44</td>\n<td>70</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: unique-key</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id, RANK() OVER (ORDER BY score DESC, customer_id) AS r, DENSE_RANK() OVER (ORDER BY score DESC, customer_id) AS d FROM scores ORDER BY customer_id\n</code></pre>\n",
      "stem": "score가 90으로 같은 11·22의 RANK가 1·2로 달라지는 이유는?",
      "choices": [
        {
          "id": "S2-E021-rank-unique-order-C",
          "text": "DENSE_RANK만 customer_id를 무시하기 때문이다."
        },
        {
          "id": "S2-E021-rank-unique-order-A",
          "text": "RANK는 같은 점수에 같은 순위를 줄 수 없기 때문이다."
        },
        {
          "id": "S2-E021-rank-unique-order-B",
          "text": "출력 ORDER BY만 바꾸어도 윈도우 순위가 달라지기 때문이다."
        },
        {
          "id": "S2-E021-rank-unique-order-D",
          "text": "윈도우 ORDER BY에 customer_id가 포함되어 두 행의 전체 정렬 키가 다르기 때문이다."
        }
      ],
      "answerId": "S2-E021-rank-unique-order-D",
      "reason": "동률은 score 한 열이 아니라 OVER의 전체 ORDER BY로 판단합니다. (90,11)과 (90,22)는 달라 RANK와 DENSE_RANK 모두 1,2,3,4가 됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E021-rank-unique-order-C",
          "reason": "DENSE_RANK만 customer_id를 무시하기 때문이다. — 이 SQL에서는 두 순위 함수 모두 같은 전체 정렬 키를 씁니다."
        },
        {
          "choiceId": "S2-E021-rank-unique-order-A",
          "reason": "RANK는 같은 점수에 같은 순위를 줄 수 없기 때문이다. — 점수만 정렬하면 11·22는 같은 RANK를 받습니다."
        },
        {
          "choiceId": "S2-E021-rank-unique-order-B",
          "reason": "출력 ORDER BY만 바꾸어도 윈도우 순위가 달라지기 때문이다. — 순위를 정하는 것은 OVER 안의 ORDER BY입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c RANK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/RANK.html"
      },
      {
        "title": "Oracle 19c DENSE_RANK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/DENSE_RANK.html"
      },
      {
        "title": "Oracle 19c 분석 함수·윈도우 프레임",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ]
  },
  {
    "code": "S2-E021-rank-all-peers",
    "lessonCode": "E021",
    "subject": 2,
    "title": "모두 같은 점수일 때 순위 두 함수",
    "labUrl": "lab.html?episode=E021&variant=ties&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-E021-rank-all-peers",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**scores**\n\n| customer_id | score |\n| --- | --- |\n| 11 | 90 |\n| 22 | 90 |\n| 33 | 90 |\n| 44 | 90 |\n\n**SQL A: all-ties**\n\n```sql\nSELECT customer_id, RANK() OVER (ORDER BY score DESC) AS r, DENSE_RANK() OVER (ORDER BY score DESC) AS d FROM scores ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>scores</strong></p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>score</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n<td>90</td>\n</tr>\n<tr>\n<td>22</td>\n<td>90</td>\n</tr>\n<tr>\n<td>33</td>\n<td>90</td>\n</tr>\n<tr>\n<td>44</td>\n<td>90</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: all-ties</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id, RANK() OVER (ORDER BY score DESC) AS r, DENSE_RANK() OVER (ORDER BY score DESC) AS d FROM scores ORDER BY customer_id\n</code></pre>\n",
      "stem": "모든 score가 90인 현재 SQL의 RANK와 DENSE_RANK는?",
      "choices": [
        {
          "id": "S2-E021-rank-all-peers-A",
          "text": "네 행 모두 (1, 1)이다."
        },
        {
          "id": "S2-E021-rank-all-peers-D",
          "text": "RANK는 모두 4, DENSE_RANK는 모두 1이다."
        },
        {
          "id": "S2-E021-rank-all-peers-B",
          "text": "RANK는 1·2·3·4, DENSE_RANK는 모두 1이다."
        },
        {
          "id": "S2-E021-rank-all-peers-C",
          "text": "두 함수 모두 1·2·3·4이다."
        }
      ],
      "answerId": "S2-E021-rank-all-peers-A",
      "reason": "윈도우 정렬 기준은 score DESC 한 열이고 네 점수가 같습니다. 모두 첫 동률 집합에 속하므로 RANK와 DENSE_RANK가 각 행에 1을 부여합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-E021-rank-all-peers-D",
          "reason": "RANK는 모두 4, DENSE_RANK는 모두 1이다. — RANK는 동률 묶음의 첫 위치를 사용하므로 모두 1입니다."
        },
        {
          "choiceId": "S2-E021-rank-all-peers-B",
          "reason": "RANK는 1·2·3·4, DENSE_RANK는 모두 1이다. — RANK도 동률에 같은 순위를 부여합니다."
        },
        {
          "choiceId": "S2-E021-rank-all-peers-C",
          "reason": "두 함수 모두 1·2·3·4이다. — OVER 안에 customer_id 정렬 조건은 없습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c RANK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/RANK.html"
      },
      {
        "title": "Oracle 19c DENSE_RANK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/DENSE_RANK.html"
      },
      {
        "title": "Oracle 19c 분석 함수·윈도우 프레임",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ]
  },
  {
    "code": "S2-TH-05-list-versus-aggregate",
    "lessonCode": "TH-05",
    "subject": 2,
    "title": "입력 0행과 결과 1행을 구분하기",
    "labUrl": "lab.html?episode=TH-05&variant=base&query=0",
    "topic": "NULL과 집계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-05-list-versus-aggregate",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: 주문 목록**\n\n```sql\nSELECT order_id, amount FROM orders WHERE amount > 100 ORDER BY order_id\n```\n\n**SQL B: 전체 집계**\n\n```sql\nSELECT COUNT(*) AS row_count, SUM(amount) AS total FROM orders WHERE amount > 100\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 주문 목록</strong></p>\n<pre><code class=\"language-sql\">SELECT order_id, amount FROM orders WHERE amount &gt; 100 ORDER BY order_id\n</code></pre>\n<p><strong>SQL B: 전체 집계</strong></p>\n<pre><code class=\"language-sql\">SELECT COUNT(*) AS row_count, SUM(amount) AS total FROM orders WHERE amount &gt; 100\n</code></pre>\n",
      "stem": "SQL A(주문 목록)와 SQL B(전체 집계)의 반환 형태는?",
      "choices": [
        {
          "id": "S2-TH-05-list-versus-aggregate-A",
          "text": "A는 0행, B는 (NULL, NULL)인 1행"
        },
        {
          "id": "S2-TH-05-list-versus-aggregate-D",
          "text": "A는 NULL인 1행, B는 (0, 0)인 1행"
        },
        {
          "id": "S2-TH-05-list-versus-aggregate-B",
          "text": "A는 0행, B는 (0, NULL)인 1행"
        },
        {
          "id": "S2-TH-05-list-versus-aggregate-C",
          "text": "A와 B 모두 0행"
        }
      ],
      "answerId": "S2-TH-05-list-versus-aggregate-B",
      "reason": "amount>100인 주문이 없어 일반 목록 A는 비어 있습니다. B는 빈 입력 전체를 집계하여 COUNT 0과 SUM NULL을 한 행으로 반환합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-05-list-versus-aggregate-A",
          "reason": "A는 0행, B는 (NULL, NULL)인 1행 — B의 COUNT(*)는 0입니다."
        },
        {
          "choiceId": "S2-TH-05-list-versus-aggregate-D",
          "reason": "A는 NULL인 1행, B는 (0, 0)인 1행 — 일반 목록은 0행이고 SUM은 NULL입니다."
        },
        {
          "choiceId": "S2-TH-05-list-versus-aggregate-C",
          "reason": "A와 B 모두 0행 — GROUP BY 없는 전체 집계 B는 한 행을 반환합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-TH-05-having-removes-global-row",
    "lessonCode": "TH-05",
    "subject": 2,
    "title": "전체 집계의 한 행도 HAVING으로 제거된다",
    "labUrl": "lab.html?episode=TH-05&variant=base&query=2",
    "topic": "집계 조건",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-05-having-removes-global-row",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: HAVING 적용**\n\n```sql\nSELECT COUNT(*) AS row_count FROM orders WHERE amount > 100 HAVING COUNT(*) > 0\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: HAVING 적용</strong></p>\n<pre><code class=\"language-sql\">SELECT COUNT(*) AS row_count FROM orders WHERE amount &gt; 100 HAVING COUNT(*) &gt; 0\n</code></pre>\n",
      "stem": "이 SQL이 최종적으로 0행을 반환하는 이유는?",
      "choices": [
        {
          "id": "S2-TH-05-having-removes-global-row-C",
          "text": "COUNT(*)가 0인 전체 집계 행이 HAVING COUNT(*)>0에서 제거되기 때문이다."
        },
        {
          "id": "S2-TH-05-having-removes-global-row-D",
          "text": "GROUP BY가 없으면 COUNT를 사용할 수 없기 때문이다."
        },
        {
          "id": "S2-TH-05-having-removes-global-row-B",
          "text": "HAVING은 집계 전에 원본 주문을 제거하기 때문이다."
        },
        {
          "id": "S2-TH-05-having-removes-global-row-A",
          "text": "집계 함수가 0을 반환하면 SQL 엔진이 항상 그 행을 숨기기 때문이다."
        }
      ],
      "answerId": "S2-TH-05-having-removes-global-row-C",
      "reason": "WHERE 이후 입력은 0행이어서 전체 COUNT는 0입니다. HAVING의 0>0은 FALSE이므로 한 행의 집계 결과까지 제거됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-05-having-removes-global-row-D",
          "reason": "GROUP BY가 없으면 COUNT를 사용할 수 없기 때문이다. — 전체 COUNT는 GROUP BY 없이 사용할 수 있습니다."
        },
        {
          "choiceId": "S2-TH-05-having-removes-global-row-B",
          "reason": "HAVING은 집계 전에 원본 주문을 제거하기 때문이다. — 원본 행은 WHERE가 제거하고 HAVING은 집계 후 적용됩니다."
        },
        {
          "choiceId": "S2-TH-05-having-removes-global-row-A",
          "reason": "집계 함수가 0을 반환하면 SQL 엔진이 항상 그 행을 숨기기 때문이다. — 제거하는 것은 명시된 HAVING 조건입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-TH-15-not-exists-unmatched",
    "lessonCode": "TH-15",
    "subject": 2,
    "title": "연관 주문이 없는 고객 찾기",
    "labUrl": "lab.html?episode=TH-15&variant=base&query=2",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-15-not-exists-unmatched",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers** — 직접 만든 교육용 데이터\n\n| customer_id | customer_name |\n| --- | --- |\n| 1 | MIN |\n| 2 | JUN |\n| 3 | SOL |\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: NOT EXISTS**\n\n```sql\nSELECT c.customer_id FROM customers c WHERE NOT EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>customer_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>JUN</td>\n</tr>\n<tr>\n<td>3</td>\n<td>SOL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: NOT EXISTS</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id FROM customers c WHERE NOT EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id\n</code></pre>\n",
      "stem": "SQL이 반환하는 고객은?",
      "choices": [
        {
          "id": "S2-TH-15-not-exists-unmatched-A",
          "text": "1·2번"
        },
        {
          "id": "S2-TH-15-not-exists-unmatched-B",
          "text": "1·2·3번"
        },
        {
          "id": "S2-TH-15-not-exists-unmatched-C",
          "text": "없음"
        },
        {
          "id": "S2-TH-15-not-exists-unmatched-D",
          "text": "3번만"
        }
      ],
      "answerId": "S2-TH-15-not-exists-unmatched-D",
      "reason": "1번은 주문 101·102, 2번은 103이 있습니다. 3번은 같은 customer_id의 주문 행이 전혀 없으므로 NOT EXISTS가 TRUE입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-15-not-exists-unmatched-A",
          "reason": "1·2번 — 1·2는 연관 주문이 있어 NOT EXISTS가 FALSE입니다."
        },
        {
          "choiceId": "S2-TH-15-not-exists-unmatched-B",
          "reason": "1·2·3번 — NOT EXISTS는 주문이 없는 고객만 남깁니다."
        },
        {
          "choiceId": "S2-TH-15-not-exists-unmatched-C",
          "reason": "없음 — 3번과 연결되는 주문이 없으므로 3번은 조건을 통과합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · IN-Condition",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/IN-Condition.html"
      },
      {
        "title": "Oracle 19c · EXISTS-Condition",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      }
    ]
  },
  {
    "code": "S2-TH-15-semi-join-multiplicity",
    "lessonCode": "TH-15",
    "subject": 2,
    "title": "매칭 주문이 늘어도 고객이 복제되지 않는 조건",
    "labUrl": "lab.html?episode=TH-15&variant=extra&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-15-semi-join-multiplicity",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers** — 직접 만든 교육용 데이터\n\n| customer_id | customer_name |\n| --- | --- |\n| 1 | MIN |\n| 2 | JUN |\n| 3 | SOL |\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n| 104 | 1 | 30 |\n\n**SQL A: IN**\n\n```sql\nSELECT customer_id FROM customers WHERE customer_id IN (SELECT customer_id FROM orders) ORDER BY customer_id\n```\n\n**SQL B: EXISTS**\n\n```sql\nSELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>customer_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>JUN</td>\n</tr>\n<tr>\n<td>3</td>\n<td>SOL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n<tr>\n<td>104</td>\n<td>1</td>\n<td>30</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: IN</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id FROM customers WHERE customer_id IN (SELECT customer_id FROM orders) ORDER BY customer_id\n</code></pre>\n<p><strong>SQL B: EXISTS</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id\n</code></pre>\n",
      "stem": "고객 1의 주문을 하나 더 넣은 현재 IN과 EXISTS의 고객 결과는?",
      "choices": [
        {
          "id": "S2-TH-15-semi-join-multiplicity-C",
          "text": "EXISTS만 고객 1을 세 번 반환한다."
        },
        {
          "id": "S2-TH-15-semi-join-multiplicity-D",
          "text": "두 SQL 모두 고객 1을 세 번 반환한다."
        },
        {
          "id": "S2-TH-15-semi-join-multiplicity-B",
          "text": "IN만 고객 1을 세 번 반환한다."
        },
        {
          "id": "S2-TH-15-semi-join-multiplicity-A",
          "text": "두 SQL 모두 고객 1·2를 각각 한 번씩 반환한다."
        }
      ],
      "answerId": "S2-TH-15-semi-join-multiplicity-A",
      "reason": "IN과 상관 EXISTS는 바깥 customers의 각 행을 남길지 판단합니다. 고객 1의 매칭 주문이 세 건이어도 고객 행을 세 번 만들지 않아 두 SQL 모두 1·2 각 한 행입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-15-semi-join-multiplicity-C",
          "reason": "EXISTS만 고객 1을 세 번 반환한다. — EXISTS는 첫 매칭 존재로 참이 될 뿐 조인 결과 행을 만드는 연산이 아닙니다."
        },
        {
          "choiceId": "S2-TH-15-semi-join-multiplicity-D",
          "reason": "두 SQL 모두 고객 1을 세 번 반환한다. — 바깥 customers는 고객마다 한 행입니다. 조건 통과 여부만 달라집니다."
        },
        {
          "choiceId": "S2-TH-15-semi-join-multiplicity-B",
          "reason": "IN만 고객 1을 세 번 반환한다. — IN은 포함 여부를 검사하며 바깥 고객 행을 매칭 건수만큼 복제하지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · IN-Condition",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/IN-Condition.html"
      },
      {
        "title": "Oracle 19c · EXISTS-Condition",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      }
    ]
  },
  {
    "code": "S2-TH-16-scalar-no-row",
    "lessonCode": "TH-16",
    "subject": 2,
    "title": "스칼라 결과가 없어도 바깥 행은 남는다",
    "labUrl": "lab.html?episode=TH-16&variant=base&query=0",
    "topic": "조인과 서브쿼리",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-16-scalar-no-row",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**customers** — 직접 만든 교육용 데이터\n\n| customer_id | customer_name |\n| --- | --- |\n| 1 | MIN |\n| 2 | JUN |\n| 3 | SOL |\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: 0행 또는 1행**\n\n```sql\nSELECT c.customer_id, (SELECT o.amount FROM orders o WHERE o.customer_id=c.customer_id AND o.order_id=103) AS one_amount FROM customers c ORDER BY c.customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>customers</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>customer_id</th>\n<th>customer_name</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>MIN</td>\n</tr>\n<tr>\n<td>2</td>\n<td>JUN</td>\n</tr>\n<tr>\n<td>3</td>\n<td>SOL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 0행 또는 1행</strong></p>\n<pre><code class=\"language-sql\">SELECT c.customer_id, (SELECT o.amount FROM orders o WHERE o.customer_id=c.customer_id AND o.order_id=103) AS one_amount FROM customers c ORDER BY c.customer_id\n</code></pre>\n",
      "stem": "고객 1·2·3의 one_amount 값은 순서대로?",
      "choices": [
        {
          "id": "S2-TH-16-scalar-no-row-B",
          "text": "(NULL, 5, NULL)"
        },
        {
          "id": "S2-TH-16-scalar-no-row-D",
          "text": "고객 2 한 행만 반환된다."
        },
        {
          "id": "S2-TH-16-scalar-no-row-C",
          "text": "(0, 5, 0)"
        },
        {
          "id": "S2-TH-16-scalar-no-row-A",
          "text": "(10, 5, NULL)"
        }
      ],
      "answerId": "S2-TH-16-scalar-no-row-B",
      "reason": "103번 주문은 고객 2의 금액 5입니다. 고객 1·3의 상관 서브쿼리는 0행이라 값이 NULL이 되지만 바깥 고객 행 자체는 남습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-16-scalar-no-row-D",
          "reason": "고객 2 한 행만 반환된다. — 이 SQL의 바깥 customers를 제거하는 WHERE는 없습니다."
        },
        {
          "choiceId": "S2-TH-16-scalar-no-row-C",
          "reason": "(0, 5, 0) — 스칼라 서브쿼리 0행은 0이 아니라 NULL입니다."
        },
        {
          "choiceId": "S2-TH-16-scalar-no-row-A",
          "reason": "(10, 5, NULL) — 서브쿼리는 order_id=103 조건까지 만족해야 합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Scalar-Subquery-Expressions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Scalar-Subquery-Expressions.html"
      }
    ]
  },
  {
    "code": "S2-TH-32-root-parent-null",
    "lessonCode": "TH-32",
    "subject": 2,
    "title": "부모를 내부 조인하면 루트는 왜 사라질까",
    "labUrl": "lab.html?episode=TH-32&variant=base&query=1",
    "topic": "계층 관계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-32-root-parent-null",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래는 각 노드를 직접 부모와 한 단계 연결하는 INNER JOIN입니다. Oracle CONNECT BY의 재귀 탐색이 아니며, 루트 행을 자동으로 생성하거나 보존하지 않습니다.\n\n**nodes** — 직접 만든 교육용 데이터\n\n| node_id | parent_id |\n| --- | --- |\n| 1 | NULL |\n| 2 | 1 |\n| 3 | 1 |\n| 4 | 2 |\n\n**SQL A: 자식 → 부모**\n\n```sql\nSELECT c.node_id AS child_node, p.node_id AS parent_node FROM nodes c JOIN nodes p ON c.parent_id=p.node_id ORDER BY c.node_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래는 각 노드를 직접 부모와 한 단계 연결하는 INNER JOIN입니다. Oracle CONNECT BY의 재귀 탐색이 아니며, 루트 행을 자동으로 생성하거나 보존하지 않습니다.</p>\n<p><strong>nodes</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>node_id</th>\n<th>parent_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n</tr>\n<tr>\n<td>3</td>\n<td>1</td>\n</tr>\n<tr>\n<td>4</td>\n<td>2</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 자식 → 부모</strong></p>\n<pre><code class=\"language-sql\">SELECT c.node_id AS child_node, p.node_id AS parent_node FROM nodes c JOIN nodes p ON c.parent_id=p.node_id ORDER BY c.node_id\n</code></pre>\n",
      "stem": "node_id=1인 루트가 child_node 결과에 나타나지 않는 이유는?",
      "choices": [
        {
          "id": "S2-TH-32-root-parent-null-B",
          "text": "NULL=1이 TRUE여서 루트가 자기 자신과 합쳐지기 때문이다."
        },
        {
          "id": "S2-TH-32-root-parent-null-A",
          "text": "루트는 nodes에 저장되어 있지 않기 때문이다."
        },
        {
          "id": "S2-TH-32-root-parent-null-D",
          "text": "JOIN이 node_id가 작은 첫 행을 자동으로 제거하기 때문이다."
        },
        {
          "id": "S2-TH-32-root-parent-null-C",
          "text": "루트의 parent_id가 NULL이어서 부모 행과의 등가 조건이 TRUE가 되지 않고, INNER JOIN은 미매칭 행을 보존하지 않기 때문이다."
        }
      ],
      "answerId": "S2-TH-32-root-parent-null-C",
      "reason": "루트 1의 parent_id는 NULL입니다. NULL=p.node_id는 어느 부모 행에도 TRUE가 아니므로 매칭 부모가 없습니다. 일반 JOIN은 INNER JOIN이어서 루트 바깥 행을 남기지 않고 (2,1),(3,1),(4,2)만 반환합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-32-root-parent-null-B",
          "reason": "NULL=1이 TRUE여서 루트가 자기 자신과 합쳐지기 때문이다. — NULL 비교는 UNKNOWN이며 일치 행이 만들어지지 않습니다."
        },
        {
          "choiceId": "S2-TH-32-root-parent-null-A",
          "reason": "루트는 nodes에 저장되어 있지 않기 때문이다. — 입력 표에 (1,NULL)인 루트 행이 존재합니다."
        },
        {
          "choiceId": "S2-TH-32-root-parent-null-D",
          "reason": "JOIN이 node_id가 작은 첫 행을 자동으로 제거하기 때문이다. — 번호의 크기나 물리적 첫 위치는 JOIN의 제거 조건이 아닙니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Hierarchical-Queries",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Hierarchical-Queries.html"
      },
      {
        "title": "Oracle 19c · Joins",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Joins.html"
      }
    ]
  },
  {
    "code": "S2-TH-21-group-columns-order",
    "lessonCode": "TH-21",
    "subject": 2,
    "title": "GROUP BY 열의 나열 순서를 바꾸면",
    "labUrl": "lab.html?episode=TH-21&variant=base&query=0",
    "topic": "그룹과 소계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-21-group-columns-order",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**sales** — 직접 만든 교육용 데이터\n\n| sale_id | region_id | product_id | amount |\n| --- | --- | --- | --- |\n| 1 | 1 | 10 | 10 |\n| 2 | 1 | 20 | 20 |\n| 3 | 2 | 10 | 5 |\n\n**SQL A: 지역·상품**\n\n```sql\nSELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id ORDER BY region_id, product_id\n```\n\n**SQL B: 상품·지역**\n\n```sql\nSELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id, region_id ORDER BY region_id, product_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>sales</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>sale_id</th>\n<th>region_id</th>\n<th>product_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1</td>\n<td>10</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n<td>20</td>\n<td>20</td>\n</tr>\n<tr>\n<td>3</td>\n<td>2</td>\n<td>10</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 지역·상품</strong></p>\n<pre><code class=\"language-sql\">SELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id ORDER BY region_id, product_id\n</code></pre>\n<p><strong>SQL B: 상품·지역</strong></p>\n<pre><code class=\"language-sql\">SELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id, region_id ORDER BY region_id, product_id\n</code></pre>\n",
      "stem": "SQL A와 B의 그룹별 합계에 대한 설명으로 맞는 것은?",
      "choices": [
        {
          "id": "S2-TH-21-group-columns-order-C",
          "text": "A는 3행, B는 2행이다."
        },
        {
          "id": "S2-TH-21-group-columns-order-A",
          "text": "먼저 적은 열별 소계가 자동으로 추가된다."
        },
        {
          "id": "S2-TH-21-group-columns-order-B",
          "text": "B는 product_id만 그룹화한다."
        },
        {
          "id": "S2-TH-21-group-columns-order-D",
          "text": "GROUP BY의 두 열 순서만 바뀌므로 같은 (region_id, product_id)별 합계를 반환한다."
        }
      ],
      "answerId": "S2-TH-21-group-columns-order-D",
      "reason": "두 SQL 모두 region_id와 product_id의 같은 조합끼리 묶습니다. 일반 GROUP BY에서 열 순서만 바꾸어도 그룹 구성은 달라지지 않으며 명시된 출력 정렬도 같습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-21-group-columns-order-C",
          "reason": "A는 3행, B는 2행이다. — 그룹 키 조합 자체가 같으므로 그룹 수는 모두 3입니다."
        },
        {
          "choiceId": "S2-TH-21-group-columns-order-A",
          "reason": "먼저 적은 열별 소계가 자동으로 추가된다. — 일반 GROUP BY의 열 나열 순서는 ROLLUP 계층을 만들지 않습니다."
        },
        {
          "choiceId": "S2-TH-21-group-columns-order-B",
          "reason": "B는 product_id만 그룹화한다. — B의 GROUP BY에도 두 열이 모두 지정되어 있습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-TH-21-group-output-order",
    "lessonCode": "TH-21",
    "subject": 2,
    "title": "그룹화 결과의 표시 순서는 어디서 정할까",
    "labUrl": "lab.html?episode=TH-21&variant=reverse&query=0",
    "topic": "그룹과 소계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-21-group-output-order",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**sales** — 직접 만든 교육용 데이터\n\n| sale_id | region_id | product_id | amount |\n| --- | --- | --- | --- |\n| 1 | 1 | 10 | 10 |\n| 2 | 1 | 20 | 20 |\n| 3 | 2 | 10 | 5 |\n\n**SQL A: ORDER BY 변경**\n\n```sql\nSELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id ORDER BY region_id DESC, product_id DESC\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>sales</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>sale_id</th>\n<th>region_id</th>\n<th>product_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1</td>\n<td>10</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n<td>20</td>\n<td>20</td>\n</tr>\n<tr>\n<td>3</td>\n<td>2</td>\n<td>10</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: ORDER BY 변경</strong></p>\n<pre><code class=\"language-sql\">SELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id ORDER BY region_id DESC, product_id DESC\n</code></pre>\n",
      "stem": "최종 결과의 첫 행 (region_id, product_id, total)은?",
      "choices": [
        {
          "id": "S2-TH-21-group-output-order-D",
          "text": "(NULL, NULL, 35)"
        },
        {
          "id": "S2-TH-21-group-output-order-B",
          "text": "(1, 10, 10)"
        },
        {
          "id": "S2-TH-21-group-output-order-A",
          "text": "(2, 10, 5)"
        },
        {
          "id": "S2-TH-21-group-output-order-C",
          "text": "(1, 20, 20)"
        }
      ],
      "answerId": "S2-TH-21-group-output-order-A",
      "reason": "ORDER BY region_id DESC, product_id DESC가 표시 순서를 정합니다. 지역 2가 먼저이고 그 지역의 유일한 상품은 10, 합계는 5입니다. GROUP BY 자체로 정렬을 추정하면 안 됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-21-group-output-order-D",
          "reason": "(NULL, NULL, 35) — 이 SQL은 일반 GROUP BY이며 총계 행을 만들지 않습니다."
        },
        {
          "choiceId": "S2-TH-21-group-output-order-B",
          "reason": "(1, 10, 10) — 현재 ORDER BY는 두 키 모두 DESC입니다."
        },
        {
          "choiceId": "S2-TH-21-group-output-order-C",
          "reason": "(1, 20, 20) — region_id DESC가 우선이라 2번 지역이 먼저입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-TH-22-rollup-levels",
    "lessonCode": "TH-22",
    "subject": 2,
    "title": "두 열 ROLLUP의 그룹 조합",
    "labUrl": "lab.html?episode=TH-22&variant=base&query=0",
    "topic": "그룹과 소계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-22-rollup-levels",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n이 체험은 ROLLUP/CUBE의 그룹 조합을 일반 GROUP BY와 UNION ALL로 펼친 SQL입니다. SQLite에서 Oracle ROLLUP/CUBE 문법을 직접 실행한 결과가 아닙니다. level_no 0=상세, 1=지역 소계, 2=상품 소계, 3=전체 총계입니다.\n\n**sales** — 직접 만든 교육용 데이터\n\n| sale_id | region_id | product_id | amount |\n| --- | --- | --- | --- |\n| 1 | 1 | 10 | 10 |\n| 2 | 1 | 20 | 20 |\n| 3 | 2 | 10 | 5 |\n\n**SQL A: ROLLUP의 그룹 구성**\n\n```sql\nSELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>이 체험은 ROLLUP/CUBE의 그룹 조합을 일반 GROUP BY와 UNION ALL로 펼친 SQL입니다. SQLite에서 Oracle ROLLUP/CUBE 문법을 직접 실행한 결과가 아닙니다. level_no 0=상세, 1=지역 소계, 2=상품 소계, 3=전체 총계입니다.</p>\n<p><strong>sales</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>sale_id</th>\n<th>region_id</th>\n<th>product_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1</td>\n<td>10</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n<td>20</td>\n<td>20</td>\n</tr>\n<tr>\n<td>3</td>\n<td>2</td>\n<td>10</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: ROLLUP의 그룹 구성</strong></p>\n<pre><code class=\"language-sql\">SELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id\n</code></pre>\n",
      "stem": "이 SQL이 나타내는 ROLLUP(region_id,product_id)의 그룹 단계는?",
      "choices": [
        {
          "id": "S2-TH-22-rollup-levels-D",
          "text": "(region_id), (product_id) 두 단계만"
        },
        {
          "id": "S2-TH-22-rollup-levels-B",
          "text": "(region_id,product_id), (region_id), ()"
        },
        {
          "id": "S2-TH-22-rollup-levels-A",
          "text": "상세, 지역 소계, 상품 소계, 전체 총계 모두"
        },
        {
          "id": "S2-TH-22-rollup-levels-C",
          "text": "(region_id,product_id), (product_id), ()"
        }
      ],
      "answerId": "S2-TH-22-rollup-levels-B",
      "reason": "나열된 그룹은 상세 3개, 지역 소계 2개, 총계 1개입니다. ROLLUP(region_id,product_id)는 오른쪽 열을 차례로 제거하여 (지역,상품), (지역), ()를 구성합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-22-rollup-levels-D",
          "reason": "(region_id), (product_id) 두 단계만 — 상세 그룹과 전체 총계가 빠졌습니다."
        },
        {
          "choiceId": "S2-TH-22-rollup-levels-A",
          "reason": "상세, 지역 소계, 상품 소계, 전체 총계 모두 — 두 단일 열 소계를 모두 만드는 조합은 이 순서의 ROLLUP이 아니라 CUBE에 해당합니다."
        },
        {
          "choiceId": "S2-TH-22-rollup-levels-C",
          "reason": "(region_id,product_id), (product_id), () — 지정 순서의 오른쪽 열부터 제거하므로 지역 소계가 남습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S2-TH-22-cube-extra-subtotal",
    "lessonCode": "TH-22",
    "subject": 2,
    "title": "CUBE가 추가하는 소계",
    "labUrl": "lab.html?episode=TH-22&variant=base&query=1",
    "topic": "그룹과 소계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-22-cube-extra-subtotal",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n이 체험은 ROLLUP/CUBE의 그룹 조합을 일반 GROUP BY와 UNION ALL로 펼친 SQL입니다. SQLite에서 Oracle ROLLUP/CUBE 문법을 직접 실행한 결과가 아닙니다. level_no 0=상세, 1=지역 소계, 2=상품 소계, 3=전체 총계입니다.\n\n**sales** — 직접 만든 교육용 데이터\n\n| sale_id | region_id | product_id | amount |\n| --- | --- | --- | --- |\n| 1 | 1 | 10 | 10 |\n| 2 | 1 | 20 | 20 |\n| 3 | 2 | 10 | 5 |\n\n**SQL A: CUBE의 그룹 구성**\n\n```sql\nSELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 2 AS level_no, CAST(NULL AS INTEGER) AS region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>이 체험은 ROLLUP/CUBE의 그룹 조합을 일반 GROUP BY와 UNION ALL로 펼친 SQL입니다. SQLite에서 Oracle ROLLUP/CUBE 문법을 직접 실행한 결과가 아닙니다. level_no 0=상세, 1=지역 소계, 2=상품 소계, 3=전체 총계입니다.</p>\n<p><strong>sales</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>sale_id</th>\n<th>region_id</th>\n<th>product_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1</td>\n<td>10</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n<td>20</td>\n<td>20</td>\n</tr>\n<tr>\n<td>3</td>\n<td>2</td>\n<td>10</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: CUBE의 그룹 구성</strong></p>\n<pre><code class=\"language-sql\">SELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 2 AS level_no, CAST(NULL AS INTEGER) AS region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id\n</code></pre>\n",
      "stem": "이 CUBE 전개 결과는 총 몇 행이며 ROLLUP에 없던 단계는 무엇인가?",
      "choices": [
        {
          "id": "S2-TH-22-cube-extra-subtotal-A",
          "text": "8행이며 총계가 두 번 추가된다."
        },
        {
          "id": "S2-TH-22-cube-extra-subtotal-D",
          "text": "6행이며 지역 소계가 추가된다."
        },
        {
          "id": "S2-TH-22-cube-extra-subtotal-B",
          "text": "12행이며 빈 그룹마다 0을 추가한다."
        },
        {
          "id": "S2-TH-22-cube-extra-subtotal-C",
          "text": "8행이며 product_id만으로 묶은 상품 소계가 추가된다."
        }
      ],
      "answerId": "S2-TH-22-cube-extra-subtotal-C",
      "reason": "상세 3행+지역 소계 2행+상품 소계 2행+총계 1행=8행입니다. 두 열의 모든 부분집합을 사용하므로 ROLLUP에 없던 상품별 (product_id) 단계가 포함됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-22-cube-extra-subtotal-A",
          "reason": "8행이며 총계가 두 번 추가된다. — 상품 소계 2행이 추가될 뿐 총계는 한 행입니다."
        },
        {
          "choiceId": "S2-TH-22-cube-extra-subtotal-D",
          "reason": "6행이며 지역 소계가 추가된다. — 지역 소계는 해당 ROLLUP에도 있으며 CUBE에는 상품 소계 두 행이 더 있습니다."
        },
        {
          "choiceId": "S2-TH-22-cube-extra-subtotal-B",
          "reason": "12행이며 빈 그룹마다 0을 추가한다. — 없는 상세 조합을 0으로 채우는 연산이 아닙니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S2-TH-22-cube-same-values-different-levels",
    "lessonCode": "TH-22",
    "subject": 2,
    "title": "소계의 숫자가 같아도 서로 다른 그룹 단계",
    "labUrl": "lab.html?episode=TH-22&variant=one_product&query=0",
    "topic": "그룹과 소계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-22-cube-same-values-different-levels",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n이 체험은 ROLLUP/CUBE의 그룹 조합을 일반 GROUP BY와 UNION ALL로 펼친 SQL입니다. SQLite에서 Oracle ROLLUP/CUBE 문법을 직접 실행한 결과가 아닙니다. level_no 0=상세, 1=지역 소계, 2=상품 소계, 3=전체 총계입니다.\n\n**sales** — 직접 만든 교육용 데이터\n\n| sale_id | region_id | product_id | amount |\n| --- | --- | --- | --- |\n| 1 | 1 | 10 | 10 |\n| 2 | 1 | 10 | 20 |\n| 3 | 2 | 10 | 5 |\n\n**SQL A: CUBE 구성**\n\n```sql\nSELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 2 AS level_no, CAST(NULL AS INTEGER) AS region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>이 체험은 ROLLUP/CUBE의 그룹 조합을 일반 GROUP BY와 UNION ALL로 펼친 SQL입니다. SQLite에서 Oracle ROLLUP/CUBE 문법을 직접 실행한 결과가 아닙니다. level_no 0=상세, 1=지역 소계, 2=상품 소계, 3=전체 총계입니다.</p>\n<p><strong>sales</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>sale_id</th>\n<th>region_id</th>\n<th>product_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1</td>\n<td>10</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n<td>10</td>\n<td>20</td>\n</tr>\n<tr>\n<td>3</td>\n<td>2</td>\n<td>10</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: CUBE 구성</strong></p>\n<pre><code class=\"language-sql\">SELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 2 AS level_no, CAST(NULL AS INTEGER) AS region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id\n</code></pre>\n",
      "stem": "상품을 모두 10으로 바꾼 현재 결과의 총 행 수는?",
      "choices": [
        {
          "id": "S2-TH-22-cube-same-values-different-levels-C",
          "text": "8행"
        },
        {
          "id": "S2-TH-22-cube-same-values-different-levels-D",
          "text": "6행"
        },
        {
          "id": "S2-TH-22-cube-same-values-different-levels-A",
          "text": "4행"
        },
        {
          "id": "S2-TH-22-cube-same-values-different-levels-B",
          "text": "5행"
        }
      ],
      "answerId": "S2-TH-22-cube-same-values-different-levels-D",
      "reason": "상세 (1,10),(2,10) 두 행, 지역 소계 두 행, 상품10 소계 한 행, 총계 한 행으로 6행입니다. 합계가 같아도 그룹의 의미가 달라 합쳐 세지 않습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-22-cube-same-values-different-levels-C",
          "reason": "8행 — 상품 종류가 하나가 되어 상세 그룹은 2개, 상품 소계는 1개로 줄었습니다."
        },
        {
          "choiceId": "S2-TH-22-cube-same-values-different-levels-A",
          "reason": "4행 — 상품 소계와 전체 총계도 별도의 그룹 단계로 포함됩니다."
        },
        {
          "choiceId": "S2-TH-22-cube-same-values-different-levels-B",
          "reason": "5행 — 상품 소계 35와 전체 총계 35는 값이 같아도 서로 다른 단계입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ]
  },
  {
    "code": "S2-TH-23-original-null-versus-total",
    "lessonCode": "TH-23",
    "subject": 2,
    "title": "원래 NULL과 총계 표시 NULL",
    "labUrl": "lab.html?episode=TH-23&variant=base&query=0",
    "topic": "그룹과 소계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-23-original-null-versus-total",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래 SQL은 상세/총계 출처를 직접 0·1로 붙인 전개 예제입니다. 실제 GROUPING(region_id)의 역할을 설명하며, SQLite가 Oracle GROUPING 문법을 실행한 예제는 아닙니다.\n\n**sales** — 직접 만든 교육용 데이터\n\n| sale_id | region_id | amount |\n| --- | --- | --- |\n| 1 | 1 | 10 |\n| 2 | NULL | 5 |\n| 3 | 1 | 20 |\n\n**SQL A: 구분 표지 함께 보기**\n\n```sql\nSELECT subtotal_flag, region_id, total FROM (SELECT 0 AS subtotal_flag, region_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 1 AS subtotal_flag, CAST(NULL AS INTEGER) AS region_id, SUM(amount) AS total FROM sales) x ORDER BY subtotal_flag, CASE WHEN region_id IS NULL THEN 1 ELSE 0 END, region_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래 SQL은 상세/총계 출처를 직접 0·1로 붙인 전개 예제입니다. 실제 GROUPING(region_id)의 역할을 설명하며, SQLite가 Oracle GROUPING 문법을 실행한 예제는 아닙니다.</p>\n<p><strong>sales</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>sale_id</th>\n<th>region_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>NULL</td>\n<td>5</td>\n</tr>\n<tr>\n<td>3</td>\n<td>1</td>\n<td>20</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 구분 표지 함께 보기</strong></p>\n<pre><code class=\"language-sql\">SELECT subtotal_flag, region_id, total FROM (SELECT 0 AS subtotal_flag, region_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 1 AS subtotal_flag, CAST(NULL AS INTEGER) AS region_id, SUM(amount) AS total FROM sales) x ORDER BY subtotal_flag, CASE WHEN region_id IS NULL THEN 1 ELSE 0 END, region_id\n</code></pre>\n",
      "stem": "region_id가 NULL인 두 행을 올바르게 구분하면?",
      "choices": [
        {
          "id": "S2-TH-23-original-null-versus-total-C",
          "text": "NULL이면 항상 전체 총계이다."
        },
        {
          "id": "S2-TH-23-original-null-versus-total-D",
          "text": "flag=0이 총계이고 flag=1이 원본 NULL이다."
        },
        {
          "id": "S2-TH-23-original-null-versus-total-B",
          "text": "NULL 두 행은 중복이므로 어느 한 행을 삭제해야 한다."
        },
        {
          "id": "S2-TH-23-original-null-versus-total-A",
          "text": "subtotal_flag=0은 원래 NULL 지역의 합계 5, subtotal_flag=1은 전체 총계 35이다."
        }
      ],
      "answerId": "S2-TH-23-original-null-versus-total-A",
      "reason": "원본의 지역 NULL도 일반 그룹으로 집계되어 flag=0, 합계 5가 됩니다. 총계 단계의 NULL은 그룹 열을 사용하지 않았다는 표시이며 flag=1, 합계 35입니다. NULL 값만으로 둘을 구분할 수 없습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-23-original-null-versus-total-C",
          "reason": "NULL이면 항상 전체 총계이다. — 원본 데이터의 지역 값 자체가 NULL일 수 있습니다."
        },
        {
          "choiceId": "S2-TH-23-original-null-versus-total-D",
          "reason": "flag=0이 총계이고 flag=1이 원본 NULL이다. — 이 전개 예제는 일반 그룹에 0, 총계에 1을 붙였습니다."
        },
        {
          "choiceId": "S2-TH-23-original-null-versus-total-B",
          "reason": "NULL 두 행은 중복이므로 어느 한 행을 삭제해야 한다. — 두 행은 원본 NULL 그룹과 전체 총계로 의미가 다릅니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c · GROUPING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/GROUPING.html"
      }
    ]
  },
  {
    "code": "S2-TH-23-grouping-flag-not-null-test",
    "lessonCode": "TH-23",
    "subject": 2,
    "title": "원본 NULL을 채워도 총계 NULL은 남는다",
    "labUrl": "lab.html?episode=TH-23&variant=known&query=0",
    "topic": "그룹과 소계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-23-grouping-flag-not-null-test",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래 SQL은 상세/총계 출처를 직접 0·1로 붙인 전개 예제입니다. 실제 GROUPING(region_id)의 역할을 설명하며, SQLite가 Oracle GROUPING 문법을 실행한 예제는 아닙니다.\n\n**sales** — 직접 만든 교육용 데이터\n\n| sale_id | region_id | amount |\n| --- | --- | --- |\n| 1 | 1 | 10 |\n| 2 | 2 | 5 |\n| 3 | 1 | 20 |\n\n**SQL A: 구분 표지 유지**\n\n```sql\nSELECT subtotal_flag, region_id, total FROM (SELECT 0 AS subtotal_flag, region_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 1 AS subtotal_flag, CAST(NULL AS INTEGER) AS region_id, SUM(amount) AS total FROM sales) x ORDER BY subtotal_flag, CASE WHEN region_id IS NULL THEN 1 ELSE 0 END, region_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래 SQL은 상세/총계 출처를 직접 0·1로 붙인 전개 예제입니다. 실제 GROUPING(region_id)의 역할을 설명하며, SQLite가 Oracle GROUPING 문법을 실행한 예제는 아닙니다.</p>\n<p><strong>sales</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>sale_id</th>\n<th>region_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>2</td>\n<td>5</td>\n</tr>\n<tr>\n<td>3</td>\n<td>1</td>\n<td>20</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 구분 표지 유지</strong></p>\n<pre><code class=\"language-sql\">SELECT subtotal_flag, region_id, total FROM (SELECT 0 AS subtotal_flag, region_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 1 AS subtotal_flag, CAST(NULL AS INTEGER) AS region_id, SUM(amount) AS total FROM sales) x ORDER BY subtotal_flag, CASE WHEN region_id IS NULL THEN 1 ELSE 0 END, region_id\n</code></pre>\n",
      "stem": "원본의 NULL 지역을 2로 바꾼 뒤에도 (1,NULL,35)가 남는 이유는?",
      "choices": [
        {
          "id": "S2-TH-23-grouping-flag-not-null-test-C",
          "text": "UPDATE가 NULL을 바꾸지 못했기 때문이다."
        },
        {
          "id": "S2-TH-23-grouping-flag-not-null-test-A",
          "text": "SUM의 결과가 NULL이어서 지역도 NULL이 되기 때문이다."
        },
        {
          "id": "S2-TH-23-grouping-flag-not-null-test-B",
          "text": "총계 행의 NULL은 원본 값이 아니라 지역 구분 없이 집계한 단계의 표시이기 때문이다."
        },
        {
          "id": "S2-TH-23-grouping-flag-not-null-test-D",
          "text": "GROUP BY는 숫자 2를 자동으로 NULL로 바꾸기 때문이다."
        }
      ],
      "answerId": "S2-TH-23-grouping-flag-not-null-test-B",
      "reason": "일반 그룹은 (0,1,30), (0,2,5)로 바뀝니다. 전체를 합산하는 별도 총계 단계는 여전히 지역 열을 사용하지 않으므로 (1,NULL,35)입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-23-grouping-flag-not-null-test-C",
          "reason": "UPDATE가 NULL을 바꾸지 못했기 때문이다. — 입력 표에는 원래 NULL 지역이 2로 바뀌어 있습니다."
        },
        {
          "choiceId": "S2-TH-23-grouping-flag-not-null-test-A",
          "reason": "SUM의 결과가 NULL이어서 지역도 NULL이 되기 때문이다. — 총계의 SUM은 35이며 NULL이 아닙니다."
        },
        {
          "choiceId": "S2-TH-23-grouping-flag-not-null-test-D",
          "reason": "GROUP BY는 숫자 2를 자동으로 NULL로 바꾸기 때문이다. — 일반 그룹에는 지역 2가 정상적으로 남습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Oracle 19c · GROUPING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/GROUPING.html"
      }
    ]
  },
  {
    "code": "S2-TH-28-partition-versus-group",
    "lessonCode": "TH-28",
    "subject": 2,
    "title": "PARTITION BY가 원본 행을 줄일까",
    "labUrl": "lab.html?episode=TH-28&variant=base&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-28-partition-versus-group",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: PARTITION BY**\n\n```sql\nSELECT order_id, customer_id, amount, SUM(amount) OVER (PARTITION BY customer_id) AS customer_total FROM orders ORDER BY order_id\n```\n\n**SQL B: GROUP BY**\n\n```sql\nSELECT customer_id, SUM(amount) AS customer_total FROM orders GROUP BY customer_id ORDER BY customer_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: PARTITION BY</strong></p>\n<pre><code class=\"language-sql\">SELECT order_id, customer_id, amount, SUM(amount) OVER (PARTITION BY customer_id) AS customer_total FROM orders ORDER BY order_id\n</code></pre>\n<p><strong>SQL B: GROUP BY</strong></p>\n<pre><code class=\"language-sql\">SELECT customer_id, SUM(amount) AS customer_total FROM orders GROUP BY customer_id ORDER BY customer_id\n</code></pre>\n",
      "stem": "SQL A(윈도우 합계)와 B(GROUP BY)의 행 수는?",
      "choices": [
        {
          "id": "S2-TH-28-partition-versus-group-D",
          "text": "둘 다 2행"
        },
        {
          "id": "S2-TH-28-partition-versus-group-A",
          "text": "둘 다 3행"
        },
        {
          "id": "S2-TH-28-partition-versus-group-B",
          "text": "A 2행, B 3행"
        },
        {
          "id": "S2-TH-28-partition-versus-group-C",
          "text": "A 3행, B 2행"
        }
      ],
      "answerId": "S2-TH-28-partition-versus-group-C",
      "reason": "A는 주문 101·102·103을 유지한 채 고객별 합계 30·30·5를 각 행에 붙입니다. B는 고객별로 묶어 (1,30), (2,5)의 두 행을 만듭니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-28-partition-versus-group-D",
          "reason": "둘 다 2행 — PARTITION BY는 계산 범위를 나누지만 주문 행을 합쳐 없애지 않습니다."
        },
        {
          "choiceId": "S2-TH-28-partition-versus-group-A",
          "reason": "둘 다 3행 — GROUP BY customer_id는 고객 1·2의 두 그룹으로 줄입니다."
        },
        {
          "choiceId": "S2-TH-28-partition-versus-group-B",
          "reason": "A 2행, B 3행 — 분석 함수와 그룹 집계의 행 수 성질이 뒤바뀌었습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ]
  },
  {
    "code": "S2-TH-28-partition-membership",
    "lessonCode": "TH-28",
    "subject": 2,
    "title": "행이 속한 파티션이 달라지면",
    "labUrl": "lab.html?episode=TH-28&variant=move&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-28-partition-membership",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 2 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: PARTITION BY**\n\n```sql\nSELECT order_id, customer_id, amount, SUM(amount) OVER (PARTITION BY customer_id) AS customer_total FROM orders ORDER BY order_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>2</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: PARTITION BY</strong></p>\n<pre><code class=\"language-sql\">SELECT order_id, customer_id, amount, SUM(amount) OVER (PARTITION BY customer_id) AS customer_total FROM orders ORDER BY order_id\n</code></pre>\n",
      "stem": "102번 주문을 고객 2로 옮긴 현재 각 주문 101·102·103의 고객별 합계는?",
      "choices": [
        {
          "id": "S2-TH-28-partition-membership-A",
          "text": "30, 30, 5"
        },
        {
          "id": "S2-TH-28-partition-membership-D",
          "text": "10, 25, 25"
        },
        {
          "id": "S2-TH-28-partition-membership-B",
          "text": "35, 35, 35"
        },
        {
          "id": "S2-TH-28-partition-membership-C",
          "text": "10, 20, 5"
        }
      ],
      "answerId": "S2-TH-28-partition-membership-D",
      "reason": "고객 1에는 101번 금액 10만 남습니다. 고객 2에는 102번 20과 103번 5가 있어 합계 25가 두 주문 행에 반복됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-28-partition-membership-A",
          "reason": "30, 30, 5 — 이는 102번이 고객 1이던 이전 입력의 합계입니다."
        },
        {
          "choiceId": "S2-TH-28-partition-membership-B",
          "reason": "35, 35, 35 — PARTITION BY customer_id가 있으므로 전체 주문을 한 그룹으로 합산하지 않습니다."
        },
        {
          "choiceId": "S2-TH-28-partition-membership-C",
          "reason": "10, 20, 5 — SUM은 현재 행 금액만이 아니라 같은 고객의 모든 주문 금액을 합칩니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ]
  },
  {
    "code": "S2-TH-31-lag-lead-boundaries",
    "lessonCode": "TH-31",
    "subject": 2,
    "title": "LAG와 LEAD의 첫 행·마지막 행",
    "labUrl": "lab.html?episode=TH-31&variant=base&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-31-lag-lead-boundaries",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**receipts** — 직접 만든 교육용 데이터\n\n| receipt_id | day_no | amount |\n| --- | --- | --- |\n| 401 | 2 | 6 |\n| 402 | 1 | 4 |\n| 403 | 2 | 9 |\n\n**SQL A: 날짜·번호 순**\n\n```sql\nSELECT receipt_id, day_no, amount, LAG(amount) OVER (ORDER BY day_no, receipt_id) AS previous_amount, LEAD(amount) OVER (ORDER BY day_no, receipt_id) AS next_amount FROM receipts ORDER BY day_no, receipt_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>receipts</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>receipt_id</th>\n<th>day_no</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>2</td>\n<td>6</td>\n</tr>\n<tr>\n<td>402</td>\n<td>1</td>\n<td>4</td>\n</tr>\n<tr>\n<td>403</td>\n<td>2</td>\n<td>9</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 날짜·번호 순</strong></p>\n<pre><code class=\"language-sql\">SELECT receipt_id, day_no, amount, LAG(amount) OVER (ORDER BY day_no, receipt_id) AS previous_amount, LEAD(amount) OVER (ORDER BY day_no, receipt_id) AS next_amount FROM receipts ORDER BY day_no, receipt_id\n</code></pre>\n",
      "stem": "정렬 후 첫 영수증과 마지막 영수증에서 NULL이 되는 값은?",
      "choices": [
        {
          "id": "S2-TH-31-lag-lead-boundaries-B",
          "text": "첫 행 401의 LAG와 마지막 행 403의 LEAD"
        },
        {
          "id": "S2-TH-31-lag-lead-boundaries-A",
          "text": "첫 행 402의 LAG와 마지막 행 403의 LEAD"
        },
        {
          "id": "S2-TH-31-lag-lead-boundaries-D",
          "text": "첫 행과 마지막 행의 LAG·LEAD 모두"
        },
        {
          "id": "S2-TH-31-lag-lead-boundaries-C",
          "text": "첫 행 402의 LEAD와 마지막 행 403의 LAG"
        }
      ],
      "answerId": "S2-TH-31-lag-lead-boundaries-A",
      "reason": "정렬 순서는 402(day1),401(day2),403(day2)입니다. 기본 대체값을 지정하지 않아 이전 행이 없는 402의 LAG와 다음 행이 없는 403의 LEAD는 NULL입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-31-lag-lead-boundaries-B",
          "reason": "첫 행 401의 LAG와 마지막 행 403의 LEAD — 삽입 순서가 아니라 day_no,receipt_id 정렬을 따라 첫 행은 402입니다."
        },
        {
          "choiceId": "S2-TH-31-lag-lead-boundaries-D",
          "reason": "첫 행과 마지막 행의 LAG·LEAD 모두 — 첫 행에는 다음 행, 마지막 행에는 이전 행이 존재합니다."
        },
        {
          "choiceId": "S2-TH-31-lag-lead-boundaries-C",
          "reason": "첫 행 402의 LEAD와 마지막 행 403의 LAG — 앞행이 없는 첫 행은 LAG, 뒷행이 없는 마지막 행은 LEAD가 NULL입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · LAG",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LAG.html"
      },
      {
        "title": "Oracle 19c · LEAD",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LEAD.html"
      },
      {
        "title": "Oracle 19c · Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ]
  },
  {
    "code": "S2-TH-31-navigation-order-change",
    "lessonCode": "TH-31",
    "subject": 2,
    "title": "날짜 변경은 인접 행을 바꾼다",
    "labUrl": "lab.html?episode=TH-31&variant=day&query=0",
    "topic": "윈도우와 순위",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-31-navigation-order-change",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**receipts** — 직접 만든 교육용 데이터\n\n| receipt_id | day_no | amount |\n| --- | --- | --- |\n| 401 | 3 | 6 |\n| 402 | 1 | 4 |\n| 403 | 2 | 9 |\n\n**SQL A: 바뀐 순서**\n\n```sql\nSELECT receipt_id, day_no, amount, LAG(amount) OVER (ORDER BY day_no, receipt_id) AS previous_amount, LEAD(amount) OVER (ORDER BY day_no, receipt_id) AS next_amount FROM receipts ORDER BY day_no, receipt_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>receipts</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>receipt_id</th>\n<th>day_no</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>3</td>\n<td>6</td>\n</tr>\n<tr>\n<td>402</td>\n<td>1</td>\n<td>4</td>\n</tr>\n<tr>\n<td>403</td>\n<td>2</td>\n<td>9</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 바뀐 순서</strong></p>\n<pre><code class=\"language-sql\">SELECT receipt_id, day_no, amount, LAG(amount) OVER (ORDER BY day_no, receipt_id) AS previous_amount, LEAD(amount) OVER (ORDER BY day_no, receipt_id) AS next_amount FROM receipts ORDER BY day_no, receipt_id\n</code></pre>\n",
      "stem": "401의 day_no를 3으로 바꾼 현재 403의 (previous_amount,next_amount)는?",
      "choices": [
        {
          "id": "S2-TH-31-navigation-order-change-B",
          "text": "(4, 6)"
        },
        {
          "id": "S2-TH-31-navigation-order-change-C",
          "text": "(6, NULL)"
        },
        {
          "id": "S2-TH-31-navigation-order-change-D",
          "text": "(NULL, 6)"
        },
        {
          "id": "S2-TH-31-navigation-order-change-A",
          "text": "(6, 4)"
        }
      ],
      "answerId": "S2-TH-31-navigation-order-change-B",
      "reason": "새 순서는 402(금액4),403(9),401(6)입니다. 따라서 403에서 LAG는 402의 4, LEAD는 401의 6을 읽습니다. 물리적 입력 순서를 기준으로 삼지 않습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-31-navigation-order-change-C",
          "reason": "(6, NULL) — 이는 401이 day2였을 때의 인접 관계입니다."
        },
        {
          "choiceId": "S2-TH-31-navigation-order-change-D",
          "reason": "(NULL, 6) — 403 앞에는 day1의 402가 있습니다."
        },
        {
          "choiceId": "S2-TH-31-navigation-order-change-A",
          "reason": "(6, 4) — OVER 안의 오름차순 정렬에서 앞뒤가 뒤바뀌었습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · LAG",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LAG.html"
      },
      {
        "title": "Oracle 19c · LEAD",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LEAD.html"
      },
      {
        "title": "Oracle 19c · Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ]
  },
  {
    "code": "S2-TH-32-parent-child-direction",
    "lessonCode": "TH-32",
    "subject": 2,
    "title": "부모와 자식의 연결 방향",
    "labUrl": "lab.html?episode=TH-32&variant=base&query=0",
    "topic": "계층 관계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-32-parent-child-direction",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래는 parent_id를 이용해 부모→자식의 한 단계 간선을 확인하는 JOIN입니다. Oracle CONNECT BY의 전체 재귀 탐색을 실행하는 SQL은 아닙니다.\n\n**nodes** — 직접 만든 교육용 데이터\n\n| node_id | parent_id |\n| --- | --- |\n| 1 | NULL |\n| 2 | 1 |\n| 3 | 1 |\n| 4 | 2 |\n\n**SQL A: 부모 → 자식**\n\n```sql\nSELECT p.node_id AS parent_node, c.node_id AS child_node FROM nodes p JOIN nodes c ON c.parent_id=p.node_id ORDER BY p.node_id, c.node_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래는 parent_id를 이용해 부모→자식의 한 단계 간선을 확인하는 JOIN입니다. Oracle CONNECT BY의 전체 재귀 탐색을 실행하는 SQL은 아닙니다.</p>\n<p><strong>nodes</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>node_id</th>\n<th>parent_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n</tr>\n<tr>\n<td>3</td>\n<td>1</td>\n</tr>\n<tr>\n<td>4</td>\n<td>2</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 부모 → 자식</strong></p>\n<pre><code class=\"language-sql\">SELECT p.node_id AS parent_node, c.node_id AS child_node FROM nodes p JOIN nodes c ON c.parent_id=p.node_id ORDER BY p.node_id, c.node_id\n</code></pre>\n",
      "stem": "p.node_id=c.parent_id 조건이 나타내는 간선은?",
      "choices": [
        {
          "id": "S2-TH-32-parent-child-direction-C",
          "text": "부모 1→자식 2, 부모 1→자식 3, 부모 2→자식 4"
        },
        {
          "id": "S2-TH-32-parent-child-direction-A",
          "text": "부모 1→자식 4만"
        },
        {
          "id": "S2-TH-32-parent-child-direction-D",
          "text": "부모 2→자식 1, 부모 3→자식 1, 부모 4→자식 2"
        },
        {
          "id": "S2-TH-32-parent-child-direction-B",
          "text": "1→1, 2→2, 3→3, 4→4"
        }
      ],
      "answerId": "S2-TH-32-parent-child-direction-C",
      "reason": "자식 c에 저장된 parent_id를 부모 p의 node_id와 맞춥니다. 2·3의 parent_id는 1, 4의 parent_id는 2이므로 세 간선 (1,2),(1,3),(2,4)가 됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-32-parent-child-direction-A",
          "reason": "부모 1→자식 4만 — 1과 4는 두 단계 관계이며 현재 SQL은 직접 부모만 연결합니다."
        },
        {
          "choiceId": "S2-TH-32-parent-child-direction-D",
          "reason": "부모 2→자식 1, 부모 3→자식 1, 부모 4→자식 2 — 이는 부모와 자식의 열 의미를 반대로 읽은 것입니다."
        },
        {
          "choiceId": "S2-TH-32-parent-child-direction-B",
          "reason": "1→1, 2→2, 3→3, 4→4 — JOIN 조건은 같은 node_id가 아니라 부모 ID와 자식 parent_id의 대응입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Hierarchical-Queries",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Hierarchical-Queries.html"
      },
      {
        "title": "Oracle 19c · Joins",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Joins.html"
      }
    ]
  },
  {
    "code": "S2-TH-32-reparent-edge",
    "lessonCode": "TH-32",
    "subject": 2,
    "title": "부모를 옮기면 바뀌는 직접 간선",
    "labUrl": "lab.html?episode=TH-32&variant=reparent&query=0",
    "topic": "계층 관계",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-32-reparent-edge",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래는 parent_id를 이용해 부모→자식의 한 단계 간선을 확인하는 JOIN입니다. Oracle CONNECT BY의 전체 재귀 탐색을 실행하는 SQL은 아닙니다.\n\n**nodes** — 직접 만든 교육용 데이터\n\n| node_id | parent_id |\n| --- | --- |\n| 1 | NULL |\n| 2 | 1 |\n| 3 | 1 |\n| 4 | 3 |\n\n**SQL A: 변경된 연결**\n\n```sql\nSELECT p.node_id AS parent_node, c.node_id AS child_node FROM nodes p JOIN nodes c ON c.parent_id=p.node_id ORDER BY p.node_id, c.node_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래는 parent_id를 이용해 부모→자식의 한 단계 간선을 확인하는 JOIN입니다. Oracle CONNECT BY의 전체 재귀 탐색을 실행하는 SQL은 아닙니다.</p>\n<p><strong>nodes</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>node_id</th>\n<th>parent_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>2</td>\n<td>1</td>\n</tr>\n<tr>\n<td>3</td>\n<td>1</td>\n</tr>\n<tr>\n<td>4</td>\n<td>3</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 변경된 연결</strong></p>\n<pre><code class=\"language-sql\">SELECT p.node_id AS parent_node, c.node_id AS child_node FROM nodes p JOIN nodes c ON c.parent_id=p.node_id ORDER BY p.node_id, c.node_id\n</code></pre>\n",
      "stem": "4의 parent_id를 3으로 바꾼 현재 결과에 대한 설명은?",
      "choices": [
        {
          "id": "S2-TH-32-reparent-edge-D",
          "text": "(2,4)는 없어지고 (3,4)가 생기며 (1,2),(1,3)은 유지된다."
        },
        {
          "id": "S2-TH-32-reparent-edge-B",
          "text": "(2,4)와 (3,4)가 모두 남는다."
        },
        {
          "id": "S2-TH-32-reparent-edge-A",
          "text": "(1,4)만 새로 생긴다."
        },
        {
          "id": "S2-TH-32-reparent-edge-C",
          "text": "1의 자식 2·3 간선도 모두 사라진다."
        }
      ],
      "answerId": "S2-TH-32-reparent-edge-D",
      "reason": "4의 직접 부모 값만 2에서 3으로 바뀌었습니다. JOIN은 현재 parent_id를 사용하여 (3,4)를 만들고 기존 (2,4)는 만들지 않습니다. 다른 두 부모 관계는 그대로입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-32-reparent-edge-B",
          "reason": "(2,4)와 (3,4)가 모두 남는다. — 4의 현재 parent_id는 3 하나이며 과거 값 2는 남지 않습니다."
        },
        {
          "choiceId": "S2-TH-32-reparent-edge-A",
          "reason": "(1,4)만 새로 생긴다. — 이 SQL은 조상 전체가 아니라 직접 부모 한 단계만 조회합니다."
        },
        {
          "choiceId": "S2-TH-32-reparent-edge-C",
          "reason": "1의 자식 2·3 간선도 모두 사라진다. — 2와 3의 parent_id는 바뀌지 않았습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Hierarchical-Queries",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Hierarchical-Queries.html"
      },
      {
        "title": "Oracle 19c · Joins",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Joins.html"
      }
    ]
  },
  {
    "code": "S2-TH-41-check-unknown",
    "lessonCode": "TH-41",
    "subject": 2,
    "title": "CHECK와 WHERE가 UNKNOWN을 다루는 차이",
    "labUrl": "lab.html?episode=TH-41&variant=base&query=0",
    "topic": "제약과 DDL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-41-check-unknown",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\nCASE는 CHECK(quantity>0) 통과 여부를 표시하는 기존 교육용 진리표입니다. 실제 테이블에 CHECK 제약을 생성하거나 삽입 오류를 실행하는 SQL은 아닙니다.\n\n**candidates** — 직접 만든 교육용 데이터\n\n| candidate_id | quantity |\n| --- | --- |\n| 1 | 2 |\n| 2 | 0 |\n| 3 | NULL |\n\n**SQL A: CHECK의 논리값**\n\n```sql\nSELECT candidate_id, quantity, CASE WHEN quantity>0 THEN 'TRUE' WHEN NOT(quantity>0) THEN 'FALSE' ELSE 'UNKNOWN' END AS predicate, CASE WHEN NOT(quantity>0) THEN 'REJECT' ELSE 'PASS_CHECK' END AS check_status FROM candidates ORDER BY candidate_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>CASE는 CHECK(quantity&gt;0) 통과 여부를 표시하는 기존 교육용 진리표입니다. 실제 테이블에 CHECK 제약을 생성하거나 삽입 오류를 실행하는 SQL은 아닙니다.</p>\n<p><strong>candidates</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>candidate_id</th>\n<th>quantity</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>2</td>\n</tr>\n<tr>\n<td>2</td>\n<td>0</td>\n</tr>\n<tr>\n<td>3</td>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: CHECK의 논리값</strong></p>\n<pre><code class=\"language-sql\">SELECT candidate_id, quantity, CASE WHEN quantity&gt;0 THEN 'TRUE' WHEN NOT(quantity&gt;0) THEN 'FALSE' ELSE 'UNKNOWN' END AS predicate, CASE WHEN NOT(quantity&gt;0) THEN 'REJECT' ELSE 'PASS_CHECK' END AS check_status FROM candidates ORDER BY candidate_id\n</code></pre>\n",
      "stem": "quantity=NULL인 candidate_id=3의 비교 결과와 CHECK 판정은?",
      "choices": [
        {
          "id": "S2-TH-41-check-unknown-B",
          "text": "FALSE, REJECT"
        },
        {
          "id": "S2-TH-41-check-unknown-A",
          "text": "UNKNOWN, PASS_CHECK"
        },
        {
          "id": "S2-TH-41-check-unknown-D",
          "text": "TRUE, PASS_CHECK"
        },
        {
          "id": "S2-TH-41-check-unknown-C",
          "text": "UNKNOWN, REJECT"
        }
      ],
      "answerId": "S2-TH-41-check-unknown-A",
      "reason": "quantity>0에서 NULL의 비교는 UNKNOWN입니다. CHECK는 조건이 FALSE일 때 거부하므로 UNKNOWN인 NULL은 이 CHECK만으로 거부되지 않습니다. 값의 존재를 요구하려면 NOT NULL도 필요합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-41-check-unknown-B",
          "reason": "FALSE, REJECT — NULL>0은 FALSE가 아니라 UNKNOWN입니다."
        },
        {
          "choiceId": "S2-TH-41-check-unknown-D",
          "reason": "TRUE, PASS_CHECK — NULL이 0보다 크다고 참으로 판정한 것은 아닙니다."
        },
        {
          "choiceId": "S2-TH-41-check-unknown-C",
          "reason": "UNKNOWN, REJECT — CHECK는 FALSE를 거부하며 UNKNOWN 자체는 허용합니다. NULL 금지는 NOT NULL이 담당합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-TH-41-check-plus-not-null",
    "lessonCode": "TH-41",
    "subject": 2,
    "title": "양수와 필수 입력을 함께 요구하기",
    "labUrl": "lab.html?episode=TH-41&variant=base&query=1",
    "topic": "제약과 DDL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-41-check-plus-not-null",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\nCASE는 CHECK(quantity>0) 통과 여부를 표시하는 기존 교육용 진리표입니다. 실제 테이블에 CHECK 제약을 생성하거나 삽입 오류를 실행하는 SQL은 아닙니다.\n\n**candidates** — 직접 만든 교육용 데이터\n\n| candidate_id | quantity |\n| --- | --- |\n| 1 | 2 |\n| 2 | 0 |\n| 3 | NULL |\n\n**SQL A: NOT NULL까지 검사**\n\n```sql\nSELECT candidate_id, CASE WHEN quantity IS NOT NULL AND quantity>0 THEN 'PASS' ELSE 'REJECT' END AS combined_status FROM candidates ORDER BY candidate_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>CASE는 CHECK(quantity&gt;0) 통과 여부를 표시하는 기존 교육용 진리표입니다. 실제 테이블에 CHECK 제약을 생성하거나 삽입 오류를 실행하는 SQL은 아닙니다.</p>\n<p><strong>candidates</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>candidate_id</th>\n<th>quantity</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>2</td>\n</tr>\n<tr>\n<td>2</td>\n<td>0</td>\n</tr>\n<tr>\n<td>3</td>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: NOT NULL까지 검사</strong></p>\n<pre><code class=\"language-sql\">SELECT candidate_id, CASE WHEN quantity IS NOT NULL AND quantity&gt;0 THEN 'PASS' ELSE 'REJECT' END AS combined_status FROM candidates ORDER BY candidate_id\n</code></pre>\n",
      "stem": "quantity>0에 NOT NULL도 함께 적용한 이 판정에서 통과하는 candidate_id는?",
      "choices": [
        {
          "id": "S2-TH-41-check-plus-not-null-D",
          "text": "1, 2"
        },
        {
          "id": "S2-TH-41-check-plus-not-null-B",
          "text": "1만"
        },
        {
          "id": "S2-TH-41-check-plus-not-null-C",
          "text": "1, 3"
        },
        {
          "id": "S2-TH-41-check-plus-not-null-A",
          "text": "1, 2, 3"
        }
      ],
      "answerId": "S2-TH-41-check-plus-not-null-B",
      "reason": "candidate_id=1의 2는 값이 존재하고 양수라 통과합니다. candidate_id=2의 0은 CHECK를 위반하고 candidate_id=3은 NULL 금지를 위반하므로 거부됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-41-check-plus-not-null-D",
          "reason": "1, 2 — 2의 0은 양수 조건을 만족하지 못합니다."
        },
        {
          "choiceId": "S2-TH-41-check-plus-not-null-C",
          "reason": "1, 3 — 3의 NULL은 NOT NULL 조건을 만족하지 못합니다."
        },
        {
          "choiceId": "S2-TH-41-check-plus-not-null-A",
          "reason": "1, 2, 3 — NOT NULL과 양수 조건을 각각 검사해야 합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-TH-41-check-known-false",
    "lessonCode": "TH-41",
    "subject": 2,
    "title": "NULL을 음수로 채우면 CHECK는",
    "labUrl": "lab.html?episode=TH-41&variant=fill&query=0",
    "topic": "제약과 DDL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-41-check-known-false",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\nCASE는 CHECK(quantity>0) 통과 여부를 표시하는 기존 교육용 진리표입니다. 실제 테이블에 CHECK 제약을 생성하거나 삽입 오류를 실행하는 SQL은 아닙니다.\n\n**candidates** — 직접 만든 교육용 데이터\n\n| candidate_id | quantity |\n| --- | --- |\n| 1 | 2 |\n| 2 | 0 |\n| 3 | -1 |\n\n**SQL A: FALSE로 바뀐 행**\n\n```sql\nSELECT candidate_id, quantity, CASE WHEN quantity>0 THEN 'TRUE' WHEN NOT(quantity>0) THEN 'FALSE' ELSE 'UNKNOWN' END AS predicate, CASE WHEN NOT(quantity>0) THEN 'REJECT' ELSE 'PASS_CHECK' END AS check_status FROM candidates ORDER BY candidate_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>CASE는 CHECK(quantity&gt;0) 통과 여부를 표시하는 기존 교육용 진리표입니다. 실제 테이블에 CHECK 제약을 생성하거나 삽입 오류를 실행하는 SQL은 아닙니다.</p>\n<p><strong>candidates</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>candidate_id</th>\n<th>quantity</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>2</td>\n</tr>\n<tr>\n<td>2</td>\n<td>0</td>\n</tr>\n<tr>\n<td>3</td>\n<td>-1</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: FALSE로 바뀐 행</strong></p>\n<pre><code class=\"language-sql\">SELECT candidate_id, quantity, CASE WHEN quantity&gt;0 THEN 'TRUE' WHEN NOT(quantity&gt;0) THEN 'FALSE' ELSE 'UNKNOWN' END AS predicate, CASE WHEN NOT(quantity&gt;0) THEN 'REJECT' ELSE 'PASS_CHECK' END AS check_status FROM candidates ORDER BY candidate_id\n</code></pre>\n",
      "stem": "기존 NULL을 -1로 채운 candidate_id=3의 비교 결과와 판정은?",
      "choices": [
        {
          "id": "S2-TH-41-check-known-false-D",
          "text": "UNKNOWN, PASS_CHECK"
        },
        {
          "id": "S2-TH-41-check-known-false-C",
          "text": "FALSE, REJECT"
        },
        {
          "id": "S2-TH-41-check-known-false-B",
          "text": "FALSE, PASS_CHECK"
        },
        {
          "id": "S2-TH-41-check-known-false-A",
          "text": "TRUE, PASS_CHECK"
        }
      ],
      "answerId": "S2-TH-41-check-known-false-C",
      "reason": "NULL일 때는 >0을 확정하지 못했지만 -1은 명확한 숫자입니다. -1>0은 FALSE이므로 양수 CHECK를 통과하지 못합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-41-check-known-false-D",
          "reason": "UNKNOWN, PASS_CHECK — -1은 NULL이 아니라 비교 가능한 숫자입니다."
        },
        {
          "choiceId": "S2-TH-41-check-known-false-B",
          "reason": "FALSE, PASS_CHECK — CHECK는 FALSE가 확정된 경우에는 거부합니다."
        },
        {
          "choiceId": "S2-TH-41-check-known-false-A",
          "reason": "TRUE, PASS_CHECK — -1>0은 거짓입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ]
  },
  {
    "code": "S2-TH-42-explicit-null-versus-space",
    "lessonCode": "TH-42",
    "subject": 2,
    "title": "공백 한 칸은 값이 없는 상태일까",
    "labUrl": "lab.html?episode=TH-42&variant=base&query=0",
    "topic": "문자열과 NULL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-42-explicit-null-versus-space",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**texts** — 직접 만든 교육용 데이터\n\n| row_id | text_value |\n| --- | --- |\n| 1 | NULL |\n| 2 | ' ' (공백 1칸) |\n| 3 | A |\n\n**SQL A: 명시적 NULL·공백 비교**\n\n```sql\nSELECT row_id, CASE WHEN text_value IS NULL THEN 'NULL' ELSE 'VALUE' END AS value_kind, LENGTH(text_value) AS char_count FROM texts ORDER BY row_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>texts</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>row_id</th>\n<th>text_value</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>2</td>\n<td>' ' (공백 1칸)</td>\n</tr>\n<tr>\n<td>3</td>\n<td>A</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 명시적 NULL·공백 비교</strong></p>\n<pre><code class=\"language-sql\">SELECT row_id, CASE WHEN text_value IS NULL THEN 'NULL' ELSE 'VALUE' END AS value_kind, LENGTH(text_value) AS char_count FROM texts ORDER BY row_id\n</code></pre>\n",
      "stem": "text_value가 NULL인 1번과 공백 한 칸인 2번의 (value_kind,char_count)는?",
      "choices": [
        {
          "id": "S2-TH-42-explicit-null-versus-space-B",
          "text": "1번 (NULL,0), 2번 (VALUE,1)"
        },
        {
          "id": "S2-TH-42-explicit-null-versus-space-A",
          "text": "둘 다 (NULL,NULL)"
        },
        {
          "id": "S2-TH-42-explicit-null-versus-space-C",
          "text": "1번 (VALUE,0), 2번 (NULL,NULL)"
        },
        {
          "id": "S2-TH-42-explicit-null-versus-space-D",
          "text": "1번 (NULL,NULL), 2번 (VALUE,1)"
        }
      ],
      "answerId": "S2-TH-42-explicit-null-versus-space-D",
      "reason": "이 SQLite 입력은 빈 문자열 대신 명시적 NULL을 사용합니다. NULL의 길이는 NULL이며, 공백 한 칸은 NULL이 아닌 실제 문자라 VALUE와 길이 1입니다. Oracle의 빈 문자열 규칙은 별도 문항에서 확인합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-42-explicit-null-versus-space-B",
          "reason": "1번 (NULL,0), 2번 (VALUE,1) — LENGTH(NULL)은 0이 아니라 NULL입니다."
        },
        {
          "choiceId": "S2-TH-42-explicit-null-versus-space-A",
          "reason": "둘 다 (NULL,NULL) — 공백 한 칸은 길이 1의 실제 문자 값입니다."
        },
        {
          "choiceId": "S2-TH-42-explicit-null-versus-space-C",
          "reason": "1번 (VALUE,0), 2번 (NULL,NULL) — NULL과 공백의 판정이 뒤바뀌었습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c · LENGTH",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LENGTH.html"
      }
    ]
  },
  {
    "code": "S2-TH-42-space-length",
    "lessonCode": "TH-42",
    "subject": 2,
    "title": "공백이 두 칸이면 LENGTH와 NULL 판정은",
    "labUrl": "lab.html?episode=TH-42&variant=two&query=0",
    "topic": "문자열과 NULL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-42-space-length",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**texts** — 직접 만든 교육용 데이터\n\n| row_id | text_value |\n| --- | --- |\n| 1 | NULL |\n| 2 | '  ' (공백 2칸) |\n| 3 | A |\n\n**SQL A: 길이 변화**\n\n```sql\nSELECT row_id, CASE WHEN text_value IS NULL THEN 'NULL' ELSE 'VALUE' END AS value_kind, LENGTH(text_value) AS char_count FROM texts ORDER BY row_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>texts</strong> — 직접 만든 교육용 데이터</p>\n<table>\n<thead>\n<tr>\n<th>row_id</th>\n<th>text_value</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>2</td>\n<td>'  ' (공백 2칸)</td>\n</tr>\n<tr>\n<td>3</td>\n<td>A</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 길이 변화</strong></p>\n<pre><code class=\"language-sql\">SELECT row_id, CASE WHEN text_value IS NULL THEN 'NULL' ELSE 'VALUE' END AS value_kind, LENGTH(text_value) AS char_count FROM texts ORDER BY row_id\n</code></pre>\n",
      "stem": "row_id=2의 값은 공백 두 칸이다. (value_kind,char_count)는?",
      "choices": [
        {
          "id": "S2-TH-42-space-length-C",
          "text": "(VALUE, 0)"
        },
        {
          "id": "S2-TH-42-space-length-B",
          "text": "(NULL, NULL)"
        },
        {
          "id": "S2-TH-42-space-length-D",
          "text": "(VALUE, 1)"
        },
        {
          "id": "S2-TH-42-space-length-A",
          "text": "(VALUE, 2)"
        }
      ],
      "answerId": "S2-TH-42-space-length-A",
      "reason": "길이를 구할 때 공백을 자동으로 잘라내지 않습니다. 명시적 공백 두 문자가 저장되어 있으므로 NULL이 아니며 문자 길이는 2입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-42-space-length-C",
          "reason": "(VALUE, 0) — LENGTH는 공백 문자도 셉니다."
        },
        {
          "choiceId": "S2-TH-42-space-length-B",
          "reason": "(NULL, NULL) — 공백 문자열은 명시적 NULL이 아닙니다."
        },
        {
          "choiceId": "S2-TH-42-space-length-D",
          "reason": "(VALUE, 1) — 현재 입력의 공백은 한 칸이 아니라 두 칸입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle 19c · LENGTH",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LENGTH.html"
      }
    ]
  },
  {
    "code": "S2-TH-43-null-key-constraints",
    "lessonCode": "TH-43",
    "subject": 2,
    "title": "NULL 한 개와 세 제약의 차이",
    "labUrl": "lab.html?episode=TH-43&variant=base&query=0",
    "topic": "제약과 DDL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-43-null-key-constraints",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래 CASE는 단일 열 후보 값의 NOT NULL·UNIQUE·PRIMARY KEY 요건을 비교하는 교육용 판정표입니다. 실제 SQLite PRIMARY KEY 열의 NULL 허용 여부를 실험하는 SQL이 아닙니다. Oracle 단일 열 제약 요건을 기준으로 읽으세요.\n\n**key_candidates** — 제약 선언 전 검사할 후보 데이터\n\n| row_id | code |\n| --- | --- |\n| 1 | 10 |\n| 2 | 10 |\n| 3 | NULL |\n\n**SQL A: 후보 열의 세 조건**\n\n```sql\nSELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래 CASE는 단일 열 후보 값의 NOT NULL·UNIQUE·PRIMARY KEY 요건을 비교하는 교육용 판정표입니다. 실제 SQLite PRIMARY KEY 열의 NULL 허용 여부를 실험하는 SQL이 아닙니다. Oracle 단일 열 제약 요건을 기준으로 읽으세요.</p>\n<p><strong>key_candidates</strong> — 제약 선언 전 검사할 후보 데이터</p>\n<table>\n<thead>\n<tr>\n<th>row_id</th>\n<th>code</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>10</td>\n</tr>\n<tr>\n<td>3</td>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 후보 열의 세 조건</strong></p>\n<pre><code class=\"language-sql\">SELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id&lt;&gt;k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id&lt;&gt;k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id\n</code></pre>\n",
      "stem": "code=NULL인 row_id=3의 (not_null_status,unique_status,primary_key_status)는?",
      "choices": [
        {
          "id": "S2-TH-43-null-key-constraints-A",
          "text": "(PASS, FAIL, FAIL)"
        },
        {
          "id": "S2-TH-43-null-key-constraints-B",
          "text": "(FAIL, PASS, FAIL)"
        },
        {
          "id": "S2-TH-43-null-key-constraints-C",
          "text": "(FAIL, FAIL, FAIL)"
        },
        {
          "id": "S2-TH-43-null-key-constraints-D",
          "text": "(PASS, PASS, PASS)"
        }
      ],
      "answerId": "S2-TH-43-null-key-constraints-B",
      "reason": "NULL은 값의 존재를 요구하는 NOT NULL과 기본 키 요건에 실패합니다. 단일 열 UNIQUE는 NULL 자체를 금지하지 않으므로 이 NULL 후보 행은 중복 위반으로 판정되지 않습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-43-null-key-constraints-A",
          "reason": "(PASS, FAIL, FAIL) — UNIQUE와 NOT NULL의 역할이 뒤바뀌었습니다."
        },
        {
          "choiceId": "S2-TH-43-null-key-constraints-C",
          "reason": "(FAIL, FAIL, FAIL) — 단일 열 UNIQUE는 NULL을 금지하는 제약이 아닙니다."
        },
        {
          "choiceId": "S2-TH-43-null-key-constraints-D",
          "reason": "(PASS, PASS, PASS) — NOT NULL과 PRIMARY KEY는 NULL을 허용하지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S2-TH-43-duplicate-not-null",
    "lessonCode": "TH-43",
    "subject": 2,
    "title": "중복 값이 있어도 NOT NULL은 통과한다",
    "labUrl": "lab.html?episode=TH-43&variant=base&query=0",
    "topic": "제약과 DDL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-43-duplicate-not-null",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래 CASE는 단일 열 후보 값의 NOT NULL·UNIQUE·PRIMARY KEY 요건을 비교하는 교육용 판정표입니다. 실제 SQLite PRIMARY KEY 열의 NULL 허용 여부를 실험하는 SQL이 아닙니다. Oracle 단일 열 제약 요건을 기준으로 읽으세요.\n\n**key_candidates** — 제약 선언 전 검사할 후보 데이터\n\n| row_id | code |\n| --- | --- |\n| 1 | 10 |\n| 2 | 10 |\n| 3 | NULL |\n\n**SQL A: 후보 열의 세 조건**\n\n```sql\nSELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래 CASE는 단일 열 후보 값의 NOT NULL·UNIQUE·PRIMARY KEY 요건을 비교하는 교육용 판정표입니다. 실제 SQLite PRIMARY KEY 열의 NULL 허용 여부를 실험하는 SQL이 아닙니다. Oracle 단일 열 제약 요건을 기준으로 읽으세요.</p>\n<p><strong>key_candidates</strong> — 제약 선언 전 검사할 후보 데이터</p>\n<table>\n<thead>\n<tr>\n<th>row_id</th>\n<th>code</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>10</td>\n</tr>\n<tr>\n<td>3</td>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 후보 열의 세 조건</strong></p>\n<pre><code class=\"language-sql\">SELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id&lt;&gt;k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id&lt;&gt;k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id\n</code></pre>\n",
      "stem": "code=10이 두 번 있는 row_id=1의 판정은?",
      "choices": [
        {
          "id": "S2-TH-43-duplicate-not-null-A",
          "text": "NOT NULL 실패, UNIQUE 통과, PRIMARY KEY 실패"
        },
        {
          "id": "S2-TH-43-duplicate-not-null-C",
          "text": "NOT NULL 통과, UNIQUE 실패, PRIMARY KEY 실패"
        },
        {
          "id": "S2-TH-43-duplicate-not-null-B",
          "text": "NOT NULL 통과, UNIQUE 실패, PRIMARY KEY 통과"
        },
        {
          "id": "S2-TH-43-duplicate-not-null-D",
          "text": "세 조건 모두 통과"
        }
      ],
      "answerId": "S2-TH-43-duplicate-not-null-C",
      "reason": "값 10은 존재하므로 NOT NULL을 통과합니다. 다른 행에도 10이 있어 UNIQUE는 실패하며, 기본 키 역시 유일성이 필요하므로 실패합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-43-duplicate-not-null-A",
          "reason": "NOT NULL 실패, UNIQUE 통과, PRIMARY KEY 실패 — 10은 NULL이 아니지만 중복 값입니다."
        },
        {
          "choiceId": "S2-TH-43-duplicate-not-null-B",
          "reason": "NOT NULL 통과, UNIQUE 실패, PRIMARY KEY 통과 — 기본 키는 NULL 금지뿐 아니라 유일성도 요구합니다."
        },
        {
          "choiceId": "S2-TH-43-duplicate-not-null-D",
          "reason": "세 조건 모두 통과 — 10이 두 번 있으므로 유일성 조건은 위반합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S2-TH-43-unique-does-not-imply-primary",
    "lessonCode": "TH-43",
    "subject": 2,
    "title": "중복을 해결하면 곧바로 기본 키가 될까",
    "labUrl": "lab.html?episode=TH-43&variant=unique&query=0",
    "topic": "제약과 DDL",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-43-unique-does-not-imply-primary",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n아래 CASE는 단일 열 후보 값의 NOT NULL·UNIQUE·PRIMARY KEY 요건을 비교하는 교육용 판정표입니다. 실제 SQLite PRIMARY KEY 열의 NULL 허용 여부를 실험하는 SQL이 아닙니다. Oracle 단일 열 제약 요건을 기준으로 읽으세요.\n\n**key_candidates** — 제약 선언 전 검사할 후보 데이터\n\n| row_id | code |\n| --- | --- |\n| 1 | 10 |\n| 2 | 20 |\n| 3 | NULL |\n\n**SQL A: 중복 해소 후**\n\n```sql\nSELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p>아래 CASE는 단일 열 후보 값의 NOT NULL·UNIQUE·PRIMARY KEY 요건을 비교하는 교육용 판정표입니다. 실제 SQLite PRIMARY KEY 열의 NULL 허용 여부를 실험하는 SQL이 아닙니다. Oracle 단일 열 제약 요건을 기준으로 읽으세요.</p>\n<p><strong>key_candidates</strong> — 제약 선언 전 검사할 후보 데이터</p>\n<table>\n<thead>\n<tr>\n<th>row_id</th>\n<th>code</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>2</td>\n<td>20</td>\n</tr>\n<tr>\n<td>3</td>\n<td>NULL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 중복 해소 후</strong></p>\n<pre><code class=\"language-sql\">SELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id&lt;&gt;k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id&lt;&gt;k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id\n</code></pre>\n",
      "stem": "중복 10을 20으로 바꾼 현재 code 열을 기본 키로 쓸 수 없는 남은 이유는?",
      "choices": [
        {
          "id": "S2-TH-43-unique-does-not-imply-primary-A",
          "text": "10과 20이 서로 다르기 때문이다."
        },
        {
          "id": "S2-TH-43-unique-does-not-imply-primary-B",
          "text": "행 수가 세 개이기 때문이다."
        },
        {
          "id": "S2-TH-43-unique-does-not-imply-primary-C",
          "text": "UNIQUE를 통과한 열은 기본 키로 사용할 수 없기 때문이다."
        },
        {
          "id": "S2-TH-43-unique-does-not-imply-primary-D",
          "text": "row_id=3의 code가 여전히 NULL이기 때문이다."
        }
      ],
      "answerId": "S2-TH-43-unique-does-not-imply-primary-D",
      "reason": "10과 20의 중복은 해결되어 두 값은 유일성 검사를 통과합니다. 그러나 세 번째 행의 NULL은 남아 있으므로 열 전체가 기본 키의 NOT NULL 요건을 충족하지 못합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-43-unique-does-not-imply-primary-A",
          "reason": "10과 20이 서로 다르기 때문이다. — 기본 키의 값은 서로 달라야 하므로 이는 문제가 아닙니다."
        },
        {
          "choiceId": "S2-TH-43-unique-does-not-imply-primary-B",
          "reason": "행 수가 세 개이기 때문이다. — 기본 키 가능 여부에 세 행이라는 제한은 없습니다."
        },
        {
          "choiceId": "S2-TH-43-unique-does-not-imply-primary-C",
          "reason": "UNIQUE를 통과한 열은 기본 키로 사용할 수 없기 때문이다. — 기본 키는 유일성과 NULL 금지를 함께 요구합니다. 유일성 통과 자체는 문제가 아닙니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ]
  },
  {
    "code": "S2-TH-44-delete-rollback-restores",
    "lessonCode": "TH-44",
    "subject": 2,
    "title": "조건부 DELETE를 저장점까지 되돌리기",
    "labUrl": "lab.html?episode=TH-44&variant=base&query=0",
    "topic": "트랜잭션",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-44-delete-rollback-restores",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: 삭제·조회·되돌리기**\n\n```sql\nSAVEPOINT lab_delete; DELETE FROM orders WHERE customer_id=1; SELECT COUNT(*) AS remaining FROM orders; ROLLBACK TO lab_delete; SELECT COUNT(*) AS restored FROM orders;\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 삭제·조회·되돌리기</strong></p>\n<pre><code class=\"language-sql\">SAVEPOINT lab_delete; DELETE FROM orders WHERE customer_id=1; SELECT COUNT(*) AS remaining FROM orders; ROLLBACK TO lab_delete; SELECT COUNT(*) AS restored FROM orders;\n</code></pre>\n",
      "stem": "두 SELECT의 COUNT(*)를 실행 순서대로 고르면?",
      "choices": [
        {
          "id": "S2-TH-44-delete-rollback-restores-B",
          "text": "1, 1"
        },
        {
          "id": "S2-TH-44-delete-rollback-restores-C",
          "text": "0, 3"
        },
        {
          "id": "S2-TH-44-delete-rollback-restores-D",
          "text": "3, 3"
        },
        {
          "id": "S2-TH-44-delete-rollback-restores-A",
          "text": "1, 3"
        }
      ],
      "answerId": "S2-TH-44-delete-rollback-restores-A",
      "reason": "customer_id=1인 101·102를 삭제하면 103만 남아 1행입니다. 삭제 전 저장점 lab_delete로 되돌리면 두 삭제가 취소되어 3행이 복원됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-44-delete-rollback-restores-B",
          "reason": "1, 1 — ROLLBACK TO가 삭제된 두 행을 복원합니다."
        },
        {
          "choiceId": "S2-TH-44-delete-rollback-restores-C",
          "reason": "0, 3 — customer_id=1인 두 행만 지워져 고객 2 주문 한 행이 남습니다."
        },
        {
          "choiceId": "S2-TH-44-delete-rollback-restores-D",
          "reason": "3, 3 — 첫 SELECT는 DELETE 이후, ROLLBACK 이전에 실행됩니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · DELETE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/DELETE.html"
      },
      {
        "title": "Oracle 19c · ROLLBACK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROLLBACK.html"
      },
      {
        "title": "Oracle 19c · SAVEPOINT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SAVEPOINT.html"
      }
    ]
  },
  {
    "code": "S2-TH-44-delete-all-not-truncate",
    "lessonCode": "TH-44",
    "subject": 2,
    "title": "WHERE 없는 DELETE도 되돌릴 수 있을까",
    "labUrl": "lab.html?episode=TH-44&variant=all&query=0",
    "topic": "트랜잭션",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-44-delete-all-not-truncate",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: 전체 DELETE·되돌리기**\n\n```sql\nSAVEPOINT lab_delete; DELETE FROM orders; SELECT COUNT(*) AS remaining FROM orders; ROLLBACK TO lab_delete; SELECT COUNT(*) AS restored FROM orders;\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 전체 DELETE·되돌리기</strong></p>\n<pre><code class=\"language-sql\">SAVEPOINT lab_delete; DELETE FROM orders; SELECT COUNT(*) AS remaining FROM orders; ROLLBACK TO lab_delete; SELECT COUNT(*) AS restored FROM orders;\n</code></pre>\n",
      "stem": "이 예제의 DELETE FROM orders 이후와 ROLLBACK TO 이후 행 수는?",
      "choices": [
        {
          "id": "S2-TH-44-delete-all-not-truncate-D",
          "text": "3, 3"
        },
        {
          "id": "S2-TH-44-delete-all-not-truncate-B",
          "text": "0, 3"
        },
        {
          "id": "S2-TH-44-delete-all-not-truncate-C",
          "text": "0, 0"
        },
        {
          "id": "S2-TH-44-delete-all-not-truncate-A",
          "text": "테이블이 없어져 SELECT 오류"
        }
      ],
      "answerId": "S2-TH-44-delete-all-not-truncate-B",
      "reason": "WHERE 없는 DELETE는 세 행을 모두 제거해 첫 COUNT는 0입니다. 테이블 구조는 남아 있고 저장점 이후 삭제를 되돌리면 두 번째 COUNT는 3입니다. Oracle TRUNCATE의 규칙과 구분해야 합니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-44-delete-all-not-truncate-D",
          "reason": "3, 3 — WHERE 없는 DELETE는 모든 행을 삭제합니다."
        },
        {
          "choiceId": "S2-TH-44-delete-all-not-truncate-C",
          "reason": "0, 0 — 이 DELETE는 저장점 뒤 DML이며 중간 COMMIT이 없어 취소할 수 있습니다."
        },
        {
          "choiceId": "S2-TH-44-delete-all-not-truncate-A",
          "reason": "테이블이 없어져 SELECT 오류 — DELETE는 행을 삭제하며 테이블 구조를 없애지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · DELETE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/DELETE.html"
      },
      {
        "title": "Oracle 19c · ROLLBACK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROLLBACK.html"
      },
      {
        "title": "Oracle 19c · SAVEPOINT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SAVEPOINT.html"
      }
    ]
  },
  {
    "code": "S2-TH-45-nested-savepoint",
    "lessonCode": "TH-45",
    "subject": 2,
    "title": "서로 다른 저장점의 복원 경계",
    "labUrl": "lab.html?episode=TH-45&variant=base&query=0",
    "topic": "트랜잭션",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-45-nested-savepoint",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: 저장점 경계 비교**\n\n```sql\nSAVEPOINT lab_start; UPDATE orders SET amount=20 WHERE order_id=101; SAVEPOINT lab_second; UPDATE orders SET amount=30 WHERE order_id=101; ROLLBACK TO lab_second; SELECT order_id, amount FROM orders WHERE order_id=101; ROLLBACK TO lab_start; SELECT order_id, amount FROM orders WHERE order_id=101;\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 저장점 경계 비교</strong></p>\n<pre><code class=\"language-sql\">SAVEPOINT lab_start; UPDATE orders SET amount=20 WHERE order_id=101; SAVEPOINT lab_second; UPDATE orders SET amount=30 WHERE order_id=101; ROLLBACK TO lab_second; SELECT order_id, amount FROM orders WHERE order_id=101; ROLLBACK TO lab_start; SELECT order_id, amount FROM orders WHERE order_id=101;\n</code></pre>\n",
      "stem": "두 SELECT가 반환하는 101번의 amount를 순서대로 고르면?",
      "choices": [
        {
          "id": "S2-TH-45-nested-savepoint-B",
          "text": "20, 20"
        },
        {
          "id": "S2-TH-45-nested-savepoint-C",
          "text": "20, 10"
        },
        {
          "id": "S2-TH-45-nested-savepoint-D",
          "text": "10, 10"
        },
        {
          "id": "S2-TH-45-nested-savepoint-A",
          "text": "30, 20"
        }
      ],
      "answerId": "S2-TH-45-nested-savepoint-C",
      "reason": "lab_second는 20으로 바꾼 다음에 있으므로 30으로 바꾼 수정만 취소되어 20입니다. 이후 lab_start까지 되돌리면 20으로 바꾼 수정도 취소되어 최초 10입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-45-nested-savepoint-B",
          "reason": "20, 20 — 두 번째 lab_start는 금액을 20으로 바꾸기 전의 저장점입니다."
        },
        {
          "choiceId": "S2-TH-45-nested-savepoint-D",
          "reason": "10, 10 — 첫 ROLLBACK TO lab_second는 저장점 이전의 20을 유지합니다."
        },
        {
          "choiceId": "S2-TH-45-nested-savepoint-A",
          "reason": "30, 20 — 각 ROLLBACK TO가 지정 저장점 뒤의 수정을 취소합니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SAVEPOINT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SAVEPOINT.html"
      },
      {
        "title": "Oracle 19c · ROLLBACK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROLLBACK.html"
      }
    ]
  },
  {
    "code": "S2-TH-45-savepoint-before-both",
    "lessonCode": "TH-45",
    "subject": 2,
    "title": "저장점 뒤의 여러 UPDATE",
    "labUrl": "lab.html?episode=TH-45&variant=first&query=0",
    "topic": "트랜잭션",
    "verificationKind": "sqlite",
    "question": {
      "id": "S2-TH-45-savepoint-before-both",
      "givens": "아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.\n\n**orders** — amount 단위: 천원\n\n| order_id | customer_id | amount |\n| --- | --- | --- |\n| 101 | 1 | 10 |\n| 102 | 1 | 20 |\n| 103 | 2 | 5 |\n\n**SQL A: 수정 두 개 함께 취소**\n\n```sql\nSAVEPOINT lab_start; UPDATE orders SET amount=20 WHERE order_id=101; UPDATE orders SET amount=30 WHERE order_id=101; ROLLBACK TO lab_start; SELECT order_id, amount FROM orders WHERE order_id=101;\n```",
      "givensHtml": "<p>아래 표가 이 문항의 전체 입력입니다. 서로 다른 SQL 코드블록은 이 입력에서 독립적으로 실행하며, 같은 블록 안 문장은 위에서 아래로 이어서 실행합니다.</p>\n<p><strong>orders</strong> — amount 단위: 천원</p>\n<table>\n<thead>\n<tr>\n<th>order_id</th>\n<th>customer_id</th>\n<th>amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>101</td>\n<td>1</td>\n<td>10</td>\n</tr>\n<tr>\n<td>102</td>\n<td>1</td>\n<td>20</td>\n</tr>\n<tr>\n<td>103</td>\n<td>2</td>\n<td>5</td>\n</tr>\n</tbody>\n</table>\n<p><strong>SQL A: 수정 두 개 함께 취소</strong></p>\n<pre><code class=\"language-sql\">SAVEPOINT lab_start; UPDATE orders SET amount=20 WHERE order_id=101; UPDATE orders SET amount=30 WHERE order_id=101; ROLLBACK TO lab_start; SELECT order_id, amount FROM orders WHERE order_id=101;\n</code></pre>\n",
      "stem": "두 UPDATE 뒤 lab_start로 되돌린 최종 amount는?",
      "choices": [
        {
          "id": "S2-TH-45-savepoint-before-both-B",
          "text": "30"
        },
        {
          "id": "S2-TH-45-savepoint-before-both-A",
          "text": "20"
        },
        {
          "id": "S2-TH-45-savepoint-before-both-C",
          "text": "NULL"
        },
        {
          "id": "S2-TH-45-savepoint-before-both-D",
          "text": "10"
        }
      ],
      "answerId": "S2-TH-45-savepoint-before-both-D",
      "reason": "lab_start는 두 UPDATE 전에 설정했습니다. 그 뒤의 10→20과 20→30 수정이 모두 취소되어 최종 값은 10입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-45-savepoint-before-both-B",
          "reason": "30 — lab_start 뒤의 수정이 취소되므로 30은 남지 않습니다."
        },
        {
          "choiceId": "S2-TH-45-savepoint-before-both-A",
          "reason": "20 — ROLLBACK TO는 마지막 UPDATE 하나만 취소하는 명령이 아닙니다."
        },
        {
          "choiceId": "S2-TH-45-savepoint-before-both-C",
          "reason": "NULL — 이 행은 삭제된 것이 아니며 최초 금액 10으로 복원됩니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c · SAVEPOINT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SAVEPOINT.html"
      },
      {
        "title": "Oracle 19c · ROLLBACK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROLLBACK.html"
      }
    ]
  },
  {
    "code": "S2-TH-16-oracle-scalar-multirow",
    "lessonCode": "TH-16",
    "subject": 2,
    "title": "Oracle 스칼라 서브쿼리가 두 행을 반환하면",
    "labUrl": "lab.html?episode=TH-16",
    "topic": "조인과 서브쿼리",
    "verificationKind": "oracle-document",
    "question": {
      "id": "S2-TH-16-oracle-scalar-multirow",
      "givens": "**Oracle Database 19c 기준**\n\nCTE orders는 원고의 주문 (101,1,10),(102,1,20),(103,2,5)입니다. 이 문항은 Oracle의 스칼라 서브쿼리 규칙을 묻습니다. 연결된 체험의 0·1행 예제와 구분하세요.\n\n```sql\nWITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT (SELECT amount FROM orders WHERE customer_id = 1) AS amount\nFROM dual;\n```",
      "givensHtml": "<p><strong>Oracle Database 19c 기준</strong></p>\n<p>CTE orders는 원고의 주문 (101,1,10),(102,1,20),(103,2,5)입니다. 이 문항은 Oracle의 스칼라 서브쿼리 규칙을 묻습니다. 연결된 체험의 0·1행 예제와 구분하세요.</p>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT (SELECT amount FROM orders WHERE customer_id = 1) AS amount\nFROM dual;\n</code></pre>\n",
      "stem": "이 Oracle SQL의 결과는?",
      "choices": [
        {
          "id": "S2-TH-16-oracle-scalar-multirow-C",
          "text": "마지막 amount인 20을 자동으로 반환한다."
        },
        {
          "id": "S2-TH-16-oracle-scalar-multirow-A",
          "text": "한 값을 결정할 수 없어 단일 행 서브쿼리의 다중 행 반환 오류가 난다."
        },
        {
          "id": "S2-TH-16-oracle-scalar-multirow-B",
          "text": "첫 번째 amount인 10을 임의로 반환한다."
        },
        {
          "id": "S2-TH-16-oracle-scalar-multirow-D",
          "text": "두 amount를 더한 30을 반환한다."
        }
      ],
      "answerId": "S2-TH-16-oracle-scalar-multirow-A",
      "reason": "customer_id=1인 행은 amount 10과 20 두 건입니다. Oracle 스칼라 서브쿼리는 0행이면 NULL, 1행이면 그 값, 여러 행이면 오류입니다. SQLite에서 여러 행 중 한 값을 읽는 동작으로 Oracle의 정답을 검증하면 안 됩니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-16-oracle-scalar-multirow-C",
          "reason": "마지막 amount인 20을 자동으로 반환한다. — 정렬과 무관하게 다중 행인 점이 오류 원인입니다."
        },
        {
          "choiceId": "S2-TH-16-oracle-scalar-multirow-B",
          "reason": "첫 번째 amount인 10을 임의로 반환한다. — Oracle은 스칼라 서브쿼리의 두 행을 임의의 한 행으로 줄이지 않습니다."
        },
        {
          "choiceId": "S2-TH-16-oracle-scalar-multirow-D",
          "reason": "두 amount를 더한 30을 반환한다. — SUM 집계는 SQL에 없으며 자동으로 적용되지 않습니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c Scalar Subquery Expressions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Scalar-Subquery-Expressions.html",
        "claim": "여러 행을 반환하는 스칼라 서브쿼리는 Oracle에서 오류이다."
      }
    ]
  },
  {
    "code": "S2-TH-42-oracle-empty-string-count",
    "lessonCode": "TH-42",
    "subject": 2,
    "title": "Oracle의 빈 문자열과 COUNT",
    "labUrl": "lab.html?episode=TH-42",
    "topic": "문자열과 NULL",
    "verificationKind": "oracle-document",
    "question": {
      "id": "S2-TH-42-oracle-empty-string-count",
      "givens": "**Oracle Database 19c 기준**\n\nsamples에는 EMPTY=빈 문자열, NULL_VALUE=NULL, SPACE=공백 한 칸, ZERO_TEXT=문자 0이 각 한 행씩 있습니다. 아래는 기존 원고의 Oracle 전용 SQL이며 브라우저 SQLite 체험은 명시적 NULL과 공백만 비교합니다.\n\n```sql\nWITH samples (id, label, txt) AS (\n SELECT 1, 'EMPTY', CAST('' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 2, 'NULL_VALUE', CAST(NULL AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 3, 'SPACE', CAST(' ' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 4, 'ZERO_TEXT', CAST('0' AS VARCHAR2(10)) FROM dual\n)\nSELECT COUNT(*) AS row_count, COUNT(txt) AS value_count,\n COUNT(DISTINCT txt) AS distinct_count FROM samples;\n```",
      "givensHtml": "<p><strong>Oracle Database 19c 기준</strong></p>\n<p>samples에는 EMPTY=빈 문자열, NULL_VALUE=NULL, SPACE=공백 한 칸, ZERO_TEXT=문자 0이 각 한 행씩 있습니다. 아래는 기존 원고의 Oracle 전용 SQL이며 브라우저 SQLite 체험은 명시적 NULL과 공백만 비교합니다.</p>\n<pre><code class=\"language-sql\">WITH samples (id, label, txt) AS (\n SELECT 1, 'EMPTY', CAST('' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 2, 'NULL_VALUE', CAST(NULL AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 3, 'SPACE', CAST(' ' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 4, 'ZERO_TEXT', CAST('0' AS VARCHAR2(10)) FROM dual\n)\nSELECT COUNT(*) AS row_count, COUNT(txt) AS value_count,\n COUNT(DISTINCT txt) AS distinct_count FROM samples;\n</code></pre>\n",
      "stem": "Oracle 19c에서 (row_count,value_count,distinct_count)는?",
      "choices": [
        {
          "id": "S2-TH-42-oracle-empty-string-count-D",
          "text": "(4, 1, 1)"
        },
        {
          "id": "S2-TH-42-oracle-empty-string-count-C",
          "text": "(4, 3, 3)"
        },
        {
          "id": "S2-TH-42-oracle-empty-string-count-B",
          "text": "(4, 2, 2)"
        },
        {
          "id": "S2-TH-42-oracle-empty-string-count-A",
          "text": "(2, 2, 2)"
        }
      ],
      "answerId": "S2-TH-42-oracle-empty-string-count-B",
      "reason": "네 행 중 빈 문자열과 명시적 NULL은 Oracle 19c에서 둘 다 NULL입니다. 공백 한 칸과 문자 0은 서로 다른 실제 값이므로 전체 행 4, NULL 아닌 값 2, 서로 다른 값 2입니다. SQLite의 빈 문자열 규칙과 혼동하지 않습니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-42-oracle-empty-string-count-D",
          "reason": "(4, 1, 1) — 공백 한 칸도 실제 문자열 값이므로 제외하면 안 됩니다."
        },
        {
          "choiceId": "S2-TH-42-oracle-empty-string-count-C",
          "reason": "(4, 3, 3) — Oracle 19c는 길이 0인 문자열을 NULL로 취급하므로 빈 문자열은 COUNT(txt)에서 제외됩니다."
        },
        {
          "choiceId": "S2-TH-42-oracle-empty-string-count-A",
          "reason": "(2, 2, 2) — COUNT(*)는 빈 문자열·NULL 행도 포함해 전체 네 행을 셉니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html",
        "claim": "Oracle 19c에서 길이 0의 문자열은 NULL이다."
      },
      {
        "title": "Oracle 19c COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html",
        "claim": "COUNT(*)는 모든 행, COUNT(expr)는 NULL이 아닌 값, DISTINCT는 서로 다른 NULL 아닌 값을 센다."
      }
    ]
  },
  {
    "code": "S2-TH-44-oracle-truncate-rollback",
    "lessonCode": "TH-44",
    "subject": 2,
    "title": "Oracle TRUNCATE 뒤의 ROLLBACK",
    "labUrl": "lab.html?episode=TH-44",
    "topic": "제약과 DDL",
    "verificationKind": "oracle-document",
    "question": {
      "id": "S2-TH-44-oracle-truncate-rollback",
      "givens": "**Oracle Database 19c 기준**\n\nOFS_T44_DEMO는 기존 원고에서 id=1,2를 INSERT하고 COMMIT한 일반 영구 테이블입니다. 임시 테이블이 아니며 별도 세션이나 후속 INSERT는 없습니다. 아래 원고의 두 번째 SQL 구간만 실행합니다.\n\n```sql\nTRUNCATE TABLE OFS_T44_DEMO;\nROLLBACK;\nSELECT COUNT(*) AS after_truncate_rollback FROM OFS_T44_DEMO;\n```",
      "givensHtml": "<p><strong>Oracle Database 19c 기준</strong></p>\n<p>OFS_T44_DEMO는 기존 원고에서 id=1,2를 INSERT하고 COMMIT한 일반 영구 테이블입니다. 임시 테이블이 아니며 별도 세션이나 후속 INSERT는 없습니다. 아래 원고의 두 번째 SQL 구간만 실행합니다.</p>\n<pre><code class=\"language-sql\">TRUNCATE TABLE OFS_T44_DEMO;\nROLLBACK;\nSELECT COUNT(*) AS after_truncate_rollback FROM OFS_T44_DEMO;\n</code></pre>\n",
      "stem": "SQL 실행 후 행 수와 테이블 구조의 상태는?",
      "choices": [
        {
          "id": "S2-TH-44-oracle-truncate-rollback-D",
          "text": "행 수가 2로 복원되고 테이블 구조도 남는다."
        },
        {
          "id": "S2-TH-44-oracle-truncate-rollback-A",
          "text": "테이블 구조가 없어져 SELECT가 실패한다."
        },
        {
          "id": "S2-TH-44-oracle-truncate-rollback-C",
          "text": "행 수는 0이며 테이블 구조는 남는다."
        },
        {
          "id": "S2-TH-44-oracle-truncate-rollback-B",
          "text": "행 수는 NULL이며 구조는 남는다."
        }
      ],
      "answerId": "S2-TH-44-oracle-truncate-rollback-C",
      "reason": "Oracle의 일반 영구 테이블에서 TRUNCATE는 모든 행을 제거하며 ROLLBACK으로 되돌릴 수 없습니다. 테이블 자체는 남으므로 COUNT(*)는 0입니다. 이는 저장점으로 되돌릴 수 있는 미커밋 DELETE와 다른 동작입니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-44-oracle-truncate-rollback-D",
          "reason": "행 수가 2로 복원되고 테이블 구조도 남는다. — Oracle TRUNCATE는 ROLLBACK으로 취소할 수 없습니다."
        },
        {
          "choiceId": "S2-TH-44-oracle-truncate-rollback-A",
          "reason": "테이블 구조가 없어져 SELECT가 실패한다. — 구조를 제거하는 DROP과 행을 제거하는 TRUNCATE를 구분해야 합니다."
        },
        {
          "choiceId": "S2-TH-44-oracle-truncate-rollback-B",
          "reason": "행 수는 NULL이며 구조는 남는다. — 빈 테이블의 COUNT(*)는 NULL이 아니라 0입니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c TRUNCATE TABLE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/TRUNCATE-TABLE.html",
        "claim": "TRUNCATE는 모든 행을 제거하고 ROLLBACK할 수 없으며 테이블을 DROP하지 않는다."
      }
    ]
  },
  {
    "code": "S2-TH-45-oracle-commit-boundary",
    "lessonCode": "TH-45",
    "subject": 2,
    "title": "COMMIT 이전 변경과 이후 변경을 구분하기",
    "labUrl": "lab.html?episode=TH-45",
    "topic": "트랜잭션",
    "verificationKind": "oracle-document",
    "question": {
      "id": "S2-TH-45-oracle-commit-boundary",
      "givens": "**Oracle Database 19c 기준**\n\nOFS_T45_DEMO는 기존 원고에서 (id=1,amount=10)을 저장하고 COMMIT한 일반 테이블입니다. 아래 구간 중간에 다른 SQL이나 자동 커밋은 없으며 각 문장을 순서대로 실행합니다.\n\n```sql\nUPDATE OFS_T45_DEMO SET amount = 40 WHERE id=1;\nCOMMIT;\nUPDATE OFS_T45_DEMO SET amount = 50 WHERE id=1;\nROLLBACK;\nSELECT amount AS after_commit_then_rollback\nFROM OFS_T45_DEMO WHERE id=1;\n```",
      "givensHtml": "<p><strong>Oracle Database 19c 기준</strong></p>\n<p>OFS_T45_DEMO는 기존 원고에서 (id=1,amount=10)을 저장하고 COMMIT한 일반 테이블입니다. 아래 구간 중간에 다른 SQL이나 자동 커밋은 없으며 각 문장을 순서대로 실행합니다.</p>\n<pre><code class=\"language-sql\">UPDATE OFS_T45_DEMO SET amount = 40 WHERE id=1;\nCOMMIT;\nUPDATE OFS_T45_DEMO SET amount = 50 WHERE id=1;\nROLLBACK;\nSELECT amount AS after_commit_then_rollback\nFROM OFS_T45_DEMO WHERE id=1;\n</code></pre>\n",
      "stem": "마지막 SELECT의 after_commit_then_rollback 값은?",
      "choices": [
        {
          "id": "S2-TH-45-oracle-commit-boundary-A",
          "text": "10"
        },
        {
          "id": "S2-TH-45-oracle-commit-boundary-C",
          "text": "NULL"
        },
        {
          "id": "S2-TH-45-oracle-commit-boundary-B",
          "text": "50"
        },
        {
          "id": "S2-TH-45-oracle-commit-boundary-D",
          "text": "40"
        }
      ],
      "answerId": "S2-TH-45-oracle-commit-boundary-D",
      "reason": "40으로 바꾼 UPDATE는 COMMIT으로 확정됩니다. 이후 50으로 바꾼 UPDATE만 미커밋 상태이므로 ROLLBACK은 그 변경을 취소하여 확정된 40을 남깁니다.",
      "wrongReasons": [
        {
          "choiceId": "S2-TH-45-oracle-commit-boundary-A",
          "reason": "10 — 40으로 바꾼 뒤 COMMIT하여 최초 10으로 되돌릴 수 없습니다."
        },
        {
          "choiceId": "S2-TH-45-oracle-commit-boundary-C",
          "reason": "NULL — ROLLBACK은 행을 삭제하는 것이 아니라 미커밋 UPDATE를 취소합니다."
        },
        {
          "choiceId": "S2-TH-45-oracle-commit-boundary-B",
          "reason": "50 — 50으로 바꾼 수정은 COMMIT 뒤 새 트랜잭션에서 일어났고 ROLLBACK으로 취소됩니다."
        }
      ],
      "origin": "기존 이론·SQL 실험을 활용한 자체 교육 문제"
    },
    "sources": [
      {
        "title": "Oracle 19c COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html",
        "claim": "COMMIT은 현재 트랜잭션 변경을 확정한다."
      },
      {
        "title": "Oracle 19c ROLLBACK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROLLBACK.html",
        "claim": "ROLLBACK은 현재 미커밋 트랜잭션의 변경을 취소한다."
      }
    ]
  }
];
const lessons=new Map(CATALOG.map(r=>[r.code,r]));
const extra=additions.map(q=>{const lesson=lessons.get(q.lessonCode);if(!lesson)throw Error('Unknown question lesson');return {...lesson,...q,selected:false,recall:null,theoryUrl:lesson.theoryUrl}});
export const QUESTION_ITEMS=[...CATALOG.filter(r=>r.question),...extra].sort((a,b)=>a.subject-b.subject||CATALOG.findIndex(r=>r.code===(a.lessonCode||a.code))-CATALOG.findIndex(r=>r.code===(b.lessonCode||b.code))||a.code.localeCompare(b.code));
export const PROGRESS_CATALOG=[...CATALOG,...extra];
export const questionsForLesson=code=>QUESTION_ITEMS.filter(r=>(r.lessonCode||r.code)===code);
export const lessonPracticeUrl=code=>'practice.html?lesson='+encodeURIComponent(code);
