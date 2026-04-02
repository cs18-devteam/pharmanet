const SubRouter = require("../../common/SubRouter");
const adminUsersController = require("../../controllers/admins/admin.users.controller");
const { authenticate } = require("../../middlewares/authenticate");

exports.adminUsersRouter = SubRouter.route('/admin/:adminId')
    .subRoute('/users', {
        get: [authenticate('adminId')  ,adminUsersController.renderAdminUsersView],
    })
    .subRoute('/users/create', {
        get: [authenticate('adminId')  ,adminUsersController.renderAddUsersView],
    })
    .subRoute('/viewProfile', {
    get: [authenticate('adminId')  ,adminUsersController.renderViewProfilePage],
    })
    .subRoute('/viewProfile/:id', {
    get: [authenticate('adminId')  ,adminUsersController.renderViewProfilePage],
    })
    .subRoute('/api/users', {
        post: [authenticate('adminId')  ,adminUsersController.createUser],
        get: [authenticate('adminId')  ,adminUsersController.getAllUsers],
    })
    .subRoute('/api/users/:id', {
        update: adminUsersController.updateUserStatus,
    })
