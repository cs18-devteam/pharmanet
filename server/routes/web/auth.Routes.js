const AppRouter = require("../../common/AppRouter");

//:: USER / LOGIN
AppRouter.pipe(req , res).route('/login')
    ?.get(loginController.renderLogin)
    ?.post(loginController.login);

// :: USER / SIGNUP
AppRouter.pipe(req , res).route('/signup')
    ?.get(signupController.renderSignup)
    ?.post(signupController.signup);

// :: USER / VERIFY EMAIL / MOBILE NUMBER
AppRouter.pipe(req , res).route('/verify/:userId/email')
    ?.get(verifyEmailController.renderVerifyEmail)
    ?.post(verifyEmailController.verifyEmail);


//:: USER / VERIFY NUMBER
AppRouter.pipe(req , res).route('/verify/number')
    ?.get(verifyNumberController.renderVerifyNumber);


// :: USER / VERIFY EMAIL
AppRouter.pipe(req , res).route('/verify/:userId/email/otp')
?.get(otpController.resendEmailOTP);

AppRouter.pipe(req ,res).route('/users/recovery/:recoveryLink')
?.get()