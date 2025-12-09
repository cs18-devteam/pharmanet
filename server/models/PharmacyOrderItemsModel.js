import Model from "../common/Model.js";

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
    }
}


const PharmacyOrders = new PharmacyOrderItemsModel();
module.exports = PharmacyOrders;