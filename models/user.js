const mongoose = require("../config/db");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    memberId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema, "users");