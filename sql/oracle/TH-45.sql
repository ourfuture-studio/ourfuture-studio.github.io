-- TH-45 / ROLLBACK은 어느 시점까지 되돌릴까
-- Oracle 19c target. Documentation review; NOT executed on an Oracle instance.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.
-- FIRST: run this setup ONCE in a private practice schema.
-- If these dedicated names already exist, rename them; no existing tables are dropped.
-- Use ONE connection with autocommit OFF. Do not run unrelated DDL between savepoints.
CREATE TABLE LAB_TH45_orders (order_id INTEGER, customer_id INTEGER, amount INTEGER);
INSERT INTO LAB_TH45_orders VALUES (101, 1, 10);
INSERT INTO LAB_TH45_orders VALUES (102, 1, 20);
INSERT INTO LAB_TH45_orders VALUES (103, 2, 5);

COMMIT;

-- 원래 조건 / 저장점 경계 비교
-- Expected result sets: [[[101, 20]], [[101, 10]]]
SAVEPOINT lab_start; UPDATE LAB_TH45_orders SET amount=20 WHERE order_id=101; SAVEPOINT lab_second; UPDATE LAB_TH45_orders SET amount=30 WHERE order_id=101; ROLLBACK TO lab_second; SELECT order_id, amount FROM LAB_TH45_orders WHERE order_id=101; ROLLBACK TO lab_start; SELECT order_id, amount FROM LAB_TH45_orders WHERE order_id=101;

-- 처음 저장점으로 바로 복귀 / 수정 두 개 함께 취소
-- Expected result sets: [[[101, 10]]]
SAVEPOINT lab_start; UPDATE LAB_TH45_orders SET amount=20 WHERE order_id=101; UPDATE LAB_TH45_orders SET amount=30 WHERE order_id=101; ROLLBACK TO lab_start; SELECT order_id, amount FROM LAB_TH45_orders WHERE order_id=101;
