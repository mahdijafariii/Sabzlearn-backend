const banUserModel = require('../models/ban_user')
const userModel = require('../models/users')
const { isValidObjectId} = require("mongoose");

const banUser =async (req,res)=>{
    const {id}  = req.body;
    const user = await userModel.findOne({_id : id}).lean();
    if(!user){
        return res.status(404).json({
            message : 'User not found ! '
        })
    }
    const isBanBefore = await banUserModel.findOne({phone : user.phone})
    if(isBanBefore){
        return res.status(400).json({
            message : 'this user is ban before'
        })
    };
    const ban = await banUserModel.create({
        phone : user.phone
    });
    return res.status(200).json({
        message : 'User ban successfully'
    })
}

const getAll = async (req,res)=>{
    const users = await userModel.find({});
    res.status(201).json({
        users
    })
}

const deleteUser = async (req,res)=>{
    const isValidUserid = isValidObjectId(req.query.id);
    if(!isValidUserid){
        return res.status(422).json({
            message : "User id is not valid !"
        });
    }
    const id = req.query.id;
    const deleteUser = await userModel.findByIdAndDelete(id).lean();
    if(!deleteUser){
        return res.status(404).json({
            message : "User not found !"
        });
    }
    return res.status(200).json({
        message : "User delete successfully !"
    });
}

const changeRole = async (req ,res) =>{
    const { id } = req.body;
    const user = await userModel.findById(id).lean();

    let newRole =  user.role === "ADMIN" ? "USER" : "ADMIN";
}

module.exports = {banUser, getAll, deleteUser}
