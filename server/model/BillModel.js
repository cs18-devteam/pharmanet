const Model = require("../common/Model");

class ProductModel extends Model{
    constructor(){
        super();
        this.name = {
            type:"VARCHAR(100)",
            null: false,
        }

        this.brand = {
            type:"VARCHAR(100)",
        }

        this.quantity = {
            type:"INT",
        }

        this.price = {
            type:"FLOAT",
        }

        this.expire = {
            type:"DATE",
        }

        this.category = {
            type:"VARCHAR(100)",
        }

    }
}



const Products = new ProductModel();
Products.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});


module.exports = Products;