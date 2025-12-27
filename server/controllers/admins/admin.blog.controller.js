const { catchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Database = require("../../database/Database");
const Blogs = require("../../models/BlogModel");
const db = Database.getInstance();

exports.renderAdminBlogManageView = async (req ,res)=>{
    const [admin] = await Blogs.getById(req.adminId);


    return response(res , view('admin/blogManage',{
        sidebar : view('admin/component.sidebar' ,admin),
        header : view('component.header' , {
          name:"Blogs || Pharmanet - Manage all blogs here",
        }),
        
    }) , 200);
}

exports.createBlog = async (req, res) => {
  const { title, slug, status, category, author, excerpt, content, tag } = JSON.parse(await getRequestData(req)); 
  const newBlog = await Blogs.save({
    title , slug , status , category , author , excerpt , content , tag
  });
  return responseJson(res , 201 , newBlog);
}

exports.deleteBlog = async (req, res) => {
   
  const newBlog = await Blogs.deleteById(req.id);
  return responseJson(res , 201 , newBlog);
}

exports.update = async (req, res) => {
  const { title, slug, status, tag, category, author, excerpt, content } = JSON.parse(await getRequestData(req)); 
  const newBlog = await Blogs.update({
    title , slug , status , tag , category , author , excerpt , content
  });
  return responseJson(res , 200 , newBlog);
}

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blogs.get()
  return responseJson(res , 201 , blogs);
}
