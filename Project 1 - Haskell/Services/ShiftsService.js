const ShiftsPageRepository = require("../Repositories/ShiftsRepository")

const getAllShiftsService = () => {
    return ShiftsPageRepository.getAllShiftsRepository()
}

const putShiftsService = async (id, body) => {
    const result = await ShiftsPageRepository.putShiftsRepository(id, body)
    return result
}

const postShiftService = async (body) => {
    const result = await ShiftsPageRepository.postShiftRepository(body)
    return result
}

module.exports = { getAllShiftsService, putShiftsService, postShiftService }


