const SubRouter = require("../../common/SubRouter");
const profileApiController = require("../../controllers/profileApi.controller");

exports.profileDetailsApiRouter = SubRouter.route('/api/v1')
.subRoute('/users/:userId' , {
    get: profileApiController.getUserProfileJsonData,
})
.subRoute('/pharmacy/:pharmacyId' , {
    get: profileApiController.getPharmacyProfileJsonData,
})
.subRoute('/staff/:staffId' , {
    get: profileApiController.getStaffData,
})