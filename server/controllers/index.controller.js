const { response } = require("../common/response")
const view = require("../common/view")

exports.renderIndexPage =  async (req , res)=>{
    return response(res , view('index' , {
        navbar : view('components/navbar.user')
    }) , 200);
}


