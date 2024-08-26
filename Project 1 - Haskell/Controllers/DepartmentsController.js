const DepartmentsService = require("../Services/DepartmentsService")
const jwt = require("jsonwebtoken")

const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const DepartmentsInformation = await DepartmentsService.getDepartmentsService()
        return res.json({ success: true, Departments: DepartmentsInformation })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ sucess: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const body = req.body
        const PostDepartment = await DepartmentsService.postDepartmentService(body)
        return res.json({ success: true, Department: PostDepartment })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.get("/:Department", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Department = req.params.Department
        const DepartmentInformation = await DepartmentsService.getDepartmentService(Department)
        return res.json({ success: true, Department: DepartmentInformation })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.put("/:Department", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ sucess: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Department = req.params.Department
        const body = req.body
        const UpdatedDepartment = await DepartmentsService.putDepartmentService(Department, body)
        return res.json({ success: true, Department: UpdatedDepartment })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.delete("/:Department", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ sucess: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Department = req.params.Department
        const DeletedDepartment = await DepartmentsService.deleteDepartmentService(Department)
        return res.json({ success: true, Department: DeletedDepartment })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})



module.exports = router