const { createCookie } = require("../../common/Auth");
const Bridge = require("../../common/Bridge");
const { catchAsync } = require("../../common/catchAsync");
const { response } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const Pharmacies = require("../../models/PharmacyModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");


exports.renderCustomerHome = async (req , res)=>{
        try{    
                const customer = (await Users.getById(req.customerId))[0];
                
                
                if(!customer) throw new Error("customer not found");

                const [staffMember] = await PharmacyStaff.get({userId : customer.id});        
                const [{count : medicineCount}] = await Medicines.query('select count(*) as count from this.table');
                const [{count : pharmacyCount}] = await Pharmacies.query('select count(*) as count from this.table');
                
                if(!staffMember){
                        return  response(res ,view('customer/customer.home' , {
                                ...customer,
                                navbar : view('customer/navbar.customer' , customer) , 
                                header : view('component.header' , {
                                        name:"Pharmanet || Home",
                                }),
                                footer: view('footer'),
                                cart : view('customer/component.cart'),
                                MedicineCount : medicineCount ,
                                PharmacyCount: pharmacyCount, 
                        }) , 200)
                }else{
                        return response(res , 'redirect' , 301 , {
                                location :`/pharmacies/${staffMember.pharmacyId}/staff/${staffMember.id}`,
                                "Set-Cookie" : `staffId=${staffMember.id};expires=${Date.now()+300};path="/"`
                        })
                }
        }catch(e){
                console.log(e);
                return response(res , view('404') , 404);
        }
                
}

exports.renderCustomerProfile = async (req , res)=>{
        try{

                const customer = (await Users.getById(req.customerId))[0];
                if(!customer) return response(res , "your are not authorized" , 302);

                console.log(customer);
                
                return response(res , view('customer/profile' , {
                        header : view('component.header' , {
                                name:`${customer?.firstName  } ${customer?.lastName } || Account Setting`,
                        }),
                        navbar : view('customer/navbar.customer' , {
                                        name : `${customer?.firstName  } ${customer?.lastName }`
                                    }) ,
                        footer : view('footer'),
                        cart : view('customer/component.cart'),
                        ...customer
                }) , 200);
        }catch(e){
                console.log(e);
                return response(res , view('404') , 404);
        }
}

//new adding to medicine view
exports.renderPharmacyView = async (req , res)=>{

    return response(res , view('customer/customer.medicine.review' , {
        navbar : view('customer/navbar.customer' , {}),
        header : view('component.header' , {
                name:"medicine view",
        }),
        cart : view('customer/component.cart'),
    }) , 200)
}




exports.renderCustomerOrders = catchAsync(async (req , res)=>{

         const customer = (await Users.getById(req.customerId))[0];
        if(!customer) return response(res , "your are not authorized" , 302);

        return response(res , view('customer/customer.orders.history' , {
                ...customer,
                navbar : view('customer/navbar.customer' , customer),
                header : view('component.header' , {
                        name:"medicine view",
                       
                }),
                footer : view('footer'),
        })), 200
})

exports.renderLoyaltyPoints = catchAsync(async (req , res)=>{

         const customer = (await Users.getById(req.customerId))[0];
        if(!customer) return response(res , "your are not authorized" , 302);

        return response(res , view('customer/customer.loyaltyPoints' , {
                ...customer,
                navbar : view('customer/navbar.customer' , customer),
                header : view('component.header' , {
                        name:"medicine view",
                       
                }),
                footer : view('footer'),
        })), 200
})