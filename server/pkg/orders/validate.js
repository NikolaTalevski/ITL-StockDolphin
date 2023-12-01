const { Validator } = require("node-input-validator");

const orderPOST = {
    supplier: 'required|string',
    quantity: 'required|number',
    price: 'required|number',
    date: 'required|date'
};

const orderPUT = {
    supplier: 'required|string',
    quantity: 'required|number',
    price: 'required|number',
    date: 'required|date'
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