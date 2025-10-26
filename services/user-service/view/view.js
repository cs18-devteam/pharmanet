const fs = require("fs");
const indexPage = fs.readFileSync('./../index.template.html');


exports.sendCustomerIndexPage = (req , res)=>{   
    res.writeHeader({
        "Content-Type":"text/html",
    })
    res.write(indexPage);
    res.end();
}
