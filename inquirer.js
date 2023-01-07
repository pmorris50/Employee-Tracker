const startQuestion = [{
    type: 'list',
    name: 'init',
    message: 'What Would you like to do?',
    choices: ['View All Employees', 'Update Employee Role', 'View All Roles', 'View All Departments', 'Add Department', 'Add New Employee', 'Add New Role', 'Quit']
}];
const addDepartment = [
    {
        type: 'input',
        name: 'add',
        message: 'What is the name of department you want to add?'
    },
 



]
const updateEmployeeRoleQs = [{
    type: 'list'

},
{

}
]
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

 ]
 const addNewRole = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the new role?'
    }, 
    {
        type: 'input',
        name: 'salary',
        message: 'What is the Salary? Please enter a numerical value.' 
    }
 ]

module.exports = {
    startQuestion: startQuestion, updateEmployeeRoleQs: updateEmployeeRoleQs,
    addDepartment: addDepartment
}

