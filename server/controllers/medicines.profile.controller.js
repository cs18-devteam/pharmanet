const { response } = require("../common/response")
const view = require("../common/view")

exports.renderMedicinesProfile = async (req, res) =>{
    return response(res,view("medicines.profile"),200)
} 