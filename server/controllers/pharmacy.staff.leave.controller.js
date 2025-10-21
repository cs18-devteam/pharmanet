const { response } = require("../common/response")
const view = require("../common/view")

exports.renderPharmacyStaffLeave = async (req, res) =>{
    return response(res,view("pharmacy.staff.leave"),200)
}