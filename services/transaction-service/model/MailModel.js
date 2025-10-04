
const nodemailer = require("nodemailer");

console.log(
    {
        type: "OAuth2",
        user: process.env.MAIL_ADDRESS,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret : process.env.GMAIL_CLIENT_SECRET,
    }
)

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.MAIL_ADDRESS,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret : process.env.GMAIL_CLIENT_SECRET,
    },
});

transporter.sendMail().then(data=>console.log(data)).catch(e=>console.log(e));


class Mail{
    static async send({from , to , subject , text , html}){
        try{
            const info = await transporter.sendMail({
                from , 
                to , 
                subject , 
                text , 
                html 
            });

            return info;
            
        }catch(e){
            console.log("Email Not Sent");
            console.error(e);
        }
    }

}

module.exports = Mail;