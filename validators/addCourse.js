const Validator = require("fastest-validator");
const {default: mongoose} = require("mongoose");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255 },
    description: { type: "string", min: 10, max: 400 },
    support: { type: "string", min: 3, max: 255 },
    price: { type: "string", min: 0 },
    status: { type: "string", min: 3, max: 255 },
    discount: { type: "string", min: 0, max: 100 },
    href: { type: "string", min: 3, max: 100 },
    categoryId: { type: "string"},
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;