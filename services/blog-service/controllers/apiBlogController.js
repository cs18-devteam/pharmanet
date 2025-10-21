const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Blogs = require("../model/BlogModel");


exports.getBlogs =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('user')) filter.user = req.params.get('user')
    if(req.params.get('content')) filter.reason = req.params.get('content')
    if(req.params.get('title')) filter.requestedDate = req.params.get('title')

    let content =  ''
    if(Object.entries(filter).length > 0){
        content = await Blogs.get(filter);
    }else{
        content = await Blogs.get();
    }

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
}


exports.deleteBlog =async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const results = await Blogs.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}


exports.updateBlogs = async (req , res)=>{
    const {user , title ,content , date} = JSON.parse(await getRequestData(req));
    const results = await Blogs.update({
        user , title ,content , date
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createBlog = async (req , res)=>{
    const {user , title ,content , date} = JSON.parse(await getRequestData(req));
    const newBlog = await Blogs.save({
        user , title ,content , date
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newBlog,
        count : newBlog.length,
    });
}