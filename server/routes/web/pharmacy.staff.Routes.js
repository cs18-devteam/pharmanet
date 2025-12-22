const SubRouter = require("../../common/SubRouter")
const { pharmacy } = require("../../controllers/admins/admin.controller")
const pharmacyStaffController = require('../../controllers/pharmacy/pharmacy.staff.controller')

exports.pharmacyStaffRouter = SubRouter.route('/pharmacist/:pharmacyId/staff')
.subRoute('/create',{
    get : pharmacyStaffController.renderCreateStaff,
})
.subRoute('/options',{
    get : pharmacyStaffController.renderStaffOptions,
})