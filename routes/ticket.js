const express = require("express");
const ticketController = require("./../controllers/ticket");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router.route("/").get(authMiddleware,isAdminMiddleware, ticketController.getAll)
router.route("/").post(authMiddleware,isAdminMiddleware, ticketController.create)
router.route("/user").get(authMiddleware, ticketController.userTickets)
router.route("/departments").get(ticketController.departments)
router.route("/departments/:id/subs/").get(ticketController.departments_sub)
router.route("/answer").post(authMiddleware,isAdminMiddleware, ticketController.setAnswer)
router.route("/user/:id").get(authMiddleware, ticketController.getOne)
router.route('/answer/:id').get(authMiddleware,ticketController.getAnswer);

module.exports = router;
