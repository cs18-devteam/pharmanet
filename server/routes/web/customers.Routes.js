const AppRouter = require("../../common/AppRouter");
const Router = require("../../common/Router");
const customerController = require("../../controllers/customer/customer.controller");
const customerMedicineController = require("../../controllers/customer/customer.medicines.controller");
const pharmacyController = require("../../controllers/pharmacy/pharmacy.controller");


    AppRouter.pipe(req ,res).route("/customers/:customerId/profile/edit");

    AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies")
        ?.get(customerPharmacyController.renderCustomerPharmacies);

    AppRouter.pipe(req ,res).route("/customers/:customerId/pharmacies/:pharmacyId")
    ?.get(customerPharmacyController.renderCustomerPharmacy);

    AppRouter.pipe(req ,res).route("/customers/:customerId/history")
    ?.get(renderCustomerHistory);

    AppRouter.pipe(req ,res).route("/customers/:customerId/transaction") 
    ?.get(renderCustomerTransactions);

    AppRouter.pipe(req ,res).route("/customers/:customerId/orders")
    ?.get(renderCustomerOrders);

    AppRouter.pipe(req ,res).route("/customers/:customerId/orders/:orderId")
    ?.get(renderCustomerOrderDetails);


exports.homeRouter = Router.create()
    .get(customerController.renderCustomerHome);

exports.medicineRouter = Router.create()
    .get(customerMedicineController.renderCustomerMedicines);

exports.profileRouter = Router.create()
    .get(customerController.renderCustomerProfile);

exports.pharmacyRegister = Router.create()
    .get(pharmacyController.renderPharmacyRegister)





