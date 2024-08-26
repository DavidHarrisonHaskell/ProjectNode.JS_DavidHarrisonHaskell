const mongoose = require("mongoose")

const EmployeesSchema = new mongoose.Schema({
    "First Name": String,
    "Last Name": String,
    "Start Work Year": Number,
    "DepartmentID": String,
    "ShiftsID": [String]
}, {
    collection: 'employees',
    versionKey: false
})

module.exports = mongoose.model("employees", EmployeesSchema)