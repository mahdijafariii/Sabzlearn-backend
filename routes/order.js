const express = require("express");
const orderController = require("./../controllers/order");
const authMiddleware = require("../middelware/auth");

const router = express.Router();

router.route("/").get(authMiddleware, orderController.getAll)
router.route('/:id').get(authMiddleware,orderController.getOne);

module.exports = router;
