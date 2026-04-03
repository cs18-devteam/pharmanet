const SubRouter = require("../../common/SubRouter");
const transactionsController = require("../../controllers/pharmacy/transactions.controller");
const { authorizeToApi, PERMISSIONS } = require("../../middlewares/authorizeToView");

exports.pharmacyTransactionsRouter = SubRouter
    .route("/api/v1/pharmacies/:pharmacyId/transactions")

    .subRoute("/", {
        get: [ 
            authorizeToApi(PERMISSIONS.readTransactions) , 
            transactionsController.getTransactions
        ],
        post: [transactionsController.createTransaction],
    })

    .subRoute("/staff-summary", {
        get: [
            authorizeToApi(PERMISSIONS.readTransactions) , 
            transactionsController.getStaffWiseSummary
        ],
    });


    
