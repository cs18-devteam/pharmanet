function decodeMultipartFormData(req , data){
    const contentType = req.headers['content-type'];
    if(!contentType.includes("multipart/form-data;")) throw new Error("invalid data sent");

    const boundary = contentType.replace("multipart/form-data; boundary=" , "").trim();

    const formData = {}; 

    data = data.toString();
    data.split(boundary)
        .filter((string)=>{
            return string.includes("Content-Disposition: form-data; ");
        }).forEach(string=>{
            string = string.replace('\r\nContent-Disposition: form-data; ' , '');
            string = string.replace("\r\n--",'');
            let [columnName , value] = string.split("\r\n\r\n");

            columnName = columnName.replace(/"/g ,"").replace("name=" ,'');

            formData[columnName] = value;
        })
        
    return formData;
}

module.exports = decodeMultipartFormData;