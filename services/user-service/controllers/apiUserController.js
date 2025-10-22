const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Customers = require("../model/CustomerModel");
const PharmacyStaff = require("../model/PharmacyStaffModel");

exports.getUsers =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')

    let content =  ''
    if(Object.entries(filter).length > 0){
        content  = [... await Customers.get(filter) ,await PharmacyStaff.get(filter)];
    }else{
        content = [... await Customers.get() ,await PharmacyStaff.get()];

    }
    console.log(content)

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
    
}


exports.deleteUser=async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const results = await Customers.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}


exports.updateUser= async (req , res)=>{
    const {firstName , lastName , email , password , birthDay } = JSON.parse(await getRequestData(req));
    const results = await Customers.update({
        firstName , lastName , email , password , birthDay 
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createUser= async (req , res)=>{
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