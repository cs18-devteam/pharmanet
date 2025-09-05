const fs = require('fs');
const path = require('path');
const verifyEmailTemplate = fs.readFileSync(path.join(__dirname , "./../templates/verifyEmail.template.html"));


exports.renderVerifyEmailView = (req ,res)=>{
    res.send(verifyEmailTemplate);
}