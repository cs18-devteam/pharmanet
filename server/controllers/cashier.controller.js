const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCashierDashboard = async (req , res)=>{
    return response(res , view("cashier") , 200);
}