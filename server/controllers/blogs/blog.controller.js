const { getRequestData } = require("../../common/getRequestData")
const { response, responseJson } = require("../../common/response")
const view = require("../../common/view");
const Blogs = require("../../models/BlogModel");

exports.antibiotics = async (req ,res)=>{
    return response(res , view('blog/antibiotics'))
}

exports.blogManage = async (req ,res)=>{

    const blogs = await Blogs.get();

    return response(res , view('blog/blogManage' , {
        // navbar : view('admin/nav.staff'),
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

  try{

    const { title, category, author, excerpt ,slug, content } = JSON.parse(await getRequestData(req)); 
    const newBlog = await Blogs.save({
      title , category , author , excerpt , content , slug
    });
    return responseJson(res , 201 , newBlog);
  }catch(e){
    console.log(e);
    return responseJson(res , 400 , {
      status:"error",
      message:"blog not created",
      error:e,
    })
  }
}
// CREATE
exports.deleteBlog = async (req, res) => {
  try{

    const newBlog = await Blogs.deleteById(req.id);
    return responseJson(res , 204 , newBlog);
  }catch(e){
    return responseJson(res, 400 , {
      status:"error",
      error:e,
    })
  }
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


exports.delete = async (req , res)=>{
  return response(res , view('delete') , 200)
}

