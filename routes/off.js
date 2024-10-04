const express = require("express");
const contactsController = require("./../controllers/off");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router.route("/").get(authMiddleware, isAdminMiddleware, contactsController.getAll)
router.route('/').post(authMiddleware, isAdminMiddleware,contactsController.create);
router.route("/all").post(authMiddleware, isAdminMiddleware,contactsController.setOnAll);

// router.route("/:code").post(authMiddleware, contactsController.getOne);
// router.route("/:id").delete(authMiddleware, contactsController.remove);

module.exports = router;
