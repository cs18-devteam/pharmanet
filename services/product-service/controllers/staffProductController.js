const {response} = require("../common/response")
const view = require("../common/view");
const Products = require("../model/ProductModel");

exports.getAllProducts = async (req , res)=>{
    const allProducts = await Products.get();
    const productCards = allProducts.map(product=>view('staffProductCard' , {price : product.price , name: product.name}))
    return response( res , view('productManagement' , {productCards : productCards.join(' ')}));
}