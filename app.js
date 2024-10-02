const express = require('express')

const app = express()


const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const courseRouter = require('./routes/course')




app.use(
    "/courses/covers",
    express.static(path.join(__dirname, "public", "courses", "covers"))
); // middleware for upload cover of course in this dir
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/user",userRouter)
app.use("/category",categoryRouter)
app.use("/course",courseRouter)


module.exports = app;