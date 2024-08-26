const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    "Full Name": String,
    "Num Of Actions": Number,
    "id_jsonplaceholder": Number,
    "Date_Actions": Date,
    "Variable_Num_Of_Actions": Number,

}, { collection: "users" })

module.exports = mongoose.model("users", UsersSchema)