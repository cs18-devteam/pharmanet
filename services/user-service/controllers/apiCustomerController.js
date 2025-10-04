const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Customers = require("../model/CustomerModel");

exports.getCustomers =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('user')) filter.user = req.params.get('user')
    if(req.params.get('reason')) filter.reason = req.params.get('reason')
    if(req.params.get('requestedDate')) filter.requestedDate = req.params.get('requestedDate')
    if(req.params.get('acceptedDate')) filter.acceptedDate = req.params.get('acceptedDate')
    if(req.params.get('dateFrom')) filter.from = req.params.get('dateFrom')
    if(req.params.get('dateTo')) filter.to = req.params.get('dateTo')
    if(req.params.get('acceptedBy')) filter.acceptedBy = req.params.get('acceptedBy')

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
    const {user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy} = JSON.parse(await getRequestData(req));
    const results = await Customers.update({
        user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createCustomer = async (req , res)=>{
    const {user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy} = JSON.parse(await getRequestData(req));
    const newLeaveRequest = await Customers.save({
        user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newLeaveRequest,
        count : newLeaveRequest.length,
    });
}