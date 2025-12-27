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

    const startDate = req.query.startDate;
    const endDate   = req.query.endDate;

    // Basic filters
    if (pharmacyId) filter.pharmacyId = pharmacyId;
    if (userId) filter.userId = userId;
    if (staffID) filter.staffID = staffID;
    if (orderId) filter.orderId = orderId;

    let transactions;

    /**
     * DATE RANGE FILTER
     */
    if (startDate && endDate) {

        let sql = `
            SELECT *
            FROM transaction_table
            WHERE 1 = 1
        `;
        const values = [];

        if (pharmacyId) {
            sql += " AND pharmacyId = ?";
            values.push(pharmacyId);
        }

        if (userId) {
            sql += " AND userId = ?";
            values.push(userId);
        }

        if (staffID) {
            sql += " AND staffID = ?";
            values.push(staffID);
        }

        if (orderId) {
            sql += " AND orderId = ?";
            values.push(orderId);
        }

        sql += `
            AND transactionDateTime BETWEEN ? AND ?
            ORDER BY transactionDateTime DESC
        `;

        values.push(
            `${startDate} 00:00:00`,
            `${endDate} 23:59:59`
        );

        transactions = await Transactions.query(sql, values);

    } else {
        /**
         * NO DATE FILTER → GET ALL
         */
        transactions = Object.keys(filter).length === 0
            ? await Transactions.get()
            : await Transactions.get(filter);
    }

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
