const { catchAsync, apiCatchAsync } = require("../../common/catchAsync");
const { toSqlDate } = require("../../common/Convert");
const { getRequestData } = require("../../common/getRequestData");
const { responseJson } = require("../../common/response");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Transactions = require("../../models/TransactionModel");


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

    // exports.getByStaffId = async (pharmacyId) => {
    //     return await PharmacyStaff.query(
    //         `SELECT staffID FROM transactions_table 
    //         `,)
    // }


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
        transactionDateTime: toSqlDate(new Date().toLocaleDateString('si-LK')),
    };

    const newTransaction = await Transactions.save(transactionObj);

    return responseJson(res, 200, {
        status: "success",
        results: newTransaction,
    });
});


exports.getStaffWiseSummary = catchAsync(async (req, res) => {
  const pharmacyId = Number(req.pharmacyId);

  if (!pharmacyId) {
    return responseJson(res, 400, { status: "fail", message: "Invalid pharmacyId" });
  }

  const sql=`
    SELECT 
        ps.id AS staffID,
        u.firstName AS staffName,
        COUNT(t.orderId) AS orders,
        IFNULL(SUM(t.amount),0) AS totalAmount

        FROM transaction_table t
        JOIN pharmacystaff_table ps ON ps.id = t.staffID
        JOIN user_table u ON ps.userId = u.id
        WHERE t.pharmacyId = ${pharmacyId}
        GROUP BY ps.id
        ORDER BY totalAmount DESC
  `;


  const summary = await Transactions.query(sql);


  return responseJson(res, 200, {
    status: "success",
    results: summary
  });
});
