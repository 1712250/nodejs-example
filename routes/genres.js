const express = require("express");
const router = express.Router();

// Models
const Genres = require("../models/genres");

router.get("/", (req, res) => {
    res.render("genres");
});

router.post("/", (req, res) => {
    Genres.findOne({ "name": req.body.txtGenre }, (err, genre) => {
        if (err) {
            let newGenre = new Genres({
                name: req.body.txtGenre,
            });
            newGenre.save((err) => {
                if (err) {
                    console.log("Save genre error: " + err);
                    res.json({ status: 400, message: "Save genre error: " + err });
                } else {
                    console.log("Save genre successfully!");
                    res.json({ status: 200, message: "Save genre successfully" });
                }
            });
        } else {
            res.json({ status: 400, message: "Genre is already exist" });
        }
    });
});

module.exports = router;