const { publicca } = require("googleapis/build/src/apis/publicca");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const { getRequestData } = require("../../common/getRequestData");

exports.getAllMedicines = async (req , res)=>{
    try{
        
        const data = await PharmacyMedicines.get();
        return responseJson(res , 200 , data);
        

    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}


exports.getMedicineDetailsByStockId = async (req , res)=>{

    
    try{
        const id = req.stockId;
        if(!id) return responseJson(res , 400 , {
            status:"error",
            error :"no medicine found",
            id: id,

        })
        const [stock] = await PharmacyMedicines.getById(id);
        if(!stock){
            return responseJson(res , 404 , {
                status:"error",
                error:"medicine not found in stock",
            })
        }

        const [medicine] = await Medicines.getById(stock.medicineId);
        if(!medicine){
            return responseJson(res , 404 , {
                status:"error",
                error: "stock found but medicine not found in database",
            })
        } 
        

        return responseJson(res , 200 , {
            status:"success",
            results : {
                ...medicine , 
                stock ,
            }
        })
    

    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            error:e,
        })
        
    }
}

exports.searchMedicinesByName = async (req , res)=>{
    try{
        const searchName = req.params.get('search');
        const limit = req.params.get('limit');
        const pharmacyId = req.pharmacyId;

        

        const medicines = await Medicines.query(`select * from this.table ${searchName ? `where geneticName like '%${searchName}%' ` : '' } limit ${limit || 100}`);


        const stockMedicines = medicines.map(async med=>{
            try{

                const stock = await PharmacyMedicines.get({
                    medicineId : med.id,
                    pharmacyId : pharmacyId,
                })
                // console.log(stock[0]);
                

                return {...med , stock : stock[0] || {}};
            }catch(e){
                console.log(e);
                return med;
            }
        })

        Promise.all(stockMedicines).then((data)=>{

            console.log(data);
            

            return responseJson(res , 200 , {
                status:"success",
                count: data.length,
                results: data,
            });
        });

    }catch(e){
        console.log(e);
        return responseJson(res , 500 , {
            status:"error",
            message:e.message,
            error: e,
        })
    }
}



exports.getMedicineStockInfo = async (req , res)=>{
    try{
        const [{'count(medicineId)' :count}] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId}`)
        const [{'count(medicineId)' :sufficient}] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId} and publicStock >= 10`);
        const [{'count(medicineId)' :low}] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId} and publicStock < 10`)
        const [{'count(medicineId)' :out}] = await PharmacyMedicines.query(`select count(medicineId)from this.table where pharmacyId=${req.pharmacyId} and publicStock < 1`);


        return responseJson(res , 200 , {
            status:"success",
            results:{
                count,
                sufficient,
                low,
                out,
            }
        });

    }catch(e){
        return responseJson(res , 500 , {
            status:"error",
            message: e.message,
            error:e,
        })
    }
}


exports.createMedicineStock = async (req , res)=>{
    try{
        const medicine =  JSON.parse(await getRequestData(req));
        console.log(medicine);
        
        const [newStock] = await PharmacyMedicines.save({
            medicineId : medicine.medicineId,
            pharmacyId : medicine.pharmacyId , 
            price : medicine.price,
            stock : medicine.stock,
            publicStock: medicine.publicStock
        });


        return responseJson(res , 201 , {
            status:"success",
            stock : newStock,
        })
        
        

    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            error:e,
        });
        
    }
}