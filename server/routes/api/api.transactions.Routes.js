const SubRouter = require("../../common/SubRouter");
const transactionsController = require("../../controllers/pharmacy/transactions.controller");

exports.transactionsRouter = SubRouter.route('/api/v1/transactions')
.subRoute("/" , {
    get: transactionsController.getTransactions,
    post : transactionsController.createTransaction,
})

