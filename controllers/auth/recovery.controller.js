const { encrypt } = require("../../common/Auth");
const generateOTP = require("../../common/generateOTP");
const { getRequestData } = require("../../common/getRequestData");
const sendMail = require("../../common/nodemailer/nodemailer");
const { responseJson } = require("../../common/response");
const Users = require("../../models/UserModel");

exports.renderForgotPassword = ()=>{

}


exports.sendForgotPasswordRecoveryMail = async (req , res)=>{
    try{

        const {email} = JSON.parse(await getRequestData(req));
        if(!email) throw new Error("no email address");

        const [user] = await Users.get({
            email : email,
        })

        if(!user) throw new Error("account not found!");
        const otp = generateOTP();

        await Users.update({
            id: user.id,
            emailOTP : otp,
        });


        const recoveryObj = {
           otp,
           email : user.email,
           id: user.id, 
        }

        const token = encrypt(JSON.stringify(recoveryObj));

        const recoveryText = `
            Reset Your Password

            Hi ${user.firstName}

            We received a request to reset your password for your account. Click the link below to reset it:

            http://${process.env.HOSTNAME}:${process.env.PORT}/users/recovery/${token}

            f you didn’t request a password reset, you can safely ignore this email — your account will remain secure.</p>
            <p>This link will expire in 15 minutes for your security.

             © ${new Date(Date.now()).getFullYear()} Pharmanet. All rights reserved.
        `


        const recoveryMail = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>Reset Your Password</title>
        <style>
            body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .header {
            background-color: #18978D;
            color: white;
            text-align: center;
            padding: 20px 0;
            }
            .content {
            padding: 30px;
            color: #333333;
            line-height: 1.6;
            }
            .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #18978D;
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            }
            .footer {
            text-align: center;
            padding: 20px;
            font-size: 13px;
            color: #777;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h2>Password Reset Request</h2>
            </div>
            <div class="content">
            <p>Hi <strong>${user.firstName}</strong>,</p>
            <p>We received a request to reset your password for your account. Click the button below to reset it:</p>

            <a href="http://${process.env.HOSTNAME}:${process.env.PORT}/users/recovery/${token}" class="button">Reset Password</a>

            or

            click below link
            http://${process.env.HOSTNAME}:${process.env.PORT}/users/recovery/${token}

            <p>If you didn’t request a password reset, you can safely ignore this email — your account will remain secure.</p>
            <p>This link will expire in <strong>15 minutes</strong> for your security.</p>

            <p>Thank you,<br>The {{appName}} Team</p>
            </div>
            <div class="footer">
            © ${new Date(Date.now()).getFullYear()} Pharmanet. All rights reserved.
            </div>
        </div>
        </body>
        </html>

        
        `;

        sendMail({
            to: user.email,
            subject:"Reset Password || Pharmanet",
            text: recoveryText,
            html : recoveryMail,
        });


        return responseJson(res, 200 , {
            status:"success",
            message:"email sent",
        })

    }catch(e){
        return responseJson(res , 400 , {
            status:'error',
            message: e.message,
        })
    }

}