const SubRouter = require("../../common/SubRouter")
const { pharmacy } = require("../../controllers/admins/admin.controller")
const pharmacyStaffController = require('../../controllers/pharmacy/pharmacy.staff.controller')
const { authorizeToApi, PERMISSIONS } = require("../../middlewares/authorizeToView")

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
    post: [ authorizeToApi(PERMISSIONS.updateStaff) ,pharmacyStaffController.changePermissions],
})