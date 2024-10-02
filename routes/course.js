const controller = require('../controllers/course')
const express = require("express");
const authMiddleware = require('../middelware/auth');
const isAdminMiddleware = require('../middelware/isAdmin');

const router = express.Router()
router.route('/add-course').post(authMiddleware,isAdminMiddleware,controller.banUser);


module.exports = router