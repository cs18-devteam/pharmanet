const http = require('http');
const fs = require('fs');
const { requestFile } = require('./fileServer');
const AppRouter = require('./common/AppRouter');
const SubRouter = require('./common/SubRouter');
const { responseJson } = require('./common/response');

const { indexRouter } = require('./routes/web/index.Routes');
const authRouter = require('./routes/web/auth.Routes');
const customerRouter = require('./routes/web/customers.Routes');
const adminBlogsRouter = require('./routes/web/admin.blogs.Routes');
const adminRouter = require('./routes/web/admin.Routes');
const { adminPharmacyRouter, adminApiPharmacyRouter } = require('./routes/web/admin.pharmacy.Routes');
const { pharmacistRouter, pharmacyApiRouter, pharmacyRouter } = require('./routes/web/pharmacy.Routes');


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

        indexRouter.pipe(req , res);
        authRouter.pipe(req,res);
        customerRouter.pipe(req , res);
        adminRouter.pipe(req , res);
        adminBlogsRouter.pipe(req , res);
        adminPharmacyRouter.pipe(req , res);
        adminApiPharmacyRouter.pipe(req , res);
        pharmacistRouter.pipe(req , res);
        pharmacyApiRouter.pipe(req , res);
        pharmacyRouter.pipe(req , res);

        // SubRouter.print();

        return AppRouter.pipe(req ,res).end();

    }catch(e){
        console.log(e);
        responseJson(res  , 500 , {
            status:"error",
            message :"server not responding",
            error :e,
        });
    }
    


})

// SubRouter.print()

       


module.exports = server;