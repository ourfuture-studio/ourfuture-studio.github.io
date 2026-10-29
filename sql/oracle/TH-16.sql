-- TH-16 / 스칼라 서브쿼리가 0행이면 오류일까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 0행 또는 1행
-- Expected result sets: [[[1, null], [2, 5], [3, null]]]
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
SELECT c.customer_id, (SELECT o.amount FROM orders o WHERE o.customer_id=c.customer_id AND o.order_id=103) AS one_amount FROM customers c ORDER BY c.customer_id;

-- 3번 고객의 대상 주문 추가 / 대상 주문 변경
-- Expected result sets: [[[1, null], [2, null], [3, 7]]]
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
    SELECT 104, 3, 7 FROM dual
)
SELECT c.customer_id, (SELECT o.amount FROM orders o WHERE o.customer_id=c.customer_id AND o.order_id=104) AS one_amount FROM customers c ORDER BY c.customer_id;
