const {default : mongoose} = require('mongoose');

const schema = new mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref : "Course",
        required: true,
    },
    user: {
        type:  mongoose.Types.ObjectId,
        ref : "User",
        required: true,
    },
    price : {
        type : Number,
        required : true,
    },

}, {timestamps: true});

const model = mongoose.model('CourseUser',schema)

module.exports = model