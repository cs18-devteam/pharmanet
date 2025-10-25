const Products = require("../model/productModel")

exports.createProduct = async(req,res)=>{
    const newProduct = await Products.save({
        product_Id: AUTO_INCREMENT,
        name: "Pandol",
        price: "10"
    })
    console.log(newProduct);

}


exports.getProduct = async(req,res)=>{
    const allProducts = await Products.get();
    console.log(allProducts);
 
}

 
exports.updateProduct = async(req,res)=>{
 const updateProduct = await Products.update({
    id : 1,
    name : "Asprine"
 })
 console.log(updateProduct);
}

exports.deleteProduct = async(req,res)=>{
    const deleteProduct = await Products.deleteById(1);
    console.log(deleteProduct);

}

