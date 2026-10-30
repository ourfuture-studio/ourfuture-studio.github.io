-- TH-32 / CONNECT BY PRIOR는 어느 쪽 값을 따라갈까
-- Registered fixed-input queries compared with SQLite on Oracle 19c 19.26.0.0.0.
-- Reproduction SQL uses equivalent fixtures and dedicated practice table names.
-- Select and execute ONE labeled query block at a time.
-- Examples use synthetic data.

-- 원래 조건 / 부모 → 자식
-- Expected result sets: [[[1, 2], [1, 3], [2, 4]]]
WITH nodes (node_id, parent_id) AS (
    SELECT 1, CAST(NULL AS NUMBER) FROM dual
    UNION ALL
    SELECT 2, 1 FROM dual
    UNION ALL
    SELECT 3, 1 FROM dual
    UNION ALL
    SELECT 4, 2 FROM dual
)
SELECT p.node_id AS parent_node, c.node_id AS child_node FROM nodes p JOIN nodes c ON c.parent_id=p.node_id ORDER BY p.node_id, c.node_id;

-- 원래 조건 / 자식 → 부모
-- Expected result sets: [[[2, 1], [3, 1], [4, 2]]]
WITH nodes (node_id, parent_id) AS (
    SELECT 1, CAST(NULL AS NUMBER) FROM dual
    UNION ALL
    SELECT 2, 1 FROM dual
    UNION ALL
    SELECT 3, 1 FROM dual
    UNION ALL
    SELECT 4, 2 FROM dual
)
SELECT c.node_id AS child_node, p.node_id AS parent_node FROM nodes c JOIN nodes p ON c.parent_id=p.node_id ORDER BY c.node_id;

-- 4번의 부모를 3번으로 / 변경된 연결
-- Expected result sets: [[[1, 2], [1, 3], [3, 4]]]
WITH nodes (node_id, parent_id) AS (
    SELECT 1, CAST(NULL AS NUMBER) FROM dual
    UNION ALL
    SELECT 2, 1 FROM dual
    UNION ALL
    SELECT 3, 1 FROM dual
    UNION ALL
    SELECT 4, 3 FROM dual
)
SELECT p.node_id AS parent_node, c.node_id AS child_node FROM nodes p JOIN nodes c ON c.parent_id=p.node_id ORDER BY p.node_id, c.node_id;
