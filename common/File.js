const fs = require('fs/promises');
const path = require('path');
const { updateFileServerCache } = require('../fileServer');


class File{
    constructor({fileName , content , mimeType}){
        this.fileName = fileName;
        this.content = content
        this.mimeType = mimeType;
    }

    rename(newName){
        this.fileName = newName;
    }


    async save(filePath = "./"){
        try{
            filePath = path.join(__dirname , "/../storage/" ,filePath , this.fileName); 
            const file = await fs.writeFile(filePath , this.content , {
                encoding : "binary"
            });

            updateFileServerCache();
            
            return {
                status:"success",
                path: filePath ,
            }
            
            

        }catch(e){
            console.log(e);
            return {
                status :'error',
                error:e,
            }
            
        }
    }
}

module.exports = File;