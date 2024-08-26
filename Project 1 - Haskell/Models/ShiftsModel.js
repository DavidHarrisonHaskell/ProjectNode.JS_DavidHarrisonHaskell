const mongoose = require("mongoose")

const ShiftsSchema = new mongoose.Schema({
    "Date": Date,
    "Starting Hour": Number,
    "Ending Hour": Number
}, {
    collection: "shifts",
    versionKey: false
})

module.exports = mongoose.model("shifts", ShiftsSchema)