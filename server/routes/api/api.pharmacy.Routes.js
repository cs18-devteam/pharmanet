const SubRouter = require("../../common/SubRouter");
const pharmacyController = require("../../controllers/pharmacy/pharmacy.controller");
const pharmacyStaffController = require("../../controllers/pharmacy/pharmacy.staff.controller");
const pharmacyMedicinesApiController = require('../../controllers/pharmacy/pharmacy.medicines.api.controller');
const pharmacyStaffLeaveController = require('../../controllers/pharmacy/pharmacy.staff.leave.controller');
const { authorizeToApi, PERMISSIONS } = require("../../middlewares/authorizeToView");


exports.pharmaciesApiRouter = SubRouter.route("/api/v1/pharmacies")
.subRoute('/' , {
    get: pharmacyController.sendOnlinePharmacies,
})
.subRoute('/:pharmacyId' , {
    get: pharmacyController.getPharmacy,
})



exports.pharmacyApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute('/medicines' , {
    get : [
        authorizeToApi(PERMISSIONS.searchMedicines) ,
        pharmacyMedicinesApiController.searchMedicinesByName
    ]
})
.subRoute('/medicines/info', {
    get : [
        authorizeToApi(PERMISSIONS.searchMedicines) ,pharmacyMedicinesApiController.getMedicineStockInfo
    ],
})
.subRoute('/stock/medicines' , {
    post : pharmacyMedicinesApiController.createMedicineStock,
    update: pharmacyMedicinesApiController.updateMedicineStock
})
.subRoute('/stock/medicines/:stockId' , {
    get: pharmacyMedicinesApiController.getMedicineDetailsByStockId,
    delete:pharmacyMedicinesApiController.deleteMedicineStock,
})




exports.pharmacyApiStaffRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute("/staff/:staffId/reset" , {
    update: pharmacyStaffController.resetPassword,
})
.subRoute("/staff/:staffId/leaves", {
    get: pharmacyStaffLeaveController.getLeaveRequests,
    post: pharmacyStaffLeaveController.createLeaveRequest,
})


exports.pharmacyApiStaffRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId/staff')
.subRoute("/" , {
    get: pharmacyStaffController.getStaffMembers,
    post: pharmacyStaffController.createStaffMember,
})
.subRoute("/:staffId/update", {
    post: pharmacyStaffController.updateStaffMember,
})
.subRoute("/:staffId/leaves", {
    get: pharmacyStaffLeaveController.getLeaveRequests,
    post: pharmacyStaffLeaveController.createLeaveRequest,
}).subRoute("/:staffId/reset" , {
    update: pharmacyStaffController.resetPassword,
})
.subRoute("/:staffId/delete" , {
    delete: pharmacyStaffController.deleteMember,
})