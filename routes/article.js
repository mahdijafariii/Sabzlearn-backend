const express = require("express");
const articleController = require("./../controllers/article");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();


router.route("/").get(articlesController.getAll)
router.route("/").post(authMiddleware, isAdminMiddleware, multer({ storage: multerStorage, limits: { fileSize: 100000000 } }), articlesController.create);
router.route("/:href").get(articlesController.getOne);

router.route("/:id").delete(authMiddleware, isAdminMiddlewarearticlesController.remove);

router.route("/draft").post(authMiddleware, isAdminMiddleware, multer({ storage: multerStorage, limits: { fileSize: 100000000 } }), articlesController.saveDraft);

module.exports = router;
