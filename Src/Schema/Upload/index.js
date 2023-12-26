const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    type: {type: String, required: true},
    user: { type: Number, required: true }
});

module.exports = uploadSchema;
