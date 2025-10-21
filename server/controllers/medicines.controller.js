const { response } = require("../common/response")
const view = require("../common/view")

exports.renderMedicines = async (req, res) =>{
    return response(res,view("medicines"),200)
} 