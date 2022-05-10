const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//DB connect
connection.connect((err) => {
  if (err) throw err;
  dbMain();
});

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
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'View employees by department': viewEmployeesByDepartment();
          break;
        case 'View department budget':
          viewDepartmentBudget();
          break;
        case 'Add department':
          addDepartment();
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
          updateEmployeeManager();
          break;
        case 'Delete department':
          deleteDepartment();
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