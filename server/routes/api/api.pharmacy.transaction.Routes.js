const SubRouter = require("../../common/SubRouter");
const transactionsController = require("../../controllers/pharmacy/transactions.controller");

exports.pharmacyTransactionsRouter = SubRouter
    .route("/api/v1/pharmacies/:pharmacyId/transactions")

    .subRoute("/", {
        get: transactionsController.getTransactions,
        post: transactionsController.createTransaction,
    });
