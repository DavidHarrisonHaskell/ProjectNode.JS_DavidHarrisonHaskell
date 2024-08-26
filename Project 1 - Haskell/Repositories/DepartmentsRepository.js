const DepartmentsModel = require("../Models/DepartmentsModel")

const getDepartmentsRepository = async () => {
    const result = await DepartmentsModel.find({})
    return result
}

const getDepartmentRepository = async (Department) => {
    const result = await DepartmentsModel.findById(Department)
    return result
}

// the following is used to update a Department
const putDepartmentRepository = async (Department, body) => {
    const result = await DepartmentsModel.findByIdAndUpdate(Department, body)
    return "Updated"
}

// the following is used to erase a manager from a Department in the event that he was removed as an employee
const updateDepartmentRepository = async (Department, body) => {
    const result = await DepartmentsModel.findOneAndUpdate({ Name: Department }, body)
    return result
}

// to add a department
const postDepartmentRepository = async (body) => {
    const newDepartment = new DepartmentsModel(body)
    await newDepartment.save()
    // return the id of the newDepartment as a string so the selected manager's DepartmentID will become updated eventually
    const result = { "message": "Department Successfully added", "id": newDepartment._id.toString() }
    return result
}

const deleteDepartmentRepository = async (Department) => {
    await DepartmentsModel.findByIdAndDelete(Department)
    return "The Department was deleted"
}

module.exports = { getDepartmentsRepository, getDepartmentRepository, updateDepartmentRepository, putDepartmentRepository, postDepartmentRepository, deleteDepartmentRepository }