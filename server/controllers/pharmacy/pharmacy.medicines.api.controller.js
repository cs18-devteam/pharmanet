const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel")

exports.getAllMedicines = async (req , res)=>{
    try{
        const data = await PharmacyMedicines.query();
        console.log(data);
        return response(res , view('404') , 404);
        

    }catch(e){
        return response(res , view('404') , 404);
    }
}

exports.searchMedicinesByName = async (req , res)=>{
    try{
        const searchName = req.params.get('search');
        const limit = req.params.get('limit');

        const medicines = await Medicines.query(`select * from this.table ${searchName ? `where geneticName like '%${searchName}%' ` : '' } limit ${limit || 100}`);
        
        return responseJson(res , 200 , {
            status:"success",
            count: medicines.length,
            results: medicines,
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
