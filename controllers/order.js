const course_userModel = require('../models/course-user')
const {default: mongoose} = require("mongoose");

const getAll = async (req,res)=>{
    const getAllOrders = await course_userModel.find({user : req.user._id}).lean();
    return res.status(200).json(getAllOrders);
}
const getOne = async (req,res)=>{
    const {id} = req.params;
    const order = await course_userModel.findOne({_id : id}).lean();
    return res.status(200).json(order);
}

module.exports = {getAll ,getOne}