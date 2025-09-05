const Router = require("../../../common/Router");
const staffController = require("../controller/staffController");

const staffRouter = new Router();

staffRouter.get(staffController.getStaff);


module.exports = staffRouter;