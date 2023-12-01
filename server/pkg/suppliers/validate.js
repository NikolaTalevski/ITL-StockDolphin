const { Validator } = require("node-input-validator");

const supplierPOST = {
    address: 'required|string',
    phonenumber: 'required|number',
    email: 'required|string'
};

const supplierPUT = {
    address: 'required|string',
    phonenumber: 'required|number',
    email: 'required|string'
};

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
    supplierPOST,
    supplierPUT,
    validate
}