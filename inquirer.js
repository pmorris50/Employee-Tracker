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

module.exports = { startQuestion: startQuestion, updateEmployeeRoleQs: updateEmployeeRoleQs,
addDepartment: addDepartment
}

