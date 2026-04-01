const { apiCatchAsync } = require("../../common/catchAsync");
const { responseJson } = require("../../common/response");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Products = require("../../models/ProductModel");


exports.getStocksByName = async (req , res)=>{
    try{
        const searchName = req.params.get('search');
        const limit = req.params.get('limit');
        const pharmacyId = req.pharmacyId;

        

        const medicines = await Medicines.query(`select * from this.table ${searchName ? `where geneticName like '%${searchName}%' ` : '' } limit ${limit || 100}`);


        const products = await Products.query(`select * from this.table ${searchName ? `where pharmacyId=${pharmacyId} and name like '%${searchName}%' ` : ''} limit ${limit || 100}`);

        const stockMedicines = medicines.map(async med=>{
            try{

                const stock = await PharmacyMedicines.get({
                    medicineId : med.id,
                    pharmacyId : pharmacyId,
                })
                

                return {...med , stock : stock[0] || {}};
            }catch(e){
                console.log(e);
                return med;
            }
        })

        return Promise.all(stockMedicines).then((data)=>{

            const results = [...products.map(p=>{return{type: "product" , ...p}}) , ...data];

            return responseJson(res , 200 , {
                status:"success",
                count: results.length,
                results: results,
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