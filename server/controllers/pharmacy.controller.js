const Bridge = require("../common/Bridge");
const { response } = require("../common/response");
const view = require("../common/view");

exports.renderPharmacy = async (req , res)=>{
    return response(res , view("pharmacy") , 200);
}


exports.renderPharmacyRegister = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.CUSTOMER_SERVICE , {
        method:"GET",
    } ).request(async (req , res) =>{
        return {
            id : req.customerId,
        }
    }).json()
    .resend((results)=>{
        const customer = results.data[0];

        if(!customer) return view('404');

        return  view('pharmacy.register' , {
        navbar : view('components/navbar.customer' , {
                name : `${customer.firstName} ${customer.lastName}`,  
                id : customer.id,
            }) , 
            id : customer.id
        })

    })
}

exports.renderPharmacyDashboard = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.STAFF_SERVICE , {
        method:"GET",
    } ).request(async (req , res) =>{
        return {
            id : req.OwnerId,
        }
    }).json()
    .resend((results)=>{
        const staff = results.data[0];

        console.log(staff)
        if(!staff) return '404 : No Staff Member';

        return  view('pharmacy' , {
        navbar : view('components/navbar.staff' , {
                name : `${staff.firstName} ${staff.lastName}`,  
                id : staff.id,
            }) , 
            ownerId : staff.id,
            pharmacyId: staff.id
        })

    })
}


