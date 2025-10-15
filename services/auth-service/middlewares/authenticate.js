const UserTypes = require("../../user-service/helpers/UserTypes")



exports.authenticate = (req , res)=>{
    req.userType = UserTypes.CUSTOMER;
}   