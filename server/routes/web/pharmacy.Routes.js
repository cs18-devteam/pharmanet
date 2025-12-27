const SubRouter = require("../../common/SubRouter");
const pharmacyAttendanceController = require('../../controllers/pharmacy/pharmacy.attendance.controller');
const pharmacyStaffController = require('../../controllers/pharmacy/pharmacy.staff.controller');
const pharmacyMedicinesApiController = require('../../controllers/pharmacy/pharmacy.medicines.api.controller');
const pharmacyController = require("../../controllers/pharmacy/pharmacy.controller");
const pharmacyStaffProfileController = require("../../controllers/pharmacy/pharmacy.staff.profile.controller");


exports.pharmacistRouter = SubRouter.route('/pharmacies/:pharmacyId/staff/:staffId')
.subRoute('/' , {
    get : pharmacyController.renderPharmacyDashboard,
})
.subRoute('/staff' , {
    get: pharmacyStaffController.renderPharmacyStaff,
})
.subRoute('/attendance' , {
    get : pharmacyAttendanceController.renderAttendance,
})
.subRoute('/profile' , {
    get: pharmacyStaffProfileController.renderStaffProfile
})

exports.pharmacyRouter = SubRouter.route('/pharmacies/:pharmacyId')
.subRoute('/medicines' , {
    get : pharmacyMedicinesApiController.getAllMedicines
})

