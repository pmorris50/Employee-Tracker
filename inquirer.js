const startQuestion = [{
    type: 'list',
    name: 'init',
    message: 'What Would you like to do?',
    choices: ['View All Employees', 'Update Employee Role', 'View All Roles', 'View All Departments', 'Add Department', 'Add New Employee', 'Quit']
}];
const addDepartment = [
    {
        type: 'input',
        name: 'add',
        message: 'What is the name of department you want to add?'
    }


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
//     {
//         type: 'list',
//         name: 'roleID',
//         message: "What is the employee's role ID"
//         choices: //variables for what role_id's are avaliable per etable
//     }
 ]

module.exports = {
    startQuestion: startQuestion, updateEmployeeRoleQs: updateEmployeeRoleQs,
    addDepartment: addDepartment
}

