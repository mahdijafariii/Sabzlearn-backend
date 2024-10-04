const express = require("express");
const contactsController = require("./../controllers/contact");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router.route("/").get(authMiddleware, isAdminMiddleware, contactsController.getAll)
router.route('/').post(contactsController.create);
router.route("/:id").delete(authMiddleware, isAdminMiddleware,contactsController.remove);

router.route("/answer").post(authMiddleware, isAdminMiddleware, contactsController.answer);

module.exports = router;
