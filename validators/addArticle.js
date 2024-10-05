const Validator = require("fastest-validator");
const {default: mongoose} = require("mongoose");

const v = new Validator();

const schema = {
    title: { type: "string", min: 5, max: 255 },
    description: { type: "string", min: 5, max: 255 },
    body: { type: "string", min: 10, max: 255 },
    href: { type: "string", min: 2, max: 255 },
    categoryId: { type: "string", min: 2, max: 255 },
    publish: { type: "number" },
};


const check = v.compile(schema);

module.exports = check;