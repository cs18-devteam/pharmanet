const SubRouter = require("../../common/SubRouter");
const customerPharmacyController = require("../../controllers/customer/customer.pharmacies.controller");

exports.customerApiRouter = SubRouter.route("/api/v1/customers/:customerId/pharmacy/register")
.subRoute('/' , {
    post: customerPharmacyController.createPharmacy,
})