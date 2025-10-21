const Bridge = require("../common/Bridge");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerPharmacies = async (req , res)=>{
    Bridge.pipe(req. res).connect(Bridge.registry.PHARMACY_SERVICE , {})
    .request()
    .json((json)=>{
        return json;
    })
    .resend(async (data)=>{
        console.log(data);
        return view('customer.pharmacies')
    })
}


