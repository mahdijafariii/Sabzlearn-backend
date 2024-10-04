const contactModel = require('../models/contact')
const {default : mongoose} = require("mongoose");
const addCommentValidator = require("../validators/addComment");
const nodemailer = require('nodemailer');

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
    const {answer , userEmail} = req.body;
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : "your email",
            pass : "your pass ! , but is not your password that you login in your email account"
        },
    })

    const mailOptions = {
        from : "email you want sent email with",
        to : userEmail,
        subject : "این ایمیل از سمت ما فرستاده شده است ",
        text : answer
    }

    transporter.sendMail(mailOptions , async (error , info) =>{
        if (error){
            return res.status.json({
                message : error
            })
        }
        else {
            const contact = await contactModel.findOneAndUpdate({email : userEmail} , {
                answer : 1
            })
            return res.status.json({
                message : 'email send successfully'
            })
        }

    })


}


module.exports = {getAll, remove , create ,answer}