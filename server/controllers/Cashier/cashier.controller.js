const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Products = require("../../models/BillModel");



exports.renderCashierBillPage = async(req , res)=>{
    try{

        return response(res, view('Cashier/Cashier-createBill', {
            header : view('component.header' , {
                name:"Create Bill",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}

exports.renderCashierCustomer = async(req, res) => {
    try{

        return response(res, view('cashier/cashier-customer',{
            header : view('component.header' , {
                name:"Processing Orders || Pharmanet",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.renderCashierDashboard = async(req, res) => {
    try{

        return response(res, view('Cashier/cashier-dashboard',{
            header : view('component.header' , {
                name:"Dashboard",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.renderCashierorder = async(req, res) => {
    try{

        return response(res, view('cashier/cashier-order',{
            header : view('component.header' , {
                name:"Orders || Manage all Orders here",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.renderCashierPaymentCard = async(req, res) => {
    try{

        return response(res, view('cashier/cashier-payment-card' , {
            header : view('component.header' , {
                name:"Payment by Card",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.renderCashierPaymentCash = async(req, res) => {
    try{

        return response(res, view('cashier/cashier-payment-cash' , {
            header : view('component.header' , {
                name:"Payment by cash",
            })
        }), 200);
        
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}

exports.renderCashierPaymentQR = async(req, res) => {
    try{

        return response(res, view('cashier/cashier-payment-QR',{
            header : view('component.header' , {
                name:"Payment by QR",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.renderCashierProduct = async(req, res) => {
    try{

        const allProducts = await Products.get();
        console.log(allProducts);
        
        return response(res, view('cashier/cashier-product' , {
            rows: allProducts.map(product => view('Cashier/component.product' , {
                header : view('component.header' , {
                    name:"Products || Pharmanet",
                }),
                ...product
            })).join(' ')
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.renderCashierSale = async(req, res) => {
    try{

        return response(res, view('cashier/cashier-sales',{
            header : view('component.header' , {
                name:"Sales Management",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.cashierProductManagement = async(req, res) => {
    try{

        return response(res, view('cashier/Product-management',{
            header : view('component.header' , {
                name:"Product management",
            })
        }), 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
    
}

exports.createProduct= async(req, res) => {
    try{

        const data = JSON.parse(await getRequestData(req));
        console.log(data);
        const product = await Products.save(data);
        return response(res , JSON.stringify({
            status:"success",
            data: product,
        }));
    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:"product not added",
            error:e,
        })
    }

  }



exports.deleteProduct = async (req , res)=>{
    const data = JSON.parse(await getRequestData(req));
    try{
        console.log('from delete product ' , data);

        
        if(data.id){
            const deleteLog = await Products.deleteById(data.id);
            return responseJson(res , 204 , {
                status:"success",
                message : `${data.id} product deleted successfully`
            })
        }
    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:"product not deleted",
            error:e,
        })
    }
}



exports.updateProduct = async (req , res)=>{
    try{
        const data = JSON.parse(await getRequestData(req));  
        console.log("this is form update product");      
        if(data.id){
            const udpatedProduct = await Products.update(data);
            console.log(udpatedProduct);
            return responseJson(res , 200 , {
                status:"success",
                resutls : udpatedProduct
            })

        }else{
            return responseJson(res , 400 , {
                status:'error',
                message :"product id is not available",
            })
        }
    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:"product not updated",
            error:e,
        })
    }
}


exports.getAllProducts = async (req , res)=>{
    try{
        const products = await Products.get();
        return responseJson(res , 200 , {
            status:"success",
            resutls: products,
        })
    }catch(e){
        console.log(e);
        return responseJson(res , 500 , {
            status:"error",
            message:"insternal server error",
            error:e,
        })
    }
}

exports.getProductById = async (req , res)=>{
    try{
        const id = req.params.get("id");
        const products = await Products.get(id);
        return responseJson(res , 200 , {
            status:"success",
            resutls: products,
        })
    }catch(e){
        console.log(e);
        return responseJson(res , 500 , {
            status:"error",
            message:"insternal server error",
            error:e,
        })
    }
}


