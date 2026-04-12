const SubRouter = require("../../common/SubRouter");
const orderController = require("../../controllers/common/orders.controller");

exports.ordersApiRouter = SubRouter.route('/api/v1/orders')
.subRoute('/' , {
    get: orderController.getOrders,
    post:orderController.createOrder,
    delete:orderController.deleteOrder,
    update:orderController.updateOrder,
})
.subRoute('/:orderId/items' , {
    post: orderController.addOrderItem,
    get: orderController.getOrderItems,
    delete : orderController.removeOrderItems,
})
.subRoute('/summery' , {
    get: orderController.getOrderSummery,
})
.subRoute('/summery/status' , {
    get: orderController.getOrderSummeryStatusWise,
})
.subRoute('/prescription' , {
    post : orderController.createOrderFormPrescription,
})
.subRoute("/:orderId" , {
    delete: orderController.deleteOrder,
})
