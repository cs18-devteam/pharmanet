const SubRouter = require("../../common/SubRouter");
const customerCartController = require("../../controllers/customer/customer.cart.controller");
const customerPharmacyController = require("../../controllers/customer/customer.pharmacies.controller");
const customerUploadController = require("../../controllers/customer/customer.uploads.controller");

exports.customerApiRouter = SubRouter.route("/api/v1/customers/:customerId")
.subRoute("/chats/assets/prescriptions" , {
    post : customerUploadController.uploadPrescriptions
})
.subRoute('/pharmacy/register' , {
    post: customerPharmacyController.createPharmacy,
}).subRoute('/cart' ,{
    get:customerCartController.getCart,
    post:customerCartController.addToCart,
    delete:customerCartController.deleteCart,
    update:customerCartController.updateCart
})


