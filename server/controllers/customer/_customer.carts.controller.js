const { responseJson } = require("../../common/response");
const CustomerCarts = require("../../models/CustomerCartsModel");

exports.getCustomerCart = async (req , res)=>{
    try{
        const customerId = req.customerId;

        const carts = await CustomerCarts.get({
            userId : customerId,
        })

        return responseJson(res , 200 , {
            status:"success",
            results:carts,
            count: carts.length,
        })

    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message: "something went wrong",
            error: e,
        })
    }
    
}