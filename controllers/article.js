const articleModel = require('../models/article')
const {default : mongoose} = require("mongoose");
const addCommentValidator = require("../validators/addComment");
const nodemailer = require('nodemailer');

const getAll = async (req,res) =>{
    const articles = await articleModel.find({}).lean();
    return res.status(201).json(articles);
}
const create = async (req,res) =>{


}
const getOne = async (req,res) =>{


}
const remove = async (req,res) =>{


}
const saveDraft = async (req,res) =>{


}

