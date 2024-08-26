const mongoose = require("mongoose")

const DepartmentsSchema = new mongoose.Schema({
    "Name": String,
    "Manager": String
}, {
    collection: "departments",
    versionKey: false
})

module.exports = mongoose.model("departments", DepartmentsSchema)