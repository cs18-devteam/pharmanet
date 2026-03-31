const { hashPassword } = require("../../common/Auth");
const { catchAsync, apiCatchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { responseJson, response } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");

exports.resetPassword = apiCatchAsync(async (req , res)=>{
    const userId = req.userId;
    const data = JSON.parse(await getRequestData(req));
    console.log(userId,data);
    if(!data.password) throw new Error("no password");

    const [user] = await Users.getById(userId);

    if(!user) throw new Error('No user found');

    const [updatedUser] = await Users.update({
        id: userId,
        password : hashPassword(data.password)
    })

    return responseJson(res , 200 , {
        status:"success",
        message :"password reset successful",
    })
})


exports.renderResetPassword = catchAsync(async (req , res)=>{
    const userId = req.userId;
    const [user] = await Users.getById(userId);
    if(!user) throw new Error("user not found");

    return response(res , view('resetpassword' ,{
        id : user.id,
        header: view('component.header', {
        name: "Reset Password",
      })
    }) , 200);
})