const SubRouter = require("../../common/SubRouter");
const loginController = require('../../controllers/auth/login.controller');
const signupController = require('../../controllers/auth/signup.controller');
const verifyEmailController = require('../../controllers/auth/verify.email.controller');
const verifyNumberController = require('../../controllers/auth/verify.number.controller');
const otpController = require('../../controllers/auth/sendOTP.controller');


//:: USER / LOGIN
const authRouter = SubRouter.route('/')
.subRoute('/login' , {
    get : loginController.renderLogin,
})
.subRoute('/signup' , {
    get : signupController.renderSignup,
    post : signupController.signup,
})
.subRoute('/verify/:userId/email' , {
    get: verifyEmailController.renderVerifyEmail,
    post : verifyEmailController.verifyEmail,
})
.subRoute('/verify/:userId/email/otp' , {
    get : otpController.resendEmailOTP,
})

module.exports =  authRouter; 
