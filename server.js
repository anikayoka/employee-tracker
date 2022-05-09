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
      name: 'choices',
      type: 'list',
      message: 'Welcome to CBC employee database. What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ])
}