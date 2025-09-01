const Router = require("../../../common/Router");
const systemPharmacyManagersController = require("../controllers/systemPhamarcyManagerController");

const systemPharmacyManagerRouter = new Router();

systemPharmacyManagerRouter.get(systemPharmacyManagersController.getSystemPharmacyManager)
systemPharmacyManagerRouter.post(systemPharmacyManagersController.createSystemPharmacyManager)
systemPharmacyManagerRouter.patch(systemPharmacyManagersController.updateSystemPharmacyManager);
systemPharmacyManagerRouter.delete(systemPharmacyManagersController.deleteSystemPharmacyManager);

module.exports = systemPharmacyManagerRouter;