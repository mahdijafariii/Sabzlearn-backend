const Validator = require("fastest-validator");
const {default: mongoose} = require("mongoose");

const v = new Validator();

const schema = {
    body: { type: "string", min: 5, max: 255 },
    phone: { type: "string", min: 5, max: 255 },
    email: { type: "string", min: 5, max: 255 },
    name: { type: "string", min: 2, max: 255 },
};

const check = v.compile(schema);

module.exports = check;