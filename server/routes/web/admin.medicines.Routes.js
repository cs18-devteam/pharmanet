const SubRouter = require("../../common/SubRouter");
const adminMedicineController = require("../../controllers/admins/admin.medicine.controller");
const { authenticate } = require("../../middlewares/authenticate");

exports.adminMedicineRouter = SubRouter.route('/admin/:adminId')
.subRoute('/medicines',{
    get: [authenticate('adminId')  ,adminMedicineController.renderAdminMedicinesView], 
})
.subRoute('/medicines/create',{
    post: [authenticate('adminId')  ,adminMedicineController.addMedicine],
    get: [authenticate('adminId')  ,adminMedicineController.getMedicines],
})
.subRoute('/medicines/api', {
    get: [authenticate('adminId')  ,adminMedicineController.getMedicines],
})
.subRoute('/medicines/:medicineId/delete',{
    delete:[authenticate('adminId')  , adminMedicineController.deleteMedicine],
})
.subRoute('/medicines/:medicineId/update',{
    update: adminMedicineController.updateMedicine,
})
.subRoute('/medicines/upload/api',{
    post: adminMedicineController.uploadMedicine,
})
.subRoute("/medicines/:medicineId/update/image" , {
    post : adminMedicineController.uploadImage,
})


exports.adminApiMedicineRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/medicines' , {
        get : [authenticate('adminId')  ,adminMedicineController.sendJsonMedicinesList],
})
    