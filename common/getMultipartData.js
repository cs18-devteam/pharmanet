const File = require("./File");

// function getMultipartData(req) {
//     const boundary = req.headers['content-type'].split('boundary=')[1];
//     return new Promise((resolve , reject)=>{
//         try{

//             let data = "";
//             req.on('data' , (chunk)=>{
//                 data += chunk;
//             });
            
            
//             req.on('end' , ()=>{
//                 const formData = {};
//                 let  fields = data.split(boundary).filter(v=>{
//                     console.log(v.includes('Content-Disposition: form-data;'));
                    
//                     return v.includes('Content-Disposition: form-data;')
//                 })
//                 fields.forEach(v=>{
//                     const name= v.match(/name="([^"]*)"/);
//                     const fileName = v.match(/filename="([^"]*)"/);
//                     const value = v.match(/\r\n\r\n(.*?)\r\n--/);
                    
                    
                    
//                     if(name[1] == '' && name) return;
//                     if(fileName){
//                         const content = v.split(/Content-Type: (.*?)\r\n/);
//                         const fileData = (content[content.length-1]);
//                         const fileContent = fileData.match(/(.*?)\r\n--/s);
//                         console.log(fileData.slice(0,100));
                        
//                         formData[name[1]] = new File({
//                             fileName : fileName[1],
//                             content: fileContent[1],
                            
//                         })
//                     }else{
//                         formData[name[1]] = value[1];
//                     }        
//                 })
                
//                 resolve(formData);
                
                
//             })
            
//         }catch(e){
//             console.log(e);
//             reject(e);
            
//         }

//     })
    
// }

function getBoundary(req) {
    const contentType = req.headers["content-type"];
    return "--" + contentType.split("boundary=")[1];
}


function parseMultipart(req, body) {
    const boundary = Buffer.from(getBoundary(req));

    let parts = [];
    let start = body.indexOf(boundary) + boundary.length;

    while (true) {
        let end = body.indexOf(boundary, start);

        if (end === -1) break; // no more parts

        let part = body.slice(start, end);
        parts.push(part);
        start = end + boundary.length;
    }

    const formData = processParts(parts);

    return formData
}

function processParts(parts) {
    const formData = {};

    parts.forEach(part => {
        const headerEnd = part.indexOf("\r\n\r\n");
        if (headerEnd === -1) return;

        const header = part.slice(0, headerEnd).toString();
        const content = part.slice(headerEnd + 4, part.length - 2); // remove trailing \r\n

        const nameMatch = header.match(/name="([^"]+)"/);
        if (!nameMatch) return;
        const name = nameMatch[1];

        const filenameMatch = header.match(/filename="([^"]+)"/);

        // ---- TEXT FIELD ----
        if (!filenameMatch) {
            formData[name] = content.toString();
            return;
        }

        // ---- FILE FIELD ----
        const filename = filenameMatch[1];

        const typeMatch = header.match(/Content-Type: ([^\r\n]+)/);
        const mimeType = typeMatch ? typeMatch[1] : "application/octet-stream";

        formData[name] = new File({
            fileName : filename,
            mimeType,
            content: content     // <-- REAL BINARY BUFFER (not corrupted)
        });
    });

    return formData;
}


function getMultipartData(req){
    let chunks = [];
    
    req.on("data", chunk => chunks.push(chunk));

    return new Promise((resolve , reject)=>{
        req.on("end", () => {
            const body = Buffer.concat(chunks);
            resolve(parseMultipart(req, body));
        });
    })
    

}


module.exports = getMultipartData;