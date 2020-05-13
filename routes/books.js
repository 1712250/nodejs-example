const express = require("express");
const router = express.Router();

// Models
const genres = require("../models/genres");

router.get("/", (req, res) => {
    genres.find((err, items) => {
        if (err) {
            console.log("Get genres error: " + err);
        } else {
            console.log(items);
            res.render("books", {list_genres: items});
        }
    });
});

router.get("/:bookID", (req, res) => {
    genres.find((err, items) => {
        if (err) {
            console.log("Get genres error: " + err);
        } else {
            console.log(items);
            res.render("books", {list_genres: items});
        }
    });
});

module.exports = router;