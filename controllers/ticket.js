const ticketModel = require("../models/ticket")
const department = require("../models/department")
const departmentSubModel = require("../models/department-sub")
const addTicketValidator = require("../validators/addTicket");
const {default: mongoose} = require("mongoose");

const getAll = async (req,res) =>{
    const getAllTickets = await ticketModel.find({}).populate("departmentID").populate("departmentSub").populate("course" , "name").lean();
    return res.status(200).json(getAllTickets);
}

const create = async (req,res) =>{
    const {departmentID, departmentSub, priority, body, course } = req.body;
    const check = addTicketValidator(req.body)
    if (check !== true) {
        return res.status(422).json(check)
    }
    const ticket = await ticketModel.create({
        departmentID, departmentSub, priority, body, user : req.user._id , answer : 0, course
    })
    return res.status(200).json(ticket);
}

const userTickets = async (req,res) =>{
    const userTickets = await ticketModel.find({user : req.user._id}).populate("departmentID").populate("departmentSub").lean();
    return res.status(200).json(userTickets);
}

const departments = async (req,res) =>{
    const getAllDepartments = await department.find({}).lean();
    return res.status(200).json(getAllDepartments);
}

const departments_sub = async (req,res) =>{
    const {id} = req.params;
    const isObjectIDValid = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectIDValid) {
        return res.status(409).json({
            message: "ID is not valid !!",
        });
    }
    const subDepartments = await departmentSubModel.find({parent : id}).populate("Department").lean();
    return res.status(200).json(subDepartments);
}

const setAnswer = async (req,res) =>{

}

const getOne = async (req,res) =>{

}

const getAnswer = async (req,res) =>{

}

module.exports = {getAnswer, getAll , getOne , setAnswer, departments_sub , departments, userTickets , create}