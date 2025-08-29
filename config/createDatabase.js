const db = require("../database/Database");
db.query("create database chathura" , (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("chathura : database created successfully");
    }
});