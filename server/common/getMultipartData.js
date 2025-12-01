const fs = require('fs/promises');
const path = require('path');

class File{
    constructor({fileName , content}){
        this.fileName = fileName;
        this.content = content;
    }

    rename(newName){
        this.fileName = newName;
    }


    async save(filePath = "./"){
        try{
            filePath = path.join(__dirname , "/../storage/" ,filePath , this.fileName); 
            const file = await fs.writeFile(filePath , this.content );
            console.log(file);
            
            return {
                status:"success",
                path: path ,
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

function getMultipartData(req) {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    return new Promise((resolve , reject)=>{
        try{

            let data = "";
            req.on('data' , (chunk)=>{
                data += chunk;
            });
            
            
            req.on('end' , ()=>{
                const formData = {};
                let  fields = data.split(boundary).filter(v=>{
                    console.log(v.includes('Content-Disposition: form-data;'));
                    
                    return v.includes('Content-Disposition: form-data;')
                })
                fields.forEach(v=>{
                    const name= v.match(/name="([^"]*)"/);
                    const fileName = v.match(/filename="([^"]*)"/);
                    const value = v.match(/\r\n\r\n(.*?)\r\n--/);
                    
                    
                    
                    if(name[1] == '' && name) return;
                    if(fileName){
                        const content = v.split(/Content-Type: (.*?)\r\n/);
                        const fileData = (content[content.length-1]);
                        const fileContent = fileData.match(/(.*?)\r\n--/s);
                        
                        formData[name[1]] = new File({
                            fileName : fileName[1],
                            content: fileContent[1],
                            
                        })
                    }else{
                        formData[name[1]] = value[1];
                    }        
                })
                
                resolve(formData);
                
                
            })
            
        }catch(e){
            console.log(e);
            reject(e);
            
        }

    })
    
}

module.exports = getMultipartData;