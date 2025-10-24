const { getRequestData } = require("../common/getRequestData");
const { responseJson, response } = require("../common/response");
const Pharmacy = require("../model/PharmacyModel");


exports.getPharmacy =async (req , res)=>{
    try{            
        const filter = {};
        if(req.params.get('id')) filter.id = req.params.get('id')
        if(req.params.get('name')) filter.name = req.params.get('name')
        if(req.params.get('licenseNumber')) filter.licenseNumber = req.params.get('licenseNumber')
        if(req.params.get('email')) filter.email = req.params.get('email')
        if(req.params.get('addressNo')) filter.addressNo = req.params.get('addressNo')
        if(req.params.get('street')) filter.street = req.params.get('street')
        if(req.params.get('town')) filter.town = req.params.get('town')
        if(req.params.get('province')) filter.province = req.params.get('province')
        if(req.params.get('latitude')) filter.latitude = req.params.get('latitude')
        if(req.params.get('longitude')) filter.longitude = req.params.get('longitude')
        if(req.params.get('contact')) filter.contact = req.params.get('contact')
        if(req.params.get('postalCode')) filter.postalCode = req.params.get('postalCode')

        let content =  ''
        if(Object.entries(filter).length > 0){
            content = await Pharmacy.get(filter);
        }else{
            content = await Pharmacy.get();
        }

        responseJson(res , 200 , {
            status : "success",
            data : content,
            count : content.length,
        })
    
    }catch(e){
        return responseJson(res ,400  , {
            status:"error",
            error : e,
        })
    }

}


exports.deletePharmacy =async (req , res)=>{
    try{

        const {id} = JSON.parse(await getRequestData(req));
        const results = await Pharmacy.deleteById(id);
        
        return responseJson(res , 204 , {
            status: 'success',
            data: results,
        });
    }catch(e){
        return responseJson(res , 400, {
            status: "error",
            error: e,
        })
    }
}


exports.updatePharmacy = async (req , res)=>{
    try{

        const data = JSON.parse(await getRequestData(req));
        const results = await Pharmacy.update(data);
        
        return responseJson(res , 200 , {
            status: 'success',
            data: results,
        });
    }catch(e){
        return responseJson(res , 400 , {
            status:"error",
            error: e,
        })
    }
}


exports.createPharmacy = async (req , res)=>{
    try{

        const data = JSON.parse(await getRequestData(req));
        console.log(data);

        const newPharmacy = await Pharmacy.save(data);

        
        return responseJson(res , 201 , {
            status: 'success',
            data: newPharmacy,
            count : newPharmacy.length,
        });
    }catch(e){
        return responseJson(res , 400 , {
            status: "error",
            error:e.message,
        })
    }
}