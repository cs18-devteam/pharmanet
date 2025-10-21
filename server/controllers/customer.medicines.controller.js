const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerMedicines = async (req , res)=>{
    return response(res , view("customer.medicines") , 200);
}
exports.renderCustomerSelectedMedicine = async (req , res)=>{
    return response(res , view("customer.medicines.medicine") , 200);
}


