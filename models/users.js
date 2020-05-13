const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
        required: true
    },
    inventory: [{ book_id: mongoose.Types.ObjectId, current_has: Number }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Users", usersSchema);