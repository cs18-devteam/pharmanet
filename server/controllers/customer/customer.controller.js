const Bridge = require("../../common/Bridge");
const { response } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");


exports.renderCustomerHome = async (req , res)=>{
    
        const customer = (await Users.getById(req.customerId))[0];

        console.log(!customer);
        console.log(customer)
        if(!customer) return view('404');
        return  response(res ,view('customer/customer.home' , {
                ...customer,
                navbar : view('customer/navbar.customer' , customer) , 
        }) , 200)

}

exports.renderCustomerProfile = async (req , res)=>{
        const customer = (await Users.getById(req.customerId))[0];
        if(!customer) response(res , "your are not authorized" , 302);

        return response(res , view('customer/customer.profile' , customer) , 200);
}

