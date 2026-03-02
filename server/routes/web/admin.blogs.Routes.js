const SubRouter = require("../../common/SubRouter");
const blogController = require("../../controllers/admins/admin.blog.controller");
const { authenticate } = require("../../middlewares/authenticate");


const adminBlogsRouter = SubRouter.route('/admin/:adminId/blogs')
.subRoute('/api/create' , {
    post : [authenticate('adminId')  , blogController.createBlog],
    get : [authenticate('adminId')  , blogController.getAllBlogs],
})
.subRoute('/manage' , {
    get: [authenticate('adminId')  , blogController.renderAdminBlogManageView ],
})
.subRoute('/create' , {
    get: [ authenticate('adminId') , blogController.renderAdminCreateNewBlog ],
})
.subRoute('/:blogId/edit',{
    get: [  authenticate('adminId'), blogController.renderEditView ],
    patch :[ authenticate('adminId') , blogController.updateBlog ],
})
.subRoute('/:blogId/delete' , {
    get : [ authenticate('adminId') , blogController.renderDeleteConfirm ],
    delete :[ authenticate('adminId') , blogController.deleteBlog ],
});

module.exports = adminBlogsRouter;

