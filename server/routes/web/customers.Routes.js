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
    get: [ authenticate('customerId') ,customerController.renderCustomerHome]
})
.subRoute('/profile' , {
    get: [authenticate('customerId')  ,customerController.renderCustomerProfile]
})
.subRoute('/medicines' , {
    get : [authenticate('customerId') , customerMedicineController.renderCustomerMedicines ]
})
.subRoute('/medicines/:medicineId' , {
    get : [authenticate('customerId') , customerMedicineController.renderCustomerSelectedMedicine ]
})
.subRoute('/pharmacy/register' , {
    get : [authenticate('customerId')  ,pharmacyController.renderPharmacyRegister],
})
.subRoute('/profile/edit')
.subRoute('/pharmacies' , {
    get : [authenticate('customerId')  , customerPharmacyController.renderCustomerPharmacies]
})
.subRoute('/pharmacies/:pharmacyId' , {
    get : [authenticate('customerId') , customerPharmacyController.renderPharmacyLandingPage],
})
.subRoute('/history')
.subRoute('/transaction')
.subRoute('/orders' , {
    get : [authenticate('customerId') , customerController.renderCustomerOrders]
})
.subRoute('/loyalty' , {
    get : [authenticate('customerId') ,customerController.renderLoyaltyPoints]
})
.subRoute('/orders/:orderId')
.subRoute('/orders/:orderId/checkout' , {
    get : [authenticate('customerId') ,customerPaymentController.redirectToPaymentGateWay ]
})
.subRoute('/products/pharmacy_management_system' , {
    get :[authenticate('customerId') , productManagementController.renderPharmacyManagementSystemIntro ]
})
.subRoute('/products/pharmacy_management_system/register' , {
    get : [authenticate('customerId') ,productManagementController.renderPharmanetRegistrationPage ]
})




module.exports = customerRouter;