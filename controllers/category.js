const categoryModel = require('../models/category')
const getAll =async (req, res) =>{
    const getAll = await categoryModel.find({}).lean()
    res.status(200).json(getAll);
}
const addCategory =async (req, res) =>{

}

const removeCategory =async (req, res) =>{

}

const updateCategory =async (req, res) =>{

}


module.exports = {addCategory, getAll ,removeCategory, updateCategory}