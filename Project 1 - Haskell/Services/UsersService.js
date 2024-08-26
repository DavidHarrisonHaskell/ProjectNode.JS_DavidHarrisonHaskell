const UsersRepository = require("../Repositories/UsersRepository")
const path = require("path")
const jsonfile = require("jsonfile")

const getAllUsersService = () => {
    return UsersRepository.getAllUsersRepository()
}

const updateActionsService = async (id_jsonplaceholder, time_and_date) => {
    let result = await UsersRepository.updateActionsRepository_Num_of_Actions(id_jsonplaceholder)
    result = result._doc


    const MongoDB_year = result["Date_Actions"].getFullYear()
    const MongoDB_month = result["Date_Actions"].getMonth() + 1
    const MongoDB_day = result["Date_Actions"].getDate()
    const MongoDB_date = `${MongoDB_year}-${MongoDB_month}-${MongoDB_day}`

    time_and_date = new Date(time_and_date)
    const current_year = time_and_date.getFullYear()
    const current_month = time_and_date.getMonth() + 1
    const current_day = time_and_date.getDate()
    const current_date = `${current_year}-${current_month}-${current_day}`
    // Posting the id of the user and the time of the action to this will lead to either:
    // -  if it is the same day as the last action and there are still permitted actions for that day => an action being deducted from that user's permitted number of actions for the current day
    // -  if it is a new day => the resetting of that user's actions and then deducting one action for current day
    // -  if no actions are left => the logging out of the user until the next day


    // prepare a log for the SystemUsersActions.json file to log the actions of the user
    const systemUsersActionsLog = {
        "id": id_jsonplaceholder,
        "maxActions": result["Num Of Actions"],
        "date": `${current_day}/${current_month}/${current_year}`,
        "actionAllowed": result["Variable_Num_Of_Actions"]
    }
    const filePath = path.join(__dirname, "../SystemUsersActions.json")

    // if no actions are left:
    if (result["Variable_Num_Of_Actions"] == 0) {
        // if it is a new day => the resetting of that user's actions and then deducting one action for current day
        if (MongoDB_date !== current_date) {
            result["Variable_Num_Of_Actions"] = result["Num Of Actions"] - 1
            result["Date_Actions"] = time_and_date
            jsonfile.readFile(filePath, (err, obj) => {
                if (err) {
                    console.error(err)
                }
                obj.actions?.push(systemUsersActionsLog)
                jsonfile.writeFile(filePath, obj, { spaces: 2 }) // log the action of the user
            })
            return { success: true, result: result, case: 1 }
        }
        jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                console.error(err)
            }
            obj.actions?.push(systemUsersActionsLog)
            jsonfile.writeFile(filePath, obj, { spaces: 2 }) // log the action of the user
        })
        // the logging out of the user until the next day
        return { success: false, error: "No actions left for today", case: 2 }
    }

    //  if it is a new day => the resetting of that user's actions and then deducting one action for current day
    if (MongoDB_date !== current_date) {
        result["Variable_Num_Of_Actions"] = result["Num Of Actions"] - 1
        result["Date_Actions"] = time_and_date
        await jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                console.error(err)
            }
            obj.actions?.push(systemUsersActionsLog)
            jsonfile.writeFile(filePath, obj, { spaces: 2 }) // log the action of the user
        })
        return { success: true, result: result, case: 3 }
    }

    // if it is the same day as the last action and there are still permitted actions for that day then 
    // an action is deducted from that user's permitted number of actions for the current day
    if (MongoDB_date == current_date) {
        result["Variable_Num_Of_Actions"] = result["Variable_Num_Of_Actions"] - 1
        result["Date_Actions"] = time_and_date
        await jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                console.error(err)
            }
            obj.actions?.push(systemUsersActionsLog)
            jsonfile.writeFile(filePath, obj, { spaces: 2 }) // log the action of the user
        })
        return { success: true, result: result, case: 4 }
    }
}

const updateInformationService = async (id_jsonplaceholder, updateInformation) => {
    const result = await UsersRepository.updateInformationRepository(id_jsonplaceholder, updateInformation)
    return result
}
module.exports = { getAllUsersService, updateActionsService, updateInformationService }