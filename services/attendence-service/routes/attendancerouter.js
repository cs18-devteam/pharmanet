const Router = require('../../../common/Router'); 
const attendanceController = require('../controller/attendancecontroller');
const attendanceRouter = new Router();
attendanceRouter.get(attendanceController.getattendance);
attendanceRouter.post(attendanceController.createattendance);
attendanceRouter.patch(attendanceController.updateattendance);
attendanceRouter.delete(attendanceController.deleteattendance);


