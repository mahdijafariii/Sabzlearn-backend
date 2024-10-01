const app = require('./app')
require('dotenv').config()
const mongoose = require("mongoose");

(async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('db is connected')
})()

app.listen(process.env.PORT, () => {
    console.log(`server listen on port ${process.env.PORT}`)
})
