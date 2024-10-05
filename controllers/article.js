const contactModel = require('../models/article')
const {default : mongoose} = require("mongoose");
const addCommentValidator = require("../validators/addComment");
const nodemailer = require('nodemailer');

