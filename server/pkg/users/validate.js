const { Validator } = require("node-input-validator");

const UserSignUp = {
    username: 'required|string',
    email: 'required|string',
    password: 'required|string'
}

const UserLogin = {
    username: 'required|string',
    email: 'required|string',
    password: 'required|string'
}

const UserPasswordReset = {
    email: 'required|string',
    old_password: 'required|string',
    new_password: 'required|string'
}

const validate = async(data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if(!e) {
        throw {
            code: 400,
            error: v.errors,
        };
    }
};

module.exports = {
    UserSignUp,
    UserLogin,
    validate,
    UserPasswordReset
}