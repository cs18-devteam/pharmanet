const db = require("../database/Database");
db.query("drop database chathura" , (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("chathura : database removed successfully");
    }

});