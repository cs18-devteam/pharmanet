const AppRouter = require("../../common/AppRouter");

AppRouter.pipe(req ,res).route('/antibiotics')
    ?.get(blogController.antibiotics);

    AppRouter.pipe(req ,res).route('/blogManage')
?.get(blogController.blogManage);

AppRouter.pipe(req ,res).route('/blogView')
?.get(blogController.blogView);

AppRouter.pipe(req ,res).route('/createNewBlog')
?.get(blogController.createNewBlog);

AppRouter.pipe(req ,res).route('/diabetics')
?.get(blogController.diabetics);

AppRouter.pipe(req ,res).route('/editBlog1')
?.get(blogController.editBlog1);

AppRouter.pipe(req ,res).route('/hypertension')
?.get(blogController.hypertension);

AppRouter.pipe(req ,res).route('/supplement')
?.get(blogController.supplement);

AppRouter.pipe(req , res).route("/api/blogs")
?.post(blogController.createBlog)
?.get(blogController.getAllBlogs);

AppRouter.pipe(req ,res).route('/api/blogs/:id')
?.delete(blogController.deleteBlog)

AppRouter.pipe(req ,res).route('/blog/:blogId/delete')
?.get(blogController.renderDeleteConform);

AppRouter.pipe(req ,res).route('/blog/:blogId/edit')
?.get(blogController.renderEditView)

AppRouter.pipe(req ,res).route('/api/blog/:blogId/edit')
?.update(blogController.update);

AppRouter.pipe(req ,res).route('/delete/:id')
?.delete(blogController.delete);