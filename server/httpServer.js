const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/Router');
const indexController = require('./controllers/index.controller');
const blogController = require('./controllers/blogs/blog.controller');


const server = http.createServer((req , res)=>{
    try{
        const {url , method} = req;
        const URI = new URL(url , `http://${process.env.HOSTNAME}:${process.env.PORT}`);
        const params = URI.searchParams;
        const path = URI.pathname;

        req.path = path;
        req.params = params;

        //set public folder 
        const file = requestFile(path);
        if(file){

            res.writeHead(200 , {
                "content-type" : file.type,
            });
            res.write(file.content);
            res.end();
            return;
        }
        if(process.env.NODE_ENV == "development"){
            console.log(method , url  , path)
        }

        // const express = require("express");
        // const mysql = require("mysql2");
        // const cors = require("cors");

        // const app = express();
        // app.use(cors());
        // app.use(express.json());

        // ✅ MySQL Connection
        // const db = mysql.createConnection({
        // host: "localhost",
        // user: "root",        // 👈 your MySQL username
        // password: "",        // 👈 your MySQL password
        // database: "blog_service",  // 👈 the database you created
        // });

        // db.connect((err) => {
        // if (err) throw err;
        // console.log("✅ MySQL Connected!");
        // })
        

        AppRouter.pipe(req , res).route('/')
        ?.get(indexController.renderIndexPage);

        AppRouter.pipe(req ,res).route('/login')
        ?.get()

        AppRouter.pipe(req ,res).route('/signup')
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
        // ?.get(blogController.getBlogbyId)
        // // ?.get(blogController.getAllBlogs)
        // ?.post(blogController.createBlog)
        // ?.update(blogController.updateBlog)

        AppRouter.pipe(req ,res).route('/delete/:id')
        ?.get(blogController.delete);




     

        return AppRouter.pipe(req ,res).end()
  

    

    }catch(e){
        console.log(e);
        server.close(()=>{
            console.log("Server shutdown due to error");
        })
    }
    


})


/// line 135 & 137





module.exports = server;