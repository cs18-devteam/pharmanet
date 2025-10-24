const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerTransactions = async (req , res)=>{
    return response(res , view("customer.transactions") , 200);
}


