const userModel = require('../models/users')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next)=>{
    const authHeader = req.header('Authorization')?.split(" ")

    if(authHeader?.length !== 2){
        return res.status(403).json({
            message : "This route is protected and you can,t access it"
        })
    }
    const token = authHeader[1];

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(payload.id ).lean();
        user.password = undefined;
        req.user = user;
        next()
    }
    catch (error) {
        return res.status(500).json({
            message : error
        })
    }
}