const fs = require('fs');
const path = require('path');

const view = (filename , data = {})=>{
    let content = fs.readFileSync(path.join(__dirname , `../views/${filename}.template.html`) , {encoding:"utf-8"});

    for(const [name ,value] of Object.entries(data)){
        content = content.replaceAll(`{${name}}` , value);
    }

    return content;
}

module.exports = view;