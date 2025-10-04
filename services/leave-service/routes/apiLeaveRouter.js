const notfound = require("../common/notfound");
const apiLeaveController = require("../controllers/apiLeaveController");


module.exports = function transactionApiRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiLeaveController.getLeaves(req , res);

        case 'POST':
            return apiLeaveController.createLeave(req , res);

        case 'PATCH':
            return apiLeaveController.updateLeave(req , res);

        case 'DELETE':
            return apiLeaveController.deleteLeave(req , res);
        default:
            return notfound(req , res);
    }
}