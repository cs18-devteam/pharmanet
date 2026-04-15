const generateOTP = require("../../common/generateOTP");
const sendMail = require("../../common/nodemailer/nodemailer");
const { response, responseJson } = require("../../common/response");
const Users = require("../../models/UserModel");

exports.sendEmailOTP = (user)=>{
    const text = `
    our One-Time Password (OTP)
    (Email Verification)

    Please use the following One-Time Password (OTP) to verify your email address. This code will expire in 5 minutes.

    OTP : ${user.emailOTP}

    If you didn’t request this verification, please ignore this email.

    © ${new Date(Date.now()).getFullYear()} Pharmanet. All rights reserved.

    `;



    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en" style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 0; margin: 0;">
    <head>
        <meta charset="UTF-8" />
        <title>Your One-Time Password (OTP)</title>
    </head>
    <body style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="padding: 30px;">
        <h2 style="color: #333; text-align: center;">Email Verification</h2>
        <p style="font-size: 16px; color: #555;">
            Hi <strong>${user.firstName}</strong>,
        </p>
        <p style="font-size: 16px; color: #555;">
            Please use the following One-Time Password (OTP) to verify your email address. This code will expire in <strong>5 minutes</strong>.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background-color: #18978D; color: #ffffff; padding: 14px 30px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
            ${user.emailOTP}
            </div>
        </div>

        <p style="font-size: 14px; color: #777;">
            If you didn’t request this verification, please ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
            © ${new Date(Date.now()).getFullYear()} Pharmanet. All rights reserved.
        </p>
        </div>
    </body>
    </html>
`
    sendMail({
        to : user.email , 
        subject : "Pharmanet || Your One-Time Password (OTP)",
        html : emailTemplate,
        text : text,
    });


} 


exports.resendEmailOTP =async (req , res)=>{
    try{

        const userId = req.userId;
        if(!userId) throw new Error("user id not found");

        const [user] = await Users.getById(userId);

        if(!user) throw new Error("can't find user");

        const otp = generateOTP()


        const [updatedUser] = await Users.update({
            id:userId , 
            emailOTP : otp,
            emailOTPCreatedAt : new Date(Date.now()).toISOString().slice(0, 19).replace("T", " ")
        })

        this.sendEmailOTP(updatedUser);

        return responseJson(res , 200 , {
            status:"success",
            message:"otp sent"
        })

    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:"can't send otp , try different time"
        })
    }
}