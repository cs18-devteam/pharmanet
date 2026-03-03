const SubRouter = require("../../common/SubRouter");
const customerCartController = require("../../controllers/customer/customer.cart.controller");
const customerPharmacyController = require("../../controllers/customer/customer.pharmacies.controller");
const customerUploadController = require("../../controllers/customer/customer.uploads.controller");
//const customerProfileController = require("../../controllers/customer/customer.profile.controller");

exports.customerApiRouter = SubRouter.route("/api/v1/users/:customerId")


// .subRoute("/", {
//     update: customerProfileController.updateCustomerProfile,
//     delete: customerProfileController.deleteCustomerProfile,
    
// })
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


//server\controllers\customer\customer.profile.controller.js