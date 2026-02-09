const SubRouter = require("../../common/SubRouter");
const adminDashboardController = require("../../controllers/admins/admin.dashboard.controller");

exports.adminDashboardRouter = SubRouter.route('/admin/:adminId')
.subRoute('/dashboard', {
    get: adminDashboardController.renderAdminDashboard
})
exports.adminApiDashboardRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/dashboard',{
    get: adminDashboardController.sendDashboardStats
})
exports.adminApiActivityRouter = SubRouter.route('/api/v1/admin/:adminId')
.subRoute('/activities',{
    get: adminDashboardController.sendRecentActivities
})