const offModel = require('../models/off')
const coursesModel = require('../models/course')
const addDiscountValidator = require("../validators/addOff");
const {default: mongoose} = require("mongoose");

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
    const {course} = req.body;
    const {code} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(course);
    if (!isObjectIDValid) {
        return res.status(409).json({
            message: "Course ID is not valid !!",
        });
    }

    const discountCode = await offModel.find({code , course}).lean()
    if(!code){
        return res.status(404).json({
            message : "discount code not found !"
        })
    }
    if(!(String(discountCode.course)===String(course))){
        return res.status(422).json({
            message: "This discount code is not for this course !"
        })
    }
    if(discountCode.uses === discountCode.max){
        return res.status(409).json({
            message : "discount code already used !"
        })
    }
    const updateDiscountCode = await offModel.findOneAndUpdate({code , course},{
        uses : discountCode.uses + 1
    }).lean()
    return res.status(200).json(discountCode)
}
const remove = async (req,res)=>{
    const {id} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIDValid) {
        return res.status(409).json({
            message: "ID is not valid !!",
        });
    }
    const discount = await offModel.findOneAndDelete({_id : id}).lean();
    return res.status(200).json({
        message : "Discount code remove successfully ! ",
        discount
    })
}


module.exports = {getAll , setOnAll , create , getOne , remove}
