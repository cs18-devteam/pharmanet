const Model = require("../common/Model");

class CartsModel extends Model{
    constructor(){
        super();

        this.productId = {
            type:"INT",
        }

        this.medicineId = {
            type:"INT",
        }

        this.quantity = {
            type:"FLOAT",
        }

        this.userId = {
            type:"INT",
            null : false,
        }
    }
}


const Carts = new CartsModel();

Carts.createTable().then(()=>{
    console.log('carts table created successfully');
}).catch(e=>{
    console.log(e);
    console.log('⚠️ carts table not created');
})

module.exports = Carts;