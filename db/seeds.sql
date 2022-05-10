USE employees;

INSERT INTO department (dept_name) VALUES ('IT'),
('Finance'), ('Human Resources'), ('Marketing'), ('Operations'), ('Sales');

INSERT INTO roles (title, salary, department_id) VALUES ('Manager IT', 120000, 1) ,('Manager Finance', 119000, 2) ,('Manager HR', 121000, 3), ('Manager Marketing', 120000, 4), ('Manager Operations', 125000, 5), ('Manager Sales', 120000, 6);


INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jelani', 'McLean', 1), ('Tracy', 'Alexander', 2), ('Sean', 'James', 3), ('Andrea', 'Hodge', 4), ('Mark', 'Harrison', 5), ('Lyris', 'Christian', 6);

-- UPDATE employee set role_id = 3 WHERE id = 3