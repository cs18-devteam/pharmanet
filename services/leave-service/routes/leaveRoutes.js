const router = require('./../../../common/Router');
const leaveController = require('./../controller/leaveController');
const LeaveRouter = new router();
leaveRouter.get(leaveController.GetLeave);
leaveRouter.patch(leaveController.UpdateLeave);
leaveRouter.delete(leaveController.DeleteLeave);
leaveRouter.post(leaveController.CreateLeave);

module.exports = leaveRouter;
