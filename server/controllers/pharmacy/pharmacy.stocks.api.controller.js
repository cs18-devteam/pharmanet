const { apiCatchAsync } = require("../../common/catchAsync");
const readCookies = require("../../common/readCookies");
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


exports.getLowStocks = apiCatchAsync(async (req , res)=>{
    const {pharmacyId} = readCookies(req);
    let medicines = await PharmacyMedicines.query(`select * from this.table where pharmacyId = ${pharmacyId} and publicStock <= 10 `);

    medicines = await Promise.all(medicines.map(async m=>{
        const [details] = await Medicines.getById(m.medicineId);
        return {...m , name : details.geneticName , quantity : m.publicStock , type:"medicine"}
    }))
    

    let products = await Products.query(`select * from this.table where pharmacyId = ${pharmacyId} and quantity <= 10`);
    products = products.map(p=>{
        return {...p , type:"product"}
    })


    return responseJson(res   , 200 , {
        status:"success",
        data : [...medicines , ...products],
    })

})