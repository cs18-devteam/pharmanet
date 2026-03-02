const SubRouter = require("../../common/SubRouter");
const adminController = require("../../controllers/admins/admin.controller");
const { authenticate } = require("../../middlewares/authenticate");
    
const adminRouter = SubRouter.route('/admin/:adminId')
.subRoute('/' , {
        get :[authenticate('adminId')  , adminController.renderAdminDashboardView],
})
.subRoute('/users' , {
        get : [authenticate('adminId')  ,adminController.renderAdminUsersView],
})
.subRoute('/medicines' , {
        get : [authenticate('adminId')  ,adminController.renderAdminMedicinesView],
})
.subRoute('/writes')
.subRoute('/writers/:writerId');


module.exports = adminRouter;