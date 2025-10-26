const Bridge = require("../../common/Bridge");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");


exports.renderPharmacy = async (req , res)=>{
    return response(res , view("pharmacy") , 200);
}


exports.renderPharmacyRegister = async (req , res)=>{
    try{
        if(!req.customerId) return responseJson(res  , 302 , {status:"error"})
        const customer = (await Users.getById(req.customerId))[0];

        return response(res,view('customer/pharmacy.register' , {
            navbar : view('customer/navbar.customer' , customer) , 
            id : customer.id
        }),200);

    }catch(e){
        console.log(e);
        return response(200 , view('404') , 400);
    }

}

exports.renderPharmacyDashboard = async (req , res)=>{
        const [staff] = (await Users.get(req.staffId));

        if(!staff) return '404 : No Staff Member';

        return  response( res ,view('pharmacy' , {
        navbar : view('components/navbar.staff' , staff) , 
            ownerId : staff.id,
            pharmacyId: staff.id
        }))
}


