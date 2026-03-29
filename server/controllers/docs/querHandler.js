const { apiCatchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { responseJson } = require("../../common/response");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const PharmacyOrders = require("../../models/PharmacyOrderModel");
const Products = require("../../models/ProductModel");
const Transactions = require("../../models/TransactionModel");


function getModel(model){
    switch(model){
        case "products":
            return Products;
        case "medicines":
            return Medicines;
        case "pharmacies":
            return Pharmacies;
        case "transactions":
            return Transactions;
        case "orders":
            return PharmacyOrders;
        case "pharmacyMedicines":
            return PharmacyMedicines;
        default :
            return undefined;
    }
}


exports.queryHandler = apiCatchAsync(async (req , res)=>{
    const {query , model , fields} = JSON.parse(await getRequestData(req));
    const pharmacyId = req.pharmacyId;


    
    const [pharmacy] =  await Pharmacies.getById(pharmacyId);
    if(!pharmacy) throw new Error("pharmacy not found");
    const Model = getModel(model);
    if(!Model) throw new Error("invalid model name , ex :products , medicines, pharmacies, transactions, orders , pharmacyMedicines")

    const data = await Model.query(`select ${fields || "*"} from this.table ` + (query ? "where " + query : " "));

    responseJson(res , 200 , {
        status:"success",
        data : data,
    })
})