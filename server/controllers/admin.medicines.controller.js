const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderAdminCreateMedicine = async (req , res)=>{
    Bridge.pipe(req ,res)
        .connect(Bridge.registry.MEDICINE_SERVICE)
        .request()
        .json()
        .resend((data)=>{
            const medicines = data.data; 

            return view('admin.medicines.create' ,{
                medicines : medicines.map((medicine)=>view("components/medicine.card" , {
                    ...medicine,
                    manufacture : medicine.menuCode,
                    registrationNumber : medicine.registrationNo,
                    category: medicine.category || " ",
                }))
            } );
        } , 200)
        .catch(error=>{
            console.log(error);
        })

}

exports.renderAdminMedicines = async (req , res)=>{
    return response(res , view("admin.medicines") , 200);
}



exports.createMedicine = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.MEDICINE_SERVICE , {
        method : "POST",
    })
    .request(async (req , res)=>{
        const data = JSON.parse(await getRequestData(req));
        return JSON.stringify(data);
    }).json()
    .resend(data=>{
        return JSON.stringify(data);
    } , 201 , {
        "Content-type" : "application/json",
    }).catch(error=>{
        console.log(error);
    })

}

exports.deleteMedicine = async (req , res)=>{
    Bridge.pipe(req ,res)
    .connect(Bridge.registry.MEDICINE_SERVICE , {
        method:"DELETE",
    }).request(async (req ,res)=>{
        return JSON.stringify({
            id : req.medicineId,
        })
    }).resend(data=>{
        return JSON.stringify(data);
    } , 204 , {
        "Content-type" : "application/json",
    }).catch(e=>{
        console.log(e);
    });
}


exports.getMedicineById = async (req ,res)=>{
    Bridge.pipe(req ,res)
        .connect(Bridge.registry.MEDICINE_SERVICE)
        .request(async (req)=>{
            return {
                id : req.medicineId
            }
        })  
        .json()
        .resend((data)=>{
            return JSON.stringify(data);
        } , 200)
        .catch(error=>{
            console.log(error);
        })
}

exports.updateMedicine = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.MEDICINE_SERVICE , {
        method :"PATCH",
    }).request(async (req , res)=>{
        const data = JSON.parse(await getRequestData(req));
        data.id = req.medicineId;
        return JSON.stringify(data);
    }).json()
    .resend(data=>{
        return JSON.stringify(data);
    },200 ,    
    {
        "Content-type" : "application/json"    
    }
    ).catch(e=>{
        console.log(e);
    })
}

exports.getAllMedicines = async (req ,res)=>{
    Bridge.pipe(req ,res)
    .connect(Bridge.registry.MEDICINE_SERVICE)
    .request(async (req)=>{})  
    .json()
    .resend((data)=>{
        return JSON.stringify(data);
    } , 200)
    .catch(error=>{
        console.log(error);
    })
}



