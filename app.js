const express = require('express')

const app = express()


const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require('./routes/auth')

app.use(
    "/courses/covers",
    express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/auth", authRouter);
module.exports = app;