const { getRequestData } = require("../../common/getRequestData");
const { response } = require("../../common/response");
const view = require("../../common/view");
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







