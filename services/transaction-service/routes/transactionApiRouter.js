const notfound = require("../common/notfound");
const transactionController = require("../controllers/apiTransationController");


module.exports = function transactionApiRouter (req , res){
    switch(req.method){
        case 'GET':
            return transactionController.getTransactions(req , res);

        case 'POST':
            return transactionController.createTransaction(req , res);

        case 'PATCH':
            return transactionController.updateTransaction(req , res);

        case 'DELETE':
            return transactionController.deleteTransaction(req , res);
        default:
            return notfound(req , res);
    }
}