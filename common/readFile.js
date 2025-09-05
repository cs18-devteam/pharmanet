const fs = require('fs');
const path = require('path');

const readFile = (filePath)=>{
    const content = fs.readFileSync(path.join(__dirname , filePath) , 'utf-8');
    return content;
}

module.exports(readFile);