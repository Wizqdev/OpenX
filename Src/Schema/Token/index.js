const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
<<<<<<< Updated upstream
    user: { type: Number, required: true },
=======
>>>>>>> Stashed changes
    permissions: {type: [String], required: true},
});

module.exports = tokenSchema;
