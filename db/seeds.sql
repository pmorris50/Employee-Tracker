
-- data for department table
INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Engineer', '65000', 1),
    ('financial analyst', '50000', 2),
    ('Lawyer', '80000', 3),
    ('agent', '45000', 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Patrick', 'Morris', 1, NULL),
    ('John', 'Buck', 2, 1),
    ('Jane', 'Doe', 3, 1);