const notfound = require("../common/notfound");
const apiBlogController = require("../controllers/apiBlogController");


module.exports = function apiBlogRouter(req , res){
    switch(req.method){
        case 'GET':
            return apiBlogController.getBlogs(req , res);

        case 'POST':
            return apiBlogController.createBlog(req , res);

        case 'PATCH':
            return apiBlogController.updateBlogs(req , res);

        case 'DELETE':
            return apiBlogController.deleteBlog(req , res);
        default:
            return notfound(req , res);
    }
}