const notfound = require("../common/notfound");
const apiStaffMemberController = require("../controllers/apiStaffMemberController");


module.exports = function apiStaffMemberRouter (req , res){
    switch(req.method){
        case 'GET':
            return apiStaffMemberController.getStaffMembers(req , res);

        case 'POST':
            return apiStaffMemberController.createStaffMember(req , res);

        case 'PATCH':
            return apiStaffMemberController.updateStaffMember(req , res);

        case 'DELETE':
            return apiStaffMemberController.deleteStaffMember(req , res);
        default:
            return notfound(req , res);
    }
}