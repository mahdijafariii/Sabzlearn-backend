const articleModel = require('../models/article')
const {default : mongoose} = require("mongoose");
const addCommentValidator = require("../validators/addComment");
const nodemailer = require('nodemailer');
const addCategoryValidator = require("../validators/addCategory");

const getAll = async (req,res) =>{
    const articles = await articleModel.find({}).lean();
    return res.status(201).json(articles);
}
const create = async (req,res) =>{
    const {title , body , description , categoryId, href } = req.body;
    const check = addCategoryValidator(req.body);
    if(!check){
        return res.status(422).json({
            message : check
        })
    }
    const article = await articleModel.create({
        title,
        description,
        body,
        href,
        cover : req.file.filename,
        categoryId,
        publish : 1,
        creator : req.user._id
    })
    return res.status(201).json({
        message : 'article saved successfully !'
    })
}
const getOne = async (req,res) =>{
    const {href} = req.params;
    const articles = await articleModel.find({href}).lean()
    return res.status(200).json(articles);
}
const remove = async (req,res) =>{
    const {id} = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if(!isValidId){
        return res.status(422).json({
            message : `Id is not valid !!`
        })
    }
    const deleteArticle = await articleModel.findByIdAndDelete(id).lean();
    return res.status(200).json({
        message : `Article deleted successfully ! `,
        articleModel
    })
}
const saveDraft = async (req,res) =>{
    const {title , body , description , categoryId, href } = req.body;
    const check = addCategoryValidator(req.body);
    if(!check){
        return res.status(422).json({
            message : check
        })
    }
    const article = await articleModel.create({
        title,
        description,
        body,
        href,
        cover : req.file.filename,
        categoryId,
        publish : 0,
        creator : req.user._id
    })
    return res.status(201).json({
        message : 'article saved successfully !'
    })
}

module.exports = {getAll, create , getOne , saveDraft , remove}
