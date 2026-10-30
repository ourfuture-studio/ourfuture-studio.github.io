-- TH-36 / 외래 키가 있으면 모두 식별 관계일까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 두 가지 식별 후보
-- Expected result sets: [[[101, 1, 1], [101, 2, 2], [102, 1, 3]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
),
order_lines (order_id, line_no, line_id, product_id) AS (
    SELECT 101, 1, 1, 10 FROM dual
    UNION ALL
    SELECT 101, 2, 2, 20 FROM dual
    UNION ALL
    SELECT 102, 1, 3, 10 FROM dual
)
SELECT order_id, line_no, line_id FROM order_lines ORDER BY order_id, line_no;

-- 원래 조건 / 부모 없는 후보 행
-- Expected result sets: [[]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
),
order_lines (order_id, line_no, line_id, product_id) AS (
    SELECT 101, 1, 1, 10 FROM dual
    UNION ALL
    SELECT 101, 2, 2, 20 FROM dual
    UNION ALL
    SELECT 102, 1, 3, 10 FROM dual
)
SELECT l.line_id FROM order_lines l WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.order_id=l.order_id) ORDER BY l.line_id;

-- 부모 없는 후보 행 / 부모 없는 후보 행
-- Expected result sets: [[[4]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
),
order_lines (order_id, line_no, line_id, product_id) AS (
    SELECT 101, 1, 1, 10 FROM dual
    UNION ALL
    SELECT 101, 2, 2, 20 FROM dual
    UNION ALL
    SELECT 102, 1, 3, 10 FROM dual
    UNION ALL
    SELECT 999, 1, 4, 30 FROM dual
)
SELECT l.line_id FROM order_lines l WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.order_id=l.order_id) ORDER BY l.line_id;
