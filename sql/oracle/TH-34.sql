-- TH-34 / 입력한 수량과 계산한 금액은 같은 속성일까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 기본 값에서 계산
-- Expected result sets: [[[1, 2, 30, 60], [2, 3, 20, 60]]]
WITH items (item_id, quantity, unit_price) AS (
    SELECT 1, 2, 30 FROM dual
    UNION ALL
    SELECT 2, 3, 20 FROM dual
)
SELECT item_id, quantity, unit_price, quantity*unit_price AS amount FROM items ORDER BY item_id;

-- 1번 수량을 4로 / 계산 금액 변화
-- Expected result sets: [[[1, 4, 30, 120], [2, 3, 20, 60]]]
WITH items (item_id, quantity, unit_price) AS (
    SELECT 1, 4, 30 FROM dual
    UNION ALL
    SELECT 2, 3, 20 FROM dual
)
SELECT item_id, quantity, unit_price, quantity*unit_price AS amount FROM items ORDER BY item_id;
