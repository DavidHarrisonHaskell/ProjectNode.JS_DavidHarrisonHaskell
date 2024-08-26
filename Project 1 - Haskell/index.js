const express = require("express")

const app = express()
const cors = require("cors")
require("./Configs/configsMongoDB")

app.use(express.json())
app.use(cors())

const LoginController = require("./Controllers/LoginController")
app.use("/auth", LoginController)

const EmployeesController = require("./Controllers/EmployeesController")
app.use("/Employees", EmployeesController)

const UsersController = require("./Controllers/UsersController")
app.use("/Users", UsersController)

const DepartmentsController = require("./Controllers/DepartmentsController")
app.use("/Departments", DepartmentsController)

const ShiftsController = require("./Controllers/ShiftsController")
app.use("/Shifts", ShiftsController)

const port = 8000
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`)
})

