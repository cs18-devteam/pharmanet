const Bridge = require("../Bridge");
const view = require("../view");

module.exports = function customerFetch(req , res , template , templateData = {}) {
    Bridge.pipe(req ,res)
    .connect(Bridge.registry.CUSTOMER_SERVICE , {
        method :"GET"
    }).request(async (req , res)=>{
        return {id : req.customerId};
    }).json()
    .resend((data)=>{
        const customer = data.data[0];
        if(!customer) return view('404');
        return view(template , {
                navbar : view('components/navbar.customer' , {
                name : `${customer?.firstName} ${customer?.lastName}`
            }, customer , ...templateData) ,
        })
    })
}