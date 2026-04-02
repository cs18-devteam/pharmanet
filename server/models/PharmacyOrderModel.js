const Model  = require("../common/Model.js");

class PharmacyOrderModel extends Model{
    constructor(){
        super();


        this.pharmacyId = {
            type : "INT" , 
        }

        this.staffId = {
            type:"INT",
        }
        this.userId = {
            type:"INT",
        }

        this.status = {
            type:"VARCHAR(100)"
        }

        this.prescription = {
            type:"TEXT"
        }

        this.paymentMethod = {
            type:"VARCHAR(50)",
        }

        this.cardNo = {
            type:"VARCHAR(50)"
        }

        this.createdAt = {
            type:"datetime",
        }
    }
}




const PharmacyOrders = new PharmacyOrderModel();

PharmacyOrders.createTable().then(()=>{
    // console.log("pharmacy Order table created");
}).catch((e)=>{
    console.log("pharmacy orders table not created")
    console.log(e);
})

// PharmacyOrders.drop();

module.exports = PharmacyOrders;
