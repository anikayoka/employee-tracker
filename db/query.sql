USE employees;

-- SELECT e.first_name, e.last_name, r.title, r.salary, e2.first_name, e2.last_name, d.dept_name FROM employee e LEFT JOIN roles r ON r.id = e.role_id 
-- LEFT JOIN department d ON d.id = r.department_id
-- LEFT JOIN employee e2 ON e.manager_id = e2.id
-- ORDER BY d.dept_name;


-- SELECT * FROM roles;
-- SELECT * FROM employee;
-- SELECT * FROM department;

SELECT d.dept_name, r.salary, sum(r.salary) AS budget
		FROM employee e 
		LEFT JOIN roles r ON r.id = e.role_id
		LEFT JOIN department d ON d.id = r.department_id
		GROUP BY d.dept_name, r.salary;