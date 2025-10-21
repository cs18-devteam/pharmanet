const { response } = require("../common/response")
const view = require("./../common/view");

exports.renderAdminAnalytics = async (req , res)=>{
    return response(res , view("admin.analytics") , 200);
}