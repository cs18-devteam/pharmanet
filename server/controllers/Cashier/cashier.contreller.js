const { getRequestData } = require("../../common/getRequestData");
const { response } = require("../../common/response");
const view = require("../../common/view");
const Database = require("../../database/Database");
const Products = require("../../model/BillModel");
const db = Database.getInstance();


exports.renderCashierBillPage = async(req , res)=>{
    return response(res, view('Cashier/Cashier-createBill', {
        
    }), 200);
}

exports.renderCashierCustomer = async(req, res) => {
    return response(res, view('cashier/cashier-customer'), 200);
    
}

exports.renderCashierDashboard = async(req, res) => {
    return response(res, view('Cashier/cashier-dashboard'), 200);
    
}

exports.renderCashierorder = async(req, res) => {
    return response(res, view('cashier/cashier-order'), 200);
    
}

exports.renderCashierPaymentCard = async(req, res) => {
    return response(res, view('cashier/cashier-payment-card'), 200);
    
}

exports.renderCashierPaymentCash = async(req, res) => {
    return response(res, view('cashier/cashier-payment-cash'), 200);
    
}

exports.renderCashierPaymentQR = async(req, res) => {
    return response(res, view('cashier/cashier-payment-QR'), 200);
    
}

exports.renderCashierProduct = async(req, res) => {
    const allProducts = await Products.get();
    console.log(allProducts);
    console.log("helo")

    return response(res, view('cashier/cashier-product' , {
        rows: allProducts.map(product => view('Cashier/component.product' , product)).join(' ')
    }), 200);
    
}

exports.renderCashierSale = async(req, res) => {
    return response(res, view('cashier/cashier-sales'), 200);
    
}

exports.cashierProductManagement = async(req, res) => {
    return response(res, view('cashier/Product-management'), 200);
    
}

exports.createProduct= async(req, res) => {
        const data = JSON.parse(await getRequestData(req));
        console.log(data);
        const product = await Products.save(data);
        return response(res , JSON.stringify({
            status:"success",
            data: product,
        }));

  }