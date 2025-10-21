const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminNotification = async (req , res)=>{
    return response(res , view("admin.notifications") , 200);
}