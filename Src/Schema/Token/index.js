const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    user: { type: Number, required: true },
    permissions: {type: [String], required: true},
});

module.exports = tokenSchema;
