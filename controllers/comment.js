const courseModel = require('../models/course')
const sessionModel = require('../models/session')
const commentModel = require('../models/comment')
const userModel = require('../models/users')
const { isValidObjectId} = require("mongoose");
const addCourseValidator = require("../validators/addCourse");
const uploader = require('../utils/uploader')
const addCommentValidator = require("../validators/addComment");
const mongoose = require("mongoose");



const addComment = async (req,res) =>{
    const check = addCommentValidator(req.body)
    if(check !== true){
        return res.status(422).json(check) // use validator for checking api request !
    }
    const {body , courseHref , score} = req.body;
    const course = await courseModel.findOne({href : courseHref} ).lean()
    const comment = commentModel.create({
        body,
        course : course._id,
        creator : req.user._id,
        isAccept : 0,
        isAnswer :0 , // show as public
        score
    })

    return res.status(200).json({
        message : 'comment added successfully ! ',
        comment
    })
}

module.exports = {addComment}