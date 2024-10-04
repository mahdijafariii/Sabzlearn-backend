const offModel = require('../models/off')
const coursesModel = require('../models/course')

const getAll = async (req,res)=>{
    const offs = await offModel.find({}).lean();
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


}
const getOne = async (req,res)=>{


}
const remove = async (req,res)=>{


}
const temp = async (req,res)=>{


}
