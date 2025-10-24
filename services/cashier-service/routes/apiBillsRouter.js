const notfound = require("../common/notfound");
const apiBillsController = require("../controllers/apiBillsController");


module.exports = function transactionApiRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiBillsController.getBills(req , res);

        case 'POST':
            return apiBillsController.createBills(req , res);

        case 'PATCH':
            return apiBillsController.updateBills(req , res);

        case 'DELETE':
            return apiBillsController.deleteBills(req , res);
        default:
            return notfound(req , res);
    }
}