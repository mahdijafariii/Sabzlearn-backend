const controller = require('../controllers/user')
const express = require("express");
const authMiddleware = require('../middelware/auth');
const isAdminMiddleware = require('../middelware/isAdmin');

const router = express.Router()
// router.post('/ban-user',controller.banUser)
router.route('/ban-user').post(authMiddleware,isAdminMiddleware,controller.banUser);

module.exports = router