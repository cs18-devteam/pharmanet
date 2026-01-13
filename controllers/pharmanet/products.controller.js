const { response } = require("../../common/response")
const view = require("../../common/view");
const Users = require("../../models/UserModel");

exports.renderPharmacyManagementSystemIntro = async (req , res)=>{


    let customer = undefined;
    if(req.customerId){
        customer = (await Users.getById(req.customerId))[0];

    }

    return response(res ,view('products/pharmacySystem' , {

            ...customer,
            header : view('component.header' , {
                name:"Pharmanet || Pharmacy management System",
            }),
            checkout: customer ? `/customers/${customer.id}/products/pharmacy_management_system/register` : "/signup",
            
            navbar :customer ? view('customer/navbar.customer', customer) : view('components/navbar.user') ,
            footer: view('footer'),
        }) , 200)
}
exports.renderPharmanetRegistrationPage = async (req , res)=>{
    let customer = undefined;
    if(req.customerId){
        customer = (await Users.getById(req.customerId))[0];

    }

    return response(res ,view('products/pharmacySystem.register' , {

            ...customer,
            header : view('component.header' , {
                name:"Pharmanet || Pharmacy management System",
            }),
            
            
            navbar :customer ? view('customer/navbar.customer', customer) : view('components/navbar.user') ,
            footer: view('footer'),
        }) , 200)
}