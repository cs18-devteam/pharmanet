const Model = require("../common/Model");

class OrderProductsModel extends Model{
    constructor(){
        super();
        this.orderId = {
            type:"INT",
            null: false,
        }

        this.productId = {
            type:"INT",
            null : false
        }

        this.price = {
            type:"FLOAT",
            null : false
        }

        this.discount = {
            type:"FLOAT",
        }

        this.quantity = {
            type :"FLOAT"
        }
    }
}

const OrderProducts = new OrderProductsModel();
OrderProducts.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = OrderProducts;