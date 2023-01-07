

--query to view all departments
SELECT DISTINCT name FROM department;

--query to view all employee
SELECT DISTINCT first_name, last_name FROM employee;

--query to view all roles
SELECT DISTINCT title FROM role; 

--query to add employee
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
    --values will be variables set by user input

--update employee role
UPDATE employee
SET role_id = new_role_id --will be determined by user -- what is first_name's new role id?
WHERE id = employee_id; --will be determined by user question - "Which Employee do you want to change roles?"

--add department
INSERT INTO department (name) VALUES ('Banana')