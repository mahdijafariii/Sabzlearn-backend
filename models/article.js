const {default: mongoose} = require('mongoose');

const schema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        href: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true
        },
        publish: {
            type: Number, // 0 -> pre // 1 -> done
            default: 0,
            required: true
        },
    }, {timestamps: true}
);

const model = mongoose.model('Article', schema);

module.exports = model;