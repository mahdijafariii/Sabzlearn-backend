const ticketModel = require("../models/ticket")
const Department = require("../models/department")
const departmentSubModel = require("../models/department-sub")

const getAll = async (req,res) =>{
    const getAllTickets = await ticketModel.find({}).populate("Department").populate("DepartmentSub").lean();
    return res.status(200).json(getAllTickets);
}

const create = async (req,res) =>{

}

const userTickets = async (req,res) =>{

}

const departments = async (req,res) =>{

}

const departments_sub = async (req,res) =>{

}

const setAnswer = async (req,res) =>{

}

const getOne = async (req,res) =>{

}

const getAnswer = async (req,res) =>{

}