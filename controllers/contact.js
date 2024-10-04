const contactModel = require('../models/contact')
const {default : mongoose} = require("mongoose");

const getAll = async (req,res)=>{
    const contacts = await contactModel.find({}).lean();
    res.status(201).json(contacts)
}

const remove = async ()=>{

}

const create = async ()=>{
    const {} = req.body;


}

const answer = async ()=>{

}


module.exports = {}