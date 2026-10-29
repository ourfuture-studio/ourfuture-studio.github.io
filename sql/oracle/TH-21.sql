-- TH-21 / GROUP BY의 열 순서는 출력 순서일까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 지역·상품
-- Expected result sets: [[[1, 10, 10], [1, 20, 20], [2, 10, 5]]]
WITH sales (sale_id, region_id, product_id, amount) AS (
    SELECT 1, 1, 10, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 20, 20 FROM dual
    UNION ALL
    SELECT 3, 2, 10, 5 FROM dual
)
SELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id ORDER BY region_id, product_id;

-- 원래 조건 / 상품·지역
-- Expected result sets: [[[1, 10, 10], [1, 20, 20], [2, 10, 5]]]
WITH sales (sale_id, region_id, product_id, amount) AS (
    SELECT 1, 1, 10, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 20, 20 FROM dual
    UNION ALL
    SELECT 3, 2, 10, 5 FROM dual
)
SELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY product_id, region_id ORDER BY region_id, product_id;

-- 출력 순서만 반대로 / ORDER BY 변경
-- Expected result sets: [[[2, 10, 5], [1, 20, 20], [1, 10, 10]]]
WITH sales (sale_id, region_id, product_id, amount) AS (
    SELECT 1, 1, 10, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 20, 20 FROM dual
    UNION ALL
    SELECT 3, 2, 10, 5 FROM dual
)
SELECT region_id, product_id, SUM(amount) AS total FROM sales GROUP BY region_id, product_id ORDER BY region_id DESC, product_id DESC;
