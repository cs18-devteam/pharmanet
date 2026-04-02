const SubRouter = require("../../common/SubRouter");
const pharmacyProductController = require("../../controllers/pharmacy/pharmacy.product.controller");
const { authorizeToApi, PERMISSIONS } = require("../../middlewares/authorizeToView");

exports.pharmacyProductApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId/products')
.subRoute('/' , {
    get: pharmacyProductController.getProducts,
})
.subRoute('/create' , {
    post : [authorizeToApi(PERMISSIONS.createProducts) , pharmacyProductController.createProduct],
})
.subRoute("/:productId" , {
    delete:pharmacyProductController.deleteProduct,
    update: pharmacyProductController.updateProduct,
    get:pharmacyProductController.getProductData,
})