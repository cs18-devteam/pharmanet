const SubRouter = require("../../common/SubRouter");
const transactionsController = require("../../controllers/pharmacy/transactions.controller");
const { authorizeToApi, PERMISSIONS } = require("../../middlewares/authorizeToView");

exports.transactionsRouter = SubRouter.route('/api/v1/transactions')
.subRoute("/" , {
    get: [authorizeToApi(PERMISSIONS.readTransactions) , transactionsController.getTransactions],
    post : transactionsController.createTransaction,
})

