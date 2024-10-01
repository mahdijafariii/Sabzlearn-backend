const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
    name: { type: "string", min: 3, max: 255 },
    username: { type: "string", min: 3, max: 100 },
    phone: { type: "string" },
    email: { type: "email", min: 10, max: 100 },
    password: { type: "string", min: 8, max: 24 },
    confirmPassword: { type: "equal", field: "password" },
    $$strict: true,
};

const check = v.compile(schema);

module.exports = check;