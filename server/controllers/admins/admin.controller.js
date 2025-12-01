const Bridge = require("../../common/Bridge");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");


exports.renderAdminDashboardView = async (req , res)=>{
    return response(res , view('admin/adminDashboard' , {
        sidebar : view('admin/component.sidebar'),

        header : view('component.header' , {
          name:"Admin || Pharmanet Pharmacy Management System",
        }),
    }) , 200);
}

exports.renderAdminMedicinesView = async (req ,res)=>{
    return response(res , view('admin/medicines',{
        header : view('component.header' , {
          name:"Medicines || Pharmanet - Manage all medicines here",
        }),
        sidebar : view('admin/component.sidebar')
    }) , 200)
}

exports.renderAdminDataAssetsView = async (req ,res)=>{
    return response(res , view('admin/dataAssets',{
        header : view('component.header' , {
          name:"Data assets || Pharmanet - Data Collection",
        }),
        sidebar : view('admin/component.sidebar')
    }) , 200)
}



exports.renderAdminUsersView = async (req ,res)=>{
    return response(res , view('admin/users',{
        sidebar : view('admin/component.sidebar'),
        header : view('component.header' , {
          name:"Users || Pharmanet - Manage All Users",
        }),
    }) , 200)
}


