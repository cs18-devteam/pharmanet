const { response } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");

exports.renderAttendance = async (req ,res)=>{
    try{
        const [staff] = await Users.getById(req.pharmacistId);
        return response(res , view('pharmacy/attendance',{
            navbar : view('navbar.staff' , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            ...staff , name:`${staff.firstName} ${staff.lastName}`})
        }) , 200);

    }catch(e){
        console.log(e);
        return response(res , view('404') , 200);
    }
}