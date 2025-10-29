const nodemailer = require('nodemailer');



let transport;
try{

    if(!process.env.GMAIL_APP_PASSWORD) throw new Error("gmail app password is not defined");

    transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "cs18.devteam.feedback@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    })
}catch(e){
    console.log(e);
}


module.exports = function sendMail({to , subject , text , html}){
    try{
        if(!transport) throw new Error('email transport not initialized');
        transport.sendMail({
            from: 'Pharmanet <cs18.devteam.feedback@gmail.com>',
            to,
            subject,
            text, // plain‑text body
            html : html || text , // HTML body
        },(error)=>{
            if(!error){
                console.log("email sent successfully");
            }else{
                console.log(error);
                
            }
        })

    }catch(e){
        console.log(e);
        throw e;
    }
}







