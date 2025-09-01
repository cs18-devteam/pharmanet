const fs = require('node:fs');

module.exports = function env(){
    const envFileContent = fs.readFileSync('./.env' , {encoding: 'utf-8'}).trim();
    envFileContent.split('\n').forEach(value=> {
        value = value.split('=');
<<<<<<< HEAD
        process.env[value[0]] =  value[1].replaceAll("\r" , '').replaceAll('\n','');
=======
        process.env[value[0]] =  value[1];
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
    });
}