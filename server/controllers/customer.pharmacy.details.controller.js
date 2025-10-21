const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderCustomerPharmacyDetails = async (req , res)=>{
    return response(res , view("customer.pharmacy.details") , 200);
}