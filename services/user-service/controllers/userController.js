const DB = require('../../../database/Database');
const db = DB.getInstance();


exports.getAllUsers = (req, res)=>{

    //step 1
    res.writeHead(200 , {"Content-Type":"text/html"} );
    res.write("<h1>users</h1>");
    res.end();
    return;

}


exports.updateUser = (req, res)=>{
    console.log("hi from get update");
}

exports.deleteUser = (req, res)=>{
    console.log("hi from get delete");
}

exports.createUser = (req, res)=>{
    console.log("hi from get create");
}