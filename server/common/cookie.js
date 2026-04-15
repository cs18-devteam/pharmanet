exports.createCookie = (name , value , expires=Date.now()+10000 , path="/")=>{
    return `${name}=${value};expires=${expires};path=${path}`
}