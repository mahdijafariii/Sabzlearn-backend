const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    departmentID: { type: "string"},
    departmentSub: { type: "string"},
    priority: { type: "number", min: 0, max: 3 },
    body: { type: "string", min: 0 },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
