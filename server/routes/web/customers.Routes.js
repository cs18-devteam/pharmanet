const SubRouter = require("../../common/SubRouter");
const customerMedicineController = require('../../controllers/customer/customer.medicines.controller');
const customerController = require('../../controllers/customer/customer.controller');
const customerPharmacyController = require('../../controllers/customer/customer.pharmacies.controller');
const pharmacyController = require('../../controllers/pharmacy/pharmacy.controller');

 // :: CUSTOMER ROUTES
const customerRouter = SubRouter.route('/customers/:customerId')
//new adding part to view medicine
.subRoute('/' , {
    get : customerController.renderPharmacyView,
})
.subRoute('/' , {
    get: customerController.renderCustomerHome
})
.subRoute('/profile' , {
    get: customerController.renderCustomerProfile
})
.subRoute('/medicines' , {
    get : customerMedicineController.renderCustomerMedicines
})
.subRoute('/pharmacy/register' , {
    get : pharmacyController.renderPharmacyRegister,
})
.subRoute('/profile/edit')
.subRoute('/pharmacies' , {
    get : customerPharmacyController.renderCustomerPharmacies,
})
.subRoute('/pharmacies/:pharmacyId' , {
    get : customerPharmacyController.renderCustomerPharmacy,
})
.subRoute('/history')
.subRoute('/transaction')
.subRoute('/orders')
.subRoute('/orders/:orderId');


module.exports = customerRouter;