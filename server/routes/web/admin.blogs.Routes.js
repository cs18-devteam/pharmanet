const SubRouter = require("../../common/SubRouter");
const blogController = require("../../controllers/admins/admin.blog.controller");
const { authenticate } = require("../../middlewares/authenticate");


exports.adminBlogsRouter = SubRouter.route('/admin/:adminId/blogs')

.subRoute('/create' , {
    get: blogController.renderAdminCreateNewBlog,
})
.subRoute('/manage' , {
    get: [authenticate('adminId')  , blogController.renderAdminBlogManageView ],
})
.subRoute('/:blogId/edit',{
    get: [  authenticate('adminId'), blogController.renderEditView ],
    update :[ authenticate('adminId') , blogController.updateBlog ],
    
})
.subRoute('/:blogId/delete' , {
    get : [ authenticate('adminId') , blogController.renderDeleteConfirm ],
    delete :[ authenticate('adminId') , blogController.deleteBlog ],
});

exports.adminApiBlogRouter = SubRouter.route('/api/admin/:adminId')
.subRoute('/blogs', {
   get : blogController.getAllBlogs,  
   post : blogController.createBlog,
    
})

