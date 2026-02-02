const SubRouter = require("../../common/SubRouter");
const orderController = require("../../controllers/common/orders.controller");

exports.ordersApiRouter = SubRouter.route('/api/v1/orders')
.subRoute('/' , {
    get: orderController.getOrders,
    post:orderController.createOrder,
    delete:orderController.deleteOrder,
    update:orderController[""]
})
.subRoute('/:orderId/items' , {
    post: orderController.addOrderItem,
    get: orderController.getOrderItems,
})
.subRoute("/:orderId" , {
    delete: orderController.deleteOrder,
})