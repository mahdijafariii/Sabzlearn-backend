const express = require("express");
const coursesController = require("./../controllers/course");
const multer = require("multer");
const multerStorage = require("./../utils/uploader");
const authMiddleware = require("../middelware/auth");
const isAdminMiddleware = require("../middelware/isAdmin");

const router = express.Router();

router.route("/add-course").post(
        multer({ storage: multerStorage.coverDisk, limits: { fileSize: 1000000000 } }).single("cover"),
        authMiddleware,
        isAdminMiddleware,
        coursesController.addCourse
    );
router.route('/:id/register').post(authMiddleware,coursesController.registerCourse)

router.route('/:href/').post(authMiddleware,coursesController.getRelationCourse)

router.route("/:href/course-info").get(coursesController.getCourseInfo);

router.route("/:id").delete(authMiddleware, isAdminMiddleware, coursesController.removeCourse);

router.route("/related/:href").get(coursesController.getRelatedCategory)

router.route("/presell").get(coursesController.getPresellCourse)

router.route('/:id/add-session').post(authMiddleware,isAdminMiddleware,coursesController.creatSession)

router.route('/:id/get-course-sessions').get(coursesController.getCourseSessions)

router.route('/get-all-sessions').get(coursesController.getAllSessions)

router.route('/:href/session-info/:sessionId').get(coursesController.getSessionInfo)

router.route('/sessions/:sessionId').delete(authMiddleware,isAdminMiddleware,coursesController.deleteSession)

router.route("/all-courses").get(coursesController.getAllCourses);

module.exports = router;
