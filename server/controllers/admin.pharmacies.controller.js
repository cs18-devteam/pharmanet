const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminPharmacies = async (req , res)=>{
    return response(res , view("admin.pharmacies") , 200);
}


exports.renderAdminSelectedPharmacy = async (req , res)=>{
    return response(res , view("admin.pharmacies.pharmacy") , 200);
}