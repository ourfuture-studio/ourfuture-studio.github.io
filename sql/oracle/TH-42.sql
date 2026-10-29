-- TH-42 / 빈 문자열과 공백 한 칸은 같은 값일까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 명시적 NULL·공백 비교
-- Expected result sets: [[[1, "NULL", null], [2, "VALUE", 1], [3, "VALUE", 1]]]
WITH texts (row_id, text_value) AS (
    SELECT 1, CAST(NULL AS VARCHAR2(40)) FROM dual
    UNION ALL
    SELECT 2, ' ' FROM dual
    UNION ALL
    SELECT 3, 'A' FROM dual
)
SELECT row_id, CASE WHEN text_value IS NULL THEN 'NULL' ELSE 'VALUE' END AS value_kind, LENGTH(text_value) AS char_count FROM texts ORDER BY row_id;

-- 공백 두 칸으로 변경 / 길이 변화
-- Expected result sets: [[[1, "NULL", null], [2, "VALUE", 2], [3, "VALUE", 1]]]
WITH texts (row_id, text_value) AS (
    SELECT 1, CAST(NULL AS VARCHAR2(40)) FROM dual
    UNION ALL
    SELECT 2, '  ' FROM dual
    UNION ALL
    SELECT 3, 'A' FROM dual
)
SELECT row_id, CASE WHEN text_value IS NULL THEN 'NULL' ELSE 'VALUE' END AS value_kind, LENGTH(text_value) AS char_count FROM texts ORDER BY row_id;
