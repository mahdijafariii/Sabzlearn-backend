const contactModel = require('../models/contact')
const {default : mongoose} = require("mongoose");
const addCommentValidator = require("../validators/addComment");

const getAll = async (req,res)=>{
    const contacts = await contactModel.find({}).lean();
    return res.status(201).json(contacts)
}

const remove = async (req,res)=>{
    const {id} = req.body;

    const isObjectIDValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIDValid) {
        return res.status(409).json({
            messgae: "ID is not valid !!",
        });
    }
    const contact = await contactModel.findOneAndDelete({_id : id}).lean()
    return res.status(201).json({
        message : "Contact deleted successfully !",
    });
}

const create = async (req,res)=>{
    const {name , email , phone , body} = req.body;
    const check = addCommentValidator(req.body)
    if (check !== true) {
        return res.status(422).json(check)
    }
    const contact = await contactModel.create({
        name,email,phone,body , answer : 0
    })
    return res.status(200).json({
        message : "Contacts send successfully !",
    })



}

const answer = async (req,res)=>{


}


module.exports = {getAll, remove , create}