const userModel = require('../models/users')
const registerValidator = require('../validators/register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const register =async (req, res) =>{
    const check = registerValidator(req.body)
    if(check !== true){
        return res.status(422).json(check) // use validator for checking api request !
    }
    const {username, name , phone , email , password} = req.body;
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


}
const getMe =async (req, res) =>{


}

module.exports = {register , getMe , login}