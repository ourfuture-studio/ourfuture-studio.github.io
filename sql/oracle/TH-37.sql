-- TH-37 / 일대다 관계이면 자식이 반드시 있어야 할까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 고객별 자식 수
-- Expected result sets: [[[1, 2], [2, 1], [3, 0]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
),
orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
)
SELECT c.customer_id, COUNT(o.order_id) AS order_count FROM customers c LEFT JOIN orders o ON o.customer_id=c.customer_id GROUP BY c.customer_id ORDER BY c.customer_id;

-- 3번 고객 첫 주문 / 참여 상태 변화
-- Expected result sets: [[[1, 2], [2, 1], [3, 1]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
),
orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
    UNION ALL
    SELECT 104, 3, 8 FROM dual
)
SELECT c.customer_id, COUNT(o.order_id) AS order_count FROM customers c LEFT JOIN orders o ON o.customer_id=c.customer_id GROUP BY c.customer_id ORDER BY c.customer_id;
