<<<<<<< HEAD
=======
<<<<<<< HEAD
const Router = require('../../../common/Router');
const userController = require("./../controllers/userController");

const userRouter = new Router();

userRouter.get(userController.getAllUsers);
userRouter.post(userController.createUser);
userRouter.delete(userController.deleteUser);
userRouter.patch(userController.updateUser);


module.exports = userRouter;
=======
>>>>>>> origin/hamdha/backend/order

const Router = require("../../../common/Router");
const userControllers = require("../controllers/userController");

const usersReDirectRouter = new Router()

usersReDirectRouter.get(userControllers.redirectUsers);

module.exports = usersReDirectRouter;
<<<<<<< HEAD
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
