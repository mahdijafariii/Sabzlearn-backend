const express = require("express");
const menuController = require("./../controllers/menu");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router.route("/").get(menuController.getAll);
router.route("/").post(authMiddleware, isAdminMiddleware, menuController.create);
router.route("/all").get(authMiddleware, isAdminMiddleware, menuController.getAllInPanel);
router.route("/:id").delete(authMiddleware, isAdminMiddleware, menuController.remove);

module.exports = router;
