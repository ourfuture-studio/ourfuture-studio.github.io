-- TH-22 / ROLLUP과 CUBE는 몇 종류의 소계를 만들까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / ROLLUP의 그룹 구성
-- Expected result sets: [[[0, 1, 10, 10], [0, 1, 20, 20], [0, 2, 10, 5], [1, 1, null, 30], [1, 2, null, 5], [3, null, null, 35]]]
WITH sales (sale_id, region_id, product_id, amount) AS (
    SELECT 1, 1, 10, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 20, 20 FROM dual
    UNION ALL
    SELECT 3, 2, 10, 5 FROM dual
)
SELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id;

-- 원래 조건 / CUBE의 그룹 구성
-- Expected result sets: [[[0, 1, 10, 10], [0, 1, 20, 20], [0, 2, 10, 5], [1, 1, null, 30], [1, 2, null, 5], [2, null, 10, 15], [2, null, 20, 20], [3, null, null, 35]]]
WITH sales (sale_id, region_id, product_id, amount) AS (
    SELECT 1, 1, 10, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 20, 20 FROM dual
    UNION ALL
    SELECT 3, 2, 10, 5 FROM dual
)
SELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 2 AS level_no, CAST(NULL AS INTEGER) AS region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id;

-- 상품을 10번으로 통일 / CUBE 구성
-- Expected result sets: [[[0, 1, 10, 30], [0, 2, 10, 5], [1, 1, null, 30], [1, 2, null, 5], [2, null, 10, 35], [3, null, null, 35]]]
WITH sales (sale_id, region_id, product_id, amount) AS (
    SELECT 1, 1, 10, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 10, 20 FROM dual
    UNION ALL
    SELECT 3, 2, 10, 5 FROM dual
)
SELECT 0 AS level_no, region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id UNION ALL SELECT 1 AS level_no, region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 2 AS level_no, CAST(NULL AS INTEGER) AS region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id UNION ALL SELECT 3 AS level_no, CAST(NULL AS INTEGER) AS region_id, CAST(NULL AS INTEGER) AS product_id, SUM(amount) AS total FROM sales ORDER BY level_no, region_id, product_id;
