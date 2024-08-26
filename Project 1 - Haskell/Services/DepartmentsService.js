const DepartmentsRepository = require("../Repositories/DepartmentsRepository")
const EmployeesRepository = require("../Repositories/EmployeesRepository")

const getDepartmentsService = async () => {
    const result = await DepartmentsRepository.getDepartmentsRepository()
    //I need to add name and ID of manager as well as name and ID of all Employees in that
    return result
}

const getDepartmentService = async (Department) => {
    const result = await DepartmentsRepository.getDepartmentRepository(Department)
    return result
}

const putDepartmentService = async (Department, body) => {
    // if manager is already a manager somewhere else, remove him from there and leave that department without a manager
    const Departments = await getDepartmentsService()
    if (body.Manager) {
        let theDepartment = Departments.find((department) => department.Manager == body.Manager)

        if (theDepartment !== undefined) {
            DepartmentsRepository.updateDepartmentRepository(theDepartment.Name, { "Manager": "" })
        }
        // When an employee is assigned as the manager of a department, update that manager's DepartmentID in the employees section of the database
        await EmployeesRepository.putEmployeeInformationRepository(body.Manager, { "DepartmentID": Department })
    }

    const result = await DepartmentsRepository.putDepartmentRepository(Department, body)
    return result
}

const postDepartmentService = async (body) => {
    if (body.Name !== "" && body.Manager !== "") {
        // if manager is already a manager somewhere else, remove him from there and leave that department without a manager
        const Departments = await getDepartmentsService()
        let theDepartment = Departments.find((department) => department.Manager == body.Manager)

        if (theDepartment !== undefined) {
            DepartmentsRepository.updateDepartmentRepository(theDepartment.Name, { "Manager": "" })
        }

        // add the new department
        const result = await DepartmentsRepository.postDepartmentRepository(body)

        // When an employee is assigned as the manager of a department, update that manager's DepartmentID in the employees section of the database
        await EmployeesRepository.putEmployeeInformationRepository(body.Manager, { "DepartmentID": result.id })
        return result.message
    }
}

const deleteDepartmentService = async (Department) => {
    const result = await DepartmentsRepository.deleteDepartmentRepository(Department)
    // remove the department from all employees who were associated with it
    let AllEmployees = await EmployeesRepository.getAllEmployeesRepository()
    AllEmployees.forEach(async (employee) => {
        if (employee.DepartmentID == Department) {
            await EmployeesRepository.putEmployeeInformationRepository(employee._id, { "DepartmentID": "" })
        }
    })
    return result
}

module.exports = { getDepartmentsService, getDepartmentService, putDepartmentService, postDepartmentService, deleteDepartmentService }