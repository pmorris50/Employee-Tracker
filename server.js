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
                viewDepartments();
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

            if (answer.init === 'Add Department') {



                inquirer.prompt(addDepartment)
                    .then(answer => {
                        if (answer.add) {
                            // console.log(answer.add)
                            const newDepartment = answer.add
                            const sql4 = `INSERT INTO department (name) VALUES ('${newDepartment}')`
                            const sql5 = `SELECT * FROM department;`
                            db.query(sql4, (err, results) => {
                                if (err) {
                                    throw err;
                                } else {
                                    db.query(sql5, (err, result) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.table('Department', result)
                                        }
                                    }
                                        // console.table('Department', results)
                                    )
                                } return init();
                            })
                        }
                    }
                    )
            }

            if (answer.init === "Add New Employee") {
                const sql = 'SELECT id FROM role'
                let roleIds = []
                db.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        db.query('SELECT id FROM employee', (err, empObject) => {

                            const addNewEmployeeQs = [
                                {
                                    type: 'input',
                                    name: 'firstName',
                                    message: "What is the employee's first name?"

                                },
                                {
                                    type: 'input',
                                    name: 'lastName',
                                    message: "What is the employee's last name?"
                                },
                                {
                                    type: 'list',
                                    name: 'roleID',
                                    message: "What is the employee's role ID",
                                    choices: result.map((obj) => {
                                        return obj.id
                                    })
                                },
                                {
                                    type: 'list',
                                    name: 'managerId',
                                    message: 'What is the ID of this employee manager?',
                                    choices: empObject.map((obj) => {
                                        return obj.id
                                    })
                                }

                            ]

                            inquirer.prompt(addNewEmployeeQs)
                                .then((answer) => {
                                    const firstName = answer.firstName;
                                    const lastName = answer.lastName;
                                    const roleID = answer.roleID;
                                    const managerId = answer.managerId
                                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES ('${firstName}', '${lastName}', ${roleID}, ${managerId})`
                                    db.query(sql, (err, newEmp) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            db.query('SELECT * FROM employee', (err, newTable) => {
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    console.table('Employee', newTable);
                                                } return init();
                                            })

                                        }
                                    })

                                })

                        })



                    }
                })

            }

        })
};
init();

function viewDepartments() {
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

