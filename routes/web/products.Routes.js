const SubRouter = require("../../common/SubRouter");
const pharmanetProductsController = require("../../controllers/pharmanet/products.controller");



exports.productsRouter = SubRouter.route('/products/')
.subRoute("/pharmacy_management_system" , {
    get : pharmanetProductsController.renderPharmacyManagementSystemIntro 
})
