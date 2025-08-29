const Router = require("../../../common/Router");
const userController = require('../controllers/userController');

const userRouter = new Router();

userRouter.get(userController.getAllUsers)
userRouter.post(userController.createUser)
userRouter.delete(userController.deleteUser)
userRouter.patch(userController.updateUser)

module.exports =  userRouter;