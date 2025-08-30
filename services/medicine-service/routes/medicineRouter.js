const medicineController = require("../controllers/medicineController");
const Router = require("../../../common/Router");

const medicineRouter = new Router();

medicineRouter.get(medicineController.getAllMedicines);
medicineRouter.post(medicineController.createMedicine);
medicineRouter.patch(medicineController.updateMedicine);
medicineRouter.delete(medicineController.deleteMedicine);


module.exports = medicineRouter;