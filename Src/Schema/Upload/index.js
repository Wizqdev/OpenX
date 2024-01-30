const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    type: {type: String, required: true},
    user: { type: Number, required: true },
    size: { type: Number, required: true},
    uploadTime: { type: Date, default: Date.now }
});

module.exports = uploadSchema;
