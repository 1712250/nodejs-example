const express = require("express");
const app = express();
const path = require("path");

require('dotenv').config();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(path.join(__dirname, 'public')));

// Body-parser
app.use(express.json());

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("MongoDB connected error!");
    } else {
        console.log("MongoDB connected successfully!");
    }
});

// Routes 
const home = require("./routes/")
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port " + port));



