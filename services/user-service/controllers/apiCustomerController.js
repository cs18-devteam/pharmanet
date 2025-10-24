const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Customers = require("../model/CustomerModel");

exports.getCustomers =async (req , res)=>{
    try{

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

    console.log(content);

    return responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })

    }catch(e){
        return responseJson(res , 500 , {
            status:"error"
        })
    }

    
}


exports.deleteCustomer =async (req , res)=>{
    try{

    const {id} = JSON.parse(await getRequestData(req));
    const results = await Customers.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });

    }catch(e){
        return responseJson(res , 500 , {
            status:"error",
        });
    }

}


exports.updateCustomer = async (req , res)=>{
    try{

    const {firstName , lastName , email , password , birthDay } = JSON.parse(await getRequestData(req));
    const results = await Customers.update({
        firstName , lastName , email , password , birthDay 
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
    }catch(e){
        return responseJson(res, 500 , {
            status:"error"
        })
    }

}


exports.createCustomer = async (req , res)=>{
    try{

        const {firstName , lastName , email , password , birthDay } = JSON.parse(await getRequestData(req));
        const newLeaveRequest = await Customers.save({
            firstName , lastName , email , password , birthDay 
        });

        return responseJson(res , 201 , {
            status: 'success',
            data: newLeaveRequest,
            count : newLeaveRequest.length,
        });
    }catch(e){
        console.log(e);
        
        
        return responseJson(res , 201 , {
            status: 'error',
        });
    }
}