const SubRouter = require("../../common/SubRouter");
const blogController = require("../../controllers/admins/admin.blog.controller");


const adminBlogsRouter = SubRouter.route('/admin/:adminId/blogs')
.subRoute('/api/create' , {
    post : blogController.createBlog,
    get : blogController.getAllBlogs,
})
.subRoute('/manage' , {
    get: blogController.renderAdminBlogManageView,
})
.subRoute('/create' , {
    get: blogController.renderAdminCreateNewBlog,
})
.subRoute('/:blogId/edit',{
    get: blogController.renderEditView,
    patch : blogController.updateBlog,
})
.subRoute('/:blogId/delete' , {
    get : blogController.renderDeleteConfirm,
    delete : blogController.deleteBlog,
});

module.exports = adminBlogsRouter;

