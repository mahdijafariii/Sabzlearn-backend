const express = require('express')

const app = express()


const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const courseRouter = require('./routes/course');
const commentRouter = require('./routes/comment')
const contactRouter = require('./routes/contact')
const notificationRouter = require("./routes/notification");
const offRouter = require("./routes/off");
const articleRouter = require("./routes/article");
const orderRouter = require("./routes/order");
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
app.use('/comment' , commentRouter)
app.use('/contact',contactRouter)
app.use('/notification',notificationRouter)
app.use('/off',offRouter)
app.use('/article',articleRouter)
app.use('/order',orderRouter)



module.exports = app;