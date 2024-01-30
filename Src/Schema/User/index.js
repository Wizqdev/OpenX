const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userid: { type: Number, unique: true },
    username: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false }
});

module.exports = userSchema;
