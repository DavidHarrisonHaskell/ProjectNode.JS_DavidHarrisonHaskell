const UsersService = require("../Services/UsersService")
const jwt = require("jsonwebtoken")

const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        const Users = await UsersService.getAllUsersService()
        return res.json({ success: true, Users: Users })

    } catch (e) {
        return res.json({ success: false, error: e.message })
    }

})

router.post("/Actions", async (req, res) => {

    /* 
    Explanation:
     Posting the id of the user and the time of the action to this will lead to either:
     -  if the user has remaining permitted actions left for that day => an action being deducted from that user's permitted number of actions for the current day
     -  if it is a new day => the resetting of that user's actions and then deducting one action for current day
     -  if no actions are left => the logging out of the user until the next day
    */

    try {
        const token = req.headers["token"]
        if (!token) { return res.json({ success: false, error: "no token provided" }) }

        const decoded = jwt.verify(token, "secret")
        id_jsonplaceholder = req.body.id_jsonplaceholder
        time_and_date = req.body.time_and_date

        const Actions = await UsersService.updateActionsService(id_jsonplaceholder, time_and_date)
        if (Actions.success == false) {
            return res.json({ success: false, error: Actions.error })
        }

        const updateInformation = { "Date_Actions": Actions.result["Date_Actions"], "Variable_Num_Of_Actions": Actions.result["Variable_Num_Of_Actions"] }
        const result = await UsersService.updateInformationService(id_jsonplaceholder, updateInformation)

        return res.json({ success: true, Actions: result })

    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})

module.exports = router