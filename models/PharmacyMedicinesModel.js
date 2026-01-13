const Model = require("../common/Model");

class PharmacyMedicinesModel extends Model{
    constructor(){
        super();
        this.medicineId ={
            type:"INT",
            null: false,
        }

        this.pharmacyId = {
            type:"INT",
            null : false,
        }

        this.price = {
            type:"FLOAT",
        }

        this.stock = {
            type:"FLOAT",
        }

        this.publicStock = {
            type:"FLOAT",
        }
    }
}

const PharmacyMedicines = new PharmacyMedicinesModel();

PharmacyMedicines.createTable().catch(e=>{
    console.log(e);
    console.log("error in pharmacy product model");
});

module.exports = PharmacyMedicines;