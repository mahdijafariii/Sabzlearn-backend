const notificationModel = require('../models/notification')
const {default : mongoose} = require("mongoose");
const addNotificationValidator = require("../validators/addNotification");

const createNotification = async (req,res) =>{
    const {message , admin } = req.body;
    const check = addNotificationValidator(req.body)
    if (check !== true) {
        return res.status(422).json(check)
    }
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(admin);
    if (!isObjectIDValid) {
        return res.status(409).json({
            message: "admin ID is not valid !!",
        });
    }
    const notification = await notificationModel.create({
        message,admin
    })
    return res.status(200).json({
        message : "notification send successfully !",
    })
}
const getNotification = async (req,res) =>{
    const {adminId} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(admin);
    if (!isObjectIDValid) {
        return res.status(409).json({
            message: "admin ID is not valid !!",
        });
    }
    const notifications = await notificationModel.find({admin : adminId} ).lean();
    return res.status(200).json(notifications);
}
const seenNotification = async (req,res) =>{

}
module.exports = {}