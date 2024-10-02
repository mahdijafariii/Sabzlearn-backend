const mongoose = require('mongoose');

const schema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        free: {
            type: Number, // 0 -> false // 1 -> true
            required: true
        },
        video: {
            type: String,
            required: true
        },
    }, {timestamps: true}
);

const model = mongoose.model('Category', schema);

module.exports = model;