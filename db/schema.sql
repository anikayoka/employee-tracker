DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

-- Department Table --
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(50) NOT NULL
);


-- Role Table --
CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INTEGER references department(id)
);

-- Employee Table --
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER references roles(id),
  manager_id INTEGER references employee(id) ON DELETE SET NULL
);