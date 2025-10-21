const { response } = require("../common/response")
const view = require("../common/view")


exports.renderAdminDashboard = async (req , res)=>{
    return response(res , view("admin.dashboard" , {
        adminId : req.adminId,
    }) , 200);
}