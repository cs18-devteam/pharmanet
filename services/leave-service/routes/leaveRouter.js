const Router = require("../../../common/Router");
const leavesController = require("../controllers/leaveController");

const leaveRouter = new Router();

leaveRouter.get(leavesController.getLeaves);
leaveRouter.patch(leavesController.updateLeaves);
leaveRouter.post(leavesController.createLeave);
leaveRouter.delete(leavesController.deleteLeaves);


module.exports = leaveRouter;