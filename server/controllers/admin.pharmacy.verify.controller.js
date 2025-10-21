const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminPharmacyVerify = async (req , res)=>{
    return response(res , view("admin.pharmacy.verify") , 200);
}