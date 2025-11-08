const SubRouter = require("../../common/SubRouter");
const pharmacyAttendanceController = require('../../controllers/pharmacy/pharmacy.attendance.controller');
const pharmacyStaffController = require('../../controllers/pharmacy/pharmacy.staff.controller');
const pharmacyMedicinesController = require('../../controllers/pharmacy/pharmacy.medicines.controller');
const pharmacyMedicinesApiController = require('../../controllers/pharmacy/pharmacy.medicines.api.controller');
const pharmacyController = require("../../controllers/pharmacy/pharmacy.controller");




exports.pharmacistRouter = SubRouter.route('/pharmacies/:pharmacyId/pharmacist/:pharmacistId')
.subRoute('/' , {
    get : pharmacyController.renderPharmacyDashboard,
})
.subRoute('/staff' , {
    get: pharmacyStaffController.renderPharmacyStaff,
})
.subRoute('/attendance' , {
    get : pharmacyAttendanceController.renderAttendance,
})

exports.pharmacyRouter = SubRouter.route('/pharmacies/:pharmacyId')
.subRoute('/medicines' , {
    get : pharmacyMedicinesController.getAllMedicines
})


exports.pharmacyApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute('/medicines' , {
    get : pharmacyMedicinesApiController.getAllMedicines
})
.subRoute('/medicines/info', {
    get : pharmacyMedicinesApiController.getMedicineStockInfo,
})