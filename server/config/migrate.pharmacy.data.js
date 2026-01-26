const env = require("../common/middlewares/env");
const fs = require("fs");
const path = require("path");
env();
// const Database = require("../database/Database");
const Medicines = require("../models/MedicineModel");
const Pharmacies = require("../models/PharmacyModel");

// Medicines.drop();
// Medicines.createTable().then(()=>{

const data = JSON.parse(fs.readFileSync( path.join(__dirname , "./../data/pharmacies.json")));


console.log('starting...');

data.forEach(async (pharmacy)=>{
    try{
        pharmacy.id = undefined;
        await Pharmacies.save(pharmacy);
    }catch(e){
        console.log(e);
        return;
    }
})

console.log('data inserted successful 😝');





