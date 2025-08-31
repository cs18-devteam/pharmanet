const pharmacyController = require ("..//controllers/pharmacyController");
const Router= require("../../../comman/Router");

const pharmacyRouter = new Router();

pharmacyRouter.get(pharmacyController.gettAllPharmacies);
pharmacyRouter.post(pharmacyController.createPharmacies);
pharmacyRouter.patch(pharmacyController.updatePharmacies);
pharmacyRouter.delete(pharmacyController.deletePharmacies);

module.exports = pharmacyRouter;