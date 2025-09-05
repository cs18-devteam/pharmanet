const medicineController = require("../controllers/medicineController");
const Router = require("../../../common/Router");

const medicineRouter = new Router();

medicineRouter.get(medicineController.getAllMedicines);
medicineRouter.post(medicineController.createMedicines);
medicineRouter.patch(medicineController.updateMedicines);
medicineRouter.delete(medicineController.deleteMedicines);




module.exports = medicineRouter;