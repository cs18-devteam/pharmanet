const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const Carts = require("../../models/CartModel");
const Medicines = require("../../models/MedicineModel");
const Products = require("../../models/ProductModel");

exports.addToCart = async (req , res)=>{
    await Carts.query('start transaction');
    
    try{
        const reqData = JSON.parse(await getRequestData(req));

        const carDataObj = {
            productId : undefined,
            medicineId : undefined,
            quantity: reqData.quantity,
            userId : reqData.id,
        }

        if(!reqData.type) throw new Error("type property is not defined");





        if(reqData.type == "medicine"){
            carDataObj.medicineId = reqData.itemId;
            const [medicine] = await Carts.get({userId : carDataObj.userId , medicineId : carDataObj.medicineId});

            if(medicine){
                throw new Error("this medicine is already added");
            }

        }else if(reqData.type == "product"){
            carDataObj.productId = reqData.itemId;
            const [product] = await Carts.get({userId : carDataObj.userId , productId : carDataObj.productId});

            if(product){
                throw new Error("this product is already added");
            }
        }


        const cart = await Carts.save(carDataObj);

        Carts.query('commit');

        return responseJson(res , 200 , {
            status:"success",
            results:cart,
        });

    }catch(e){
        await Carts.query('rollback');
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:"add to cart failed",
            error:e,
            message: e.message,
        })
    }
}


exports.getCart = async (req, res)=>{
    try{
        const id = req.customerId;
        const carts = await Carts.get({userId : id});

    
        let results = carts.map(async cart=>{
            if(cart.productId){
                const [product] = await Products.getById(cart.productId);
                if(!product) throw new Error("can not find product")
                return { productId: product.id , ...product , ...cart}
            }else{
                const [medicine] = await await Medicines.getById(cart.medicineId);
                if(!medicine) throw new Error("can not find product")
                return {medicineId : medicine.id , ...medicine , ...cart};
            }
        })


        results = await Promise.all(results);



        return responseJson(res , 200 , {
            status:"success",
            results,
        })

    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:e.message,
            error:e,
            
        })
    }
}

exports.updateCart = async (req ,res)=>{
    await Carts.startTransact();

    try{
        const reqData = JSON.parse(await getRequestData(req));

        const carDataObj = {
            id : reqData.id,
            
        }
        if(reqData.quantity) carDataObj.quantity = reqData.quantity;
        if(reqData.productId) carDataObj.productId = reqData.productId;
        if(reqData.medicineId) carDataObj.medicineId = reqData.medicineId;

        if(reqData.productId && reqData.medicineId) throw new Error("can not have medicineId and productId for same item");

        
        


        if(!reqData.id) throw new Error("cart id is not define");

        const [item] = await Carts.getById(reqData.id);
        const cart = await Carts.update(carDataObj);

        if(!item){
            throw new Error(`this ${reqData.type || item.type || "item"} can't find in your cart`);
        }
        
        await Carts.commit();
        return responseJson(res , 200 , {
            status:"status",
            results: cart,
        })

    }catch(e){
        await Carts.rollback();
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:e.message,
            error:e,
        })
    }
}


exports.deleteCart = async (req , res)=>{
    try{
        const reqData = JSON.parse(await getRequestData(req));
        const item = await Carts.deleteById(reqData.itemId);


        await Carts.commit();
        return responseJson(res , 204 , {
            status:"success",
            results: item,
        })

    }catch(e){
        await Carts.rollback();
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message : e.message,
            error:e,
        })
    }
}