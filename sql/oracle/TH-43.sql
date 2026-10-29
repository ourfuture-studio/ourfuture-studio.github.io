-- TH-43 / PRIMARY KEY와 UNIQUE와 NOT NULL은 무엇을 막을까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 후보 열의 세 조건
-- Expected result sets: [[[1, 10, "PASS", "FAIL", "FAIL"], [2, 10, "PASS", "FAIL", "FAIL"], [3, null, "FAIL", "PASS", "FAIL"]]]
WITH key_candidates (row_id, code) AS (
    SELECT 1, 10 FROM dual
    UNION ALL
    SELECT 2, 10 FROM dual
    UNION ALL
    SELECT 3, CAST(NULL AS NUMBER) FROM dual
)
SELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id;

-- 중복 코드만 변경 / 중복 해소 후
-- Expected result sets: [[[1, 10, "PASS", "PASS", "PASS"], [2, 20, "PASS", "PASS", "PASS"], [3, null, "FAIL", "PASS", "FAIL"]]]
WITH key_candidates (row_id, code) AS (
    SELECT 1, 10 FROM dual
    UNION ALL
    SELECT 2, 20 FROM dual
    UNION ALL
    SELECT 3, CAST(NULL AS NUMBER) FROM dual
)
SELECT k.row_id, k.code, CASE WHEN k.code IS NULL THEN 'FAIL' ELSE 'PASS' END AS not_null_status, CASE WHEN k.code IS NOT NULL AND EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS unique_status, CASE WHEN k.code IS NULL OR EXISTS (SELECT 1 FROM key_candidates x WHERE x.row_id<>k.row_id AND x.code=k.code) THEN 'FAIL' ELSE 'PASS' END AS primary_key_status FROM key_candidates k ORDER BY k.row_id;
