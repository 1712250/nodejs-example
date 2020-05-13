const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    name: String,
    genres_id: [{ type: mongoose.Types.ObjectId }],
    reviews: [{ type: mongoose.Types.ObjectId }]
});

module.exports = mongoose.model("Books", booksSchema);