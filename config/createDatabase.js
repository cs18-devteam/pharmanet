const db = require("../database/Database");
db.query(`create database ${process.env.DATABASE_NAME}` , (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(`${process.env.DATABASE_NAME} : database created successfully`);
    }
});