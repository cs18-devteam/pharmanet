const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerPharmacy = async (req , res)=>{
    return response(res , view("pharmacy") , 200);
}


