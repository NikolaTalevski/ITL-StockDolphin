const { Validator } = require("node-input-validator");

const orderPOST = {
    supplier: 'required|string',
    quantity: 'required|string',
    price: 'required|string',
    date: 'date'
};

const orderPUT = {
    supplier: 'string',
    quantity: 'string',
    price: 'string',
    date: 'date'
};

const validate = async(data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if(!e) {
        throw {
            code: 400,
            error: v.errors
        };
    }
};

module.exports = {
    orderPOST,
    orderPUT,
    validate
}