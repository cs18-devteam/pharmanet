const Model = require("../common/Model");

class PharmacyOrderItemsModel extends Model{
    constructor(){
        super();

        this.orderId = {
            type :"INT",
            null : false,
        }

        this.itemId = {
            type :"INT",
            null : false,
        }

        this.itemType = {
            type:"VARCHAR(50)",
        }

        this.price = {
            type:"FLOAT",
        }

        this.discount = {
            type:"FLOAT"
        }

        this.quantity = {
            type:"FLOAT",
        }


    }
}



const PharmacyOrdersItems = new PharmacyOrderItemsModel();
PharmacyOrdersItems.createTable().then(()=>{
    console.log("✅ pharmacy order items table created");
}).catch(e=>{
    console.log("🚫 pharmacy order items table not created");
    console.log(e);
})
module.exports = PharmacyOrdersItems;