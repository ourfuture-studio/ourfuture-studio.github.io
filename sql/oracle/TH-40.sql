-- TH-40 / 개념 모델에서 실제 Oracle 표까지 무엇을 정할까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 구현 전 참조 검사
-- Expected result sets: [[[201, 1, 10, "VALID_PARENT"], [202, 3, 5, "VALID_PARENT"]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
),
candidate_orders (order_id, customer_id, amount) AS (
    SELECT 201, 1, 10 FROM dual
    UNION ALL
    SELECT 202, 3, 5 FROM dual
)
SELECT x.order_id, x.customer_id, x.amount, CASE WHEN c.customer_id IS NULL THEN 'INVALID_PARENT' ELSE 'VALID_PARENT' END AS reference_status FROM candidate_orders x LEFT JOIN customers c ON c.customer_id=x.customer_id ORDER BY x.order_id;

-- 정의되지 않은 고객으로 변경 / 참조 대상 확인
-- Expected result sets: [[[201, 1, 10, "VALID_PARENT"], [202, 99, 5, "INVALID_PARENT"]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
),
candidate_orders (order_id, customer_id, amount) AS (
    SELECT 201, 1, 10 FROM dual
    UNION ALL
    SELECT 202, 99, 5 FROM dual
)
SELECT x.order_id, x.customer_id, x.amount, CASE WHEN c.customer_id IS NULL THEN 'INVALID_PARENT' ELSE 'VALID_PARENT' END AS reference_status FROM candidate_orders x LEFT JOIN customers c ON c.customer_id=x.customer_id ORDER BY x.order_id;
