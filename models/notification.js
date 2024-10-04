const {default: mongoose} = require('mongoose');

const schema = mongoose.Schema({
        message: {
            type: String,
            required: true
        },
        admin: {
            type: mongoose.Types.ObjectId,
            ref : "User",
            required: true
        },
        seen: {
            type: Number, // 0 -> false // 1 -> true
            default : 0,
            required: true
        },
    }, {timestamps: true}
);

const model = mongoose.model('Session', schema);

module.exports = model;