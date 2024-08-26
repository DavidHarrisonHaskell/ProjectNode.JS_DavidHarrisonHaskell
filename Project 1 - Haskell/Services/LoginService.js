LoginRepository = require("../Repositories/LoginRepository")

const getUsersService = (URL) => {
    return LoginRepository.getUsersRepository(URL)
}

module.exports = { getUsersService }