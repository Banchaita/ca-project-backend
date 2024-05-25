var express = require ('express')
var router = express.Router();

const customerController = require('../controller/Customer')

router.post('/customer_register',customerController.customerRegister)
router.post('/verifyOTp',customerController.verifyOTp)


module.exports= router