const express = require("express");
const coursesController = require("./../controllers/course");
const multer = require("multer");
const multerStorage = require("./../utils/uploader");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router
    .route("/add-course")
    .post(
        multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
            "cover"
        ),
        authMiddleware,
        isAdminMiddleware,
        coursesController.addCourse
    );

router.route('/:id/add-session').post(authMiddleware,isAdminMiddleware,coursesController.creatSession)

router.route('/:id/get-course-sessions').get(authMiddleware,isAdminMiddleware,coursesController.getCourseSessions)

router.route('/get-course-sessions').get(authMiddleware,isAdminMiddleware,coursesController.getAllSessions)

router.route('/:href/session-info/:sessionId').get(authMiddleware,isAdminMiddleware,coursesController.getSessionInfo)



module.exports = router;
