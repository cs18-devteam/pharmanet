const Router = require("../../../common/Router");
const LoginController = require("../controllers/loginController");

const LogInRouter = new Router();

LogInRouter.post(LoginController.login);


module.exports = LogInRouter;