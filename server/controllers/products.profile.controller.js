const { response } = require("../common/response")
const view = require("../common/view")

exports.renderProductsProfile = async (req,res) => {
    return response(res,view("product.management"),200)
}