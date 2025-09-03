const Router = require("../../../common/Router");
const userControllers = require("../controllers/userController");

const usersReDirectRouter = new Router()

usersReDirectRouter.get(userControllers.getIndexPage ,userControllers.getIndexPage);

module.exports = usersReDirectRouter;