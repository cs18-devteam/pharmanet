const notfound = require("../common/notfound");
const staffProductController  = require("../controllers/staffProductController");


module.exports = function staffProductRouter (req , res){
    switch(req.method){
        case 'GET':
            return staffProductController.getAllProducts(req , res);
        default:
            return notfound(req , res);
    }
}