const banUserModel = require('../models/ban_user')
const userModel = require('../models/users')
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

module.exports = {banUser}
