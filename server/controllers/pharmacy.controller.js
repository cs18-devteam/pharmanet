const { response } = require("../common/response");
const view = require("../common/view");

exports.renderPharmacy = async (req , res)=>{
    return response(res , view("pharmacy") , 200);
}


exports.renderPharmacyRegister = async (req , res)=>{
    return response(res , view("pharmacy.register") , 200);
}


