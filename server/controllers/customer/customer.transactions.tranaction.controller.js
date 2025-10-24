const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerTransaction = async (req , res)=>{
    return response(res , view("customer.transactions.transaction") , 200);
}


