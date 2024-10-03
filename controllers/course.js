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
        .findOne({href: req.params.href})
        .populate("creator", "-password")
        .populate("categoryID");

    const sessions = await sessionModel.find({course: course._id}).lean();
    const comments = await commentsModel
        .find({course: course._id, isAccept: 1})
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

    // این کار کردیم که کامنت پاسخ بشه زیر مجموعه یکی از خود کامنت ها
    let allComments = [];

    comments.forEach((comment) => {
        comments.forEach((answerComment) => {
            if (String(comment._id) === String(answerComment.mainCommentID)) {
                allComments.push({
                    ...comment, // یعنی کل اطلعات قبلی بریز دوباره + سه پروپرتی جدید که پایین ست کردیم
                    course: comment.course.name,
                    creator: comment.creator.name,
                    answerComment,
                });
            }
        });
    });
    res.json({
        course,
        sessions,
        comments: allComments,
        courseStudentsCount,
        isUserRegisteredToThisCourse,
    });
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

const removeCourse = async (req, res) => {
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isObjectIDValid) {
        return res.status(409).json({
            messgae: "Course ID is not valid !!",
        });
    }

    const deletedCourse = await courseModel.findOneAndRemove({
        _id: req.params.id,
    });

    if (!deletedCourse) {
        return res.status(404).json({
            messgae: "Course not found !!",
        });
    }

    return res.json(deletedCourse);
};

const getRelatedCategory = async (req, res) => {
    const {href} = req.params;
    const course = await courseModel.findOne({href}).lean();
    let relatedCourse = await courseModel.find({categoryId: course.categoryId}).lean()
    relatedCourse = relatedCourse.filter(course => course.href !== href);
    return res.status(200).json(relatedCourse);
} // get all course that related with this course in category

const getPresellCourse = async (req, res)=>{
    const courses = await courseModel.find({status : "presell"}).lean();
    return res.status(200).json({
        message : "This is presell courses",
        courses
    })


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
    getCourseInfo,
    removeCourse,
    getRelatedCategory,
    getPresellCourse
}
