const { renderAllStaffMembers } = require("../view/staffView")

exports.getStaff=(req , res)=>{
    renderAllStaffMembers(req , res);
}