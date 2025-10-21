const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const PharmacyStaff = require("../model/PharmacyStaffModel");

exports.getStaffMembers =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('email')) filter.email = req.params.get('email')
    if(req.params.get('firstName')) filter.firstName = req.params.get('firstName')
    if(req.params.get('lastName')) filter.lastName = req.params.get('lastName')
    if(req.params.get('nic')) filter.nic = req.params.get('nic')
    if(req.params.get('fullName')) filter.fullName = req.params.get('fullName')
    if(req.params.get('dateOfBirth')) filter.dateOfBirth = req.params.get('dateOfBirth')
    if(req.params.get('addressNo')) filter.addressNo = req.params.get('addressNo')
    if(req.params.get('street')) filter.street = req.params.get('street')
    if(req.params.get('town')) filter.town = req.params.get('town')
    if(req.params.get('province')) filter.province = req.params.get('province')
    if(req.params.get('road')) filter.road = req.params.get('road')
    if(req.params.get('postalCode')) filter.postalCode = req.params.get('postalCode')
    if(req.params.get('role')) filter.role = req.params.get('role')
    if(req.params.get('pharmacyId')) filter.pharmacyId = req.params.get('pharmacyId')
    if(req.params.get('accountNo')) filter.accountNo = req.params.get('accountNo')
    if(req.params.get('userName')) filter.userName = req.params.get('userName')


    let content =  ''
    if(Object.entries(filter).length > 0){
        content = await PharmacyStaff.get(filter);
    }else{
        content = await PharmacyStaff.get();
    }

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
    
}


exports.deleteStaffMember =async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const results = await PharmacyStaff.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}


exports.updateStaffMember = async (req , res)=>{
    const {user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy} = JSON.parse(await getRequestData(req));
    const results = await PharmacyStaff.update({
        user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createStaffMember = async (req , res)=>{
    const {user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy} = JSON.parse(await getRequestData(req));
    const newLeaveRequest = await PharmacyStaff.save({
        user , requestedDate , acceptedDate , dateFrom , dateTo , reason , acceptedBy
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newLeaveRequest,
        count : newLeaveRequest.length,
    });
}