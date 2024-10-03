const express = require('express')
const authMiddleware = require('../middelware/auth');
const isAdminMiddleware = require('../middelware/isAdmin');

const controller = require('../controllers/comment')

const router = express.Router()

router.route('/add-comment').post(authMiddleware,controller.addComment);
router.route('/:id/').delete(authMiddleware,isAdminMiddleware,controller.deleteComment);
router.route('/:id/accept').put(authMiddleware,isAdminMiddleware,controller.acceptComment);
router.route('/:id/reject').put(authMiddleware,isAdminMiddleware,controller.rejectComment);
router.route('/:id/answer').post(authMiddleware,isAdminMiddleware,controller.rejectComment);



module.exports = router