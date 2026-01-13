const { apiCatchAsync } = require("../../common/catchAsync");
const File = require("../../common/File");
const getMultipartData = require("../../common/getMultipartData");
const { responseJson } = require("../../common/response");
const Products = require("../../models/ProductModel");

async function getProductStat(pharmacyId) {
    return {
        count :await Products.query(`select count(*) as count from this.table where pharmacyId=${pharmacyId}`)
    }
}

exports.createProduct = apiCatchAsync(async (req , res)=>{
    const reqData = await getMultipartData(req);
    const pharmacyId = req.pharmacyId;

    // console.log(reqData);

    if(!reqData.name) throw new Error("need product have a name");
    if(!reqData.price) throw new Error("need product have a price");
    if(!reqData.quantity) throw new Error("need product have a quantity");

    
    const productData = {
        pharmacyId,
        name : reqData.name ,
        category : reqData.category,
        brand:reqData.brand,
        price: reqData.price,
        expire: reqData.expire,
        quantity: reqData.quantity,
        image: "/images/bottel_of_pills.svg"
    }



    let [product] = await Products.save(productData)

    if(reqData.image instanceof File){
        const file = reqData.image;
        const filename = `${product.id}-${Date.now()}.${file.fileName.split('.').slice(-1)}`
        file.rename(filename);
        const saved = await file.save('/products');
        if(saved.status == "error"){
            throw new Error("product image not uploaded");
        };
        product = await Products.update({
            id : product.id , 
            image:  "/products/" + filename,
        })
    }




    return responseJson(res , 201 , {
        status:'success',
        results: product,
        stat : await getProductStat(pharmacyId),
    })
})


exports.getProducts  = apiCatchAsync(async (req , res)=>{
    const pharmacyId = req.pharmacyId;
    const limit = req.params.get("limit");
    const search = req.params.get("search");


    let products = [];



    if(search){
        let string = "%";
        for(const c of search){
            string += `${c}%`; 
        }
        products = await Products.query(`select * from this.table where pharmacyId=${pharmacyId} and name like '${string}' limit ${limit} `);

    }else{
        products = await Products.query(`select * from this.table where pharmacyId=${pharmacyId} limit ${limit}`);
    }
    

    return responseJson(res , 200 , {
        status:"success",
        results: products,
        count: products.length,
        stat : await getProductStat(pharmacyId) ,
    })
})


exports.getProductData = apiCatchAsync(async (req ,res)=>{
    const productId = req.productId;
    if(!productId) throw new Error("can't find product");
    const [product] = await Products.getById(productId);
    return responseJson(res , 200 , {
        status:"status",
        results: product,
    })
})



exports.updateProduct = apiCatchAsync(async (req , res)=>{
   const reqData = await getMultipartData(req);
    const productId = req.productId;
    const pharmacyId = req.pharmacyId;


    // console.log(reqData);
    const productData = {
       id: productId
    }

    if(reqData.name) productData.name = reqData.name;
    if(reqData.category) productData.category = reqData.category;
    if(reqData.branch) productData.branch = reqData.branch;
    if(reqData.price) productData.price = reqData.price;
    if(reqData.expire) productData.expire = reqData.expire;
    if(reqData.quantity) productData.quantity = reqData.quantity;





    let [product] = await Products.update(productData)

    if(reqData.image instanceof File){
        const file = reqData.image;
        const filename = `${product.id}-${Date.now()}.${file.fileName.split('.').slice(-1)}`
        file.rename(filename);
        const saved = await file.save('/products');
        if(saved.status == "error"){
            throw new Error("product image not uploaded");
        };
        product = await Products.update({
            id : productId , 
            image:  "/products/" + filename,
        })
    }




    return responseJson(res , 201 , {
        status:'success',
        results: product,
        stat : await getProductStat(pharmacyId),
    })
})


exports.deleteProduct = apiCatchAsync(async (req , res)=>{
    const productId = req.productId;
    if(!productId) throw new Error("can't find product id");
    const product = await Products.deleteById(productId);

    if(product){
        return responseJson(res , 204 , {
            status:"success",
        })
    }else{
        return responseJson(res , 400 , {
            status:"error",
        })
    }
    
})