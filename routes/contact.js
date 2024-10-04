const express = require("express");
const contactsController = require("./../../controllers/v1/contact");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const router = express.Router();

router.route("/").get(authMiddleware, isAdminMiddleware, contactsController.getAll)
router.route('/').post(contactsController.create);
router.route("/:id").delete(contactsController.remove);

router.route("/answer").post(authMiddleware, isAdminMiddleware, contactsController.answer);

module.exports = router;
