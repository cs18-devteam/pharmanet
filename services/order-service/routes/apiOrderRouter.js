const notfound = require("../common/notfound");
const apiOrderController = require("../controllers/apiOrderController");


module.exports = function transactionApiRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiOrderController.getOrders(req , res);

        case 'POST':
            return apiOrderController.createOrder(req , res);

        case 'PATCH':
            return apiOrderController.updateOrder(req , res);

        case 'DELETE':
            return apiOrderController.deleteOrder(req , res);
        default:
            return notfound(req , res);
    }
}