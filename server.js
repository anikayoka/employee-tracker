const db = require('./db/connection');
const inquirer = require('inquirer');
require('console.table');

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
        // case 'Update an employee manager':
        //   updateEmployeeMgr();
        //   break;
        // case 'Delete Department':
        //   deleteDepartment();
        //   break;
        // case 'Delete Role':
        //   deleteRole();
        //   break;
        // case 'Delete Employee':
        //   deleteEmployee();
        //   break;
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
    console.table(data)
    dbMain();
  })
}
function viewAllRoles() {
  db.query("SELECT * FROM roles", function (err, data) {
    if (err) throw err;
    console.table(data)
    dbMain();
  })
}
function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    console.table(data)
    dbMain();
  })
};
function viewEmployeesByDept() {
  db.query
    (`SELECT e.first_name, e.last_name, r.title, r.salary, e2.first_name, e2.last_name, d.dept_name FROM employee e LEFT JOIN roles r ON r.id = e.role_id 
    LEFT JOIN department d ON d.id = r.department_id
    LEFT JOIN employee e2 ON e.manager_id = e2.id
    ORDER BY d.dept_name;`, function (err, data) {
      if (err) throw err;
      console.table(data)
      dbMain();
    })
};
function viewDeptBudget() {
  db.query("SELECT d.dept_name, r.salary, sum(r.salary) AS budget FROM employee e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id ORDER BY d.dept_name, r.salary", function (err, data) {
    if (err) throw err;
    console.table(data)
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
      console.table(data)
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
      choices: [
        {name:"IT",value:1},
        {name:"Finance",value:2},
        {name:"Human Resources",value:3},
        {name:"Marketing",value:4},
        {name:"Operations",value:5},
        {name:"Sales",value:6}
      ]
    }
  ]).then((response) => {
    db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [response.newTitle, response.newSalary, response.dept_id], function (err, data) {
      if (err) throw err
      console.table(data)
      dbMain();
    })
  })
};

function addEmployee() {
  inquirer.prompt([
    {
      name: 'eFirstName',
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
      type: 'list',
      message: 'Enter employee role id',
      choices: [
        {name: 'Coordinator, IT', value: 7},
        {name: 'Coordinator, Finance', value: 9},
        {name: 'Coordinator, HR', value: 10},
        {name: 'Coordinator, Marketig', value: 11},
        {name: 'Coordinator, Operations', value: 12},
        {name: 'Coordinator, Sales', value: 13}
      ]
    },
    {
      name: 'mgrId',
      type: 'list',
      message: 'Enter employee manager id',
      choices: [
        {name:'Jelani McLean', value: 1},
        {name:'Tracy Alexander', value: 2},
        {name:'Sean James', value: 3},
        {name:'Andrea Hodge', value: 4},
        {name:'Mark Harrison', value: 5},
        {name:'Lyris Christian', value: 6}
      ]

    }
  ]).then((response) => {
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.eFirstName, response.eLastName, response.roleId, response.mgrId], function (err, data) {
      if (err) throw err
      console.table(data)
      dbMain();
    })
  })
};

// UPDATE

function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: "empUpdate",
      type: "list",
      message: "Update which employee's role?",
      choices: [
        {name: 'Jelani McLean', value: 1},
        {name: 'Tracy Alexander', value: 2},
        {name: 'Sean James', value: 3},
        {name: 'Andrea Hodge', value: 4},
        {name: 'Mark Harrison', value: 5},
        {name: 'Lyris Christian', value: 6},
        {name: 'Quincy Jones', value: 19}
      ]
    },
    {
      name: "updateRole",
      type: "list",
      message: "What is the updated role?",
      choices: [
        {name: 'Manager IT', value: 1},
        {name: 'Manager Finance', value: 2},
        {name: 'Manager HR', value: 3},
        {name: 'Manager Maketing', value: 4},
        {name: 'Manager Opeations', value: 5},
        {name: 'Manage Sales', value: 6},
        {name: 'Coordinator, IT', value: 7},
        {name: 'Coordinator, Finance', value: 9},
        {name: 'Coordinator, HR', value: 10},
        {name: 'Coordinator, Marketing', value: 11},
        {name: 'Coordinator, Operations', value: 12},
        {name: 'Coordinator, Sales', value: 13}
      ]
    }
  ]).then((response) => {
    db.query("UPDATE employee SET role_id=? WHERE id=?", [response.updateRole, response.empUpdate], function (err, data) {
      if (err) throw err
      console.table(data)
      dbMain();
    })
  })
};

function updateEmployeeMgr() {
  inquirer.prompt([
    {
      name: "empUpdatedMgr",
      type: "list",
      message: "Update which employee's manager?",
      choices: employee
    },
    {
      name: "updateMgr",
      type: "input",
      message: "Who is the new manager?"
    }
  ]).then((response) => {
    db.query("UPDATE employee SET manager_id=? WHERE id=?", [response.updateMgr, response.empUpdatedMgr], function (err, data) {
      if (err) throw err
      console.table(data)
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
      console.table(data)
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
      console.table(data)
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
      console.table(data)
      dbMain();
    })
  })
};