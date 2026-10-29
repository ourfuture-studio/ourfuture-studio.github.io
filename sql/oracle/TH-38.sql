-- TH-38 / 2정규형과 3정규형은 어떤 종속을 나눌까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 상품 → 이름 확인
-- Expected result sets: [[[10, 1], [20, 1]]]
WITH flat_orders (order_id, product_id, product_name, category_id, category_name, quantity) AS (
    SELECT 101, 10, 'TEA', 1, 'DRINK', 2 FROM dual
    UNION ALL
    SELECT 101, 20, 'CAKE', 2, 'FOOD', 1 FROM dual
    UNION ALL
    SELECT 102, 10, 'TEA', 1, 'DRINK', 3 FROM dual
)
SELECT product_id, COUNT(DISTINCT product_name) AS name_count FROM flat_orders GROUP BY product_id ORDER BY product_id;

-- 원래 조건 / 분류 → 이름 확인
-- Expected result sets: [[[1, 1], [2, 1]]]
WITH flat_orders (order_id, product_id, product_name, category_id, category_name, quantity) AS (
    SELECT 101, 10, 'TEA', 1, 'DRINK', 2 FROM dual
    UNION ALL
    SELECT 101, 20, 'CAKE', 2, 'FOOD', 1 FROM dual
    UNION ALL
    SELECT 102, 10, 'TEA', 1, 'DRINK', 3 FROM dual
)
SELECT category_id, COUNT(DISTINCT category_name) AS name_count FROM flat_orders GROUP BY category_id ORDER BY category_id;

-- 한 행의 분류 이름만 변경 / 같은 분류, 두 이름
-- Expected result sets: [[[1, 2], [2, 1]]]
WITH flat_orders (order_id, product_id, product_name, category_id, category_name, quantity) AS (
    SELECT 101, 10, 'TEA', 1, 'DRINK', 2 FROM dual
    UNION ALL
    SELECT 101, 20, 'CAKE', 2, 'FOOD', 1 FROM dual
    UNION ALL
    SELECT 102, 10, 'TEA', 1, 'BEVERAGE', 3 FROM dual
)
SELECT category_id, COUNT(DISTINCT category_name) AS name_count FROM flat_orders GROUP BY category_id ORDER BY category_id;
