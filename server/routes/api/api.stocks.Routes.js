const SubRouter = require("../../common/SubRouter");
const apiProductsController = require("../../controllers/pharmacy/pharmacy.stocks.api.controller");
const { authorizeToApi, PERMISSIONS } = require("../../middlewares/authorizeToView");
const { checkPharmacyVerification } = require("../../middlewares/checkPharmacyVerification");


//create order routes
const apiStocksRouter = SubRouter.route("/api/v1/pharmacies/:pharmacyId/stocks")
.subRoute("/" , {
    get: [ checkPharmacyVerification() ,authorizeToApi(PERMISSIONS.createOrder) , apiProductsController.getStocksByName]
}).subRoute("/low" , {
    get : apiProductsController.getLowStocks,
})

module.exports = apiStocksRouter;