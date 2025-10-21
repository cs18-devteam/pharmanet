const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Customers = require("../model/CustomerModel");

exports.getCustomers =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('email')) filter.email = req.params.get('email')
    if(req.params.get('password')) filter.password = req.params.get('password')
    if(req.params.get('birthDay')) filter.birthDay = req.params.get('birthDay')
    if(req.params.get('firstName')) filter.firstName = req.params.get('firstName')
    if(req.params.get('lastName')) filter.lastName = req.params.get('lastName')

    let content =  ''
    if(Object.entries(filter).length > 0){
        content = await Customers.get(filter);
    }else{
        content = await Customers.get();
    }

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
    
}


exports.deleteCustomer =async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const results = await Customers.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}


exports.updateCustomer = async (req , res)=>{
    const {firstName , lastName , email , password , birthDay } = JSON.parse(await getRequestData(req));
    const results = await Customers.update({
        firstName , lastName , email , password , birthDay 
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createCustomer = async (req , res)=>{
    const {firstName , lastName , email , password , birthDay } = JSON.parse(await getRequestData(req));
    const newLeaveRequest = await Customers.save({
        firstName , lastName , email , password , birthDay 
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newLeaveRequest,
        count : newLeaveRequest.length,
    });
}