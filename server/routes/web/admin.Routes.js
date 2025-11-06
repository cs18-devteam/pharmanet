const AppRouter = require("../../common/AppRouter");

AppRouter.pipe(req ,res).route('/admin/:adminId')
        // ?.authenticate(req.adminId)
        ?.get(adminController.adminDashboard);