const express = require("express")
const router = express.Router()
const LoginService = require("../Services/LoginService")
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        if (!username || !email) { return res.json({ error: "Both the username and the email are required" }) }

        // check to see if the username and the password are in the REST API
        const URL = "http://jsonplaceholder.typicode.com/users"
        const users = await LoginService.getUsersService(URL)
        let flag = false
        let id_jsonplaceholder
        users.forEach((user) => {
            if (user.username == username && user.email == email) {
                flag = true
                id_jsonplaceholder = user.id
            }
        })
        if (flag == false) {
            return res.json({ error: "invalid username / password" })
        }

        const token = jwt.sign({ id: 1 }, "secret")
        return res.json({ success: true, token: token, id_jsonplaceholder: id_jsonplaceholder })

    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

module.exports = router