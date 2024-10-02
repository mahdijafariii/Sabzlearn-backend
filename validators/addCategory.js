const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255 },
    href: { type: "string", min: 3, max: 100 },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;