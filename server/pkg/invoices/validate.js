const { Validator } = require("node-input-validator");

const invoicePOST = {
    name: 'required|string',
    supplier: 'required|string',
    date: 'date',
    orders: 'required|string'
};

const invoicePUT = {
    name: 'string',
    supplier: 'string',
    date: 'date',
    orders: 'string'
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
    invoicePOST,
    invoicePUT,
    validate
};