const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    code: { type: "string", min: 2, max: 255 },
    percent: { type: "number"},
    course: { type: "string", min: 3, max: 100 },
    max: { type: "number", min: 3, max: 100 },
    uses: { type: "number", min: 3, max: 100 },
    creator: { type: "string", min: 3, max: 100 },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;