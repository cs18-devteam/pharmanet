const { response } = require("../../../common/response");
const view = require("../../../common/view");

exports.renderCashierDashboard = async (req , res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.dashboard') , 200);
}

exports.renderCashierCustomer = async (req , res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.customer') , 200);
}

exports.renderCashierOrder = async (req ,res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.Order'))
}

exports.renderCashierCreateBill = async (req , res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.createbill') , 200);
}

exports.renderCashierPaymentCard = async (req , res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.paymentcard') , 200);
}

exports.renderCashierPaymentCash = async (req ,res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.paymentcash') , 200)
}
exports.renderCashierPaymentQR = async (req ,res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.paymentQR') , 200)
}

exports.renderCashierProduct = async (req ,res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.product') , 200)
}

exports.renderCashierSales = async (req ,res)=>{
    return response(res , view('/pharmacy/cashiers/cashier.sales') , 200)
}

exports.renderCashier = async (req ,res)=>{
    return response(res , view('/pharmacy/cashiers/cashier') , 200)
}
