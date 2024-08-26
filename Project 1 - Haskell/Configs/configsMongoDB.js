const mongoose = require("mongoose")
// connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/FirstProject").then(() => console.log("connected to DB"))