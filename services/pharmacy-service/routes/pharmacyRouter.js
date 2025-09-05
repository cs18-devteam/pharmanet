const pharmacyController = require ("..//controllers/pharmacyController");
const Router= require("../../../common/Router");

const pharmacyRouter = new Router();


pharmacyRouter.get("/" ,pharmacyController.gettAllPharmacies);
pharmacyRouter.post("/", pharmacyController.createPharmacies);
pharmacyRouter.patch("/:id",pharmacyController.updatePharmacies);
pharmacyRouter.delete("/:id",pharmacyController.deletePharmacies);

module.exports = pharmacyRouter;