const SubRouter = require("../../common/SubRouter");
const apiProductsController = require("../../controllers/pharmacy/pharmacy.stocks.api.controller");
const { authorizeToApi, PERMISSIONS } = require("../../middlewares/authorizeToView");

const apiStocksRouter = SubRouter.route("/api/v1/pharmacies/:pharmacyId/stocks")
.subRoute("/" , {
    get: [authorizeToApi(PERMISSIONS.createOrder) , apiProductsController.getStocksByName]
})

module.exports = apiStocksRouter;