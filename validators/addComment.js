const Validator = require("fastest-validator");
const {default: mongoose} = require("mongoose");

const v = new Validator();

const schema = {
    body: { type: "string", min: 5, max: 255 },
    course: { type: "string"},
    creator: { type: "string"},
    mainCommentID: { type: "string"},
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;