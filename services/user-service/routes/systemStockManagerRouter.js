const Router = require("../../../common/Router");
const systemStockManagersController = require("../controllers/systemStockManagerController.js");

const systemStockManagerRouter = new Router();

systemStockManagerRouter.get(systemStockManagersController.getSystemStockManager);
systemStockManagerRouter.post(systemStockManagersController.createSystemStockManager);
systemStockManagerRouter.patch(systemStockManagersController.updateSystemStockManager);
systemStockManagerRouter.delete(systemStockManagersController.deleteSystemStockManager);

module.exports = systemStockManagerRouter;