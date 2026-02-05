const SubRouter = require("../../common/SubRouter");
const pharmacyController = require("../../controllers/pharmacy/pharmacy.controller");
const pharmacyStaffController = require("../../controllers/pharmacy/pharmacy.staff.controller");
const pharmacyMedicinesApiController = require('../../controllers/pharmacy/pharmacy.medicines.api.controller');
const pharmacyStaffLeaveController = require('../../controllers/pharmacy/pharmacy.staff.leave.controller')


exports.pharmaciesApiRouter = SubRouter.route("/api/v1/pharmacies")
.subRoute('/' , {
    get: pharmacyController.sendOnlinePharmacies,
})



exports.pharmacyApiRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute('/medicines' , {
    get : pharmacyMedicinesApiController.searchMedicinesByName
})
.subRoute('/medicines/info', {
    get : pharmacyMedicinesApiController.getMedicineStockInfo,
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
.subRoute("/staff" , {
    get :pharmacyStaffController.getStaffMembers,
    post: pharmacyStaffController.createStaffMember,
    // update: ,
    // delete: , 

})
.subRoute("/staff/:staffId/leaves", {
    get: pharmacyStaffLeaveController.getLeaveRequests,
    post: pharmacyStaffLeaveController.createLeaveRequest,
})


exports.pharmacyApiStaffRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute("/staff" , {
    get: pharmacyStaffController.getStaffMembers,
    post: pharmacyStaffController.createStaffMember,
})
.subRoute("/staff/:staffId/update", {
    post: pharmacyStaffController.updateStaffMember,
})
.subRoute("/staff/:staffId/leaves", {
    get: pharmacyStaffLeaveController.getLeaveRequests,
    post: pharmacyStaffLeaveController.createLeaveRequest,
})