const express = require("express");
const articleController = require("./../controllers/article");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");
const multer = require("multer");
const multerStorage = require("./../utils/uploader");
const router = express.Router();


router.route("/").get(articleController.getAll)
router.route("/").post(authMiddleware, isAdminMiddleware, multer({ storage: multerStorage.articleCoverDisk, limits: { fileSize: 100000000 } }).single("cover"), articleController.create);
router.route("/:href").get(articleController.getOne);
router.route("/:id").delete(authMiddleware, isAdminMiddleware,articleController.remove);
//
// router.route("/draft").post(authMiddleware, isAdminMiddleware, multer({ storage: multerStorage.articleCoverDisk, limits: { fileSize: 100000000 } }).single("cover"), articleController.saveDraft);

module.exports = router;
