const Bridge = require("../common/Bridge");
const { response } = require("../common/response")
const view = require("../common/view")

exports.renderCustomerHome = async (req , res)=>{
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

        return  view('customer.home' , {
        navbar : view('components/navbar.customer' , {
                name : `${customer.firstName} ${customer.lastName}`,  
                id : customer.id,
            })
        })

    })
}