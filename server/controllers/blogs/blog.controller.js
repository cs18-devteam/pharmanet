const { getRequestData } = require("../../common/getRequestData")
const { response, responseJson } = require("../../common/response")
const view = require("../../common/view");
const Blogs = require("../../models/BlogModel");

exports.antibiotics = async (req ,res)=>{
  try{
    
    return response(res , view('blog/antibiotics',{
      sidebar : view('admin/component.sidebar'),
      header : view('component.header' , {
        name:"Antibiotic || Pharmanet-blog",
      })
      
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}

exports.blogManage = async (req ,res)=>{
    try{
      const blogs = await Blogs.get();

    return response(res , view('blog/blogManage' , {
      header : view('component.header' , {
        name:"Blogs || Manage All Blogs",
      }),
        sidebar : view('admin/component.sidebar'),
        blogs : blogs.map(b=>view('blog/componentDelete' , b)).join(''),
        
        
    }))
    }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}

exports.blogView = async (req ,res)=>{
  try{

    
    const blogs = await Blogs.get();
    
    return response(res , view('blog/blogView' , {
      sidebar : view('admin/component.sidebar'),
      blogs : blogs.map(b=>view('blog/componentBlog' , b)).join(''),
      header : view('component.header' , {
        name:"",
      })
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}



exports.createNewBlog = async (req ,res)=>{
  try{

    return response(res , view('blog/createNewBlog' , {
      sidebar : view('admin/component.sidebar'),
      header : view('component.header' , {
        name:"Blogs || Create new",
      })
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}

exports.diabetics = async (req ,res)=>{
  try{

    return response(res , view('blog/diabetics',{
      sidebar : view('admin/component.sidebar'),
      header : view('component.header' , {
        name:"Diabetics || blogs",
      })
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}

exports.editBlog = async (req ,res)=>{
  try{

    return response(res , view('blog/editBlog',{
      sidebar : view('admin/component.sidebar'),
      header : view('component.header' , {
        name:"Edit Blog",
      })
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}

exports.hypertension = async (req ,res)=>{
  try{

    return response(res , view('blog/hypertension',{
      sidebar : view('admin/component.sidebar'),
      header : view('component.header' , {
        name:"hypertension",
      })
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}

exports.supplement = async (req ,res)=>{
  try{

    return response(res , view('blog/supplement',{
      sidebar : view('admin/component.sidebar'),
      header : view('component.header' , {
        name:"supplement",
      })
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
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
  try{

    const { title, category, author, excerpt, content } = JSON.parse(await getRequestData(req)); 
    const newBlog = await Blogs.update({
      id : req.blogId ,
      title , category , author , excerpt , content
    });

    console.log({title,category ,author});
    return responseJson(res , 200 , newBlog);
  }catch(e){
    console.log(e);
    return responseJson(res, 400 , {
      status:"error",
      error:e,
    })
  }
}
// CREATE
exports.getAllBlogs = async (req, res) => {
  try{

    const blogs = await Blogs.get()
    return responseJson(res , 201 , blogs);
  }catch(e){
    return responseJson(res, 400 , {
      status:"error",
      error:e,
    })
  }
}


exports.delete = async (req , res)=>{
  try{

    return response(res , view('delete',{
      sidebar : view('admin/component.sidebar',{
        header : view('component.header' , {
          name:"Delete Blog",
        })
      }),
    }) , 200)
  }catch(e){
    return responseJson(res, 400 , {
      status:"error",
      error:e,
    })
  }
}


exports.renderDeleteConform = async (req, res)=>{
  try{

    return response(res , view('blog/delete' , {
      header : view('component.header' , {
        name:"Delete Conformation",
      }),
      id: req.blogId,
    }))
  }catch(e){
    return responseJson(res, 400 , {
      status:"error",
      error:e,
    })
  }
}

exports.renderEditView = async (req , res)=>{


  try{
    const [blog] = await Blogs.getById(req.blogId);
    console.log(blog)

    return response(res , view('blog/editBlog' , {
      header : view('component.header' , {
        name:`${blog.name} edit || Pharmanet`,
      }),
      ...blog
      
    }))
  }catch(e){
    console.log(e);
    return response(res , view('404' ) , 404);
  }
}