const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//DB connect
db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
  dbMain();
});


const exitApp = () => {
  db.end();
  process.exit(0)
}


//User prompts
const dbMain = () => {
  inquirer.prompt([
    {
      name: 'input',
      type: 'list',
      message: 'Welcome to CBC employee database. What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'View employees by department',
        'View department budget',
        'Add department',
        'Add role',
        'Add an employee',
        'Update an employee role',
        'Update employee manager',
        'Delete department',
        'Delete Role',
        'Delete employee',
        'Exit'
      ]
    }
  ])
    .then(({ input }) => {
      switch (input) {
        case 'View all departments':
          viewAllDepts();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'View employees by department':
          viewEmployeesByDept();
          break;
        case 'View department budget':
          viewDeptBudget();
          break;
        case 'Add department':
          addDept();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Update an employee manager':
          updateEmployeeMgr();
          break;
        case 'Delete Department':
          deleteDepartment();
          break;
        case 'Delete Role':
          deleteRole();
          break;
        case 'Delete Employee':
          deleteEmployee();
          break;
        case 'Exit':
          exitApp();
          break;
      };
    });
};

// VIEWS
function viewAllDepts() {
  db.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    cTable(data)
    dbMain();
  })
}
function viewAllRoles() {
  db.query("SELECT * FROM roles", function (err, data) {
    if (err) throw err;
    cTable(data)
    dbMain();
  })
}
function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    cTable(data)
    dbMain();
  })
};
function viewEmployeesByDept() {
  db.query
    ("SELECT e.first_name, e.last_name, r.title, r.salary, e2.first_name, e2.last_name, d.dept_name FROM employee e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee e2 ON e.manager_id = e2.id ORDER BY d.dept_name", function (err, data) {
      if (err) throw err;
      cTable(data)
      dbMain();
    })
};
function viewDeptBudget() {
  db.query("SELECT d.dept_name, r.salary, sum(r.salary) AS budget FROM employee e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY d.dept_name, r.salary", function (err, data) {
    if (err) throw err;
    cTable(data)
    dbMain();
  })
};

// ADDS

function addDept() {
  // Call inquirer first, then push database
  inquirer.prompt([
    {
      name: 'newDept',
      type: 'input',
      message: 'What department would you like to add?'
    }
  ]).then((response) => {
    db.query("INSERT INTO department (dept_name) VALUES (?)", [response.newDept], function (err, data) {
      if (err) throw err;
      cTable(data)
      dbMain();
    })
  })
};

function addRole() {
  inquirer.prompt([
    {
      name: 'newTitle',
      type: 'input',
      message: 'Enter role to be added'
    },
    {
      name: 'newSalary',
      type: 'input',
      message: 'Please enter salary for this role'
    },
    {
      name: 'dept_id',
      type: 'list',
      message: 'Please choose department for this role',
      choices: department
    }
  ]).then((response) => {
    db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [response.newTitle, response.newSalary, response.dept_id], function (err, data) {
      if (err) throw err
      cTable(data)
      dbMain();
    })
  })
};

function addEmployee() {
  inquirer.prompt([
    {
      name: 'eFirst_name',
      type: 'input',
      message: 'Enter first name of employee added'
    },
    {
      name: 'eLastName',
      type: 'input',
      message: 'Enter last name of employee added'
    },
    {
      name: 'roleId',
      type: 'input',
      message: 'Enter employee role id',
    },
    {
      name: 'mgrId',
      type: 'input',
      message: 'Enter employee manager id',

    }
  ]).then((response) => {
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.eFirstNAme, response.eLastName, response.roleId, respone.mgrId], function (err, data) {
      if (err) throw err
      cTable(data)
      dbMain();
    })
  })
};

// UPDATE

function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: "empUpdate",
      type: "input",
      message: "Update which employee?"
    },
    {
      name: "updateRole",
      type: "input",
      message: "What is the updated role?"
    }
  ]).then((response) => {
    db.query("UPDATE employee SET role_id=? WHERE id=?", [response.updateRole, response.empUpdate], function (err, data) {
      if (err) throw err
      cTable(data)
      dbMain();
    })
  })
};

function updateEmployeeMgr() {
  inquirer.prompt([
    {
      name: "empUpdatedMgr",
      type: "input",
      message: "Update which employee's manager?"
    },
    {
      name: "updateMgr",
      type: "input",
      message: "Who is the updated manager?"
    }
  ]).then((response) => {
    db.query("UPDATE employee SET manager_id=? WHERE id=?", [response.updateMgr, response.empUpdatedMgr], function (err, data) {
      if (err) throw err
      cTable(data)
      dbMain();
    })
  })
};
// DELETES

function deleteDepartment() {
  inquirer.prompt([
    {
      name: "dept_name",
      type: "list",
      message: "Which department to delete?",
      choices: department
    }
  ]).then((response) => {
    db.query("DELETE FROM department WHERE id=?", [response.dept_name], function (err, data) {
      if (err) throw err
      cTable(data)
      dbMain();
    })
  })
};

function deleteRole() {
  inquirer.prompt([
    {
      name: "title",
      type: "list",
      message: "Which role to delete?",
      choices: roles
    }
  ]).then((response) => {
    db.query("DELETE FROM roles WHERE id=?", [response.title], function (err, data) {
      if (err) throw err
      cTable(data)
      dbMain();
    })
  })
};

function deleteEmployee() {
  inquirer.prompt([
    {
      name: "empId",
      type: "list",
      message: "Which employee to delete?",
      choices: employee
    }
  ]).then((response) => {
    db.query("DELETE FROM employee WHERE id=?", [response.empId], function (err, data) {
      if (err) throw err
      cTable(data)
      dbMain();
    })
  })
};