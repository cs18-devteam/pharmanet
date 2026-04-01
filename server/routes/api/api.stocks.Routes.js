const SubRouter = require("../../common/SubRouter");
const apiProductsController = require("../../controllers/pharmacy/pharmacy.stocks.api.controller");

const apiStocksRouter = SubRouter.route("/api/v1/pharmacies/:pharmacyId/stocks")
.subRoute("/" , {
    get: apiProductsController.getStocksByName
})

module.exports = apiStocksRouter;