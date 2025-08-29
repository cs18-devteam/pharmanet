const router = require('./../../../common/Router');
const orderController = require('./../controller/orderController');
const orderRouter = new router();
orderRouter.get(orderController.getOrder);
orderRouter.patch(orderController.updateOrder);
orderRouter.delete(orderController.DeleteOrder);
orderRouter.post(orderController.CreateOrder);

module.exports = orderRouter;
