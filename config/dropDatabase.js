const db = require("../database/Database");
db.query(`drop database ${process.env.DATABASE_NAME}` , (error)=>{
    if(error){
        console.error(error);
    }else{
        console.log(`${process.env.DATABASE_NAME} : database removed successfully`);
    }

});