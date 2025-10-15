const Router = require("../../../common/Router");
const pharmacyController = require("../controllers/pharmacistController");

const pharmacistRouter = new Router();

pharmacistRouter.get(pharmacyController.getPharmacist);
pharmacistRouter.post(pharmacyController.createPharmacist);
pharmacistRouter.patch(pharmacyController.updatePharmacist);
pharmacistRouter.delete(pharmacyController.deletePharmacist);


module.exports = pharmacistRouter;