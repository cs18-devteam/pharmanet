const Router = require("../../../common/Router");
const signupController = require("../controllers/signupController");

const SignUpRouter = new Router();

SignUpRouter.post(signupController.signup);


module.exports = SignUpRouter;