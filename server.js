//grabbing packages
const { startQuestion, updateEmployeeRoleQs, addDepartment } = require('./inquirer.js');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const cTable = require('console.table');
const { listenerCount } = require('process');
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

);


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
                process.exit();

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
            if (answer.init == 'Add New Role') {
                const sql = 'SELECT DISTINCT department_id FROM role;';
                let departmentIds = [];
                db.query(sql, (err, roleObj) => {
                    const addNewRole = [
                        {
                            type: 'input',
                            name: 'title',
                            message: 'What is the new role?'
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the Salary? Please enter a numerical value.'
                        },
                        {
                            type: 'list',
                            name: 'departmentId',
                            message: "what is the new role's department ID?",
                            choices: roleObj.map((obj) => {
                                return obj.department_id
                                //console.log(roleObj)
                            })
                        }
                    ]

                    inquirer.prompt(addNewRole)
                        .then((answer) => {
                            const title = answer.title;
                            const salary = answer.salary;
                            const departmentId = answer.departmentId;
                            const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${departmentId});`
                            db.query(sql, (err, newRole) => {
                                if (err) {
                                    throw err;
                                } else {
                                    db.query('SELECT DISTINCT * FROM role', (err, newRoleTable) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.table('Role', newRoleTable);
                                            init();
                                        }
                                    })
                                }
                            })
                        })

                })
            }
            if (answer.init == 'Update Employee Role') {

                const sql = `SELECT CONCAT(first_name, ' ', last_name) AS "full_name"
                FROM employee;`

                let fullName = []
                db.query(sql, (err, results) => {
                    if (err) {
                        throw err
                    } else {
                        const whichEmp = [
                            {
                                type: 'list',
                                name: 'empName',
                                message: 'Which Employee needs a new role?',
                                choices: results.map((obj) => {
                                    return obj.full_name
                                    //  console.log(obj.full_name)
                                })
                            }
                        ]
                        inquirer.prompt(whichEmp)
                            .then((answer) => {
                                const employee = answer.empName
                                db.query('SELECT DISTINCT id FROM ROLE;', (err, roleIds) => {
                                    // console.log(roleIds);
                                    const updateWhichRole = [
                                        {
                                            type: 'list',
                                            name: 'roles',
                                            message: "Select the employee's new role",
                                            choices: roleIds.map((obj) => {
                                                return obj.id
                                            })
                                        }
                                    ]
                                    inquirer.prompt(updateWhichRole)
                                        .then((answer) => {
                                            const newRole = answer.roles
                                            db.query('SELECT * FROM employee', (err, newEmployeeTable) => {
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    db.query(`UPDATE employee SET role_id = ${newRole}
                                                    WHERE first_name LIKE '${employee}%`, (err, final)=>{
                                                         //console.table('employee', final)
                                                         db.query('SELECT * FROM employee', (err, final2)=>{
                                                              console.table('employee', final2);
                                                              return init();
                                                          })
                                                      // console.table('Employee', final);
                                                       //return init();
                                                    })
                                                    //console.table('Employee', newEmployeeTable)
                                                  //  return init();
                                                }
                                            })
                                        })
                                })
                                // console.log(employee);
                            })
                        // console.log(results);  
                    }


                })
            }

        })
}
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
};

