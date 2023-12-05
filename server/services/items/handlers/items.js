const items = require("../../../pkg/items/items");
const {
    itemPOST,
    itemPUT,
    validate
} = require("../../../pkg/items/validate");

const getAllItemsHandler = async(req, res) => {
    try{
        const itm = await items.getAllItems(req.auth.id);
        return res.status(200).send(itm);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const getOneItemHandler = async(req, res) => {
    try{
        const itm = await items.getOneItem(req.auth.id, req.params.id);
        if(!itm) {
            throw {
                code: 404,
                error: 'Item not found'
            }
        }
        return res.status(200).send(itm);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const createItemHandler = async(req, res) => {
    try{
        await validate(req.body, itemPOST);
        if(!req.auth.id) {
            return res.status(400).send("Unauthorized action");
        }
        const data = {
            ...req.body,
            user_id: req.auth.id
        };
        const itm = await items.createItem(data);
        return res.status(200).send(itm);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error")
    }
};

const updateItemHandler = async(req, res) => {
    try{
        await validate(req.body, itemPUT);
        if(!req.auth.id) {
            return res.status(400).send("Unauthorized action");
        }
        const data = {
            ...req.body,
            user_id: req.auth.id
        };
        await items.updateItem(req.params.id, data);
        return res.status(500).send('');
    } catch(err){
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const removeItemHandler = async(req, res) => {
    try{
        await items.removeItem(req.params.id);
        return res.status(200).send("Delete successful");
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    getAllItemsHandler,
    getOneItemHandler,
    createItemHandler,
    updateItemHandler,
    removeItemHandler
};