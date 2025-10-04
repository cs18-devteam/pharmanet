const fs = require('node:fs');


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


const env = ()=>new Env;

module.exports = env;