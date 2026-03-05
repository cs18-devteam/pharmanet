const SubRouter = require("../../common/SubRouter");
const adminMedicineController = require("../../controllers/admins/admin.medicine.controller");

exports.adminMedicineRouter = SubRouter.route('/admin/:adminId')
.subRoute('/medicines',{
    get: adminMedicineController.renderAdminMedicinesView, 
})
.subRoute('/medicines/create',{
    post: adminMedicineController.addMedicine,
    get: adminMedicineController.getMedicines,
})
.subRoute('/medicines/api', {
    get: adminMedicineController.getMedicines,
})
.subRoute('/medicines/:medicineId/delete',{
    delete: adminMedicineController.deleteMedicine,
})
.subRoute('/medicines/:medicineId/update',{
    patch: adminMedicineController.updateMedicine,
})
.subRoute('/medicines/upload/api',{
    post: adminMedicineController.uploadMedicine,
})


exports.adminApiMedicineRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/medicines' , {
        get : adminMedicineController.sendJsonMedicinesList,
})
    