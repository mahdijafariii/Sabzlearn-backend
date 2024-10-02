const userModel = require('../models/users')
const registerValidator = require('../validators/register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const banUserModel = require("../models/ban_user");
const register =async (req, res) =>{
    const check = registerValidator(req.body)
    if(check !== true){
        return res.status(422).json(check) // use validator for checking api request !
    }
    const {username, name , phone , email , password} = req.body;
    const isBanBefore = await banUserModel.findOne({phone})
    if(isBanBefore){
        return res.status(400).json({
            message : 'this user is ban before'
        })
    }
    const isUserExist = await userModel.findOne({
        $or : [{username} , {email}]}
    )
    if(isUserExist){
        return res.status(400).json({
            message : "this user exist before!"
        })
    };
    const countOfUser = await userModel.countDocuments();
    const hashPassword = await bcrypt.hash(password , 12);

    const user = await userModel.create({
        username,
        name,
        phone,
        email,
        password : hashPassword,
        role : countOfUser > 0 ? "USER" : "ADMIN"
    });
    user.password = undefined;
    const accessToken = jwt.sign({id : user._id},process.env.JWT_SECRET , {
        expiresIn : "7 day"
    })
    return res.status(201).json({user , accessToken});
}
const login =async (req, res) =>{
    const { identifier , password } = req.body;
    const user = await userModel.findOne({
        $or : [{username : identifier} , {email : identifier}]
    }).lean();
    if(!user){
        return res.status(404).json({
            message : 'User not found with this email/username!'
        });
    }
    const passwordValidator = await bcrypt.compare(password,user.password)
    if(!passwordValidator){
        return res.status(422).json({
            message : 'Password is invalid!'
        });
    }

    const accessToken = jwt.sign({id : user._id }, process.env.JWT_SECRET ,{
        expiresIn: '30 days'
    })

    return res.status(200).json({
        message : 'You login successfully',
        accessToken
    });
}
const getMe =async (req, res) =>{
}

module.exports = {register , getMe , login}