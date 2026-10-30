export const CATALOG = [
  {
    "code": "E001",
    "topicId": "TH-01",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "NULL과 집계",
    "title": "주문은 세 건인데 COUNT는 왜 다를까",
    "lead": "같은 표에서도 3, 2, 1이 나옵니다. COUNT의 괄호 안을 읽으면 무엇을 세었는지 알 수 있습니다.",
    "cue": "원본 쿠폰 값은 500, NULL, 500입니다. COUNT(coupon_amount)는 NULL이 아닌 두 값을 셉니다. 중복 값 500을 자동으로 하나로 합치지 않습니다.",
    "selected": true,
    "theoryUrl": "theory/E001.html",
    "labUrl": "lab.html?episode=E001",
    "featured": true,
    "question": {
      "id": "MCQ-E001",
      "givens": "주문 세 건의 coupon_amount는 다음과 같다. 다른 행 필터는 없다. 주문 쿠폰 금액 원 201 500 202 NULL 203 500",
      "givensHtml": "<p>주문 세 건의 <code>coupon_amount</code>는 다음과 같다. 다른 행 필터는 없다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">주문</th>\n<th scope=\"col\">쿠폰 금액 원</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>500</td>\n</tr>\n<tr>\n<td>202</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>203</td>\n<td>500</td>\n</tr>\n</tbody>\n</table></div>\n",
      "stem": "COUNT(coupon_amount)의 결과는?",
      "choices": [
        {
          "id": "E001-C1",
          "text": "0"
        },
        {
          "id": "E001-C2",
          "text": "1"
        },
        {
          "id": "E001-C3",
          "text": "2"
        },
        {
          "id": "E001-C4",
          "text": "3"
        }
      ],
      "answerId": "E001-C3",
      "reason": "두 값이 같아도 각각 기록된 행이다. NULL인 표현식은 세지 않지만 중복을 자동 제거하지도 않는다.",
      "wrongReasons": [
        {
          "choiceId": "E001-C1",
          "reason": "이 COUNT는 나머지 두 값을 센다."
        },
        {
          "choiceId": "E001-C2",
          "reason": "그것은 COUNT(DISTINCT coupon_amount)의 결과다."
        },
        {
          "choiceId": "E001-C4",
          "reason": "COUNT(*)의 결과와 바뀌었다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-01-check",
      "prompt": "세 행의 쿠폰 금액이 모두 NULL이라면 세 COUNT는 각각 얼마일까요? 주문 행은 그대로 있다는 조건을 놓치지 마세요.",
      "answer": "3, 0, 0입니다. 주문 세 행은 남아 있지만, 셀 수 있는 NULL 아닌 쿠폰 금액은 없습니다.",
      "answerHtml": "<p><strong>3, 0, 0</strong>입니다. 주문 세 행은 남아 있지만, 셀 수 있는 NULL 아닌 쿠폰 금액은 없습니다.</p>\n",
      "context": "[가상 예시] 카페 주문 세 건을 살펴봅니다. 201번과 203번에는 쿠폰 금액 500원이 기록되어 있고, 202번의 쿠폰 금액은 NULL입니다. orders · 쿠폰 금액 단위: 원 order_id coupon_amount 201 500 202 NULL 203 500 주문은 분명 세 건입니다. 그런데 “쿠폰 금액이 기록된 주문은 몇 건인가?”라고 물으면 답은 두 건입니다. “기록된 쿠폰 금액은 몇 종류인가?”라고 물으면 500원 한 종류만 남습니다. NULL을 0원으로 읽으면 여기서부터 답이 어긋납니다. 이 표의 NULL은 쿠폰 금액 값이 없다는 표시입니다. 이 값만 보고 쿠폰을 사용하지 않았다고 단정하지도 않습니다. 실행 1 · 500, NULL, 500 WITH orders (order_id, coupon_amount) AS ( SELECT 201, 500 FROM dual UNION ALL SELECT 202, CAST(NULL AS NUMBER) FROM dual UNION ALL SELECT 203, 500 FROM dual ) SELECT COUNT(*) AS row_count, COUNT(coupon_amount) AS value_count, COUNT(DISTINCT coupon_amount) AS distinct_count FROM orders; 실행 2 · 500, 0, 500 WITH orders (order_id, coupon_amount) AS ( SELECT 201, 500 FROM dual UNION ALL SELECT 202, 0 FROM dual UNION ALL SELECT 203, 500 FROM dual ) SELECT COUNT(*) AS row_count, COUNT(coupon_amount) AS value_count, COUNT(DISTINCT coupon_amount) AS distinct_count FROM orders;",
      "contextHtml": "<p>[가상 예시] 카페 주문 세 건을 살펴봅니다. 201번과 203번에는 쿠폰 금액 500원이 기록되어 있고, 202번의 쿠폰 금액은 NULL입니다.</p>\n<p>orders · 쿠폰 금액 단위: 원</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">order_id</th>\n<th scope=\"col\">coupon_amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>500</td>\n</tr>\n<tr>\n<td>202</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>203</td>\n<td>500</td>\n</tr>\n</tbody>\n</table></div>\n<p>주문은 분명 세 건입니다. 그런데 “쿠폰 금액이 기록된 주문은 몇 건인가?”라고 물으면 답은 두 건입니다. “기록된 쿠폰 금액은 몇 종류인가?”라고 물으면 500원 한 종류만 남습니다.</p>\n<p>NULL을 0원으로 읽으면 여기서부터 답이 어긋납니다. 이 표의 NULL은 <strong>쿠폰 금액 값이 없다는 표시</strong>입니다. 이 값만 보고 쿠폰을 사용하지 않았다고 단정하지도 않습니다.</p>\n<h3>실행 1 · 500, NULL, 500</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, coupon_amount) AS (\n    SELECT 201, 500 FROM dual\n    UNION ALL\n    SELECT 202, CAST(NULL AS NUMBER) FROM dual\n    UNION ALL\n    SELECT 203, 500 FROM dual\n)\nSELECT COUNT(*) AS row_count,\n       COUNT(coupon_amount) AS value_count,\n       COUNT(DISTINCT coupon_amount) AS distinct_count\nFROM orders;\n</code></pre>\n<h3>실행 2 · 500, 0, 500</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, coupon_amount) AS (\n    SELECT 201, 500 FROM dual\n    UNION ALL\n    SELECT 202, 0 FROM dual\n    UNION ALL\n    SELECT 203, 500 FROM dual\n)\nSELECT COUNT(*) AS row_count,\n       COUNT(coupon_amount) AS value_count,\n       COUNT(DISTINCT coupon_amount) AS distinct_count\nFROM orders;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "COUNT · Purpose",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      },
      {
        "title": "Oracle Database 19c SQL Language Reference, Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "Oracle Database 19c SQL Language Reference, SELECT · subquery_factoring_clause",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 5
  },
  {
    "code": "E025",
    "topicId": null,
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "기존 NULL·집계 문제",
    "title": "SUM 안과 밖의 덧셈",
    "lead": "SUM 괄호 안부터 한 행씩 계산합니다. 수수료가 NULL인 행의 금액도 따로 살펴보세요.",
    "cue": "A는 행별로 amount+fee를 계산한 10, NULL, 10을 합쳐 20입니다. 12+NULL을 자동으로 12로 계산하지 않습니다.",
    "selected": false,
    "theoryUrl": "theory/E025.html",
    "labUrl": "lab.html?episode=E025",
    "featured": false,
    "question": {
      "id": "MCQ-E025",
      "givens": "금액·수수료의 단위는 모두 천원이다. 필터·그룹 없이 세 행 전체를 집계한다. 주문 amount fee 201 8 2 202 12 NULL 203 7 3 A = SUM(amount + fee) B = SUM(amount) + SUM(fee)",
      "givensHtml": "<p>금액·수수료의 단위는 모두 천원이다. 필터·그룹 없이 세 행 전체를 집계한다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">주문</th>\n<th scope=\"col\">amount</th>\n<th scope=\"col\">fee</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>201</td>\n<td>8</td>\n<td>2</td>\n</tr>\n<tr>\n<td>202</td>\n<td>12</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>203</td>\n<td>7</td>\n<td>3</td>\n</tr>\n</tbody>\n</table></div>\n<p><code>A = SUM(amount + fee)</code></p>\n<p><code>B = SUM(amount) + SUM(fee)</code></p>\n",
      "stem": "A와 B의 결과는 각각 무엇일까?",
      "choices": [
        {
          "id": "E025-C1",
          "text": "20, 32"
        },
        {
          "id": "E025-C2",
          "text": "32, 32"
        },
        {
          "id": "E025-C3",
          "text": "20, 20"
        },
        {
          "id": "E025-C4",
          "text": "NULL, NULL"
        }
      ],
      "answerId": "E025-C1",
      "reason": "A의 입력은 10, NULL, 10이 되어 20이다. B는 금액 합계 27과 수수료 합계 5를 구한 뒤 더해 32다. SUM을 열 합계인지 행 합계인지로만 외우지 않고 인수 표현식을 읽는다.",
      "wrongReasons": [
        {
          "choiceId": "E025-C2",
          "reason": "NULL 산술 결과를 자동으로 0 대입하지 않는다."
        },
        {
          "choiceId": "E025-C3",
          "reason": "B의 amount 12는 그 열의 SUM에 들어간다."
        },
        {
          "choiceId": "E025-C4",
          "reason": "이 데이터에는 NULL이 아닌 집계 입력도 있다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": null,
    "sources": [],
    "variantCount": 4
  },
  {
    "code": "E004",
    "topicId": "TH-09",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "고객은 세 명인데 LEFT JOIN은 왜 네 행일까",
    "lead": "조인은 고객 명단에 열 하나만 붙이는 작업이 아닙니다. 조건이 맞는 행의 쌍을 먼저 셉니다.",
    "cue": "고객 11은 주문 201·202 두 건에 대응하므로 결과에 두 번 나옵니다. 고객 22는 203 한 건에 대응합니다.",
    "selected": true,
    "theoryUrl": "theory/E004.html",
    "labUrl": "lab.html?episode=E004",
    "featured": true,
    "question": {
      "id": "MCQ-E004",
      "givens": "고객 ID는 11,22,33이고 각각 한 행이다. 서로 다른 주문 세 건의 고객 ID는 11,11,22다. 고객 ID 일치로 고객 LEFT JOIN 주문을 수행한다. WHERE·집계·DISTINCT는 없다.",
      "givensHtml": "<p>고객 ID는 <code>11,22,33</code>이고 각각 한 행이다. 서로 다른 주문 세 건의 고객 ID는 <code>11,11,22</code>다. 고객 ID 일치로 고객 LEFT JOIN 주문을 수행한다. WHERE·집계·DISTINCT는 없다.</p>\n",
      "stem": "결과는 몇 행일까?",
      "choices": [
        {
          "id": "E004-C1",
          "text": "3"
        },
        {
          "id": "E004-C2",
          "text": "4"
        },
        {
          "id": "E004-C3",
          "text": "6"
        },
        {
          "id": "E004-C4",
          "text": "9"
        }
      ],
      "answerId": "E004-C2",
      "reason": "11번 고객이 두 주문과 각각 대응해 두 행이 된다. 22는 한 행, 주문이 없는 33은 오른쪽 값이 NULL인 한 행이 된다.",
      "wrongReasons": [
        {
          "choiceId": "E004-C1",
          "reason": "11이 두 번 대응한다."
        },
        {
          "choiceId": "E004-C3",
          "reason": "조인은 두 목록의 단순 합치기가 아니다."
        },
        {
          "choiceId": "E004-C4",
          "reason": "3×3은 이 조건 없는 CROSS JOIN의 계산이다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-09-check",
      "prompt": "MIN의 주문이 세 건으로 늘어나면 LEFT JOIN 결과는 몇 행일까요?",
      "answer": "다른 조건이 같다면 5행입니다. MIN 3행, JUN 1행, SOL의 미일치 1행입니다.",
      "answerHtml": "<p>다른 조건이 같다면 5행입니다. MIN 3행, JUN 1행, SOL의 미일치 1행입니다.</p>\n",
      "context": "MIN에게 주문 두 건, JUN에게 한 건이 있고 SOL에게는 주문이 없습니다. “모든 고객과 주문을 함께 보여 달라”는 요청에서는 MIN의 주문 둘과 SOL의 미일치 행을 모두 표현해야 합니다. 고객 주문 수 MIN 2 JUN 1 SOL 0 실행 1 · 왼쪽 고객을 보존 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT c.customer_id, c.customer_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id, o.order_id; 실행 2 · 일치하는 쌍만 조회 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT c.customer_id, c.customer_name, o.order_id FROM customers c JOIN orders o ON c.customer_id = o.customer_id ORDER BY c.customer_id, o.order_id;",
      "contextHtml": "<p>MIN에게 주문 두 건, JUN에게 한 건이 있고 SOL에게는 주문이 없습니다. “모든 고객과 주문을 함께 보여 달라”는 요청에서는 MIN의 주문 둘과 SOL의 미일치 행을 모두 표현해야 합니다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">고객</th>\n<th scope=\"col\">주문 수</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MIN</td>\n<td>2</td>\n</tr>\n<tr>\n<td>JUN</td>\n<td>1</td>\n</tr>\n<tr>\n<td>SOL</td>\n<td>0</td>\n</tr>\n</tbody>\n</table></div>\n<h3>실행 1 · 왼쪽 고객을 보존</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT c.customer_id, c.customer_name, o.order_id\nFROM customers c LEFT JOIN orders o\n  ON c.customer_id = o.customer_id\nORDER BY c.customer_id, o.order_id;\n</code></pre>\n<h3>실행 2 · 일치하는 쌍만 조회</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT c.customer_id, c.customer_name, o.order_id\nFROM customers c JOIN orders o\n  ON c.customer_id = o.customer_id\nORDER BY c.customer_id, o.order_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Joins",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Joins.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 5
  },
  {
    "code": "E016",
    "topicId": "TH-10",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "같은 조건인데 ON과 WHERE는 왜 다를까",
    "lead": "20원 이상인 주문을 연결하되 모든 고객을 남기려면, 주문 조건을 어디에 두어야 할까요?",
    "cue": "A의 ON 조건은 고객 ID가 같고 주문 금액이 10천원 이상인 주문을 붙입니다. 22와 33은 붙일 주문이 없어도 고객 행이 남습니다.",
    "selected": true,
    "theoryUrl": "theory/E016.html",
    "labUrl": "lab.html?episode=E016",
    "featured": false,
    "question": {
      "id": "MCQ-E016",
      "givens": "고객은 11,22,33이다. 주문은 (201,11,8), (202,11,12), (203,22,7)이며 괄호는 주문 ID·고객 ID·금액 천원이다. 고객과 주문의 ID 일치 LEFT JOIN에 다음 조건을 각각 적용한다. DISTINCT·추가 필터는 없다. A: ON의 ID 일치 조건 뒤에 AND o.amount >= 10 B: 조인 뒤 WHERE o.amount >= 10",
      "givensHtml": "<p>고객은 <code>11,22,33</code>이다. 주문은 <code>(201,11,8)</code>, <code>(202,11,12)</code>, <code>(203,22,7)</code>이며 괄호는 주문 ID·고객 ID·금액 천원이다. 고객과 주문의 ID 일치 LEFT JOIN에 다음 조건을 각각 적용한다. DISTINCT·추가 필터는 없다.</p>\n<ul>\n<li>A: ON의 ID 일치 조건 뒤에 <code>AND o.amount &gt;= 10</code></li>\n<li>B: 조인 뒤 <code>WHERE o.amount &gt;= 10</code></li>\n</ul>\n",
      "stem": "A와 B는 각각 몇 행일까?",
      "choices": [
        {
          "id": "E016-C1",
          "text": "1,1"
        },
        {
          "id": "E016-C2",
          "text": "3,1"
        },
        {
          "id": "E016-C3",
          "text": "3,3"
        },
        {
          "id": "E016-C4",
          "text": "1,3"
        }
      ],
      "answerId": "E016-C2",
      "reason": "A에서는 붙일 주문이 없어 22를 빈 주문 행으로 남긴다. B에서는 22의 실제 주문 7이 먼저 붙고, 이후 필터에서 그 행이 사라진다. 33도 B의 결과에 남지 않는다.",
      "wrongReasons": [
        {
          "choiceId": "E016-C1",
          "reason": "A에는 22·33의 빈 주문 행이 남는다."
        },
        {
          "choiceId": "E016-C3",
          "reason": "B의 NULL>=10은 TRUE가 아니어서 남지 않는다."
        },
        {
          "choiceId": "E016-C4",
          "reason": "A가 3행, B가 1행이다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-10-check",
      "prompt": "WHERE 버전에 OR o.order_id IS NULL을 붙이면 JUN도 돌아올까요?",
      "answer": "아닙니다. MIN과 SOL만 남습니다. JUN은 작은 주문과 연결된 행의 order_id가 NULL이 아니므로 두 조건 모두 통과하지 못합니다.",
      "answerHtml": "<p>아닙니다. MIN과 SOL만 남습니다. JUN은 작은 주문과 연결된 행의 order_id가 NULL이 아니므로 두 조건 모두 통과하지 못합니다.</p>\n",
      "context": "세 고객 중 MIN만 20원짜리 주문이 있습니다. JUN은 작은 주문만 있고 SOL은 주문이 없습니다. 두 고객에게 큰 주문이 없다는 사실까지 보여 주는 보고서를 만들어 봅니다. 실행 1 · 연결할 주문의 조건 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT c.customer_id, o.order_id, o.amount FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id AND o.amount >= 20 ORDER BY c.customer_id; 실행 2 · 조인 결과의 필터 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT c.customer_id, o.order_id, o.amount FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.amount >= 20 ORDER BY c.customer_id;",
      "contextHtml": "<p>세 고객 중 MIN만 20원짜리 주문이 있습니다. JUN은 작은 주문만 있고 SOL은 주문이 없습니다. 두 고객에게 큰 주문이 없다는 사실까지 보여 주는 보고서를 만들어 봅니다.</p>\n<h3>실행 1 · 연결할 주문의 조건</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT c.customer_id, o.order_id, o.amount\nFROM customers c LEFT JOIN orders o\n  ON c.customer_id = o.customer_id AND o.amount &gt;= 20\nORDER BY c.customer_id;\n</code></pre>\n<h3>실행 2 · 조인 결과의 필터</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT c.customer_id, o.order_id, o.amount\nFROM customers c LEFT JOIN orders o\n  ON c.customer_id = o.customer_id\nWHERE o.amount &gt;= 20\nORDER BY c.customer_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Joins",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Joins.html"
      },
      {
        "title": "Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 3
  },
  {
    "code": "E019",
    "topicId": null,
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "기존 NULL·집계 문제",
    "title": "NOT IN과 NULL",
    "lead": "목록에 없다고 확정할 수 있는지 확인합니다. FALSE와 UNKNOWN은 WHERE에서 둘 다 제외되지만 같은 논리값은 아닙니다.",
    "cue": "단일 열의 NOT IN에서 11은 목록에 일치하는 값이 있으므로 남지 않습니다. 22와 33은 NULL과 다름을 확정할 수 없어 UNKNOWN입니다.",
    "selected": false,
    "theoryUrl": "theory/E019.html",
    "labUrl": "lab.html?episode=E019",
    "featured": false,
    "question": {
      "id": "MCQ-E019",
      "givens": "고객 ID는 11,22,33이며 모두 NULL이 아니다. 제외 목록은 두 행 11,NULL이다. SELECT customer_id FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM excluded_customers);",
      "givensHtml": "<p>고객 ID는 <code>11,22,33</code>이며 모두 NULL이 아니다. 제외 목록은 두 행 <code>11,NULL</code>이다.</p>\n<pre><code class=\"language-sql\">SELECT customer_id\nFROM customers\nWHERE customer_id NOT IN\n      (SELECT customer_id FROM excluded_customers);\n</code></pre>\n",
      "stem": "조회되는 고객은 몇 명일까?",
      "choices": [
        {
          "id": "E019-C1",
          "text": "0명"
        },
        {
          "id": "E019-C2",
          "text": "1명"
        },
        {
          "id": "E019-C3",
          "text": "2명"
        },
        {
          "id": "E019-C4",
          "text": "3명"
        }
      ],
      "answerId": "E019-C1",
      "reason": "22에 대해서는 22<>11 AND 22<>NULL을 읽는다. TRUE AND UNKNOWN이므로 UNKNOWN이고 WHERE를 통과하지 못한다. 33도 같다. 11은 FALSE다. 모든 행이 UNKNOWN인 것은 아니다.",
      "wrongReasons": [
        {
          "choiceId": "E019-C2",
          "reason": "이것은 NOT IN이 묻는 방향과 반대다."
        },
        {
          "choiceId": "E019-C3",
          "reason": "NOT IN은 이 항목을 자동 제거하지 않는다."
        },
        {
          "choiceId": "E019-C4",
          "reason": "11은 명확히 일치해 제외된다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": null,
    "sources": [],
    "variantCount": 4
  },
  {
    "code": "E026",
    "topicId": "TH-27",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "순위와 윈도우",
    "title": "같은 날의 누적 합계는 왜 한꺼번에 늘어날까",
    "lead": "현재 행까지라는 말의 범위가 물리적 행인지 같은 정렬 값인지 확인해 봅니다.",
    "cue": "day_no가 2인 두 행의 금액은 6과 9입니다. A는 날짜·receipt_id 순으로 한 행씩 누적해 4,10,19,24를 만듭니다.",
    "selected": true,
    "theoryUrl": "theory/E026.html",
    "labUrl": "lab.html?episode=E026",
    "featured": false,
    "question": {
      "id": "MCQ-E026",
      "givens": "day_no는 날짜 순서를 나타내는 교육용 정수다. 영수증 ID는 고유하고 금액 단위는 천원이다. 전체 행을 같은 파티션으로 계산한다. 영수증 day_no amount 401 1 4 402 2 6 403 2 9 404 3 5 -- A SUM(amount) OVER (ORDER BY day_no,receipt_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) -- B SUM(amount) OVER (ORDER BY day_no RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "givensHtml": "<p>day_no는 날짜 순서를 나타내는 교육용 정수다. 영수증 ID는 고유하고 금액 단위는 천원이다. 전체 행을 같은 파티션으로 계산한다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">영수증</th>\n<th scope=\"col\">day_no</th>\n<th scope=\"col\">amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>1</td>\n<td>4</td>\n</tr>\n<tr>\n<td>402</td>\n<td>2</td>\n<td>6</td>\n</tr>\n<tr>\n<td>403</td>\n<td>2</td>\n<td>9</td>\n</tr>\n<tr>\n<td>404</td>\n<td>3</td>\n<td>5</td>\n</tr>\n</tbody>\n</table></div>\n<pre><code class=\"language-sql\">-- A\nSUM(amount) OVER (ORDER BY day_no,receipt_id\nROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)\n-- B\nSUM(amount) OVER (ORDER BY day_no\nRANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)\n</code></pre>\n",
      "stem": "2일차 두 행에 같은 날짜 누계를 붙이는 쪽은?",
      "choices": [
        {
          "id": "E026-C1",
          "text": "A만"
        },
        {
          "id": "E026-C2",
          "text": "B만"
        },
        {
          "id": "E026-C3",
          "text": "A와 B 모두"
        },
        {
          "id": "E026-C4",
          "text": "둘 다 아님"
        }
      ],
      "answerId": "E026-C2",
      "reason": "둘 다 입력 행은 유지한다. A의 2일차 누계는 10·19이고 B는 두 행 모두 19다. 같은 날짜만으로 ROWS 행 순서를 단정하지 않도록 A에는 고유 ID를 지정했다.",
      "wrongReasons": [
        {
          "choiceId": "E026-C1",
          "reason": "둘 다 입력 행은 유지한다. A의 2일차 누계는 10·19이고 B는 두 행 모두 19다. 같은 날짜만으로 ROWS 행 순서를 단정하지 않도록 A에는 고유 ID를 지정했다."
        },
        {
          "choiceId": "E026-C3",
          "reason": "둘 다 입력 행은 유지한다. A의 2일차 누계는 10·19이고 B는 두 행 모두 19다. 같은 날짜만으로 ROWS 행 순서를 단정하지 않도록 A에는 고유 ID를 지정했다."
        },
        {
          "choiceId": "E026-C4",
          "reason": "둘 다 입력 행은 유지한다. A의 2일차 누계는 10·19이고 B는 두 행 모두 19다. 같은 날짜만으로 ROWS 행 순서를 단정하지 않도록 A에는 고유 ID를 지정했다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-27-check",
      "prompt": "실행 1의 ROWS 정렬에서 order_id를 빼면 첫 두 행의 개별 누계를 확정할 수 있을까요?",
      "answer": "동률 내의 순서가 정해지지 않아 확정할 수 없습니다. 고유한 보조 정렬 키가 있어야 행별 결과를 일정하게 비교할 수 있습니다.",
      "answerHtml": "<p>동률 내의 순서가 정해지지 않아 확정할 수 없습니다. 고유한 보조 정렬 키가 있어야 행별 결과를 일정하게 비교할 수 있습니다.</p>\n",
      "context": "첫날 주문은 8원과 12원, 둘째 날 주문은 7원입니다. 첫 번째 주문의 누계가 8인지 20인지 비교해 봅니다. 실행 1 · 행 단위와 날짜 동률 범위 WITH sales (order_id, day_no, amount) AS ( SELECT 1, 1, 8 FROM dual UNION ALL SELECT 2, 1, 12 FROM dual UNION ALL SELECT 3, 2, 7 FROM dual ) SELECT order_id, day_no, amount, SUM(amount) OVER (ORDER BY day_no, order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS rows_sum, SUM(amount) OVER (ORDER BY day_no RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS range_sum FROM sales ORDER BY order_id; 실행 2 · RANGE의 전체 정렬 키를 바꾸면 WITH sales (order_id, day_no, amount) AS ( SELECT 1, 1, 8 FROM dual UNION ALL SELECT 2, 1, 12 FROM dual UNION ALL SELECT 3, 2, 7 FROM dual ) SELECT order_id, SUM(amount) OVER (ORDER BY day_no, order_id RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS range_sum FROM sales ORDER BY order_id;",
      "contextHtml": "<p>첫날 주문은 8원과 12원, 둘째 날 주문은 7원입니다. 첫 번째 주문의 누계가 8인지 20인지 비교해 봅니다.</p>\n<h3>실행 1 · 행 단위와 날짜 동률 범위</h3>\n<pre><code class=\"language-sql\">WITH sales (order_id, day_no, amount) AS (\n    SELECT 1, 1, 8 FROM dual\n    UNION ALL\n    SELECT 2, 1, 12 FROM dual\n    UNION ALL\n    SELECT 3, 2, 7 FROM dual\n)\nSELECT order_id, day_no, amount,\n SUM(amount) OVER (ORDER BY day_no, order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS rows_sum,\n SUM(amount) OVER (ORDER BY day_no RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS range_sum\nFROM sales ORDER BY order_id;\n</code></pre>\n<h3>실행 2 · RANGE의 전체 정렬 키를 바꾸면</h3>\n<pre><code class=\"language-sql\">WITH sales (order_id, day_no, amount) AS (\n    SELECT 1, 1, 8 FROM dual\n    UNION ALL\n    SELECT 2, 1, 12 FROM dual\n    UNION ALL\n    SELECT 3, 2, 7 FROM dual\n)\nSELECT order_id,\n SUM(amount) OVER (ORDER BY day_no, order_id RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS range_sum\nFROM sales ORDER BY order_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      },
      {
        "title": "SUM",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SUM.html"
      }
    ],
    "variantCount": 4
  },
  {
    "code": "E002",
    "topicId": null,
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "기존 NULL·집계 문제",
    "title": "NULL은 등호로 찾을 수 있을까",
    "lead": "500, NULL, 0은 서로 다른 입력입니다. 기록 없음과 0원을 구분해 보세요.",
    "cue": "NULL을 찾으려고 coupon=NULL을 쓰면 해당 비교는 TRUE가 되지 않습니다. 이 자료에서 A의 결과는 0행입니다.",
    "selected": false,
    "theoryUrl": "theory/E002.html",
    "labUrl": "lab.html?episode=E002",
    "featured": false,
    "question": {
      "id": "MCQ-E002",
      "givens": "batch2-v1의 null_orders는 주문 한 건당 한 행이다. coupon은 원 단위이며, 이 예제의 NULL은 쿠폰 금액 미기록을 뜻한다. 0은 0원이 기록된 값이다. 결과의 순서는 묻지 않는다. order_id coupon 301 500 302 NULL 303 0 -- A SELECT order_id FROM null_orders WHERE coupon = NULL; -- B SELECT order_id FROM null_orders WHERE coupon IS NULL;",
      "givensHtml": "<p><code>batch2-v1</code>의 <code>null_orders</code>는 주문 한 건당 한 행이다. coupon은 원 단위이며, 이 예제의 NULL은 쿠폰 금액 미기록을 뜻한다. 0은 0원이 기록된 값이다. 결과의 순서는 묻지 않는다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">order_id</th>\n<th scope=\"col\">coupon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>301</td>\n<td>500</td>\n</tr>\n<tr>\n<td>302</td>\n<td>NULL</td>\n</tr>\n<tr>\n<td>303</td>\n<td>0</td>\n</tr>\n</tbody>\n</table></div>\n<pre><code class=\"language-sql\">-- A\nSELECT order_id FROM null_orders WHERE coupon = NULL;\n-- B\nSELECT order_id FROM null_orders WHERE coupon IS NULL;\n</code></pre>\n",
      "stem": "A와 B는 각각 몇 행을 조회할까?",
      "choices": [
        {
          "id": "E002-C1",
          "text": "A 0행 · B 1행"
        },
        {
          "id": "E002-C2",
          "text": "A 1행 · B 1행"
        },
        {
          "id": "E002-C3",
          "text": "A 0행 · B 0행"
        },
        {
          "id": "E002-C4",
          "text": "A 1행 · B 0행"
        }
      ],
      "answerId": "E002-C1",
      "reason": "정답. A는 TRUE가 되는 행이 없고 B는 주문 302를 남긴다.",
      "wrongReasons": [
        {
          "choiceId": "E002-C2",
          "reason": "등호도 NULL을 찾는 검사로 읽은 오답이다."
        },
        {
          "choiceId": "E002-C3",
          "reason": "IS NULL까지 일반 값 비교처럼 처리한 오답이다."
        },
        {
          "choiceId": "E002-C4",
          "reason": "두 조건의 역할을 뒤집은 오답이다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": null,
    "sources": [],
    "variantCount": 4
  },
  {
    "code": "E011",
    "topicId": "TH-18",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "DISTINCT는 첫 번째 열만 보는 걸까",
    "lead": "고객 번호만 조회할 때와 주문 번호까지 조회할 때, 중복의 기준이 달라집니다.",
    "cue": "원본에는 (11,커피)가 두 번 있습니다. customer_id와 menu만 고르면 두 결과가 같아 하나로 합쳐집니다.",
    "selected": true,
    "theoryUrl": "theory/E011.html",
    "labUrl": "lab.html?episode=E011",
    "featured": false,
    "question": {
      "id": "MCQ-E011",
      "givens": "입력 purchases는 구매 한 건당 한 행이다. 주문번호는 서로 다르며, 조회 결과의 순서는 묻지 않는다. order_id customer_id menu 401 11 커피 402 11 커피 403 11 차 404 22 커피 SELECT DISTINCT customer_id, menu FROM purchases;",
      "givensHtml": "<p>입력 <code>purchases</code>는 구매 한 건당 한 행이다. 주문번호는 서로 다르며, 조회 결과의 순서는 묻지 않는다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">order_id</th>\n<th scope=\"col\">customer_id</th>\n<th scope=\"col\">menu</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>401</td>\n<td>11</td>\n<td>커피</td>\n</tr>\n<tr>\n<td>402</td>\n<td>11</td>\n<td>커피</td>\n</tr>\n<tr>\n<td>403</td>\n<td>11</td>\n<td>차</td>\n</tr>\n<tr>\n<td>404</td>\n<td>22</td>\n<td>커피</td>\n</tr>\n</tbody>\n</table></div>\n<pre><code class=\"language-sql\">SELECT DISTINCT customer_id, menu\nFROM purchases;\n</code></pre>\n",
      "stem": "조회 결과는 몇 행일까?",
      "choices": [
        {
          "id": "E011-C1",
          "text": "1행"
        },
        {
          "id": "E011-C2",
          "text": "2행"
        },
        {
          "id": "E011-C3",
          "text": "3행"
        },
        {
          "id": "E011-C4",
          "text": "4행"
        }
      ],
      "answerId": "E011-C3",
      "reason": "DISTINCT는 SELECT 목록의 값이 모두 같은 행을 중복으로 판단한다. (11, 커피) 두 건은 한 번 남고, (11, 차), (22, 커피)가 각각 남는다. 아래 표는 설명용 순서이며 ORDER BY가 없는 쿼리의 출력 순서를 보장하지 않는다.",
      "wrongReasons": [
        {
          "choiceId": "E011-C1",
          "reason": "전체를 한 그룹처럼 처리한 결과다. 서로 다른 값의 묶음이 세 개 있다."
        },
        {
          "choiceId": "E011-C2",
          "reason": "고객번호만 비교하면 2행이지만, 이 SELECT에는 메뉴도 포함된다. 메뉴만 비교해도 2종류지만 두 열의 조합과는 다르다."
        },
        {
          "choiceId": "E011-C4",
          "reason": "중복 제거 전 구매 행 수다. 선택하지 않은 order_id가 다르다는 이유로 결과를 4행으로 세면 안 된다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-18-check",
      "prompt": "두 열 앞의 DISTINCT를 고객 번호 바로 앞에 썼으니 고객만 중복 제거한다는 설명은 맞을까요?",
      "answer": "맞지 않습니다. 키워드를 적은 위치와 관계없이 SELECT 목록 전체의 값 조합을 비교합니다.",
      "answerHtml": "<p>맞지 않습니다. 키워드를 적은 위치와 관계없이 SELECT 목록 전체의 값 조합을 비교합니다.</p>\n",
      "context": "고객 1의 주문은 101번과 102번, 고객 2의 주문은 103번입니다. 고객 명단을 원할 때와 고객·주문 쌍을 원할 때의 조회 열을 비교합니다. 실행 1 · 고객 번호만 조회 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT DISTINCT customer_id FROM orders ORDER BY customer_id; 실행 2 · 주문 번호까지 조회 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT DISTINCT customer_id, order_id FROM orders ORDER BY customer_id, order_id;",
      "contextHtml": "<p>고객 1의 주문은 101번과 102번, 고객 2의 주문은 103번입니다. 고객 명단을 원할 때와 고객·주문 쌍을 원할 때의 조회 열을 비교합니다.</p>\n<h3>실행 1 · 고객 번호만 조회</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT DISTINCT customer_id FROM orders\nORDER BY customer_id;\n</code></pre>\n<h3>실행 2 · 주문 번호까지 조회</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT DISTINCT customer_id, order_id FROM orders\nORDER BY customer_id, order_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 4
  },
  {
    "code": "E005",
    "topicId": "TH-19",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "두 결과를 붙이면 같은 값은 몇 번 남을까",
    "lead": "왼쪽 결과 안의 중복과 두 결과 사이의 중복을 함께 놓고 UNION을 읽어 봅니다.",
    "cue": "A의 고객 ID는 11,11,22이고 B는 22,33입니다. UNION ALL은 다섯 행을 이어 붙입니다.",
    "selected": true,
    "theoryUrl": "theory/E005.html",
    "labUrl": "lab.html?episode=E005",
    "featured": false,
    "question": {
      "id": "MCQ-E005",
      "givens": "입력은 행사별 고객번호 목록이다. A에는 중복 기록을 허용한다. 두 표 모두 같은 정수형 한 열이며 NULL은 없다. campaign_a.customer_id campaign_b.customer_id 11 22 11 33 22 — —는 오른쪽 표에 세 번째 행이 없다는 표시이며 NULL 데이터가 아니다. -- A SELECT customer_id FROM campaign_a UNION SELECT customer_id FROM campaign_b; -- B: 위 UNION만 UNION ALL로 바꾼다.",
      "givensHtml": "<p>입력은 행사별 고객번호 목록이다. A에는 중복 기록을 허용한다. 두 표 모두 같은 정수형 한 열이며 NULL은 없다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">campaign_a.customer_id</th>\n<th scope=\"col\">campaign_b.customer_id</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n<td>22</td>\n</tr>\n<tr>\n<td>11</td>\n<td>33</td>\n</tr>\n<tr>\n<td>22</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p><code>—</code>는 오른쪽 표에 세 번째 행이 없다는 표시이며 NULL 데이터가 아니다.</p>\n<pre><code class=\"language-sql\">-- A\nSELECT customer_id FROM campaign_a\nUNION\nSELECT customer_id FROM campaign_b;\n-- B: 위 UNION만 UNION ALL로 바꾼다.\n</code></pre>\n",
      "stem": "A와 B의 결과는 각각 몇 행일까? 순서는 묻지 않는다.",
      "choices": [
        {
          "id": "E005-C1",
          "text": "A 3행 · B 3행"
        },
        {
          "id": "E005-C2",
          "text": "A 3행 · B 5행"
        },
        {
          "id": "E005-C3",
          "text": "A 4행 · B 5행"
        },
        {
          "id": "E005-C4",
          "text": "A 5행 · B 5행"
        }
      ],
      "answerId": "E005-C2",
      "reason": "UNION에는 11, 22, 33이 남고, UNION ALL에는 입력의 다섯 행이 남는다.",
      "wrongReasons": [
        {
          "choiceId": "E005-C1",
          "reason": "①은 ALL에서도 중복을 없앤 경우"
        },
        {
          "choiceId": "E005-C3",
          "reason": "③은 두 표 사이의 22만 합치고 A 내부의 11은 두 번 남긴 경우"
        },
        {
          "choiceId": "E005-C4",
          "reason": "④는 UNION도 모두 보존한다고 생각한 경우다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-19-check",
      "prompt": "SELECT x, source처럼 출처까지 출력하면 UNION에서 10이 두 행 남을 수 있을까요?",
      "answer": "그렇습니다. 출처 값이 다르면 전체 열 조합이 다릅니다. 원하는 중복 기준에 맞춰 조회 열을 정해야 합니다.",
      "answerHtml": "<p>그렇습니다. 출처 값이 다르면 전체 열 조합이 다릅니다. 원하는 중복 기준에 맞춰 조회 열을 정해야 합니다.</p>\n",
      "context": "A에는 10이 두 번, B에는 10과 20이 한 번씩 있습니다. A와 B를 합칠 때 입력 행은 모두 네 개입니다. 실행 1 · 전부 이어 붙이기 WITH a (x) AS ( SELECT 10 FROM dual UNION ALL SELECT 10 FROM dual ), b (x) AS ( SELECT 10 FROM dual UNION ALL SELECT 20 FROM dual ) SELECT x FROM a UNION ALL SELECT x FROM b ORDER BY x; 실행 2 · 같은 결과 행 제거 WITH a (x) AS ( SELECT 10 FROM dual UNION ALL SELECT 10 FROM dual ), b (x) AS ( SELECT 10 FROM dual UNION ALL SELECT 20 FROM dual ) SELECT x FROM a UNION SELECT x FROM b ORDER BY x;",
      "contextHtml": "<p>A에는 10이 두 번, B에는 10과 20이 한 번씩 있습니다. A와 B를 합칠 때 입력 행은 모두 네 개입니다.</p>\n<h3>실행 1 · 전부 이어 붙이기</h3>\n<pre><code class=\"language-sql\">WITH a (x) AS (\n    SELECT 10 FROM dual\n    UNION ALL\n    SELECT 10 FROM dual\n),\nb (x) AS (\n    SELECT 10 FROM dual\n    UNION ALL\n    SELECT 20 FROM dual\n)\nSELECT x FROM a\nUNION ALL\nSELECT x FROM b\nORDER BY x;\n</code></pre>\n<h3>실행 2 · 같은 결과 행 제거</h3>\n<pre><code class=\"language-sql\">WITH a (x) AS (\n    SELECT 10 FROM dual\n    UNION ALL\n    SELECT 10 FROM dual\n),\nb (x) AS (\n    SELECT 10 FROM dual\n    UNION ALL\n    SELECT 20 FROM dual\n)\nSELECT x FROM a\nUNION\nSELECT x FROM b\nORDER BY x;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "The-UNION-ALL-INTERSECT-MINUS-Operators",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/The-UNION-ALL-INTERSECT-MINUS-Operators.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 4
  },
  {
    "code": "E003",
    "topicId": "TH-17",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "행을 거를까 합계를 거를까",
    "lead": "20원 넘는 주문을 찾는 조건과 주문 합계가 20원을 넘는 고객을 찾는 조건은 계산 대상부터 다릅니다.",
    "cue": "11번 고객의 두 주문은 8과 7입니다. 각 주문은 15보다 작지만 고객별 합계는 15가 됩니다.",
    "selected": true,
    "theoryUrl": "theory/E003.html",
    "labUrl": "lab.html?episode=E003",
    "featured": false,
    "question": {
      "id": "MCQ-E003",
      "givens": "입력 orders는 주문 한 건당 한 행이며 금액 단위는 천원이다. 금액에 NULL은 없다. order_id customer_id amount 501 11 8 502 11 7 503 22 12 SELECT customer_id FROM orders GROUP BY customer_id HAVING SUM(amount) >= 15;",
      "givensHtml": "<p>입력 <code>orders</code>는 주문 한 건당 한 행이며 금액 단위는 천원이다. 금액에 NULL은 없다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">order_id</th>\n<th scope=\"col\">customer_id</th>\n<th scope=\"col\">amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>501</td>\n<td>11</td>\n<td>8</td>\n</tr>\n<tr>\n<td>502</td>\n<td>11</td>\n<td>7</td>\n</tr>\n<tr>\n<td>503</td>\n<td>22</td>\n<td>12</td>\n</tr>\n</tbody>\n</table></div>\n<pre><code class=\"language-sql\">SELECT customer_id FROM orders\nGROUP BY customer_id\nHAVING SUM(amount) &gt;= 15;\n</code></pre>\n",
      "stem": "조회되는 고객번호는 무엇일까?",
      "choices": [
        {
          "id": "E003-C1",
          "text": "11만"
        },
        {
          "id": "E003-C2",
          "text": "22만"
        },
        {
          "id": "E003-C3",
          "text": "11과 22"
        },
        {
          "id": "E003-C4",
          "text": "없음"
        }
      ],
      "answerId": "E003-C1",
      "reason": "고객 11의 합계는 8+7=15, 고객 22는 12다.",
      "wrongReasons": [
        {
          "choiceId": "E003-C2",
          "reason": "②는 합계 대신 가장 큰 개별 주문을 고른 경우"
        },
        {
          "choiceId": "E003-C3",
          "reason": "③은 고객을 묶기만 하고 조건을 적용하지 않은 경우"
        },
        {
          "choiceId": "E003-C4",
          "reason": "④는 개별 주문이 모두 15 미만이므로 탈락시킨 경우다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-17-check",
      "prompt": "“20원 초과 주문만 합쳐서 그 합계가 35원 이상인 고객”은 어느 조건을 쓸까요?",
      "answer": "WHERE amount > 20과 HAVING SUM(amount) >= 35를 함께 씁니다. 이 자료에서는 고객 1의 남은 합계도 30원이어서 결과는 0행입니다.",
      "answerHtml": "<p>WHERE amount &gt; 20과 HAVING SUM(amount) &gt;= 35를 함께 씁니다. 이 자료에서는 고객 1의 남은 합계도 30원이어서 결과는 0행입니다.</p>\n",
      "context": "고객 1은 10원과 30원, 고객 2는 25원을 주문했습니다. 작은 주문을 먼저 빼고 합칠지, 모든 주문을 합친 뒤 고객을 고를지 비교합니다. 실행 1 · 주문 행의 금액 조건 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 30 FROM dual UNION ALL SELECT 103, 2, 25 FROM dual ) SELECT customer_id, SUM(amount) AS total FROM orders WHERE amount > 20 GROUP BY customer_id ORDER BY customer_id; 실행 2 · 고객별 합계 조건 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 30 FROM dual UNION ALL SELECT 103, 2, 25 FROM dual ) SELECT customer_id, SUM(amount) AS total FROM orders GROUP BY customer_id HAVING SUM(amount) > 20 ORDER BY customer_id;",
      "contextHtml": "<p>고객 1은 10원과 30원, 고객 2는 25원을 주문했습니다. 작은 주문을 먼저 빼고 합칠지, 모든 주문을 합친 뒤 고객을 고를지 비교합니다.</p>\n<h3>실행 1 · 주문 행의 금액 조건</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 30 FROM dual\n    UNION ALL\n    SELECT 103, 2, 25 FROM dual\n)\nSELECT customer_id, SUM(amount) AS total\nFROM orders WHERE amount &gt; 20\nGROUP BY customer_id ORDER BY customer_id;\n</code></pre>\n<h3>실행 2 · 고객별 합계 조건</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 30 FROM dual\n    UNION ALL\n    SELECT 103, 2, 25 FROM dual\n)\nSELECT customer_id, SUM(amount) AS total\nFROM orders GROUP BY customer_id\nHAVING SUM(amount) &gt; 20\nORDER BY customer_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Aggregate-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      }
    ],
    "variantCount": 4
  },
  {
    "code": "E018",
    "topicId": "TH-14",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "SELECT NULL인데 EXISTS는 왜 참일까",
    "lead": "EXISTS가 묻는 것은 그 칸의 값일까요, 아니면 그 칸을 담은 행이 있느냐일까요?",
    "cue": "EXISTS는 서브쿼리 결과에 행이 있는지 검사합니다. 행의 선택 값이 NULL이어도 행이 존재할 수 있습니다.",
    "selected": true,
    "theoryUrl": "theory/E018.html",
    "labUrl": "lab.html?episode=E018",
    "featured": false,
    "question": {
      "id": "MCQ-E018",
      "givens": "고객 표 customers에는 11·22·33이 각각 한 행씩 있다. 주문 표에는 고객11의 주문 두 건과 고객22의 주문 한 건이 있다. 고객 11은 주문 두 건, 고객 22는 한 건, 고객 33은 주문이 없다. SELECT c.customer_id FROM customers c WHERE EXISTS ( SELECT NULL FROM orders o WHERE o.customer_id = c.customer_id );",
      "givensHtml": "<p>고객 표 <code>customers</code>에는 11·22·33이 각각 한 행씩 있다. 주문 표에는 고객11의 주문 두 건과 고객22의 주문 한 건이 있다. 고객 11은 주문 두 건, 고객 22는 한 건, 고객 33은 주문이 없다.</p>\n<pre><code class=\"language-sql\">SELECT c.customer_id FROM customers c\nWHERE EXISTS (\n  SELECT NULL FROM orders o\n  WHERE o.customer_id = c.customer_id\n);\n</code></pre>\n",
      "stem": "조회되는 고객은 몇 명일까?",
      "choices": [
        {
          "id": "E018-C1",
          "text": "0명"
        },
        {
          "id": "E018-C2",
          "text": "1명"
        },
        {
          "id": "E018-C3",
          "text": "2명"
        },
        {
          "id": "E018-C4",
          "text": "3명"
        }
      ],
      "answerId": "E018-C3",
      "reason": "고객 11과 22에는 일치하는 주문 행이 있다. SELECT 목록이 NULL이어도 해당 행이 사라지는 것은 아니다.",
      "wrongReasons": [
        {
          "choiceId": "E018-C1",
          "reason": "①은 반환 값 NULL을 0행으로 오해한 경우"
        },
        {
          "choiceId": "E018-C2",
          "reason": "②는 주문이 두 건 이상인 고객만 남긴다고 읽은 경우"
        },
        {
          "choiceId": "E018-C4",
          "reason": "④는 상관 조건을 놓쳐 전체에 주문이 있으면 고객 33까지 남긴다고 판단한 경우다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-14-check",
      "prompt": "서브쿼리에 WHERE 1 = 0을 추가하면 SELECT 1로 바꿔도 EXISTS가 참일까요?",
      "answer": "거짓입니다. 출력하려는 상수와 관계없이 조건을 통과한 행이 0개이기 때문입니다.",
      "answerHtml": "<p>거짓입니다. 출력하려는 상수와 관계없이 조건을 통과한 행이 0개이기 때문입니다.</p>\n",
      "context": "고객별로 주문이 있는지만 알고 싶습니다. 주문 금액이나 주문 번호를 보여 줄 필요는 없습니다. 서브쿼리의 SELECT 목록을 NULL로 적고도 고객을 찾을 수 있는지 살펴봅니다. 실행 1 · 고객과 연결되는 주문의 존재 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT c.customer_id FROM customers c WHERE EXISTS ( SELECT NULL FROM orders o WHERE o.customer_id = c.customer_id ) ORDER BY c.customer_id; 실행 2 · 연결 조건을 빼면 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders) ORDER BY c.customer_id;",
      "contextHtml": "<p>고객별로 주문이 있는지만 알고 싶습니다. 주문 금액이나 주문 번호를 보여 줄 필요는 없습니다. 서브쿼리의 SELECT 목록을 NULL로 적고도 고객을 찾을 수 있는지 살펴봅니다.</p>\n<h3>실행 1 · 고객과 연결되는 주문의 존재</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT c.customer_id\nFROM customers c\nWHERE EXISTS (\n  SELECT NULL FROM orders o\n  WHERE o.customer_id = c.customer_id\n)\nORDER BY c.customer_id;\n</code></pre>\n<h3>실행 2 · 연결 조건을 빼면</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT c.customer_id\nFROM customers c\nWHERE EXISTS (SELECT NULL FROM orders)\nORDER BY c.customer_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "EXISTS-Condition",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 4
  },
  {
    "code": "E021",
    "topicId": "TH-25",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "순위와 윈도우",
    "title": "동점 다음은 3위일까 4위일까",
    "lead": "등수가 같은 두 사람 다음에 빈 순위를 남길지 결정하면 RANK와 DENSE_RANK가 구분됩니다.",
    "cue": "90점 두 명이 공동 1위입니다. RANK는 그 다음 고객 33에게 3위를, DENSE_RANK는 2위를 부여합니다.",
    "selected": true,
    "theoryUrl": "theory/E021.html",
    "labUrl": "lab.html?episode=E021",
    "featured": false,
    "question": {
      "id": "MCQ-E021",
      "givens": "입력 scores는 고객 한 명당 한 행이며 NULL은 없다. 순위의 기준은 점수 내림차순 한 열뿐이다. customer_id score 11 90 22 90 33 80 44 70 SELECT customer_id, RANK() OVER (ORDER BY score DESC) AS a, DENSE_RANK() OVER (ORDER BY score DESC) AS b FROM scores;",
      "givensHtml": "<p>입력 <code>scores</code>는 고객 한 명당 한 행이며 NULL은 없다. 순위의 기준은 <strong>점수 내림차순 한 열뿐</strong>이다.</p>\n<div aria-label=\"가로로 스크롤할 수 있는 예제 표\" class=\"reader-table-wrap\" role=\"region\" tabindex=\"0\"><table>\n<thead>\n<tr>\n<th scope=\"col\">customer_id</th>\n<th scope=\"col\">score</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>11</td>\n<td>90</td>\n</tr>\n<tr>\n<td>22</td>\n<td>90</td>\n</tr>\n<tr>\n<td>33</td>\n<td>80</td>\n</tr>\n<tr>\n<td>44</td>\n<td>70</td>\n</tr>\n</tbody>\n</table></div>\n<pre><code class=\"language-sql\">SELECT customer_id,\n  RANK() OVER (ORDER BY score DESC) AS a,\n  DENSE_RANK() OVER (ORDER BY score DESC) AS b\nFROM scores;\n</code></pre>\n",
      "stem": "고객 33의 A와 B는 각각 몇 위일까?",
      "choices": [
        {
          "id": "E021-C1",
          "text": "A 2위 · B 2위"
        },
        {
          "id": "E021-C2",
          "text": "A 3위 · B 3위"
        },
        {
          "id": "E021-C3",
          "text": "A 2위 · B 3위"
        },
        {
          "id": "E021-C4",
          "text": "A 3위 · B 2위"
        }
      ],
      "answerId": "E021-C4",
      "reason": "90점 두 명이 공동 1위이므로 RANK에서는 80점이 3위, DENSE_RANK에서는 2위다.",
      "wrongReasons": [
        {
          "choiceId": "E021-C1",
          "reason": "①은 RANK도 순위를 건너뛰지 않는다고 생각한 경우"
        },
        {
          "choiceId": "E021-C2",
          "reason": "②는 두 함수 모두 앞선 사람 수로 판단한 경우"
        },
        {
          "choiceId": "E021-C3",
          "reason": "③은 두 함수의 역할을 뒤집은 경우다."
        }
      ],
      "origin": "자체 교육 문제"
    },
    "recall": {
      "id": "TH-25-check",
      "prompt": "90점이 세 명이라면 80점의 RANK와 DENSE_RANK는 각각 얼마일까요?",
      "answer": "다른 점수가 같다면 RANK는 5, DENSE_RANK는 3입니다. 앞선 사람 수와 앞선 점수 그룹 수가 다릅니다.",
      "answerHtml": "<p>다른 점수가 같다면 RANK는 5, DENSE_RANK는 3입니다. 앞선 사람 수와 앞선 점수 그룹 수가 다릅니다.</p>\n",
      "context": "점수는 100·90·90·80입니다. 90점 두 사람을 같은 순위로 놓은 뒤 80점의 순위를 정해 봅니다. 실행 1 · 같은 점수 기준의 두 순위 WITH scores (student_id, score) AS ( SELECT 1, 100 FROM dual UNION ALL SELECT 2, 90 FROM dual UNION ALL SELECT 3, 90 FROM dual UNION ALL SELECT 4, 80 FROM dual ) SELECT student_id, score, RANK() OVER (ORDER BY score DESC) AS rnk, DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rnk FROM scores ORDER BY student_id; 실행 2 · 3 이하인 순위를 고르면 WITH scores (student_id, score) AS ( SELECT 1, 100 FROM dual UNION ALL SELECT 2, 90 FROM dual UNION ALL SELECT 3, 90 FROM dual UNION ALL SELECT 4, 80 FROM dual ), ranked AS (SELECT student_id, RANK() OVER (ORDER BY score DESC) AS r, DENSE_RANK() OVER (ORDER BY score DESC) AS d FROM scores) SELECT 'DENSE' AS method, student_id FROM ranked WHERE d <= 3 UNION ALL SELECT 'RANK' AS method, student_id FROM ranked WHERE r <= 3 ORDER BY method, student_id;",
      "contextHtml": "<p>점수는 100·90·90·80입니다. 90점 두 사람을 같은 순위로 놓은 뒤 80점의 순위를 정해 봅니다.</p>\n<h3>실행 1 · 같은 점수 기준의 두 순위</h3>\n<pre><code class=\"language-sql\">WITH scores (student_id, score) AS (\n    SELECT 1, 100 FROM dual\n    UNION ALL\n    SELECT 2, 90 FROM dual\n    UNION ALL\n    SELECT 3, 90 FROM dual\n    UNION ALL\n    SELECT 4, 80 FROM dual\n)\nSELECT student_id, score,\n RANK() OVER (ORDER BY score DESC) AS rnk,\n DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rnk\nFROM scores ORDER BY student_id;\n</code></pre>\n<h3>실행 2 · 3 이하인 순위를 고르면</h3>\n<pre><code class=\"language-sql\">WITH scores (student_id, score) AS (\n    SELECT 1, 100 FROM dual\n    UNION ALL\n    SELECT 2, 90 FROM dual\n    UNION ALL\n    SELECT 3, 90 FROM dual\n    UNION ALL\n    SELECT 4, 80 FROM dual\n),\nranked AS (SELECT student_id, RANK() OVER (ORDER BY score DESC) AS r, DENSE_RANK() OVER (ORDER BY score DESC) AS d FROM scores)\nSELECT 'DENSE' AS method, student_id FROM ranked WHERE d &lt;= 3\nUNION ALL\nSELECT 'RANK' AS method, student_id FROM ranked WHERE r &lt;= 3\nORDER BY method, student_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "RANK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/RANK.html"
      },
      {
        "title": "DENSE_RANK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/DENSE_RANK.html"
      },
      {
        "title": "Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ],
    "variantCount": 4
  },
  {
    "code": "TH-05",
    "topicId": "TH-05",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "결과가 없다는 것은 0행일까 NULL 한 칸일까",
    "lead": "조건에 맞는 주문이 없어도 집계 결과 한 행이 나올 수 있습니다. 행의 수와 그 안의 값을 따로 읽어 봅니다.",
    "cue": "조회 대상이 비어도 GROUP BY 없는 전체 집계는 한 행을 반환합니다. COUNT는 0, SUM은 NULL입니다.",
    "selected": true,
    "theoryUrl": "theory/TH-05.html",
    "labUrl": "lab.html?episode=TH-05",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-05-check",
      "prompt": "모든 입력 값이 NULL인 세 행에서 COUNT(*)와 SUM(amount)는 무엇을 반환할까요?",
      "answer": "COUNT(*)는 3, SUM(amount)는 NULL입니다. 행이 없는 경우와 NULL 값인 행이 있는 경우는 다릅니다.",
      "answerHtml": "<p>COUNT(*)는 3, SUM(amount)는 NULL입니다. 행이 없는 경우와 NULL 값인 행이 있는 경우는 다릅니다.</p>\n",
      "context": "10원과 20원짜리 주문만 있습니다. 100원을 넘는 주문을 찾으면 조회 대상은 비어 있습니다. 이제 주문 목록을 보여 달라는 요청과 주문 수·금액 합계를 보여 달라는 요청을 구분해 봅니다. 실행 1 · 주문 목록 조회 WITH orders (order_id, amount) AS ( SELECT 101, 10 FROM dual UNION ALL SELECT 102, 20 FROM dual ) SELECT order_id, amount FROM orders WHERE amount > 100 ORDER BY order_id; 실행 2 · 같은 조건의 전체 집계 WITH orders (order_id, amount) AS ( SELECT 101, 10 FROM dual UNION ALL SELECT 102, 20 FROM dual ) SELECT COUNT(*) AS row_count, SUM(amount) AS total FROM orders WHERE amount > 100; 실행 3 · 집계 행을 HAVING으로 제외 WITH orders (order_id, amount) AS ( SELECT 101, 10 FROM dual UNION ALL SELECT 102, 20 FROM dual ) SELECT COUNT(*) AS row_count, SUM(amount) AS total FROM orders WHERE amount > 100 HAVING COUNT(*) > 0;",
      "contextHtml": "<p>10원과 20원짜리 주문만 있습니다. 100원을 넘는 주문을 찾으면 조회 대상은 비어 있습니다. 이제 주문 목록을 보여 달라는 요청과 주문 수·금액 합계를 보여 달라는 요청을 구분해 봅니다.</p>\n<h3>실행 1 · 주문 목록 조회</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, amount) AS (\n    SELECT 101, 10 FROM dual\n    UNION ALL\n    SELECT 102, 20 FROM dual\n)\nSELECT order_id, amount FROM orders\nWHERE amount &gt; 100\nORDER BY order_id;\n</code></pre>\n<h3>실행 2 · 같은 조건의 전체 집계</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, amount) AS (\n    SELECT 101, 10 FROM dual\n    UNION ALL\n    SELECT 102, 20 FROM dual\n)\nSELECT COUNT(*) AS row_count, SUM(amount) AS total\nFROM orders WHERE amount &gt; 100;\n</code></pre>\n<h3>실행 3 · 집계 행을 HAVING으로 제외</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, amount) AS (\n    SELECT 101, 10 FROM dual\n    UNION ALL\n    SELECT 102, 20 FROM dual\n)\nSELECT COUNT(*) AS row_count, SUM(amount) AS total\nFROM orders WHERE amount &gt; 100\nHAVING COUNT(*) &gt; 0;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Aggregate-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      },
      {
        "title": "COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      },
      {
        "title": "SUM",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SUM.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-15",
    "topicId": "TH-15",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "IN과 EXISTS와 NOT EXISTS는 무엇을 물을까",
    "lead": "값이 목록에 있는지와 연결되는 행이 있는지는 비슷해 보여도 NULL에서 질문이 갈라집니다.",
    "cue": "IN은 값이 목록에 포함되는지, EXISTS는 일치하는 행이 있는지 묻습니다.",
    "selected": true,
    "theoryUrl": "theory/TH-15.html",
    "labUrl": "lab.html?episode=TH-15",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-15-check",
      "prompt": "두 번째 SQL의 안쪽 조회에서 NULL을 제외하면 결과는 무엇일까요?",
      "answer": "바깥 번호가 1·2·3인 이 자료에서는 2와 3이 남습니다. 바깥쪽 NULL을 포함하는 다른 자료까지 같은 결과라고 일반화하지 않습니다.",
      "answerHtml": "<p>바깥 번호가 1·2·3인 이 자료에서는 2와 3이 남습니다. 바깥쪽 NULL을 포함하는 다른 자료까지 같은 결과라고 일반화하지 않습니다.</p>\n",
      "context": "고객 번호는 1·2·3이고 주문에는 고객 1과 고객 번호가 NULL인 행이 있습니다. 주문이 없는 고객을 찾는 두 방법의 차이를 확인해 봅니다. 실행 1 · IN과 EXISTS와 NOT EXISTS 비교 WITH customers (customer_id) AS ( SELECT 1 FROM dual UNION ALL SELECT 2 FROM dual UNION ALL SELECT 3 FROM dual ), orders (customer_id) AS ( SELECT 1 FROM dual UNION ALL SELECT CAST(NULL AS NUMBER) FROM dual ) SELECT c.customer_id, CASE WHEN c.customer_id IN (SELECT customer_id FROM orders) THEN 'Y' ELSE 'N' END AS in_hit, CASE WHEN EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id) THEN 'Y' ELSE 'N' END AS exists_hit, CASE WHEN NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id) THEN 'Y' ELSE 'N' END AS no_match FROM customers c ORDER BY c.customer_id; 실행 2 · NULL이 들어 있는 NOT IN WITH customers (customer_id) AS ( SELECT 1 FROM dual UNION ALL SELECT 2 FROM dual UNION ALL SELECT 3 FROM dual ), orders (customer_id) AS ( SELECT 1 FROM dual UNION ALL SELECT CAST(NULL AS NUMBER) FROM dual ) SELECT c.customer_id FROM customers c WHERE c.customer_id NOT IN (SELECT customer_id FROM orders) ORDER BY c.customer_id;",
      "contextHtml": "<p>고객 번호는 1·2·3이고 주문에는 고객 1과 고객 번호가 NULL인 행이 있습니다. 주문이 없는 고객을 찾는 두 방법의 차이를 확인해 봅니다.</p>\n<h3>실행 1 · IN과 EXISTS와 NOT EXISTS 비교</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id) AS (\n    SELECT 1 FROM dual\n    UNION ALL\n    SELECT 2 FROM dual\n    UNION ALL\n    SELECT 3 FROM dual\n),\norders (customer_id) AS (\n    SELECT 1 FROM dual\n    UNION ALL\n    SELECT CAST(NULL AS NUMBER) FROM dual\n)\nSELECT c.customer_id,\n CASE WHEN c.customer_id IN (SELECT customer_id FROM orders) THEN 'Y' ELSE 'N' END AS in_hit,\n CASE WHEN EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id) THEN 'Y' ELSE 'N' END AS exists_hit,\n CASE WHEN NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id) THEN 'Y' ELSE 'N' END AS no_match\nFROM customers c ORDER BY c.customer_id;\n</code></pre>\n<h3>실행 2 · NULL이 들어 있는 NOT IN</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id) AS (\n    SELECT 1 FROM dual\n    UNION ALL\n    SELECT 2 FROM dual\n    UNION ALL\n    SELECT 3 FROM dual\n),\norders (customer_id) AS (\n    SELECT 1 FROM dual\n    UNION ALL\n    SELECT CAST(NULL AS NUMBER) FROM dual\n)\nSELECT c.customer_id FROM customers c\nWHERE c.customer_id NOT IN (SELECT customer_id FROM orders)\nORDER BY c.customer_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "IN-Condition",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/IN-Condition.html"
      },
      {
        "title": "EXISTS-Condition",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/EXISTS-Condition.html"
      },
      {
        "title": "Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-16",
    "topicId": "TH-16",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "스칼라 서브쿼리가 0행이면 오류일까",
    "lead": "한 값을 놓을 자리에 쓴 서브쿼리가 비었을 때와 너무 많은 행을 반환했을 때는 처리가 다릅니다.",
    "cue": "외부 고객 세 행은 유지됩니다. 내부에서 찾은 한 값이 없으면 그 칸이 NULL입니다.",
    "selected": true,
    "theoryUrl": "theory/TH-16.html",
    "labUrl": "lab.html?episode=TH-16",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-16-check",
      "prompt": "MAX를 쓴 세 번째 예제에서 고객 번호를 3으로 바꾸면 어떤 값이 나올까요?",
      "answer": "NULL입니다. GROUP BY 없는 MAX 집계는 입력이 없어도 NULL을 담은 한 행을 반환하고, 스칼라 서브쿼리는 그 값을 사용합니다.",
      "answerHtml": "<p>NULL입니다. GROUP BY 없는 MAX 집계는 입력이 없어도 NULL을 담은 한 행을 반환하고, 스칼라 서브쿼리는 그 값을 사용합니다.</p>\n",
      "context": "고객에게 최근 주문 금액 한 칸을 붙이려 합니다. 하지만 고객 1에게는 주문 두 건, 고객 3에게는 한 건도 없습니다. 한 칸에 어떤 값을 넣을지 결정하지 않은 상태입니다. 실행 1 · 0행과 1행 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT (SELECT amount FROM orders WHERE order_id = 999) AS missing_value, (SELECT amount FROM orders WHERE order_id = 101) AS one_value FROM dual; 실행 2 · 두 행을 한 칸에 넣기 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT (SELECT amount FROM orders WHERE customer_id = 1) AS amount FROM dual; 실행 3 · 다른 질문으로 명시하기 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT (SELECT MAX(amount) FROM orders WHERE customer_id = 1) AS max_amount FROM dual;",
      "contextHtml": "<p>고객에게 최근 주문 금액 한 칸을 붙이려 합니다. 하지만 고객 1에게는 주문 두 건, 고객 3에게는 한 건도 없습니다. 한 칸에 어떤 값을 넣을지 결정하지 않은 상태입니다.</p>\n<h3>실행 1 · 0행과 1행</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT\n (SELECT amount FROM orders WHERE order_id = 999) AS missing_value,\n (SELECT amount FROM orders WHERE order_id = 101) AS one_value\nFROM dual;\n</code></pre>\n<h3>실행 2 · 두 행을 한 칸에 넣기</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT (SELECT amount FROM orders WHERE customer_id = 1) AS amount\nFROM dual;\n</code></pre>\n<h3>실행 3 · 다른 질문으로 명시하기</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT (SELECT MAX(amount) FROM orders WHERE customer_id = 1) AS max_amount\nFROM dual;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Scalar-Subquery-Expressions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Scalar-Subquery-Expressions.html"
      },
      {
        "title": "Aggregate-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-21",
    "topicId": "TH-21",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "SQL 결과 읽기",
    "title": "GROUP BY의 열 순서는 출력 순서일까",
    "lead": "묶을 기준과 보여 줄 순서는 서로 다른 요구입니다. 우연히 정렬된 화면을 보장으로 읽지 않습니다.",
    "cue": "GROUP BY는 열 값의 조합으로 그룹을 만듭니다. 같은 두 열의 나열 순서를 바꾸어도 그룹 조합은 같습니다.",
    "selected": true,
    "theoryUrl": "theory/TH-21.html",
    "labUrl": "lab.html?episode=TH-21",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-21-check",
      "prompt": "GROUP BY dept, channel만으로 부서별 오름차순을 약속할 수 있을까요?",
      "answer": "약속할 수 없습니다. 필요한 출력 키와 동률 처리까지 ORDER BY에 명시해야 합니다.",
      "answerHtml": "<p>약속할 수 없습니다. 필요한 출력 키와 동률 처리까지 ORDER BY에 명시해야 합니다.</p>\n",
      "context": "부서 20의 주문을 먼저 입력하고, 그다음 부서 10의 주문을 입력했습니다. 그룹 집계 화면이 입력 순서나 그룹 열 순서와 항상 같을지 생각해 봅니다. 실행 1 · 정렬을 지정하지 않은 그룹 WITH sales (dept, channel, amount) AS ( SELECT 20, 'WEB', 5 FROM dual UNION ALL SELECT 10, 'SHOP', 8 FROM dual UNION ALL SELECT 10, 'WEB', 3 FROM dual ) SELECT dept, channel, SUM(amount) AS total FROM sales GROUP BY dept, channel; 실행 2 · 출력 순서를 따로 지정 WITH sales (dept, channel, amount) AS ( SELECT 20, 'WEB', 5 FROM dual UNION ALL SELECT 10, 'SHOP', 8 FROM dual UNION ALL SELECT 10, 'WEB', 3 FROM dual ) SELECT dept, channel, SUM(amount) AS total FROM sales GROUP BY channel, dept ORDER BY dept DESC, channel;",
      "contextHtml": "<p>부서 20의 주문을 먼저 입력하고, 그다음 부서 10의 주문을 입력했습니다. 그룹 집계 화면이 입력 순서나 그룹 열 순서와 항상 같을지 생각해 봅니다.</p>\n<h3>실행 1 · 정렬을 지정하지 않은 그룹</h3>\n<pre><code class=\"language-sql\">WITH sales (dept, channel, amount) AS (\n    SELECT 20, 'WEB', 5 FROM dual\n    UNION ALL\n    SELECT 10, 'SHOP', 8 FROM dual\n    UNION ALL\n    SELECT 10, 'WEB', 3 FROM dual\n)\nSELECT dept, channel, SUM(amount) AS total\nFROM sales GROUP BY dept, channel;\n</code></pre>\n<h3>실행 2 · 출력 순서를 따로 지정</h3>\n<pre><code class=\"language-sql\">WITH sales (dept, channel, amount) AS (\n    SELECT 20, 'WEB', 5 FROM dual\n    UNION ALL\n    SELECT 10, 'SHOP', 8 FROM dual\n    UNION ALL\n    SELECT 10, 'WEB', 3 FROM dual\n)\nSELECT dept, channel, SUM(amount) AS total\nFROM sales GROUP BY channel, dept\nORDER BY dept DESC, channel;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "Joins",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Joins.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-22",
    "topicId": "TH-22",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "집계와 소계",
    "title": "ROLLUP과 CUBE는 몇 종류의 소계를 만들까",
    "lead": "그룹 조합의 수와 실제 결과 행 수를 구분하면 소계 문제를 더 정확히 읽을 수 있습니다.",
    "cue": "상세·지역 소계·전체 합계는 ROLLUP의 그룹 구성을 나타냅니다. CUBE 구성에는 상품 소계도 더해집니다.",
    "selected": true,
    "theoryUrl": "theory/TH-22.html",
    "labUrl": "lab.html?episode=TH-22",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-22-check",
      "prompt": "GROUPING SETS ((dept), (job))에는 전체 합계가 포함될까요?",
      "answer": "아닙니다. 전체 합계를 원하면 빈 그룹 ()를 따로 적습니다. 같은 조합을 중복 나열하면 같은 결과 행이 반복될 수도 있습니다.",
      "answerHtml": "<p>아닙니다. 전체 합계를 원하면 빈 그룹 ()를 따로 적습니다. 같은 조합을 중복 나열하면 같은 결과 행이 반복될 수도 있습니다.</p>\n",
      "context": "부서 10에는 직무 1·2의 매출이 있고 부서 20에는 직무 1만 있습니다. 상세 세 행에서 부서별 소계, 직무별 소계, 전체 합계를 구해 봅니다. 실행 1 · 순서가 있는 소계 ROLLUP WITH sales (dept, job, amount) AS ( SELECT 10, 1, 10 FROM dual UNION ALL SELECT 10, 2, 20 FROM dual UNION ALL SELECT 20, 1, 5 FROM dual ) SELECT dept, job, SUM(amount) AS total, GROUPING(dept) AS gd, GROUPING(job) AS gj FROM sales GROUP BY ROLLUP(dept, job) ORDER BY GROUPING(dept), dept, GROUPING(job), job; 실행 2 · 모든 조합 CUBE WITH sales (dept, job, amount) AS ( SELECT 10, 1, 10 FROM dual UNION ALL SELECT 10, 2, 20 FROM dual UNION ALL SELECT 20, 1, 5 FROM dual ) SELECT dept, job, SUM(amount) AS total, GROUPING(dept) AS gd, GROUPING(job) AS gj FROM sales GROUP BY CUBE(dept, job) ORDER BY GROUPING(dept), dept, GROUPING(job), job; 실행 3 · 필요한 조합만 지정 WITH sales (dept, job, amount) AS ( SELECT 10, 1, 10 FROM dual UNION ALL SELECT 10, 2, 20 FROM dual UNION ALL SELECT 20, 1, 5 FROM dual ) SELECT dept, SUM(amount) AS total, GROUPING(dept) AS gd FROM sales GROUP BY GROUPING SETS ((dept), ()) ORDER BY GROUPING(dept), dept;",
      "contextHtml": "<p>부서 10에는 직무 1·2의 매출이 있고 부서 20에는 직무 1만 있습니다. 상세 세 행에서 부서별 소계, 직무별 소계, 전체 합계를 구해 봅니다.</p>\n<h3>실행 1 · 순서가 있는 소계 ROLLUP</h3>\n<pre><code class=\"language-sql\">WITH sales (dept, job, amount) AS (\n    SELECT 10, 1, 10 FROM dual\n    UNION ALL\n    SELECT 10, 2, 20 FROM dual\n    UNION ALL\n    SELECT 20, 1, 5 FROM dual\n)\nSELECT dept, job, SUM(amount) AS total,\n       GROUPING(dept) AS gd, GROUPING(job) AS gj\nFROM sales GROUP BY ROLLUP(dept, job)\nORDER BY GROUPING(dept), dept, GROUPING(job), job;\n</code></pre>\n<h3>실행 2 · 모든 조합 CUBE</h3>\n<pre><code class=\"language-sql\">WITH sales (dept, job, amount) AS (\n    SELECT 10, 1, 10 FROM dual\n    UNION ALL\n    SELECT 10, 2, 20 FROM dual\n    UNION ALL\n    SELECT 20, 1, 5 FROM dual\n)\nSELECT dept, job, SUM(amount) AS total,\n       GROUPING(dept) AS gd, GROUPING(job) AS gj\nFROM sales GROUP BY CUBE(dept, job)\nORDER BY GROUPING(dept), dept, GROUPING(job), job;\n</code></pre>\n<h3>실행 3 · 필요한 조합만 지정</h3>\n<pre><code class=\"language-sql\">WITH sales (dept, job, amount) AS (\n    SELECT 10, 1, 10 FROM dual\n    UNION ALL\n    SELECT 10, 2, 20 FROM dual\n    UNION ALL\n    SELECT 20, 1, 5 FROM dual\n)\nSELECT dept, SUM(amount) AS total, GROUPING(dept) AS gd\nFROM sales GROUP BY GROUPING SETS ((dept), ())\nORDER BY GROUPING(dept), dept;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      },
      {
        "title": "GROUPING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/GROUPING.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-23",
    "topicId": "TH-23",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "집계와 소계",
    "title": "소계의 NULL과 원래 NULL은 어떻게 구분할까",
    "lead": "화면의 두 NULL이 서로 다른 의미를 가질 수 있습니다. 값만 바꾸어 표시하기 전에 GROUPING을 확인합니다.",
    "cue": "상세 그룹의 NULL과 집계 과정에서 붙인 NULL은 같은 표시라도 생긴 이유가 다릅니다.",
    "selected": true,
    "theoryUrl": "theory/TH-23.html",
    "labUrl": "lab.html?episode=TH-23",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-23-check",
      "prompt": "GROUPING(dept)=0이면 dept 값이 반드시 NULL이 아닐까요?",
      "answer": "아닙니다. 원본 NULL로 구성된 상세 그룹도 0입니다. GROUPING은 NULL 여부 검사가 아니라 소계 자리인지의 표시입니다.",
      "answerHtml": "<p>아닙니다. 원본 NULL로 구성된 상세 그룹도 0입니다. GROUPING은 NULL 여부 검사가 아니라 소계 자리인지의 표시입니다.</p>\n",
      "context": "부서 10의 매출은 10원이고 부서 번호가 없는 매출은 20원입니다. 부서별 결과와 전체 합계를 함께 출력하면 부서가 NULL인 행이 두 개 생깁니다. 실행 1 · GROUPING으로 구분 WITH sales (dept, amount) AS ( SELECT 10, 10 FROM dual UNION ALL SELECT CAST(NULL AS NUMBER), 20 FROM dual ) SELECT dept, SUM(amount) AS total, GROUPING(dept) AS g, CASE WHEN GROUPING(dept)=1 THEN 'ALL' WHEN dept IS NULL THEN 'MISSING' ELSE 'DETAIL' END AS row_kind FROM sales GROUP BY ROLLUP(dept) ORDER BY GROUPING(dept), dept NULLS FIRST; 실행 2 · NVL로만 바꾸어 표시 WITH sales (dept, amount) AS ( SELECT 10, 10 FROM dual UNION ALL SELECT CAST(NULL AS NUMBER), 20 FROM dual ) SELECT NVL(dept, -1) AS displayed_dept, SUM(amount) AS total FROM sales GROUP BY ROLLUP(dept) ORDER BY GROUPING(dept), dept NULLS FIRST;",
      "contextHtml": "<p>부서 10의 매출은 10원이고 부서 번호가 없는 매출은 20원입니다. 부서별 결과와 전체 합계를 함께 출력하면 부서가 NULL인 행이 두 개 생깁니다.</p>\n<h3>실행 1 · GROUPING으로 구분</h3>\n<pre><code class=\"language-sql\">WITH sales (dept, amount) AS (\n    SELECT 10, 10 FROM dual\n    UNION ALL\n    SELECT CAST(NULL AS NUMBER), 20 FROM dual\n)\nSELECT dept, SUM(amount) AS total, GROUPING(dept) AS g,\n CASE WHEN GROUPING(dept)=1 THEN 'ALL'\n      WHEN dept IS NULL THEN 'MISSING'\n      ELSE 'DETAIL' END AS row_kind\nFROM sales GROUP BY ROLLUP(dept)\nORDER BY GROUPING(dept), dept NULLS FIRST;\n</code></pre>\n<h3>실행 2 · NVL로만 바꾸어 표시</h3>\n<pre><code class=\"language-sql\">WITH sales (dept, amount) AS (\n    SELECT 10, 10 FROM dual\n    UNION ALL\n    SELECT CAST(NULL AS NUMBER), 20 FROM dual\n)\nSELECT NVL(dept, -1) AS displayed_dept, SUM(amount) AS total\nFROM sales GROUP BY ROLLUP(dept)\nORDER BY GROUPING(dept), dept NULLS FIRST;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "GROUPING",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/GROUPING.html"
      },
      {
        "title": "SELECT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-28",
    "topicId": "TH-28",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "순위와 윈도우",
    "title": "PARTITION BY는 왜 주문 행을 줄이지 않을까",
    "lead": "고객별 합계를 구하면서 주문 한 건 한 건도 보고 싶다면 두 종류의 집계를 구분해야 합니다.",
    "cue": "분석 함수는 각 주문 행에 고객별 합계를 붙입니다.",
    "selected": true,
    "theoryUrl": "theory/TH-28.html",
    "labUrl": "lab.html?episode=TH-28",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-28-check",
      "prompt": "고객별 주문 금액 비중을 구하려면 두 번째 결과의 무엇을 나눌까요?",
      "answer": "각 주문의 amount를 customer_total로 나눕니다. 합계가 0 또는 NULL인 경우의 처리도 업무 규칙에 따라 정해야 합니다.",
      "answerHtml": "<p>각 주문의 amount를 customer_total로 나눕니다. 합계가 0 또는 NULL인 경우의 처리도 업무 규칙에 따라 정해야 합니다.</p>\n",
      "context": "고객 1은 주문 두 건, 고객 2는 한 건입니다. 고객 합계만 보고할 때는 두 행, 주문별로 고객 합계를 곁들일 때는 세 행이 필요합니다. 실행 1 · 고객마다 한 행 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT customer_id, SUM(amount) AS customer_total FROM orders GROUP BY customer_id ORDER BY customer_id; 실행 2 · 주문마다 합계 붙이기 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT order_id, customer_id, amount, SUM(amount) OVER (PARTITION BY customer_id) AS customer_total FROM orders ORDER BY order_id;",
      "contextHtml": "<p>고객 1은 주문 두 건, 고객 2는 한 건입니다. 고객 합계만 보고할 때는 두 행, 주문별로 고객 합계를 곁들일 때는 세 행이 필요합니다.</p>\n<h3>실행 1 · 고객마다 한 행</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT customer_id, SUM(amount) AS customer_total\nFROM orders GROUP BY customer_id ORDER BY customer_id;\n</code></pre>\n<h3>실행 2 · 주문마다 합계 붙이기</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT order_id, customer_id, amount,\n SUM(amount) OVER (PARTITION BY customer_id) AS customer_total\nFROM orders ORDER BY order_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      },
      {
        "title": "Aggregate-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Aggregate-Functions.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-31",
    "topicId": "TH-31",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "순위와 윈도우",
    "title": "이전 행은 저장 순서일까 정렬 순서일까",
    "lead": "LAG와 LEAD의 옆 행은 파티션과 정렬을 정한 뒤에 결정됩니다. 앞 행이 없는 것과 앞 행의 값이 NULL인 것도 다릅니다.",
    "cue": "LAG와 LEAD는 OVER 안에서 정한 순서를 기준으로 앞뒤 값을 읽습니다.",
    "selected": true,
    "theoryUrl": "theory/TH-31.html",
    "labUrl": "lab.html?episode=TH-31",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-31-check",
      "prompt": "WHERE amount IS NOT NULL로 먼저 걸러낸 뒤 실행 1의 LAG를 계산하면 105번의 이전 값은 무엇일까요?",
      "answer": "10입니다. NULL 주문 행이 분석 함수 계산 전에 제외되므로 고객 1에게 남은 순서가 101→105가 됩니다.",
      "answerHtml": "<p>10입니다. NULL 주문 행이 분석 함수 계산 전에 제외되므로 고객 1에게 남은 순서가 101→105가 됩니다.</p>\n",
      "context": "두 고객의 주문 번호가 번갈아 나옵니다. 고객 1의 가운데 주문 금액은 NULL입니다. 고객별 이웃 주문과 전체 이웃 주문을 비교해 봅니다. 실행 1 · 고객별 앞뒤 주문 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 2, 5 FROM dual UNION ALL SELECT 103, 1, CAST(NULL AS NUMBER) FROM dual UNION ALL SELECT 104, 2, 8 FROM dual UNION ALL SELECT 105, 1, 30 FROM dual ) SELECT customer_id, order_id, amount, LAG(amount, 1, -1) OVER (PARTITION BY customer_id ORDER BY order_id) AS prev_amount, LEAD(amount, 1, -1) OVER (PARTITION BY customer_id ORDER BY order_id) AS next_amount FROM orders ORDER BY customer_id, order_id; 실행 2 · 파티션을 없애면 WITH orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 2, 5 FROM dual UNION ALL SELECT 103, 1, CAST(NULL AS NUMBER) FROM dual UNION ALL SELECT 104, 2, 8 FROM dual UNION ALL SELECT 105, 1, 30 FROM dual ) SELECT order_id, customer_id, amount, LAG(amount, 1, -1) OVER (ORDER BY order_id) AS prev_amount FROM orders ORDER BY order_id;",
      "contextHtml": "<p>두 고객의 주문 번호가 번갈아 나옵니다. 고객 1의 가운데 주문 금액은 NULL입니다. 고객별 이웃 주문과 전체 이웃 주문을 비교해 봅니다.</p>\n<h3>실행 1 · 고객별 앞뒤 주문</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 2, 5 FROM dual\n    UNION ALL\n    SELECT 103, 1, CAST(NULL AS NUMBER) FROM dual\n    UNION ALL\n    SELECT 104, 2, 8 FROM dual\n    UNION ALL\n    SELECT 105, 1, 30 FROM dual\n)\nSELECT customer_id, order_id, amount,\n LAG(amount, 1, -1) OVER (PARTITION BY customer_id ORDER BY order_id) AS prev_amount,\n LEAD(amount, 1, -1) OVER (PARTITION BY customer_id ORDER BY order_id) AS next_amount\nFROM orders ORDER BY customer_id, order_id;\n</code></pre>\n<h3>실행 2 · 파티션을 없애면</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 2, 5 FROM dual\n    UNION ALL\n    SELECT 103, 1, CAST(NULL AS NUMBER) FROM dual\n    UNION ALL\n    SELECT 104, 2, 8 FROM dual\n    UNION ALL\n    SELECT 105, 1, 30 FROM dual\n)\nSELECT order_id, customer_id, amount,\n LAG(amount, 1, -1) OVER (ORDER BY order_id) AS prev_amount\nFROM orders ORDER BY order_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "LAG",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LAG.html"
      },
      {
        "title": "LEAD",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LEAD.html"
      },
      {
        "title": "Analytic-Functions",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-32",
    "topicId": "TH-32",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "순위와 윈도우",
    "title": "CONNECT BY PRIOR는 어느 쪽 값을 따라갈까",
    "lead": "부모·자식이라는 말만 외우기보다 PRIOR 바로 뒤 표현식이 어느 행에서 읽히는지 확인합니다.",
    "cue": "자식의 parent_id가 부모의 node_id와 일치하는 쌍을 조회합니다.",
    "selected": true,
    "theoryUrl": "theory/TH-32.html",
    "labUrl": "lab.html?episode=TH-32",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-32-check",
      "prompt": "ROOT에서 내려가는 조건에서 PRIOR를 manager_id 쪽으로 옮기기만 하면 같은 하위 조직을 볼 수 있을까요?",
      "answer": "아닙니다. 연결 방향이 달라집니다. START WITH와 부모 행에서 가져올 열을 한 쌍으로 읽어야 합니다.",
      "answerHtml": "<p>아닙니다. 연결 방향이 달라집니다. START WITH와 부모 행에서 가져올 열을 한 쌍으로 읽어야 합니다.</p>\n",
      "context": "ROOT 아래에 MGR과 SUB가 있고 MGR 아래에 STAFF가 있습니다. ROOT에서 아래로 찾는 것과 STAFF에서 위로 찾는 것을 같은 데이터로 비교합니다. 실행 1 · ROOT에서 아래로 WITH employees (employee_id, manager_id, employee_name) AS ( SELECT 1, CAST(NULL AS NUMBER), 'ROOT' FROM dual UNION ALL SELECT 2, 1, 'MGR' FROM dual UNION ALL SELECT 3, 2, 'STAFF' FROM dual UNION ALL SELECT 4, 1, 'SUB' FROM dual ) SELECT LEVEL AS depth, employee_id, manager_id FROM employees START WITH employee_id = 1 CONNECT BY PRIOR employee_id = manager_id ORDER SIBLINGS BY employee_id; 실행 2 · STAFF에서 위로 WITH employees (employee_id, manager_id, employee_name) AS ( SELECT 1, CAST(NULL AS NUMBER), 'ROOT' FROM dual UNION ALL SELECT 2, 1, 'MGR' FROM dual UNION ALL SELECT 3, 2, 'STAFF' FROM dual UNION ALL SELECT 4, 1, 'SUB' FROM dual ) SELECT LEVEL AS depth, employee_id, manager_id FROM employees START WITH employee_id = 3 CONNECT BY PRIOR manager_id = employee_id ORDER SIBLINGS BY employee_id;",
      "contextHtml": "<p>ROOT 아래에 MGR과 SUB가 있고 MGR 아래에 STAFF가 있습니다. ROOT에서 아래로 찾는 것과 STAFF에서 위로 찾는 것을 같은 데이터로 비교합니다.</p>\n<h3>실행 1 · ROOT에서 아래로</h3>\n<pre><code class=\"language-sql\">WITH employees (employee_id, manager_id, employee_name) AS (\n    SELECT 1, CAST(NULL AS NUMBER), 'ROOT' FROM dual\n    UNION ALL\n    SELECT 2, 1, 'MGR' FROM dual\n    UNION ALL\n    SELECT 3, 2, 'STAFF' FROM dual\n    UNION ALL\n    SELECT 4, 1, 'SUB' FROM dual\n)\nSELECT LEVEL AS depth, employee_id, manager_id\nFROM employees\nSTART WITH employee_id = 1\nCONNECT BY PRIOR employee_id = manager_id\nORDER SIBLINGS BY employee_id;\n</code></pre>\n<h3>실행 2 · STAFF에서 위로</h3>\n<pre><code class=\"language-sql\">WITH employees (employee_id, manager_id, employee_name) AS (\n    SELECT 1, CAST(NULL AS NUMBER), 'ROOT' FROM dual\n    UNION ALL\n    SELECT 2, 1, 'MGR' FROM dual\n    UNION ALL\n    SELECT 3, 2, 'STAFF' FROM dual\n    UNION ALL\n    SELECT 4, 1, 'SUB' FROM dual\n)\nSELECT LEVEL AS depth, employee_id, manager_id\nFROM employees\nSTART WITH employee_id = 3\nCONNECT BY PRIOR manager_id = employee_id\nORDER SIBLINGS BY employee_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Hierarchical-Queries",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Hierarchical-Queries.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-33",
    "topicId": "TH-33",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "고객과 고객 한 명과 고객 이름은 어떻게 다를까",
    "lead": "같은 이름의 고객 둘을 놓으면 엔터티·인스턴스·속성의 역할이 더 분명해집니다.",
    "cue": "고객은 엔터티 종류, 고객 표의 각 행은 인스턴스, ID와 이름은 속성에 대응합니다.",
    "selected": true,
    "theoryUrl": "theory/TH-33.html",
    "labUrl": "lab.html?episode=TH-33",
    "featured": true,
    "question": null,
    "recall": {
      "id": "TH-33-check",
      "prompt": "MIN을 M으로 바꾸면 고객 인스턴스가 새로 생긴 것일까요?",
      "answer": "이 업무 규칙에서는 아닙니다. 같은 고객 번호의 이름 속성이 바뀐 것입니다. 무엇을 동일한 개체로 볼지 정한 식별 기준이 필요합니다.",
      "answerHtml": "<p>이 업무 규칙에서는 아닙니다. 같은 고객 번호의 이름 속성이 바뀐 것입니다. 무엇을 동일한 개체로 볼지 정한 식별 기준이 필요합니다.</p>\n",
      "context": "MIN이라는 이름을 가진 고객이 두 명 있습니다. 이름이 같다는 사실만으로 같은 사람이라고 묶으면 고객 두 명의 기록이 하나로 줄어듭니다. 실행 1 · 개별 고객의 행 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'MIN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ) SELECT customer_id, customer_name FROM customers ORDER BY customer_id; 실행 2 · 고객 수와 이름 종류 수 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'MIN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ) SELECT COUNT(*) AS customer_rows, COUNT(DISTINCT customer_name) AS name_kinds FROM customers;",
      "contextHtml": "<p>MIN이라는 이름을 가진 고객이 두 명 있습니다. 이름이 같다는 사실만으로 같은 사람이라고 묶으면 고객 두 명의 기록이 하나로 줄어듭니다.</p>\n<h3>실행 1 · 개별 고객의 행</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'MIN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n)\nSELECT customer_id, customer_name FROM customers\nORDER BY customer_id;\n</code></pre>\n<h3>실행 2 · 고객 수와 이름 종류 수</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'MIN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n)\nSELECT COUNT(*) AS customer_rows,\n COUNT(DISTINCT customer_name) AS name_kinds FROM customers;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-34",
    "topicId": "TH-34",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "입력한 수량과 계산한 금액은 같은 속성일까",
    "lead": "업무에서 받은 값, 설계하며 만든 값, 다른 값으로 계산한 값을 생성 근거로 나눠 봅니다.",
    "cue": "수량과 단가를 입력 값으로 정하고 금액은 두 값의 곱으로 계산합니다.",
    "selected": true,
    "theoryUrl": "theory/TH-34.html",
    "labUrl": "lab.html?episode=TH-34",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-34-check",
      "prompt": "계산한 금액을 열로 저장하면 기본 속성으로 바뀔까요?",
      "answer": "저장한다는 이유만으로 바뀌지 않습니다. 어떤 사실에서 어떤 규칙으로 생성되는지가 분류의 기준입니다.",
      "answerHtml": "<p>저장한다는 이유만으로 바뀌지 않습니다. 어떤 사실에서 어떤 규칙으로 생성되는지가 분류의 기준입니다.</p>\n",
      "context": "할인·세금·반올림이 없는 작은 주문 자료입니다. 금액을 계산할 수도 있고 계산 결과를 따로 저장할 수도 있습니다. 둘을 모두 저장했을 때 불일치가 생기는지 확인합니다. 실행 1 · 저장 값과 계산 값 WITH order_lines (order_id, qty, unit_price, saved_total) AS ( SELECT 101, 2, 3000, 6000 FROM dual UNION ALL SELECT 102, 1, 2000, 2000 FROM dual ) SELECT order_id, qty, unit_price, saved_total, qty * unit_price AS calculated_total FROM order_lines ORDER BY order_id; 실행 2 · 한 값만 바뀌면 WITH order_lines (order_id, qty, unit_price, saved_total) AS ( SELECT 101, 2, 3000, 5000 FROM dual UNION ALL SELECT 102, 1, 2000, 2000 FROM dual ) SELECT order_id, saved_total, qty * unit_price AS calculated_total FROM order_lines WHERE saved_total <> qty * unit_price ORDER BY order_id;",
      "contextHtml": "<p>할인·세금·반올림이 없는 작은 주문 자료입니다. 금액을 계산할 수도 있고 계산 결과를 따로 저장할 수도 있습니다. 둘을 모두 저장했을 때 불일치가 생기는지 확인합니다.</p>\n<h3>실행 1 · 저장 값과 계산 값</h3>\n<pre><code class=\"language-sql\">WITH order_lines (order_id, qty, unit_price, saved_total) AS (\n    SELECT 101, 2, 3000, 6000 FROM dual\n    UNION ALL\n    SELECT 102, 1, 2000, 2000 FROM dual\n)\nSELECT order_id, qty, unit_price, saved_total,\n qty * unit_price AS calculated_total\nFROM order_lines ORDER BY order_id;\n</code></pre>\n<h3>실행 2 · 한 값만 바뀌면</h3>\n<pre><code class=\"language-sql\">WITH order_lines (order_id, qty, unit_price, saved_total) AS (\n    SELECT 101, 2, 3000, 5000 FROM dual\n    UNION ALL\n    SELECT 102, 1, 2000, 2000 FROM dual\n)\nSELECT order_id, saved_total, qty * unit_price AS calculated_total\nFROM order_lines WHERE saved_total &lt;&gt; qty * unit_price\nORDER BY order_id;\n</code></pre>\n"
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
    ],
    "variantCount": 2
  },
  {
    "code": "TH-35",
    "topicId": "TH-35",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "유일하기만 하면 모두 후보 키일까",
    "lead": "열을 더 붙이면 구분은 쉬워지지만, 꼭 필요한 열만 남겼는지도 확인해야 합니다.",
    "cue": "학생 ID만으로는 서로 다른 수강을 구분하지 못합니다. 학생·과목 조합에는 원래 중복이 없습니다.",
    "selected": true,
    "theoryUrl": "theory/TH-35.html",
    "labUrl": "lab.html?episode=TH-35",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-35-check",
      "prompt": "두 번호가 후보 키인 이 규칙에서 학생 이름을 추가한 세 열도 후보 키일까요?",
      "answer": "아닙니다. 슈퍼키로는 쓸 수 있지만 이름이 불필요하므로 후보 키의 최소성을 만족하지 않습니다.",
      "answerHtml": "<p>아닙니다. 슈퍼키로는 쓸 수 있지만 이름이 불필요하므로 후보 키의 최소성을 만족하지 않습니다.</p>\n",
      "context": "한 학생은 여러 과목을 수강하고 한 과목에는 여러 학생이 있습니다. 같은 학생이 같은 과목에 두 번 등록하지 않는 업무 규칙을 정합니다. 실행 1 · 한 열만으로 구분되는가 WITH enrollment (student_id, course_id, student_name) AS ( SELECT 1, 10, 'MIN' FROM dual UNION ALL SELECT 1, 20, 'MIN' FROM dual UNION ALL SELECT 2, 10, 'JUN' FROM dual ) SELECT COUNT(*) AS rows_total, COUNT(DISTINCT student_id) AS students, COUNT(DISTINCT course_id) AS courses FROM enrollment; 실행 2 · 두 번호 조합의 중복 검사 WITH enrollment (student_id, course_id, student_name) AS ( SELECT 1, 10, 'MIN' FROM dual UNION ALL SELECT 1, 20, 'MIN' FROM dual UNION ALL SELECT 2, 10, 'JUN' FROM dual ) SELECT student_id, course_id, COUNT(*) AS duplicate_count FROM enrollment GROUP BY student_id, course_id HAVING COUNT(*) > 1 ORDER BY student_id, course_id;",
      "contextHtml": "<p>한 학생은 여러 과목을 수강하고 한 과목에는 여러 학생이 있습니다. 같은 학생이 같은 과목에 두 번 등록하지 않는 업무 규칙을 정합니다.</p>\n<h3>실행 1 · 한 열만으로 구분되는가</h3>\n<pre><code class=\"language-sql\">WITH enrollment (student_id, course_id, student_name) AS (\n    SELECT 1, 10, 'MIN' FROM dual\n    UNION ALL\n    SELECT 1, 20, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 10, 'JUN' FROM dual\n)\nSELECT COUNT(*) AS rows_total,\n COUNT(DISTINCT student_id) AS students,\n COUNT(DISTINCT course_id) AS courses\nFROM enrollment;\n</code></pre>\n<h3>실행 2 · 두 번호 조합의 중복 검사</h3>\n<pre><code class=\"language-sql\">WITH enrollment (student_id, course_id, student_name) AS (\n    SELECT 1, 10, 'MIN' FROM dual\n    UNION ALL\n    SELECT 1, 20, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 10, 'JUN' FROM dual\n)\nSELECT student_id, course_id, COUNT(*) AS duplicate_count\nFROM enrollment GROUP BY student_id, course_id\nHAVING COUNT(*) &gt; 1\nORDER BY student_id, course_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-36",
    "topicId": "TH-36",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "외래 키가 있으면 모두 식별 관계일까",
    "lead": "부모와 연결된다는 사실과 부모 키가 자식의 식별에 참여한다는 사실을 구분해 봅니다.",
    "cue": "(order_id,line_no)를 기본 키로 정하면 부모 ID가 자식 식별자에 포함됩니다. line_id만 기본 키로 정하는 설계에서는 포함되지 않습니다.",
    "selected": true,
    "theoryUrl": "theory/TH-36.html",
    "labUrl": "lab.html?episode=TH-36",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-36-check",
      "prompt": "자식에 부모 번호가 NOT NULL이면 반드시 식별 관계일까요?",
      "answer": "아닙니다. 부모 번호가 필수라는 조건과 자식 주 식별자에 포함된다는 조건은 다릅니다.",
      "answerHtml": "<p>아닙니다. 부모 번호가 필수라는 조건과 자식 주 식별자에 포함된다는 조건은 다릅니다.</p>\n",
      "context": "주문 안에서 상세 순번을 1부터 매긴다고 합시다. 10번 주문의 1번 줄과 20번 주문의 1번 줄은 서로 다른 상세입니다. 실행 1 · 상세 순번만으로는 식별 불가 WITH lines (order_id, line_no) AS ( SELECT 10, 1 FROM dual UNION ALL SELECT 10, 2 FROM dual UNION ALL SELECT 20, 1 FROM dual ) SELECT line_no, COUNT(*) AS occurrences FROM lines GROUP BY line_no HAVING COUNT(*) > 1 ORDER BY line_no; 실행 2 · 독립 식별자를 부여한 구조 WITH lines (line_id, order_id, line_no) AS ( SELECT 101, 10, 1 FROM dual UNION ALL SELECT 102, 10, 2 FROM dual UNION ALL SELECT 103, 20, 1 FROM dual ) SELECT line_id, order_id, line_no FROM lines ORDER BY line_id;",
      "contextHtml": "<p>주문 안에서 상세 순번을 1부터 매긴다고 합시다. 10번 주문의 1번 줄과 20번 주문의 1번 줄은 서로 다른 상세입니다.</p>\n<h3>실행 1 · 상세 순번만으로는 식별 불가</h3>\n<pre><code class=\"language-sql\">WITH lines (order_id, line_no) AS (\n    SELECT 10, 1 FROM dual\n    UNION ALL\n    SELECT 10, 2 FROM dual\n    UNION ALL\n    SELECT 20, 1 FROM dual\n)\nSELECT line_no, COUNT(*) AS occurrences\nFROM lines GROUP BY line_no HAVING COUNT(*) &gt; 1\nORDER BY line_no;\n</code></pre>\n<h3>실행 2 · 독립 식별자를 부여한 구조</h3>\n<pre><code class=\"language-sql\">WITH lines (line_id, order_id, line_no) AS (\n    SELECT 101, 10, 1 FROM dual\n    UNION ALL\n    SELECT 102, 10, 2 FROM dual\n    UNION ALL\n    SELECT 103, 20, 1 FROM dual\n)\nSELECT line_id, order_id, line_no FROM lines ORDER BY line_id;\n</code></pre>\n"
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
    ],
    "variantCount": 2
  },
  {
    "code": "TH-37",
    "topicId": "TH-37",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "일대다 관계이면 자식이 반드시 있어야 할까",
    "lead": "최대로 몇 개까지 연결되는지와 최소 한 개가 필요한지는 다른 질문입니다.",
    "cue": "한 고객에게 여러 주문이 가능하다는 최대 대응 수와 주문 참여가 필수라는 최소 조건을 구분합니다.",
    "selected": true,
    "theoryUrl": "theory/TH-37.html",
    "labUrl": "lab.html?episode=TH-37",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-37-check",
      "prompt": "주문의 고객 참조가 필수이면 고객 가입 즉시 주문도 있어야 할까요?",
      "answer": "그렇지 않습니다. 주문에서 고객을 향한 필수성과 고객에서 주문을 향한 필수성은 방향이 다릅니다.",
      "answerHtml": "<p>그렇지 않습니다. 주문에서 고객을 향한 필수성과 고객에서 주문을 향한 필수성은 방향이 다릅니다.</p>\n",
      "context": "가입했지만 주문하지 않은 고객을 허용하는 쇼핑몰입니다. 고객과 주문은 일대다 관계여도 고객 SOL의 주문 수는 0일 수 있습니다. 실행 1 · 주문이 없는 고객도 포함 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT c.customer_id, COUNT(o.order_id) AS order_count FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id ORDER BY c.customer_id; 실행 2 · 고객 번호가 없는 주문 찾기 WITH orders (order_id, customer_id) AS ( SELECT 101, 1 FROM dual UNION ALL SELECT 102, CAST(NULL AS NUMBER) FROM dual ) SELECT order_id, customer_id FROM orders WHERE customer_id IS NULL ORDER BY order_id;",
      "contextHtml": "<p>가입했지만 주문하지 않은 고객을 허용하는 쇼핑몰입니다. 고객과 주문은 일대다 관계여도 고객 SOL의 주문 수는 0일 수 있습니다.</p>\n<h3>실행 1 · 주문이 없는 고객도 포함</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT c.customer_id, COUNT(o.order_id) AS order_count\nFROM customers c LEFT JOIN orders o\n ON c.customer_id = o.customer_id\nGROUP BY c.customer_id ORDER BY c.customer_id;\n</code></pre>\n<h3>실행 2 · 고객 번호가 없는 주문 찾기</h3>\n<pre><code class=\"language-sql\">WITH orders (order_id, customer_id) AS (\n    SELECT 101, 1 FROM dual\n    UNION ALL\n    SELECT 102, CAST(NULL AS NUMBER) FROM dual\n)\nSELECT order_id, customer_id FROM orders\nWHERE customer_id IS NULL ORDER BY order_id;\n</code></pre>\n"
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
    ],
    "variantCount": 2
  },
  {
    "code": "TH-38",
    "topicId": "TH-38",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "2정규형과 3정규형은 어떤 종속을 나눌까",
    "lead": "열 개수보다 “무엇을 알면 무엇이 정해지는가”를 먼저 적어 봅니다.",
    "cue": "주문·상품 복합 키를 전제로 상품 이름은 상품 ID에 부분 종속되고, 분류 이름은 분류 ID를 거쳐 종속됩니다.",
    "selected": true,
    "theoryUrl": "theory/TH-38.html",
    "labUrl": "lab.html?episode=TH-38",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-38-check",
      "prompt": "단일 열 후보 키인 주문 표는 무조건 3정규형일까요?",
      "answer": "아닙니다. 부분 종속 문제와 별개로 고객 번호→고객 이름 같은 비키를 통한 종속이 남을 수 있습니다. 다른 후보 키가 있는 경우까지 검토해야 합니다.",
      "answerHtml": "<p>아닙니다. 부분 종속 문제와 별개로 고객 번호→고객 이름 같은 비키를 통한 종속이 남을 수 있습니다. 다른 후보 키가 있는 경우까지 검토해야 합니다.</p>\n",
      "context": "주문 상세의 후보 키는 (주문 번호, 상품 번호)라고 정합니다. 주문 번호는 고객 번호를, 고객 번호는 고객 이름을, 상품 번호는 상품 이름을 결정합니다. 주문 수량은 상세 조합에 속합니다. 실행 1 · 한 고객 이름이 달라진 표본 WITH order_lines (order_id, item_id, item_name, customer_id, customer_name, qty) AS ( SELECT 1, 10, 'COFFEE', 1, 'MIN', 1 FROM dual UNION ALL SELECT 1, 20, 'TEA', 1, 'MIN', 2 FROM dual UNION ALL SELECT 2, 10, 'COFFEE', 1, 'MINTY', 1 FROM dual ) SELECT customer_id, COUNT(DISTINCT customer_name) AS name_kinds FROM order_lines GROUP BY customer_id HAVING COUNT(DISTINCT customer_name) > 1 ORDER BY customer_id; 실행 2 · 나눈 자료를 키로 다시 연결 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual ), orders (order_id, customer_id) AS ( SELECT 1, 1 FROM dual UNION ALL SELECT 2, 1 FROM dual ), items (item_id, item_name) AS ( SELECT 10, 'COFFEE' FROM dual UNION ALL SELECT 20, 'TEA' FROM dual ), lines (order_id, item_id, qty) AS ( SELECT 1, 10, 1 FROM dual UNION ALL SELECT 1, 20, 2 FROM dual UNION ALL SELECT 2, 10, 1 FROM dual ) SELECT l.order_id, l.item_id, i.item_name, c.customer_name, l.qty FROM lines l JOIN orders o ON o.order_id=l.order_id JOIN customers c ON c.customer_id=o.customer_id JOIN items i ON i.item_id=l.item_id ORDER BY l.order_id, l.item_id;",
      "contextHtml": "<p>주문 상세의 후보 키는 (주문 번호, 상품 번호)라고 정합니다. 주문 번호는 고객 번호를, 고객 번호는 고객 이름을, 상품 번호는 상품 이름을 결정합니다. 주문 수량은 상세 조합에 속합니다.</p>\n<h3>실행 1 · 한 고객 이름이 달라진 표본</h3>\n<pre><code class=\"language-sql\">WITH order_lines (order_id, item_id, item_name, customer_id, customer_name, qty) AS (\n    SELECT 1, 10, 'COFFEE', 1, 'MIN', 1 FROM dual\n    UNION ALL\n    SELECT 1, 20, 'TEA', 1, 'MIN', 2 FROM dual\n    UNION ALL\n    SELECT 2, 10, 'COFFEE', 1, 'MINTY', 1 FROM dual\n)\nSELECT customer_id, COUNT(DISTINCT customer_name) AS name_kinds\nFROM order_lines GROUP BY customer_id\nHAVING COUNT(DISTINCT customer_name) &gt; 1\nORDER BY customer_id;\n</code></pre>\n<h3>실행 2 · 나눈 자료를 키로 다시 연결</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n),\norders (order_id, customer_id) AS (\n    SELECT 1, 1 FROM dual\n    UNION ALL\n    SELECT 2, 1 FROM dual\n),\nitems (item_id, item_name) AS (\n    SELECT 10, 'COFFEE' FROM dual\n    UNION ALL\n    SELECT 20, 'TEA' FROM dual\n),\nlines (order_id, item_id, qty) AS (\n    SELECT 1, 10, 1 FROM dual\n    UNION ALL\n    SELECT 1, 20, 2 FROM dual\n    UNION ALL\n    SELECT 2, 10, 1 FROM dual\n)\nSELECT l.order_id, l.item_id, i.item_name, c.customer_name, l.qty\nFROM lines l JOIN orders o ON o.order_id=l.order_id\nJOIN customers c ON c.customer_id=o.customer_id\nJOIN items i ON i.item_id=l.item_id\nORDER BY l.order_id, l.item_id;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Oracle Data Modeler · 논리 모델과 속성 및 관계",
        "url": "https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/24.3/dmdug/data-modeler-concepts-usage.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-39",
    "topicId": "TH-39",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "새 번호를 붙이면 업무 중복도 없어질까",
    "lead": "행을 구별하는 시스템 번호와 같은 업무가 반복됐는지 확인하는 기준을 따로 봅니다.",
    "cue": "대리 키가 유일한 것과 업무상 중복이 없는 것은 다른 조건입니다.",
    "selected": true,
    "theoryUrl": "theory/TH-39.html",
    "labUrl": "lab.html?episode=TH-39",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-39-check",
      "prompt": "102번의 청구 월을 202611로 바꾸면 두 번째 SQL에 남을 행은 무엇일까요?",
      "answer": "0행입니다. 이 표본에서는 고객·월 조합이 모두 달라집니다. 앞으로의 입력까지 막으려면 실제 제약을 생성해야 합니다.",
      "answerHtml": "<p>0행입니다. 이 표본에서는 고객·월 조합이 모두 달라집니다. 앞으로의 입력까지 막으려면 실제 제약을 생성해야 합니다.</p>\n",
      "context": "청구서 101번과 102번의 번호는 다릅니다. 하지만 둘 다 고객 1의 2026년 10월 청구서입니다. 서로 다른 행이라는 이유로 두 장을 허용해도 되는지 확인합니다. 실행 1 · 번호는 모두 다르지만 WITH invoices (invoice_id, customer_id, bill_month) AS ( SELECT 101, 1, 202610 FROM dual UNION ALL SELECT 102, 1, 202610 FROM dual UNION ALL SELECT 103, 2, 202610 FROM dual ) SELECT COUNT(*) AS rows_total, COUNT(DISTINCT invoice_id) AS ids FROM invoices; 실행 2 · 업무 기준의 중복 검사 WITH invoices (invoice_id, customer_id, bill_month) AS ( SELECT 101, 1, 202610 FROM dual UNION ALL SELECT 102, 1, 202610 FROM dual UNION ALL SELECT 103, 2, 202610 FROM dual ) SELECT customer_id, bill_month, COUNT(*) AS copies FROM invoices GROUP BY customer_id, bill_month HAVING COUNT(*) > 1 ORDER BY customer_id, bill_month;",
      "contextHtml": "<p>청구서 101번과 102번의 번호는 다릅니다. 하지만 둘 다 고객 1의 2026년 10월 청구서입니다. 서로 다른 행이라는 이유로 두 장을 허용해도 되는지 확인합니다.</p>\n<h3>실행 1 · 번호는 모두 다르지만</h3>\n<pre><code class=\"language-sql\">WITH invoices (invoice_id, customer_id, bill_month) AS (\n    SELECT 101, 1, 202610 FROM dual\n    UNION ALL\n    SELECT 102, 1, 202610 FROM dual\n    UNION ALL\n    SELECT 103, 2, 202610 FROM dual\n)\nSELECT COUNT(*) AS rows_total, COUNT(DISTINCT invoice_id) AS ids\nFROM invoices;\n</code></pre>\n<h3>실행 2 · 업무 기준의 중복 검사</h3>\n<pre><code class=\"language-sql\">WITH invoices (invoice_id, customer_id, bill_month) AS (\n    SELECT 101, 1, 202610 FROM dual\n    UNION ALL\n    SELECT 102, 1, 202610 FROM dual\n    UNION ALL\n    SELECT 103, 2, 202610 FROM dual\n)\nSELECT customer_id, bill_month, COUNT(*) AS copies\nFROM invoices GROUP BY customer_id, bill_month\nHAVING COUNT(*) &gt; 1\nORDER BY customer_id, bill_month;\n</code></pre>\n"
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
    ],
    "variantCount": 2
  },
  {
    "code": "TH-40",
    "topicId": "TH-40",
    "subject": 1,
    "subjectName": "데이터 모델링의 이해",
    "group": "데이터 모델링",
    "title": "개념 모델에서 실제 Oracle 표까지 무엇을 정할까",
    "lead": "고객이 주문한다는 업무 설명을 열·키·자료형으로 구체화하는 과정을 따라가 봅니다.",
    "cue": "고객과 주문의 개념을 구분한 뒤 고객 ID, 주문 ID, 수량·금액 같은 열과 참조 규칙을 정합니다.",
    "selected": true,
    "theoryUrl": "theory/TH-40.html",
    "labUrl": "lab.html?episode=TH-40",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-40-check",
      "prompt": "customer_id의 이름을 정하는 일과 NUMBER(6)를 고르는 일은 같은 수준의 결정일까요?",
      "answer": "고객을 구별할 속성과 의미를 정하는 일에서, 특정 DBMS의 표현 범위와 타입을 정하는 일로 구체화됩니다. 이름만 바꿔 세 단계를 구분하지는 않습니다.",
      "answerHtml": "<p>고객을 구별할 속성과 의미를 정하는 일에서, 특정 DBMS의 표현 범위와 타입을 정하는 일로 구체화됩니다. 이름만 바꿔 세 단계를 구분하지는 않습니다.</p>\n",
      "context": "고객과 주문을 관리한다는 설명만으로는 고객 번호의 타입이나 외래 키 제약이 정해지지 않습니다. 업무 관계를 표현한 작은 조회와 실제 DDL을 나란히 봅니다. 실행 1 · 관계를 확인하는 WITH 표본 WITH customers (customer_id, customer_name) AS ( SELECT 1, 'MIN' FROM dual UNION ALL SELECT 2, 'JUN' FROM dual UNION ALL SELECT 3, 'SOL' FROM dual ), orders (order_id, customer_id, amount) AS ( SELECT 101, 1, 10 FROM dual UNION ALL SELECT 102, 1, 20 FROM dual UNION ALL SELECT 103, 2, 5 FROM dual ) SELECT o.order_id, c.customer_name FROM orders o JOIN customers c ON c.customer_id=o.customer_id ORDER BY o.order_id; 실행 2 · 개인 실습 스키마에 실제 구조 생성 CREATE TABLE OFS_T40_CUSTOMER ( customer_id NUMBER(6) PRIMARY KEY, customer_name VARCHAR2(30) NOT NULL ); CREATE TABLE OFS_T40_ORDERS ( order_id NUMBER(6) PRIMARY KEY, customer_id NUMBER(6) NOT NULL REFERENCES OFS_T40_CUSTOMER(customer_id) ); SELECT table_name, column_name, data_type FROM user_tab_columns WHERE table_name IN ('OFS_T40_CUSTOMER','OFS_T40_ORDERS') ORDER BY table_name, column_name; 정리 · 이 글에서 만든 표만 삭제 DROP TABLE OFS_T40_ORDERS; DROP TABLE OFS_T40_CUSTOMER;",
      "contextHtml": "<p>고객과 주문을 관리한다는 설명만으로는 고객 번호의 타입이나 외래 키 제약이 정해지지 않습니다. 업무 관계를 표현한 작은 조회와 실제 DDL을 나란히 봅니다.</p>\n<h3>실행 1 · 관계를 확인하는 WITH 표본</h3>\n<pre><code class=\"language-sql\">WITH customers (customer_id, customer_name) AS (\n    SELECT 1, 'MIN' FROM dual\n    UNION ALL\n    SELECT 2, 'JUN' FROM dual\n    UNION ALL\n    SELECT 3, 'SOL' FROM dual\n),\norders (order_id, customer_id, amount) AS (\n    SELECT 101, 1, 10 FROM dual\n    UNION ALL\n    SELECT 102, 1, 20 FROM dual\n    UNION ALL\n    SELECT 103, 2, 5 FROM dual\n)\nSELECT o.order_id, c.customer_name\nFROM orders o JOIN customers c ON c.customer_id=o.customer_id\nORDER BY o.order_id;\n</code></pre>\n<h3>실행 2 · 개인 실습 스키마에 실제 구조 생성</h3>\n<pre><code class=\"language-sql\">CREATE TABLE OFS_T40_CUSTOMER (\n customer_id NUMBER(6) PRIMARY KEY,\n customer_name VARCHAR2(30) NOT NULL\n);\nCREATE TABLE OFS_T40_ORDERS (\n order_id NUMBER(6) PRIMARY KEY,\n customer_id NUMBER(6) NOT NULL REFERENCES OFS_T40_CUSTOMER(customer_id)\n);\nSELECT table_name, column_name, data_type\nFROM user_tab_columns\nWHERE table_name IN ('OFS_T40_CUSTOMER','OFS_T40_ORDERS')\nORDER BY table_name, column_name;\n</code></pre>\n<h3>정리 · 이 글에서 만든 표만 삭제</h3>\n<pre><code class=\"language-sql\">DROP TABLE OFS_T40_ORDERS;\nDROP TABLE OFS_T40_CUSTOMER;\n</code></pre>\n"
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
    ],
    "variantCount": 2
  },
  {
    "code": "TH-41",
    "topicId": "TH-41",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "제약 조건과 트랜잭션",
    "title": "CHECK가 있으면 NULL도 막을 수 있을까",
    "lead": "양수만 허용한다는 조건과 값을 반드시 입력한다는 조건은 다릅니다.",
    "cue": "CHECK는 조건이 FALSE인 값을 거절하고 UNKNOWN은 통과시킵니다.",
    "selected": true,
    "theoryUrl": "theory/TH-41.html",
    "labUrl": "lab.html?episode=TH-41",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-41-check",
      "prompt": "CHECK(x > 0)만 있는 표에 0을 넣으면 통과할까요?",
      "answer": "거부됩니다. 0 > 0은 UNKNOWN이 아니라 FALSE입니다. NULL과 0은 다른 입력입니다.",
      "answerHtml": "<p>거부됩니다. 0 &gt; 0은 UNKNOWN이 아니라 FALSE입니다. NULL과 0은 다른 입력입니다.</p>\n",
      "context": "수수료 x를 양수로 제한한다고 합시다. 아직 기록하지 않은 NULL도 금지하려는 것인지, 음수와 0만 금지하려는 것인지 먼저 나눕니다. 실행 1 · 두 실습 표 준비와 NULL 허용 확인 CREATE TABLE OFS_T41_A (x NUMBER CHECK (x > 0)); CREATE TABLE OFS_T41_B (x NUMBER NOT NULL CHECK (x > 0)); INSERT INTO OFS_T41_A (x) WITH vals (x) AS ( SELECT CAST(NULL AS NUMBER) FROM dual UNION ALL SELECT 10 FROM dual ) SELECT x FROM vals; SELECT x FROM OFS_T41_A ORDER BY x NULLS FIRST; 실행 2 · 음수는 CHECK 위반 INSERT INTO OFS_T41_A (x) VALUES (-1); 실행 3 · NOT NULL이 있는 표 INSERT INTO OFS_T41_B (x) VALUES (NULL); 정리 · 만든 실습 표 삭제 DROP TABLE OFS_T41_B; DROP TABLE OFS_T41_A;",
      "contextHtml": "<p>수수료 x를 양수로 제한한다고 합시다. 아직 기록하지 않은 NULL도 금지하려는 것인지, 음수와 0만 금지하려는 것인지 먼저 나눕니다.</p>\n<h3>실행 1 · 두 실습 표 준비와 NULL 허용 확인</h3>\n<pre><code class=\"language-sql\">CREATE TABLE OFS_T41_A (x NUMBER CHECK (x &gt; 0));\nCREATE TABLE OFS_T41_B (x NUMBER NOT NULL CHECK (x &gt; 0));\nINSERT INTO OFS_T41_A (x)\nWITH vals (x) AS (\n SELECT CAST(NULL AS NUMBER) FROM dual\n UNION ALL SELECT 10 FROM dual\n)\nSELECT x FROM vals;\nSELECT x FROM OFS_T41_A ORDER BY x NULLS FIRST;\n</code></pre>\n<h3>실행 2 · 음수는 CHECK 위반</h3>\n<pre><code class=\"language-sql\">INSERT INTO OFS_T41_A (x) VALUES (-1);\n</code></pre>\n<h3>실행 3 · NOT NULL이 있는 표</h3>\n<pre><code class=\"language-sql\">INSERT INTO OFS_T41_B (x) VALUES (NULL);\n</code></pre>\n<h3>정리 · 만든 실습 표 삭제</h3>\n<pre><code class=\"language-sql\">DROP TABLE OFS_T41_B;\nDROP TABLE OFS_T41_A;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html"
      },
      {
        "title": "Oracle ORA-02290",
        "url": "https://docs.oracle.com/en/error-help/db/ora-02290/"
      },
      {
        "title": "Oracle ORA-01400",
        "url": "https://docs.oracle.com/en/error-help/db/ora-01400/"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-42",
    "topicId": "TH-42",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "제약 조건과 트랜잭션",
    "title": "빈 문자열과 공백 한 칸은 같은 값일까",
    "lead": "화면에서 둘 다 비어 보일 수 있어도 Oracle에서는 길이 0 문자열과 공백 한 칸을 구분해야 합니다.",
    "cue": "NULL은 값이 없다는 표시이고 공백은 실제 문자입니다. LENGTH(NULL)은 NULL, 공백 한 칸의 길이는 1입니다.",
    "selected": true,
    "theoryUrl": "theory/TH-42.html",
    "labUrl": "lab.html?episode=TH-42",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-42-check",
      "prompt": "txt = NULL로 EMPTY 행을 찾을 수 있을까요?",
      "answer": "찾을 수 없습니다. NULL 비교에는 IS NULL을 사용합니다. 화면상 비어 보이는지와 등호 비교의 논리값은 별개입니다.",
      "answerHtml": "<p>찾을 수 없습니다. NULL 비교에는 IS NULL을 사용합니다. 화면상 비어 보이는지와 등호 비교의 논리값은 별개입니다.</p>\n",
      "context": "빈 문자열, 명시한 NULL, 공백, 문자 0을 네 행에 놓습니다. 육안으로 빈칸을 보는 대신 IS NULL과 LENGTH로 확인해 봅니다. 실행 1 · 길이와 NULL 여부 WITH samples (id, label, txt) AS ( SELECT 1, 'EMPTY', CAST('' AS VARCHAR2(10)) FROM dual UNION ALL SELECT 2, 'NULL_VALUE', CAST(NULL AS VARCHAR2(10)) FROM dual UNION ALL SELECT 3, 'SPACE', CAST(' ' AS VARCHAR2(10)) FROM dual UNION ALL SELECT 4, 'ZERO_TEXT', CAST('0' AS VARCHAR2(10)) FROM dual ) SELECT label, LENGTH(txt) AS text_length, CASE WHEN txt IS NULL THEN 'NULL' ELSE 'VALUE' END AS state FROM samples ORDER BY id; 실행 2 · 값이 있는 행만 세기 WITH samples (id, label, txt) AS ( SELECT 1, 'EMPTY', CAST('' AS VARCHAR2(10)) FROM dual UNION ALL SELECT 2, 'NULL_VALUE', CAST(NULL AS VARCHAR2(10)) FROM dual UNION ALL SELECT 3, 'SPACE', CAST(' ' AS VARCHAR2(10)) FROM dual UNION ALL SELECT 4, 'ZERO_TEXT', CAST('0' AS VARCHAR2(10)) FROM dual ) SELECT COUNT(*) AS row_count, COUNT(txt) AS value_count, COUNT(DISTINCT txt) AS distinct_count FROM samples;",
      "contextHtml": "<p>빈 문자열, 명시한 NULL, 공백, 문자 0을 네 행에 놓습니다. 육안으로 빈칸을 보는 대신 IS NULL과 LENGTH로 확인해 봅니다.</p>\n<h3>실행 1 · 길이와 NULL 여부</h3>\n<pre><code class=\"language-sql\">WITH samples (id, label, txt) AS (\n SELECT 1, 'EMPTY', CAST('' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 2, 'NULL_VALUE', CAST(NULL AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 3, 'SPACE', CAST(' ' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 4, 'ZERO_TEXT', CAST('0' AS VARCHAR2(10)) FROM dual\n)\nSELECT label, LENGTH(txt) AS text_length,\n CASE WHEN txt IS NULL THEN 'NULL' ELSE 'VALUE' END AS state\nFROM samples ORDER BY id;\n</code></pre>\n<h3>실행 2 · 값이 있는 행만 세기</h3>\n<pre><code class=\"language-sql\">WITH samples (id, label, txt) AS (\n SELECT 1, 'EMPTY', CAST('' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 2, 'NULL_VALUE', CAST(NULL AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 3, 'SPACE', CAST(' ' AS VARCHAR2(10)) FROM dual\n UNION ALL SELECT 4, 'ZERO_TEXT', CAST('0' AS VARCHAR2(10)) FROM dual\n)\nSELECT COUNT(*) AS row_count, COUNT(txt) AS value_count,\n COUNT(DISTINCT txt) AS distinct_count FROM samples;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "Nulls",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Nulls.html"
      },
      {
        "title": "COUNT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html"
      },
      {
        "title": "LENGTH",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/LENGTH.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-43",
    "topicId": "TH-43",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "제약 조건과 트랜잭션",
    "title": "PRIMARY KEY와 UNIQUE와 NOT NULL은 무엇을 막을까",
    "lead": "중복 금지와 값 필수는 같은 제약이 아닙니다. 한 표에 세 조건을 나누어 걸어 봅니다.",
    "cue": "NOT NULL은 값의 존재, 단일 열 UNIQUE는 NULL이 아닌 값의 중복, 기본 키는 두 조건을 함께 봅니다.",
    "selected": true,
    "theoryUrl": "theory/TH-43.html",
    "labUrl": "lab.html?episode=TH-43",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-43-check",
      "prompt": "nickname에 NOT NULL만 있다면 같은 별명을 가진 회원을 두 명 넣을 수 있을까요?",
      "answer": "그렇습니다. 별명 중복도 금지하려면 별도의 유일성 조건이 필요합니다. 이 업무에서는 중복을 허용했습니다.",
      "answerHtml": "<p>그렇습니다. 별명 중복도 금지하려면 별도의 유일성 조건이 필요합니다. 이 업무에서는 중복을 허용했습니다.</p>\n",
      "context": "회원 번호는 필수 고유 값, 이메일은 선택 입력이지만 입력했다면 고유 값, 별명은 필수이되 중복을 허용하는 업무를 정합니다. 실행 1 · 개인 실습 표와 입력 준비 CREATE TABLE OFS_T43_MEMBER ( member_id NUMBER PRIMARY KEY, email VARCHAR2(40) UNIQUE, nickname VARCHAR2(20) NOT NULL ); INSERT INTO OFS_T43_MEMBER (member_id, email, nickname) WITH members (member_id, email, nickname) AS ( SELECT 1, CAST('a@example.test' AS VARCHAR2(40)), 'MIN' FROM dual UNION ALL SELECT 2, CAST(NULL AS VARCHAR2(40)), 'JUN' FROM dual UNION ALL SELECT 3, CAST(NULL AS VARCHAR2(40)), 'MIN' FROM dual ) SELECT member_id, email, nickname FROM members; SELECT member_id, email, nickname FROM OFS_T43_MEMBER ORDER BY member_id; 실행 2 · 이메일 중복 INSERT INTO OFS_T43_MEMBER VALUES (4, 'a@example.test', 'SOL'); 실행 3 · 기본 키의 NULL INSERT INTO OFS_T43_MEMBER VALUES (NULL, 'b@example.test', 'SOL'); 실행 4 · 필수 별명의 NULL INSERT INTO OFS_T43_MEMBER VALUES (4, 'b@example.test', NULL); 정리 · 만든 회원 실습 표 삭제 DROP TABLE OFS_T43_MEMBER;",
      "contextHtml": "<p>회원 번호는 필수 고유 값, 이메일은 선택 입력이지만 입력했다면 고유 값, 별명은 필수이되 중복을 허용하는 업무를 정합니다.</p>\n<h3>실행 1 · 개인 실습 표와 입력 준비</h3>\n<pre><code class=\"language-sql\">CREATE TABLE OFS_T43_MEMBER (\n member_id NUMBER PRIMARY KEY,\n email VARCHAR2(40) UNIQUE,\n nickname VARCHAR2(20) NOT NULL\n);\nINSERT INTO OFS_T43_MEMBER (member_id, email, nickname)\nWITH members (member_id, email, nickname) AS (\n SELECT 1, CAST('a@example.test' AS VARCHAR2(40)), 'MIN' FROM dual\n UNION ALL SELECT 2, CAST(NULL AS VARCHAR2(40)), 'JUN' FROM dual\n UNION ALL SELECT 3, CAST(NULL AS VARCHAR2(40)), 'MIN' FROM dual\n)\nSELECT member_id, email, nickname FROM members;\nSELECT member_id, email, nickname FROM OFS_T43_MEMBER ORDER BY member_id;\n</code></pre>\n<h3>실행 2 · 이메일 중복</h3>\n<pre><code class=\"language-sql\">INSERT INTO OFS_T43_MEMBER VALUES (4, 'a@example.test', 'SOL');\n</code></pre>\n<h3>실행 3 · 기본 키의 NULL</h3>\n<pre><code class=\"language-sql\">INSERT INTO OFS_T43_MEMBER VALUES (NULL, 'b@example.test', 'SOL');\n</code></pre>\n<h3>실행 4 · 필수 별명의 NULL</h3>\n<pre><code class=\"language-sql\">INSERT INTO OFS_T43_MEMBER VALUES (4, 'b@example.test', NULL);\n</code></pre>\n<h3>정리 · 만든 회원 실습 표 삭제</h3>\n<pre><code class=\"language-sql\">DROP TABLE OFS_T43_MEMBER;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "constraint",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/constraint.html"
      },
      {
        "title": "Oracle ORA-00001",
        "url": "https://docs.oracle.com/en/error-help/db/ora-00001/"
      },
      {
        "title": "Oracle ORA-01400",
        "url": "https://docs.oracle.com/en/error-help/db/ora-01400/"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-44",
    "topicId": "TH-44",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "제약 조건과 트랜잭션",
    "title": "DELETE와 TRUNCATE와 DROP은 무엇을 지울까",
    "lead": "행을 지우는 것과 표의 정의를 없애는 것, ROLLBACK으로 되돌릴 수 있는 범위를 함께 봅니다.",
    "cue": "첫 결과는 DELETE 직후 남은 행 수, 두 번째 결과는 ROLLBACK TO 뒤 복원된 행 수입니다.",
    "selected": true,
    "theoryUrl": "theory/TH-44.html",
    "labUrl": "lab.html?episode=TH-44",
    "featured": false,
    "question": null,
    "recall": {
      "id": "TH-44-check",
      "prompt": "DELETE 직후 COMMIT을 한 다음 ROLLBACK을 하면 두 행이 돌아올까요?",
      "answer": "아닙니다. 이미 확정한 삭제는 그 뒤의 ROLLBACK 대상이 아닙니다. 어떤 명령을 썼는지와 확정 시점을 함께 봐야 합니다.",
      "answerHtml": "<p>아닙니다. 이미 확정한 삭제는 그 뒤의 ROLLBACK 대상이 아닙니다. 어떤 명령을 썼는지와 확정 시점을 함께 봐야 합니다.</p>\n",
      "context": "숫자 두 행만 든 개인 실습 표에서 시작합니다. 데이터를 지운 뒤 ROLLBACK을 해 보고, 같은 표의 TRUNCATE 뒤에도 같은 결과가 나오는지 확인합니다. 실행 1 · 준비하고 DELETE 뒤 롤백 CREATE TABLE OFS_T44_DEMO (id NUMBER PRIMARY KEY); INSERT INTO OFS_T44_DEMO (id) WITH seed (id) AS ( SELECT 1 FROM dual UNION ALL SELECT 2 FROM dual ) SELECT id FROM seed; COMMIT; DELETE FROM OFS_T44_DEMO; SELECT COUNT(*) AS after_delete FROM OFS_T44_DEMO; ROLLBACK; SELECT COUNT(*) AS after_rollback FROM OFS_T44_DEMO; 실행 2 · TRUNCATE 뒤 롤백 TRUNCATE TABLE OFS_T44_DEMO; ROLLBACK; SELECT COUNT(*) AS after_truncate_rollback FROM OFS_T44_DEMO; 실행 3 · DROP 뒤 데이터 사전에서 확인 DROP TABLE OFS_T44_DEMO; SELECT COUNT(*) AS named_tables FROM user_tables WHERE table_name = 'OFS_T44_DEMO';",
      "contextHtml": "<p>숫자 두 행만 든 개인 실습 표에서 시작합니다. 데이터를 지운 뒤 ROLLBACK을 해 보고, 같은 표의 TRUNCATE 뒤에도 같은 결과가 나오는지 확인합니다.</p>\n<h3>실행 1 · 준비하고 DELETE 뒤 롤백</h3>\n<pre><code class=\"language-sql\">CREATE TABLE OFS_T44_DEMO (id NUMBER PRIMARY KEY);\nINSERT INTO OFS_T44_DEMO (id)\nWITH seed (id) AS (\n SELECT 1 FROM dual UNION ALL SELECT 2 FROM dual\n) SELECT id FROM seed;\nCOMMIT;\nDELETE FROM OFS_T44_DEMO;\nSELECT COUNT(*) AS after_delete FROM OFS_T44_DEMO;\nROLLBACK;\nSELECT COUNT(*) AS after_rollback FROM OFS_T44_DEMO;\n</code></pre>\n<h3>실행 2 · TRUNCATE 뒤 롤백</h3>\n<pre><code class=\"language-sql\">TRUNCATE TABLE OFS_T44_DEMO;\nROLLBACK;\nSELECT COUNT(*) AS after_truncate_rollback FROM OFS_T44_DEMO;\n</code></pre>\n<h3>실행 3 · DROP 뒤 데이터 사전에서 확인</h3>\n<pre><code class=\"language-sql\">DROP TABLE OFS_T44_DEMO;\nSELECT COUNT(*) AS named_tables\nFROM user_tables WHERE table_name = 'OFS_T44_DEMO';\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "DELETE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/DELETE.html"
      },
      {
        "title": "TRUNCATE-TABLE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/TRUNCATE-TABLE.html"
      },
      {
        "title": "DROP-TABLE",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/DROP-TABLE.html"
      },
      {
        "title": "COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html"
      },
      {
        "title": "ROLLBACK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROLLBACK.html"
      }
    ],
    "variantCount": 2
  },
  {
    "code": "TH-45",
    "topicId": "TH-45",
    "subject": 2,
    "subjectName": "SQL 기본 및 활용",
    "group": "제약 조건과 트랜잭션",
    "title": "ROLLBACK은 어느 시점까지 되돌릴까",
    "lead": "저장 지점으로 일부만 되돌리는 것과 마지막 COMMIT 이후를 모두 취소하는 것을 구분합니다.",
    "cue": "두 번째 저장점으로 되돌리면 그 저장점 뒤의 수정 30만 취소되어 20이 남습니다.",
    "selected": true,
    "theoryUrl": "theory/TH-45.html",
    "labUrl": "lab.html?episode=TH-45",
    "featured": true,
    "question": null,
    "recall": {
      "id": "TH-45-check",
      "prompt": "실행 2의 ROLLBACK TO SAVEPOINT 다음에 COMMIT을 한다면 20은 확정될까요?",
      "answer": "그렇습니다. 부분 취소는 트랜잭션을 끝내지 않으므로 남은 20의 변경을 COMMIT으로 확정할 수 있습니다.",
      "answerHtml": "<p>그렇습니다. 부분 취소는 트랜잭션을 끝내지 않으므로 남은 20의 변경을 COMMIT으로 확정할 수 있습니다.</p>\n",
      "context": "초기 금액 10을 확정한 뒤 20으로 바꾸고 저장 지점을 둡니다. 다시 30으로 바꾼 뒤 저장 지점으로 돌아가면 무엇이 남는지 따라가 봅니다. 실행 1 · 실습 기준 값 10 확정 CREATE TABLE OFS_T45_DEMO (id NUMBER PRIMARY KEY, amount NUMBER); INSERT INTO OFS_T45_DEMO (id, amount) WITH seed (id, amount) AS (SELECT 1, 10 FROM dual) SELECT id, amount FROM seed; COMMIT; SELECT id, amount FROM OFS_T45_DEMO; 실행 2 · 일부 취소와 전체 취소 UPDATE OFS_T45_DEMO SET amount = 20 WHERE id = 1; SAVEPOINT after_20; UPDATE OFS_T45_DEMO SET amount = 30 WHERE id = 1; ROLLBACK TO SAVEPOINT after_20; SELECT amount AS after_savepoint FROM OFS_T45_DEMO WHERE id=1; ROLLBACK; SELECT amount AS after_full_rollback FROM OFS_T45_DEMO WHERE id=1; 실행 3 · 중간에 COMMIT을 하면 UPDATE OFS_T45_DEMO SET amount = 40 WHERE id=1; COMMIT; UPDATE OFS_T45_DEMO SET amount = 50 WHERE id=1; ROLLBACK; SELECT amount AS after_commit_then_rollback FROM OFS_T45_DEMO WHERE id=1; 정리 · 실습 표 삭제 DROP TABLE OFS_T45_DEMO;",
      "contextHtml": "<p>초기 금액 10을 확정한 뒤 20으로 바꾸고 저장 지점을 둡니다. 다시 30으로 바꾼 뒤 저장 지점으로 돌아가면 무엇이 남는지 따라가 봅니다.</p>\n<h3>실행 1 · 실습 기준 값 10 확정</h3>\n<pre><code class=\"language-sql\">CREATE TABLE OFS_T45_DEMO (id NUMBER PRIMARY KEY, amount NUMBER);\nINSERT INTO OFS_T45_DEMO (id, amount)\nWITH seed (id, amount) AS (SELECT 1, 10 FROM dual)\nSELECT id, amount FROM seed;\nCOMMIT;\nSELECT id, amount FROM OFS_T45_DEMO;\n</code></pre>\n<h3>실행 2 · 일부 취소와 전체 취소</h3>\n<pre><code class=\"language-sql\">UPDATE OFS_T45_DEMO SET amount = 20 WHERE id = 1;\nSAVEPOINT after_20;\nUPDATE OFS_T45_DEMO SET amount = 30 WHERE id = 1;\nROLLBACK TO SAVEPOINT after_20;\nSELECT amount AS after_savepoint FROM OFS_T45_DEMO WHERE id=1;\nROLLBACK;\nSELECT amount AS after_full_rollback FROM OFS_T45_DEMO WHERE id=1;\n</code></pre>\n<h3>실행 3 · 중간에 COMMIT을 하면</h3>\n<pre><code class=\"language-sql\">UPDATE OFS_T45_DEMO SET amount = 40 WHERE id=1;\nCOMMIT;\nUPDATE OFS_T45_DEMO SET amount = 50 WHERE id=1;\nROLLBACK;\nSELECT amount AS after_commit_then_rollback\nFROM OFS_T45_DEMO WHERE id=1;\n</code></pre>\n<h3>정리 · 실습 표 삭제</h3>\n<pre><code class=\"language-sql\">DROP TABLE OFS_T45_DEMO;\n</code></pre>\n"
    },
    "sources": [
      {
        "title": "ROLLBACK",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROLLBACK.html"
      },
      {
        "title": "SAVEPOINT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SAVEPOINT.html"
      },
      {
        "title": "COMMIT",
        "url": "https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COMMIT.html"
      }
    ],
    "variantCount": 2
  }
];
