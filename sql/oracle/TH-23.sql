-- TH-23 / 소계의 NULL과 원래 NULL은 어떻게 구분할까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 구분 표지 함께 보기
-- Expected result sets: [[[0, 1, 30], [0, null, 5], [1, null, 35]]]
WITH sales (sale_id, region_id, amount) AS (
    SELECT 1, 1, 10 FROM dual
    UNION ALL
    SELECT 2, CAST(NULL AS NUMBER), 5 FROM dual
    UNION ALL
    SELECT 3, 1, 20 FROM dual
)
SELECT subtotal_flag, region_id, total FROM (SELECT 0 AS subtotal_flag, region_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 1 AS subtotal_flag, CAST(NULL AS INTEGER) AS region_id, SUM(amount) AS total FROM sales) x ORDER BY subtotal_flag, CASE WHEN region_id IS NULL THEN 1 ELSE 0 END, region_id;

-- 원래 NULL을 2번 지역으로 / 구분 표지 유지
-- Expected result sets: [[[0, 1, 30], [0, 2, 5], [1, null, 35]]]
WITH sales (sale_id, region_id, amount) AS (
    SELECT 1, 1, 10 FROM dual
    UNION ALL
    SELECT 2, 2, 5 FROM dual
    UNION ALL
    SELECT 3, 1, 20 FROM dual
)
SELECT subtotal_flag, region_id, total FROM (SELECT 0 AS subtotal_flag, region_id, SUM(amount) AS total FROM sales GROUP BY region_id UNION ALL SELECT 1 AS subtotal_flag, CAST(NULL AS INTEGER) AS region_id, SUM(amount) AS total FROM sales) x ORDER BY subtotal_flag, CASE WHEN region_id IS NULL THEN 1 ELSE 0 END, region_id;
