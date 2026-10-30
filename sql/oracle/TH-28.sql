-- TH-28 / PARTITION BY는 왜 주문 행을 줄이지 않을까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / PARTITION BY
-- Expected result sets: [[[101, 1, 10, 30], [102, 1, 20, 30], [103, 2, 5, 5]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
)
SELECT order_id, customer_id, amount, SUM(amount) OVER (PARTITION BY customer_id) AS customer_total FROM orders ORDER BY order_id;

-- 원래 조건 / GROUP BY
-- Expected result sets: [[[1, 30], [2, 5]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
)
SELECT customer_id, SUM(amount) AS customer_total FROM orders GROUP BY customer_id ORDER BY customer_id;

-- 102번 주문 고객 변경 / PARTITION BY
-- Expected result sets: [[[101, 1, 10, 10], [102, 2, 20, 25], [103, 2, 5, 25]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 2, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
)
SELECT order_id, customer_id, amount, SUM(amount) OVER (PARTITION BY customer_id) AS customer_total FROM orders ORDER BY order_id;
