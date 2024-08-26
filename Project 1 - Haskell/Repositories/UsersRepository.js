const UsersPageModel = require("../Models/UsersModel")

const getAllUsersRepository = () => {
    return UsersPageModel.find({})
}

const updateActionsRepository_Num_of_Actions = async (the_id_jsonplaceholder) => {
    let result = await UsersPageModel.findOne({ id_jsonplaceholder: the_id_jsonplaceholder })
    return result
}

const updateInformationRepository = async (the_id_jsonplaceholder, updateInformation) => {
    await UsersPageModel.findOneAndUpdate({ id_jsonplaceholder: the_id_jsonplaceholder }, updateInformation)
    return "Updated"
}


module.exports = { getAllUsersRepository, updateActionsRepository_Num_of_Actions, updateInformationRepository }