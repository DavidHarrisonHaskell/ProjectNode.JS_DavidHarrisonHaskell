const EmployeesService = require("../Services/EmployeesService")
const EmployeesRespository = require("../Repositories/EmployeesRepository")

const jwt = require("jsonwebtoken")

const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Employees = await EmployeesService.getAllEmployeesService()
        return res.json({ success: true, Employees: Employees })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const EmployeeInformation = req.body
        const Employee = await EmployeesService.postEmployeeService(EmployeeInformation)
        return res.json({ success: true, Employee: Employee })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})


router.get("/Information", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Information = await EmployeesService.getInformationService()
        return res.json({ success: true, Information: Information })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.get("/Information/:id", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const id = req.params.id

        const Employee = await EmployeesService.getEmployeeInformationService(id)
        return res.json({ success: true, Employee: Employee })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.put("/Information/:id", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const id = req.params.id
        const body = req.body
        const Employee = await EmployeesService.putEmployeeInformationService(id, body)
        return res.json({ success: true, Employee: Employee })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.delete("/Information/:id", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const id = req.params.id

        const Employee = await EmployeesService.deleteEmployeeInformationService(id)
        return res.json({ success: true, Employee: Employee })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})


router.get("/Shifts", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Shifts = await EmployeesService.getShiftsService()
        return res.json({ success: true, Shifts: Shifts })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

// router.get("/Department", async (req,res) => {
//     try {
//         const token = req.headers["token"]
//         if (!token) { return res.json({ success: false, error: "no token provided" }) }

//         const decoded = jwt.verify(token, "secret")
//         const DepartmentInformation = await EmployeesService.getEmployeeDepartmentInformationService()
//     } catch (e) {
//         return res.json({success: false, error: e.message})
//     }
// })

module.exports = router