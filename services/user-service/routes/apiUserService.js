const notfound = require("../common/notfound");
const apiUserController = require("../controllers/apiUserController.js");


module.exports = function apiUsersRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiUserController.getUsers(req , res);

        // case 'POST':
        //     return apiUserController.createCustomer(req , res);

        // case 'PATCH':
        //     return apiUserController.updateCustomer(req , res);

        // case 'DELETE':
        //     return apiUserController.deleteCustomer(req , res);
        default:
            return notfound(req , res);
    }
}