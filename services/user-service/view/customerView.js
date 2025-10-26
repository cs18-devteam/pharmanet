const fs = require('fs');
const path = require('path');
const customerViewTemplate = fs.readFileSync(path.join(__dirname , './../templates/customer.template.html') , 'utf-8');
const customerUpdateViewTemplate = fs.readFileSync(path.join(__dirname , './../templates/user.update.template.html'));

exports.renderCustomerView =async (req , res)=>{
    res.writeHead(200 ,{
        "content-type":"text/html",
    })
    res.write(customerViewTemplate);
    res.end();
}

exports.renderCustomerUpdateView = async (req , res)=>{
    res.writeHead(200 ,{
        "content-type":"text/html",
    })
    res.write(customerUpdateViewTemplate);
    res.end();
}