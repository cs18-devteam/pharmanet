const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Medicines = require("../model/MedicineModel");


exports.getMedicines =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('serialNumber')) filter.serialNumber = req.params.get('serialNumber')
    if(req.params.get('countryCode')) filter.countryCode = req.params.get('countryCode')
    if(req.params.get('geneticName')) filter.geneticName = req.params.get('geneticName')
    if(req.params.get('schedule')) filter.schedule = req.params.get('schedule')
    if(req.params.get('registrationNo')) filter.from = req.params.get('registrationNo')
    if(req.params.get('agentCode')) filter.to = req.params.get('agentCode')
    if(req.params.get('menuCode')) filter.menuCode = req.params.get('menuCode')
    if(req.params.get('packType')) filter.packType = req.params.get('packType')
    if(req.params.get('dosageCode')) filter.dosageCode = req.params.get('dosageCode')

    let content =  ''
    if(Object.entries(filter).length > 0){
        content = await Medicines.get(filter);
    }else{
        content = await Medicines.get();
    }

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
    
}


exports.deleteMedicine =async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const results = await Medicines.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}



exports.updateMedicine = async (req , res)=>{
    const {serialNumber , countryCode , geneticName , schedule , registrationNo , agentCode , menuCode , packType , dosageCode} = JSON.parse(await getRequestData(req));
    const results = await Medicines.update({
        serialNumber , countryCode , geneticName , schedule , registrationNo , agentCode , menuCode , packType , dosageCode
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createMedicine = async (req , res)=>{
    const {serialNumber , countryCode , geneticName , schedule , registrationNo , agentCode , menuCode , packType , dosageCode} = JSON.parse(await getRequestData(req));
    const newLeaveRequest = await Medicines.save({
        serialNumber , countryCode , geneticName , schedule , registrationNo , agentCode , menuCode , packType , dosageCode
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newLeaveRequest,
        count : newLeaveRequest.length,
    });
}