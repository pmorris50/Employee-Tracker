//grabbing packages
const { startQuestion, updateEmployeeRoleQs, addDepartment } = require('./inquirer.js');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const cTable = require('console.table');
const PORT = process.env.PORT || 3001
const app = express();
//app.use(express.json());
//app.use(express.urlencoded({ extended: true })); //express only needed if hosting (means there is a front end)


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'company_db'
},

    console.log('Connected to the company_db database')
    //init();
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

function init() {
    inquirer.prompt(startQuestion)
        .then(answer => {
            if (answer.init === 'View All Departments') {
                const sql1 = 'SELECT DISTINCT name FROM department;';
                db.query(sql1, (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table('Departments', results);

                    }

                    init();
                });
            }
            if (answer.init === 'View All Employees') {
                const sql2 = 'SELECT DISTINCT first_name, last_name FROM employee;';
                db.query(sql2, (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table('Employees', results)
                    }
                    return init();
                })
            }
            if (answer.init == 'View All Roles') {
                sql3 = 'SELECT DISTINCT title FROM role;';
                db.query(sql3, (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.table('Roles', results)
                    }
                    return init();
                })
            }
            if (answer.init == 'Quit') {
                return init();
                //finish later. I want to exit inquirer
            }

            if(answer.init = 'Add Department'){
                //const userInput = answer.init;
                sql4 = `INSERT INTO (name) VALUES ('${userInput}');`
                db.query(sql4, (err, results) =>{
                    if(err){
                        throw err;
                    } else {
                        console.table('Departments', results);
                    }
                })
            }
        });
}
init();

function addDepartmentQs(){
    inquirer.prompt(addDepartment)
    .then(answer.add)
}
