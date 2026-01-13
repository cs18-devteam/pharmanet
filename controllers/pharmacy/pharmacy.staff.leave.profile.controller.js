const { response } = require("../../common/response")
const view = require("../../common/view")

exports.renderPharmacyStaffLeaveProfile = async (req,res) => {
    try{

        return response(res,view("pharmacy.staff.leave.profile" , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            footer: view('footer'),
        }),200)
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}