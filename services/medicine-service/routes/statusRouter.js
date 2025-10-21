const { responseJson } = require("../common/response")


const statusRouter = async  (req , res)=>{
    responseJson(res , 200 , {
        status:"running",
    })
}
module.exports = statusRouter; 