const SubRouter = require("../../common/SubRouter");
const cashierController = require("../../controllers/Cashier/cashier.controller");

exports.cashierRouter = SubRouter.route('/pharmacies/:pharmacyId/cashiers/:cashierId')
.subRoute('/' , {
    get: cashierController.renderCashierDashboard,
})
.subRoute('/bills/create' , {
    get : cashierController.renderCashierBillPage
})
.subRoute('/orders' , {
    get : cashierController.renderCashierOrder
})
.subRoute('/customers' , {
    get : cashierController.renderCashierCustomer
})
.subRoute('/sales' , {
    get : cashierController.renderCashierSale
})
.subRoute('/products' , {
    get : cashierController.renderCashierProduct
})
.subRoute('/products/management' , {
    get : cashierController.cashierProductManagement,
})


exports.cashierApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId/cashiers/:cashierId')
.subRoute('/products' , {
    post : cashierController.createProduct
})
.subRoute('/payments/cash' , {
    post : cashierController.paymentCash
})
.subRoute('/payments/card' , {
    post : cashierController.paymentCard
})
.subRoute('/payments/qr' , {
    post : cashierController.paymentQR,
})
.subRoute('/products/:productId' , {
    update : cashierController.renderCashierProduct,
    delete : cashierController.renderCashierProduct
});


