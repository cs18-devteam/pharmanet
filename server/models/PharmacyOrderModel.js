import Model from "../common/Model.js";

class PharmacyOrderModel extends Model{
    constructor(){
        super();


        this.pharmacyId = {
            type : "INT" , 
            null : false,
        }


    }
}




const PharmacyOrders = new PharmacyOrderModel();

PharmacyOrders.createTable().then(()=>{
    console.log("pharmacy Order table created");
}).catch((e)=>{
    console.log("pharmacy orders table not created")
    console.log(e);
})

module.exports = PharmacyOrders;