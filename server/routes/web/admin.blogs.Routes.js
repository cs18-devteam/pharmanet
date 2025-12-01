const SubRouter = require("../../common/SubRouter");
const blogController = require("../../controllers/blogs/blog.controller");


const adminBlogsRouter = SubRouter.route('/admin/:adminId')
.subRoute('/blogs' , {
    get : blogController.renderBlogView,
    post : blogController.createBlog,
})
.subRoute('/blogs/manage' , {
    get: blogController.renderBlogManageView,
})
.subRoute('/blogs/:blogId/edit',{
    get: blogController.renderEditView,
    update : blogController.updateBlog,
})
.subRoute('/blogs/:blogId/delete' , {
    get : blogController.renderDeleteConform,
    delete : blogController.deleteBlog,
});

module.exports = adminBlogsRouter;

