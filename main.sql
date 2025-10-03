DROP SCHEMA IF EXISTS test_schema CASCADE;
CREATE SCHEMA test_schema;
SET search_path TO test_schema;

CREATE TABLE data_types_demo (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    age INT,
    price NUMERIC(10,2),
    created_at TIMESTAMP,
    is_active BOOLEAN,
    data JSONB,
    unique_code UUID DEFAULT gen_random_uuid(),
    score REAL,
    birth_date DATE,
    log_time TIME
);

INSERT INTO data_types_demo 
(name, description, age, price, created_at, is_active, data, score, birth_date, log_time)
VALUES
('Ali', 'Test user', 25, 199.99, NOW(), TRUE, '{"role":"admin"}', 88.5, '2000-05-12', '14:30');

SELECT * FROM data_types_demo;
