const { getRequestData } = require("../../common/getRequestData");
const { responseJson, response } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");

exports.renderAdminUsersView = async (req ,res)=>{
    const [admin] = await Users.getById(req.adminId);


    return response(res , view('admin/users',{
        sidebar : view('admin/component.sidebar' ,admin),
        header : view('component.header' , {
          name:"Users || Pharmanet - Manage all users here",
        }),
        
    }) , 200);
}

exports.renderAddUsersView = async (req ,res)=>{
    return response(res, view('admin/addUsers') , 200);
}

exports.createUser = async (req,res) => {
    const { fname, lname, email, pharmacy, role, avatar} = JSON.parse(await getRequestData(req));
    const name = `${fname} ${lname}`.trim();
    const defaultPassword = "TempPass123";
    const hashedPassword = hashPassword(defaultPassword);
    const newUser = await Users.save({
        name, email , pharmacy , role , password: hashedPassword, avatar
    });
    return responseJson(res , 201 , newUser);
}

exports.updateUserStatus = async(req, res) => {
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    const { status } = JSON.parse(await getRequestData(req));
    const db = Database.getInstance();
    await db.query(`UPDATE user_table SET status = '${status}' WHERE id = ${id}`);
    return responseJson(res, 200, { message: 'Status updated'});
}

exports.viewProfile = async(req, res) => {
    const url = new URL(req.url, 'http://loacalhost:3000');
    const id = url.searchParams.get('id');

    if(!id) {
        return response(res, 'User ID required', 400);
    }

    try{
        const db = Database.getInstance();
        const [user] = await db.query(`SELECT * FROM user_table WHERE id = ${id}`);

        if(!user) {
            return response(res, 'User not found', 404);
        }

        //Render template with user data
        return response(res, view('admin/viewProfile', user), 200)
    }catch (error){
        console.error(error);
        return response(res, 'Error fetching user',500)
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await Users.get()
    return responseJson(res , 200 , users);
}

