const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: String,
        full_name: String,
        address: String,
        created_on: { type: Date, default: Date.now },
    }
)

module.exports =  mongoose.model('users', UserSchema);;