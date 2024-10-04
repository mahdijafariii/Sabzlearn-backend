const express = require("express");
const contactsController = require("./../controllers/notification");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router.route("/").post(authMiddleware, isAdminMiddleware, contactsController.createNotification)
router.route('/my').get(authMiddleware, isAdminMiddleware,contactsController.getMyNotification);
router.route("/see/:id").put(authMiddleware, isAdminMiddleware,contactsController.seenNotification);
router.route("/:id").delete(authMiddleware, isAdminMiddleware,contactsController.removeNotification);
router.route("/all").get(authMiddleware, isAdminMiddleware,contactsController.getAllNotification);


module.exports = router;
