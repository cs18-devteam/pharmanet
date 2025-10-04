exports.response = (res , view , statusCode = 200 , headers = {})=>{
    res.writeHead(statusCode , {
        "Content-type":"text/html",
        ...headers
    });
    res.write(view);
    res.end();
}



exports.responseJson = (res , statusCode=200 , body , headers = {})=>{
    res.writeHead(statusCode , {
        ...headers,
        "Content-Type" : "application/json"
    });

    res.write(JSON.stringify(body));
    res.end();
}