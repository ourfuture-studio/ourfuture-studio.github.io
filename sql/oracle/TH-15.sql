-- TH-15 / IN과 EXISTS와 NOT EXISTS는 무엇을 물을까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / IN
-- Expected result sets: [[[1], [2]]]
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
SELECT customer_id FROM customers WHERE customer_id IN (SELECT customer_id FROM orders) ORDER BY customer_id;

-- 원래 조건 / EXISTS
-- Expected result sets: [[[1], [2]]]
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
SELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id;

-- 원래 조건 / NOT EXISTS
-- Expected result sets: [[[3]]]
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
SELECT c.customer_id FROM customers c WHERE NOT EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id;

-- 1번 고객 주문 추가 / IN
-- Expected result sets: [[[1], [2]]]
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
    SELECT 104, 1, 30 FROM dual
)
SELECT customer_id FROM customers WHERE customer_id IN (SELECT customer_id FROM orders) ORDER BY customer_id;

-- 1번 고객 주문 추가 / EXISTS
-- Expected result sets: [[[1], [2]]]
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
    SELECT 104, 1, 30 FROM dual
)
SELECT c.customer_id FROM customers c WHERE EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id;

-- 1번 고객 주문 추가 / NOT EXISTS
-- Expected result sets: [[[3]]]
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
    SELECT 104, 1, 30 FROM dual
)
SELECT c.customer_id FROM customers c WHERE NOT EXISTS (SELECT NULL FROM orders o WHERE o.customer_id=c.customer_id) ORDER BY c.customer_id;
