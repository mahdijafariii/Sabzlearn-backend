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
    const {title , body , description , categoryId, href ,publish} = req.body;
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
        publish,
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


}
const saveDraft = async (req,res) =>{


}

module.exports = {getAll, create , getOne , saveDraft , remove}
