const SubRouter = require("../../common/SubRouter");
const adminUsersController = require("../../controllers/admins/admin.users.controller");

exports.adminUsersRouter = SubRouter.route('/admin/:adminId')
    .subRoute('/users', {
        get: adminUsersController.renderAdminUsersView,
    })
    .subRoute('/users/create', {
        get: adminUsersController.renderAddUsersView,
    })
    .subRoute('/api/users', {
        post: adminUsersController.createUser,
        get: adminUsersController.getAllUsers,
    })
    .subRoute('/api/users/:id', {
        update: adminUsersController.updateUserStatus,
    })
