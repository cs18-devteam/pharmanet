const env = require("../common/middlewares/env");
const path = require("path");
env();
// const Database = require("../database/Database");
const csvtojson = require('csvtojson');
const Medicines = require("../models/MedicineModel");

Medicines.drop();
Medicines.createTable().then(()=>{

csvtojson().fromFile( path.join(__dirname , "./../data/medicines.csv")).then(json=>{
    const data = json.map(obj => {
        return {
            ...obj , 
            registrationDate: new Date(obj.registrationDate).toISOString().split('T')[0],
            manufacture : obj.manufacture.replace(/"/g, '\\"'),
        }
    });

    console.log('starting...');

    data.forEach(async (medicine)=>{
        try{

            await Medicines.save(medicine);
        }catch(e){
            console.log(e);
            console.log(medicine);
            return;
        }
    })

    console.log('data inserted successful 😝');
    
})
});



