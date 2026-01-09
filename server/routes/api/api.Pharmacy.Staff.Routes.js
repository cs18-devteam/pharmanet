const SubRouter = require("../../common/SubRouter");

exports.PharmacyStaffRouter = SubRouter.route('pharmacist/:pharmacyId/staff')
.subRoute('/tran')