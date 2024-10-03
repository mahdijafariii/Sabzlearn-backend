const courseModel = require('../models/course')
const sessionModel = require('../models/session')
const userModel = require('../models/users')
const courseUser = require('../models/course-user');
const {isValidObjectId} = require("mongoose");
const addCourseValidator = require("../validators/addCourse");
const uploader = require('../utils/uploader')

const addCourse = async (req, res) => {
    const check = addCourseValidator(req.body)
    if (check !== true) {
        return res.status(422).json(check)
    }
    const {name, description, support, price, status, discount, href, categoryId} = req.body;
    const validCategoryId = isValidObjectId(categoryId);
    if (!validCategoryId) {
        return res.status(422).json({
            message: "Category Id is not valid !"
        });
    }
    const validCreatorId = isValidObjectId(req.user._id);
    if (!validCreatorId) {
        return res.status(422).json({
            message: "Creator Id is not valid !"
        });
    }
    const course = await courseModel.create({
        name,
        description,
        cover: req.file.filename,
        support,
        price,
        status,
        discount,
        href,
        categoryId,
        creator: req.user._id
    })
    return res.status(200).json({
        message: "Course added successfully !"
    });
}

const creatSession = async (req, res) => {
    const {title, free, time} = req.body;
    const {id} = req.params;

    const session = await sessionModel.create({
        title,
        time,
        free,
        video: "Video.mp4", // req.file.filename
        course: id,
    });

    return res.status(201).json(session);
}

const getCourseSessions = async (req, res) => {
    const {id} = req.params;
    const validCourseId = isValidObjectId(id);
    if (!validCourseId) {
        return res.status(422).json({
            message: "Course Id is not valid !"
        });
    }
    const sessions = await sessionModel.find({course: id}).lean();
    res.status(200).json(sessions)
}

const getCourseInfo = async (req, res) => {
    const course = await courseModel
        .findOne({ href: req.params.href })
        .populate("creator", "-password")
        .populate("categoryID");

    const sessions = await sessionModel.find({ course: course._id }).lean();
    const comments = await commentsModel
        .find({ course: course._id, isAccept: 1 })
        .populate("creator", "-password")
        .lean();

    const courseStudentsCount = await courseUserModel
        .find({
            course: course._id,
        })
        .count();

    const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
        user: req.user._id,
        course: course._id,
    }));

    res.json({ course, sessions, comments, courseStudentsCount ,isUserRegisteredToThisCourse});
};

const getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}).lean();
    res.status(200).json(sessions)
}


const getSessionInfo = async (req, res) => {
    const course = await courseModel.findOne({href: req.params.href})
    const session = await sessionModel.findOne({_id: req.params.sessionId})
    const sessions = await sessionModel.find({course: course._id});
    res.status(200).json({session, sessions})
}

const deleteSession = async (req, res) => {
    const {sessionId} = req.params;
    const validCourseId = isValidObjectId(sessionId);
    if (!validCourseId) {
        return res.status(422).json({
            message: "Course Id is not valid !"
        });
    }
    const session = await sessionModel.findOneAndDelete({_id: sessionId})
    if (!session) {
        return res.status(404).json({
            message: 'session not found !!'
        })
    }
    return res.status(200).json({
        message: 'session deleted successfully !',
        session
    })
}

const registerCourse = async (req, res) => {
    const {id} = req.params;
    const validCourseId = isValidObjectId(id);
    if (!validCourseId) {
        return res.status(422).json({
            message: "Course Id is not valid !"
        });
    }

    const isUserRegistered = await courseUser.find({course: id, user: req.user._id,}).lean();
    if (!isUserRegistered) {
        return res.status(422).json({
            message: "User Registered before !"
        });
    }
    const user_course = await courseUser.create({
        course: id,
        user: req.user._id,
        price: req.body.price,
    })
    return res.status(200).json({
        message: "registered successfully !",
        user_course
    });

}

const getRelationCourse = async (req, res) => {
    const {href} = req.params;
    const course = await courseModel.find({href}).lean();
    return res.status(200).json(course);

}


module.exports = {
    addCourse,
    creatSession,
    getCourseSessions,
    getAllSessions,
    getSessionInfo,
    deleteSession,
    registerCourse,
    getRelationCourse,
    getCourseInfo
}
