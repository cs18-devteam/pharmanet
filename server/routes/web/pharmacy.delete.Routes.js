const SubRouter = require("../../common/SubRouter");
const pharmacyController = require("../../controllers/pharmacy/pharmacy.controller");



exports.pharmacyDeleteRouter = SubRouter.route("/pharmacy/:pharmacyId")
.subRoute("/" , {
    delete: pharmacyController.deletePharmacy,
})
