const { response } = require("../common/response");
const view = require("../common/view");


exports.renderPharmacyMedicines = async (req , res)=>{
    return response(res , view("pharmacy.medicines") , 200);
}


exports.renderSelectedPharmacyMedicine = async (req , res)=>{
    return response(res , view("pharmacy.medicines.medicine") , 200);
}


