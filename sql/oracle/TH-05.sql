-- TH-05 / 결과가 없다는 것은 0행일까 NULL 한 칸일까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 주문 목록
-- Expected result sets: [[]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
)
SELECT order_id, amount FROM orders WHERE amount > 100 ORDER BY order_id;

-- 원래 조건 / 전체 집계
-- Expected result sets: [[[0, null]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
)
SELECT COUNT(*) AS row_count, SUM(amount) AS total FROM orders WHERE amount > 100;

-- 원래 조건 / HAVING 적용
-- Expected result sets: [[]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
)
SELECT COUNT(*) AS row_count FROM orders WHERE amount > 100 HAVING COUNT(*) > 0;

-- 150천원 주문 추가 / 주문 목록
-- Expected result sets: [[[104, 150]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
    UNION ALL
    SELECT 104, 3, 150 FROM dual
)
SELECT order_id, amount FROM orders WHERE amount > 100 ORDER BY order_id;

-- 150천원 주문 추가 / 전체 집계
-- Expected result sets: [[[1, 150]]]
WITH orders (order_id, customer_id, amount) AS (
    SELECT 101, 1, 10 FROM dual
    UNION ALL
    SELECT 102, 1, 20 FROM dual
    UNION ALL
    SELECT 103, 2, 5 FROM dual
    UNION ALL
    SELECT 104, 3, 150 FROM dual
)
SELECT COUNT(*) AS row_count, SUM(amount) AS total FROM orders WHERE amount > 100;
