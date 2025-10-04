const notfound = require("../common/notfound");
const productApiController = require("../controllers/apiProductsController");


module.exports = function staffProductRouter (req , res){
    switch(req.method){
        case 'GET':
            return productApiController.getProducts(req , res);

        case 'POST':
            return productApiController.createProduct(req , res);

        case 'PATCH':
            return productApiController.updateProduct(req , res);

        case 'DELETE':
            return productApiController.deleteProduct(req , res);
        default:
            return notfound(req , res);
    }
}