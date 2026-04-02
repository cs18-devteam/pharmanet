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

        // order permissions

        this.createOrder = {
            type :"BOOL"
        }
        this.deleteOrder = {
            type :"BOOL"
        }
        this.readOrder = {
            type :"BOOL"
        }
        this.updateOrder = {
            type :"BOOL"
        }


        // transaction permissions

        this.readTransactions = {
            type : "BOOL"
        }


        // products permissions

        this.searchProducts = {
            type:"BOOL",
        }

        this.updateProducts = {
            type:"BOOL",
        }

        this.deleteProducts = {
            type:"BOOL",
        }

        this.createProducts = {
            type:"BOOL",
        }
        

        // medicine permission
        
        this.searchMedicines = {
            type:"BOOL",
        }

        this.createMedicines = {
            type:"BOOL",
        }

        this.deleteMedicines = {
            type:"BOOL",
        }

        this.updateMedicines = {
            type:"BOOL",
        }


        // staff permission
        
        this.searchStaff = {
            type:"BOOL",
        }

        this.updateStaff = {
            type:"BOOL",
        }

        this.deleteStaff = {
            type:"BOOL",
        }

        this.createStaff = {
            type:"BOOL",
        }

        



    }

}


const PharmacyStaff = new PharmacyStaffModel();
PharmacyStaff.createTable().catch(e=>{
    console.log(e);
    console.log("pharmacy staff table not created");
})


module.exports = PharmacyStaff;