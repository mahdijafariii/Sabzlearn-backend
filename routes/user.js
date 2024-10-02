const controller = require('../controllers/user')
const express = require("express");

const router = express.Router()

router.post('/ban-user' , controller.banUser);

module.exports = router