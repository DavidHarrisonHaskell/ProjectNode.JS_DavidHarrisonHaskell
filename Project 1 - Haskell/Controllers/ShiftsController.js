const ShiftsPageService = require("../Services/ShiftsService")
const jwt = require("jsonwebtoken")

const express = require("express")
const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Shifts = await ShiftsPageService.getAllShiftsService()
        return res.json({ success: true, Shifts: Shifts })

    } catch (e) {
        return res.json({ success: false, error: e.message })
    }

})

router.put("/:id", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const id = req.params.id
        const body = req.body
        const Shift = await ShiftsPageService.putShiftsService(id, body)
        return res.json({ success: true, Shift: Shift })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const body = req.body
        const Shift = await ShiftsPageService.postShiftService(body)
        return res.json({ success: true, Shift: Shift })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

module.exports = router

