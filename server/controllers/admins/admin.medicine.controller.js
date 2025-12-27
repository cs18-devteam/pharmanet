const Bridge = require("../../common/Bridge");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Database = require("../../database/Database");
const Medicines = require("../../models/MedicineModel");
const db = Database.getInstance();
const { hashPassword } = require("../../common/encrypt");

exports.renderAdminMedicinesView = async (req ,res)=>{
    const [admin] = await Medicines.getById(req.adminId);


    return response(res , view('admin/medicines',{
        sidebar : view('admin/component.sidebar' ,admin),
        header : view('component.header' , {
          name:"Medicines || Pharmanet - Manage all medicines here",
        }),
        
    }) , 200);
}

exports.addMedicine = async (req, res) => {
    try {
        const data = JSON.parse(await getRequestData(req));
        await db.query(`USE ${process.env.DATABASE_NAME}`);  // Select the database
        const newMedicine = await Medicines.save(data);
        return responseJson(res, 201, newMedicine);  // Changed to 201 for success
    } catch (e) {
        console.log(e);
        return responseJson(res, 400, { error: "Failed to add medicine" });
    }
};

exports.getMedicines = async (req, res) => {
    try {
        await db.query(`USE ${process.env.DATABASE_NAME}`);  // Select the database
        const medicines = await Medicines.get();
        return responseJson(res, 200, medicines);
    } catch (e) {
        console.log(e);
        return responseJson(res, 400, { error: "Failed to fetch medicines" });
    }
};

exports.deleteMedicine = async (req, res) => {
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    try {
        await Medicines.deleteById(id);
        return responseJson(res, 200, { message: "Medicine deleted successfully" });
    } catch (error) {
        console.error(error);
        return responseJson(res, 500, { error: "Failed to delete medicine" });
    }
};

exports.sendJsonMedicinesList = async (req , res)=>{
    try{
        const allMedicines = await Medicines.get();
        return response(res , JSON.stringify(allMedicines) , 200);
    }catch(e){
        console.log(e);
        return response(res , JSON.stringify(e) , 400);
    }
}