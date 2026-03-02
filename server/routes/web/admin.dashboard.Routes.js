const SubRouter = require("../../common/SubRouter");
const adminDashboardController = require("../../controllers/admins/admin.dashboard.controller");
const { authenticate } = require("../../middlewares/authenticate");

exports.adminDashboardRouter = SubRouter.route('/admin/:adminId')
.subRoute('/dashboard', {
    get: [authenticate('adminId')  ,adminDashboardController.renderAdminDashboard]
})
exports.adminApiDashboardRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/dashboard',{
    get: [authenticate('adminId')  ,adminDashboardController.sendDashboardStats]
})
exports.adminApiActivityRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/activities',{
    get: [authenticate('adminId')  ,adminDashboardController.sendRecentActivities]
})