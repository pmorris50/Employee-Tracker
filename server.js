//grabbing packages
const {startQuestion, updateEmployeeRoleQs} = require('./inquirer.js');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const cTable = require('console.table');
const PORT = process.env.PORT || 3001
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //express only needed if hosting (means there is a front end)


const db = mysql.createConnection({
    host: PORT,
    user: 'root',
    password: 'rootroot',
    database: 'company_db'
},
    console.log('Connected to the company_db database')
    
);
// inquirer.prompt({
//     type: 'list',
//     name: 'init',
//     message: 'What Would you like to do?',
//     choices: ['View All Employees', 'Update Employee Role', 'View All Roles', 'View All Departments', 'Add Department', 'Add New Employee','Quit' ]
//   }).then(answer => {
//     console.log(answer.name);
//   });
//write all db.queries inside of .promptstatement

function init(){
inquirer.prompt(startQuestion)
    .then(answer => {
        if (answer.init === 'View All Departments') {
            const sql = 'SELECT DISTINCT name FROM department';
            db.query(sql, (err, results) => {
                if (err) {
                    throw err;
                } else {
                    console.table('Departments', results);
                }
            });
        }
    });
}

init();

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });