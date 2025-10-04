const notfound = require("../common/notfound");
const apiCustomerController = require("../controllers/apiCustomerController");


module.exports = function transactionApiRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiCustomerController.getCustomers(req , res);

        case 'POST':
            return apiCustomerController.createCustomer(req , res);

        case 'PATCH':
            return apiCustomerController.updateCustomer(req , res);

        case 'DELETE':
            return apiCustomerController.deleteCustomer(req , res);
        default:
            return notfound(req , res);
    }
}