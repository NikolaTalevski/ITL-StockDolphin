const { Validator } = require("node-input-validator");

const categoryPOST = {
    name: 'required|string',
    image: 'string'
};

const categoryPUT = {
    name: 'required|string',
    image: 'string'
};

const validate = async(data, schema) => {
    let v = new Validator(data, schema);
    let e = await v.check();
    if(!e) {
        throw {
            code: 400,
            error: v.errors
        };
    }
};

module.exports = {
    categoryPOST,
    categoryPUT,
    validate
}