const fs = require('node:fs');

<<<<<<< HEAD
<<<<<<< HEAD
=======
module.exports = function env(){
    const envFileContent = fs.readFileSync('./.env' , {encoding: 'utf-8'}).trim();
    envFileContent.split('\n').forEach(value=> {
        value = value.split('=');
        process.env[value[0]] =  value[1].replaceAll("\r" , '').replaceAll('\n','');
    });
}
=======
>>>>>>> origin/hamdha/backend/order

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
<<<<<<< HEAD
=======
module.exports = function env(){
    const envFileContent = fs.readFileSync('./.env' , {encoding: 'utf-8'}).trim();
    envFileContent.split('\n').forEach(value=> {
        value = value.split('=');
<<<<<<< HEAD
<<<<<<< HEAD
        process.env[value[0]] =  value[1].replaceAll("\r" , '').replaceAll('\n','');
=======
        process.env[value[0]] =  value[1];
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
        process.env[value[0]] =  value[1];
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
    });
}
>>>>>>> origin/hamdha/backend/leave
=======
>>>>>>> fc973e4276596d70e8ece3d480b5e5267cace1cf
>>>>>>> origin/hamdha/backend/order
