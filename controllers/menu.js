const addMenuValidator = require("../validators/addMenu");
const menuModel = require("../models/menu")
const {default: mongoose} = require("mongoose");
const offModel = require("../models/off");
const getAll = async (req,res)=>{
    const menus = await menuModel.find({}).lean();

    menus.forEach((menu) => {
        const submenus = [];
        for (let i = 0; i < menus.length; i++) {
            const mainManu = menus[i];
            if (mainManu.parent?.equals(menu._id)) {
                submenus.push(menus.splice(i, 1)[0]);
                i = i - 1;
            }
        }
        menu.submenus = submenus;
    });
    return res.status(200).json(menus);
}
const create = async (req,res)=>{
    const {href , parent , title} = req.body;
    const check = addMenuValidator(req.body)
    if (check !== true) {
        return res.status(422).json(check)
    }
    const menu = await menuModel.create({
        href,parent,title
    })
    return res.status(200).json(menu)
}
const getAllInPanel = async (req,res)=>{
    const menus = await menuModel.find({}).lean();
    return res.status(200).json(menus);
}
const remove = async (req,res)=>{
    const {id} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIDValid) {
        return res.status(409).json({
            message: "ID is not valid !!",
        });
    }
    const discount = await menuModel.findOneAndDelete({_id : id}).lean();
    return res.status(200).json({
        message : "menu removed successfully ! ",
        discount
    })
}

module.exports = {getAll , getAllInPanel , remove , create}