const axios = require("axios")

const getUsersRepository = async (URL) => {
    const {data: users} = await axios.get(URL)
    return users
}

module.exports = { getUsersRepository }