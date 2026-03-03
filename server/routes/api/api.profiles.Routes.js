const SubRouter = require("../../common/SubRouter");
const profileApiController = require("../../controllers/profileApi.controller");
const customerProfileController = require("../../controllers/customer/customer.profile.controller");

exports.profileDetailsApiRouter = SubRouter.route('/api/v1')
.subRoute('/users/:userId' , {
    get: profileApiController.getUserProfileJsonData,
    update: customerProfileController.updateCustomerProfile,
    delete: customerProfileController.deleteCustomerProfile
})
.subRoute('/pharmacy/:pharmacyId' , {
    get: profileApiController.getPharmacyProfileJsonData,
})
.subRoute('/staff/:staffId' , {
    get: profileApiController.getStaffData,
})