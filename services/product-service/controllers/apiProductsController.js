const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Products = require("../model/ProductModel")


exports.getProducts =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('name')) filter.name = `${req.params.get('name')}`;
    if(req.params.get('pharmacyId')) filter.name = req.params.get('pharmacyId')
    if(req.params.get('price')) filter.price = req.params.get('price')
    if(req.params.get('stock')) filter.price = req.params.get('stock')

    let content =  ''
    if(filter.id || filter.name || filter.price){
        content = await Products.get(filter);
    }else{
        content = await Products.get();
    }

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
    
}


exports.deleteProduct =async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const results = await Products.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}


exports.updateProduct = async (req , res)=>{
    const {name , price , id , stock } = JSON.parse(await getRequestData(req));
    const results = await Products.update({
        name , price , id , stock
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createProduct = async (req , res)=>{
    const {name , price , stock  , pharmacyId} = JSON.parse(await getRequestData(req));
    const newProduct = await Products.save({
        name , price , stock , pharmacyId ,
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newProduct,
        count : newProduct.length,
    });
}