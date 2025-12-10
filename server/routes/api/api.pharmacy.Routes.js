const SubRouter = require("../../common/SubRouter");
const pharmacyStaffController = require("../../controllers/pharmacy/pharmacy.staff.controller");

exports.pharmacyApiStaffRouter = SubRouter.route('/api/v1/pharmacies/:pharmacyId')
.subRoute("/staff" , {
    get :pharmacyStaffController.getStaffMembers,
    post: pharmacyStaffController.createStaffMember,
    // update: ,
    // delete: , 

})