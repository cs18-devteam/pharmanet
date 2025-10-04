const Model = require("../common/Model");

class OrderModel extends Model{
    constructor(){
        super();
        this.user = {
            type:"INT",
            null: false,
        }

        this.createdDate = {
            type:"DATE",
            null : false,
        }

        this.acceptedDate = {
            type:"DATE",
        }

        this.acceptedBy = {
            type:"INT",
        }

        this.pharmacyId = {
            type:"INT",
        }

    }
}

const Orders = new OrderModel();
Orders.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Orders;