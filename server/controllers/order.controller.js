const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { response, responseJson } = require("../common/response");
const view = require("../common/view");





exports.createOrder = async (req , res)=>{
    const body = await getRequestData(req);

    const response = await fetch(Bridge.registry.ORDER_SERVICE , {
        method:"POST", 
        body 
    })
    const {data : product} = await response.json();
    return responseJson(res , 201 , {
        status:"success" , 
        data : product,
    })
    
}


exports.updateOrder = async (req , res)=>{
    const body = JSON.parse(await getRequestData(req));

    const response = await fetch(Bridge.registry.ORDER_SERVICE , {
        method:"PATCH",
        body : {...body , pharmacyId : req.pharmacyId}
    })
    const {data : product} = await response.json();
    return responseJson(res , 201 , {
        status:"success" , 
        data : product,
    })
    
}


exports.deleteOrder = async (req , res)=>{

    const response = await fetch(Bridge.registry.ORDER_SERVICE , {
        method:"DELETE", 
        body :JSON.stringify({
            id: req.productId,
        })
    })
    return responseJson(res , 204 , {
        status:"success" , 
        data : response.json(),
    })
    
}


exports.getOrder = async (req , res)=>{
    const response = await fetch(`${Bridge.registry.PRODUCT_SERVICE}?id=${req.productId}`);
    const json = await response.json();
    return responseJson(res , 200 , json);
    
}



exports.getOrders = async (req , res)=>{
    const response = await fetch(Bridge.registry.ORDER_SERVICE);
    console.log(response);
    const json = await response.json();
    return responseJson(res , 200 , json);
    
}


