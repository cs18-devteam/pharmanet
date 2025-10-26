const { response } = require("../../common/response");
const view = require("../../common/view");
const Pharmacies = require("../../models/PharmacyModel");
const Users = require("../../models/UserModel");


exports.renderCustomerPharmacies = async (req , res)=>{
    try{

        const customer = (await Users.getById(req.customerId))[0];
        const pharmacies = await Pharmacies.get();

        if(!customer) return view('404');
        return response(res , view('customer/customer.search.pharmacies' , {
            ...customer,
            count : pharmacies.length ,
            navbar : view('customer/navbar.customer' ,customer) ,
            results : pharmacies.map(pharmacy=>view('customer/pharmacy.search.card' , {
                ...pharmacy , 
                customerId : customer.id
            })).join(' ')

        }) , 200);
        
    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }

}


exports.renderCustomerPharmacy = async (req , res)=>{
    try{
    const customer = (await Users.getById(req.customerId))[0];
        const [pharmacy] = await Pharmacies.getById(req.pharmacyId);

        if(!customer) return view('404');
        return response(res , view('pharmacy/pharmacy.profile' , {
            ...customer,
            ...pharmacy , 
            navbar : view('customer/navbar.customer' ,customer) ,
            customerId : customer.id
        }) , 200);
        
    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }





}





