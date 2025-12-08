const SubRouter = require("../../common/SubRouter");
const customerMedicineController = require('../../controllers/customer/customer.medicines.controller');
const customerController = require('../../controllers/customer/customer.controller');
const customerPharmacyController = require('../../controllers/customer/customer.pharmacies.controller');
const pharmacyController = require('../../controllers/pharmacy/pharmacy.controller');
const { authenticate } = require("../../middlewares/authenticate");
const customerPaymentController = require("../../controllers/customer/customer.payments.controller");

 // :: CUSTOMER ROUTES
const customerRouter = SubRouter.route('/customers/:customerId')
.subRoute('/' , {
    get: [ authenticate('customerId') ,customerController.renderCustomerHome]
})
.subRoute('/profile' , {
    get: [authenticate('customerId')  ,customerController.renderCustomerProfile]
})
.subRoute('/medicines' , {
    get : [authenticate('customerId') , customerMedicineController.renderCustomerMedicines ]
})
.subRoute('/pharmacy/register' , {
    get : [authenticate('customerId')  ,pharmacyController.renderPharmacyRegister],
})
.subRoute('/profile/edit')
.subRoute('/pharmacies' , {
    get : [authenticate('customerId')  , customerPharmacyController.renderCustomerPharmacies]
})
.subRoute('/pharmacies/:pharmacyId' , {
    get : customerPharmacyController.renderPharmacyLandingPage,
})
.subRoute('/history')
.subRoute('/transaction')
.subRoute('/orders')
.subRoute('/orders/:orderId')
.subRoute('/orders/:orderId/checkout' , {
    get : customerPaymentController.redirectToPaymentGateWay
});



module.exports = customerRouter;