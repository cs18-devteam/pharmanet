const Router = require("../../../common/Router");
const pharmacyStockManagerController = require("../controllers/pharmacyStockManagerController");

const pharmacyStockManagerRouter = new Router();

pharmacyStockManagerRouter.get(pharmacyStockManagerController.getPharmacyStockManager);
pharmacyStockManagerRouter.post(pharmacyStockManagerController.createPharmacyStockManager);
pharmacyStockManagerRouter.patch(pharmacyStockManagerController.updatePharmacyStockManager);
pharmacyStockManagerRouter.delete(pharmacyStockManagerController.deletePharmacyStockManager);



module.exports = pharmacyStockManagerRouter;