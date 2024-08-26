const EmployeesModel = require("../Models/EmployeesModel")
const DepartmentsModel = require("../Models/DepartmentsModel")
const ShiftsModel = require("../Models/ShiftsModel")


const getAllEmployeesRepository = () => {
    return EmployeesModel.find({})
}

const getAllDepartmentsRepository = () => {
    return DepartmentsModel.find({})
}

const getAllShiftsRepository = () => {
    return ShiftsModel.find({})
}

const getEmployeeInformationRepository = (id) => {
    return EmployeesModel.findById(id)
}

const deleteEmployeeInformationRepository = (id) => {
    return EmployeesModel.findByIdAndDelete(id)
}

const putEmployeeInformationRepository = (id, body) => {
    return EmployeesModel.findByIdAndUpdate(id, body)
}

const postEmployeeRepository = async (EmployeeInformation) => {
    const newEmployee = new EmployeesModel(EmployeeInformation)
    await newEmployee.save()
    return "Employee Successfully Added"

}


module.exports = { getAllEmployeesRepository, getAllDepartmentsRepository, getAllShiftsRepository, getEmployeeInformationRepository, deleteEmployeeInformationRepository, putEmployeeInformationRepository, postEmployeeRepository }