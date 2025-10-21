const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { response } = require("../common/response");
const view = require("./../common/view");


exports.renderAdminBlogsBlog = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.BLOG_SERVICE, {
        method:"GET"
    }).request(async (req ,res)=>{
        return await getRequestData(req)
    }).json()
    .resend((data)=>{
        return view("admin.blogs.blog")
    } , 200 );
}

exports.createBlog = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.BLOG_SERVICE , {
        method : "POST"
    }).request(async (req ,res)=>{
        return await getRequestData(req);
    }).json()
    .resend((data)=>{
        return view('admin.blogs.blog'  , {

        })
    } , 200);
}

exports.updateBlog = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.BLOG_SERVICE , {
        method : "PATCH"
    }).request(async (req ,res)=>{
        return await getRequestData(req);
    }).json()
    .resend((data)=>{
        return view('admin.blogs.blog');
    } , 200);
}

exports.deleteBlog = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.BLOG_SERVICE , {
        method :"DELETE"
    }).request(async (req , res)=>{
        return await getRequestData(req);
    }).resend((data)=>{
        return view('admin.blogs')
    });
}

