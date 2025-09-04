const Router = require("../../../common/Router");
const loyaltyPointsController = require("../controllers/LoyaltyPointsController");

const loyaltyPointsRouter = new Router();

loyaltyPointsRouter.post(loyaltyPointsController.createLoyaltyPoints)


module.exports = loyaltyPointsRouter;