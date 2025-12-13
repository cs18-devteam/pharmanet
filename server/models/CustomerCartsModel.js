const Model = require("../common/Model");

class CustomerCartsModel extends Model{
    constructor(){
        super();
        this.userId = {
            type:"INT",
        }

        this.productId = {
            type:"INT",
        }

        this.quantity  = {
            type:"FLOAT",
        }
    }
}



const CustomerCarts = new CustomerCartsModel();

CustomerCarts.createTable().then(()=>{
    console.log('customer table create successful');
}).catch(e=>{
    console.log(e);
    console.log('customer table not created');
})

module.exports = CustomerCarts;