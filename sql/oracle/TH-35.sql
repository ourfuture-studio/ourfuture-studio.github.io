-- TH-35 / 유일하기만 하면 모두 후보 키일까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 조합 중복
-- Expected result sets: [[]]
WITH enrollments (student_id, course_id) AS (
    SELECT 1, 10 FROM dual
    UNION ALL
    SELECT 1, 20 FROM dual
    UNION ALL
    SELECT 2, 10 FROM dual
)
SELECT student_id, course_id, COUNT(*) AS row_count FROM enrollments GROUP BY student_id, course_id HAVING COUNT(*)>1 ORDER BY student_id, course_id;

-- 원래 조건 / 학생 ID만 비교
-- Expected result sets: [[[1, 2]]]
WITH enrollments (student_id, course_id) AS (
    SELECT 1, 10 FROM dual
    UNION ALL
    SELECT 1, 20 FROM dual
    UNION ALL
    SELECT 2, 10 FROM dual
)
SELECT student_id, COUNT(*) AS row_count FROM enrollments GROUP BY student_id HAVING COUNT(*)>1 ORDER BY student_id;

-- 같은 수강 한 행 추가 / 조합 중복
-- Expected result sets: [[[1, 10, 2]]]
WITH enrollments (student_id, course_id) AS (
    SELECT 1, 10 FROM dual
    UNION ALL
    SELECT 1, 20 FROM dual
    UNION ALL
    SELECT 2, 10 FROM dual
    UNION ALL
    SELECT 1, 10 FROM dual
)
SELECT student_id, course_id, COUNT(*) AS row_count FROM enrollments GROUP BY student_id, course_id HAVING COUNT(*)>1 ORDER BY student_id, course_id;
