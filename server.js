const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//DB connect
db.connect((err) => {
  if (err) throw err;
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
        'Update employee managers',
        'Delete department',
        'Delete role',
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
        case 'Update employee managers':
          updateEmployeeMgrs();
          break;
        case 'Delete department':
          deleteDept();
          break;
        case 'Delete role':
          deleteRole();
          break;
        case 'Delete employee':
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
  db.query ("SELECT d.dept_name, r.salary, sum(r.salary) AS budget FROM employee e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY d.dept_name, r.salary", function (err, data) {
    if (err) throw err;
    cTable(data)
    dbMain();  
  })
};

// ADDS

function  addDept() {
  // Call inquirer first, then push database
  inquirer.prompt([
    name: 'newDept',
    type: 'input',
    message: 'What department would you like to add'
  ])
  db.query ()
}