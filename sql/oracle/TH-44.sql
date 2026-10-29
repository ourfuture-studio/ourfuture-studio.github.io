-- TH-44 / DELETE와 TRUNCATE와 DROP은 무엇을 지울까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.
-- FIRST: run this setup ONCE in a private practice schema.
-- If these dedicated names already exist, rename them; no existing tables are dropped.
-- Use ONE connection with autocommit OFF. Do not run unrelated DDL between savepoints.
CREATE TABLE LAB_TH44_orders (order_id INTEGER, customer_id INTEGER, amount INTEGER);
INSERT INTO LAB_TH44_orders VALUES (101, 1, 10);
INSERT INTO LAB_TH44_orders VALUES (102, 1, 20);
INSERT INTO LAB_TH44_orders VALUES (103, 2, 5);

COMMIT;

-- 원래 조건 / 삭제·조회·되돌리기
-- Expected result sets: [[[1]], [[3]]]
SAVEPOINT lab_delete; DELETE FROM LAB_TH44_orders WHERE customer_id=1; SELECT COUNT(*) AS remaining FROM LAB_TH44_orders; ROLLBACK TO lab_delete; SELECT COUNT(*) AS restored FROM LAB_TH44_orders;

-- 조건을 빼고 비교 / 전체 DELETE·되돌리기
-- Expected result sets: [[[0]], [[3]]]
SAVEPOINT lab_delete; DELETE FROM LAB_TH44_orders; SELECT COUNT(*) AS remaining FROM LAB_TH44_orders; ROLLBACK TO lab_delete; SELECT COUNT(*) AS restored FROM LAB_TH44_orders;
