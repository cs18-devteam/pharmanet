const Model = require("../common/Model");

class ProductModel extends Model{
    constructor(){
        super();
        this.name = {
            type:"VARCHAR(50)",
            null: false,
        }

        this.price = {
            type:"FLOAT",
            null : false,
        }

        this.description = {
            type:"VARCHAR(500)",
        }

    }
}

const Products = new ProductModel();
Products.createTable().catch(e=>{
    console.log(e);
    console.log("error in product model");
});
module.exports = Products;