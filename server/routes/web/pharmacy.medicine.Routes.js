const SubRouter = require("../../common/SubRouter");
const { authenticate } = require("../../middlewares/authenticate");
const pharmacyMedicinesApiController = require('../../controllers/pharmacy/pharmacy.medicines.api.controller')

exports.pharmacyMedicineApiRouter = SubRouter.route('/pharmacies/:pharmacyId/api')
.subRoute('/medicines', {
    get: pharmacyMedicinesApiController.getMedicinesById,
})