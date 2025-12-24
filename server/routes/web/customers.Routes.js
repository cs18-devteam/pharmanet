const SubRouter = require("../../common/SubRouter");
const customerMedicineController = require('../../controllers/customer/customer.medicines.controller');
const customerController = require('../../controllers/customer/customer.controller');
const customerPharmacyController = require('../../controllers/customer/customer.pharmacies.controller');
const pharmacyController = require('../../controllers/pharmacy/pharmacy.controller');
const { authenticate } = require("../../middlewares/authenticate");
const customerPaymentController = require("../../controllers/customer/customer.payments.controller");
const productManagementController = require("../../controllers/pharmanet/products.controller");

 // :: CUSTOMER ROUTES
const customerRouter = SubRouter.route('/customers/:customerId')
.subRoute('/' , {
    get: [ customerController.renderCustomerHome]
})
.subRoute('/profile' , {
    get: [customerController.renderCustomerProfile]
})
.subRoute('/medicines' , {
    get : [ customerMedicineController.renderCustomerMedicines ]
})
.subRoute('/medicines/:medicineId' , {
    get : [ customerMedicineController.renderCustomerSelectedMedicine ]
})
.subRoute('/pharmacy/register' , {
    get : [pharmacyController.renderPharmacyRegister],
})
.subRoute('/profile/edit')
.subRoute('/pharmacies' , {
    get : [ customerPharmacyController.renderCustomerPharmacies]
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
})
.subRoute('/products/pharmacy_management_system' , {
    get : productManagementController.renderPharmacyManagementSystemIntro
})
.subRoute('/products/pharmacy_management_system/register' , {
    get : productManagementController.renderPharmanetRegistrationPage
})




module.exports = customerRouter;