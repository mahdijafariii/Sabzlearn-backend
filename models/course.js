const {default : mongoose} = require('mongoose');

const schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        cover: {
            type: String, // 0 -> false // 1 -> true
            required: true
        },
        support: {
            type: String,
            required: true
        },
    href: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required :true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref : 'User',
        required: true
    },
    }, {timestamps: true}
);

schema.virtuals('sessions',{
    localField: '_id',
    ref : 'Session',
    foreignFiled : 'course'
})

schema.virtuals('comments',{
    localField: '_id',
    ref : 'Comment',
    foreignFiled : 'course'
})


const model = mongoose.model('Course', schema);

module.exports = model;
