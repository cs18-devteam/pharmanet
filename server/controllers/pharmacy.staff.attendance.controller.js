const { response } = require("../common/response")
const view = require("../common/view")

exports.renderPharamcyStaffAttendance = async (req , res)=>{
    return response(res , view('pharmacy.staff.attendance' , {
        header : "this is attendance",
    } ) , 200);
}