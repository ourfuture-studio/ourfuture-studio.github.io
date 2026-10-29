-- TH-33 / 고객과 고객 한 명과 고객 이름은 어떻게 다를까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 고객 인스턴스
-- Expected result sets: [[[1, "MIN"], [2, "JUN"], [3, "SOL"]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
)
SELECT customer_id, customer_name FROM customers ORDER BY customer_id;

-- 원래 조건 / 인스턴스 수
-- Expected result sets: [[[3]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
)
SELECT COUNT(*) AS instance_count FROM customers;

-- 고객 한 명 추가 / 동명이인도 별도 행
-- Expected result sets: [[[1, "MIN"], [2, "JUN"], [3, "SOL"], [4, "MIN"]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
    UNION ALL
    SELECT 4, 'MIN' FROM dual
)
SELECT customer_id, customer_name FROM customers ORDER BY customer_id;

-- 고객 한 명 추가 / 인스턴스 수
-- Expected result sets: [[[4]]]
WITH customers (customer_id, customer_name) AS (
    SELECT 1, 'MIN' FROM dual
    UNION ALL
    SELECT 2, 'JUN' FROM dual
    UNION ALL
    SELECT 3, 'SOL' FROM dual
    UNION ALL
    SELECT 4, 'MIN' FROM dual
)
SELECT COUNT(*) AS instance_count FROM customers;
