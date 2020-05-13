const router = require("express").Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidator, loginValidator } = require("./utils/validator");

const SALT_ROUNDS = 10;

function hash(pass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, SALT_ROUNDS, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        })
    });
}

router.post("/register", async (req, res) => {
    let err = await registerValidator(req.body);
    if (err) {
        res.json({ status: 400, message: err });
    } else {
        let hashPassword = await hash(req.body.password);
        Users.findOne({ "email": req.body.email }, (err, user) => {
            if (err) {
                let user = new Users({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword
                });
                user.save((err) => {
                    if (err) {
                        console.log("Create user error: " + err);
                        res.json({ status: 400, message: "Create user error: " + err });
                    } else {
                        console.log("Create user successfully!");
                        res.json({ status: 200, message: "Create user successfully" });
                    }
                });
            } else {
                res.json({ status: 400, message: "Email is already exist", result: user });
            }
        });
    }
});

router.post("/login", async (req, res) => {
    let err = await loginValidator(req.body);
    if (err) {
        res.json({ status: 400, message: err });
    } else {
        Users.findOne({ "email": req.body.email }, (err, user) => {
            if (err) {
                res.json({ status: 400, message: "Email is not found" });
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        res.json({ status: 400, message: err });
                    }
                    if (!result) {
                        res.json({ status: 400, message: "Password is incorrect" });
                    }
                    const authToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY);
                    res.header('auth-token', authToken).send(authToken);
                });
            }
        });
    }
});

module.exports = router;