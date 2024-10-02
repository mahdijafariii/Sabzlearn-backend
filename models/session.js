const {default: mongoose} = require('mongoose');

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
        course: {
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        }
    }, {timestamps: true}
);

const model = mongoose.model('Session', schema);

module.exports = model;