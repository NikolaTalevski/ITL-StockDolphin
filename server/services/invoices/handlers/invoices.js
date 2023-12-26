const invoices = require('../../../pkg/invoices/invoices');
const {
    invoicePOST,
    invoicePUT,
    validate
} = require('../../../pkg/invoices/validate');

const getAllInvoicesHandler = async(req, res) => {
    try{
        const inv = await invoices.getAllInvoices(req.auth.id);
        return res.status(200).send(inv);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const getOneInvoiceHandler = async(req, res) => {
    try{
        const inv = await invoices.getOneInvoice(req.params.id);
        if(!inv) {
            throw {
                code: 400,
                error: 'Invoice not found'
            }
        }
        return res.status(200).send(inv);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const createInvoiceHandler = async(req, res) => {
    try{
        await validate(req.body, invoicePOST);
        if(!req.auth.id) {
            return res.status(400).send("Unauthorized action");
        }
        const data = {
            ...req.body,
            user_id: req.auth.id
        };
        const inv = await invoices.createInvoice(data);
        return res.status(200).send(inv);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Interval server error");
    }
};

const updateInvoiceHandler = async(req, res) => {
    try{
        await validate(req.body, invoicePUT);
        if(!req.auth.id) {
            return res.status(400).send("Unauthorized action");
        }
        const data = {
            ...req.body,
            user_id: req.auth.id
        };
        await invoices.updateInvoice(req.params.id, data);
        return res.status(200).send('');
    } catch(err) {
        console.log(err);
        return res.status(500).send("Interval server error");
    }
};

const removeInvoiceHandler = async(req, res) => {
    try{
        await invoices.removeInvoice(req.params.id);
        return res.status(200).send("Delete successful");
    } catch(err) {
        console.log(err);
        return res.status(500).send("Interval server error");
    }
};

module.exports = {
    getAllInvoicesHandler,
    getOneInvoiceHandler,
    createInvoiceHandler,
    updateInvoiceHandler,
    removeInvoiceHandler
};