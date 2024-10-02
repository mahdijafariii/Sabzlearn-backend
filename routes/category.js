const express = require('express')

const controller = require('../controllers/auth')

const router = express.Router()

router.post('/add-category' , controller.register);
router.post('/getAll' , controller.login);

module.exports = router