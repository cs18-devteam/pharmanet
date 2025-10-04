const fs = require('fs');
const path = require('path');
let cache = [];


const MIME_TYPES = {
    "js" : "text/javascript",
    "jpg" : "image/jpg",
    "txt" : "text/plain",
    "jpeg" : "image/jpeg",
    "png" : "image/png",
    "html" : "text/html",
    "xml" : "text/xml",
    "json" : 'application/json',
    "css" : "text/css",
    "ttf" : "font/ttf"
}


const refreshCache = (filePath)=>{
    
    cache = fs.readdirSync(filePath , {
        withFileTypes :true,
        recursive:true,
    });
    
    

    cache = cache.map(file =>{

        return {
            ...file , 
            type : MIME_TYPES[file.name.split('.').slice(-1)] || 'text/plain',
            name : path.relative(filePath , path.join(file.parentPath , file.name)),
            path : path.join(__dirname , file.parentPath , file.name),

        }

    });

    if(process.env.NODE_ENV == "development"){
        if(typeof refreshCache.initialize === 'undefined'){
            console.log(filePath , ": serve as public resource");
            refreshCache.initialize = true;
        }else{
            console.log(filePath , ": change detected");
        }
    }
}

exports.requestFile = (path) =>{
    path = path.replaceAll('%' , ' ');
    if(path.startsWith('/')){
        path = path.replace('/' , '');
    }
    console.log(path);
    const [file] = cache.filter(file=>file.name == path);
    if(file) return {
        ...file ,
        content : fs.readFileSync(file.path),
    }
    return null;
}

exports.fileServer = (filePath)=>{
    refreshCache(filePath);

    fs.watch(filePath , ()=>{
        refreshCache(filePath);
    });
}
