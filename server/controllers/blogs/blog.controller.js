const { getRequestData } = require("../../common/getRequestData")
const { response, responseJson } = require("../../common/response")
const view = require("../../common/view");
const Database = require("../../database/Database");
const Blogs = require("../../model/BlogModel");
const db = Database.getInstance();

exports.antibiotics = async (req ,res)=>{
    return response(res , view('blog/antibiotics'))
}

exports.blogManage = async (req ,res)=>{

    const blogs = await Blogs.get();

    return response(res , view('blog/blogManage' , {
        blogs : blogs.map(b=>view('blog/componentDelete' , b)).join(''),
    }))
}

exports.blogView = async (req ,res)=>{

    const blogs = await Blogs.get();

    return response(res , view('blog/blogView' , {
        blogs : blogs.map(b=>view('blog/componentBlog' , b)).join(''),
    }))
}



exports.createNewBlog = async (req ,res)=>{
    return response(res , view('blog/createNewBlog'))
}

exports.diabetics = async (req ,res)=>{
    return response(res , view('blog/diabetics'))
}

exports.editBlog1 = async (req ,res)=>{
    return response(res , view('blog/editBlog1'))
}

exports.hypertension = async (req ,res)=>{
    return response(res , view('blog/hypertension'))
}

exports.supplement = async (req ,res)=>{
    return response(res , view('blog/supplement'))
}


// CREATE
exports.createBlog = async (req, res) => {
  const { title, category, author, excerpt, content } = JSON.parse(await getRequestData(req)); 
  const newBlog = await Blogs.save({
    title , category , author , excerpt , content
  });
  return responseJson(res , 201 , newBlog);
}
// CREATE
exports.deleteBlog = async (req, res) => {
   
  const newBlog = await Blogs.deleteById(req.id);
  return responseJson(res , 201 , newBlog);
}
// CREATE
exports.update = async (req, res) => {
  const { title, category, author, excerpt, content } = JSON.parse(await getRequestData(req)); 
  const newBlog = await Blogs.update({
    title , category , author , excerpt , content
  });
  return responseJson(res , 200 , newBlog);
}
// CREATE
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blogs.get()
  return responseJson(res , 201 , blogs);
}


exports.delete = async (res , res)=>{
  return response(res , view('delete') , 200)
}

