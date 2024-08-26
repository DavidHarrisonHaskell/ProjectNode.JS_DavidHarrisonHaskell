const EmployeesRespository = require("../Repositories/EmployeesRepository")
const DepartmentsRepository = require("../Repositories/DepartmentsRepository")

const getAllEmployeesService = () => {
    return EmployeesRespository.getAllEmployeesRepository()
}

const getShiftsService = async () => {
    let Shifts = await EmployeesRespository.getAllShiftsRepository()
    return Shifts
}

const putEmployeeInformationService = async (id, body) => {
    const status = EmployeesRespository.putEmployeeInformationRepository(id, body)
    //check to see if that employee is a manager. If the employee is a manager, replace that manager field with an empty string
    if ('DepartmentID' in body) {
        let Departments = await DepartmentsRepository.getDepartmentsRepository()
        let theDepartment = Departments.find((department) => department.Manager == id)
        if (theDepartment !== undefined) {
            DepartmentsRepository.putDepartmentRepository(theDepartment._id, { "Manager": "" })
        }
    }
    return status
}

const postEmployeeService = async (EmployeeInformation) => {
    const status = await EmployeesRespository.postEmployeeRepository(EmployeeInformation)
    return status
}

const getInformationService = async () => {
    let Departments = await EmployeesRespository.getAllDepartmentsRepository()
    let Employees = await getAllEmployeesService()
    let Shifts = await EmployeesRespository.getAllShiftsRepository()

    // for each employee, Full Name, Department, list of shifts
    let Information = Employees.map((Employee) => {
        let Employee_Information = {}

        let Full_Name = `${Employee["First Name"]} ${Employee["Last Name"]}`
        let Department = Departments.find((department) => Employee.DepartmentID == department._id)
        const DepartmentName = Department?.Name
        let list_of_Shifts = Employee.ShiftsID.map((Shift) => {
            let the_shift = Shifts.find((a_shift) => a_shift._id == Shift)
            let shift_year = the_shift?.Date.getUTCFullYear()
            let shift_month = the_shift?.Date.getUTCMonth() + 1
            let shift_day = the_shift?.Date.getUTCDate()
            let shift_information = `${shift_year}-${shift_month}-${shift_day}: ${the_shift?.["Starting Hour"]} to ${the_shift?.["Ending Hour"]}`
            return shift_information
        })

        Employee_Information["Full Name"] = Full_Name
        Employee_Information["Department"] = DepartmentName
        Employee_Information["List of Shifts"] = list_of_Shifts
        Employee_Information["id"] = Employee._id

        return Employee_Information
    })



    return Information//Departments: Departments, Employees: Employees, Shifts: Shifts, Information: Information }
}

const getEmployeeInformationService = async (id) => {
    let Employee = await EmployeesRespository.getEmployeeInformationRepository(id)

    // find the updated department
    let Departments = await EmployeesRespository.getAllDepartmentsRepository()
    let Department = Departments.find((department) => Employee.DepartmentID == department._id)

    // find the Shift names for the given id
    let Shifts = await EmployeesRespository.getAllShiftsRepository()
    let list_of_Shifts = Employee.ShiftsID.map((Shift) => {
        let the_shift = Shifts.find((a_shift) => a_shift._id == Shift)
        let shift_year = the_shift.Date.getUTCFullYear()
        let shift_month = the_shift.Date.getUTCMonth() + 1
        let shift_day = the_shift.Date.getUTCDate()
        let shift_information = [`${shift_year}-${shift_month}-${shift_day}`, `${the_shift["Starting Hour"]} to ${the_shift["Ending Hour"]}`]
        return shift_information
    })

    return { Employee: Employee, Department: Department, list_of_Shifts: list_of_Shifts }
}

const deleteEmployeeInformationService = async (id) => {
    let response = await EmployeesRespository.deleteEmployeeInformationRepository(id)
    // get all of the departments and check if the id matches any one of the department's manager's id. If the id does match,
    // then update the manager's id to be an empty string
    let Departments = await EmployeesRespository.getAllDepartmentsRepository()
    let Department = Departments.find((department) => department.Manager == id)
    if (Department !== undefined) {
        DepartmentsRepository.updateDepartmentRepository(Department.Name, { "Manager": "" })
    }
    return response
}

module.exports = { getAllEmployeesService, getShiftsService, getInformationService, getEmployeeInformationService, deleteEmployeeInformationService, putEmployeeInformationService, postEmployeeService }