const { catchAsync, apiCatchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { responseJson } = require("../../common/response");
const Transactions = require("../../models/TransactionModel");

console.log("Transactions model:", Transactions);

/**
 * GET TRANSACTIONS
 * Supports:
 * - pharmacyId (params)
 * - userId, staffId, orderId (params)
 * - startDate, endDate (query)
 */
exports.getTransactions = catchAsync(async (req, res) => {

    const pharmacyId = Number(req.pharmacyId); // FIXED
    if (!pharmacyId) {
        return responseJson(res, 400, { status: "fail", message: "Invalid pharmacyId" });
    }

    const filter = {};

    const userId = req.userId;     
    const staffID = req.staffId;    
    const orderId = req.orderId;


    // Basic filters
    if (pharmacyId) filter.pharmacyId = pharmacyId;
    if (userId) filter.userId = userId;
    if (staffID) filter.staffID = staffID;
    if (orderId) filter.orderId = orderId;

    //let transactions;

    const transactions = await Transactions.get({
        pharmacyId :pharmacyId,
    })


    return responseJson(res, 200, {
        status: "success",
        results: transactions,
        count: transactions.length,
    });
});


/**
 * CREATE TRANSACTION
 */
exports.createTransaction = apiCatchAsync(async (req, res) => {

    const reqData = JSON.parse(await getRequestData(req));

    const transactionObj = {
        orderId: reqData.orderId,
        pharmacyId: reqData.pharmacyId,
        amount: reqData.amount,
        userId: reqData.userId,
        type: reqData.type,
        staffID: reqData.staffID,
        method: reqData.method,
        transactionDateTime: reqData.datetime || new Date(),
    };

    const newTransaction = await Transactions.save(transactionObj);

    return responseJson(res, 200, {
        status: "success",
        results: newTransaction,
    });
});
