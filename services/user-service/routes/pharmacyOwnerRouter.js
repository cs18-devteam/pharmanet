const Router = require("../../../common/Router");
const pharmacyOwnersController  = require("../controllers/pharamcyOwnerController");

const pharmacyOwnerRouter = new Router();

pharmacyOwnerRouter.get(pharmacyOwnersController.getPharmacyOwner);
pharmacyOwnerRouter.post(pharmacyOwnersController.createPharmacyOwner);
pharmacyOwnerRouter.patch(pharmacyOwnersController.updatePharmacyOwner);
pharmacyOwnerRouter.delete(pharmacyOwnersController.deletePharmacyOwner);

module.exports = pharmacyOwnerRouter;