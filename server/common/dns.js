const childProcess = require("child_process");
const ipaddress = require("./ipaddress");

exports.dns = ()=>{
    try{

        childProcess.execSync(`sudo npx hostile set ${ipaddress} ${process.env.DOMAIN_NAME}` , { stdio: "inherit" })
        console.log("----------------------------------");
        console.log(`Now You live as https://${process.env.DOMAIN_NAME}`);
        console.log("----------------------------------");
        // ipaddress.setIP(`${process.env.DOMAIN_NAME}:${process.env.PORT}`)
        return true;
    }catch(e){
        console.log(e.message);
        console.log("⚠️ DNS Error | BUT YOU CAN IGNORE AND CONTINUE WITH LOCAL IP");
        return false
    }

}