const orders = require("../../../pkg/orders/orders");
const {
    orderPOST,
    orderPUT,
    validate
} = require("../../../pkg/orders/validate");

const getAllOrdersHandler = async(req, res) => {
    try{
        const ord = await orders.getAllOrders(req.auth.id);
        return res.status(200).send(ord);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const getOneOrderHandler = async(req, res) => {
    try{
        const ord = await orders.getOneOrder( req.params.id);
        if(!ord) {
            throw {
                code: 404,
                error: 'Order not found'
            }
        }
        return res.status(200).send(ord);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const createOrderHandler = async(req, res) => {
    try{
        await validate(req.body, orderPOST);
        if(!req.auth.id) {
            return res.status(400).send("Unauthorized action");
        }
        const data = {
            ...req.body,
            user_id: req.auth.id
        };
        const ord = await orders.createOrder(data);
        return res.status(200).send(ord);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const updateOrderHandler = async(req, res) => {
    try{
        await validate(req.body, orderPUT);
        if(!req.auth.id) {
            return res.status(400).send("Unauthorized action");
        }
        const data = {
            ...req.body,
            user_id: req.auth.id
        };
        await orders.updateOrder(req.params.id, data);
        return res.status(200).send('');
    } catch(err){
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const removeOrderHandler = async(req, res) => {
    try{
        await orders.removeOrder(req.params.id);
        return res.status(200).send("Delete successful");
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    getAllOrdersHandler,
    getOneOrderHandler,
    createOrderHandler,
    updateOrderHandler,
    removeOrderHandler
};