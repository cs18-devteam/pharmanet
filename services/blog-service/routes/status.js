const { responseJson } = require("../common/response")


const status = async  (req , res)=>{
    responseJson(res , 200 , {
        status:"running",
    })
}
module.exports = status; 