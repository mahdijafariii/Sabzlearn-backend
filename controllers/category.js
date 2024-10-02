const categoryModel = require('../models/category')
const addCategoryValidator = require('../validators/addCategory')
const {default : mongoose} = require("mongoose");
const getAll =async (req, res) =>{
    const getAll = await categoryModel.find({}).lean()
    res.status(200).json(getAll);
}
const addCategory =async (req, res) =>{
    const {title , href } = req.body;
    const check = addCategoryValidator(req.body);
    if(!check){
        res.status(422).json({
            message : check
        })
    }
    const category = categoryModel.create({title , href});
    res.status(200).json({
        message : 'Category added successfully !!'
    })
}

const removeCategory =async (req, res) =>{
    const {id} = req.body;
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if(!isValidId){
        return res.status(422).json({
            message : `Id is not valid !!`
        })
    }
    const deleteCategory = await categoryModel.findOneAndDelete({_id : id}).lean();
    res.status(200).json({
        message : `Category with title ${deleteCategory.title} removed successfully !!`
    })
}

const updateCategory =async (req, res) =>{
    const {id , title , href} = req.body;
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if(!isValidId){
        return res.status(422).json({
            message : `Id is not valid !!`
        })
    }
    const category = await categoryModel.findById(id).lean();
    if(!category){
        res.status(404).json({
            message : `Category not found !`
        })
    }
    const updateCategory = await categoryModel.findByIdAndUpdate(id,{
        title,href
    })
    res.status(200).json({
        message : `Category with title ${deleteCategory.title} updated successfully !!`
    })
}


module.exports = {addCategory, getAll ,removeCategory, updateCategory}