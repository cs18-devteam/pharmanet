const Router = require("../../../common/Router");
const transactionController = require("../controllers/TransactionController");

const transactionRouter = new Router();

transactionRouter.get(transactionController.getTransaction);
transactionRouter.post(transactionController.createTransaction);
transactionRouter.patch(transactionController.updateTransaction);
transactionRouter.delete(transactionController.updateTransaction);


module.exports = transactionRouter;