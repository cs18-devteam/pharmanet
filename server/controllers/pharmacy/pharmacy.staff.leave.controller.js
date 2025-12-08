const { response } = require("../../common/response")
const view = require("../../common/view")

exports.renderPharmacyStaffLeave = async (req, res) =>{
    try{

        return response(res,view("pharmacy.staff.leave" , {
            header : view('component.header' , {
                name:"Antibiotics",
            })
        }),200)
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}