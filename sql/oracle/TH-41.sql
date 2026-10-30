-- TH-41 / CHECK가 있으면 NULL도 막을 수 있을까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / CHECK의 논리값
-- Expected result sets: [[[1, 2, "TRUE", "PASS_CHECK"], [2, 0, "FALSE", "REJECT"], [3, null, "UNKNOWN", "PASS_CHECK"]]]
WITH candidates (candidate_id, quantity) AS (
    SELECT 1, 2 FROM dual
    UNION ALL
    SELECT 2, 0 FROM dual
    UNION ALL
    SELECT 3, CAST(NULL AS NUMBER) FROM dual
)
SELECT candidate_id, quantity, CASE WHEN quantity>0 THEN 'TRUE' WHEN NOT(quantity>0) THEN 'FALSE' ELSE 'UNKNOWN' END AS predicate, CASE WHEN NOT(quantity>0) THEN 'REJECT' ELSE 'PASS_CHECK' END AS check_status FROM candidates ORDER BY candidate_id;

-- 원래 조건 / NOT NULL까지 검사
-- Expected result sets: [[[1, "PASS"], [2, "REJECT"], [3, "REJECT"]]]
WITH candidates (candidate_id, quantity) AS (
    SELECT 1, 2 FROM dual
    UNION ALL
    SELECT 2, 0 FROM dual
    UNION ALL
    SELECT 3, CAST(NULL AS NUMBER) FROM dual
)
SELECT candidate_id, CASE WHEN quantity IS NOT NULL AND quantity>0 THEN 'PASS' ELSE 'REJECT' END AS combined_status FROM candidates ORDER BY candidate_id;

-- NULL을 -1로 변경 / FALSE로 바뀐 행
-- Expected result sets: [[[1, 2, "TRUE", "PASS_CHECK"], [2, 0, "FALSE", "REJECT"], [3, -1, "FALSE", "REJECT"]]]
WITH candidates (candidate_id, quantity) AS (
    SELECT 1, 2 FROM dual
    UNION ALL
    SELECT 2, 0 FROM dual
    UNION ALL
    SELECT 3, -1 FROM dual
)
SELECT candidate_id, quantity, CASE WHEN quantity>0 THEN 'TRUE' WHEN NOT(quantity>0) THEN 'FALSE' ELSE 'UNKNOWN' END AS predicate, CASE WHEN NOT(quantity>0) THEN 'REJECT' ELSE 'PASS_CHECK' END AS check_status FROM candidates ORDER BY candidate_id;
