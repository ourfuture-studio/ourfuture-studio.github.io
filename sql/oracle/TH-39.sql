-- TH-39 / 새 번호를 붙이면 업무 중복도 없어질까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 번호의 유일성
-- Expected result sets: [[[3, 3]]]
WITH bookings (booking_id, customer_id, slot_no) AS (
    SELECT 1, 1, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 10 FROM dual
    UNION ALL
    SELECT 3, 2, 20 FROM dual
)
SELECT COUNT(*) AS rows_n, COUNT(DISTINCT booking_id) AS id_count FROM bookings;

-- 원래 조건 / 업무 조합 중복
-- Expected result sets: [[[1, 10, 2]]]
WITH bookings (booking_id, customer_id, slot_no) AS (
    SELECT 1, 1, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 10 FROM dual
    UNION ALL
    SELECT 3, 2, 20 FROM dual
)
SELECT customer_id, slot_no, COUNT(*) AS row_count FROM bookings GROUP BY customer_id, slot_no HAVING COUNT(*)>1 ORDER BY customer_id, slot_no;

-- 2번 예약 시간 변경 / 번호 그대로
-- Expected result sets: [[[3, 3]]]
WITH bookings (booking_id, customer_id, slot_no) AS (
    SELECT 1, 1, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 11 FROM dual
    UNION ALL
    SELECT 3, 2, 20 FROM dual
)
SELECT COUNT(*) AS rows_n, COUNT(DISTINCT booking_id) AS id_count FROM bookings;

-- 2번 예약 시간 변경 / 업무 중복 제거
-- Expected result sets: [[]]
WITH bookings (booking_id, customer_id, slot_no) AS (
    SELECT 1, 1, 10 FROM dual
    UNION ALL
    SELECT 2, 1, 11 FROM dual
    UNION ALL
    SELECT 3, 2, 20 FROM dual
)
SELECT customer_id, slot_no, COUNT(*) AS row_count FROM bookings GROUP BY customer_id, slot_no HAVING COUNT(*)>1 ORDER BY customer_id, slot_no;
