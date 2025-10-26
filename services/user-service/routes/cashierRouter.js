const Router = require("../../../common/Router");
const cashierController= require("../controllers/cashierController");


const cashierRouter = new Router();

cashierRouter.get(cashierController.getCashier);
cashierRouter.post(cashierController.createCashier);
cashierRouter.post(cashierController.updateCashier);
cashierRouter.delete(cashierController.deleteCashier);



module.exports = cashierRouter;