const Router = require("../../../common/Router");
const userControllers = require("../controllers/userController");

const usersReDirectRouter = new Router()

usersReDirectRouter.get(userControllers.redirectUsers);

module.exports = usersReDirectRouter;