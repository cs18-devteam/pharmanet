const fs = require('node:fs');

<<<<<<< HEAD
module.exports = function env(){
    const envFileContent = fs.readFileSync('./.env' , {encoding: 'utf-8'}).trim();
    envFileContent.split('\n').forEach(value=> {
        value = value.split('=');
        process.env[value[0]] =  value[1].replaceAll("\r" , '').replaceAll('\n','');
    });
}
=======

class Env{
    constructor(){
        const envFileContent = fs.readFileSync('./.env' , {encoding: 'utf-8'}).trim();

        envFileContent.split('\n').forEach(value=> {
            value = value.split('=');
            process.env[value[0]] =  value[1].replace("\r",'');
        });

        return ()=>{
            if(process.env.NODE_ENV == "development"){
                console.log("environment variables defined");
            }
        }

        
    }
}


module.exports = new Env();
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
