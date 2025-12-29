const SubRouter = require("../../common/SubRouter");
const adminMedicineController = require("../../controllers/admins/admin.medicine.controller");

exports.adminMedicineRouter = SubRouter.route('/admin/:adminId')
.subRoute('/medicines',{
    get: adminMedicineController.renderAdminMedicinesView, 
})
.subRoute('/medicines/api',{
    post: adminMedicineController.addMedicine,
    get: adminMedicineController.getMedicines,
})
.subRoute('/medicines/api/:id',{
    delete: adminMedicineController.deleteMedicine,
})


exports.adminApiMedicineRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/medicines' , {
        get : adminMedicineController.sendJsonMedicinesList,
})
