const mongoose = require("mongoose");

const embedSchema = new mongoose.Schema({
    userid: { type: Number, unique: true, required: true },
    title: {type: String, required: true},
    color: {type: String, required: true},
    description: {type: String, required: true},
    footer: {type: String, required: true}
});

module.exports = embedSchema;
