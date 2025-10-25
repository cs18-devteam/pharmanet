const Router = require('./../../../common/Router');
const productController = require('../controller/productController');
const productRouter = new Router();


productRouter.get(productController.getProduct);
productRouter.post(productController.createProduct);
productRouter.patch(productController.updateProduct);
productRouter.delete(productController.deleteProduct);

module.exports = productRouter;