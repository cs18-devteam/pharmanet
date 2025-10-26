const Router = require("../../../common/Router");
const systemAdminController = require("../controllers/systemAdminController");

const systemAdminRouter = new Router();

systemAdminRouter.get(systemAdminController.getSystemAdmin);
systemAdminRouter.post(systemAdminController.createSystemAdmin);
systemAdminRouter.patch(systemAdminController.updateSystemAdmin);
systemAdminRouter.delete(systemAdminController.deleteSystemAdmin);

module.exports = systemAdminRouter;