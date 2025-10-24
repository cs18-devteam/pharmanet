const { response } = require("../common/response")
const view = require("../common/view")

exports.renderPharmacyStaffLeaveProfile = async (req,res) => {
    return response(res,view("pharmacy.staff.leave.profile"),200)
}