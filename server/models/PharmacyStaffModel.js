const Model = require("../common/Model");


class PharmacyStaffModel extends Model{
    constructor(){
        super();

        this.role = {
            type:"ENUM('owner' , 'cashier' , 'stockmanager' , 'pharmacist' , 'accountant')"
        }

        this.pharmacyId = {
            type:"INT",
            null:false,
        }

        this.userId  = {
            type :"INT" , 
            null : false,
        }
    }

}


const PharmacyStaff = new PharmacyStaffModel();
PharmacyStaff.createTable().catch(e=>{
    console.log(e);
    console.log("pharmacy staff table not created");
})


module.exports = PharmacyStaff;