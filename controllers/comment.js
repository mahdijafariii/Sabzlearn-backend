const courseModel = require('../models/course')
const sessionModel = require('../models/session')
const commentModel = require('../models/comment')
const userModel = require('../models/users')
const { isValidObjectId} = require("mongoose");
const addCourseValidator = require("../validators/addCourse");
const uploader = require('../utils/uploader')
const addCommentValidator = require("../validators/addComment");
const {default : mongoose} = require("mongoose");



const addComment = async (req,res) =>{
    const check = addCommentValidator(req.body)
    if(check !== true){
        return res.status(422).json(check) // use validator for checking api request !
    }
    const {body , courseHref , score} = req.body;
    const course = await courseModel.findOne({href : courseHref} ).lean()
    const comment =await commentModel.create({
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

const deleteComment = async (req,res)=>{
    const {id} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIDValid) {
        return res.status(409).json({
            messgae: "Course ID is not valid !!",
        });
    }
    const comment = await commentModel.findOneAndDelete({_id : id}).lean();
    if(!comment){
        return res.status(404).json({
            message : 'comment not found !'
        })
    }
    return res.status(200).json({
        message : 'comment deleted successfully ! ',
        comment
    })
}

const acceptComment = async (req,res)=>{
    const {id} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIDValid) {
        return res.status(409).json({
            messgae: "Course ID is not valid !!",
        });
    }
    const comment = await commentModel.findByIdAndUpdate({_id : id},{
        isAccept : 1
    }).lean();
    if(!comment){
        return res.status(404).json({
            message : 'comment not found !'
        })
    }
    return res.status(200).json({
        message : 'comment accepted successfully ! ',
        comment
    })
}

const rejectComment = async (req,res)=>{
    const {id} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIDValid) {
        return res.status(409).json({
            messgae: "Course ID is not valid !!",
        });
    }
    const comment = await commentModel.findByIdAndUpdate({_id : id},{
        isAccept : 0
    }).lean();
    if(!comment){
        return res.status(404).json({
            message : 'comment not found !'
        })
    }
    return res.status(200).json({
        message : 'comment rejected successfully ! ',
        comment
    })
}


module.exports = {addComment, deleteComment, acceptComment, rejectComment}