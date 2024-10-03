const express = require('express')
const authMiddleware = require('../middelware/auth');
const isAdminMiddleware = require('../middelware/isAdmin');

const controller = require('../controllers/comment')

const router = express.Router()

router.route('/add-comment').post(authMiddleware,controller.addComment);
router.route('/get-comments').get(authMiddleware,controller.addComment);
router.route('/remove-comment').delete(authMiddleware,controller.addComment);
router.route('/update-comment').put(authMiddleware,controller.addComment);


module.exports = router