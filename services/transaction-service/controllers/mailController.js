const Mail = require("././../model/MailModel");

exports.sendMail = async ({to , subject , text , html})=>{
    try{
        const info = await Mail.send({
            from: process.env.MAIL_ADDRESS,
            to ,
            subject , 
            text ,
            html,
        });

        return info;

    }catch(e){
        console.log(e);
    }
}