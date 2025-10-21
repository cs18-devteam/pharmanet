const { response } = require("../common/response");
const view = require("../common/view");


exports.renderAdminTransactions = async (req , res)=>{
    return response(res , view("admin.transactions.transaction") , 200);
}