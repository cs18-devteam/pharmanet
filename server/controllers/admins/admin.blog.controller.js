const { catchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Database = require("../../database/Database");
const Blogs = require("../../models/BlogModel");
const Users = require("../../models/UserModel");
const db = Database.getInstance();

exports.renderAdminBlogManageView = catchAsync(async (req, res) => {
  // const adminId = req.params.adminId;
  let adminId = req.adminId;

  if (!adminId && req.url) {
    const parts = req.url.split('/');
    if (parts[1] === 'admin' && parts[2]) {
      adminId = parts[2];
    }
  }

  if (!adminId || isNaN(adminId)) {
    return response(res, "Invalid Admin ID", 400);
  }

  const [admin] = await Users.getById(adminId);

  if (!admin) {
    return response(res, "Admin not found", 404);
  }


  return response(res, view('admin/blogManage', {
    sidebar: view('admin/component.sidebar', admin),
    header: view('component.header', {
      name: "Blogs || Pharmanet - Manage all blogs here",
      ...admin
    }),
    ...admin
  }), 200);
})

exports.renderAdminCreateNewBlog = catchAsync(async (req, res) => {

  let adminId = req.adminId;

  // Fallback: extract from URL if not in req
  if (!adminId && req.url) {
    const parts = req.url.split('/');
    // Assuming /admin/:id/blogs/create -> id is index 2 (empty, admin, id, ...)
    if (parts[1] === 'admin' && parts[2]) {
      adminId = parts[2];
    }
  }

  // Validation: Ensure adminId is valid (e.g., numeric)
  if (!adminId || isNaN(adminId)) {
    console.error(`Invalid or missing adminId: ${adminId}`);
    return response(res, "Invalid Admin ID", 400);
  }

  const [admin] = await Users.getById(adminId);

  if (!admin) {
    return response(res, "Admin not found", 404);
  }

  return response(res, view('blog/createNewBlog', {
    sidebar: view('admin/component.sidebar', admin),
    header: view('component.header', {
      name: "Blogs || Create new",
      ...admin
    }),
    ...admin
  }));
})



exports.renderEditView = catchAsync(async (req, res) => {
  // const adminId = req.params.adminId;
  let adminId = req.adminId;

  if (!adminId && req.url) {
    const parts = req.url.split('/');
    if (parts[1] === 'admin' && parts[2]) {
      adminId = parts[2];
    }
  }

  if (!adminId || isNaN(adminId)) {
    return response(res, "Invalid Admin ID", 400);
  }

  const [admin] = await Users.getById(adminId);

  if (!admin) {
    return response(res, "Admin not found", 404);
  }
  const blogId = req.blogId;

  const [blog] = await Blogs.getById(blogId);

  return response(res, view('blog/editBlog', {
    ...admin,
    title: blog.title, 
    slug: blog.slug,
    excerpt:blog.excerpt,
    content: blog.content,
    Date: blog.status,
    category: blog.category,
    author: blog.author,
    tag: blog.tag

  }), 200);
})


exports.createBlog = catchAsync(async (req, res) => {
  const rawData = await getRequestData(req);
  if (!rawData) {
    return response(res, "Empty request body", 400);
  }

  let body;
  try {
    body = JSON.parse(rawData);
  } catch (error) {
    return response(res, "Invalid JSON", 400);
  }

  let { title, slug, status, category, author, excerpt, content, tag } = body;

  let adminId = req.adminId;

  if (!adminId && req.url) {
    const parts = req.url.split('/');
    if (parts[1] === 'admin' && parts[2]) {
      adminId = parts[2];
    }
  }

  // if (adminId) {
  //   author = adminId;
  // }

  // console.log(adminId);

  const newBlog = await Blogs.save({
    title, slug, status, category, author, excerpt, content, tag
  });
  return responseJson(res, 201, newBlog);
})

exports.deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.blogId;
  console.log(blogId);
  if (!blogId || isNaN(blogId)) {
    return response(res, "Invalid Blog ID", 400);
  }
  const deleted = await Blogs.deleteById(blogId);
  return responseJson(res, 200, deleted);
});

exports.updateBlog = catchAsync(async (req, res) => {
  const blogId = req.blogId;
  console.log(blogId);
  const rawData = await getRequestData(req);
  if (!rawData) {
    return response(res, "Empty request body", 400);
  }

  let body;
  try {
    body = JSON.parse(rawData);
  } catch (error) {
    return response(res, "Invalid JSON", 400);
  }

  const { title, slug, status, tag, category, author, excerpt, content } = body;
  const newBlog = await Blogs.update({
    title, slug, status, tag, category, author, excerpt, content
  });
  return responseJson(res, 200, newBlog);
})

exports.getAllBlogs = catchAsync(async (req, res) => {
  let adminId = req.adminId;
  console.log(adminId);

  if (!adminId && req.url) {
    const parts = req.url.split('/');
    if (parts[1] === 'admin' && parts[2]) {
      adminId = parts[2];
    }
  }

  // const query = adminId ? { author: adminId } : undefined;
  const blogs = await Blogs.get();
  return responseJson(res, 201, blogs);
})
