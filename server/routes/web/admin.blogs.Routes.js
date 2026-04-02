const SubRouter = require("../../common/SubRouter");
const blogController = require("../../controllers/admins/admin.blog.controller");


exports.adminBlogsRouter = SubRouter.route('/admin/:adminId/blogs')

.subRoute('/create' , {
    get: blogController.renderAdminCreateNewBlog,
})
.subRoute('/manage' , {
    get: blogController.renderAdminBlogManageView,
})
.subRoute('/:blogId/edit',{
    get: blogController.renderEditView,
    patch : blogController.updateBlog,
})
.subRoute('/:blogId/delete' , {
    get : blogController.renderDeleteConfirm,
    delete : blogController.deleteBlog,
});

exports.adminApiBlogRouter = SubRouter.route('/api/admin/:adminId')
.subRoute('/blogs', {
   get : blogController.getAllBlogs,  
   post : blogController.createBlog,
})
.subRoute('/blogs/:blogId/edit', {
    update: blogController.updateBlog,
})

