const router = require("express").Router();
const books = require("./books");
const genres = require("./genres");
const auth = require("./auth");

router.get("/", (req, res) => {
    res.render("home");
});

router.use("/books", books);
router.use("/genres", genres);
router.use("/api/user", auth);

module.exports = router;