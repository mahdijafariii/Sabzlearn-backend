const banUserModel = require('../models/ban_user')
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
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
    const isValidUserid = isValidObjectId(id);
    if(!isValidUserid){
        return res.status(422).json({
            message : "User id is not valid !"
        });
    }
    const user = await userModel.findById(id).lean();
    if(!user){
        return res.status(404).json({
            message : `User not found !`
        })
    }
    let role = user.role;
    let newRole =  user.role === "ADMIN" ? "USER" : "ADMIN";
    user.role = newRole;
    const updatedUser = await userModel.findByIdAndUpdate(id,{role : newRole}).lean();
    return res.status(200).json({
        message : `user ${updatedUser.name} role changed from ${role} to ${newRole}`
    })

}

const updateInfo = async (req,res)=>{
    const {name , email , username , password ,phone } = req.body;

    const userExistWithEmail = await userModel.find({email}).lean();
    if(userExistWithEmail && (userExistWithEmail._id !== req.user._id)){
        return res.status(400).json({
            message : "We have user with this email choose another email !"
        });
    }
    const userExistWithUsername = await userModel.find({username}).lean();
    if(userExistWithUsername && (userExistWithUsername._id !== req.user._id)){
        return res.status(400).json({
            message : "We have user with this username choose another username !"
        });
    }

    const hashPassword = await bcrypt.hash(password , 12);

    const updateUser = await userModel.findByIdAndUpdate({_id :req.user._id} , {
        name , email , username , password : hashPassword , phone
    })
    updateUser.password = undefined;

    return res.status(200).json({
        message : "user update successfully ! "
    })

}

module.exports = {banUser, getAll, deleteUser, changeRole ,updateInfo}
