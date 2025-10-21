const Bridge = require("../common/Bridge");
const customerFetch  = require("../common/controllers/customerFetch");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerMedicines = async (req , res)=>{
    return customerFetch(req ,res , 'customer.search')
}
exports.renderCustomerSelectedMedicine = async (req , res)=>{
    return response(res , view("customer.search") , 200);
}




