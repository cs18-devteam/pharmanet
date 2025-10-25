const Model = require("../../../common/Model")

class ProductModel extends Model{
    constructor(){
        super();
    
    this.product_Id = {
        type : "INT",
        null:false,
        unique : true,
        primaryKey : 'ProductModel'
    }

    this.name = {
        type : "VARCHAR(100)"
    }

    this.price = {
        type : "INT"
    }
}
}

const Products = new ProductModel();
module.exports = Products;