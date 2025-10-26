const Bridge = require("../../common/Bridge");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");


exports.adminDashboard = async (req , res)=>{
    return response(res , view('admin/adminDashboard' , {
        sidebar : view('admin/component.sidebar')
    }) , 200);
}

exports.medicines = async (req ,res)=>{
    return response(res , view('admin/medicines',{
        sidebar : view('admin/component.sidebar')
    }) , 200)
}

exports.dataAssets = async (req ,res)=>{
    return response(res , view('admin/dataAssets',{
        sidebar : view('admin/component.sidebar')
    }) , 200)
}



exports.users = async (req ,res)=>{
    return response(res , view('admin/users',{
        sidebar : view('admin/component.sidebar')
    }) , 200)
}


