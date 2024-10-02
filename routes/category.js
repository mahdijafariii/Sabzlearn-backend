const express = require('express')
const authMiddleware = require('../middelware/auth');
const isAdminMiddleware = require('../middelware/isAdmin');

const controller = require('../controllers/category')

const router = express.Router()

router.route('/add-category').post(authMiddleware,isAdminMiddleware,controller.addCategory);
router.route('/get-categories').get(authMiddleware,isAdminMiddleware,controller.getAll);
router.route('/remove-category').delete(authMiddleware,isAdminMiddleware,controller.removeCategory);
router.route('/update-category').put(authMiddleware,isAdminMiddleware,controller.updateCategory);


module.exports = router