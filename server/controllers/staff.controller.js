

const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");



exports.createUser = async (req , res)=>{
    const body = await getRequestData(req);

    const response = await fetch(Bridge.registry.STAFF_SERVICE , {
        method:"POST", 
        body 
    })
    const {data : product} = await response.json();
    return responseJson(res , 201 , {
        status:"success" , 
        data : product,
    })
    
}
exports.updateBlog = async (req , res)=>{
    const body = JSON.parse(await getRequestData(req));

    const response = await fetch(Bridge.registry.STAFF_SERVICE , {
        method:"PATCH",
        body : {...body}
    })
    const {data : product} = await response.json();
    return responseJson(res , 201 , {
        status:"success" , 
        data : product,
    })
    
}
exports.deleteUser = async (req , res)=>{

    const response = await fetch(Bridge.registry.STAFF_SERVICE , {
        method:"DELETE", 
        body :JSON.stringify({
            id: req.userId,
        })
    })
    return responseJson(res , 204 , {
        status:"success" , 
        data : response.json(),
    })
    
}


exports.getUser = async (req , res)=>{
    const response = await fetch(`${Bridge.registry.STAFF_SERVICE}?id=${req.userId}`);
    const json = await response.json();
    return responseJson(res , 200 , json);
    
}

exports.getUsers = async (req , res)=>{
    const response = await fetch(Bridge.registry.STAFF_SERVICE);
    const json = await response.json();
    return responseJson(res , 200 , json);
    
}


