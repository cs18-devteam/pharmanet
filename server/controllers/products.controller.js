const { response } = require("../common/response")
const view = require("../common/view")

exports.renderProducts = async (req, res) =>{
    return response(res,view("products"),200)
} 