const mongoose = require("mongoose");

const miscSchema = new mongoose.Schema({
    key: { type: String, unique: true, required: true },
    value: {type: String, required: true},
});

module.exports = miscSchema;
