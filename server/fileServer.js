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
    "ttf" : "font/ttf",
    "svg" : "image/svg+xml"
}


const refreshCache = (filePaths)=>{
    
    cache = filePaths.map(filePath=>{
        return fs.readdirSync(filePath , {
            withFileTypes :true,
            recursive:true,
        })
    });

    // console.log(cache)
    
    

    cache = cache.map((fileSet , setId) =>{
        
        const fileObjectSet = fileSet.map(file=>{

            const fileObj =  {
                ...file , 
                type : MIME_TYPES[file.name.split('.').slice(-1)] || 'text/plain',
                name : path.relative(filePaths[setId] , path.join(file.parentPath , file.name)).replaceAll("\\","/"),
                path : path.join(__dirname , file.parentPath.replaceAll("\\","/"), file.name).replaceAll('\\' , "/"),
                
            }
            
            const stat = fs.statSync(fileObj.path);
            if(stat.isDirectory()){
                fileObj.type = 'dir';
            }

            return fileObj;
            
        })

        return fileObjectSet;

    }).flat();



    if(process.env.NODE_ENV == "development"){
        if(typeof refreshCache.initialize === 'undefined'){
            console.log(...filePaths , ": serve as public resource");
            refreshCache.initialize = true;
        }else{
            console.log(...filePaths , ": change detected");
        }
    }

}

exports.requestFile = (filePath) =>{
    filePath = filePath.replaceAll('%20' , ' ');
    if(filePath.startsWith('/')){
        filePath = filePath.replace('/' , '');
    }
    const [file] = cache.filter(file=>{
        if (file.type == 'dir') return false;
        const absPath = path.join("." , file.name).replaceAll('\\' , '/');
        return absPath == filePath;
    })


    if(file) return {
        ...file ,
        content : fs.readFileSync(file.path),
    }
    return null;
}

exports.fileServer = (...filePaths)=>{
    refreshCache(filePaths);

    filePaths.forEach(filePath=>{
        fs.watch(filePath , ()=>{
            refreshCache(filePath);
        }
    )});
}
