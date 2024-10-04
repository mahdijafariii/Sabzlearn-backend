const express = require("express");
const contactsController = require("./../controllers/notification");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router.route("/").post(authMiddleware, isAdminMiddleware, contactsController.createNotification)
router.route('/:adminId').get(authMiddleware, isAdminMiddleware,contactsController.getNotification);
router.route("/see/:id").put(authMiddleware, isAdminMiddleware,contactsController.seenNotification);

module.exports = router;
