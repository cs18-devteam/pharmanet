const SubRouter = require("../../common/SubRouter");
const adminController = require("../../controllers/admins/admin.controller");
    
const adminRouter = SubRouter.route('/admin/:adminId')
.subRoute('/' , {
        get : adminController.renderAdminDashboardView,
})
.subRoute('/users' , {
        get : adminController.renderAdminUsersView,
})
.subRoute('/medicines' , {
        get : adminController.renderAdminMedicinesView,
})
.subRoute('/writes')
.subRoute('/writers/:writerId');


module.exports = adminRouter;