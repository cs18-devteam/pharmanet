const SubRouter = require("../../common/SubRouter")
const { pharmacy } = require("../../controllers/admins/admin.controller")
const pharmacyStaffController = require('../../controllers/pharmacy/pharmacy.staff.controller')

exports.pharmacyStaffRouter = SubRouter.route('/pharmacies/:pharmacyId/staff')
.subRoute('/create',{
    get : pharmacyStaffController.renderCreateStaff,
    post : pharmacyStaffController.createStaffMember,
})
.subRoute('/' , {
    get: pharmacyStaffController.getStaffMembers,
})
.subRoute('/options',{
    get : pharmacyStaffController.renderStaffOptions,
})
.subRoute('/:staffId/permissions' , {
    post: pharmacyStaffController.changePermissions,
})


exports.pharmacyStaffApiRouter = SubRouter.route('/pharmacies/:pharmacyId/api')
.subRoute('/staff', { 
    get : pharmacyStaffController.getStaffMembers,
})