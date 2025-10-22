

const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { responseJson , response } = require("../common/response");
const view = require("../common/view");

exports.renderMedicineManagement = async (req , res)=>{
    const respond = await fetch(Bridge.registry.MEDICINE_SERVICE);
    const medicines = (await respond.json()).data;

    return response(res , view('medicines' , {
        navbar : view('components/navbar.staff' , {
                name : " ",  
                id : "",
                ownerId : "",
            }) , 
            ownerId : "",
            medicineId: "",
            medicines : medicines.map(product=> view('components/pharmacy.medicine.card' , product )),
        },) , 200
)}



exports.createMedicine = async (req , res)=>{
    const body = await getRequestData(req);

    const response = await fetch(Bridge.registry.MEDICINE_SERVICE , {
        method:"POST", 
        body 
    })
    const {data : product} = await response.json();
    return responseJson(res , 201 , {
        status:"success" , 
        data : product,
    })
    
}
exports.updateMedicine = async (req , res)=>{
    const body = JSON.parse(await getRequestData(req));

    const response = await fetch(Bridge.registry.MEDICINE_SERVICE , {
        method:"PATCH",
        body : {...body}
    })
    const {data : product} = await response.json();
    return responseJson(res , 201 , {
        status:"success" , 
        data : product,
    })
    
}
exports.deleteMedicine = async (req , res)=>{

    const response = await fetch(Bridge.registry.MEDICINE_SERVICE , {
        method:"DELETE", 
        body :JSON.stringify({
            id: req.medicineId,
        })
    })
    return responseJson(res , 204 , {
        status:"success" , 
        data : response.json(),
    })
    
}


exports.getMedicine = async (req , res)=>{
    const response = await fetch(`${Bridge.registry.MEDICINE_SERVICE}?id=${req.medicineId}`);
    const json = await response.json();
    return responseJson(res , 200 , json);
    
}

exports.getMedicines = async (req , res)=>{
    const response = await fetch(Bridge.registry.MEDICINE_SERVICE);
    const json = await response.json();
    return responseJson(res , 200 , json);
    
}


