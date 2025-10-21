const { response } = require("../common/response");
const view = require("../common/view");


exports.renderPharmacyProducts = async (req , res)=>{
    return response(res , view("pharmacy.products") , 200);
}


exports.renderSelectedPharmacyProduct = async (req , res)=>{
    return response(res , view("pharmacy.products") , 200);
}


