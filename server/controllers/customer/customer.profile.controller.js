const Users = require("../../models/UserModel");
const Bridge = require("../common/Bridge");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerProfile = async (req , res)=>{
    try{

        const customer = await Users.get(req.customerId)[0];
        if(!customer) return view('404' , {
            header : view('component.header' , {
                name:"Antibiotics",
            })
        });
        
        for(const [key , value] of Object.entries(customer)){
            if(!value){
                customer[key] = " ";
            }
        }
        
        return view("customer.profile" , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            navbar : view('components/navbar.customer' , {
                name : `${customer?.firstName  } ${customer?.lastName }`
            }) ,
            ...customer ,
            role: 'Customer',
            mobileNumber : " " ,
        })
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}
