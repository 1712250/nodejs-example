const express = require("express");
const path = require("path");
const http = require('http');

require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'client')));

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
const indexRouter = require("./server/routes/index")
app.use("/api", indexRouter);

const port = process.env.PORT || 3000;
// app.listen(port, () => console.log("Listening on port " + port));
http.createServer(app).listen(port, () => console.log("Listening on port " + port));



