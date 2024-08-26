const ShiftsPageModel = require("../Models/ShiftsModel")

const getAllShiftsRepository = () => {
    return ShiftsPageModel.find({})
}

const putShiftsRepository = async (id, body) => {
    const result = await ShiftsPageModel.findByIdAndUpdate(id, body)
    return result
}

const postShiftRepository = async (body) => {
    const newShift = new ShiftsPageModel(body)
    await newShift.save()
    return "The Shift has been successfully posted"
}

module.exports = { getAllShiftsRepository, putShiftsRepository, postShiftRepository }