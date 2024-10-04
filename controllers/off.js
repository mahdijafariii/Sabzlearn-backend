const offModel = require('../models/off')
const coursesModel = require('../models/course')
const addDiscountValidator = require("../validators/addOff");

const getAll = async (req,res)=>{
    const offs = await offModel.find({}).lean().populate("course", "name href").populate("creator", "name");
    return res.status(201).json(offs);
}
const setOnAll = async (req,res)=>{
    const {discount} = req.body
    const courses = await coursesModel.updateMany({discount});
    return res.status(200).json({
        message : "Discount set for all courses !"
    })
}
const create = async (req,res)=>{
    const {code , percent , course , max } = req.body;
    const check = addDiscountValidator(req.body)
    if (check !== true) {
        return res.status(422).json(check)
    }
    const discount = await offModel.create({
        code,percent,course,max,creator : req.user._id
    })
    return res.status(200).json({
        discount,
        message: 'discount code created successfully !'
    })
}
const getOne = async (req,res)=>{


}
const remove = async (req,res)=>{


}
const temp = async (req,res)=>{


}

module.exports = {getAll , setOnAll , create}
