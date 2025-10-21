const {response} = require("./response");
const view = require("./view");

module.exports = function notFound(req , res){
    return response(res , view('404'),404);
}