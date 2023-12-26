const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    userid: { type: Number, unique: true },
    username: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false }
=======
    username: { type: String, unique: true },
    password: String,
>>>>>>> Stashed changes
});

module.exports = userSchema;
