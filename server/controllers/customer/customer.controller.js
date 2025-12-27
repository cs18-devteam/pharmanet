const { createCookie } = require("../../common/Auth");
const Bridge = require("../../common/Bridge");
const { response } = require("../../common/response");
const view = require("../../common/view");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");


exports.renderCustomerHome = async (req , res)=>{
        try{    
                const customer = (await Users.getById(req.customerId))[0];
                
                
                if(!customer) throw new Error("customer not found");

                const [staffMember] = await PharmacyStaff.get({userId : customer.id});
                
                
                if(!staffMember){
                        return  response(res ,view('customer/customer.home' , {
                                ...customer,
                                navbar : view('customer/navbar.customer' , customer) , 
                                header : view('component.header' , {
                                        name:"Pharmanet || Home",
                                }),
                                footer: view('footer'),
                                cart : view('customer/component.cart'),
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

