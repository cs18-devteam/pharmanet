const { catchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Database = require("../../database/Database");
const Users = require("../../models/UserModel");
const db = Database.getInstance();


exports.renderAdminDashboardView = catchAsync(async (req , res)=>{
    const [admin] = await Users.getById(req.adminId);


    return response(res , view('admin/adminDashboard' , {
        sidebar : view('admin/component.sidebar' , admin),

        header : view('component.header' , {
          name:"Admin || Pharmanet Pharmacy Management System",
        }),
    }) , 200);
})

exports.adminPharmacy = async(req,res)=>{
    const [admin] = await Users.getById(req.adminId);


    return response(res, view('admin/pharmacy', {
        sidebar : view('admin/component.sidebar' ,admin)
    }),200);
}

exports.renderAdminMedicinesView = catchAsync(async (req ,res)=>{
    const [admin] = await Users.getById(req.adminId);


    return response(res , view('admin/medicines',{
        sidebar : view('admin/component.sidebar' ,admin),
        header : view('component.header' , {
          name:"Medicines || Pharmanet - Manage all medicines here",
        }),
        
    }) , 200);
})

exports.renderAdminDataAssetsView = async (req ,res)=>{
    const [admin] = await Users.getById(req.adminId);


    return response(res , view('admin/dataAssets',{
        header : view('component.header' , {
          name:"Data assets || Pharmanet - Data Collection",
        }),
        sidebar : view('admin/component.sidebar' ,admin)
    }) , 200);
}

exports.viewProfile = async(req ,res)=>{


    return response(res, view('admin/viewProfile'), 200);
}

exports.pharmacy = async (req ,res)=>{
    const [admin] = await Users.getById(req.adminId);


    return response(res , view('admin/pharmacy',{
        sidebar : view('admin/component.sidebar' ,admin)
    }) , 200 );
}


exports.renderAdminUsersView = async (req ,res)=>{
    const [admin] = await Users.getById(req.adminId);


    return response(res , view('admin/users',{
        sidebar : view('admin/component.sidebar' , admin)
    }) , 200);
}

exports.addUsers = async (req ,res)=>{
    return response(res, view('admin/addUsers') , 200);
}

//create User
exports.createUser = async (req,res) => {
    const [admin] = await Users.getById(req.adminId);


    const { name, email, pharmacy, role} = JSON.parse(await getRequestData(req));
    const newUser = await Users.save({
        name, email , pharmacy , role
    });
    return responseJson(res , 201 , newUser);
}

//get all users
exports.getAllBlogs = async (req, res) => {
    const users = await Users.get()
    return responseJson(res , 200 , newBlog);
}


