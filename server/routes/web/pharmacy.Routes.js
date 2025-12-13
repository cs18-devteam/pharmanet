const SubRouter = require("../../common/SubRouter");
const pharmacyAttendanceController = require('../../controllers/pharmacy/pharmacy.attendance.controller');
const pharmacyStaffController = require('../../controllers/pharmacy/pharmacy.staff.controller');
const pharmacyMedicinesApiController = require('../../controllers/pharmacy/pharmacy.medicines.api.controller');
const pharmacyController = require("../../controllers/pharmacy/pharmacy.controller");


exports.pharmacistRouter = SubRouter.route('/pharmacies/:pharmacyId/pharmacist/:staffId')
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
    get : pharmacyMedicinesApiController.getAllMedicines
})

