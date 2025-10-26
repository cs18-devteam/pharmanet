const UserModel = require("./UserModel");

class PharmacyStaffModel extends UserModel{
    constructor(){
        super();

        this.role = {
            type:"ENUM('owner' , 'cashier' , 'stockmanager' , 'pharmacist' , 'accountant')"
        }

        this.pharmacyId = {
            type:"INT",
            null:false,
        }
    }
}


const PharmacyStaff = new PharmacyStaffModel();
PharmacyStaff.createTable().catch(e=>{
    console.log(e);
    console.log("pharmacy staff table not created");
})


module.exports = PharmacyStaff;