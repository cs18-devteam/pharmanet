const Bridge = require("../../common/Bridge");
const { response } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");


exports.renderCustomerHome = async (req , res)=>{
        try{    
                const customer = (await Users.getById(req.customerId))[0];
                
                console.log(!customer);
                console.log(customer)
                if(!customer) return view('404');
                return  response(res ,view('customer/customer.home' , {
                        ...customer,
                        navbar : view('customer/navbar.customer' , customer) , 
                        header : view('component.header' , {
                                name:"Pharmanet || Home",
                        }),
                        footer: view('footer'),
                }) , 200)
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
    }) , 200)
}

