const Router = require('../../../common/Router');
const customerController = require("../controllers/customerController");

const customerRouter = new Router();


customerRouter.post(customerController.createCustomer);
customerRouter.get(customerController.getCustomer);
customerRouter.patch(customerController.updateCustomer);
customerRouter.delete(customerController.deleteCustomer);


module.exports = customerRouter;
