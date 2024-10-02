const controller = require('../controllers/user')
const express = require("express");
const authMiddleware = require('../middelware/auth');
const isAdminMiddleware = require('../middelware/isAdmin');

const router = express.Router()
// router.post('/ban-user',controller.banUser)
router.route('/ban-user').post(authMiddleware,isAdminMiddleware,controller.banUser);
router.route('/users').get(authMiddleware,isAdminMiddleware,controller.getAll);
router.route('/delete/').delete(authMiddleware,isAdminMiddleware,controller.deleteUser);
router.route('/change-role').post(authMiddleware,isAdminMiddleware,controller.changeRole);
router.route('/update-info').put(authMiddleware,controller.updateInfo)


module.exports = router