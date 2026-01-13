const SubRouter = require("../../common/SubRouter");
const paymentController = require("../../controllers/payments/payment.controller");

exports.paymentApiRouter = SubRouter.route('/payments')
.subRoute('/hash' , {
    post: paymentController.generateHash, 
})