const Bridge = require("../common/Bridge");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerProfile = async (req , res)=>{
    Bridge.pipe(req ,res)
    .connect(Bridge.registry.CUSTOMER_SERVICE , {
        method :"GET"
    }).request(async (req , res)=>{
        return {id : req.customerId};
    }).json()
    .resend((data)=>{
        const customer = data.data[0];
        if(!customer) return view('404');

        for(const [key , value] of Object.entries(customer)){
            if(!value){
                customer[key] = " ";
            }
        }

        return view("customer.profile" , {
            navbar : view('components/navbar.customer' , {
                name : `${customer?.firstName  } ${customer?.lastName }`
            }) ,
            ...customer ,
            role: 'Customer',
            mobileNumber : " " ,
        })
    })
}