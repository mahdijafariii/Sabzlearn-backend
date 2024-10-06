const {default :mongoose} = require("mongoose");

const schema = mongoose.Schema(
    {
        departmentID: {
            type: mongoose.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        departmentSub : {
            type: mongoose.Types.ObjectId,
            ref: "DepartmentSub",
            required: true,
        },
        priority :{
            type : Number, // 1 2 3
            required : true,
        },
        body : {
            type : String,
            required : true,
        },
        user : {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isAnswer : {
            type : Number, // 0 1
            required : true
        },
        course : {
            type: mongoose.Types.ObjectId,
            ref: "Course",
        },
        parent : {
            type: mongoose.Types.ObjectId,
            ref: "Ticket",
        } // with this we can find that this ticket is answered ticket or not  ...
    },
    { timestamps: true }
);

const model = mongoose.model("Ticket", schema);

module.exports = model;
