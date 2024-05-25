var Customer = require("../utils/Customer");
const helpers = require("../services/helper");


const customerController = {
    customerRegister: async (req, res) => {
        Customer.register(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },

    verifyOTp: async(req, res,) => {
        Customer.verifyOTp(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    }



};

module.exports = { ...customerController };
