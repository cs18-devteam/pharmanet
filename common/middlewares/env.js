const fs = require('node:fs');

module.exports = function env(){
    const envFileContent = fs.readFileSync('./.env' , {encoding: 'utf-8'}).trim();
    envFileContent.split('\n').forEach(value=> {
        value = value.split('=');
        process.env[value[0]] =  value[1];
    });
}