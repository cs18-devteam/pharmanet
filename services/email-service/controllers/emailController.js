const { transporter } = require("./models/emailModel")

exports.sendEmail = async ({ 
    from="Pharmanet : <chathura15592priyashan@gmail.com" ,
    text , to , subject })=>{
    const info =  await transporter.sendEmail({
        to,
        text,
        from,
        subject,
    })

    return info;
}


exports.sendVerificationCode = async ({ 
    from="Pharmanet : <chathura15592priyashan@gmail.com" ,
    to  , code})=>{
    const info =  await transporter.sendEmail({
        to,
        from,
        text : code,
        subject : "Verification Code || Pharmanet",
    })

    return info;
}

