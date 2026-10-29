-- TH-31 / 이전 행은 저장 순서일까 정렬 순서일까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 날짜·번호 순
-- Expected result sets: [[[402, 1, 4, null, 6], [401, 2, 6, 4, 9], [403, 2, 9, 6, null]]]
WITH receipts (receipt_id, day_no, amount) AS (
    SELECT 401, 2, 6 FROM dual
    UNION ALL
    SELECT 402, 1, 4 FROM dual
    UNION ALL
    SELECT 403, 2, 9 FROM dual
)
SELECT receipt_id, day_no, amount, LAG(amount) OVER (ORDER BY day_no, receipt_id) AS previous_amount, LEAD(amount) OVER (ORDER BY day_no, receipt_id) AS next_amount FROM receipts ORDER BY day_no, receipt_id;

-- 401번 날짜 변경 / 바뀐 순서
-- Expected result sets: [[[402, 1, 4, null, 9], [403, 2, 9, 4, 6], [401, 3, 6, 9, null]]]
WITH receipts (receipt_id, day_no, amount) AS (
    SELECT 401, 3, 6 FROM dual
    UNION ALL
    SELECT 402, 1, 4 FROM dual
    UNION ALL
    SELECT 403, 2, 9 FROM dual
)
SELECT receipt_id, day_no, amount, LAG(amount) OVER (ORDER BY day_no, receipt_id) AS previous_amount, LEAD(amount) OVER (ORDER BY day_no, receipt_id) AS next_amount FROM receipts ORDER BY day_no, receipt_id;
