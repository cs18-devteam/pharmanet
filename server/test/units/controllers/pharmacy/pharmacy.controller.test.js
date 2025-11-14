const Bridge = require("../../common/Bridge");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Pharmacies = require("../../models/PharmacyModel");
const Users = require("../../models/UserModel");


exports.renderPharmacy = async (req , res)=>{
    try{

        return response(res , view("pharmacy") , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}


exports.renderPharmacyRegister = async (req , res)=>{
    try{
        if(!req.customerId) return responseJson(res  , 302 , {status:"error"})
        const customer = (await Users.getById(req.customerId))[0];

        return response(res,view('customer/pharmacy.register' , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            navbar : view('customer/navbar.customer' , customer) , 
            id : customer.id
        }),200);

    }catch(e){
        console.log(e);
        return response(200 , view('404') , 400);
    }

}

exports.renderPharmacyProfile = async (req , res)=>{
    try{

        const [staff] = (await Users.getById(req.pharmacistId));
        const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
        console.log(staff , pharmacy)
        
        if(!staff) return '404 : No Staff Member';
        
        return  response( res ,view('pharmacy/pharmacy.profile' , {
            navbar : view('navbar.staff' , {...staff , name:`${staff.firstName} ${staff.lastName}`}) , 
            ownerId : staff.id,
            pharmacyId: staff.id,
            name :"lanka pharmacy",
            addressNo:'B124',
            street: 'kandy road',
            town:"abilipitiya",
            contact :"078123 2123 ",
            email: 'xyz@gmail.com',
            pharmacistId:staff.id,
        }))
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}




exports.renderPharmacyDashboard = async (req , res)=>{

    return response(res , view('pharmacy/pharmacy.dashboard' , {
        header : view('component.header' , {
                name:"Pharmacy Dashboard",
        }),
    }) , 200)
}