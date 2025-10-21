const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminNotificationProfile = async (req , res)=>{
    return response(res , view("admin.notification.profile") , 200);
}